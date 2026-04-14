import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import InfoStrip from "./components/InfoStrip";
import Script from "next/script";
import { SITE } from "@/lib/config/site";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cafeteria-ebenezer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ébenezer · Café de día, pizza de noche",
    template: "%s · Cafetería Ébenezer",
  },
  description:
    "Cafetería Ébenezer en Valdepeñas. Café de especialidad, repostería artesanal y pizzas al horno de leña. Una experiencia gastronómica de alta hospitalidad en Ciudad Real.",
  keywords: [
    "Cafetería Ébenezer",
    "Cafetería Valdepeñas",
    "Pizza Valdepeñas",
    "Café de especialidad Ciudad Real",
    "Pizza artesanal",
    "Restaurante Valdepeñas",
    "Brunch Valdepeñas",
  ],
  authors: [{ name: "Cafetería Ébenezer" }],
  creator: "Cafetería Ébenezer",
  icons: {
    icon: "https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171811/favicon_avmzwi.png",
    shortcut: "https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171811/favicon_avmzwi.png",
    apple: "https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171811/favicon_avmzwi.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Ébenezer · Café de día, pizza de noche",
    description:
      "Una experiencia gastronómica en Valdepeñas. Café de especialidad y pizzas artesanales en un mismo lugar.",
    url: baseUrl,
    siteName: "Cafetería Ébenezer",
    images: [
      {
        url: "https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.21_3_vigfru.jpg",
        width: 1200,
        height: 630,
        alt: "Cafetería Ébenezer — Café de día, pizza de noche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ébenezer · Café de día, pizza de noche",
    description:
      "Café de especialidad y pizzas artesanales en Valdepeñas. Una experiencia gastronómica única.",
    images: ["https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.21_3_vigfru.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0905",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Cafetería Ébenezer",
    image: "https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.21_3_vigfru.jpg",
    description:
      "Cafetería de especialidad y pizzería artesanal en Valdepeñas. Café de día, pizza de noche.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: "ES",
    },
    telephone: SITE.phone.display,
    url: baseUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
    ],
    servesCuisine: ["Coffee", "Italian", "Pizza", "Brunch"],
    priceRange: "€€",
    acceptsReservations: "True",
  };

  return (
    <html lang="es">
      <body>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
          strategy="beforeInteractive"
        />
        <InfoStrip />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
