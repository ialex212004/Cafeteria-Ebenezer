'use client';

import Link from 'next/link';

const year = 2026;

export default function Footer() {
  return (
    <>
      <style jsx>{`
        footer {
          position: relative;
          background: linear-gradient(180deg, #080603 0%, #0c0905 100%);
          border-top: 1px solid rgba(201, 169, 110, 0.1);
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem) 2.5rem;
          overflow: hidden;
        }
        footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
              ellipse 80% 60% at 50% 0%,
              rgba(201, 169, 110, 0.04) 0%,
              transparent 70%
            ),
            radial-gradient(ellipse 40% 30% at 15% 100%, rgba(180, 92, 50, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(201, 169, 110, 0.08);
        }

        .footer-brand .logo {
          font-family: var(--font-italiana);
          font-size: 2.2rem;
          color: var(--pearl);
          letter-spacing: 0.03em;
          line-height: 1;
          text-transform: uppercase;
          display: inline-block;
        }
        .footer-brand .tagline {
          margin-top: 1rem;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--taupe);
          line-height: 1.7;
          max-width: 26ch;
        }
        .footer-brand .tagline b {
          color: var(--champagne);
          font-style: normal;
          font-weight: 400;
        }
        .footer-stars {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 1.25rem;
          color: var(--champagne);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
        }
        .footer-stars span {
          font-size: 0.7rem;
        }

        .footer-col h4 {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--champagne);
          margin-bottom: 1.5rem;
        }
        .footer-col ul li {
          margin-bottom: 0.85rem;
        }
        .footer-col a {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          color: var(--taupe);
          transition: color 0.35s var(--ease-silk);
          position: relative;
          display: inline-block;
        }
        .footer-col a::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: var(--champagne);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s var(--ease-silk);
        }
        .footer-col a:hover {
          color: var(--pearl);
        }
        .footer-col a:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .footer-col p {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          color: var(--taupe);
          line-height: 1.8;
        }
        .footer-col p b {
          color: var(--pearl);
          font-weight: 400;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copy {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--stone);
          font-weight: 300;
        }
        .footer-copy em {
          color: var(--champagne);
          font-style: normal;
        }
        .footer-legal {
          display: flex;
          gap: 1.8rem;
        }
        .footer-legal a {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--stone);
          transition: color 0.3s;
        }
        .footer-legal a:hover {
          color: var(--champagne);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="logo">Ébenezer</span>
              <p className="tagline">
                <b>Café de día</b>, <b>pizza de noche</b>. Un santuario
                para el paladar en el corazón de Valdepeñas.
              </p>
              <div className="footer-stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                &nbsp;Selección Ébenezer
              </div>
            </div>

            <div className="footer-col">
              <h4>Carta</h4>
              <ul>
                <li><Link href="/menu">Cafetería</Link></li>
                <li><Link href="/menu">Pizzería</Link></li>
                <li><Link href="/galeria">Galería</Link></li>
                <li><Link href="/resenas">Reseñas</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Casa</h4>
              <ul>
                <li><Link href="/nosotros">Nuestra historia</Link></li>
                <li><Link href="/contacto">Reservar</Link></li>
                <li>
                  <a href="https://www.instagram.com/ebenezer_valdepenas/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/34623272728"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Visítanos</h4>
              <p>
                <b>Calle la Paz, 28-A</b>
                <br />
                13300 Valdepeñas
                <br />
                Ciudad Real, España
              </p>
              <p style={{ marginTop: '0.9rem' }}>
                <b>08:00 — 23:00</b>
                <br />
                Todos los días
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} · <em>Cafetería Ébenezer</em> · Todos los derechos reservados
            </p>
            <div className="footer-legal">
              <a href="#">Privacidad</a>
              <a href="#">Cookies</a>
              <a href="#">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
