"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MenuTab = "cafe" | "pizza";

type Review = {
  name: string;
  text: string;
  stars: number;
  avatarStyle: string;
};

const initialReviews: Review[] = [
  { name: "María González", text: "El café de especialidad es simplemente increíble. El latte art que hacen es digno de fotografiar. ¡Vuelvo cada semana sin falta!", stars: 5, avatarStyle: "background:rgba(212,168,83,0.15);color:var(--gold2)" },
  { name: "Carlos Ruiz", text: "La Ébenezer Suprema es una pizza que no se olvida. Masa perfecta, ingredientes frescos y ese ambiente nocturno tan especial.", stars: 5, avatarStyle: "background:rgba(168,50,40,0.15);color:var(--red2)" },
  { name: "Ana Martínez", text: "Me encanta que puedo desayunar rico por la mañana y cenar pizza de noche en el mismo lugar. El croissant es el mejor que he probado.", stars: 4, avatarStyle: "background:rgba(212,168,83,0.1);color:var(--gold)" },
  { name: "Luis Herrera", text: "El Cold Brew de 12 horas tiene un sabor incomparable. Vine una vez por recomendación y ya no puedo dejar de venir cada semana.", stars: 5, avatarStyle: "background:rgba(212,168,83,0.15);color:var(--gold2)" },
  { name: "Sofía Peña", text: "La pizza Mediterránea con jamón serrano y rúcula es una obra maestra. El ambiente, la música, el servicio… todo perfecto.", stars: 5, avatarStyle: "background:rgba(168,50,40,0.15);color:var(--red2)" },
  { name: "Roberto Díaz", text: "El Mocha con crema batida es adictivo. Lo pido cada mañana camino al trabajo. Un lugar que se convierte en parte de tu rutina.", stars: 5, avatarStyle: "background:rgba(212,168,83,0.12);color:var(--gold)" },
];

function starsText(value: number) {
  return `${"★".repeat(value)}${"☆".repeat(5 - value)}`;
}

const NAV_ITEMS = [
  { href: "inicio", label: "Inicio" },
  { href: "nosotros", label: "Nosotros" },
  { href: "menu", label: "Menú" },
  { href: "galeria", label: "Galería" },
  { href: "resenas", label: "Reseñas" },
  { href: "contacto", label: "Contacto" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<MenuTab>("cafe");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const navTimeoutRef = useRef<number | null>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  const duplicatedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  const navTo = useCallback((id: string) => {
    setMenuOpen(false);
    if (navTimeoutRef.current) {
      window.clearTimeout(navTimeoutRef.current);
    }
    navTimeoutRef.current = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 420);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.paddingRight = menuOpen && scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, af = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const palette = ["rgba(212,168,83,", "rgba(168,50,40,", "rgba(242,236,224,"];
    const particleCount = window.innerWidth < 768 ? 28 : 45;
    const pts = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18, vy: -Math.random() * 0.22 - 0.05,
      a: Math.random() * 0.45 + 0.1,
      c: palette[Math.floor(Math.random() * palette.length)],
    }));
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.a})`; ctx.fill();
      });
      af = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(af); };
  }, []);

  const scrollGallery = (dir: number) => galleryTrackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  const submitReview = () => {
    const n = name.trim(), t = text.trim();
    if (!n || !t) { setMessageError(true); setMessage("Por favor completa tu nombre y reseña."); return; }
    const styles = ["background:rgba(212,168,83,0.15);color:var(--gold2)", "background:rgba(168,50,40,0.15);color:var(--red2)", "background:rgba(212,168,83,0.1);color:var(--gold)"];
    setReviews((prev) => [{ name: n, text: t, stars: rating, avatarStyle: styles[Math.floor(Math.random() * styles.length)] }, ...prev]);
    setName(""); setText(""); setRating(5); setMessageError(false);
    setMessage(`¡Gracias ${n}! Tu reseña aparece en el carrusel.`);
    if (messageTimeoutRef.current) {
      window.clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = window.setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    return () => {
      if (navTimeoutRef.current) {
        window.clearTimeout(navTimeoutRef.current);
      }
      if (messageTimeoutRef.current) {
        window.clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0e0b08; --bg2: #131009; --bg3: #18140d; --surface: #201a11;
          --border: rgba(210,185,140,0.08); --border2: rgba(210,185,140,0.16);
          --fg: #f2ece0; --fg2: #a89880; --fg3: #5c5040;
          --gold: #d4a853; --gold2: #edc97a; --gold-dim: rgba(212,168,83,0.12);
          --red: #a83228; --red2: #d4503f; --red-dim: rgba(168,50,40,0.14);
          --font-display: 'Poppins', sans-serif;
          --font-body: 'Libre Baskerville', Georgia, serif;
          --ease: cubic-bezier(0.34, 1.56, 0.64, 1);
          --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
        }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-body); background: var(--bg); color: var(--fg); overflow-x: hidden; font-size: 0.9rem; line-height: 1.8; }
        h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); letter-spacing: -0.01em; }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; cursor: pointer; }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          transition: background 0.4s, backdrop-filter 0.4s;
        }
        nav.scrolled { background: rgba(14,11,8,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; }
        .nav-logo { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: var(--fg); letter-spacing: 0.01em; position: relative; z-index: 301; }
        .nav-logo span { color: var(--gold); font-style: italic; }

        /* ── HAMBURGER ── */
        .menu-toggle {
          position: relative; z-index: 301;
          width: 44px; height: 44px; background: transparent;
          border: 1px solid var(--border2);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;
          transition: border-color 0.3s;
        }
        .menu-toggle:hover { border-color: var(--gold); }
        .menu-toggle .bar {
          width: 20px; height: 1.5px; background: var(--fg);
          transition: transform 0.4s var(--ease), opacity 0.3s, background 0.3s;
          transform-origin: center;
        }
        .menu-toggle.open .bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--gold); }
        .menu-toggle.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .menu-toggle.open .bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--gold); }

        /* ── OVERLAY ── */
        #menuOverlay {
          position: fixed; inset: 0; z-index: 250;
          display: grid; grid-template-columns: 1fr 1fr;
          pointer-events: none;
          visibility: hidden;
        }
        .overlay-panel {
          background: var(--bg2);
          transform: translateY(-100%);
          transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .overlay-panel:nth-child(2) { background: var(--bg3); transition-delay: 0.05s; }
        #menuOverlay.open { pointer-events: all; visibility: visible; }
        #menuOverlay.open .overlay-panel { transform: translateY(0); }

        #menuContent {
          position: fixed; inset: 0; z-index: 260;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 8vw; pointer-events: none;
          opacity: 0; visibility: hidden;
          transition: opacity 0.3s 0.25s, visibility 0s linear 0.55s;
        }
        #menuContent.open { opacity: 1; pointer-events: all; visibility: visible; transition: opacity 0.3s 0.25s, visibility 0s; }

        .overlay-nav-list { list-style: none; margin-bottom: 3rem; }
        .overlay-nav-item { overflow: hidden; margin-bottom: 0.25rem; }
        .overlay-nav-link {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700; color: var(--fg); letter-spacing: -0.02em;
          transform: translateY(110%);
          transition: transform 0.6s var(--ease), color 0.3s;
          will-change: transform;
        }
        #menuContent.open .overlay-nav-link { transform: translateY(0); }
        .overlay-nav-item:nth-child(1) .overlay-nav-link { transition-delay: 0.28s; }
        .overlay-nav-item:nth-child(2) .overlay-nav-link { transition-delay: 0.33s; }
        .overlay-nav-item:nth-child(3) .overlay-nav-link { transition-delay: 0.38s; }
        .overlay-nav-item:nth-child(4) .overlay-nav-link { transition-delay: 0.43s; }
        .overlay-nav-item:nth-child(5) .overlay-nav-link { transition-delay: 0.48s; }
        .overlay-nav-item:nth-child(6) .overlay-nav-link { transition-delay: 0.53s; }
        .overlay-nav-link:hover { color: var(--gold); }

        .overlay-bottom {
          display: flex; align-items: flex-end; justify-content: space-between;
          border-top: 1px solid var(--border); padding-top: 2rem;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s 0.6s, transform 0.5s 0.6s;
        }
        #menuContent.open .overlay-bottom { opacity: 1; transform: translateY(0); }
        .overlay-tagline { font-family: var(--font-display); font-style: italic; font-size: 1rem; color: var(--fg3); }
        .overlay-tagline em { color: var(--gold); }
        .overlay-social { display: flex; gap: 2rem; }
        .overlay-social a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg3); transition: color 0.2s; }
        .overlay-social a:hover { color: var(--gold); }

        /* ── HERO ── */
        #inicio { height: 100vh; min-height: 600px; display: flex; overflow: hidden; }
        .hero-panel { position: relative; flex: 1; display: flex; align-items: flex-end; overflow: hidden; transition: flex 0.6s cubic-bezier(0.25,1,0.5,1); min-width: 0; }
        .hero-panel:hover { flex: 1.25; }
        .hero-panel img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s var(--ease-smooth), filter 0.8s var(--ease-smooth); filter: brightness(0.45) saturate(0.8); will-change: transform; }
        .hero-panel:hover img { transform: scale(1.06); filter: brightness(0.5) saturate(0.9); }
        .hero-grad { position: absolute; inset: 0; }
        .hero-panel-day .hero-grad { background: linear-gradient(to top, rgba(14,11,8,0.97) 0%, rgba(14,11,8,0.5) 40%, rgba(14,11,8,0.1) 100%), linear-gradient(to right, rgba(14,11,8,0.6) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 30% 80%, rgba(212,168,83,0.08) 0%, transparent 70%); }
        .hero-panel-night .hero-grad { background: linear-gradient(to top, rgba(14,11,8,0.97) 0%, rgba(14,11,8,0.5) 40%, rgba(14,11,8,0.1) 100%), linear-gradient(to left, rgba(14,11,8,0.6) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 70% 80%, rgba(168,50,40,0.1) 0%, transparent 70%); }
        .hero-divider { position: absolute; top: 0; bottom: 0; right: 0; width: 1px; background: linear-gradient(to bottom, transparent 0%, var(--border2) 30%, var(--border2) 70%, transparent 100%); z-index: 5; }
        .hero-content { position: relative; z-index: 10; padding: 3rem 3.5rem; width: 100%; }
        .hero-tag { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 1.2rem; opacity: 0; animation: fadeUp 0.8s 0.3s both; }
        .hero-tag::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
        .hero-night .hero-tag { color: var(--red2); }
        .hero-night .hero-tag::before { background: var(--red2); }
        .hero-title { font-family: var(--font-display); font-size: clamp(2rem,4vw,3.2rem); font-weight: 600; line-height: 1.1; color: var(--fg); margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.8s 0.45s both; }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-night .hero-title em { color: var(--red2); }
        .hero-sub { font-size: 0.85rem; color: var(--fg2); line-height: 1.8; max-width: 34ch; margin-bottom: 2rem; font-family: var(--font-body); opacity: 0; animation: fadeUp 0.8s 0.6s both; }
        .hero-btn { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; font-family: var(--font-body); padding: 0.75rem 1.6rem; border: 1px solid; transition: all 0.3s; opacity: 0; animation: fadeUp 0.8s 0.75s both; }
        .hero-btn-day { border-color: var(--gold); color: var(--gold); }
        .hero-btn-day:hover { background: var(--gold); color: var(--bg); }
        .hero-btn-night { border-color: var(--red2); color: var(--red2); }
        .hero-btn-night:hover { background: var(--red2); color: var(--fg); }
        .hero-btn svg { width: 14px; height: 14px; transition: transform 0.3s; }
        .hero-btn:hover svg { transform: translateX(4px); }
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }

        /* ── SECTIONS ── */
        .section { padding: 7rem 2rem; }
        .section-dark { background: var(--bg2); background-image: radial-gradient(ellipse 80% 60% at 10% 20%, rgba(212,168,83,0.04) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(168,50,40,0.05) 0%, transparent 70%); }
        .section-surface { background: var(--bg3); background-image: radial-gradient(ellipse 70% 50% at 85% 15%, rgba(212,168,83,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 5% 90%, rgba(168,50,40,0.04) 0%, transparent 70%); }
        .container { max-width: 1180px; margin: 0 auto; }
        .eyebrow { display: flex; align-items: center; gap: 0.75rem; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 1.25rem; }
        .eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
        .section-title { font-family: var(--font-display); font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 600; line-height: 1.15; color: var(--fg); }
        .section-title em { font-style: italic; color: var(--gold); }

        /* ── ABOUT ── */
        .about-grid { display: grid; grid-template-columns: 5fr 7fr; gap: 5rem; align-items: center; }
        .about-img-wrap { position: relative; }
        .about-img-frame { position: relative; overflow: hidden; border: 1px solid var(--border); min-height: 520px; }
        .about-img-frame img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; filter: brightness(0.85) saturate(0.9); transition: transform 0.8s var(--ease-smooth), filter 0.5s; }
        .about-img-frame:hover img { transform: scale(1.04); filter: brightness(0.9) saturate(1); }
        .about-img-accent { position: absolute; bottom: -1.5rem; right: -1.5rem; width: 8rem; height: 8rem; border: 1px solid var(--gold); z-index: -1; }
        .about-text .section-title { margin-bottom: 1.75rem; }
        .about-text p { color: var(--fg2); font-size: 0.95rem; line-height: 1.85; margin-bottom: 1.25rem; }
        .timeline { display: flex; margin-top: 3rem; border-top: 1px solid var(--border); }
        .timeline-item { flex: 1; padding: 1.5rem 1.5rem 0 0; border-right: 1px solid var(--border); }
        .timeline-item:first-child { padding-left: 0; }
        .timeline-item:last-child { border-right: none; padding-right: 0; }
        .timeline-item:not(:first-child) { padding-left: 1.5rem; }
        .t-time { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; color: var(--gold); display: block; margin-bottom: 0.3rem; }
        .t-label { font-size: 0.72rem; color: var(--fg3); letter-spacing: 0.1em; text-transform: uppercase; }

        /* ── MENU ── */
        .menu-header { text-align: center; margin-bottom: 3.5rem; }
        .menu-tabs-wrap { display: flex; justify-content: center; margin-bottom: 3.5rem; }
        .menu-tabs { display: inline-flex; border: 1px solid var(--border2); padding: 4px; }
        .menu-tab { font-family: var(--font-body); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; padding: 0.65rem 2.2rem; border: none; background: transparent; color: var(--fg3); transition: all 0.3s; }
        .menu-tab.active { background: var(--gold); color: var(--bg); }
        .menu-tab:not(.active):hover { color: var(--fg); }
        .menu-content { max-width: 720px; margin: 0 auto; }
        .menu-section-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; color: var(--fg2); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
        .menu-cat { margin-bottom: 2.75rem; }
        .menu-item { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 0.9rem 1.1rem; border: 1px solid transparent; transition: border-color 0.25s, background 0.25s; }
        .menu-item:hover { border-color: var(--border); background: var(--surface); }
        .item-name { font-family: var(--font-display); font-weight: 500; font-size: 0.9rem; color: var(--fg); margin-bottom: 0.2rem; }
        .item-desc { font-size: 0.78rem; color: var(--fg3); }
        .item-price { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; color: var(--gold); white-space: nowrap; flex-shrink: 0; }

        /* ── GALLERY ── */
        .gallery-header { margin-bottom: 3rem; }
        .gallery-track-wrap { overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%); }
        .gallery-track { display: flex; gap: 1rem; overflow-x: auto; padding: 0 2rem 1rem; scrollbar-width: none; scroll-snap-type: x mandatory; scroll-behavior: smooth; }
        .gallery-track::-webkit-scrollbar { display: none; }
        .gallery-card { flex-shrink: 0; width: 280px; scroll-snap-align: start; position: relative; overflow: hidden; border: 1px solid var(--border); }
        .gallery-card img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; filter: brightness(0.75) saturate(0.8); transition: transform 0.7s var(--ease-smooth), filter 0.5s; }
        .gallery-card:hover img { transform: scale(1.06); filter: brightness(0.9) saturate(1.1); }
        .gallery-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem 1rem 1rem; background: linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 100%); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg2); transform: translateY(4px); transition: transform 0.3s; }
        .gallery-card:hover .gallery-card-label { transform: translateY(0); color: var(--fg); }
        .gallery-nav { display: flex; justify-content: center; gap: 0.75rem; margin-top: 2rem; }
        .gallery-nav button { width: 2.5rem; height: 2.5rem; border: 1px solid var(--border2); background: transparent; color: var(--fg2); display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
        .gallery-nav button:hover { border-color: var(--gold); color: var(--gold); }
        .gallery-nav button svg { width: 16px; height: 16px; }

        /* ── REVIEWS ── */
        .reviews-stage { position: relative; overflow: hidden; margin: 3.5rem 0 4rem; -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); }
        .reviews-track { display: flex; gap: 1.5rem; width: max-content; animation: scrollReviews 38s linear infinite; }
        .reviews-stage:hover .reviews-track { animation-play-state: paused; }
        @keyframes scrollReviews { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .review-card { width: 320px; flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); padding: 2rem 1.75rem 1.5rem; position: relative; overflow: hidden; transition: border-color 0.3s; }
        .review-card:hover { border-color: var(--border2); }
        .review-quote { font-family: var(--font-display); font-size: 4.5rem; color: var(--gold); opacity: 0.12; line-height: 0.8; margin-bottom: 0.75rem; display: block; }
        .review-text { font-size: 0.83rem; color: var(--fg2); line-height: 1.85; font-style: italic; margin-bottom: 1.5rem; min-height: 80px; }
        .review-footer { display: flex; align-items: center; gap: 0.75rem; }
        .review-avatar { width: 2.2rem; height: 2.2rem; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; font-size: 0.85rem; }
        .review-name { font-family: var(--font-display); font-weight: 600; font-size: 0.82rem; color: var(--fg); }
        .review-stars { font-size: 0.72rem; color: var(--gold); letter-spacing: 1px; margin-top: 0.15rem; }
        .reviews-pause-hint { text-align: center; margin-top: 1.25rem; font-size: 0.7rem; color: var(--fg3); letter-spacing: 0.1em; text-transform: uppercase; opacity: 0; transition: opacity 0.3s; }
        .reviews-stage:hover .reviews-pause-hint { opacity: 1; }

        /* ── REVIEW FORM ── */
        .review-form-wrap { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: start; background: var(--surface); border: 1px solid var(--border); padding: 2.5rem; }
        .review-form-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 600; color: var(--fg); line-height: 1.2; margin-top: 0.5rem; }
        .review-form-title em { color: var(--gold); font-style: italic; }
        .rform-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .rform-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .rform-group label { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg3); font-family: var(--font-display); }
        .rform-group input, .rform-group textarea { background: var(--bg2); border: 1px solid var(--border2); color: var(--fg); padding: 0.7rem 0.9rem; font-family: var(--font-body); font-size: 0.83rem; outline: none; resize: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; }
        .rform-group input:focus, .rform-group textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(212,168,83,0.12); background: rgba(19,16,9,0.96); }
        .rform-group input::placeholder, .rform-group textarea::placeholder { color: var(--fg3); }
        .rstar-picker { display: flex; gap: 0.2rem; padding: 0.5rem 0; }
        .rstar-picker span { font-size: 1.6rem; color: var(--fg3); cursor: pointer; transition: color 0.12s, transform 0.12s; user-select: none; }
        .rstar-picker span:hover, .rstar-picker span.lit { color: var(--gold); transform: scale(1.15); }
        .rsubmit-btn { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--gold); color: var(--bg); border: none; padding: 0.75rem 1.75rem; font-family: var(--font-display); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; transition: background 0.2s, transform 0.2s; }
        .rsubmit-btn:hover { background: var(--gold2); transform: translateY(-2px); }
        .rform-msg { margin-top: 0.9rem; padding: 0.65rem 1rem; font-size: 0.8rem; border-left: 2px solid var(--gold); background: var(--gold-dim); color: var(--fg2); font-family: var(--font-body); }
        .rform-msg.error { border-color: var(--red2); background: var(--red-dim); }

        /* ── CONTACT ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .map-frame { border: 1px solid var(--border); overflow: hidden; position: relative; }
        .map-frame iframe { display: block; width: 100%; height: 400px; border: 0; filter: invert(1) hue-rotate(180deg) brightness(0.85) saturate(0.6); }
        .contact-info .section-title { margin-bottom: 2.5rem; }
        .contact-row { display: flex; gap: 1.25rem; padding: 1.25rem 0; border-bottom: 1px solid var(--border); }
        .contact-icon-box { width: 2.5rem; height: 2.5rem; flex-shrink: 0; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
        .contact-icon-box svg { width: 1rem; height: 1rem; stroke: var(--gold); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .contact-row h4 { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.4rem; }
        .contact-row p, .contact-row a { font-size: 0.9rem; color: var(--fg2); line-height: 1.6; transition: color 0.2s; }
        .contact-row a:hover { color: var(--gold); }
        .social-row { display: flex; gap: 0.75rem; margin-top: 2rem; }
        .social-btn { width: 2.75rem; height: 2.75rem; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--fg3); transition: border-color 0.25s, color 0.25s, transform 0.25s; }
        .social-btn:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }
        .social-btn svg { width: 1rem; height: 1rem; fill: currentColor; }

        /* ── FOOTER ── */
        footer { background: var(--bg); border-top: 1px solid var(--border); background-image: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(212,168,83,0.03) 0%, transparent 70%); padding: 2rem; }
        .footer-inner { max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--font-display); font-size: 1rem; color: var(--fg2); }
        .footer-logo em { color: var(--gold); font-style: italic; }
        .footer-copy { font-size: 0.75rem; color: var(--fg3); letter-spacing: 0.05em; }

        /* ── PARTICLES & AMBIENT ── */
        #particles { mix-blend-mode: screen; }
        body::before { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 40% 30% at 15% 50%, rgba(212,168,83,0.04) 0%, transparent 100%), radial-gradient(ellipse 35% 25% at 85% 30%, rgba(168,50,40,0.05) 0%, transparent 100%), radial-gradient(ellipse 50% 40% at 50% 90%, rgba(212,168,83,0.03) 0%, transparent 100%); }

        /* ── REVEAL ── */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          #inicio { flex-direction: column; height: auto; }
          .hero-panel { min-height: 55vh; }
          .hero-content { padding: 2rem 1.5rem; }
          .hero-divider { display: none; }
          .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-img-accent { display: none; }
          .section { padding: 5rem 1.25rem; }
          .gallery-card { width: 240px; }
          .footer-inner { justify-content: center; text-align: center; }
          .review-form-wrap { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem; }
          .rform-row { grid-template-columns: 1fr; }
          .review-card { width: 280px; }
          .timeline { flex-direction: column; gap: 1rem; }
          .timeline-item, .timeline-item:not(:first-child) { border-right: none; padding-left: 0; padding-right: 0; }
        }
      `}</style>

      {/* PARTICLES */}
      <canvas ref={canvasRef} id="particles" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.5 }} />

      {/* NAV */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#inicio" className="nav-logo" onClick={(e) => { e.preventDefault(); navTo("inicio"); }}>
            Cafetería <span>Ébenezer</span>
          </a>
          <button className={`menu-toggle${menuOpen ? " open" : ""}`} onClick={toggleMenu} aria-label="Abrir menú">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      {/* OVERLAY FONDO */}
      <div id="menuOverlay" className={menuOpen ? "open" : ""}>
        <div className="overlay-panel" />
        <div className="overlay-panel" />
      </div>

      {/* OVERLAY CONTENIDO */}
      <div id="menuContent" className={menuOpen ? "open" : ""}>
        <ul className="overlay-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="overlay-nav-item">
              <a
                href={`#${item.href}`}
                className="overlay-nav-link"
                onClick={(e) => { e.preventDefault(); navTo(item.href); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="overlay-bottom">
          <p className="overlay-tagline"><em>Café</em> de día. <em>Pizza</em> de noche.</p>
          <div className="overlay-social">
            <a href="https://instagram.com/cafeteriaebenezer" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="inicio">
        <div className="hero-panel hero-panel-day" onClick={() => navTo("menu")}>
          <Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85" alt="Café artesanal" fill priority sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="hero-grad" />
          <div className="hero-divider" />
          <div className="hero-content">
            <span className="hero-tag">Mañanas en Ébenezer</span>
            <h1 className="hero-title">El arte del<br /><em>buen café</em></h1>
            <p className="hero-sub">Granos seleccionados, preparaciones artesanales. Cada taza cuenta una historia.</p>
            <a href="#menu" className="hero-btn hero-btn-day" onClick={(e) => { e.stopPropagation(); navTo("menu"); }}>
              Ver menú de café
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
        <div className="hero-panel hero-panel-night hero-night" onClick={() => navTo("menu")}>
          <Image src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85" alt="Pizza artesanal" fill priority sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="hero-grad" />
          <div className="hero-content">
            <span className="hero-tag">Noches en Ébenezer</span>
            <h2 className="hero-title">La noche<br /><em>pide pizza</em></h2>
            <p className="hero-sub">Ingredientes frescos, horno de piedra. Pizzas artesanales que hablan por sí solas.</p>
            <a href="#menu" className="hero-btn hero-btn-night" onClick={(e) => { e.stopPropagation(); navTo("menu"); }}>
              Ver menú de pizza
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="section section-dark">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-wrap reveal">
              <div className="about-img-frame">
                <Image src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85" alt="Interior Cafetería Ébenezer" fill sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="about-img-accent" />
            </div>
            <div className="about-text">
              <div className="eyebrow reveal">Nuestra historia</div>
              <h2 className="section-title reveal reveal-delay-1">De la mañana a la noche,<br /><em>una misma pasión</em></h2>
              <p className="reveal reveal-delay-2">En Cafetería Ébenezer creemos que los mejores momentos del día merecen ser acompañados con lo mejor. Por las mañanas, nuestro café de especialidad despierta los sentidos con aromas que llenan el espacio.</p>
              <p className="reveal reveal-delay-2">Al caer la tarde, el horno cobra vida y nuestras pizzas artesanales se convierten en el centro de la mesa. Dos experiencias, un solo lugar donde la calidad es la constante.</p>
              <div className="timeline reveal reveal-delay-3">
                <div className="timeline-item"><span className="t-time">08:00</span><span className="t-label">Apertura Cafetería</span></div>
                <div className="timeline-item"><span className="t-time">16:00</span><span className="t-label">Apertura Pizzería</span></div>
                <div className="timeline-item"><span className="t-time">23:00</span><span className="t-label">Cierre</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENÚ */}
      <section id="menu" className="section section-surface">
        <div className="container">
          <div className="menu-header">
            <div className="eyebrow reveal" style={{ justifyContent: "center" }}>Nuestro menú</div>
            <h2 className="section-title reveal reveal-delay-1">Elige tu <em>experiencia</em></h2>
          </div>
          <div className="menu-tabs-wrap reveal reveal-delay-2">
            <div className="menu-tabs">
              <button className={`menu-tab${activeTab === "cafe" ? " active" : ""}`} onClick={() => setActiveTab("cafe")}>Cafetería</button>
              <button className={`menu-tab${activeTab === "pizza" ? " active" : ""}`} onClick={() => setActiveTab("pizza")}>Pizzería</button>
            </div>
          </div>
          <div className="menu-content">
            {activeTab === "cafe" ? (
              <>
                <div className="menu-cat"><h3 className="menu-section-title">Bebidas Calientes</h3>
                  <div className="menu-item"><div><div className="item-name">Espresso</div><div className="item-desc">Intenso y concentrado, doble shot</div></div><span className="item-price">$3.50</span></div>
                  <div className="menu-item"><div><div className="item-name">Cappuccino</div><div className="item-desc">Espresso con leche espumada y cacao</div></div><span className="item-price">$4.50</span></div>
                  <div className="menu-item"><div><div className="item-name">Latte</div><div className="item-desc">Espresso suave con leche cremosa</div></div><span className="item-price">$4.50</span></div>
                  <div className="menu-item"><div><div className="item-name">Mocha</div><div className="item-desc">Espresso con chocolate y crema batida</div></div><span className="item-price">$5.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Té Chai</div><div className="item-desc">Té negro con especias y leche</div></div><span className="item-price">$4.00</span></div>
                </div>
                <div className="menu-cat"><h3 className="menu-section-title">Bebidas Frías</h3>
                  <div className="menu-item"><div><div className="item-name">Cold Brew</div><div className="item-desc">Café infusionado en frío 12 horas</div></div><span className="item-price">$5.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Frappé de Café</div><div className="item-desc">Café helado cremoso y dulce</div></div><span className="item-price">$5.50</span></div>
                  <div className="menu-item"><div><div className="item-name">Limonada Natural</div><div className="item-desc">Limón fresco con hierbabuena</div></div><span className="item-price">$3.50</span></div>
                </div>
                <div className="menu-cat"><h3 className="menu-section-title">Repostería</h3>
                  <div className="menu-item"><div><div className="item-name">Croissant de Mantequilla</div><div className="item-desc">Horneado fresco cada mañana</div></div><span className="item-price">$3.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Cheesecake</div><div className="item-desc">New York style con frutos rojos</div></div><span className="item-price">$5.50</span></div>
                  <div className="menu-item"><div><div className="item-name">Brownie</div><div className="item-desc">Chocolate belga con nueces</div></div><span className="item-price">$4.00</span></div>
                </div>
              </>
            ) : (
              <>
                <div className="menu-cat"><h3 className="menu-section-title">Pizzas Clásicas</h3>
                  <div className="menu-item"><div><div className="item-name">Margherita</div><div className="item-desc">Salsa de tomate, mozzarella fresca y albahaca</div></div><span className="item-price">$10.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Pepperoni</div><div className="item-desc">Pepperoni artesanal con mozzarella fundida</div></div><span className="item-price">$12.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Hawaiana</div><div className="item-desc">Jamón, piña caramelizada y queso</div></div><span className="item-price">$12.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Cuatro Quesos</div><div className="item-desc">Mozzarella, gorgonzola, parmesano y fontina</div></div><span className="item-price">$13.00</span></div>
                </div>
                <div className="menu-cat"><h3 className="menu-section-title">Pizzas Especiales</h3>
                  <div className="menu-item"><div><div className="item-name">Ébenezer Suprema</div><div className="item-desc">Carne, chorizo, pimiento, cebolla y aceitunas</div></div><span className="item-price">$15.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Mediterránea</div><div className="item-desc">Tomate cherry, rúcula, jamón serrano y parmesano</div></div><span className="item-price">$14.00</span></div>
                  <div className="menu-item"><div><div className="item-name">BBQ Chicken</div><div className="item-desc">Pollo, salsa BBQ, cebolla morada y cilantro</div></div><span className="item-price">$14.00</span></div>
                </div>
                <div className="menu-cat"><h3 className="menu-section-title">Acompañantes</h3>
                  <div className="menu-item"><div><div className="item-name">Alitas BBQ</div><div className="item-desc">8 piezas con salsa casera</div></div><span className="item-price">$8.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Breadsticks con Queso</div><div className="item-desc">Pan artesanal con dip de queso</div></div><span className="item-price">$5.00</span></div>
                  <div className="menu-item"><div><div className="item-name">Ensalada Caesar</div><div className="item-desc">Lechuga, crutones, parmesano y aderezo</div></div><span className="item-price">$6.00</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="section section-dark">
        <div className="container"><div className="gallery-header">
          <div className="eyebrow reveal">La experiencia</div>
          <h2 className="section-title reveal reveal-delay-1">Momentos que nos <em>definen</em></h2>
        </div></div>
        <div className="gallery-track-wrap">
          <div className="gallery-track" ref={galleryTrackRef}>
            {[
              { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", alt: "Latte art", label: "Café de especialidad" },
              { src: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&q=80", alt: "Croissant", label: "Repostería artesanal" },
              { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80", alt: "Espresso", label: "Espresso perfecto" },
              { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", alt: "Pizza", label: "Pizza margherita" },
              { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", alt: "Pizza artesanal", label: "Horno de piedra" },
              { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80", alt: "Ambiente", label: "Nuestro ambiente" },
            ].map((img) => (
              <div key={img.alt} className="gallery-card">
                <Image src={img.src} alt={img.alt} width={600} height={800} sizes="(max-width: 768px) 240px, 280px" />
                <div className="gallery-card-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-nav">
          <button onClick={() => scrollGallery(-1)} aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg></button>
          <button onClick={() => scrollGallery(1)} aria-label="Siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
        </div>
      </section>

      {/* RESEÑAS */}
      <section id="resenas" className="section section-surface">
        <div className="container">
          <div className="eyebrow reveal">Nuestra comunidad</div>
          <h2 className="section-title reveal reveal-delay-1">Lo que dicen <em>nuestros clientes</em></h2>
        </div>
        <div className="reviews-stage">
          <div className="reviews-track">
            {duplicatedReviews.map((review, i) => (
              <div className="review-card" key={`${review.name}-${i}`}>
                <div className="review-quote">&#8220;</div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <div className="review-avatar" style={Object.fromEntries(review.avatarStyle.split(";").filter(Boolean).map((c) => { const [k, v] = c.split(":"); return [k.trim().replace(/-([a-z])/g, (_, x) => x.toUpperCase()), v.trim()]; }))}>
                    {review.name.charAt(0)}
                  </div>
                  <div><div className="review-name">{review.name}</div><div className="review-stars">{starsText(review.stars)}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-pause-hint">Pasa el cursor para pausar</div>
        </div>
        <div className="container">
          <div className="review-form-wrap reveal">
            <div>
              <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>Comparte tu experiencia</div>
              <h3 className="review-form-title">Deja tu <em>reseña</em></h3>
            </div>
            <div>
              <div className="rform-row">
                <div className="rform-group"><label>Tu nombre</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Juan López" /></div>
                <div className="rform-group"><label>Calificación</label>
                  <div className="rstar-picker">
                    {[1,2,3,4,5].map((v) => <span key={v} className={v <= rating ? "lit" : ""} onClick={() => setRating(v)}>★</span>)}
                  </div>
                </div>
              </div>
              <div className="rform-group"><label>Tu reseña</label><textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="¿Qué fue lo que más te gustó de Ébenezer?" /></div>
              <button className="rsubmit-btn" onClick={submitReview}>
                Publicar reseña
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
              {message && <div className={`rform-msg${messageError ? " error" : ""}`}>{message}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section section-surface">
        <div className="container">
          <div className="contact-grid">
            <div className="map-frame reveal">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1ses!2sus!4v1234567890" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Cafetería Ébenezer" />
            </div>
            <div className="contact-info">
              <div className="eyebrow reveal">Visítanos</div>
              <h2 className="section-title reveal reveal-delay-1">Te <em>esperamos</em></h2>
              <div className="contact-row reveal reveal-delay-2">
                <div className="contact-icon-box"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
                <div><h4>Dirección</h4><p>Calle Principal #123, Centro</p></div>
              </div>
              <div className="contact-row reveal reveal-delay-2">
                <div className="contact-icon-box"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
                <div><h4>Horarios</h4><p>Cafetería: 08:00 – 16:00<br />Pizzería: 16:00 – 23:00</p></div>
              </div>
              <div className="contact-row reveal reveal-delay-3">
                <div className="contact-icon-box"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
                <div><h4>Teléfono</h4><a href="tel:+1234567890">+1 (234) 567-890</a></div>
              </div>
              <div className="social-row reveal reveal-delay-3">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">
                  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href="https://instagram.com/cafeteriaebenezer" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <p className="footer-logo">Cafetería <em>Ébenezer</em></p>
          <p className="footer-copy">© 2025 · Café de día. Pizza de noche.</p>
        </div>
      </footer>
    </>
  );
}
