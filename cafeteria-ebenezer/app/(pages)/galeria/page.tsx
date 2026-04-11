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
    src: 'https://images.unsplash.com/photo-1442512595331-e89e7dfce12a?auto=format&fit=crop&w=1200&q=85',
    alt: 'Latte art con diseño espiral',
    label: 'Arte líquido',
    caption: 'Cada taza, una composición efímera',
    index: '01',
  },
  {
    src: 'https://images.unsplash.com/photo-1459707131359-8e1af4e209e6?auto=format&fit=crop&w=1200&q=85',
    alt: 'Espresso con latte art',
    label: 'Extracción perfecta',
    caption: 'Veinticinco segundos, la medida exacta',
    index: '02',
  },
  {
    src: 'https://images.unsplash.com/photo-1519915212116-7cfef71f5e1e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sándwich artesanal con carnes',
    label: 'Comida de mano',
    caption: 'Pan tostado, ingredientes generosos',
    index: '03',
  },
  {
    src: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pizza pepperoni recién horneada',
    label: 'Masa madre',
    caption: 'Cuarenta y ocho horas de espera',
    index: '04',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85',
    alt: 'Tartitas con frutas y frutos secos',
    label: 'Repostería artesanal',
    caption: 'Frutas rojas y almendra tostada',
    index: '05',
  },
  {
    src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Huevos benedictinos con salsa holandesa',
    label: 'Desayuno completo',
    caption: 'Receta clásica, ejecución impecable',
    index: '06',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
    alt: 'Barra del café en penumbra',
    label: 'La identidad',
    caption: 'Cuatro años de devoción al oficio',
    index: '07',
  },
  {
    src: 'https://images.unsplash.com/photo-1514432324607-2e467f4af498?auto=format&fit=crop&w=1200&q=85',
    alt: 'Barra con luces doradas y plantas',
    label: 'La barra',
    caption: 'El corazón que nunca descansa',
    index: '08',
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
        }
      `}</style>

      <section className="gallery-hero">
        <div className="eyebrow center reveal">La galería</div>
        <h1 className="reveal reveal-delay-1">
          Momentos que
          <br />
          <em>nos definen</em>
        </h1>
        <p className="reveal reveal-delay-2">
          Una selección de instantes dentro de Ébenezer. Luz cálida, manos atareadas,
          platos que pasan, miradas cómplices. Lo que somos, en imágenes.
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
                  <h3 className="gal-card-title">{img.alt}</h3>
                  <p className="gal-card-caption">{img.caption}</p>
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
        <div className="eyebrow center reveal">La mejor imagen</div>
        <h2 className="reveal reveal-delay-1">
          ...es la que haces <em>en persona</em>
        </h2>
        <Link href="/contacto" className="lux-btn reveal reveal-delay-2">
          <span>Reserva tu visita</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </>
  );
}
