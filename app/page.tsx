"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <Navbar />
      <HeroSection />
      <MenuSection onOrderItem={setSelectedProduct} />
      <AboutSection />
      <GallerySection />
      <ContactSection selectedProduct={selectedProduct} />
      <Footer />
    </div>
  );
};

export default Index;
