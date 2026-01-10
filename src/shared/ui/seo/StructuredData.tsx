export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deemo",
    url: "https://www.deemo.dev",
    jobTitle: "Frontend Developer",
    sameAs: ["https://github.com/play3step/portfolio_web_site"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
