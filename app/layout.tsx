import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "BigOne Agency — #1 Marketing Agency for Trucking & Logistics Companies",
  description: "BigOne is a top marketing agency exclusively for trucking and logistics companies. We offer SMM, video production, website development, lead generation, graphic design, and brand faces. Grow your freight business with BigOne.",
  keywords: [
    "BigOne", "Big One", "BigOne agency", "Big One agency",
    "BigOne marketing", "Big One marketing",
    "logistics marketing agency", "trucking marketing agency",
    "freight marketing", "logistics agency",
    "marketing for trucking companies", "marketing for logistics",
    "SMM for logistics", "lead generation logistics",
    "bigoneagency.com", "bigone.co",
    "truck marketing", "freight company marketing",
    "logistics branding", "logistics SEO",
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
