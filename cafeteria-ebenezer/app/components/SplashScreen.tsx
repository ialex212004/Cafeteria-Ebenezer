'use client';

import { useEffect, useState } from 'react';

// Cuánto tiempo mínimo debe ser visible (para que todas las animaciones de
// entrada terminen antes de que empiece la salida).
const MIN_VISIBLE_MS = 2200;
// Duración de la transición de salida (debe coincidir con el CSS de .spl--exit).
const EXIT_DURATION_MS = 1050;

// ─── Estilos del componente ───────────────────────────────────────────────────
// Se inyectan como <style> normal (no styled-jsx) para garantizar que el
// servidor los incluya en el HTML inicial. La regla crítica de posicionamiento
// (.spl) ya está en globals.css para el primer paint.
// IMPORTANTE: la transición SOLO existe en .spl--exit, nunca en .spl base,
// para evitar que dispare en el montaje inicial (hydration flash).
const SPLASH_CSS = `
  /* Fondo enriquecido y aceleración GPU */
  .spl {
    background:
      radial-gradient(ellipse 80% 60% at 50% 38%, rgba(201,169,110,.11) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 50% 100%, rgba(180,92,50,.07) 0%, transparent 70%),
      linear-gradient(180deg, #080603 0%, #0c0905 100%);
    will-change: opacity, transform, filter;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
  }

  /* Orbes de ambiente */
  .spl::before,
  .spl::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .spl::before {
    width: 620px;
    height: 620px;
    top: -230px;
    left: -230px;
    background: radial-gradient(circle, rgba(201,169,110,.17) 0%, transparent 60%);
    animation: spl-drift 16s ease-in-out infinite alternate;
  }
  .spl::after {
    width: 560px;
    height: 560px;
    bottom: -210px;
    right: -210px;
    background: radial-gradient(circle, rgba(180,92,50,.13) 0%, transparent 60%);
    animation: spl-drift 20s ease-in-out infinite alternate-reverse;
  }

  /* ── ESTADO DE SALIDA ────────────────────────────────────────────────────
     La transición SOLO se define aquí: al añadir la clase, el navegador
     detecta el cambio desde los valores por defecto (opacity:1, etc.) y
     lanza la animación de salida. Sin esta clase, ninguna transición existe
     y el montaje inicial es siempre limpio.
  ──────────────────────────────────────────────────────────────────────── */
  .spl--exit {
    opacity: 0;
    transform: scale(1.08) translateZ(0);
    filter: blur(14px);
    pointer-events: none;
    transition:
      opacity    1.05s cubic-bezier(0.16, 1, 0.3, 1),
      transform  1.45s cubic-bezier(0.16, 1, 0.3, 1),
      filter     1.05s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .spl--exit .spl__inner {
    opacity: 0;
    transform: translateY(-24px) scale(0.94);
    transition:
      opacity   0.45s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── INNER ────────────────────────────────────────────────────────────── */
  .spl__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.45rem;
    text-align: center;
    padding: 2rem;
  }

  /* ── EYEBROW ─────────────────────────────────────────────────────────── */
  .spl__eyebrow {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-size: clamp(0.66rem, 1.4vw, 0.8rem);
    letter-spacing: 0.68em;
    text-transform: uppercase;
    color: #c9a96e;
    padding-left: 0.68em;
    opacity: 0;
    animation: spl-rise 1.1s 0.08s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── TÍTULO (letras individuales) ────────────────────────────────────── */
  .spl__title {
    font-family: 'Italiana', 'Cormorant Garamond', serif;
    font-size: clamp(3.8rem, 9.5vw, 7.4rem);
    font-weight: 400;
    color: #f6eedd;
    line-height: 0.95;
    letter-spacing: 0.025em;
    display: flex;
    gap: 0.01em;
  }
  .spl__title span {
    display: inline-block;
    opacity: 0;
    transform: translateY(52px) rotate(5deg);
    animation: spl-char 1.05s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── LÍNEA DECORATIVA ────────────────────────────────────────────────── */
  .spl__rule {
    position: relative;
    width: 160px;
    height: 1px;
    overflow: hidden;
  }
  .spl__rule::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%);
    transform: scaleX(0);
    animation: spl-rule 1.35s 0.48s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── TAGLINE ─────────────────────────────────────────────────────────── */
  .spl__tagline {
    font-family: 'Jost', sans-serif;
    font-size: 0.66rem;
    letter-spacing: 0.46em;
    text-transform: uppercase;
    color: #b4a284;
    font-weight: 300;
    padding-left: 0.46em;
    opacity: 0;
    animation: spl-rise 1s 0.84s both cubic-bezier(0.16, 1, 0.3, 1);
  }
  .spl__tagline b {
    color: #c9a96e;
    font-weight: 400;
  }

  /* ── ESTRELLAS ───────────────────────────────────────────────────────── */
  .spl__stars {
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    animation: spl-rise 0.9s 1.02s both cubic-bezier(0.16, 1, 0.3, 1);
  }
  .spl__stars span {
    color: #c9a96e;
    font-size: 0.55rem;
    letter-spacing: 0.1em;
  }

  /* ── VERSO DE FE ─────────────────────────────────────────────────────── */
  .spl__verse {
    font-family: 'Cormorant Garamond', 'Italiana', serif;
    font-style: italic;
    font-size: clamp(0.72rem, 1.5vw, 0.88rem);
    color: rgba(201, 169, 110, 0.55);
    letter-spacing: 0.06em;
    line-height: 1.7;
    max-width: 34ch;
    opacity: 0;
    animation: spl-rise 1s 1.18s both cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── KEYFRAMES ───────────────────────────────────────────────────────── */
  @keyframes spl-rise {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spl-char {
    to { opacity: 1; transform: translateY(0) rotate(0deg); }
  }
  @keyframes spl-rule {
    to { transform: scaleX(1); }
  }
  @keyframes spl-drift {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(52px, 36px); }
  }

  /* ── REDUCCIÓN DE MOVIMIENTO ─────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .spl::before,
    .spl::after                 { animation: none; }
    .spl__title span,
    .spl__eyebrow,
    .spl__tagline,
    .spl__stars,
    .spl__verse,
    .spl__rule::before          { animation: none !important; opacity: 1 !important; transform: none !important; }
    .spl--exit                  { transition: opacity 0.3s linear !important; filter: none !important; transform: none !important; }
    .spl--exit .spl__inner      { transition: opacity 0.2s linear !important; transform: none !important; }
  }
`;

const LETTERS = Array.from('CAFETERIA EBENEZER');

export default function SplashScreen() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Bloquear scroll mientras el splash está visible
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const restore = () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let called = false;
    const mountedAt = performance.now();

    const startExit = () => {
      if (called) return;
      called = true;
      // Esperar a que las animaciones de entrada terminen antes de salir
      const elapsed = performance.now() - mountedAt;
      const wait = Math.max(MIN_VISIBLE_MS - elapsed, 0);

      t1 = setTimeout(() => {
        setExiting(true);
        t2 = setTimeout(
          () => { setGone(true); restore(); },
          reducedMotion ? 0 : EXIT_DURATION_MS
        );
      }, wait);
    };

    if (document.readyState === 'complete') {
      startExit();
    } else {
      window.addEventListener('load', startExit, { once: true });
    }

    return () => {
      window.removeEventListener('load', startExit);
      restore();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <>
      {/* dangerouslySetInnerHTML evita el escape y garantiza que los estilos
          lleguen al DOM antes del primer paint del componente */}
      <style dangerouslySetInnerHTML={{ __html: SPLASH_CSS }} />

      <div
        className={`spl${exiting ? ' spl--exit' : ''}`}
        aria-hidden="true"
        role="presentation"
      >
        <div className="spl__inner">
          <p className="spl__eyebrow">BIENVENID@</p>

          {/* aria-label en el h1 para que los lectores lean "Cafetería Ébenezer" una sola vez */}
          <h1 className="spl__title" aria-label="Cafetería Ébenezer">
            {LETTERS.map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ animationDelay: `${0.20 + i * 0.062}s` }}
              >
                {ch}
              </span>
            ))}
          </h1>

          <div className="spl__rule" aria-hidden="true" />

          <p className="spl__tagline">
            Café de <b>día</b>&nbsp;·&nbsp;Pizza de <b>noche</b>
          </p>

          <div className="spl__stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => <span key={i}>★</span>)}
          </div>

          <p className="spl__verse">
            &ldquo;Hasta aquí nos ha traído el Señor&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}
