'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Review = {
  name: string;
  text: string;
  stars: number;
  avatarStyle: string;
};

const initialReviews: Review[] = [
  { name: 'María González', text: 'El café de especialidad es simplemente increíble, es digno de fotografiar. ¡Voy cada sabado sin falta!', stars: 5, avatarStyle: 'background:rgba(212,168,83,0.15);color:var(--gold2)' },
  { name: 'Carlos Ruiz', text: 'El desayuno Eden es algo de lo que no me olvidare. 10/10, ingredientes frescos y ese ambiente tan especial.', stars: 5, avatarStyle: 'background:rgba(168,50,40,0.15);color:var(--red2)' },
  { name: 'Ana Martínez', text: 'Me encanta que puedo desayunar rico por la mañana y cenar pizza de noche en el mismo lugar. El croissant es el mejor que he probado.', stars: 4, avatarStyle: 'background:rgba(212,168,83,0.1);color:var(--gold)' },
  { name: 'Luis Herrera', text: 'Vine una vez por recomendación y ya no puedo dejar de venir cada semana.', stars: 5, avatarStyle: 'background:rgba(212,168,83,0.15);color:var(--gold2)' },
  { name: 'Sofía Peña', text: 'Las pizzas que venden son una obra maestra. El ambiente, la música, el servicio… todo perfecto.', stars: 5, avatarStyle: 'background:rgba(168,50,40,0.15);color:var(--red2)' },
  { name: 'Roberto Díaz', text: 'Pido cada mañana camino al trabajo. Un lugar que se convierte en parte de tu rutina, Me encanta.', stars: 5, avatarStyle: 'background:rgba(212,168,83,0.12);color:var(--gold)' },
];

function starsText(value: number) {
  return `${'★'.repeat(value)}${'☆'.repeat(5 - value)}`;
}

export default function ReseniasPage() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const messageTimeoutRef = useRef<number | null>(null);

  const duplicatedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

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

  const submitReview = () => {
    const n = name.trim(),
      t = text.trim();
    if (!n || !t) {
      setMessageError(true);
      setMessage('Por favor completa tu nombre y reseña.');
      return;
    }
    const styles = [
      'background:rgba(212,168,83,0.15);color:var(--gold2)',
      'background:rgba(168,50,40,0.15);color:var(--red2)',
      'background:rgba(212,168,83,0.1);color:var(--gold)',
    ];
    setReviews((prev) => [
      { name: n, text: t, stars: rating, avatarStyle: styles[Math.floor(Math.random() * styles.length)] },
      ...prev,
    ]);
    setName('');
    setText('');
    setRating(5);
    setMessageError(false);
    setMessage(`¡Gracias ${n}! Tu reseña aparece en el carrusel.`);
    if (messageTimeoutRef.current) {
      window.clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = window.setTimeout(() => setMessage(''), 4000);
  };

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        window.clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --bg3: #18140d;
          --surface: #201a11;
          --border: rgba(210, 185, 140, 0.08);
          --fg: #f2ece0;
          --fg2: #a89880;
          --fg3: #5c5040;
          --gold: #d4a853;
          --gold2: #edc97a;
          --gold-dim: rgba(212, 168, 83, 0.12);
          --red2: #d4503f;
          --red-dim: rgba(168, 50, 40, 0.14);
          --font-display: 'Poppins', sans-serif;
          --font-body: 'Libre Baskerville', Georgia, serif;
          --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          color: var(--fg);
        }

        .section {
          padding: 7rem 2rem;
          margin-top: 70px;
        }
        .section-surface {
          background: var(--bg3);
        }
        .container {
          max-width: 1180px;
          margin: 0 auto;
        }
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
          margin-bottom: 1.25rem;
        }
        .eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--gold);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          line-height: 1.15;
          color: var(--fg);
        }
        .section-title em {
          font-style: italic;
          color: var(--gold);
        }

        .reviews-stage {
          position: relative;
          overflow: hidden;
          margin: 3.5rem 0 4rem;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .reviews-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scrollReviews 38s linear infinite;
        }
        .reviews-stage:hover .reviews-track {
          animation-play-state: paused;
        }
        @keyframes scrollReviews {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .review-card {
          width: 320px;
          flex-shrink: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem 1.75rem 1.5rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .review-card:hover {
          border-color: rgba(210, 185, 140, 0.16);
        }
        .review-quote {
          font-family: var(--font-display);
          font-size: 4.5rem;
          color: var(--gold);
          opacity: 0.12;
          line-height: 0.8;
          margin-bottom: 0.75rem;
          display: block;
        }
        .review-text {
          font-size: 0.83rem;
          color: var(--fg2);
          line-height: 1.85;
          font-style: italic;
          margin-bottom: 1.5rem;
          min-height: 80px;
        }
        .review-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .review-avatar {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.85rem;
        }
        .review-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--fg);
        }
        .review-stars {
          font-size: 0.72rem;
          color: var(--gold);
          letter-spacing: 1px;
          margin-top: 0.15rem;
        }
        .reviews-pause-hint {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.7rem;
          color: var(--fg3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .reviews-stage:hover .reviews-pause-hint {
          opacity: 1;
        }

        .review-form-wrap {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: start;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2.5rem;
        }
        .review-form-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--fg);
          line-height: 1.2;
          margin-top: 0.5rem;
        }
        .review-form-title em {
          color: var(--gold);
          font-style: italic;
        }
        .rform-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .rform-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .rform-group label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg3);
          font-family: var(--font-display);
        }
        .rform-group input,
        .rform-group textarea {
          background: var(--bg3);
          border: 1px solid rgba(210, 185, 140, 0.16);
          color: var(--fg);
          padding: 0.7rem 0.9rem;
          font-family: var(--font-body);
          font-size: 0.83rem;
          outline: none;
          resize: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .rform-group input:focus,
        .rform-group textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(212, 168, 83, 0.12);
          background: rgba(19, 16, 9, 0.96);
        }
        .rform-group input::placeholder,
        .rform-group textarea::placeholder {
          color: var(--fg3);
        }
        .rstar-picker {
          display: flex;
          gap: 0.2rem;
          padding: 0.5rem 0;
        }
        .rstar-picker span {
          font-size: 1.6rem;
          color: var(--fg3);
          cursor: pointer;
          transition: color 0.12s, transform 0.12s;
          user-select: none;
        }
        .rstar-picker span:hover,
        .rstar-picker span.lit {
          color: var(--gold);
          transform: scale(1.15);
        }
        .rsubmit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--gold);
          color: var(--bg3);
          border: none;
          padding: 0.75rem 1.75rem;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .rsubmit-btn:hover {
          background: var(--gold2);
          transform: translateY(-2px);
        }
        .rform-msg {
          margin-top: 0.9rem;
          padding: 0.65rem 1rem;
          font-size: 0.8rem;
          border-left: 2px solid var(--gold);
          background: var(--gold-dim);
          color: var(--fg2);
          font-family: var(--font-body);
        }
        .rform-msg.error {
          border-color: var(--red2);
          background: var(--red-dim);
        }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .section {
            padding: 5rem 1.25rem;
          }
          .review-form-wrap {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }
          .rform-row {
            grid-template-columns: 1fr;
          }
          .review-card {
            width: 280px;
          }
        }
      `}</style>

      <section className="section section-surface">
        <div className="container">
          <div className="eyebrow reveal">Nuestra comunidad</div>
          <h1 className="section-title reveal" style={{ marginBottom: '2rem' }}>
            Lo que dicen <em>nuestros clientes</em>
          </h1>
        </div>
        <div className="reviews-stage">
          <div className="reviews-track">
            {duplicatedReviews.map((review, i) => (
              <div className="review-card" key={`${review.name}-${i}`}>
                <div className="review-quote">&#8220;</div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <div className="review-avatar" style={Object.fromEntries(review.avatarStyle.split(';').filter(Boolean).map((c) => { const [k, v] = c.split(':'); return [k.trim().replace(/-([a-z])/g, (_, x) => x.toUpperCase()), v.trim()]; }))}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-stars">{starsText(review.stars)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-pause-hint">Pausa</div>
        </div>
        <div className="container">
          <div className="review-form-wrap reveal">
            <div>
              <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                Comparte tu experiencia
              </div>
              <h2 className="review-form-title">
                Deja tu <em>reseña</em>
              </h2>
            </div>
            <div>
              <div className="rform-row">
                <div className="rform-group">
                  <label>Tu nombre</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Juan López" />
                </div>
                <div className="rform-group">
                  <label>Calificación</label>
                  <div className="rstar-picker">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <span key={v} className={v <= rating ? 'lit' : ''} onClick={() => setRating(v)}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rform-group">
                <label>Tu reseña</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  placeholder="¿Qué fue lo que más te gustó de Ébenezer?"
                />
              </div>
              <button className="rsubmit-btn" onClick={submitReview}>
                Publicar reseña
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
              {message && <div className={`rform-msg${messageError ? ' error' : ''}`}>{message}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
