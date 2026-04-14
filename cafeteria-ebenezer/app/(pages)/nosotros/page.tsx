'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NosotrosPage() {
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
          .chronicle-header {
            margin-bottom: 3.5rem;
          }
        }
        @media (max-width: 600px) {
          .chronicle-grid {
            grid-template-columns: 1fr;
          }
          .chronicle-slot {
            border-right: none;
            border-bottom: 1px solid var(--border-hair);
            padding: 2rem 1.5rem;
          }
          .chronicle-slot:last-child {
            border-bottom: none;
          }
          .chronicle-header {
            margin-bottom: 2.5rem;
          }
          .value-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            padding: 1.75rem 0;
          }
          .story-text p:first-of-type::first-letter {
            font-size: 2.8rem;
            padding-right: 0.4rem;
          }
          .story-signature {
            gap: 1rem;
          }
          .values-inner {
            gap: 2.5rem;
          }
        }
        @media (max-width: 400px) {
          .chronicle-slot {
            padding: 1.75rem 1.25rem;
          }
          .chronicle-time {
            font-size: 1.8rem;
          }
          .value-row {
            padding: 1.5rem 0;
          }
        }
      `}</style>

      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="eyebrow center reveal">Nuestra historia</div>
          <h1 className="reveal reveal-delay-1">
            Hasta aquí nos ha
            <br />
            traído <em>el Señor</em>
          </h1>
          <p className="about-hero-lede reveal reveal-delay-2">
            Ébenezer no es solo un nombre bonito. Es una declaración de fe. Significa
            &ldquo;la roca fuerte&rdquo; y &ldquo;hasta aquí nos ha traído el Señor&rdquo;.
            Cada taza, cada mesa, cada día abiertos son evidencia de esa promesa cumplida.
          </p>
        </div>
      </section>

      <section className="story">
        <div className="story-inner">
          <div className="story-media reveal">
            <div className="story-frame">
              <Image
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=85"
                alt="Interior de Cafetería Ébenezer con barra y ambiente cálido"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <div className="story-caption">— Valdepeñas · Ébenezer · MMXXV —</div>
            </div>
            <div className="story-accent" />
          </div>

          <div className="story-text">
            <div className="eyebrow reveal">La historia</div>
            <h2 className="reveal reveal-delay-1">
              Un sueño nacido
              <br />
              <em>de la fe y las manos</em>
            </h2>
            <p className="reveal reveal-delay-2">
              Esta cafetería nació del corazón de un matrimonio cubano que creyó que Dios podía usarlos
              incluso entre hornos y tazas de café. No fue fácil. Hubo madrugadas de duda,
              momentos en los que el camino no estaba claro. Pero había una roca firme debajo
              de cada paso: la convicción de que esto no era solo un negocio, sino un llamado.
            </p>
            <p className="reveal reveal-delay-2">
              Cafeteria Ébenezer abrió sus puertas en Valdepeñas no para ser la cafetería más famosa,
              sino para ser la más fiel. Fiel al producto, fiel a las personas que entran,
              y sobre todo, fiel a quien nos sostuvo cuando todavía era solo un sueño escrito
              en un cuaderno.
            </p>
            <p className="reveal reveal-delay-2">
              Dios es el centro de todo lo que hacemos aquí. Eso no es un eslogan; es la razón
              por la que cada detalle importa, por la que cada persona es recibida como un regalo.
            </p>
            <div className="story-signature reveal reveal-delay-3">
              <div>
                <div className="story-signature-name">La familia Ébenezer</div>
                <div className="story-signature-role">Fundadores | Angel Willian Lared Quintero | Dayamila Rodriguez Pacheco · Valdepeñas · MMXXV</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chronicle">
        <div className="chronicle-inner">
          <div className="chronicle-header">
            <div className="eyebrow center reveal">Cuatro piedras en el camino</div>
            <h2 className="reveal reveal-delay-1">
              Momentos que nos <em>recuerdan quiénes somos</em>
            </h2>
          </div>
          <div className="chronicle-grid">
            <div className="chronicle-slot reveal reveal-delay-1">
              <span className="chronicle-time">Fe</span>
              <span className="chronicle-label">El comienzo</span>
              <p className="chronicle-desc">Todo empezó con una oración y una hoja en blanco. La fe vino antes que el capital.</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-2">
              <span className="chronicle-time">Familia</span>
              <span className="chronicle-label">El motor</span>
              <p className="chronicle-desc">Detrás de cada taza hay manos conocidas, risas compartidas y una historia que aún se escribe.</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-3">
              <span className="chronicle-time">Oficio</span>
              <span className="chronicle-label">La entrega</span>
              <p className="chronicle-desc">El buen café y la buena pizza piden tiempo, paciencia y el deseo de hacerlo bien aunque nadie mire.</p>
            </div>
            <div className="chronicle-slot reveal reveal-delay-4">
              <span className="chronicle-time">Gracia</span>
              <span className="chronicle-label">El sustento</span>
              <p className="chronicle-desc">Cada día abiertos es una evidencia de que &ldquo;hasta aquí nos ha traído el Señor&rdquo;.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values-inner">
          <div className="values-header">
            <div className="eyebrow reveal">Lo que nos define</div>
            <h2 className="reveal reveal-delay-1">
              Lo que hay
              <br />
              <em>detrás de cada taza</em>
            </h2>
            <p className="reveal reveal-delay-2">
              No somos perfectos. Pero tenemos claro para quién trabajamos y a quién queremos
              parecernos en cada gesto, en cada recibimiento, en cada plato que sale de aquí.
            </p>
            <div className="values-cta reveal reveal-delay-3">
              <Link href="/contacto" className="lux-btn">
                <span>Ven a conocernos</span>
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
                  Dios en el <em>centro</em>
                </h3>
                <p>
                  Antes de abrir, hay una oración. Cuando algo sale bien, hay gratitud.
                  Cuando algo falla, hay humildad. Dios no es un detalle decorativo aquí:
                  es la razón de todo.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-2">
              <div className="value-num">II</div>
              <div className="value-body">
                <h3>
                  Las personas, <em>primero</em>
                </h3>
                <p>
                  Quien entra por esa puerta no es un cliente; es alguien a quien recibir.
                  Puede que venga con prisa, con tristeza, o simplemente con hambre.
                  Nuestra misión es que salga mejor de como entró.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-3">
              <div className="value-num">III</div>
              <div className="value-body">
                <h3>
                  Honradez en el <em>oficio</em>
                </h3>
                <p>
                  El café lo hacemos bien porque hacerlo mal sería una falta de respeto
                  al productor, al cliente y a nosotros mismos. La excelencia no es orgullo:
                  es mayordomía.
                </p>
              </div>
            </div>
            <div className="value-row reveal reveal-delay-4">
              <div className="value-num">IV</div>
              <div className="value-body">
                <h3>
                  Una mesa <em>abierta</em>
                </h3>
                <p>
                  Aquí caben todos. La mesa de Ébenezer no tiene lista de espera para el alma.
                  Si llegas cansado, hay sitio. Si llegas solo, aquí hay compañía.
                  Así como Dios nos recibió a nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
