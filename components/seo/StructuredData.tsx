export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trailbliz",
    url: "https://www.trailbliz.in",
    description:
      "A student career platform for building profiles, tracking coding progress and discovering internships and job opportunities.",

    publisher: {
      "@type": "Organization",
      name: "Trailbliz",
      url: "https://www.trailbliz.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.trailbliz.in/trailbliz.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}