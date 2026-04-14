'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  index: string;
};

const images: GalleryImage[] = [
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.19_s5put0.jpg',
    alt: 'Tres cafés con leche en Cafetería Ébenezer',
    label: 'Café con leche',
    caption: 'El más pedido. Cada mañana.',
    index: '01',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.21_1_l55l1b.jpg',
    alt: 'Interior con lámparas y barra de Cafetería Ébenezer',
    label: 'El local',
    caption: 'Un sitio con carácter propio.',
    index: '02',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171741/WhatsApp_Image_2026-04-03_at_11.33.18_4_lwhzqp.jpg',
    alt: 'Bowl de frutas frescas con crema en Cafetería Ébenezer',
    label: 'Fruta de temporada',
    caption: 'Crema de la casa, fruta del día.',
    index: '03',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776174685/ChatGPT_Image_16_mar_2026_20_09_53_ru4nei.png',
    alt: 'Tosta con aguacate, pollo y tomate cherry en Cafetería Ébenezer',
    label: 'Tosta',
    caption: 'Aguacate, pollo y tomate cherry. Ligero y llena.',
    index: '04',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776174681/WhatsApp_Image_2026-04-03_at_11.33.20_2_gvblyx.jpg',
    alt: 'Barra con máquina de espresso en Cafetería Ébenezer',
    label: 'La barra',
    caption: 'Aquí nace tu café.',
    index: '05',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776174682/WhatsApp_Image_2026-04-03_at_11.33.20_1_ftv8rw.jpg',
    alt: 'Sala interior de Cafetería Ébenezer',
    label: 'El espacio',
    caption: 'Entra a desayunar. Te quedas a comer.',
    index: '06',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.21_1_l55l1b.jpg',
    alt: 'Lámparas esféricas sobre la barra en Cafetería Ébenezer',
    label: 'Ambiente',
    caption: 'La luz que hace que el tiempo pase bien.',
    index: '07',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171742/WhatsApp_Image_2026-04-03_at_11.33.19_s5put0.jpg',
    alt: 'Tres cafés preparados en Cafetería Ébenezer',
    label: 'Café',
    caption: 'Tres pedidos distintos. La misma calidad.',
    index: '08',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776171741/WhatsApp_Image_2026-03-12_at_12.45.13_2_rmvhfd.jpg',
    alt: 'Brunch completo con aguacate, granola y café en Cafetería Ébenezer',
    label: 'Brunch',
    caption: 'Aguacate, granola, fruta y café. Todo en un plato.',
    index: '09',
  },
  {
    src: 'https://res.cloudinary.com/dphq9ymvo/image/upload/v1776174688/ChatGPT_Image_16_mar_2026_22_39_26_vrhi49.png',
    alt: 'Pizza con pepperoni y jamón en Cafetería Ébenezer',
    label: 'Pizza',
    caption: 'Pepperoni y jamón. Para cuando la noche pide más.',
    index: '10',
  },
];

export default function GaleriaPage() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = track.querySelectorAll<HTMLDivElement>('.gal-card');
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let dist = Infinity;
      cards.forEach((card, i) => {
        const mid = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < dist) {
          dist = d;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollBy = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLDivElement>('.gal-card');
    if (!card) return;
    const amount = card.offsetWidth + 24;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx global>{`
        .gallery-hero {
          margin-top: var(--stack);
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem);
          text-align: center;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%),
            var(--obsidian);
        }
        .gallery-hero h1 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 5.4vw, 5.2rem);
          line-height: 1.02;
          margin: 1.5rem 0 1.5rem;
          color: var(--pearl);
          letter-spacing: -0.015em;
        }
        .gallery-hero h1 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .gallery-hero p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--taupe);
          line-height: 1.9;
          max-width: 52ch;
          margin: 0 auto;
        }

        .gallery-stage {
          position: relative;
          padding: clamp(3rem, 5vw, 5rem) 0 4rem;
          background: var(--obsidian);
        }
        .gallery-track-wrap {
          position: relative;
          overflow: hidden;
          padding: 2rem 0;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .gallery-track {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 0 clamp(1.5rem, 8vw, 8vw);
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }
        .gallery-track::-webkit-scrollbar {
          display: none;
        }
        .gal-card {
          position: relative;
          flex-shrink: 0;
          width: clamp(280px, 34vw, 460px);
          aspect-ratio: 3 / 4;
          scroll-snap-align: center;
          overflow: hidden;
          cursor: pointer;
          transition: transform 1s var(--ease-silk), filter 1s var(--ease-silk);
          filter: brightness(0.6) saturate(0.75);
          transform: scale(0.94);
        }
        .gal-card.active {
          transform: scale(1);
          filter: brightness(0.92) saturate(1.02);
        }
        .gal-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid var(--border-hair);
          z-index: 3;
          pointer-events: none;
          transition: border-color 0.6s;
        }
        .gal-card.active::before {
          border-color: var(--border-bright);
        }
        .gal-card img {
          position: absolute !important;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          transition: transform 2s var(--ease-silk);
        }
        .gal-card:hover img {
          transform: scale(1.05);
        }
        .gal-card-index {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          font-family: var(--font-italiana);
          font-size: 1.1rem;
          color: var(--champagne);
          letter-spacing: 0.1em;
          z-index: 3;
          padding: 0.35rem 0.75rem;
          background: rgba(8, 6, 3, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-soft);
        }
        .gal-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(180deg, transparent 30%, rgba(8, 6, 3, 0.92) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem 1.75rem 1.75rem;
        }
        .gal-card-label {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 0.65rem;
        }
        .gal-card-title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.4rem;
          color: var(--pearl);
          line-height: 1.1;
          margin-bottom: 0.6rem;
          letter-spacing: 0;
        }
        .gal-card-title em {
          font-style: italic;
          color: var(--champagne);
        }
        .gal-card-caption {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.78rem;
          color: var(--taupe);
          line-height: 1.6;
        }

        /* Navigation */
        .gallery-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          padding: 2rem;
        }
        .gal-nav-btn {
          width: 3.2rem;
          height: 3.2rem;
          border: 1px solid var(--border-soft);
          background: transparent;
          color: var(--taupe);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.55s var(--ease-silk);
          border-radius: 50%;
        }
        .gal-nav-btn:hover {
          border-color: var(--champagne);
          color: var(--champagne);
          background: rgba(201, 169, 110, 0.06);
          transform: scale(1.06);
        }
        .gal-nav-btn svg {
          width: 16px;
          height: 16px;
        }
        .gal-nav-counter {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--pearl);
          letter-spacing: 0.05em;
          min-width: 70px;
          text-align: center;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.3em;
        }
        .gal-nav-counter b {
          font-family: var(--font-italiana);
          font-size: 1.6rem;
          color: var(--champagne);
          font-weight: 400;
        }
        .gal-nav-counter i {
          font-style: normal;
          color: var(--stone);
          font-size: 0.85rem;
        }

        /* Gallery footer */
        .gallery-footer {
          padding: clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
          text-align: center;
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
          border-top: 1px solid var(--border-hair);
        }
        .gallery-footer h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(1.8rem, 3.4vw, 2.8rem);
          line-height: 1.2;
          color: var(--pearl);
          margin-top: 1.5rem;
          margin-bottom: 2rem;
        }
        .gallery-footer h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .gal-card {
            width: 78vw;
          }
          .gal-card-title {
            font-size: 1.2rem;
          }
          .gal-nav-btn {
            width: 3.6rem;
            height: 3.6rem;
          }
          .gal-nav-btn svg {
            width: 18px;
            height: 18px;
          }
          .gallery-nav {
            gap: 2rem;
            padding: 1.75rem;
          }
          .gallery-track {
            padding: 0 clamp(1rem, 6vw, 6vw);
          }
        }
        @media (max-width: 480px) {
          .gal-card {
            width: 88vw;
          }
          .gallery-track {
            padding: 0 clamp(0.75rem, 4vw, 4vw);
          }
          .gallery-hero {
            padding: clamp(4rem, 8vw, 6rem) clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vw, 3rem);
          }
          .gallery-footer {
            padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem);
          }
          .gal-card-overlay {
            padding: 1.5rem 1.25rem 1.25rem;
          }
        }
      `}</style>

      <section className="gallery-hero">
        <div className="eyebrow center reveal">Lo que encontrarás</div>
        <h1 className="reveal reveal-delay-1">
          Nuestros platos,
          <br />
          <em>nuestro local</em>
        </h1>
        <p className="reveal reveal-delay-2">
          Cafés, tostas, brunch y pizza. Sin filtros. Así es Ébenezer cada día.
          Ven a verlo en persona.
        </p>
      </section>

      <section className="gallery-stage">
        <div className="gallery-track-wrap">
          <div className="gallery-track" ref={trackRef}>
            {images.map((img, i) => (
              <div key={img.alt} className={`gal-card${i === activeIdx ? ' active' : ''}`}>
                <div className="gal-card-index">{img.index}</div>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 768px) 78vw, 34vw"
                />
                <div className="gal-card-overlay">
                  <div className="gal-card-label">— {img.label}</div>
                  <h3 className="gal-card-title">{img.caption}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-nav">
          <button onClick={() => scrollBy(-1)} className="gal-nav-btn" aria-label="Imagen anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="gal-nav-counter">
            <b>{String(activeIdx + 1).padStart(2, '0')}</b>
            <i>/ {String(images.length).padStart(2, '0')}</i>
          </div>
          <button onClick={() => scrollBy(1)} className="gal-nav-btn" aria-label="Imagen siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section className="gallery-footer">
        <div className="eyebrow center reveal">¿Te ha entrado hambre?</div>
        <h2 className="reveal reveal-delay-1">
          Ven hoy. <em>Reserva tu mesa.</em>
        </h2>
        <Link href="/contacto" className="lux-btn reveal reveal-delay-2">
          <span>Reservar ahora</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </>
  );
}
