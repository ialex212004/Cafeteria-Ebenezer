import { useState, useEffect } from "react";

const navItems = [
  { id: "hero",      icon: "🏠", label: "Inicio",     sub: "Bienvenida" },
  { id: "menu",      icon: "🍽️", label: "Menú",       sub: "Nuestra carta", badge: "NUEVO" },
  { id: "nosotros",  icon: "❤️", label: "Nosotros",   sub: "Nuestra historia" },
  { id: "opiniones", icon: "⭐", label: "Opiniones",  sub: "Clientes felices" },
  { id: "pedidos",   icon: "📦", label: "Pedir Ahora",sub: "Fácil y rápido" },
  { id: "ubicacion", icon: "📍", label: "Ubicación",  sub: "Cómo llegar" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── SIDEBAR ── */}
      <nav
        className="fixed left-0 top-0 h-screen z-50 flex flex-col items-center overflow-hidden
                   transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
                   w-[72px] hover:w-[280px]"
        style={{ backgroundColor: "var(--charcoal)" }}
      >
        {/* Logo */}
        <div className="w-full h-20 flex items-center px-[18px] flex-shrink-0 border-b border-white/8 gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: "var(--terracotta)" }}
          >
            ☕
          </div>
          <div className="whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-300 delay-75 group-hover:opacity-100 sidebar-label">
            <span className="block font-serif font-bold text-[13px]" style={{ color: "var(--cream)" }}>
              Ébenezer
            </span>
            <span className="text-[9px] tracking-[2px] uppercase" style={{ color: "var(--gold)" }}>
              Cafetería · Madrid
            </span>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 w-full py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex items-center h-[54px] px-[18px] gap-4 w-full cursor-pointer
                         transition-colors duration-200 text-left group/item"
              style={{
                backgroundColor: active === item.id ? "rgba(196,82,42,0.14)" : "transparent",
              }}
            >
              {/* Active bar */}
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-transform duration-300"
                style={{
                  backgroundColor: "var(--terracotta)",
                  transform: active === item.id ? "scaleY(1)" : "scaleY(0)",
                }}
              />

              {/* Icon */}
              <span
                className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[18px]
                           flex-shrink-0 transition-all duration-200"
                style={{
                  background: active === item.id ? "rgba(196,82,42,0.28)" : "rgba(255,255,255,0.05)",
                }}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className="flex-1 whitespace-nowrap opacity-0 -translate-x-2
                           transition-all duration-300 delay-75 sidebar-label"
              >
                <span className="block text-[13px] font-medium" style={{ color: "var(--cream)" }}>
                  {item.label}
                </span>
                <span className="text-[10px]" style={{ color: "rgba(245,237,216,0.4)" }}>
                  {item.sub}
                </span>
              </span>

              {/* Badge */}
              {item.badge && (
                <span
                  className="text-[9px] font-bold tracking-[0.5px] px-2 py-[3px] rounded-full
                             whitespace-nowrap opacity-0 transition-opacity duration-300 delay-100 sidebar-label"
                  style={{ backgroundColor: "var(--terracotta)", color: "white" }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <div className="w-[calc(100%-20px)] mx-[10px] mb-5 rounded-xl overflow-hidden flex-shrink-0"
             style={{ backgroundColor: "var(--terracotta)" }}>
          <a
            href="https://wa.me/34623272728?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%BD%EF%B8%8F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 gap-3 text-white text-[13px] font-semibold
                       transition-colors hover:bg-white/10 px-3 w-full"
          >
            <span>💬</span>
            <span className="whitespace-nowrap opacity-0 sidebar-label transition-all duration-300 delay-100">
              WhatsApp
            </span>
          </a>
        </div>
      </nav>

      {/* Trick: target sidebar-label children via CSS since Tailwind group isn't deep enough */}
      <style>{`
        nav:hover .sidebar-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </>
  );
}
