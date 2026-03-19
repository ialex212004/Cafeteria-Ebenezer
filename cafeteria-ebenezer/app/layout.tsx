import { Analytics } from "@vercel/analytics/react"
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}<Analytics /></body>
    </html>
  );
}
