import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import InfoStrip from "./components/InfoStrip";
import Script from "next/script";

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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
        url: "/file.svg",
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
    images: ["/file.svg"],
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
    image: `${baseUrl}/file.svg`,
    description:
      "Cafetería de especialidad y pizzería artesanal en Valdepeñas. Café de día, pizza de noche.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle la Paz, 28-A",
      addressLocality: "Valdepeñas",
      addressRegion: "Ciudad Real",
      postalCode: "13300",
      addressCountry: "ES",
    },
    telephone: "+34623272728",
    url: baseUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["Coffee", "Italian", "Pizza", "Brunch"],
    priceRange: "€€",
    acceptsReservations: "True",
  };

  return (
    <html lang="es">
      <head>
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <InfoStrip />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
