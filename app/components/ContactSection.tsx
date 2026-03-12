"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent } from "react";

const products = [
  { value: "Bocadillo Cubano",  label: "🥖 Bocadillo Cubano — 4,50€" },
  { value: "Pizza Artesana",    label: "🍕 Pizza Artesana — 8,00€ (solo sáb.)" },
  { value: "Postre Casero",     label: "🍮 Postre Casero — 2,50€" },
  { value: "Copa Ébenezer",     label: "🌺 Copa Ébenezer — 3,50€" },
  { value: "Café",              label: "☕ Café — 1,20€" },
  { value: "Otro",              label: "Otro" },
];

export default function ContactSection({ selectedProduct }: { selectedProduct?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", product: selectedProduct || "", qty: "1", notes: "" });

  useEffect(() => {
    if (selectedProduct) setForm(f => ({ ...f, product: selectedProduct }));
  }, [selectedProduct]);

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

  const waLink = () => {
    const msg = encodeURIComponent(
      `Hola Cafetería Ébenezer 👋\n\n` +
      `*Nombre:* ${form.name || "Cliente"}\n` +
      `*Teléfono:* ${form.phone || "-"}\n` +
      `*Producto:* ${form.product || "-"} (x${form.qty})\n` +
      `*Notas:* ${form.notes || "Ninguna"}\n\n` +
      `¡Gracias! 🍽️`
    );
    return `https://wa.me/34623272728?text=${msg}`;
  };

  const inputBase: CSSProperties = {
    background: "rgba(255,255,255,0.07)",
    border: "1.5px solid rgba(255,255,255,0.1)",
    color: "var(--cream)",
    fontFamily: "inherit",
  };

  const inputFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = "var(--gold)";
    (e.target as HTMLElement).style.background = "rgba(255,255,255,0.11)";
  };
  const inputBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
    (e.target as HTMLElement).style.background = "rgba(255,255,255,0.07)";
  };

  return (
    <section
      id="pedidos"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--green)" }}
    >
      {/* decorative circle */}
      <div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />

      <div className="px-8 lg:px-16 ml-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Info */}
          <div>
            <span className="reveal text-[11px] tracking-[3px] uppercase font-semibold block mb-4"
                  style={{ color: "var(--gold)" }}>
              📦 Pedidos
            </span>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: "var(--cream)" }}>
              ¿Listo para el <em style={{ color: "var(--terracotta-light)" }}>mejor bocado?</em>
            </h2>
            <p className="reveal reveal-delay-2 text-[15px] leading-[1.7] mb-10"
               style={{ color: "rgba(245,237,216,0.55)" }}>
              Pide por WhatsApp o usa el formulario. Te confirmamos en minutos y lo tenemos listo para ti.
            </p>

            <div className="reveal reveal-delay-3 flex flex-col gap-4">
              {[
                { icon: "💬", label: "WhatsApp",   value: "+34 623 272 728", href: "https://wa.me/34623272728" },
                { icon: "📞", label: "Teléfono",   value: "+34 623 272 728", href: "tel:+34623272728" },
                { icon: "✉️", label: "Email",       value: "info@cafeteriaebenezer.com", href: "mailto:info@cafeteriaebenezer.com" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 no-underline
                             hover:translate-x-1"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[1px] uppercase mb-[2px]"
                         style={{ color: "rgba(245,237,216,0.5)" }}>
                      {c.label}
                    </div>
                    <div className="text-[15px] font-semibold" style={{ color: "var(--cream)" }}>
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="reveal reveal-delay-2 rounded-3xl p-8 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="font-serif text-[22px] font-bold mb-7" style={{ color: "var(--cream)" }}>
              Haz tu pedido aquí
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { key: "name",  label: "Nombre",    placeholder: "Tu nombre",          type: "text" },
                { key: "phone", label: "Teléfono",  placeholder: "+34 000 000 000",    type: "tel" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                         style={{ color: "rgba(245,237,216,0.6)" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                    style={inputBase}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                     style={{ color: "rgba(245,237,216,0.6)" }}>
                Producto
              </label>
              <select
                value={form.product}
                onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                style={inputBase}
                onFocus={inputFocus}
                onBlur={inputBlur}
              >
                <option value="">— Selecciona —</option>
                {products.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                     style={{ color: "rgba(245,237,216,0.6)" }}>
                Cantidad
              </label>
              <input
                type="number"
                min="1"
                value={form.qty}
                onChange={e => setForm(p => ({ ...p, qty: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                style={inputBase}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="mb-7">
              <label className="block text-[11px] font-semibold tracking-[1px] uppercase mb-2"
                     style={{ color: "rgba(245,237,216,0.6)" }}>
                Notas / Personalización
              </label>
              <textarea
                rows={3}
                placeholder="Sin pepinillos, extra queso..."
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200 resize-none"
                style={inputBase}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-[15px] font-semibold
                         text-white transition-all duration-200 hover:-translate-y-[2px] no-underline"
              style={{ backgroundColor: "#25D366" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 30px rgba(37,211,102,0.45)"; (e.currentTarget as HTMLElement).style.background = "#1fbd5a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.background = "#25D366"; }}
            >
              💬 Enviar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
