"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = target / 60;
        const id = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(Math.floor(cur));
          if (cur >= target) clearInterval(id);
        }, 18);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-[38px] leading-none" style={{ color: "var(--gold)" }}>
      {val}{suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 py-24 ml-[72px] lg:ml-[72px]">
        {/* Tag */}
        <div
          className="animate-fade-up-1 inline-flex items-center gap-2 px-4 py-[6px] rounded-full mb-8 w-fit
                     text-[11px] tracking-[3px] uppercase font-semibold"
          style={{
            background: "rgba(212,168,67,0.13)",
            border: "1px solid rgba(212,168,67,0.3)",
            color: "var(--gold)",
          }}
        >
          <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ backgroundColor: "var(--gold)" }} />
          Madrid · Valdepeñas · Desde 2018
        </div>

        {/* Title */}
        <h1
          className="animate-fade-up-2 font-display leading-[0.88] mb-4"
          style={{ fontSize: "clamp(64px,8vw,108px)", color: "var(--cream)" }}
        >
          EL SABOR
          <br />
          <em
            className="font-serif not-italic"
            style={{ color: "var(--terracotta-light)", fontSize: "0.72em" }}
          >
            Auténtico
          </em>
          <br />
          CUBANO
        </h1>

        <p
          className="animate-fade-up-3 text-[15px] leading-[1.7] max-w-[380px] mb-12"
          style={{ color: "rgba(245,237,216,0.6)" }}
        >
          Bocadillos, pizzas y postres hechos en casa, con amor y los mejores ingredientes. Un punto de encuentro donde cada bocado cuenta una historia.
        </p>

        <div className="animate-fade-up-4 flex gap-4 flex-wrap">
          <a
            href="#pedidos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-semibold
                       text-white transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              backgroundColor: "var(--terracotta)",
              boxShadow: "0 0 0 0 rgba(196,82,42,0)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(196,82,42,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(196,82,42,0)")}
          >
            Pedir Ahora →
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-medium
                       transition-all duration-200"
            style={{
              border: "1px solid rgba(245,237,216,0.22)",
              color: "var(--cream)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,237,216,0.07)"; e.currentTarget.style.borderColor = "rgba(245,237,216,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = "rgba(245,237,216,0.22)"; }}
          >
            Ver Menú
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-5 flex gap-10 mt-16 flex-wrap">
          {[
            { target: 500, suffix: "+", label: "Pedidos / mes" },
            { target: 100, suffix: "%", label: "Casero" },
            { target: 6, suffix: "+", label: "Años sirviendo" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <Counter target={s.target} suffix={s.suffix} />
              <span className="text-[11px] tracking-[1px] uppercase mt-1" style={{ color: "rgba(245,237,216,0.4)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right image */}
      <div className="hidden lg:block relative overflow-hidden">
        {/* gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, var(--charcoal) 0%, transparent 45%)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80"
          alt="Bocadillo Cubano"
          className="w-full h-full object-cover hero-img-zoom"
        />

        {/* Float card */}
        <div
          className="animate-fade-up-5 absolute bottom-16 right-10 z-20 rounded-2xl p-5"
          style={{
            background: "rgba(26,20,16,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212,168,67,0.2)",
          }}
        >
          <p className="text-[10px] tracking-[2px] uppercase mb-2" style={{ color: "var(--gold)" }}>
            Opinión destacada
          </p>
          <p className="text-[16px] mb-1" style={{ color: "var(--gold)" }}>★★★★★</p>
          <p className="text-[13px] italic" style={{ color: "var(--cream)" }}>
            "Insuperable. Lo mejor de Madrid."
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
                      text-[10px] tracking-[2px] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
        <div className="w-px h-10 scroll-line" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
        scroll
      </div>
    </section>
  );
}
