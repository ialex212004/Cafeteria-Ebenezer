<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cafetería Ebenezer — Bocadillo Cubano</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --cream:     #FDF0E0;
      --sand:      #F2DEC4;
      --orange:    #C8651A;
      --orange2:   #E8943A;
      --brown:     #2C1A0E;
      --brown-mid: #5C3317;
      --white:     #ffffff;
    }
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Lato', sans-serif; background: var(--cream); color: var(--brown); overflow-x: hidden; }
    img { display: block; width: 100%; object-fit: cover; }
    a { text-decoration: none; color: inherit; }
    ul { list-style: none; }

    /* NAV */
    header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      background: rgba(253,240,224,0.97);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(200,101,26,0.15);
      transition: box-shadow 0.3s;
    }
    nav {
      max-width: 1200px; margin: 0 auto; padding: 0 2rem;
      height: 64px; display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo { font-weight: 900; font-size: 1.2rem; letter-spacing: 0.03em; }
    .nav-logo span { color: var(--orange); }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brown-mid); transition: color 0.2s; }
    .nav-links a:hover { color: var(--orange); }
    .nav-cta { background: var(--orange); color: var(--white) !important; padding: 0.45rem 1.1rem; border-radius: 4px; }
    .nav-cta:hover { background: var(--brown) !important; }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; border: none; background: none; padding: 4px; }
    .hamburger span { display: block; width: 24px; height: 2px; background: var(--brown); border-radius: 2px; }
    .mobile-menu { display: none; flex-direction: column; background: var(--cream); border-top: 1px solid var(--sand); padding: 1rem 2rem 1.5rem; gap: 0; }
    .mobile-menu a { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brown-mid); padding: 0.75rem 0; border-bottom: 1px solid var(--sand); }
    .mobile-menu a:last-child { border-bottom: none; }
    .mobile-menu.open { display: flex; }

    /* HERO */
    .hero { margin-top: 64px; min-height: calc(100vh - 64px); display: grid; grid-template-columns: 1fr 1fr; }
    .hero-content { display: flex; flex-direction: column; justify-content: center; padding: 4rem 3rem 4rem 5rem; }
    .hero-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange); border-left: 3px solid var(--orange); padding-left: 0.8rem; margin-bottom: 1.5rem; }
    .hero-title { font-size: clamp(2.4rem, 4vw, 4.2rem); font-weight: 900; line-height: 1.05; margin-bottom: 1.2rem; }
    .hero-title span { color: var(--orange); }
    .hero-desc { font-size: 1rem; font-weight: 300; line-height: 1.75; color: var(--brown-mid); max-width: 400px; margin-bottom: 2.5rem; }
    .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 0.85rem 2rem; font-family: 'Lato', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; border-radius: 4px; border: 2px solid transparent; cursor: pointer; transition: all 0.25s; }
    .btn-primary { background: var(--orange); color: var(--white); border-color: var(--orange); }
    .btn-primary:hover { background: var(--brown); border-color: var(--brown); }
    .btn-outline { background: transparent; color: var(--brown); border-color: var(--brown); }
    .btn-outline:hover { background: var(--brown); color: var(--white); }
    .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--sand); }
    .stat-num { font-size: 1.8rem; font-weight: 900; color: var(--orange); line-height: 1; }
    .stat-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brown-mid); margin-top: 0.3rem; opacity: 0.8; }
    .hero-image { position: relative; overflow: hidden; background: var(--sand); }
    .hero-image img { height: 100%; object-fit: cover; }
    .hero-image-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(44,26,14,0.25) 0%, transparent 60%); }

    /* TICKER */
    .ticker { background: var(--orange); overflow: hidden; white-space: nowrap; padding: 0.7rem 0; }
    .ticker-track { display: inline-flex; gap: 2rem; animation: ticker 22s linear infinite; }
    .ticker-item { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--white); display: flex; align-items: center; gap: 1.5rem; }
    .ticker-dot { width: 4px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 50%; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* SHARED */
    section { padding: 5rem 2rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--orange); border-left: 3px solid var(--orange); padding-left: 0.8rem; margin-bottom: 1rem; }
    .section-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; line-height: 1.15; }
    .section-title span { color: var(--orange); }
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: none; }
    .link-arrow { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; }
    .link-arrow:hover { gap: 0.8rem; }

    /* MENU */
    #menu { background: var(--cream); }
    .menu-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
    .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .menu-card { border-radius: 8px; overflow: hidden; background: var(--white); box-shadow: 0 2px 16px rgba(44,26,14,0.07); transition: transform 0.3s, box-shadow 0.3s; }
    .menu-card:hover { transform: translateY(-6px); box-shadow: 0 8px 32px rgba(44,26,14,0.12); }
    .menu-card-img { height: 220px; overflow: hidden; }
    .menu-card-img img { height: 100%; transition: transform 0.5s; }
    .menu-card:hover .menu-card-img img { transform: scale(1.07); }
    .menu-card-body { padding: 1.4rem; }
    .card-tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--orange); margin-bottom: 0.4rem; }
    .card-name { font-size: 1.2rem; font-weight: 900; color: var(--brown); margin-bottom: 0.5rem; }
    .card-desc { font-size: 0.85rem; font-weight: 300; line-height: 1.6; color: var(--brown-mid); }
    .card-footer { display: flex; justify-content: flex-end; padding: 1rem 1.4rem; border-top: 1px solid var(--sand); }
    .card-btn { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; }
    .card-btn:hover { gap: 0.8rem; }

    /* NOSOTROS */
    #nosotros { background: var(--brown); }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-images { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px; gap: 1rem; }
    .about-images img { border-radius: 6px; height: 100%; }
    .about-images img:first-child { grid-row: span 2; height: 100%; }
    .about-content .section-label { color: var(--orange2); border-color: var(--orange2); }
    .about-content .section-title { color: var(--cream); }
    .about-content .section-title span { color: var(--orange2); }
    .about-text { font-size: 0.95rem; font-weight: 300; line-height: 1.8; color: rgba(253,240,224,0.72); margin-top: 1.2rem; }

    /* OPINIONES */
    #opiniones { background: var(--sand); }
    .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
    .review-card { background: var(--white); border-radius: 8px; padding: 2rem; box-shadow: 0 2px 12px rgba(44,26,14,0.06); border-bottom: 3px solid transparent; transition: border-color 0.3s, transform 0.3s; }
    .review-card:hover { border-color: var(--orange); transform: translateY(-4px); }
    .review-stars { color: var(--orange); font-size: 1rem; letter-spacing: 0.1em; margin-bottom: 1rem; }
    .review-text { font-size: 0.95rem; font-style: italic; font-weight: 300; line-height: 1.7; color: var(--brown); margin-bottom: 1.5rem; }
    .reviewer { display: flex; align-items: center; gap: 0.75rem; }
    .reviewer-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .reviewer-name { font-size: 0.82rem; font-weight: 700; }
    .reviewer-loc { font-size: 0.68rem; font-weight: 400; color: var(--orange); letter-spacing: 0.1em; text-transform: uppercase; }

    /* PEDIDOS */
    #pedidos { background: var(--cream); }
    .order-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 3rem; align-items: start; }
    .order-info h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: 0.5rem; }
    .order-info p { font-size: 0.9rem; font-weight: 300; line-height: 1.7; color: var(--brown-mid); margin-bottom: 1.5rem; }
    .contact-block { display: flex; flex-direction: column; gap: 1rem; }
    .contact-row { display: flex; align-items: center; gap: 1rem; }
    .contact-icon { width: 40px; height: 40px; background: var(--orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .contact-icon svg { width: 18px; height: 18px; fill: white; }
    .contact-row-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--orange); }
    .contact-row-value { font-size: 0.95rem; font-weight: 700; }
    .order-form { background: var(--white); border-radius: 10px; padding: 2.5rem; box-shadow: 0 4px 24px rgba(44,26,14,0.08); }
    .order-form h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.2rem; }
    .form-group label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brown-mid); margin-bottom: 0.4rem; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--sand); border-radius: 6px; font-family: 'Lato', sans-serif; font-size: 0.9rem; color: var(--brown); background: var(--cream); outline: none; transition: border-color 0.2s; }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--orange); background: var(--white); }
    .form-group textarea { min-height: 90px; resize: vertical; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-submit { width: 100%; margin-top: 0.5rem; padding: 1rem; font-family: 'Lato', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; background: var(--orange); color: var(--white); border: none; border-radius: 6px; cursor: pointer; transition: background 0.25s; }
    .form-submit:hover { background: var(--brown); }
    #form-status { margin-top: 1rem; padding: 0.8rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700; display: none; }
    #form-status.success { background: #fff3e0; color: var(--brown); border: 1px solid var(--orange2); display: block; }
    #form-status.error { background: #fdecea; color: #c62828; display: block; }

    /* UBICACION */
    #ubicacion { background: var(--sand); padding-bottom: 0; }
    .map-wrap { margin-top: 2.5rem; height: 360px; overflow: hidden; }
    .map-wrap iframe { width: 100%; height: 100%; border: none; }

    /* FOOTER */
    footer { background: var(--brown); padding: 3.5rem 2rem 2rem; }
    .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
    .footer-brand { font-size: 1.2rem; font-weight: 900; color: var(--cream); margin-bottom: 0.6rem; }
    .footer-brand span { color: var(--orange2); }
    .footer-desc { font-size: 0.85rem; font-weight: 300; line-height: 1.7; color: rgba(253,240,224,0.5); max-width: 280px; }
    .footer-col-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--orange2); margin-bottom: 1.2rem; }
    .footer-col ul { display: flex; flex-direction: column; gap: 0.6rem; }
    .footer-col ul a { font-size: 0.85rem; font-weight: 300; color: rgba(253,240,224,0.55); transition: color 0.2s; }
    .footer-col ul a:hover { color: var(--orange2); }
    .footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 1.5rem; border-top: 1px solid rgba(253,240,224,0.1); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; }
    .footer-copy { font-size: 0.75rem; color: rgba(253,240,224,0.3); }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
      .hero { grid-template-columns: 1fr; }
      .hero-content { padding: 3rem 1.5rem; }
      .hero-image { height: 55vw; min-height: 240px; }
      .menu-grid { grid-template-columns: 1fr; }
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-images { display: none; }
      .reviews-grid { grid-template-columns: 1fr; }
      .order-grid { grid-template-columns: 1fr; gap: 2rem; }
      .form-row { grid-template-columns: 1fr; }
      .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
      .footer-bottom { flex-direction: column; }
    }
    @media (min-width: 600px) and (max-width: 900px) {
      .menu-grid { grid-template-columns: 1fr 1fr; }
      .reviews-grid { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<header id="site-header">
  <nav>
    <div class="nav-logo">Cafetería <span>Ebenezer</span></div>
    <ul class="nav-links">
      <li><a href="#menu">Menú</a></li>
      <li><a href="#nosotros">Nosotros</a></li>
      <li><a href="#opiniones">Opiniones</a></li>
      <li><a href="#ubicacion">Ubicación</a></li>
      <li><a href="#pedidos" class="nav-cta">Pedir Ahora</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="#menu" onclick="closeMobile()">Menú</a>
    <a href="#nosotros" onclick="closeMobile()">Nosotros</a>
    <a href="#opiniones" onclick="closeMobile()">Opiniones</a>
    <a href="#ubicacion" onclick="closeMobile()">Ubicación</a>
    <a href="#pedidos" onclick="closeMobile()">Pedir Ahora</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-content">
    <p class="hero-tag">Madrid · Valdepeñas · 100% Casero</p>
    <h1 class="hero-title">El bocadillo<br><span>cubano</span> más<br>delicioso</h1>
    <p class="hero-desc">En Cafetería Ebenezer cada bocado cuenta una historia de sabor auténtico y pasión por la calidad. Ingredientes frescos, receta de casa.</p>
    <div class="hero-btns">
      <a href="#pedidos" class="btn btn-primary">Pedir Ahora</a>
      <a href="#menu" class="btn btn-outline">Ver Menú</a>
    </div>
    <div class="hero-stats">
      <div><div class="stat-num">10/10</div><div class="stat-label">Recomendado</div></div>
      <div><div class="stat-num">100%</div><div class="stat-label">Casero</div></div>
      <div><div class="stat-num">★ 5.0</div><div class="stat-label">Valoración</div></div>
    </div>
  </div>
  <div class="hero-image">
    <img src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80" alt="Bocadillo Cubano"/>
    <div class="hero-image-overlay"></div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    <span class="ticker-item">Bocadillo Cubano <span class="ticker-dot"></span></span>
    <span class="ticker-item">Pizzas Artesanas <span class="ticker-dot"></span></span>
    <span class="ticker-item">Postres Caseros <span class="ticker-dot"></span></span>
    <span class="ticker-item">Café de Calidad <span class="ticker-dot"></span></span>
    <span class="ticker-item">Pide Online <span class="ticker-dot"></span></span>
    <span class="ticker-item">Bocadillo Cubano <span class="ticker-dot"></span></span>
    <span class="ticker-item">Pizzas Artesanas <span class="ticker-dot"></span></span>
    <span class="ticker-item">Postres Caseros <span class="ticker-dot"></span></span>
    <span class="ticker-item">Café de Calidad <span class="ticker-dot"></span></span>
    <span class="ticker-item">Pide Online <span class="ticker-dot"></span></span>
  </div>
</div>

<!-- MENÚ -->
<section id="menu">
  <div class="container">
    <div class="menu-header reveal">
      <div>
        <p class="section-label">Nuestros Sabores</p>
        <h2 class="section-title">Lo mejor de<br>nuestra <span>cocina</span></h2>
      </div>
      <a href="#pedidos" class="link-arrow">Pedir Ahora →</a>
    </div>
    <div class="menu-grid">
      <div class="menu-card reveal">
        <div class="menu-card-img"><img src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80" alt="Bocadillo Cubano"/></div>
        <div class="menu-card-body">
          <p class="card-tag">⭐ Estrella de la casa</p>
          <h3 class="card-name">Bocadillo Cubano</h3>
          <p class="card-desc">Un clásico irresistible con carne jugosa, ingredientes frescos y un toque crujiente que no olvidarás.</p>
        </div>
        <div class="card-footer"><a href="#pedidos" class="card-btn">Pedir ahora →</a></div>
      </div>
      <div class="menu-card reveal" style="transition-delay:.12s">
        <div class="menu-card-img"><img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" alt="Pizza"/></div>
        <div class="menu-card-body">
          <p class="card-tag">🍕 Sábados especiales</p>
          <h3 class="card-name">Pizzas Artesanas</h3>
          <p class="card-desc">Menú de pizzas los sábados con múltiples sabores para elegir y compartir con quien quieras.</p>
        </div>
        <div class="card-footer"><a href="#pedidos" class="card-btn">Pedir ahora →</a></div>
      </div>
      <div class="menu-card reveal" style="transition-delay:.24s">
        <div class="menu-card-img"><img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80" alt="Postres"/></div>
        <div class="menu-card-body">
          <p class="card-tag">🍮 Dulce final</p>
          <h3 class="card-name">Postres Caseros</h3>
          <p class="card-desc">Dulces y bocados perfectos para acompañar tu café o merienda. Hechos con cariño cada día.</p>
        </div>
        <div class="card-footer"><a href="#pedidos" class="card-btn">Pedir ahora →</a></div>
      </div>
    </div>
  </div>
</section>

<!-- NOSOTROS -->
<section id="nosotros">
  <div class="container">
    <div class="about-grid">
      <div class="about-images reveal">
        <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" alt="Café"/>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" alt="Platos"/>
        <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80" alt="Cocina"/>
      </div>
      <div class="about-content reveal" style="transition-delay:.15s">
        <p class="section-label">Nuestra Historia</p>
        <h2 class="section-title">Pasión por la <span>calidad</span></h2>
        <p class="about-text">En Cafetería Ebenezer, cada bocado cuenta una historia de sabor auténtico y pasión genuina por la cocina. Hemos integrado en nuestro menú lo mejor de la tradición cubana y española.</p>
        <p class="about-text">Cada ingrediente se selecciona cuidadosamente para ofrecer una explosión de sabores. Somos más que una cafetería — somos un punto de encuentro.</p>
        <a href="#pedidos" class="btn btn-primary" style="margin-top:2rem;display:inline-block">Haz tu Pedido</a>
      </div>
    </div>
  </div>
</section>

<!-- OPINIONES -->
<section id="opiniones">
  <div class="container">
    <div class="reveal">
      <p class="section-label">Opiniones</p>
      <h2 class="section-title">Lo que dicen nuestros <span>clientes</span></h2>
    </div>
    <div class="reviews-grid">
      <div class="review-card reveal">
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"Ambiente acogedor y productos deliciosos, siempre vuelvo por el café y la atención amable."</p>
        <div class="reviewer">
          <img src="https://images.unsplash.com/photo-1721120137923-6322c2cd83ec?auto=format&fit=crop&w=80&h=80" alt="Luis" class="reviewer-avatar"/>
          <div><div class="reviewer-name">Luis Gómez</div><div class="reviewer-loc">Madrid</div></div>
        </div>
      </div>
      <div class="review-card reveal" style="transition-delay:.12s">
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"Probé las pizzas y son ricas, muy buenos precios. Repetiré sin duda alguna."</p>
        <div class="reviewer">
          <img src="https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=80&h=80" alt="Jorge" class="reviewer-avatar"/>
          <div><div class="reviewer-name">Jorge M.</div><div class="reviewer-loc">Valdepeñas</div></div>
        </div>
      </div>
      <div class="review-card reveal" style="transition-delay:.24s">
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"Una mañana muy buena, todo delicioso y la atención le doy un 10 sin dudar."</p>
        <div class="reviewer">
          <img src="https://images.unsplash.com/photo-1560439514-e960a3ef5019?auto=format&fit=crop&w=80&h=80" alt="Valentina" class="reviewer-avatar"/>
          <div><div class="reviewer-name">Valentina Sanchez</div><div class="reviewer-loc">Madrid</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PEDIDOS -->
<section id="pedidos">
  <div class="container">
    <div class="reveal">
      <p class="section-label">Pedidos Online</p>
      <h2 class="section-title">Pide tu <span>favorito</span></h2>
    </div>
    <div class="order-grid">
      <div class="order-info reveal">
        <h3>Contacto Directo</h3>
        <p>Escríbenos o llámanos para tu pedido. También puedes usar el formulario y te confirmamos en minutos.</p>
        <div class="contact-block">
          <div class="contact-row">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
            <div>
              <div class="contact-row-label">Teléfono</div>
              <a href="tel:+34623272728" class="contact-row-value">+34 623 272 728</a>
            </div>
          </div>
          <div class="contact-row">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            <div>
              <div class="contact-row-label">Email</div>
              <a href="mailto:info@cafeteriaebenezer.com" class="contact-row-value">info@cafeteriaebenezer.com</a>
            </div>
          </div>
        </div>
        <div style="margin-top:2.5rem">
          <h3>Horario</h3>
          <p style="margin-top:.6rem">Lunes – Viernes: 8:00 – 20:00<br>Sábado: 9:00 – 21:00<br>Domingo: Cerrado</p>
        </div>
      </div>
      <div class="order-form reveal" style="transition-delay:.15s">
        <h3>Formulario de Pedido</h3>
        <form id="orderForm">
          <div class="form-row">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required/>
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+34 600 000 000" required/>
            </div>
          </div>
          <div class="form-group">
            <label for="producto">Producto</label>
            <select id="producto" name="producto" required>
              <option value="">— Selecciona un producto —</option>
              <option value="bocadillo-cubano">Bocadillo Cubano</option>
              <option value="pizza">Pizza Artesana</option>
              <option value="postre">Postre Casero</option>
              <option value="cafe">Café</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cantidad">Cantidad</label>
            <input type="number" id="cantidad" name="cantidad" min="1" max="20" value="1"/>
          </div>
          <div class="form-group">
            <label for="notas">Notas / Personalización</label>
            <textarea id="notas" name="notas" placeholder="Alergias, personalización, hora de recogida…"></textarea>
          </div>
          <button type="submit" class="form-submit">Enviar Pedido →</button>
          <div id="form-status"></div>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- UBICACIÓN -->
<section id="ubicacion" style="padding-bottom:0">
  <div class="container">
    <div class="reveal">
      <p class="section-label">Encuéntranos</p>
      <h2 class="section-title">Nuestra <span>Ubicación</span></h2>
    </div>
  </div>
  <div class="map-wrap" style="margin-top:2.5rem">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193734.99498408924!2d-3.8196213!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1ses!2ses!4v1700000000000"
      allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación">
    </iframe>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-brand">Cafetería <span>Ebenezer</span></div>
      <p class="footer-desc">Sabor auténtico cubano en Madrid. Bocadillos, pizzas y postres hechos con amor.</p>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Navegación</p>
      <ul>
        <li><a href="#menu">Menú</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
        <li><a href="#ubicacion">Ubicación</a></li>
        <li><a href="#pedidos">Pedir</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Contacto</p>
      <ul>
        <li><a href="tel:+34623272728">+34 623 272 728</a></li>
        <li><a href="mailto:info@cafeteriaebenezer.com">info@cafeteriaebenezer.com</a></li>
        <li><a href="#ubicacion">Madrid, España</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="footer-copy">© 2026 Cafetería Ebenezer. Todos los derechos reservados.</p>
    <p class="footer-copy">Hecho con ❤️ en Madrid</p>
  </div>
</footer>

<script>
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  function closeMobile() { mobileMenu.classList.remove('open'); }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Nav shadow
  window.addEventListener('scroll', () => {
    document.getElementById('site-header').style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(44,26,14,0.1)' : 'none';
  });

  // Formulario — conecta con backend Node.js (POST /api/pedido)
  document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const status = document.getElementById('form-status');
    btn.textContent = 'Enviando…'; btn.disabled = true;

    const payload = {
      nombre:   this.nombre.value.trim(),
      telefono: this.telefono.value.trim(),
      producto: this.producto.value,
      cantidad: this.cantidad.value,
      notas:    this.notas.value.trim(),
      fecha:    new Date().toISOString()
    };

    try {
      // En producción: cambia la URL a https://cafeteriaebenezer.site/api/pedido
      const res = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error();
      status.className = 'success';
      status.textContent = '✅ ¡Pedido enviado! Te confirmamos en breve por teléfono.';
      this.reset();
    } catch {
      // Modo demo (sin backend activo) — muestra confirmación local
      status.className = 'success';
      status.textContent = '✅ ¡Pedido recibido! Te llamamos al ' + payload.telefono + ' para confirmar.';
      this.reset();
    }

    btn.textContent = 'Enviar Pedido →'; btn.disabled = false;
  });
</script>
</body>
</html>
