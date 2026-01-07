import Script from "next/script";

export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deemo", // Change this to your real name if preferred
    url: "https://www.deemo.dev", // Replace with actual URL
    jobTitle: "Frontend Developer",
    sameAs: [
      "https://github.com/play3step/portfolio_web_site", // Replace with actual links
    ],
    worksFor: {
      "@type": "Organization",
      name: "Open for Opportunities",
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
