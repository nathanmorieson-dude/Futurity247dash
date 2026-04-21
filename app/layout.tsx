import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const SITE_URL = "https://futurity247.com.au";
const SITE_NAME = "Futurity247";
const TITLE = "Futurity247 — 24/7 AI receptionist for Australian electricians";
const DESCRIPTION =
  "Australia's AI receptionist for electricians. Billie answers your phone 24/7, books jobs straight into Google Calendar, escalates emergencies to your mobile in under 30 seconds, and never misses a high-value lead. Built for Brisbane sparkies and small commercial crews.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Futurity247",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "AI receptionist",
    "electrician answering service",
    "Brisbane electrician",
    "after-hours answering service",
    "sparky answering service",
    "electrical contractor software",
    "Retell AI",
    "voice AI for trades",
    "24/7 call answering Australia",
    "switchboard upgrade booking",
    "EV charger install leads",
    "Queenslander rewire",
    "small business AI phone assistant",
    "tradie receptionist",
  ],
  authors: [{ name: "Futurity247" }],
  creator: "Futurity247",
  publisher: "Futurity247",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@futurity247",
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
  category: "Business Software",
  other: {
    "geo.region": "AU-QLD",
    "geo.placename": "Brisbane",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  taxID: "95 154 050 712",
  vatID: "95 154 050 712",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ABN",
    value: "95154050712",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brisbane",
    addressRegion: "QLD",
    addressCountry: "AU",
    postalCode: "4000",
  },
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@futurity247.com.au",
    telephone: "+61-405-510-693",
    availableLanguage: ["en-AU"],
    areaServed: "AU",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Futurity247",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  offers: [
    {
      "@type": "Offer",
      name: "Pro",
      price: 499,
      priceCurrency: "AUD",
      priceValidUntil: "2026-12-31",
      description: "Solo sparky · up to 3 utes, 500 minutes/month",
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: 999,
      priceCurrency: "AUD",
      priceValidUntil: "2026-12-31",
      description: "4+ utes · commercial, 1,500 minutes/month",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "24",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${GeistSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareJsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
