// Sitewide JSON-LD structured data (Organization, WebSite, Service).
// Rendered once from the root layout so answer engines and search engines
// can understand the Octogle Hire entity and offering.

const BASE = "https://try.octoglehire.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Octogle Hire",
      url: BASE,
      logo: `${BASE}/octogle-logo.svg`,
      description:
        "Senior software engineers embedded in your team, from £1,500 a month.",
      parentOrganization: {
        "@type": "Organization",
        name: "Octogle Technologies",
        url: "https://www.octogle.com",
      },
      sameAs: ["https://www.octogle.com", "https://twitter.com/octogle"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Octogle Hire",
      inLanguage: "en-GB",
      publisher: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${BASE}/#service`,
      name: "Embedded Senior Engineer",
      serviceType: "Embedded software engineering",
      provider: { "@id": `${BASE}/#organization` },
      areaServed: "GB",
      description:
        "A full-time senior software engineer embedded in your team, working on one client at a time from Octogle's own office. Three profiles in 48 hours, no placement fee.",
      offers: {
        "@type": "Offer",
        price: "1500",
        priceCurrency: "GBP",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1500",
          priceCurrency: "GBP",
          unitText: "MONTH",
        },
      },
    },
  ],
};

export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
