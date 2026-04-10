'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { href: '/inicio', label: 'Inicio', number: '01' },
  { href: '/nosotros', label: 'Nosotros', number: '02' },
  { href: '/menu', label: 'Menú', number: '03' },
  { href: '/galeria', label: 'Galería', number: '04' },
  { href: '/resenas', label: 'Reseñas', number: '05' },
  { href: '/contacto', label: 'Contacto', number: '06' },
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
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

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    if (menuTimeoutRef.current) window.clearTimeout(menuTimeoutRef.current);
  }, []);

  return (
    <>
      <style jsx>{`
        nav {
          position: fixed;
          top: var(--info-h);
          left: 0;
          right: 0;
          height: var(--nav-h);
          z-index: 300;
          display: flex;
          align-items: center;
          transition: background 0.6s var(--ease-silk), backdrop-filter 0.6s, border-color 0.6s, height 0.4s;
          border-bottom: 1px solid transparent;
        }
        nav.scrolled {
          background: rgba(8, 6, 3, 0.72);
          backdrop-filter: blur(24px) saturate(1.1);
          -webkit-backdrop-filter: blur(24px) saturate(1.1);
          border-bottom-color: rgba(201, 169, 110, 0.1);
        }
        .nav-inner {
          position: relative;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 clamp(1.25rem, 3vw, 3rem);
          gap: 2rem;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--taupe);
          font-weight: 300;
        }
        .nav-left .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--champagne);
          animation: pulse 2.4s ease-in-out infinite;
        }
        .nav-left b {
          color: var(--champagne);
          font-weight: 400;
        }
        .nav-logo {
          font-family: var(--font-italiana);
          font-size: clamp(1.5rem, 2vw, 1.85rem);
          color: var(--pearl);
          letter-spacing: 0.04em;
          position: relative;
          z-index: 301;
          text-align: center;
          transition: color 0.4s var(--ease-silk);
          text-transform: uppercase;
        }
        .nav-logo-bracket {
          color: var(--champagne);
          font-size: 0.55em;
          vertical-align: middle;
          margin: 0 0.4em;
          opacity: 0.6;
        }
        .nav-logo:hover {
          color: var(--champagne);
        }
        .nav-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1.5rem;
        }
        .nav-reserve {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--champagne);
          padding: 0.7rem 1.35rem;
          border: 1px solid var(--border-soft);
          transition: all 0.55s var(--ease-silk);
          white-space: nowrap;
        }
        .nav-reserve:hover {
          background: var(--champagne);
          color: var(--ink);
          border-color: var(--champagne);
        }
        .menu-toggle {
          position: relative;
          z-index: 501;
          width: 52px;
          height: 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-soft);
          border-radius: 0;
          transition: all 0.5s var(--ease-silk);
        }
        .menu-toggle:hover {
          border-color: var(--champagne);
          background: rgba(201, 169, 110, 0.06);
        }
        .menu-toggle:focus-visible {
          outline: 2px solid var(--champagne);
          outline-offset: 3px;
        }
        .menu-toggle .bar {
          width: 18px;
          height: 1px;
          background: var(--pearl);
          transition: transform 0.55s var(--ease-couture), opacity 0.35s, width 0.4s;
        }
        .menu-toggle .bar:nth-child(2) {
          width: 12px;
          align-self: flex-end;
          margin-right: 17px;
        }
        .menu-toggle:hover .bar:nth-child(2) {
          width: 18px;
          margin-right: 17px;
        }
        .menu-toggle.open .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
          background: var(--champagne);
        }
        .menu-toggle.open .bar:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }
        .menu-toggle.open .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
          background: var(--champagne);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* ── OVERLAY ── */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 400;
          display: grid;
          grid-template-columns: 1fr 1fr;
          pointer-events: none;
          visibility: hidden;
        }
        .overlay-panel {
          transform: translateY(-100%);
          transition: transform 0.95s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: transform;
          position: relative;
          overflow: hidden;
        }
        .overlay-panel:nth-child(1) {
          background: linear-gradient(180deg, #0c0905 0%, #15110a 100%);
        }
        .overlay-panel:nth-child(2) {
          background: linear-gradient(180deg, #100c07 0%, #1c170e 100%);
          transition-delay: 0.08s;
        }
        .overlay-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 90%, rgba(201, 169, 110, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .menu-overlay.open {
          pointer-events: all;
          visibility: visible;
        }
        .menu-overlay.open .overlay-panel {
          transform: translateY(0);
        }

        .menu-content {
          position: fixed;
          inset: 0;
          z-index: 450;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(6rem, 10vh, 8rem) clamp(2rem, 8vw, 8vw) clamp(3rem, 6vh, 5rem);
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s 0.4s, visibility 0s linear 0.95s;
        }
        .menu-content.open {
          opacity: 1;
          pointer-events: all;
          visibility: visible;
          transition: opacity 0.5s 0.4s, visibility 0s;
        }

        .overlay-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-sans);
          font-size: 0.62rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s 0.75s, transform 0.7s 0.75s;
        }
        .overlay-eyebrow::before {
          content: '';
          width: 48px;
          height: 1px;
          background: var(--champagne);
        }
        .menu-content.open .overlay-eyebrow {
          opacity: 1;
          transform: translateY(0);
        }

        .overlay-nav-list {
          list-style: none;
          margin-bottom: auto;
        }
        .overlay-nav-item {
          overflow: hidden;
          display: block;
          padding: 0.25rem 0;
          position: relative;
        }
        .overlay-nav-link {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 8vw, 6.2rem);
          color: var(--pearl);
          letter-spacing: -0.02em;
          line-height: 1.05;
          transform: translateY(110%);
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s;
          will-change: transform;
          padding: 0.4rem 0;
        }
        .overlay-nav-link .num {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          color: var(--stone);
          transform: translateY(-0.2em);
          transition: color 0.4s;
        }
        .overlay-nav-link .label em {
          font-style: italic;
          color: var(--champagne);
        }
        .menu-content.open .overlay-nav-link {
          transform: translateY(0);
        }
        .overlay-nav-item:nth-child(1) .overlay-nav-link { transition-delay: 0.4s; }
        .overlay-nav-item:nth-child(2) .overlay-nav-link { transition-delay: 0.47s; }
        .overlay-nav-item:nth-child(3) .overlay-nav-link { transition-delay: 0.54s; }
        .overlay-nav-item:nth-child(4) .overlay-nav-link { transition-delay: 0.61s; }
        .overlay-nav-item:nth-child(5) .overlay-nav-link { transition-delay: 0.68s; }
        .overlay-nav-item:nth-child(6) .overlay-nav-link { transition-delay: 0.75s; }

        .overlay-nav-link:hover {
          color: var(--champagne);
        }
        .overlay-nav-link:hover .num {
          color: var(--pearl);
        }

        .overlay-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: end;
          gap: 2rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(201, 169, 110, 0.12);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s 0.95s, transform 0.8s 0.95s;
        }
        .menu-content.open .overlay-bottom {
          opacity: 1;
          transform: translateY(0);
        }
        .overlay-address {
          font-family: var(--font-serif);
          font-size: 0.78rem;
          color: var(--taupe);
          font-style: italic;
          line-height: 1.6;
        }
        .overlay-address b {
          color: var(--champagne);
          font-style: normal;
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.4rem;
        }
        .overlay-center {
          text-align: center;
          font-family: var(--font-italiana);
          font-size: 1.5rem;
          color: var(--champagne);
          letter-spacing: 0.08em;
        }
        .overlay-center::before,
        .overlay-center::after {
          content: '·';
          margin: 0 0.6em;
          opacity: 0.5;
        }
        .overlay-social {
          display: flex;
          gap: 1.5rem;
          justify-content: flex-end;
        }
        .overlay-social a {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--taupe);
          transition: color 0.3s;
          padding: 0.4rem 0;
          position: relative;
        }
        .overlay-social a::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--champagne);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s var(--ease-silk);
        }
        .overlay-social a:hover {
          color: var(--champagne);
        }
        .overlay-social a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        @media (max-width: 900px) {
          .nav-left, .nav-reserve {
            display: none;
          }
          .nav-inner {
            grid-template-columns: 1fr auto;
          }
          .nav-right {
            grid-column: 2;
          }
          .nav-logo {
            grid-column: 1;
            text-align: left;
          }
        }
        @media (max-width: 768px) {
          .overlay-bottom {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }
          .overlay-social {
            justify-content: center;
          }
          .overlay-eyebrow {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-left" aria-hidden="true">
            <span className="dot" />
            <span>
              <b>Abierto</b> — 08:00 / 23:00
            </span>
          </div>
          <Link href="/inicio" className="nav-logo" onClick={closeMenu}>
            Ébenezer
          </Link>
          <div className="nav-right">
            <Link href="/contacto" className="nav-reserve" onClick={closeMenu}>
              Reservar
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              className={`menu-toggle${menuOpen ? ' open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
        <div className="overlay-panel" />
        <div className="overlay-panel" />
      </div>

      <div className={`menu-content${menuOpen ? ' open' : ''}`}>
        <p className="overlay-eyebrow">Carta de navegación</p>
        <ul className="overlay-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="overlay-nav-item">
              <Link href={item.href} className="overlay-nav-link" onClick={closeMenu}>
                <span className="num">{item.number}</span>
                <span className="label">
                  {item.label === 'Menú' ? (
                    <em>Menú</em>
                  ) : item.label === 'Contacto' ? (
                    <em>Contacto</em>
                  ) : (
                    item.label
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="overlay-bottom">
          <div className="overlay-address">
            <b>Dirección</b>
            Calle la Paz, 28-A
            <br />
            Valdepeñas · Ciudad Real
          </div>
          <div className="overlay-center">Ébenezer</div>
          <div className="overlay-social">
            <a href="https://www.instagram.com/ebenezer_valdepenas/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a
              href="https://wa.me/34623272728?text=Hola%2C%20me%20gustaría%20reservar%20en%20Cafetería%20Ébenezer"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
