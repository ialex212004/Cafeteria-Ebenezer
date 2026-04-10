'use client';

export default function InfoStrip() {
  return (
    <>
      <style jsx>{`
        .info-strip {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--info-h);
          background: linear-gradient(180deg, #080603 0%, #0c0905 100%);
          border-bottom: 1px solid rgba(201, 169, 110, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 310;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(246, 238, 221, 0.7);
          overflow: hidden;
        }

        .info-strip::before,
        .info-strip::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 120px;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.4) 100%);
          transform: translateY(-50%);
        }
        .info-strip::before {
          left: 4%;
        }
        .info-strip::after {
          right: 4%;
          background: linear-gradient(90deg, rgba(201, 169, 110, 0.4) 0%, transparent 100%);
        }

        .info-content {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          white-space: nowrap;
        }

        .info-item svg {
          width: 11px;
          height: 11px;
          stroke: var(--champagne);
          fill: none;
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.85;
        }

        .info-item b {
          color: var(--champagne);
          font-weight: 400;
          letter-spacing: 0.18em;
        }

        .info-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--champagne);
          opacity: 0.4;
        }

        @media (max-width: 768px) {
          .info-strip {
            font-size: 0.55rem;
            letter-spacing: 0.18em;
          }
          .info-strip::before,
          .info-strip::after {
            display: none;
          }
          .info-content {
            gap: 1rem;
            padding: 0 1rem;
          }
          .info-item svg {
            width: 9px;
            height: 9px;
          }
        }

        @media (max-width: 480px) {
          .info-hide-sm {
            display: none;
          }
        }
      `}</style>

      <div className="info-strip" role="complementary" aria-label="Información del restaurante">
        <div className="info-content">
          <div className="info-item">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>
              <b>08:00 — 23:00</b>
            </span>
          </div>
          <div className="info-divider" />
          <div className="info-item info-hide-sm">
            <svg viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Valdepeñas · Ciudad Real</span>
          </div>
          <div className="info-divider info-hide-sm" />
          <div className="info-item">
            <svg viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>
              <b>+34 623 272 728</b>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
