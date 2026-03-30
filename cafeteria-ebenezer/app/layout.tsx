import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    images: [
      {
        url: "/file.svg", // Cambia por la imagen que prefieras
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
    images: ["/file.svg"], // Cambia por la imagen que prefieras
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
