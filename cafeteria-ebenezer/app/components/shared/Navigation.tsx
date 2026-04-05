'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { href: '/inicio', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/menu', label: 'Menú' },
  { href: '/galeria', label: 'Galería' },
  { href: '/resenas', label: 'Reseñas' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.style.paddingRight = menuOpen && scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    if (menuTimeoutRef.current) {
      window.clearTimeout(menuTimeoutRef.current);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 300;
          transition: background 0.4s, backdrop-filter 0.4s;
        }
        nav.scrolled {
          background: rgba(14, 11, 8, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(210, 185, 140, 0.08);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
        }
        .nav-logo {
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #f2ece0;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 301;
          text-decoration: none;
        }
        .nav-logo span {
          color: #d4a853;
          font-style: italic;
        }

        /* ── HAMBURGER ── */
        .menu-toggle {
          position: relative;
          z-index: 301;
          width: 48px;
          height: 48px;
          background: transparent;
          border: 1px solid rgba(210, 185, 140, 0.16);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: border-color 0.3s, outline 0.3s;
          border-radius: 4px;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .menu-toggle:hover {
          border-color: #d4a853;
        }
        .menu-toggle:focus-visible {
          outline-color: #d4a853;
        }
        .menu-toggle .bar {
          width: 20px;
          height: 1.5px;
          background: #f2ece0;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s, background 0.3s;
          transform-origin: center;
        }
        .menu-toggle.open .bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: #d4a853;
        }
        .menu-toggle.open .bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .menu-toggle.open .bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: #d4a853;
        }

        /* ── OVERLAY ── */
        #menuOverlay {
          position: fixed;
          inset: 0;
          z-index: 250;
          display: grid;
          grid-template-columns: 1fr 1fr;
          pointer-events: none;
          visibility: hidden;
        }
        .overlay-panel {
          background: #131009;
          transform: translateY(-100%);
          transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .overlay-panel:nth-child(2) {
          background: #18140d;
          transition-delay: 0.05s;
        }
        #menuOverlay.open {
          pointer-events: all;
          visibility: visible;
        }
        #menuOverlay.open .overlay-panel {
          transform: translateY(0);
        }

        #menuContent {
          position: fixed;
          inset: 0;
          z-index: 260;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 8vw;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s 0.25s, visibility 0s linear 0.55s;
        }
        #menuContent.open {
          opacity: 1;
          pointer-events: all;
          visibility: visible;
          transition: opacity 0.3s 0.25s, visibility 0s;
        }

        .overlay-nav-list {
          list-style: none;
          margin-bottom: 3rem;
        }
        .overlay-nav-item {
          overflow: visible;
          margin-bottom: 0.25rem;
        }
        .overlay-nav-link {
          display: inline-block;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700;
          color: #f2ece0;
          letter-spacing: -0.02em;
          text-decoration: none;
          transform: translateY(110%);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s;
          will-change: transform;
          padding: 0.75rem 0.5rem;
          border-radius: 4px;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .overlay-nav-link:focus-visible {
          outline-color: #d4a853;
        }
        #menuContent.open .overlay-nav-link {
          transform: translateY(0);
        }
        .overlay-nav-item:nth-child(1) .overlay-nav-link {
          transition-delay: 0.28s;
        }
        .overlay-nav-item:nth-child(2) .overlay-nav-link {
          transition-delay: 0.33s;
        }
        .overlay-nav-item:nth-child(3) .overlay-nav-link {
          transition-delay: 0.38s;
        }
        .overlay-nav-item:nth-child(4) .overlay-nav-link {
          transition-delay: 0.43s;
        }
        .overlay-nav-item:nth-child(5) .overlay-nav-link {
          transition-delay: 0.48s;
        }
        .overlay-nav-item:nth-child(6) .overlay-nav-link {
          transition-delay: 0.53s;
        }
        .overlay-nav-link:hover {
          color: #d4a853;
        }

        .overlay-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-top: 1px solid rgba(210, 185, 140, 0.08);
          padding-top: 2rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s 0.6s, transform 0.5s 0.6s;
        }
        #menuContent.open .overlay-bottom {
          opacity: 1;
          transform: translateY(0);
        }
        .overlay-tagline {
          font-family: 'Poppins', sans-serif;
          font-style: italic;
          font-size: 1rem;
          color: #9d9184;
          line-height: 1.6;
        }
        .overlay-tagline em {
          color: #d4a853;
        }
        .overlay-social {
          display: flex;
          gap: 2rem;
        }
        .overlay-social a {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c9b896;
          transition: color 0.2s;
          text-decoration: none;
          padding: 0.5rem 0.25rem;
          border-radius: 3px;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .overlay-social a:hover {
          color: #d4a853;
        }
        .overlay-social a:focus-visible {
          outline-color: #d4a853;
        }

        @media (max-width: 768px) {
          .nav-inner {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="/inicio" className="nav-logo" onClick={closeMenu}>
            Cafetería <span>Ébenezer</span>
          </Link>
          <button className={`menu-toggle${menuOpen ? ' open' : ''}`} onClick={toggleMenu} aria-label="Abrir menú">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      {/* OVERLAY FONDO */}
      <div id="menuOverlay" className={menuOpen ? 'open' : ''}>
        <div className="overlay-panel" />
        <div className="overlay-panel" />
      </div>

      {/* OVERLAY CONTENIDO */}
      <div id="menuContent" className={menuOpen ? 'open' : ''}>
        <ul className="overlay-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="overlay-nav-item">
              <Link href={item.href} className="overlay-nav-link" onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="overlay-bottom">
          <p className="overlay-tagline">
            <em>Café</em> de día. <em>Pizza</em> de noche.
          </p>
          <div className="overlay-social">
            <a href="https://www.instagram.com/ebenezer_valdepenas/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://wa.me/34623272728?text=Hola%2C%20me%20gustaría%20obtener%20más%20información" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
