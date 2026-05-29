import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "BigOne Agency — #1 Marketing Agency for Trucking & Logistics Companies",
  description: "BigOne Agency is a full-service digital marketing agency exclusively for trucking, freight, and logistics companies. We specialize in SMM, video production, website development, lead generation, graphic design, and brand representation. Trusted by logistics businesses worldwide to grow their brand and attract more clients.",
  keywords: [
    // Brand
    "BigOne", "Big One", "BigOne agency", "Big One agency",
    "BigOne marketing", "Big One marketing", "bigone co", "bigone.co",
    "bigoneagency", "bigoneagency.com", "bigone marketing agency",

    // Core services + logistics
    "logistics marketing agency", "trucking marketing agency",
    "freight marketing agency", "transportation marketing agency",
    "logistics digital marketing", "trucking digital marketing",
    "freight digital marketing", "logistics advertising agency",
    "trucking advertising agency", "carrier marketing agency",

    // SMM
    "SMM for logistics", "SMM for trucking", "social media marketing logistics",
    "social media marketing trucking", "logistics social media agency",
    "trucking social media management", "freight company social media",

    // Lead generation
    "lead generation logistics", "lead generation trucking",
    "trucking leads", "freight leads", "logistics leads",
    "how to get clients for trucking company", "trucking client acquisition",

    // Website
    "logistics website design", "trucking website development",
    "freight company website", "logistics web design agency",

    // Video
    "logistics video production", "trucking video marketing",
    "freight company video content", "logistics content creation",

    // Branding
    "logistics branding", "trucking company branding",
    "freight brand identity", "logistics SEO",
    "trucking SEO agency", "logistics graphic design",

    // General marketing
    "marketing for trucking companies", "marketing for logistics companies",
    "marketing for freight companies", "marketing for carriers",
    "truck marketing", "freight company marketing",
    "how to market a trucking company", "logistics growth agency",
    "trucking company promotion", "logistics promotion agency",

    // Industry terms
    "freight broker marketing", "dispatcher marketing",
    "fleet marketing", "owner operator marketing",
    "logistics brand faces", "trucking brand ambassador",
  ],
  authors: [{ name: "BigOne Agency", url: "https://bigoneagency.com" }],
  creator: "BigOne Agency",
  publisher: "BigOne Agency",
  metadataBase: new URL("https://bigoneagency.com"),
  alternates: {
    canonical: "https://bigoneagency.com",
  },
  openGraph: {
    title: "BigOne Agency — Marketing for Trucking & Logistics",
    description: "Full-service marketing agency exclusively for trucking and logistics companies. SMM, Video, Website, Lead Generation & more.",
    url: "https://bigoneagency.com",
    siteName: "BigOne Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BigOne Agency — Marketing for Trucking & Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigOne Agency — Marketing for Trucking & Logistics",
    description: "Full-service marketing agency exclusively for trucking and logistics companies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "bwXGrdLGbfWsTFyJudK1S0zOoQNnwP23VZBq489baQU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MarketingAgency",
              "name": "BigOne Agency",
              "alternateName": ["Big One Agency", "BigOne", "BigOne Marketing"],
              "url": "https://bigoneagency.com",
              "logo": "https://bigoneagency.com/logo.png",
              "description": "BigOne is a full-service marketing agency exclusively for trucking and logistics companies.",
              "telephone": "+998940630880",
              "email": "bigonecomarketing@gmail.com",
              "sameAs": [
                "https://www.instagram.com/bigone.co/",
                "https://t.me/bigone_co"
              ],
              "serviceArea": {
                "@type": "Place",
                "name": "Worldwide"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Marketing Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SMM Management for Logistics" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Production" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lead Generation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional Brand Faces" } }
                ]
              }
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
