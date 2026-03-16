export const SITE = {
  name: "Hristina Yordanova",
  title: "Hristina Yordanova | Crypto Expert, Editor & Writer",
  description:
    "Senior crypto editor and content strategist with 7+ years of editorial leadership at Cointelegraph, CoinMarketCap, DappRadar, and Cryptonews. Expertise in AI-assisted workflows, on-chain data analysis, and SEO-driven content strategy.",
  url: "https://hristinayordanova.com",
  image: "https://hristinayordanova.com/headshot.jpg",
  locale: "en_US",
  twitterHandle: "@HYordanova_",
  language: "en",
} as const;

export const PUBLICATIONS = [
  { name: "Cointelegraph", url: "https://cointelegraph.com" },
  { name: "CoinMarketCap", url: "https://coinmarketcap.com" },
  { name: "DappRadar", url: "https://dappradar.com" },
  { name: "Cryptonews", url: "https://cryptonews.com" },
] as const;

export const SKILLS = [
  "Editorial Leadership",
  "AI-Assisted Workflows",
  "On-Chain Data Analysis",
  "SEO Content Strategy",
  "Team Management",
  "Crypto Journalism",
] as const;

/** Reusable Person entity — used across schemas */
const PERSON_ENTITY = {
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: "Hristina Yordanova",
  jobTitle: "Senior Crypto Editor & Content Strategist",
  description: SITE.description,
  url: SITE.url,
  image: {
    "@type": "ImageObject",
    url: SITE.image,
    width: 800,
    height: 800,
  },
  knowsAbout: [
    "Cryptocurrency",
    "Blockchain Technology",
    "DeFi",
    "On-Chain Data Analysis",
    "SEO Content Strategy",
    "AI-Assisted Editorial Workflows",
    "NFTs",
    "Web3",
    "Content Strategy",
    "Editorial Leadership",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Edinburgh Napier University",
    url: "https://www.napier.ac.uk",
  },
  knowsLanguage: ["English", "Bulgarian"],
  sameAs: [
    "https://www.linkedin.com/in/hristinayordanova/",
    "https://x.com/HYordanova_",
    "https://cryptostories.xyz",
  ],
};

/** Full Person JSON-LD — used on homepage and about */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    ...PERSON_ENTITY,
    worksFor: PUBLICATIONS.map((pub) => ({
      "@type": "Organization",
      name: pub.name,
      url: pub.url,
    })),
  };
}

/** WebSite JSON-LD — used on homepage for sitelinks search */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#person` },
    inLanguage: SITE.language,
  };
}

/** BlogPosting JSON-LD — richer than generic Article */
export function getArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  category,
  wordCount,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category?: string;
  wordCount?: number;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: "Hristina Yordanova",
      url: SITE.url,
      image: SITE.image,
      sameAs: PERSON_ENTITY.sameAs,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: "Hristina Yordanova",
      url: SITE.url,
      image: {
        "@type": "ImageObject",
        url: SITE.image,
      },
    },
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: SITE.language,
  };

  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image.startsWith("http") ? image : `${SITE.url}${image}`,
    };
  }

  if (category) {
    schema.articleSection = category;
  }

  if (wordCount) {
    schema.wordCount = wordCount;
  }

  return schema;
}

/** BreadcrumbList JSON-LD */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Generate meta array for a page */
export function pageMeta({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const url = `${SITE.url}${path}`;
  const ogImage = image
    ? image.startsWith("http") ? image : `${SITE.url}${image}`
    : SITE.image;

  const meta: Array<Record<string, unknown>> = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: SITE.locale },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE.twitterHandle },
    { name: "twitter:creator", content: SITE.twitterHandle },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url },
  ];

  if (type === "article") {
    if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
    if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
    meta.push({ property: "article:author", content: SITE.url });
  }

  if (noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}
