'use client';

import { useEffect, useState } from 'react';

type MenuTab = 'Cafe' | 'Pizza';

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  note?: string;
};

type MenuCategory = {
  title: string;
  roman: string;
  items: MenuItem[];
};

const cafeMenu: MenuCategory[] = [
  {
    title: 'Bebidas calientes',
    roman: 'I',
    items: [
      { name: 'Espresso Ristretto', desc: 'Grano de finca única, extracción corta e intensa', price: '3,50', note: 'House selection' },
      { name: 'Cappuccino Tradizionale', desc: 'Espresso, leche texturizada y cacao de Modica', price: '4,50' },
      { name: 'Flat White', desc: 'Doble espresso, microfoam sedosa', price: '4,80' },
      { name: 'Mocha Noir', desc: 'Espresso, chocolate negro 70% y crema fresca', price: '5,20' },
      { name: 'Té Imperial Chai', desc: 'Té negro Assam, cardamomo, canela y leche tibia', price: '4,00' },
    ],
  },
  {
    title: 'Colección fría',
    roman: 'II',
    items: [
      { name: 'Cold Brew Reserva', desc: 'Infusión lenta en frío, doce horas de espera', price: '5,00' },
      { name: 'Frappé de la Casa', desc: 'Café helado, vainilla de Madagascar y crema batida', price: '5,50' },
      { name: 'Limonada de Albahaca', desc: 'Limón fresco, albahaca del huerto, agua con gas', price: '3,80' },
      { name: 'Matcha Latte Ceremonial', desc: 'Matcha grado ceremonial, leche de avena', price: '5,40' },
    ],
  },
  {
    title: 'Dulces & Repostería',
    roman: 'III',
    items: [
      { name: 'Croissant de Mantequilla', desc: 'Mantequilla francesa AOP, hojaldrado en casa', price: '3,20' },
      { name: 'Tarta de Queso Vasca', desc: 'Queso curado, caramelización suave, base quemada', price: '6,20', note: 'Especialidad' },
      { name: 'Brownie Valrhona', desc: 'Chocolate belga, nuez pecana, flor de sal', price: '4,40' },
      { name: 'Cannelé Bordelés', desc: 'Interior cremoso, corteza de caramelo rubio', price: '3,60' },
    ],
  },
];

const pizzaMenu: MenuCategory[] = [
  {
    title: 'Pizzas Signature',
    roman: 'I',
    items: [
      { name: 'Margherita D.O.P.', desc: 'Tomate San Marzano, mozzarella di bufala, albahaca genovesa', price: '12,00', note: 'La original' },
      { name: 'Pepperoni Piccante', desc: 'Pepperoni italiano, miel de romero, mozzarella fior di latte', price: '14,00' },
      { name: 'Tartufo Nero', desc: 'Crema de trufa negra, mozzarella, huevo de corral y parmesano 24m', price: '18,00', note: 'Selección' },
      { name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola DOP, parmigiano reggiano y fontina', price: '15,00' },
    ],
  },
  {
    title: 'Creaciones de autor',
    roman: 'II',
    items: [
      { name: 'Ébenezer Suprema', desc: 'Solomillo, chorizo ibérico, pimientos asados y aceitunas Kalamata', price: '17,00' },
      { name: 'Mediterránea', desc: 'Cherry confitado, rúcula salvaje, jamón ibérico 36m y parmesano', price: '16,00' },
      { name: 'Bosco Selvatico', desc: 'Crema de setas, boletus, prosciutto di Parma y aceite de trufa', price: '17,50' },
      { name: 'Burrata di Andria', desc: 'Base blanca, burrata entera, tomate pasificado y albahaca', price: '16,50' },
    ],
  },
  {
    title: 'Para compartir',
    roman: 'III',
    items: [
      { name: 'Tabla de Antipasti', desc: 'Selección de embutidos ibéricos, quesos curados y encurtidos', price: '18,00' },
      { name: 'Focaccia al Rosmarino', desc: 'Aceite de oliva virgen extra, romero fresco y flor de sal', price: '6,00' },
      { name: 'Ensalada de Temporada', desc: 'Brotes tiernos, burrata, vinagreta de trufa', price: '9,50' },
      { name: 'Alitas al Horno', desc: 'Marinado de la casa, ahumado ligero, alioli negro', price: '8,00' },
    ],
  },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<MenuTab>('Cafe');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const categories = activeTab === 'Cafe' ? cafeMenu : pizzaMenu;

  return (
    <>
      <style jsx global>{`
        .menu-hero {
          position: relative;
          margin-top: var(--stack);
          padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem);
          text-align: center;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 110, 0.06) 0%, transparent 70%),
            var(--obsidian);
          border-bottom: 1px solid var(--border-hair);
        }
        .menu-hero-inner {
          max-width: 860px;
          margin: 0 auto;
        }
        .menu-hero h1 {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(3rem, 6vw, 5.6rem);
          line-height: 1;
          color: var(--pearl);
          margin: 1.5rem 0;
          letter-spacing: -0.015em;
        }
        .menu-hero h1 em {
          font-style: italic;
          color: var(--champagne);
          font-weight: 400;
        }
        .menu-hero p {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--taupe);
          line-height: 1.85;
          max-width: 54ch;
          margin: 0 auto;
        }
        .menu-hero .ornament {
          font-family: var(--font-italiana);
          font-size: 1.4rem;
          color: var(--champagne);
          letter-spacing: 0.4em;
          opacity: 0.7;
          margin: 2.5rem 0 1.5rem;
        }
        .menu-hero .ornament span {
          display: inline-block;
          margin: 0 0.6em;
        }

        /* ── Tabs ── */
        .menu-tabs-wrap {
          display: flex;
          justify-content: center;
          padding: clamp(3rem, 5vw, 5rem) 1.5rem 1rem;
          background: var(--obsidian);
        }
        .menu-tabs {
          display: inline-flex;
          gap: 0;
          position: relative;
          padding: 0;
        }
        .menu-tab {
          font-family: var(--font-sans);
          font-size: 0.66rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 400;
          padding: 1.1rem 2.6rem;
          color: var(--stone);
          border: 1px solid var(--border-hair);
          background: transparent;
          transition: color 0.55s var(--ease-silk), border-color 0.55s var(--ease-silk),
            background 0.55s var(--ease-silk);
          position: relative;
        }
        .menu-tab + .menu-tab {
          border-left: none;
        }
        .menu-tab.active {
          color: var(--ink);
          background: var(--champagne);
          border-color: var(--champagne);
        }
        .menu-tab:not(.active):hover {
          color: var(--pearl);
          border-color: var(--border-soft);
        }
        .menu-tab small {
          display: block;
          font-family: var(--font-italiana);
          font-size: 0.9rem;
          margin-top: 0.4rem;
          letter-spacing: 0.05em;
          text-transform: none;
          color: inherit;
        }

        /* ── Menu body ── */
        .menu-body {
          padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem) clamp(6rem, 10vw, 10rem);
          background: linear-gradient(180deg, var(--obsidian) 0%, var(--onyx) 60%, var(--obsidian) 100%);
        }
        .menu-body-inner {
          max-width: 860px;
          margin: 0 auto;
        }
        .menu-category {
          margin-bottom: 5rem;
        }
        .menu-category-head {
          display: flex;
          align-items: baseline;
          gap: 2rem;
          padding-bottom: 2rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-hair);
          position: relative;
        }
        .menu-category-head::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 80px;
          height: 1px;
          background: var(--champagne);
        }
        .menu-category-num {
          font-family: var(--font-italiana);
          font-size: 2.4rem;
          color: var(--champagne);
          line-height: 1;
          opacity: 0.8;
        }
        .menu-category-title {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          color: var(--pearl);
          letter-spacing: -0.005em;
        }
        .menu-category-title em {
          font-style: italic;
          color: var(--champagne);
        }

        .menu-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          padding: 1.5rem 0;
          border-bottom: 1px dashed rgba(201, 169, 110, 0.1);
          align-items: baseline;
          transition: padding 0.5s var(--ease-silk);
        }
        .menu-item:last-child {
          border-bottom: none;
        }
        .menu-item:hover {
          padding-left: 1rem;
        }
        .menu-item-name {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.45rem;
        }
        .menu-item-name h4 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.18rem;
          color: var(--pearl);
          letter-spacing: 0;
        }
        .menu-item-note {
          font-family: var(--font-sans);
          font-size: 0.54rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--champagne);
          padding: 0.25rem 0.65rem;
          border: 1px solid rgba(201, 169, 110, 0.3);
          font-weight: 400;
        }
        .menu-item-desc {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--stone);
          line-height: 1.7;
          max-width: 52ch;
        }
        .menu-item-price {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.35rem;
          color: var(--champagne);
          white-space: nowrap;
          letter-spacing: 0.01em;
          position: relative;
          padding-left: 1rem;
        }
        .menu-item-price::before {
          content: '€';
          font-family: var(--font-italiana);
          font-size: 0.9em;
          margin-right: 0.15em;
          opacity: 0.8;
        }

        /* ── Footer of menu ── */
        .menu-footer {
          text-align: center;
          margin-top: 5rem;
          padding-top: 3.5rem;
          border-top: 1px solid var(--border-hair);
        }
        .menu-footer-mark {
          font-family: var(--font-italiana);
          font-size: 1.1rem;
          color: var(--champagne);
          letter-spacing: 0.3em;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }
        .menu-footer-quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          color: var(--taupe);
          max-width: 50ch;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .menu-footer-note {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .menu-footer-note b {
          color: var(--champagne);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .menu-item {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .menu-item-price {
            padding-left: 0;
          }
          .menu-category-head {
            flex-direction: column;
            gap: 0.75rem;
          }
          .menu-tab {
            padding: 0.9rem 1.6rem;
            font-size: 0.58rem;
          }
        }
      `}</style>

      <section className="menu-hero">
        <div className="menu-hero-inner">
          <div className="eyebrow center reveal">La carta</div>
          <h1 className="reveal reveal-delay-1">
            Una selección
            <br />
            <em>cuidadosamente orquestada</em>
          </h1>
          <div className="ornament reveal reveal-delay-2">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
          <p className="reveal reveal-delay-3">
            Dos mundos en una misma mesa. Cada preparación nace del respeto por el producto,
            la paciencia del oficio y la alegría de compartir.
          </p>
        </div>
      </section>

      <div className="menu-tabs-wrap">
        <div className="menu-tabs reveal">
          <button
            className={`menu-tab${activeTab === 'Cafe' ? ' active' : ''}`}
            onClick={() => setActiveTab('Cafe')}
          >
            Cafetería
            <small>— Día —</small>
          </button>
          <button
            className={`menu-tab${activeTab === 'Pizza' ? ' active' : ''}`}
            onClick={() => setActiveTab('Pizza')}
          >
            Pizzería
            <small>— Noche —</small>
          </button>
        </div>
      </div>

      <section className="menu-body">
        <div className="menu-body-inner">
          {categories.map((cat, i) => (
            <div className={`menu-category reveal reveal-delay-${(i % 3) + 1}`} key={`${activeTab}-${cat.title}`}>
              <div className="menu-category-head">
                <span className="menu-category-num">{cat.roman}</span>
                <h2 className="menu-category-title">
                  <em>{cat.title.split(' ')[0]}</em>
                  {cat.title.split(' ').slice(1).join(' ') ? ' ' + cat.title.split(' ').slice(1).join(' ') : ''}
                </h2>
              </div>
              {cat.items.map((item) => (
                <div className="menu-item" key={item.name}>
                  <div>
                    <div className="menu-item-name">
                      <h4>{item.name}</h4>
                      {item.note && <span className="menu-item-note">{item.note}</span>}
                    </div>
                    <p className="menu-item-desc">{item.desc}</p>
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}

          <div className="menu-footer">
            <div className="menu-footer-mark">— · —</div>
            <p className="menu-footer-quote">
              &ldquo;La carta cambia con las estaciones. Los productores marcan el ritmo
              y nosotros lo seguimos, con gusto.&rdquo;
            </p>
            <p className="menu-footer-note">
              Consulta al equipo por <b>alérgenos</b> &nbsp;·&nbsp; Precios con <b>IVA incluido</b>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
