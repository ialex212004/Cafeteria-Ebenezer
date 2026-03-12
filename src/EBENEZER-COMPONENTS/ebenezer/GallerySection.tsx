import { useEffect, useRef, useState } from "react";

const reviews = [
  { stars: 5, text: "Ambiente acogedor y productos deliciosos. Siempre vuelvo por el café y la atención amable. Sin duda el mejor sitio del barrio.", name: "Luis Gómez", city: "Madrid", avatar: "👨" },
  { stars: 5, text: "Probé las pizzas y son riquísimas. Muy buenos precios para lo que ofrecen. Sin duda repetiré el próximo sábado.", name: "Jorge M.", city: "Valdepeñas", avatar: "👦" },
  { stars: 5, text: "Una mañana muy buena, todo delicioso y la atención le doy un 10 sin pensarlo dos veces. El bocadillo cubano es espectacular.", name: "Valentina Sanchez", city: "Madrid", avatar: "👩" },
  { stars: 5, text: "Los postres caseros son una pasada. Se nota que todo está hecho con cariño y buenos ingredientes. Muy recomendable.", name: "María Rodríguez", city: "Madrid", avatar: "👩‍🦱" },
  { stars: 5, text: "El café es de los mejores que he tomado. El trato personal marca la diferencia. Volveré siempre que pueda.", name: "Antonio Pérez", city: "Valdepeñas", avatar: "👨‍🦳" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    if (!name.trim() || !selectedStars) {
      alert(!name.trim() ? "Por favor introduce tu nombre" : "Por favor selecciona una puntuación");
      return;
    }
    alert(`¡Gracias por tu opinión, ${name}! 🌟`);
    form.reset();
    setSelectedStars(0);
  };

  const allReviews = [...reviews, ...reviews]; // duplicate for infinite loop

  return (
    <section
      id="opiniones"
      ref={ref}
      className="py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--cream-dark)" }}
    >
      <div className="px-8 lg:px-16 ml-[72px] mb-12">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <span className="reveal text-[11px] tracking-[3px] uppercase font-semibold block mb-4"
                  style={{ color: "var(--terracotta)" }}>
              ⭐ Testimonios
            </span>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "var(--charcoal)" }}>
              Lo que dicen <em style={{ color: "var(--terracotta)" }}>nuestros clientes</em>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-[13px]" style={{ color: "rgba(26,20,16,0.4)" }}>
            Pasa el ratón para pausar
          </p>
        </div>
      </div>

      {/* Infinite carousel */}
      <div className="overflow-hidden px-0 gallery-mask">
        <div className="reviews-track flex gap-6 w-max py-4">
          {allReviews.map((r, i) => (
            <div
              key={i}
              className="w-[340px] flex-shrink-0 bg-white rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="text-[16px] tracking-[2px] mb-4" style={{ color: "var(--gold)" }}>
                {"★".repeat(r.stars)}
              </div>
              <p className="font-serif text-[15px] leading-[1.7] italic mb-6"
                 style={{ color: "rgba(26,20,16,0.75)" }}>
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[18px] flex-shrink-0"
                  style={{ backgroundColor: "var(--cream-dark)" }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-semibold" style={{ color: "var(--charcoal)" }}>{r.name}</div>
                  <div className="text-[12px]" style={{ color: "rgba(26,20,16,0.45)" }}>{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opinion form */}
      <div className="px-8 lg:px-16 ml-[72px] mt-14">
        <div className="reveal max-w-[600px] bg-white rounded-3xl p-10"
             style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <h3 className="font-serif text-[24px] font-bold mb-6" style={{ color: "var(--charcoal)" }}>
            Deja tu opinión 💬
          </h3>

          {/* Stars */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="text-[28px] leading-none transition-transform duration-150"
                style={{
                  color: n <= (hoveredStar || selectedStars) ? "var(--gold)" : "rgba(26,20,16,0.2)",
                  transform: n <= (hoveredStar || selectedStars) ? "scale(1.15)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredStar(n)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStars(n)}
              >
                ★
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { name: "name", label: "Nombre", placeholder: "Tu nombre" },
                { name: "city", label: "Ciudad",  placeholder: "Tu ciudad" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                         style={{ color: "var(--charcoal)" }}>
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                    style={{
                      background: "var(--cream)",
                      border: "1.5px solid transparent",
                      color: "var(--charcoal)",
                      fontFamily: "inherit",
                    }}
                    onFocus={e => { e.target.style.borderColor = "var(--terracotta)"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "transparent"; e.target.style.background = "var(--cream)"; }}
                  />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                     style={{ color: "var(--charcoal)" }}>
                Tu opinión
              </label>
              <textarea
                name="opinion"
                rows={4}
                placeholder="¿Qué te pareció?"
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200 resize-none"
                style={{
                  background: "var(--cream)",
                  border: "1.5px solid transparent",
                  color: "var(--charcoal)",
                  fontFamily: "inherit",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--terracotta)"; e.target.style.background = "white"; }}
                onBlur={e => { e.target.style.borderColor = "transparent"; e.target.style.background = "var(--cream)"; }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-[14px] font-semibold text-white transition-all duration-200
                         hover:-translate-y-[2px]"
              style={{ backgroundColor: "var(--terracotta)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(196,82,42,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              Enviar Opinión →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
