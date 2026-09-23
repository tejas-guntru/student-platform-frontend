export default function StructuredData() {
  const data = [
    // =====================================================
    // WEBSITE
    // =====================================================
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.trailbliz.in/#website",

      name: "Trailbliz",
      url: "https://www.trailbliz.in",

      description:
        "A student career platform for building profiles, tracking coding progress and discovering internships and job opportunities.",

      publisher: {
        "@id": "https://www.trailbliz.in/#organization",
      },
    },

    // =====================================================
    // TRAILBLIZ ORGANIZATION
    // =====================================================
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.trailbliz.in/#organization",

      name: "Trailbliz",
      url: "https://www.trailbliz.in",

      logo: {
        "@type": "ImageObject",
        url: "https://www.trailbliz.in/trailbliz.png",
      },
    },

    // =====================================================
    // DEVELOPER PAGE
    // =====================================================
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.trailbliz.in/developers/#webpage",

      url: "https://www.trailbliz.in/developers",

      name: "Developer | Tejas Guntru | Trailbliz",

      description:
        "Developer credits for Trailbliz. Trailbliz was developed by Tejas Guntru from TIPIX.",

      isPartOf: {
        "@id": "https://www.trailbliz.in/#website",
      },

      about: {
        "@id": "https://www.trailbliz.in/developers/#tejas-guntru",
      },
    },

    // =====================================================
    // TEJAS GUNTRU
    // =====================================================
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.trailbliz.in/developers/#tejas-guntru",

      name: "Tejas Guntru",

      url: "https://www.trailbliz.in/developers",

      image: "https://www.trailbliz.in/aipic.png",

      sameAs: [
        "https://www.linkedin.com/in/tejas-guntru/",
      ],

      affiliation: {
        "@id": "https://www.trailbliz.in/developers/#tipix",
      },
    },

    // =====================================================
    // TIPIX
    // =====================================================
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.trailbliz.in/developers/#tipix",

      name: "TIPIX",

      sameAs: [
        "https://www.linkedin.com/company/tipixofficial/",
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}