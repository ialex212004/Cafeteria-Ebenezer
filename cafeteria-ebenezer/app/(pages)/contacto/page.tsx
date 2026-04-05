'use client';

import { useEffect } from 'react';

export default function ContactoPage() {
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

  return (
    <>
      <style jsx global>{`
        :root {
          --bg3: #18140d;
          --border: rgba(210, 185, 140, 0.08);
          --fg: #f2ece0;
          --fg2: #a89880;
          --fg3: #5c5040;
          --gold: #d4a853;
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .map-frame {
          border: 1px solid var(--border);
          overflow: hidden;
          position: relative;
        }
        .map-frame iframe {
          display: block;
          width: 100%;
          height: 400px;
          border: 0;
          filter: invert(1) hue-rotate(180deg) brightness(0.85) saturate(0.6);
        }
        .contact-info .section-title {
          margin-bottom: 2.5rem;
        }
        .contact-row {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }
        .contact-icon-box {
          width: 2.5rem;
          height: 2.5rem;
          flex-shrink: 0;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-icon-box svg {
          width: 1rem;
          height: 1rem;
          stroke: var(--gold);
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .contact-row h4 {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg3);
          margin-bottom: 0.4rem;
        }
        .contact-row p,
        .contact-row a {
          font-size: 0.9rem;
          color: var(--fg2);
          line-height: 1.6;
          transition: color 0.2s;
          text-decoration: none;
        }
        .contact-row a:hover {
          color: var(--gold);
        }
        .social-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 2rem;
        }
        .social-btn {
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg3);
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
          background: transparent;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-3px);
        }
        .social-btn svg {
          width: 1rem;
          height: 1rem;
          fill: currentColor;
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
        .reveal-delay-1 {
          transition-delay: 0.1s;
        }
        .reveal-delay-2 {
          transition-delay: 0.2s;
        }
        .reveal-delay-3 {
          transition-delay: 0.3s;
        }

        @media (max-width: 768px) {
          .section {
            padding: 5rem 1.25rem;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>

      <section className="section section-surface">
        <div className="container">
          <div className="contact-grid">
            <div className="map-frame reveal">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.0!2d-3.3844!3d39.0074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDAwJzI2LjciTiAzwrAyMyczMC4yIlc!5e0!3m2!1ses!2ses!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Cafetería Ébenezer"
              />
            </div>
            <div className="contact-info">
              <div className="eyebrow reveal">Visítanos</div>
              <h1 className="section-title reveal reveal-delay-1">
                Te <em>esperamos</em>
              </h1>
              <div className="contact-row reveal reveal-delay-2">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h2>Dirección</h2>
                  <p>Calle la Paz, 28-A · Valdepeñas, 13300 · Ciudad Real, España</p>
                </div>
              </div>
              <div className="contact-row reveal reveal-delay-2">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h2>Horarios</h2>
                  <p>
                    Lunes a Domingo: 08:00 – 23:00
                    <br />
                    Servicio continuo
                  </p>
                </div>
              </div>
              <div className="contact-row reveal reveal-delay-3">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h2>Teléfono</h2>
                  <a href="tel:+34623272728">+34 623 272 728</a>
                </div>
              </div>
              <div className="social-row reveal reveal-delay-3">
                <a
                  href="https://wa.me/34623272728?text=Hola%2C%20me%20gustaría%20obtener%20más%20información"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ebenezer_valdepenas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
