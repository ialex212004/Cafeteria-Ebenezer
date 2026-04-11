'use client';

import { useEffect, useState } from 'react';

type ReservationForm = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const initialForm: ReservationForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  notes: '',
};

export default function ContactoPage() {
  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onChange = (key: keyof ReservationForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time) {
      setError('Por favor completa los campos obligatorios.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 6000);
  };

  return (
    <>
      <style jsx global>{`
        .contact-hero {
          margin-top: var(--stack);
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem);
          text-align: center;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%),
            var(--obsidian);
        }
        .contact-hero h1 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2.8rem, 5.4vw, 5.2rem);
          line-height: 1.02;
          margin: 1.5rem 0;
          color: var(--pearl);
          letter-spacing: -0.015em;
        }
        .contact-hero h1 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .contact-hero p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--taupe);
          line-height: 1.9;
          max-width: 52ch;
          margin: 0 auto;
        }

        /* ── Details Grid ── */
        .contact-grid {
          padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
          background: var(--obsidian);
        }
        .contact-grid-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--border-hair);
        }
        .contact-cell {
          padding: 3rem 2.5rem;
          text-align: center;
          border-right: 1px solid var(--border-hair);
          transition: background 0.6s var(--ease-silk);
        }
        .contact-cell:last-child {
          border-right: none;
        }
        .contact-cell:hover {
          background: rgba(201, 169, 110, 0.03);
        }
        .contact-cell-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1.5rem;
          border: 1px solid var(--border-soft);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.6s, transform 0.6s var(--ease-silk);
        }
        .contact-cell:hover .contact-cell-icon {
          border-color: var(--champagne);
          transform: scale(1.08);
        }
        .contact-cell-icon svg {
          width: 20px;
          height: 20px;
          stroke: var(--champagne);
          fill: none;
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .contact-cell-label {
          font-family: var(--font-sans);
          font-size: 0.56rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 0.85rem;
        }
        .contact-cell-value {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--pearl);
          line-height: 1.5;
          letter-spacing: 0;
        }
        .contact-cell-value a {
          color: var(--pearl);
          transition: color 0.3s;
        }
        .contact-cell-value a:hover {
          color: var(--champagne);
        }
        .contact-cell-value em {
          font-style: italic;
          color: var(--champagne);
        }

        /* ── Form + Map ── */
        .contact-main {
          padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 100%);
          border-top: 1px solid var(--border-hair);
        }
        .contact-main-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
        }
        .contact-main-head h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(2rem, 3.6vw, 3.2rem);
          line-height: 1.1;
          color: var(--pearl);
          margin: 1.5rem 0 1.5rem;
        }
        .contact-main-head h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .contact-main-head p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.92rem;
          color: var(--taupe);
          line-height: 1.9;
          max-width: 46ch;
          margin-bottom: 2.5rem;
        }

        .reservation-form {
          background: rgba(12, 9, 5, 0.72);
          border: 1px solid var(--border-hair);
          padding: 2.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-row.three {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.6rem;
        }
        .form-field label {
          font-family: var(--font-sans);
          font-size: 0.54rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--champagne);
          font-weight: 400;
        }
        .form-field input,
        .form-field textarea,
        .form-field select {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border-soft);
          color: var(--pearl);
          padding: 0.65rem 0 0.85rem;
          font-family: var(--font-serif);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.4s var(--ease-silk);
          font-style: italic;
          width: 100%;
        }
        .form-field input[type='date'],
        .form-field input[type='time'],
        .form-field select {
          font-family: var(--font-sans);
          font-style: normal;
          font-size: 0.88rem;
          color-scheme: dark;
        }
        .form-field input:focus,
        .form-field textarea:focus,
        .form-field select:focus {
          border-bottom-color: var(--champagne);
        }
        .form-field textarea {
          resize: none;
          min-height: 80px;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: var(--stone);
          font-style: italic;
        }

        .form-submit {
          margin-top: 1rem;
        }
        .form-feedback {
          margin-top: 1.25rem;
          padding: 1rem 1.25rem;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--ivory);
          border-left: 2px solid var(--champagne);
          background: rgba(201, 169, 110, 0.05);
        }
        .form-feedback.error {
          border-color: #c65a3c;
          background: rgba(180, 92, 50, 0.08);
        }

        /* ── Map ── */
        .contact-map-section {
          padding: clamp(4rem, 6vw, 6rem) 0 0;
          background: var(--onyx);
          border-top: 1px solid var(--border-hair);
        }
        .map-title {
          text-align: center;
          padding: 0 clamp(1.5rem, 5vw, 5rem) 3rem;
        }
        .map-title h2 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: var(--pearl);
          margin-top: 1.5rem;
          line-height: 1.1;
        }
        .map-title h2 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .map-wrap {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: hidden;
          border-top: 1px solid var(--border-hair);
          border-bottom: 1px solid var(--border-hair);
        }
        .map-wrap iframe {
          width: 100%;
          height: 100%;
          border: 0;
          filter: invert(0.92) hue-rotate(170deg) brightness(0.95) saturate(0.55) contrast(0.92);
        }
        .map-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(8, 6, 3, 0.45) 100%);
          pointer-events: none;
        }
        .map-pin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
          pointer-events: none;
          z-index: 2;
          text-align: center;
        }
        .map-pin-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--champagne);
          margin: 0 auto;
          position: relative;
          box-shadow: 0 0 0 4px rgba(201, 169, 110, 0.22), 0 0 24px rgba(201, 169, 110, 0.5);
        }
        .map-pin-dot::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid var(--champagne);
          animation: pinPulse 2.5s ease-out infinite;
        }
        .map-pin-label {
          margin-top: 12px;
          padding: 0.6rem 1rem;
          background: rgba(8, 6, 3, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-soft);
          font-family: var(--font-italiana);
          font-size: 0.9rem;
          color: var(--champagne);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        @keyframes pinPulse {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.8); }
        }

        @media (max-width: 900px) {
          .contact-grid-inner {
            grid-template-columns: 1fr;
          }
          .contact-cell {
            border-right: none;
            border-bottom: 1px solid var(--border-hair);
          }
          .contact-cell:last-child {
            border-bottom: none;
          }
          .contact-main-inner {
            grid-template-columns: 1fr;
          }
          .form-row,
          .form-row.three {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .map-wrap {
            height: 400px;
          }
          .reservation-form {
            padding: 1.75rem;
          }
        }
      `}</style>

      <section className="contact-hero">
        <div className="eyebrow center reveal">Te esperamos</div>
        <h1 className="reveal reveal-delay-1">
          Reserva tu
          <br />
          <em>experiencia</em>
        </h1>
        <p className="reveal reveal-delay-2">
          Una mesa en Ébenezer es una invitación al disfrute pausado. Nuestro equipo estará
          encantado de recibirte con la delicadeza que mereces.
        </p>
      </section>

      <section className="contact-grid">
        <div className="contact-grid-inner">
          <div className="contact-cell reveal reveal-delay-1">
            <div className="contact-cell-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contact-cell-label">Dirección</div>
            <div className="contact-cell-value">
              Calle la Paz, 28-A
              <br />
              <em>13300 Valdepeñas</em>
            </div>
          </div>
          <div className="contact-cell reveal reveal-delay-2">
            <div className="contact-cell-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="contact-cell-label">Horarios</div>
            <div className="contact-cell-value">
              <em>08:00 — 23:00</em>
              <br />
              Todos los días
            </div>
          </div>
          <div className="contact-cell reveal reveal-delay-3">
            <div className="contact-cell-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="contact-cell-label">Reservas</div>
            <div className="contact-cell-value">
              <a href="tel:+34623272728">+34 623 272 728</a>
              <br />
              <em>reservas@ebenezer</em>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-main-inner">
          <div className="contact-main-head">
            <div className="eyebrow reveal">Formulario de reserva</div>
            <h2 className="reveal reveal-delay-1">
              Reserva
              <br />
              <em>tu mesa</em>
            </h2>
            <p className="reveal reveal-delay-2">
              Indícanos tus datos y la hora deseada. Nuestro equipo confirmará tu reserva
              en menos de dos horas. Para ocasiones especiales, no dudes en dejarnos una nota.
            </p>
            <p className="reveal reveal-delay-2" style={{ fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--stone)' }}>
              Para grupos de más de <span style={{ color: 'var(--champagne)' }}>8 personas</span>, recomendamos llamar directamente.
            </p>
          </div>

          <form className="reservation-form reveal reveal-delay-2" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  placeholder="Su nombre"
                  required
                />
              </div>
              <div className="form-field">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  placeholder="+34 600 000 000"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-row three">
              <div className="form-field">
                <label>Fecha *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => onChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Hora *</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => onChange('time', e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Comensales</label>
                <select
                  value={form.guests}
                  onChange={(e) => onChange('guests', e.target.value)}
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Ocasión especial o notas</label>
              <textarea
                value={form.notes}
                onChange={(e) => onChange('notes', e.target.value)}
                rows={3}
                placeholder="Aniversario, cumpleaños, alergias..."
              />
            </div>

            <div className="form-submit">
              <button className="lux-btn" type="submit">
                <span>Solicitar reserva</span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {submitted && (
              <div className="form-feedback">
                Gracias, {form.name}. Tu solicitud ha sido recibida. Te confirmaremos la reserva
                en breve por teléfono.
              </div>
            )}
            {error && <div className="form-feedback error">{error}</div>}
          </form>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="map-title">
          <div className="eyebrow center reveal">Cómo encontrarnos</div>
          <h2 className="reveal reveal-delay-1">
            En el corazón de <em>Valdepeñas</em>
          </h2>
        </div>
        <div className="map-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.5!2d-3.3838!3d38.7602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ1JzM2LjciTiAzwrAyMyczMC4yIlc!5e0!3m2!1ses!2ses!4v1740000000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Cafetería Ébenezer"
          />
          <div className="map-pin" aria-hidden="true">
            <div className="map-pin-dot" />
            <div className="map-pin-label">Ébenezer</div>
          </div>
        </div>
      </section>
    </>
  );
}
