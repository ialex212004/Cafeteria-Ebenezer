'use client';

export default function Footer() {
  return (
    <>
      <style jsx>{`
        footer {
          background: #0e0b08;
          border-top: 1px solid rgba(210, 185, 140, 0.08);
          background-image: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(212, 168, 83, 0.03) 0%, transparent 70%);
          padding: 2rem;
        }
        .footer-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-logo {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: #a89880;
        }
        .footer-logo em {
          color: #d4a853;
          font-style: italic;
        }
        .footer-copy {
          font-size: 0.75rem;
          color: #5c5040;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .footer-inner {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>

      <footer>
        <div className="footer-inner">
          <p className="footer-logo">
            Cafetería <em>Ébenezer</em>
          </p>
          <p className="footer-copy">© 2026 · Café, pizza y mucho más. Bienvenido a Ébenezer.</p>
        </div>
      </footer>
    </>
  );
}
