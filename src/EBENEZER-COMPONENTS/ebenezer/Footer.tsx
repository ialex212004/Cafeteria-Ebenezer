import { useEffect, useRef } from "react";

export default function Footer() {
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

  const inputStyle = {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "inherit",
    fontFamily: "inherit",
  } as React.CSSProperties;

  return (
    <>
      {/* UBICACION */}
      <section
        id="ubicacion"
        ref={ref}
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div className="px-8 lg:px-16 ml-[72px]">
          <span className="reveal text-[11px] tracking-[3px] uppercase font-semibold block mb-4"
                style={{ color: "var(--terracotta)" }}>
            📍 Ubicación
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl lg:text-5xl font-bold leading-tight mb-14"
              style={{ color: "var(--charcoal)" }}>
            Encuéntranos <em style={{ color: "var(--terracotta)" }}>aquí</em>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Info card */}
            <div className="reveal rounded-3xl p-8" style={{ backgroundColor: "var(--charcoal)" }}>
              <h3 className="font-serif text-[22px] font-bold mb-1" style={{ color: "var(--cream)" }}>
                Cafetería Ébenezer
              </h3>
              <p className="text-[13px] mb-8" style={{ color: "rgba(245,237,216,0.45)" }}>
                Madrid · Valdepeñas · España
              </p>

              {[
                { icon: "📍", label: "Dirección",    value: "Madrid, España" },
                { icon: "🕐", label: "Horario",
                  value: "Lun–Vie: 8:00–20:00\nSáb: 9:00–22:00 🍕\nDom: 10:00–15:00" },
                { icon: "📞", label: "Teléfono",    value: "+34 623 272 728", href: "tel:+34623272728" },
                { icon: "✉️", label: "Email",        value: "info@cafeteriaebenezer.com", href: "mailto:info@cafeteriaebenezer.com" },
              ].map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 py-4 border-b last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-[20px] mt-[2px] flex-shrink-0">{d.icon}</span>
                  <div>
                    <div className="text-[11px] tracking-[1px] uppercase mb-[3px]"
                         style={{ color: "rgba(245,237,216,0.4)" }}>
                      {d.label}
                    </div>
                    {d.href ? (
                      <a href={d.href} className="text-[14px] font-medium no-underline"
                         style={{ color: "var(--terracotta-light)" }}>
                        {d.value}
                      </a>
                    ) : (
                      <div className="text-[14px] font-medium whitespace-pre-line"
                           style={{ color: "var(--cream)" }}>
                        {d.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/34623272728"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-[14px] font-semibold
                           text-white no-underline transition-all hover:-translate-y-[2px]"
                style={{ backgroundColor: "var(--terracotta)" }}
              >
                💬 Escríbenos
              </a>
            </div>

            {/* Map */}
            <div
              className="reveal reveal-delay-2 lg:col-span-2 rounded-3xl overflow-hidden"
              style={{ height: "460px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96898.30927706!2d-3.7734013!3d38.8918232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6a33a8d04dca83%3A0xa3fd0c14b75cb8f5!2sValdepe%C3%B1as%2C%20Ciudad%20Real!5e0!3m2!1ses!2ses!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Cafetería Ébenezer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "var(--charcoal)" }}>
        <div className="px-8 lg:px-16 ml-[72px] pt-16 pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b"
               style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <span className="block font-serif text-[22px] font-bold mb-3" style={{ color: "var(--cream)" }}>
                Cafetería Ébenezer
              </span>
              <p className="text-[13px] leading-[1.7] mb-6" style={{ color: "rgba(245,237,216,0.4)" }}>
                Sabor auténtico cubano en Madrid. Bocadillos, pizzas y postres hechos con amor y los mejores ingredientes frescos.
              </p>
              <div className="flex gap-2">
                {[
                  { label: "📸", href: "#" },
                  { label: "💬", href: "https://wa.me/34623272728" },
                  { label: "✉️", href: "mailto:info@cafeteriaebenezer.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-[16px]
                               transition-all duration-200 hover:-translate-y-[2px]"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(196,82,42,0.3)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Navegación", links: [
                { label: "Inicio",    href: "#hero" },
                { label: "Menú",     href: "#menu" },
                { label: "Nosotros", href: "#nosotros" },
                { label: "Opiniones",href: "#opiniones" },
              ]},
              { title: "Pedidos", links: [
                { label: "Hacer Pedido", href: "#pedidos" },
                { label: "Llamar",       href: "tel:+34623272728" },
                { label: "WhatsApp",     href: "https://wa.me/34623272728" },
                { label: "Ubicación",    href: "#ubicacion" },
              ]},
              { title: "Horario", links: [
                { label: "Lun–Vie: 8:00–20:00",  href: "#" },
                { label: "Sábado: 9:00–22:00 🍕", href: "#" },
                { label: "Domingo: 10:00–15:00",  href: "#" },
              ]},
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-semibold tracking-[2px] uppercase mb-5"
                     style={{ color: "rgba(245,237,216,0.5)" }}>
                  {col.title}
                </div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-[14px] no-underline transition-colors duration-200"
                        style={{ color: "rgba(245,237,216,0.6)" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--terracotta-light)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(245,237,216,0.6)")}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-8">
            <span className="text-[13px]" style={{ color: "rgba(245,237,216,0.3)" }}>
              © 2026 Cafetería Ébenezer. Todos los derechos reservados.
            </span>
            <span className="text-[13px]" style={{ color: "rgba(245,237,216,0.3)" }}>
              Hecho con ❤️ en Madrid
            </span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/34623272728?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%BD%EF%B8%8F"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pop wa-ring fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center
                   justify-center text-[26px] no-underline transition-all duration-300
                   hover:scale-110 hover:-translate-y-[3px]"
        style={{
          backgroundColor: "#25D366",
          boxShadow: "0 6px 30px rgba(37,211,102,0.5)",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(37,211,102,0.65)")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 6px 30px rgba(37,211,102,0.5)")}
        title="Pedir por WhatsApp"
      >
        💬
      </a>
    </>
  );
}
