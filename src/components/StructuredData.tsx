
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Agência iD Digital",
    "description": "Agência especializada em tráfego pago e automação com inteligência artificial, focada em resultados mensuráveis para o seu negócio.",
    "url": "https://agenciaid.com",
    "logo": "https://agenciaid.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/agenciaiddigital/",
      "https://www.facebook.com/agenciaiddigital/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "email": "idanunciosonline@gmail.com",
    "telephone": "+556199601534",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -15.7801,
        "longitude": -47.9292
      }
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instagram Ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Facebook Ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LinkedIn Ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Pages"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
