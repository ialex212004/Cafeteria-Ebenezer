import { useEffect, useRef } from "react";

const values = [
  { icon: "🌿", title: "Ingredientes frescos", desc: "Seleccionados cada día, sin conservantes ni congelados." },
  { icon: "🏠", title: "Recetas caseras",     desc: "Como en casa de tu abuela, con amor en cada paso." },
  { icon: "🇨🇺", title: "Sabor cubano",       desc: "Tradición traída desde la isla hasta Madrid." },
  { icon: "😊", title: "Atención personal",   desc: "Cada cliente importa. Trato cercano y de confianza." },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-24 lg:py-32" style={{ backgroundColor: "var(--charcoal)" }} ref={ref}>
      <div className="px-8 lg:px-16 ml-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Images */}
          <div className="reveal relative h-[480px] lg:h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80"
              alt="Cocina"
              className="absolute top-0 left-0 w-[74%] h-[74%] object-cover rounded-3xl z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=500&q=80"
              alt="Comida"
              className="absolute bottom-0 right-0 w-[56%] h-[56%] object-cover rounded-2xl z-20"
              style={{ border: "4px solid var(--charcoal)" }}
            />
            {/* Year badge */}
            <div
              className="absolute z-30 w-[110px] h-[110px] rounded-full flex flex-col items-center justify-center"
              style={{
                top: "52%", left: "52%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "var(--terracotta)",
                border: "4px solid var(--charcoal)",
              }}
            >
              <span className="font-display text-[38px] text-white leading-none">6+</span>
              <span className="text-[9px] tracking-[1.5px] uppercase text-center leading-tight"
                    style={{ color: "rgba(255,255,255,0.75)" }}>
                años de<br />sabor
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="reveal text-[11px] tracking-[3px] uppercase font-semibold mb-4"
               style={{ color: "var(--gold)" }}>
              ❤️ Nuestra Historia
            </p>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: "var(--cream)" }}>
              Pasión por <em style={{ color: "var(--terracotta-light)" }}>la calidad</em>
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] leading-[1.75] mb-10"
               style={{ color: "rgba(245,237,216,0.55)" }}>
              En Cafetería Ébenezer hemos integrado lo mejor de la tradición cubana y española. Cada ingrediente se selecciona con cuidado, cada receta se prepara con cariño. Somos más que una cafetería: somos un punto de encuentro donde la comida casera se convierte en experiencia memorable.
            </p>

            <div className="reveal reveal-delay-3 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-5 transition-all duration-300 cursor-default
                             hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(196,82,42,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,82,42,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <div className="text-[13px] font-semibold mb-1" style={{ color: "var(--cream)" }}>{v.title}</div>
                  <div className="text-[12px] leading-[1.5]" style={{ color: "rgba(245,237,216,0.4)" }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
