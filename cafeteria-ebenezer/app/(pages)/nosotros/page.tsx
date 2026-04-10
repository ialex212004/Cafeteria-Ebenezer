'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function NosotrosPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        /* ── About Hero ── */
        .about-hero {
          position: relative;
          margin-top: var(--stack);
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
          text-align: center;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%),
            var(--obsidian);
        }
        .about-hero-inner {
          max-width: 820px;
          margin: 0 auto;
        }
        .about-hero h1 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 5.4vw, 5.2rem);
          line-height: 1.02;
          margin: 1.5rem 0 2rem;
          color: var(--pearl);
          letter-spacing: -0.015em;
        }
        .about-hero h1 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .about-hero-lede {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.98rem;
          color: var(--taupe);
          line-height: 1.9;
          max-width: 56ch;
          margin: 0 auto;
        }

        /* ── Story grid ── */
        .story {
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
          border-top: 1px solid var(--border-hair);
        }
        .story-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 5fr 6fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: center;
        }
        .story-media {
          position: relative;
        }
        .story-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: var(--charcoal);
        }
        .story-frame img {
          position: absolute !important;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          filter: brightness(0.78) saturate(0.9) contrast(1.02);
          transition: transform 2.5s var(--ease-silk), filter 1.2s var(--ease-silk);
        }
        .story-frame:hover img {
          transform: scale(1.06);
          filter: brightness(0.88) saturate(1) contrast(1.04);
        }
        .story-accent {
          position: absolute;
          inset: 1.5rem -1.5rem -1.5rem 1.5rem;
          border: 1px solid var(--champagne);
          z-index: -1;
          pointer-events: none;
        }
        .story-caption {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          padding: 0.55rem 1rem;
          background: rgba(8, 6, 3, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: var(--font-sans);
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--champagne);
          border: 1px solid var(--border-soft);
        }

        .story-text h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.1;
          color: var(--pearl);
          margin: 1.5rem 0 2rem;
          letter-spacing: -0.015em;
        }
        .story-text h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .story-text p {
          font-family: var(--font-serif);
          font-size: 0.92rem;
          color: var(--taupe);
          line-height: 1.95;
          margin-bottom: 1.35rem;
        }
        .story-text p:first-of-type::first-letter {
          font-family: var(--font-italiana);
          font-size: 3.5rem;
          float: left;
          line-height: 0.85;
          padding-right: 0.6rem;
          padding-top: 0.45rem;
          color: var(--champagne);
        }
        .story-signature {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-hair);
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .story-signature-name {
          font-family: var(--font-italiana);
          font-size: 1.6rem;
          color: var(--champagne);
          letter-spacing: 0.03em;
        }
        .story-signature-role {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--stone);
        }

        /* ── Chronicle (Timeline) ── */
        .chronicle {
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
          background: var(--obsidian);
          border-top: 1px solid var(--border-hair);
          border-bottom: 1px solid var(--border-hair);
        }
        .chronicle-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .chronicle-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .chronicle-header h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          color: var(--pearl);
          margin-top: 1.5rem;
          line-height: 1.1;
        }
        .chronicle-header h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .chronicle-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid var(--border-hair);
        }
        .chronicle-slot {
          padding: 3rem 2rem;
          border-right: 1px solid var(--border-hair);
          position: relative;
          text-align: center;
          transition: background 0.6s var(--ease-silk);
        }
        .chronicle-slot:last-child {
          border-right: none;
        }
        .chronicle-slot:hover {
          background: rgba(201, 169, 110, 0.035);
        }
        .chronicle-slot::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 28px;
          background: var(--champagne);
          transform: translate(-50%, -14px);
        }
        .chronicle-slot::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--obsidian);
          border: 1px solid var(--champagne);
          transform: translate(-50%, -50%);
        }
        .chronicle-time {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 2.4rem;
          color: var(--champagne);
          letter-spacing: -0.01em;
          margin-bottom: 0.8rem;
          display: block;
        }
        .chronicle-label {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--pearl);
          margin-bottom: 1rem;
          display: block;
        }
        .chronicle-desc {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.82rem;
          color: var(--stone);
          line-height: 1.65;
        }

        /* ── Values ── */
        .values {
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
        }
        .values-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
        }
        .values-header h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2rem, 3.6vw, 3.2rem);
          line-height: 1.1;
          color: var(--pearl);
          margin: 1.5rem 0 2rem;
        }
        .values-header h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .values-header p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--taupe);
          line-height: 1.9;
        }
        .values-list {
          display: flex;
          flex-direction: column;
        }
        .value-row {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2.5rem;
          padding: 2.2rem 0;
          border-top: 1px solid var(--border-hair);
          align-items: start;
        }
        .value-row:last-child {
          border-bottom: 1px solid var(--border-hair);
        }
        .value-num {
          font-family: var(--font-italiana);
          font-size: 1.6rem;
          color: var(--champagne);
          letter-spacing: 0.05em;
          min-width: 40px;
        }
        .value-body h3 {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.4rem;
          color: var(--pearl);
          margin-bottom: 0.75rem;
          letter-spacing: 0;
        }
        .value-body h3 em {
          font-style: italic;
          color: var(--champagne);
        }
        .value-body p {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          color: var(--stone);
          line-height: 1.85;
          max-width: 60ch;
        }

        .values-cta {
          margin-top: 3rem;
        }

        @media (max-width: 900px) {
          .story-inner,
          .values-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .chronicle-grid {
            grid-template-columns: 1fr 1fr;
          }
          .chronicle-slot:nth-child(2) {
            border-right: none;
          }
          .chronicle-slot:nth-child(1),
          .chronicle-slot:nth-child(2) {
            border-bottom: 1px solid var(--border-hair);
          }
          .story-accent {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .chronicle-grid {
            grid-template-columns: 1fr;
          }
          .chronicle-slot {
            border-right: none;
            border-bottom: 1px solid var(--border-hair);
          }
          .chronicle-slot:last-child {
            border-bottom: none;
          }
          .value-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>

      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="eyebrow center reveal">Nuestra casa</div>
          <h1 className="reveal reveal-delay-1">
            Una herencia
            <br />
            hecha de <em>detalles</em>
          </h1>
          <p className="about-hero-lede reveal reveal-delay-2">
            Ébenezer nació de la convicción de que un lugar puede cambiar el ritmo de un día.
            Que un café puede despertar recuerdos. Que una pizza puede sellar una amistad.
          </p>
        </div>
      </section>

      <section className="story">
        <div className="story-inner">
          <div className="story-media reveal">
            <div className="story-frame">
              <Image
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1200&q=85"
                alt="Interior de Cafetería Ébenezer"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <div className="story-caption">— Valdepeñas · Desde MMXXV —</div>
            </div>
            <div className="story-accent" />
          </div>

          <div className="story-text">
            <div className="eyebrow reveal">La historia</div>
            <h2 className="reveal reveal-delay-1">
              De la mañana a la noche,
              <br />
              <em>una misma pasión</em>
            </h2>
            <p className="reveal reveal-delay-2">
              Empezamos con una pregunta sencilla: ¿cómo se siente un lugar donde cada detalle importa?
              La respuesta nos ha llevado años de oficio, viajes, tostadores visitados y hornos
              construidos con pacienia. Cada rincón de Ébenezer es la suma de esas pequeñas
              obsesiones.
            </p>
            <p className="reveal reveal-delay-2">
              Por la mañana, el aroma del café inunda la sala. Caen las primeras luces, se escucha
              el vapor, el murmullo tibio de las conversaciones. Al atardecer, el horno cobra vida
              y una masa madre que ha descansado 48 horas se convierte en la protagonista de la noche.
            </p>
            <p className="reveal reveal-delay-2">
              Dos oficios, un mismo respeto: el tiempo. El tuyo, el nuestro, el que el producto pide.
            </p>
            <div className="story-signature reveal reveal-delay-3">
              <div>
                <div className="story-signature-name">Ébenezer</div>
                <div className="story-signature-role">Fundador · Chef</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chronicle">
        <div className="chronicle-inner">
          <div className="chronicle-header">
            <div className="eyebrow center reveal">El ritmo del día</div>
            <h2 className="reveal reveal-delay-1">
              Cuatro momentos, <em>una misma mesa</em>
            </h2>
          </div>
          <div className="chronicle-grid">
            <div className="chronicle-slot reveal reveal-delay-1">
              <span className="chronicle-time">08:00</span>
              <span className="chronicle-label">Apertura</span>
              <p className="chronicle-desc">Pan recién horneado y la primera extracción del día</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-2">
              <span className="chronicle-time">12:00</span>
              <span className="chronicle-label">Mediodía</span>
              <p className="chronicle-desc">Luz tibia, conversaciones pausadas y dulces de la casa</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-3">
              <span className="chronicle-time">16:00</span>
              <span className="chronicle-label">Transición</span>
              <p className="chronicle-desc">El horno se enciende y comienza el turno de la noche</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-4">
              <span className="chronicle-time">23:00</span>
              <span className="chronicle-label">Último servicio</span>
              <p className="chronicle-desc">Luces tenues, último vino y despedida hasta mañana</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values-inner">
          <div className="values-header">
            <div className="eyebrow reveal">Nuestros valores</div>
            <h2 className="reveal reveal-delay-1">
              Lo que nos
              <br />
              <em>sostiene</em>
            </h2>
            <p className="reveal reveal-delay-2">
              Son los principios que guían cada decisión, desde la elección del productor
              hasta la última taza que sale de nuestra barra.
            </p>
            <div className="values-cta reveal reveal-delay-3">
              <Link href="/contacto" className="lux-btn">
                <span>Ven a visitarnos</span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="values-list">
            <div className="value-row reveal reveal-delay-1">
              <div className="value-num">I</div>
              <div className="value-body">
                <h3>
                  Producto <em>primero</em>
                </h3>
                <p>
                  Trabajamos con productores locales siempre que es posible. Sabemos de qué
                  finca viene cada grano y qué harina alimenta cada masa.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-2">
              <div className="value-num">II</div>
              <div className="value-body">
                <h3>
                  Tiempo como <em>ingrediente</em>
                </h3>
                <p>
                  48 horas para la masa, 12 para el cold brew, 24 meses para el parmesano.
                  La paciencia es una forma de respeto al comensal.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-3">
              <div className="value-num">III</div>
              <div className="value-body">
                <h3>
                  Hospitalidad <em>silenciosa</em>
                </h3>
                <p>
                  El buen servicio no se nota: simplemente todo está donde debe, cuando debe,
                  como debe. Esa es nuestra búsqueda diaria.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-4">
              <div className="value-num">IV</div>
              <div className="value-body">
                <h3>
                  Sin <em>concesiones</em>
                </h3>
                <p>
                  Si algo no está perfecto, no sale. Así de sencillo. Así de difícil de sostener.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
