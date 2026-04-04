import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cafeteria-ebenezer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Cafetería Ébenezer",
  description: "Café de día, pizza de noche. Granos seleccionados y pizzas artesanales.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Cafetería Ébenezer",
    description: "Café de día, pizza de noche. Granos seleccionados y pizzas artesanales.",
    url: baseUrl,
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "Cafetería Ébenezer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafetería Ébenezer",
    description: "Café de día, pizza de noche. Granos seleccionados y pizzas artesanales.",
    images: ["/file.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
