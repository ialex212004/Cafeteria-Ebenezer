import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Cafeteria Ebenezer',
  description: 'Sitio web de Cafeteria Ebenezer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
