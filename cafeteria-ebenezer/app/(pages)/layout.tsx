'use client';

import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
