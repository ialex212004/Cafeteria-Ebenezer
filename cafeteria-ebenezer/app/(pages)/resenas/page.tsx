'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Review = {
  name: string;
  city: string;
  text: string;
  stars: number;
  date: string;
};

const initialReviews: Review[] = [
  {
    name: 'María González',
    city: 'Madrid',
    text: 'Un café tan cuidado que se convierte en ritual. Vuelves no por el sabor, sino por esa sensación de que alguien ha pensado en ti.',
    stars: 5,
    date: 'Marzo 2026',
  },
  {
    name: 'Carlos Ruiz',
    city: 'Valencia',
    text: 'La masa de la pizza Tartufo Nero es una declaración. Años investigando pizzerías y puedo decir que Ébenezer está entre las mejores de España.',
    stars: 5,
    date: 'Febrero 2026',
  },
  {
    name: 'Ana Martínez',
    city: 'Valdepeñas',
    text: 'Vengo cada mañana desde hace meses. No sé si el café es mejor que la tarta de queso o al revés. Solo sé que es mi lugar favorito del mundo.',
    stars: 5,
    date: 'Febrero 2026',
  },
  {
    name: 'Luis Herrera',
    city: 'Toledo',
    text: 'Conduje dos horas solo para probar la burrata di Andria. Volvería a hacerlo mañana. Un servicio elegante sin pretensiones.',
    stars: 5,
    date: 'Enero 2026',
  },
  {
    name: 'Sofía Peña',
    city: 'Albacete',
    text: 'La atmósfera es como un abrazo cálido. Cena de aniversario reservada al instante. El flat white perfecto y la pizza Margherita sublime.',
    stars: 5,
    date: 'Enero 2026',
  },
  {
    name: 'Roberto Díaz',
    city: 'Ciudad Real',
    text: 'Cada detalle cuidado, desde la cristalería hasta la música. Un ejercicio de hospitalidad que raras veces se ve por estos lares.',
    stars: 5,
    date: 'Diciembre 2025',
  },
];

function stars(n: number) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

export default function ResenasPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const messageTimeoutRef = useRef<number | null>(null);

  const duplicatedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);
  const avgStars = useMemo(() => {
    if (reviews.length === 0) return 5;
    return reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  }, [reviews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submitReview = async () => {
    const n = name.trim();
    const t = text.trim();
    const c = city.trim();
    if (!n || !t) {
      setMessageError(true);
      setMessage('Por favor, comparte tu nombre y tu experiencia.');
      return;
    }
    setLoading(true);
    setReviews((prev) => [
      { name: n, city: c || 'Visitante', text: t, stars: rating, date: 'Hoy' },
      ...prev,
    ]);
    setName('');
    setCity('');
    setText('');
    setRating(5);
    setMessageError(false);
    setMessage(`Gracias, ${n}. Tu reseña ha sido recibida.`);
    setLoading(false);
    if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = window.setTimeout(() => setMessage(''), 5000);
  };

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .res-hero {
          margin-top: var(--stack);
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem);
          text-align: center;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%),
            var(--obsidian);
        }
        .res-hero h1 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 5.4vw, 5.2rem);
          line-height: 1.02;
          margin: 1.5rem 0;
          color: var(--pearl);
          letter-spacing: -0.015em;
        }
        .res-hero h1 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .res-hero p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--taupe);
          line-height: 1.9;
          max-width: 52ch;
          margin: 0 auto 2rem;
        }

        .res-score {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem 2rem;
          border: 1px solid var(--border-soft);
          background: rgba(201, 169, 110, 0.03);
          backdrop-filter: blur(8px);
        }
        .res-score-num {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 300;
          color: var(--champagne);
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .res-score-num sup {
          font-size: 0.85rem;
          color: var(--stone);
          vertical-align: super;
          margin-left: 0.2rem;
        }
        .res-score-meta {
          text-align: left;
          border-left: 1px solid var(--border-hair);
          padding-left: 1.5rem;
        }
        .res-score-stars {
          color: var(--champagne);
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          margin-bottom: 0.3rem;
        }
        .res-score-label {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--stone);
        }

        /* ── Carousel ── */
        .res-carousel {
          position: relative;
          padding: clamp(3rem, 5vw, 5rem) 0;
          background: var(--obsidian);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .res-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          padding: 2rem 0;
          animation: slideTrack 64s linear infinite;
        }
        .res-carousel:hover .res-track {
          animation-play-state: paused;
        }
        @keyframes slideTrack {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .res-card {
          width: 380px;
          flex-shrink: 0;
          background: linear-gradient(180deg, rgba(21, 17, 10, 0.9) 0%, rgba(12, 9, 5, 0.9) 100%);
          border: 1px solid var(--border-hair);
          padding: 2.5rem 2.25rem 2rem;
          position: relative;
          transition: border-color 0.6s var(--ease-silk), transform 0.6s var(--ease-silk);
          display: flex;
          flex-direction: column;
          min-height: 280px;
        }
        .res-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 1px;
          background: var(--champagne);
        }
        .res-card:hover {
          border-color: var(--border-soft);
          transform: translateY(-4px);
        }
        .res-card-quote {
          font-family: var(--font-italiana);
          font-size: 3rem;
          color: var(--champagne);
          opacity: 0.35;
          line-height: 0.5;
          margin-bottom: 1rem;
        }
        .res-card-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--ivory);
          line-height: 1.85;
          margin-bottom: 1.75rem;
          flex: 1;
        }
        .res-card-footer {
          padding-top: 1.2rem;
          border-top: 1px solid var(--border-hair);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .res-card-author h4 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1rem;
          color: var(--pearl);
          letter-spacing: 0;
          margin-bottom: 0.15rem;
        }
        .res-card-author span {
          font-family: var(--font-sans);
          font-size: 0.56rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .res-card-right {
          text-align: right;
        }
        .res-card-stars {
          color: var(--champagne);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
        }
        .res-card-date {
          font-family: var(--font-sans);
          font-size: 0.54rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--stone);
        }

        .res-pause {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--stone);
          margin-top: 2rem;
          opacity: 0.6;
        }

        /* ── Form ── */
        .res-form-section {
          padding: clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
          border-top: 1px solid var(--border-hair);
        }
        .res-form-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
        }
        .res-form-head h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2rem, 3.6vw, 3.2rem);
          line-height: 1.1;
          color: var(--pearl);
          margin: 1.5rem 0 1.5rem;
        }
        .res-form-head h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .res-form-head p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--taupe);
          line-height: 1.85;
          max-width: 34ch;
        }

        .res-form {
          background: rgba(12, 9, 5, 0.6);
          border: 1px solid var(--border-hair);
          padding: 2.5rem;
        }
        .res-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .res-field {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .res-field label {
          font-family: var(--font-sans);
          font-size: 0.56rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--champagne);
          font-weight: 400;
        }
        .res-field input,
        .res-field textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border-soft);
          color: var(--pearl);
          padding: 0.7rem 0 0.9rem;
          font-family: var(--font-serif);
          font-size: 0.95rem;
          outline: none;
          resize: none;
          transition: border-color 0.4s var(--ease-silk);
          font-style: italic;
        }
        .res-field input:focus,
        .res-field textarea:focus {
          border-bottom-color: var(--champagne);
        }
        .res-field input::placeholder,
        .res-field textarea::placeholder {
          color: var(--stone);
          font-style: italic;
        }
        .res-field textarea {
          min-height: 90px;
        }

        .res-stars-picker {
          display: flex;
          gap: 0.6rem;
          padding: 0.3rem 0 0.5rem;
          align-items: center;
        }
        .res-stars-picker button {
          font-size: 1.6rem;
          color: var(--shadow);
          cursor: pointer;
          transition: color 0.3s, transform 0.3s var(--ease-silk);
          padding: 0;
          background: none;
          border: none;
          line-height: 1;
        }
        .res-stars-picker button.lit {
          color: var(--champagne);
        }
        .res-stars-picker button:hover {
          transform: scale(1.15) translateY(-2px);
        }

        .res-submit {
          margin-top: 1rem;
        }

        .res-msg {
          margin-top: 1.5rem;
          padding: 1rem 1.3rem;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.85rem;
          border-left: 2px solid var(--champagne);
          background: rgba(201, 169, 110, 0.05);
          color: var(--ivory);
        }
        .res-msg.error {
          border-color: #c65a3c;
          background: rgba(180, 92, 50, 0.08);
        }

        @media (max-width: 900px) {
          .res-form-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .res-form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .res-card {
            width: 300px;
          }
          .res-form {
            padding: 1.75rem;
          }
        }
      `}</style>

      <section className="res-hero">
        <div className="eyebrow center reveal">La voz de los huéspedes</div>
        <h1 className="reveal reveal-delay-1">
          Lo que dicen
          <br />
          <em>de nosotros</em>
        </h1>
        <p className="reveal reveal-delay-2">
          Cada reseña es una conversación silenciosa entre el comensal y nuestro equipo.
          Las leemos todas. Nos ayudan a ser mejores cada día.
        </p>
        <div className="res-score reveal reveal-delay-3">
          <div className="res-score-num">
            {avgStars.toFixed(1)}
            <sup>/ 5</sup>
          </div>
          <div className="res-score-meta">
            <div className="res-score-stars">{stars(Math.round(avgStars))}</div>
            <div className="res-score-label">
              Basado en {reviews.length}+ reseñas
            </div>
          </div>
        </div>
      </section>

      <section className="res-carousel">
        <div className="res-track">
          {duplicatedReviews.map((review, i) => (
            <article className="res-card" key={`${review.name}-${i}`}>
              <div className="res-card-quote">&ldquo;</div>
              <p className="res-card-text">{review.text}</p>
              <div className="res-card-footer">
                <div className="res-card-author">
                  <h4>{review.name}</h4>
                  <span>— {review.city}</span>
                </div>
                <div className="res-card-right">
                  <div className="res-card-stars">{stars(review.stars)}</div>
                  <div className="res-card-date">{review.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="res-pause">— Pasa el cursor para pausar —</div>
      </section>

      <section className="res-form-section">
        <div className="res-form-inner">
          <div className="res-form-head">
            <div className="eyebrow reveal">Deja tu huella</div>
            <h2 className="reveal reveal-delay-1">
              Comparte tu
              <br />
              <em>experiencia</em>
            </h2>
            <p className="reveal reveal-delay-2">
              Tu opinión es el combustible silencioso que nos empuja a mejorar. Gracias por
              tomarte unos minutos para contarnos tu visita.
            </p>
          </div>

          <div className="res-form reveal reveal-delay-2">
            <div className="res-form-row">
              <div className="res-field">
                <label>Tu nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre completo"
                  autoComplete="name"
                />
              </div>
              <div className="res-field">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="res-field">
              <label>Tu calificación</label>
              <div className="res-stars-picker" role="radiogroup" aria-label="Calificación">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={v <= (hoverRating || rating) ? 'lit' : ''}
                    onClick={() => setRating(v)}
                    onMouseEnter={() => setHoverRating(v)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${v} estrellas`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="res-field">
              <label>Tu experiencia</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="¿Qué te llevaste de Ébenezer?"
              />
            </div>

            <div className="res-submit">
              <button className="lux-btn" onClick={submitReview} disabled={loading}>
                <span>{loading ? 'Enviando...' : 'Publicar reseña'}</span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {message && <div className={`res-msg${messageError ? ' error' : ''}`}>{message}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
