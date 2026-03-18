import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafetería Ébenezer",
  description: "Café de día, pizza de noche. Granos seleccionados y pizzas artesanales.",
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
