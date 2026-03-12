"use client";

import { useEffect, useRef } from "react";

const menuItems = [
  {
    tag: "🥖 Especialidad",
    name: "Bocadillo Cubano",
    desc: "Nuestro clásico irresistible. Pan crujiente con carne jugosa, queso fundido, pepinillos y mostaza. La fusión perfecta entre Cuba y España.",
    price: "4,50",
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
    badge: "⭐ Estrella de la Casa",
    badgeColor: "var(--gold)",
    badgeText: "var(--charcoal)",
    featured: true,
  },
  {
    tag: "☕ Bebidas",
    name: "Café de Especialidad",
    desc: "Grano seleccionado, preparación cuidadosa. Cortado, con leche, solo... como tú quieras.",
    price: "1,20",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "🍮 Dulces",
    name: "Postres Caseros",
    desc: "Hechos cada día con amor. Perfectos para acompañar tu café o como merienda dulce.",
    price: "2,50",
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "🍕 Especial Sábado",
    name: "Pizzas Artesanas",
    desc: "Masa madre, ingredientes frescos. Disponibles cada sábado con sabores especiales para compartir.",
    price: "8,00",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    badge: "🗓️ Solo Sábados",
    badgeColor: "var(--green)",
    badgeText: "white",
  },
  {
    tag: "🌺 Novedad",
    name: "Copa Ébenezer",
    desc: "Frutas frescas, granola artesana y yogur cremoso. La merienda sana y deliciosa que te sorprenderá.",
    price: "3,50",
    img: "https://images.unsplash.com/photo-1484723091739-30990ff50925?auto=format&fit=crop&w=600&q=80",
  },
];

const tickerItems = [
  "🥖 Bocadillo Cubano",
  "🍕 Pizzas Artesanas los Sábados",
  "🍮 Postres Caseros",
  "☕ Café de Calidad",
  "📞 +34 623 272 728",
  "❤️ 100% Hecho en Casa",
];

function MenuCard({ item, onOrder }: { item: typeof menuItems[0]; onOrder: (name: string) => void }) {
  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden cursor-pointer
                  transition-all duration-500 shadow-md
                  hover:-translate-y-2 hover:shadow-2xl
                  ${item.featured ? "md:col-span-2" : ""}`}
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(196,82,42,0.18)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)")}
    >
      {item.badge && (
        <span
          className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-[5px] rounded-full"
          style={{ backgroundColor: item.badgeColor, color: item.badgeText || "white" }}
        >
          {item.badge}
        </span>
      )}
      <div className="overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]
                      ${item.featured ? "h-[280px]" : "h-[220px]"}`}
        />
      </div>
      <div className="p-6">
        <span className="text-[10px] tracking-[2px] uppercase font-semibold mb-2 block"
              style={{ color: "var(--terracotta)" }}>
          {item.tag}
        </span>
        <h3 className="font-serif text-[22px] font-bold mb-2" style={{ color: "var(--charcoal)" }}>
          {item.name}
        </h3>
        <p className="text-[13px] leading-[1.6] mb-5" style={{ color: "rgba(26,20,16,0.55)" }}>
          {item.desc}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-[26px] font-bold" style={{ color: "var(--terracotta)" }}>
            {item.price}€ <span className="text-[14px] font-normal font-body" style={{ color: "rgba(26,20,16,0.4)" }}>/ud.</span>
          </span>
          <button
            type="button"
            onClick={() => onOrder(item.name)}
            className="w-10 h-10 rounded-xl text-white text-[22px] leading-none flex items-center justify-center
                       transition-all duration-300 hover:scale-110 hover:rotate-90"
            style={{ backgroundColor: "var(--terracotta)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--green)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--terracotta)")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection({ onOrderItem }: { onOrderItem?: (name: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleOrder = (name: string) => {
    onOrderItem?.(name);
    document.getElementById("pedidos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* TICKER */}
      <div className="overflow-hidden h-11 flex items-center" style={{ backgroundColor: "var(--terracotta)" }}>
        <div className="ticker-track flex gap-0 whitespace-nowrap w-max">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-5 px-7 font-display text-[14px] text-white tracking-[2px]">
              {item}
              <span className="w-[5px] h-[5px] rounded-full bg-white/50 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* MENU SECTION */}
      <section
        id="menu"
        ref={ref}
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: "var(--cream)" }}
      >
        {/* Background text */}
        <div
          className="absolute right-12 top-16 font-display text-[180px] leading-none pointer-events-none select-none"
          style={{ color: "rgba(196,82,42,0.04)" }}
        >
          MENÚ
        </div>

        <div className="px-8 lg:px-16 ml-[72px] relative z-10">
          <span className="reveal text-[11px] tracking-[3px] uppercase font-semibold block mb-4"
                style={{ color: "var(--terracotta)" }}>
            🍽️ Nuestra Carta
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ color: "var(--charcoal)" }}>
            Lo mejor de <em style={{ color: "var(--terracotta)" }}>nuestra cocina</em>
          </h2>
          <p className="reveal reveal-delay-2 text-[15px] leading-[1.7] max-w-[500px] mb-14"
             style={{ color: "rgba(26,20,16,0.55)" }}>
            Cada producto está hecho con ingredientes frescos, seleccionados con cariño. Nada de congelados, nada de atajos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <div key={item.name} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                <MenuCard item={item} onOrder={handleOrder} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
