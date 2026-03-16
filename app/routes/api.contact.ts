import type { Route } from "./+types/api.contact";

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim() || "Portfolio Contact";
  const message = formData.get("message")?.toString().trim();

  // Validation
  if (!name || !email || !message) {
    return Response.json(
      { success: false, error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Simple honeypot check
  const honeypot = formData.get("website")?.toString();
  if (honeypot) {
    // Bot detected — return success silently
    return Response.json({ success: true });
  }

  try {
    // Send email via MailChannels (free for Cloudflare Workers)
    // You need to set up SPF DNS record: v=spf1 include:relay.mailchannels.net -all
    const emailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "contact@hristinayordanova.com", name: "Hristina Yordanova" }],
          },
        ],
        from: {
          email: "noreply@hristinayordanova.com",
          name: "Portfolio Contact Form",
        },
        reply_to: { email, name },
        subject: `[Portfolio] ${subject} — from ${name}`,
        content: [
          {
            type: "text/plain",
            value: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          },
          {
            type: "text/html",
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
              <hr />
              <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `,
          },
        ],
      }),
    });

    if (emailResponse.ok || emailResponse.status === 202) {
      return Response.json({ success: true });
    }

    console.error("MailChannels error:", await emailResponse.text());
    return Response.json(
      { success: false, error: "Failed to send message. Please try emailing directly." },
      { status: 500 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try emailing directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
