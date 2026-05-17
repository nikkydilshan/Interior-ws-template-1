// ─── HOME PAGE ────────────────────────────────────────────
function renderHome() {
  const slides = [
    { label:'01 CEILING UNIT', title:'STUNNING\nOVERHEADS', sub:'Architectural POP and stretch ceilings engineered for impact.', cta:'EXPLORE V1', link:'/ceilings', bg:'assets/images/hero-living.jpg' },
    { label:'02 STORAGE SYS', title:'MODULAR\nWISHES', sub:'Custom cupboards and wardrobes designed for extreme efficiency.', cta:'VIEW STORAGE', link:'/cupboards', bg:'assets/images/hero-bedroom.jpg' },
    { label:'03 ART MODULE', title:'VISUAL\nASSETS', sub:'Premium paintings and wall murals that redefine spatial boundaries.', cta:'CATALOGUE A1', link:'/paintings', bg:'assets/images/hero-dining.jpg' },
  ];
  const newArrivals = PRODUCTS.filter(p => p.badge === 'New' || p.badge === 'Trending').slice(0, 8);
  const bestsellers = PRODUCTS.filter(p => p.badge === 'Bestseller').slice(0, 4);

  return `
  <section class="hero">
    ${slides.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="hero-slide__content">
        <div class="hero-slide__label mono">${s.label} // STATUS: READY</div>
        <h1 class="hero-slide__title display-giant">${s.title}</h1>
        <p class="hero-slide__sub mono">${s.sub}</p>
        <div class="hero-slide__cta">
          <button class="btn btn-accent" onclick="navigate('${s.link}')">${s.cta}</button>
          <button class="btn" style="margin-left:1rem" onclick="navigate('/about')">MANIFESTO</button>
        </div>
      </div>
      <div class="hero-slide__bg-wrap">
        <img src="${s.bg}" class="hero-slide__bg" alt="Hero Background">
      </div>
    </div>`).join('')}
    <div class="hero-controls">
      ${slides.map((_, i) => `<div class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`).join('')}
    </div>
  </section>

  <div class="category-strip">
    <div class="container">
      <div class="category-strip-inner">
        <div class="cat-pill" onclick="navigate('/ceilings')"><span class="cat-pill__icon">🏛</span> CEILINGS</div>
        <div class="cat-pill" onclick="navigate('/cupboards')"><span class="cat-pill__icon">🚪</span> CUPBOARDS</div>
        <div class="cat-pill" onclick="navigate('/paintings')"><span class="cat-pill__icon">🎨</span> ART</div>
        <div class="cat-pill" onclick="navigate('/lighting')"><span class="cat-pill__icon">💡</span> LIGHTING</div>
      </div>
    </div>
  </div>

  <section class="section" style="background:var(--accent-2)">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4rem;flex-wrap:wrap;gap:1rem">
        <h2 class="display display-lg">THE COLLECTION</h2>
        <div class="mono" style="text-align:right">FILTERED BY: CATEGORY<br>DATE: 2025 05 15</div>
      </div>
      <div class="collections-grid">
        <div class="collection-card" onclick="navigate('/ceilings')">
          <div class="collection-card__icon">🏛</div>
          <h3 class="display-md">CEILINGS</h3>
          <div class="mono">COUNT: 08 UNITS</div>
        </div>
        <div class="collection-card" onclick="navigate('/cupboards')">
          <div class="collection-card__icon">🚪</div>
          <h3 class="display-md">STORAGE</h3>
          <div class="mono">COUNT: 12 UNITS</div>
        </div>
        <div class="collection-card" onclick="navigate('/paintings')">
          <div class="collection-card__icon">🎨</div>
          <h3 class="display-md">ART WORK</h3>
          <div class="mono">COUNT: 15 UNITS</div>
        </div>
        <div class="collection-card" onclick="navigate('/lighting')">
          <div class="collection-card__icon">💡</div>
          <h3 class="display-md">LIGHTING</h3>
          <div class="mono">COUNT: 10 UNITS</div>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-bar">
    <div class="container">
      <div class="stats-inner">
        <div class="stat-item"><div class="stat-number">2013</div><div class="stat-label">ORIGIN POINT</div></div>
        <div class="stat-item"><div class="stat-number">5K+</div><div class="stat-label">SPACE OPS COMPLETE</div></div>
        <div class="stat-item"><div class="stat-number">50+</div><div class="stat-label">CRAFTS ENGINEERS</div></div>
        <div class="stat-item"><div class="stat-number">24H</div><div class="stat-label">RESPONSE LATENCY</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <div class="mono" style="color:var(--accent)">// JUST IN</div>
        <h2 class="display display-lg">TRENDING NOW</h2>
      </div>
      <div class="h-scroll" style="display:flex;gap:var(--s-4);overflow-x:auto;padding-bottom:2rem;scrollbar-width:none">
        ${newArrivals.map(p => `<div style="min-width:300px">${buildProductCard(p)}</div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--surface)">
    <div class="container">
      <div class="brand-story">
        <div class="brand-story__image">
          <div style="overflow:hidden;"><img src="assets/images/classic_pop_ceiling.png" alt="Interior Planet Lab" style="width:100%;height:100%;object-fit:cover;display:block;"></div>
        </div>
        <div>
          <button class="btn btn-accent" onclick="navigate('/about')">READ OUR HISTORY</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <div class="mono" style="color:var(--accent)">// MOST LOVED</div>
        <h2 class="display display-lg">BESTSELLERS</h2>
      </div>
      <div class="grid-4">
        ${bestsellers.map(p => buildProductCard(p)).join('')}
      </div>
    </div>
  </section>`;
}

// Carousel Logic
let currentSlide = 0;
function goToSlide(i) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = i;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
function startCarousel() {
  setInterval(() => {
    const next = (currentSlide + 1) % 3;
    goToSlide(next);
  }, 5000);
}

// ─── CATALOGUE PAGE ───────────────────────────────────────
function renderCatalogue(type, params) {
  const cats = CATEGORIES[type] || [];
  const activeCat = params?.get('cat') || 'all';
  let products = PRODUCTS.filter(p => p.room === type);
  if (activeCat !== 'all') products = products.filter(p => p.category === activeCat);

  return `
  <header class="catalogue-header">
    <div class="container">
      <div class="mono" style="margin-bottom:1rem;color:white;opacity:0.8">CATALOGUE // CATEGORY: ${type.toUpperCase()}</div>
      <h1 class="display-giant">${type.toUpperCase()} MOD</h1>
    </div>
  </header>
  
  <div class="container" style="margin-top: 3rem;">
    <div class="catalogue-filters">
      <div class="filter-pill ${activeCat === 'all' ? 'active' : ''}" onclick="navigate('/${type}')">ALL SPECS</div>
      ${cats.map(c => `<div class="filter-pill ${activeCat === c.id ? 'active' : ''}" onclick="navigate('/${type}?cat=${c.id}')">${c.name.toUpperCase()}</div>`).join('')}
    </div>
  </div>

  <div class="section" style="padding-top:2rem">
    <div class="container">
      <div class="catalogue-toolbar" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3rem;border-bottom:var(--border-w) solid var(--border);padding-bottom:1rem">
        <div class="mono">${products.length} UNITS FOUND</div>
        <div style="display:flex;gap:1rem">
          <select class="btn btn-sm mono" id="sort-select" onchange="sortCatalogue('${type}')" style="background:white;font-size:0.7rem;padding:0.5rem">
            <option value="default">SORT: FEATURED</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>
      <div class="grid-4" id="products-grid">
        ${products.map(p => buildProductCard(p)).join('')}
      </div>
    </div>
  </div>`;
}

function sortCatalogue(type) {
  const sort = document.getElementById('sort-select').value;
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  let products = PRODUCTS.filter(p => p.room === type);
  const activeCat = params.get('cat') || 'all';
  if (activeCat !== 'all') products = products.filter(p => p.category === activeCat);

  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);

  document.getElementById('products-grid').innerHTML = products.map(p => buildProductCard(p)).join('');
}

// ─── PRODUCT DETAIL ───────────────────────────────────────
function renderProduct(id) {
  const p = getProductById(id);
  if (!p) return App.render404();
  const related = PRODUCTS.filter(x => x.room === p.room && x.id !== p.id).slice(0, 4);
  
  return `
  <div class="product-detail">
    <div class="product-gallery">
      <div class="product-gallery__main">
        <div style="width:100%;height:100%;background:linear-gradient(135deg,${p.gradient[0]},${p.gradient[1]});overflow:hidden;position:relative;">
          <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block;">
        </div>
      </div>
    </div>
    <div class="product-info">
      <div class="product-breadcrumb mono" style="margin-bottom:2rem;font-size:0.7rem;opacity:0.6">
        <a href="#" onclick="navigate('/');return false">HOME</a> / 
        <a href="#" onclick="navigate('/${p.room}');return false">${p.room.toUpperCase()}</a> / 
        <span>${p.name.toUpperCase()}</span>
      </div>
      <div class="mono" style="color:var(--accent);margin-bottom:1rem">UNIT REF: 00${p.id} // TYPE: ${p.category.toUpperCase()}</div>
      <h1 class="product-info__title display-lg">${p.name}</h1>
      <p class="mono" style="margin-bottom:2rem;line-height:1.8;opacity:0.7">${p.description}</p>
      
      <div class="product-info__price" style="margin-bottom:2rem">${formatPrice(p.price)}</div>
      
      <div style="margin-bottom:2rem">
        <div class="mono" style="font-size:0.7rem;margin-bottom:0.5rem">AVAILABLE VARIANTS:</div>
        <div style="display:flex;gap:0.5rem">
          ${p.colors.map(c => `<div title="${c}" style="width:30px;height:30px;border:2px solid var(--border);background:linear-gradient(135deg,${p.gradient[0]},${p.gradient[1]})"></div>`).join('')}
        </div>
      </div>

      <div class="product-cta">
        <button class="btn btn-accent" onclick="Wishlist.add(${p.id})">ADD TO WISHLIST</button>
        <button class="btn btn-accent-2" onclick="navigate('/contact')">GET A QUOTE</button>
      </div>

      <div style="margin-top:4rem;border-top:var(--border-w) solid var(--border);padding-top:2rem">
        <h4 class="display" style="margin-bottom:1rem">TECHNICAL SPECS</h4>
        <div class="product-specs mono" style="font-size:0.7rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>MATERIAL: ${p.material.toUpperCase()}</div>
          <div>STYLE: ${p.style.toUpperCase()}</div>
          <div>DIMENSIONS: ${p.dimensions.toUpperCase()}</div>
          <div>INSTALLATION: INCLUDED</div>
        </div>
      </div>
    </div>
  </div>

  <section class="section" style="border-top:var(--border-w) solid var(--border)">
    <div class="container">
      <div class="section-header reveal">
        <div class="mono" style="color:var(--accent)">// SYNCED ASSETS</div>
        <h2 class="display display-md">RELATED UNITS</h2>
      </div>
      <div class="grid-4">
        ${related.map(r => buildProductCard(r)).join('')}
      </div>
    </div>
  </section>`;
}
