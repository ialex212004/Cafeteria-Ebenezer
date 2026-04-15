'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SplashScreen from '../../components/SplashScreen';

export default function InicioPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<'day' | 'night' | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0,
      H = 0,
      af = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particleCount = window.innerWidth < 768 ? 24 : 42;
    const pts = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -Math.random() * 0.18 - 0.03,
      a: Math.random() * 0.4 + 0.08,
    }));

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.a})`;
        ctx.fill();
      });
      af = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(af);
    };
  }, []);

  return (
    <>
      <SplashScreen />
      <style jsx global>{`
        /* ── HERO ── */
        #hero {
          position: relative;
          height: calc(100vh - var(--stack));
          min-height: 640px;
          display: flex;
          overflow: hidden;
          margin-top: var(--stack);
        }
        .hero-bg-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.35;
        }
        .hero-panel {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
          transition: flex 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          min-width: 0;
          cursor: pointer;
        }
        .hero-panel.expanded {
          flex: 1.55;
        }
        .hero-panel.shrunk {
          flex: 0.85;
        }
        .hero-panel img {
          position: absolute !important;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s var(--ease-silk);
          filter: brightness(0.42) saturate(0.72) contrast(1.04);
          transform: scale(1.05);
        }
        .hero-panel.expanded img {
          transform: scale(1.09);
          filter: brightness(0.55) saturate(0.88) contrast(1.02);
        }
        .hero-grad {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
        .hero-panel--day .hero-grad {
          background:
            linear-gradient(180deg, rgba(8, 6, 3, 0.1) 0%, rgba(8, 6, 3, 0.4) 50%, rgba(8, 6, 3, 0.95) 100%),
            linear-gradient(to right, rgba(8, 6, 3, 0.65) 0%, transparent 45%),
            radial-gradient(ellipse 70% 50% at 25% 75%, rgba(201, 169, 110, 0.12) 0%, transparent 70%);
        }
        .hero-panel--night .hero-grad {
          background:
            linear-gradient(180deg, rgba(8, 6, 3, 0.1) 0%, rgba(8, 6, 3, 0.4) 50%, rgba(8, 6, 3, 0.95) 100%),
            linear-gradient(to left, rgba(8, 6, 3, 0.65) 0%, transparent 45%),
            radial-gradient(ellipse 70% 50% at 75% 75%, rgba(180, 92, 50, 0.14) 0%, transparent 70%);
        }
        .hero-divider {
          position: absolute;
          top: 15%;
          bottom: 15%;
          right: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(201, 169, 110, 0.35) 50%, transparent 100%);
          z-index: 5;
          pointer-events: none;
        }
        .hero-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--champagne);
          transform: translate(-50%, -50%) rotate(45deg);
          box-shadow: 0 0 24px rgba(201, 169, 110, 0.6);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          padding: 3rem clamp(3rem, 7vw, 7rem) 4rem;
          width: 100%;
          max-width: 48rem;
        }
        .hero-index {
          font-family: var(--font-sans);
          font-size: 0.64rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--stone);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          opacity: 0;
          animation: heroUp 1.4s 0.4s both var(--ease-silk);
        }
        .hero-index b {
          color: var(--champagne);
          font-weight: 400;
        }
        .hero-index::before {
          content: '';
          width: 42px;
          height: 1px;
          background: var(--champagne);
        }
        .hero-tag {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.62rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: heroUp 1.4s 0.55s both var(--ease-silk);
        }
        .hero-title {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 5.6vw, 5.8rem);
          line-height: 0.98;
          letter-spacing: -0.015em;
          color: var(--pearl);
          margin-bottom: 1.75rem;
          opacity: 0;
          animation: heroUp 1.6s 0.7s both var(--ease-silk);
        }
        .hero-title em {
          font-style: italic;
          font-weight: 400;
          color: var(--champagne);
          display: inline-block;
        }
        .hero-sub {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          line-height: 1.85;
          color: var(--taupe);
          max-width: 36ch;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: heroUp 1.4s 0.85s both var(--ease-silk);
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          font-family: var(--font-sans);
          font-size: 0.64rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--pearl);
          padding: 1.05rem 0;
          position: relative;
          transition: color 0.55s var(--ease-silk), letter-spacing 0.55s var(--ease-silk);
          opacity: 0;
          animation: heroUp 1.4s 1s both var(--ease-silk);
        }
        .hero-cta::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--champagne);
        }
        .hero-cta::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 12px;
          height: 1px;
          background: var(--pearl);
          transition: width 0.55s var(--ease-silk), background 0.4s;
        }
        .hero-cta:hover {
          color: var(--champagne);
          letter-spacing: 0.32em;
        }
        .hero-cta:hover::after {
          width: 100%;
          background: var(--champagne);
        }
        .hero-cta svg {
          width: 14px;
          height: 14px;
          transition: transform 0.55s var(--ease-silk);
        }
        .hero-cta:hover svg {
          transform: translateX(6px);
        }

        .hero-meta {
          position: absolute;
          bottom: 2rem;
          left: clamp(3rem, 7vw, 7rem);
          right: clamp(3rem, 7vw, 7rem);
          z-index: 11;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--stone);
          opacity: 0;
          animation: heroUp 1.4s 1.2s both var(--ease-silk);
          pointer-events: none;
        }
        .hero-meta b {
          color: var(--champagne);
          font-weight: 400;
        }

        @keyframes heroUp {
          from {
            opacity: 0;
            transform: translateY(34px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── PHILOSOPHY ── */
        .philosophy {
          position: relative;
          padding: clamp(8rem, 14vw, 14rem) clamp(1.5rem, 5vw, 5rem);
          text-align: center;
          background: var(--obsidian);
          overflow: hidden;
        }
        .philosophy::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201, 169, 110, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .philosophy-inner {
          position: relative;
          max-width: 920px;
          margin: 0 auto;
        }
        .philosophy-mark {
          font-family: var(--font-italiana);
          font-size: 1.1rem;
          color: var(--champagne);
          letter-spacing: 0.3em;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }
        .philosophy-quote {
          font-family: var(--font-display);
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1.8rem, 3.8vw, 3.2rem);
          line-height: 1.35;
          color: var(--pearl);
          letter-spacing: -0.005em;
        }
        .philosophy-quote em {
          font-weight: 400;
          color: var(--champagne);
          font-style: italic;
        }
        .philosophy-signature {
          margin-top: 3rem;
          font-family: var(--font-italiana);
          font-size: 1.4rem;
          color: var(--taupe);
          letter-spacing: 0.08em;
        }
        .philosophy-role {
          margin-top: 0.6rem;
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--stone);
        }

        /* ── PILLARS ── */
        .pillars {
          position: relative;
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
          border-top: 1px solid var(--border-hair);
          border-bottom: 1px solid var(--border-hair);
        }
        .pillars-inner {
          max-width: 1240px;
          margin: 0 auto;
        }
        .pillars-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--border-hair);
        }
        .pillar {
          position: relative;
          padding: 3rem 2.5rem 0.5rem;
          border-right: 1px solid var(--border-hair);
          text-align: center;
          transition: background 0.6s var(--ease-silk);
        }
        .pillar:last-child {
          border-right: none;
        }
        .pillar:hover {
          background: rgba(201, 169, 110, 0.02);
        }
        .pillar-num {
          font-family: var(--font-italiana);
          font-size: 2.8rem;
          color: var(--champagne);
          line-height: 1;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }
        .pillar-title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.4rem;
          color: var(--pearl);
          margin-bottom: 1rem;
          letter-spacing: 0.01em;
        }
        .pillar-title em {
          font-style: italic;
          color: var(--champagne);
        }
        .pillar-text {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          color: var(--taupe);
          line-height: 1.85;
          max-width: 28ch;
          margin: 0 auto;
        }

        /* ── INVITATION ── */
        .invitation {
          position: relative;
          padding: clamp(7rem, 12vw, 12rem) clamp(1.5rem, 5vw, 5rem);
          text-align: center;
          background:
            linear-gradient(180deg, rgba(8, 6, 3, 0.72) 0%, rgba(8, 6, 3, 0.9) 100%),
            url('https://images.unsplash.com/photo-1514432324607-2e467f4af498?auto=format&fit=crop&w=1800&q=80') center/cover;
          background-attachment: fixed;
        }
        .invitation-inner {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .invitation-title {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
          line-height: 1.05;
          color: var(--pearl);
          margin-bottom: 2rem;
        }
        .invitation-title em {
          font-style: italic;
          font-weight: 400;
          color: var(--champagne);
        }
        .invitation-sub {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1rem;
          color: var(--ivory);
          line-height: 1.85;
          margin-bottom: 2.8rem;
          max-width: 48ch;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 900px) {
          #hero {
            flex-direction: column;
            height: auto;
          }
          .hero-panel {
            min-height: 58vh;
          }
          .hero-content {
            padding: 2.5rem 2rem 3rem;
          }
          .hero-divider {
            display: none;
          }
          .hero-meta {
            position: relative;
            bottom: auto;
            left: auto;
            right: auto;
            padding: 1rem 2rem 2rem;
          }
          .pillars-grid {
            grid-template-columns: 1fr;
          }
          .pillar {
            border-right: none;
            border-bottom: 1px solid var(--border-hair);
            padding: 3rem 2rem;
          }
          .pillar:last-child {
            border-bottom: none;
          }
          .invitation {
            background-attachment: scroll;
          }
        }
        @media (max-width: 600px) {
          .hero-panel {
            min-height: 44vh;
          }
          .hero-content {
            padding: 1.75rem 1.5rem 2.25rem;
            max-width: 100%;
          }
          .hero-title {
            font-size: clamp(2rem, 8vw, 2.6rem);
            margin-bottom: 1.1rem;
          }
          .hero-sub {
            font-size: 0.86rem;
            margin-bottom: 1.75rem;
          }
          .hero-meta {
            padding: 0.75rem 1.5rem 1.5rem;
            font-size: 0.52rem;
          }
          .philosophy {
            padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4rem);
          }
          .pillars {
            padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4rem);
          }
          .pillars-header {
            margin-bottom: 3rem;
          }
          .pillar {
            padding: 2.5rem 1.5rem;
          }
          .invitation {
            padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4rem);
          }
        }
        @media (max-width: 400px) {
          .hero-panel {
            min-height: 40vh;
          }
          .hero-content {
            padding: 1.5rem 1.25rem 1.75rem;
          }
          .hero-title {
            font-size: 1.9rem;
            margin-bottom: 0.85rem;
          }
          .hero-sub {
            font-size: 0.83rem;
            line-height: 1.65;
          }
          .hero-index {
            margin-bottom: 1rem;
          }
          .hero-tag {
            margin-bottom: 0.85rem;
          }
        }
        /* ── Breakpoint 480px: teléfonos medianos ── */
        @media (max-width: 480px) {
          /* Canvas de partículas: mantener dentro del viewport, no scroll */
          .hero-bg-canvas {
            position: fixed;
            width: 100vw;
            height: 100vh;
          }
          .hero-panel {
            min-height: 42vh;
          }
          .hero-content {
            padding: 1.5rem 1rem 2rem;
          }
          .hero-title {
            font-size: clamp(1.9rem, 7.5vw, 2.4rem);
            margin-bottom: 1rem;
          }
          .hero-sub {
            font-size: 0.84rem;
            max-width: 100%;
            margin-bottom: 1.5rem;
          }
          .hero-cta {
            font-size: 0.58rem;
          }
          .hero-index {
            margin-bottom: 0.85rem;
          }
          .hero-tag {
            margin-bottom: 1rem;
          }
          .philosophy {
            padding: clamp(3.5rem, 7vw, 6rem) clamp(1rem, 4vw, 3rem);
          }
          .philosophy-quote {
            font-size: clamp(1.5rem, 4.5vw, 2.2rem);
          }
          .pillar {
            padding: 2rem 1rem;
          }
          .invitation {
            padding: clamp(3.5rem, 7vw, 6rem) clamp(1rem, 4vw, 3rem);
          }
        }

        /* ── Breakpoint 390px: iPhone SE / pantallas pequeñas ── */
        @media (max-width: 390px) {
          .hero-panel {
            min-height: 38vh;
          }
          .hero-content {
            padding: 1.25rem 1rem 1.5rem;
          }
          .hero-title {
            font-size: 1.75rem;
          }
          .hero-meta {
            font-size: 0.48rem;
            padding: 0.5rem 1rem 1rem;
          }
        }

        /* Desactivar expand/shrink en dispositivos táctiles */
        @media (hover: none) {
          .hero-panel.expanded,
          .hero-panel.shrunk {
            flex: 1 !important;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="hero-bg-canvas" aria-hidden="true" />

      <section id="hero">
        <div
          className={`hero-panel hero-panel--day${
            hoveredPanel === 'day' ? ' expanded' : hoveredPanel === 'night' ? ' shrunk' : ''
          }`}
          onMouseEnter={() => setHoveredPanel('day')}
          onMouseLeave={() => setHoveredPanel(null)}
          onFocus={() => setHoveredPanel('day')}
          onBlur={() => setHoveredPanel(null)}
        >
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1800&q=85"
            alt="Espresso en taza de porcelana"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <div className="hero-grad" />
          <div className="hero-divider" />
          <div className="hero-content">
            <p className="hero-index">
              Cap. <b>I</b> — La mañana
            </p>
            <span className="hero-tag">— Café de especialidad</span>
            <h1 className="hero-title">
              El arte del
              <br />
              <em>despertar</em>
            </h1>
            <p className="hero-sub">
              Granos de origen único, tostados a diario. Cada taza, una composición silenciosa
              para comenzar el día con reverencia.
            </p>
            <Link href="/menu" className="hero-cta">
              Descubrir la carta de café
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="hero-meta">
            <span>08:00 — 16:00</span>
            <span>
              Servicio <b>Cafetería</b>
            </span>
          </div>
        </div>

        <div
          className={`hero-panel hero-panel--night${
            hoveredPanel === 'night' ? ' expanded' : hoveredPanel === 'day' ? ' shrunk' : ''
          }`}
          onMouseEnter={() => setHoveredPanel('night')}
          onMouseLeave={() => setHoveredPanel(null)}
          onFocus={() => setHoveredPanel('night')}
          onBlur={() => setHoveredPanel(null)}
        >
          <Image
            src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1800&q=85"
            alt="Pizza artesanal en horno de leña"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <div className="hero-grad" />
          <div className="hero-content">
            <p className="hero-index">
              Cap. <b>II</b> — La noche
            </p>
            <span className="hero-tag">— Pizzería artesana</span>
            <h2 className="hero-title">
              La noche
              <br />
              <em>servida</em>
            </h2>
            <p className="hero-sub">
              Masa madre de 48 horas, horno de piedra a 480°C. Ingredientes que cuentan
              la historia de la tierra que los vio nacer.
            </p>
            <Link href="/menu" className="hero-cta">
              Explorar nuestras pizzas
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              Servicio <b>Pizzería</b>
            </span>
            <span>16:00 — 23:00</span>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="philosophy-inner">
          <p className="philosophy-mark reveal">— Nuestra filosofía —</p>
          <h2 className="philosophy-quote reveal reveal-delay-1">
            &ldquo;No servimos café ni pizza. Servimos el tiempo que decides
            dedicarte: cada grano, cada masa, cada minuto, <em>elegidos con devoción</em>.&rdquo;
          </h2>
          <div className="philosophy-signature reveal reveal-delay-2">Ébenezer</div>
          <div className="philosophy-role reveal reveal-delay-2">Chef · Fundador</div>
        </div>
      </section>

      <section className="pillars">
        <div className="pillars-inner">
          <div className="pillars-header">
            <div className="eyebrow center reveal" style={{ marginBottom: '1.5rem' }}>
              La casa
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              Tres pilares, <em>un solo oficio</em>
            </h2>
          </div>
          <div className="pillars-grid">
            <div className="pillar reveal reveal-delay-1">
              <div className="pillar-num">I</div>
              <h3 className="pillar-title">
                <em>Materia</em> prima
              </h3>
              <p className="pillar-text">
                Productores seleccionados, trazabilidad absoluta y temporada como única ley.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-2">
              <div className="pillar-num">II</div>
              <h3 className="pillar-title">
                <em>Oficio</em> artesano
              </h3>
              <p className="pillar-text">
                Técnicas pacientes, manos expertas y una obsesión silenciosa por el detalle.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-3">
              <div className="pillar-num">III</div>
              <h3 className="pillar-title">
                <em>Hospitalidad</em>
              </h3>
              <p className="pillar-text">
                Recibirte como a un amigo, cuidar cada minuto que nos regalas bajo nuestro techo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="invitation">
        <div className="invitation-inner">
          <div className="eyebrow center reveal" style={{ marginBottom: '2rem' }}>
            Una mesa te espera
          </div>
          <h2 className="invitation-title reveal reveal-delay-1">
            Concédenos el placer
            <br />
            de <em>recibirte</em>
          </h2>
          <p className="invitation-sub reveal reveal-delay-2">
            La experiencia Ébenezer está pensada para saborearse sin prisa. Reserva tu mesa
            y deja que nos ocupemos de todo lo demás.
          </p>
          <Link href="/contacto" className="lux-btn reveal reveal-delay-3">
            <span>Reservar una mesa</span>
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
