/**
 * INTERIOR PLANET — SPA ENGINE V2 (NEO-BRUTALIST REWRITE)
 * Architecture: Registry-based State Machine
 */

const App = {
  registry: {},
  state: {
    path: '/'
  },

  register(route, renderer) {
    this.registry[route] = renderer;
  },

  init() {
    window.addEventListener('hashchange', () => this.route());
    document.addEventListener('DOMContentLoaded', () => {
      this.buildShell();
      this.route();
      this.initGlobalEvents();
    });
  },

  route() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, qs] = hash.split('?');
    const params = new URLSearchParams(qs);
    const segments = path.split('/').filter(Boolean);

    const appEl = document.getElementById('app');
    if (!appEl) return;

    let html = '';
    if (this.registry[path]) {
      html = this.registry[path](params);
    } else if (segments[0] === 'product' && segments[1]) {
      html = renderProduct(segments[1]);
    } else if (path === '/search') {
      html = renderSearch(params.get('q') || '');
    } else {
      html = this.render404();
    }

    appEl.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initReveal();
    this.updateUI();
    if (path === '/' || path === '') startCarousel();
  },

  buildShell() {
    const nav = document.getElementById('navbar-wrap');
    if (nav) nav.innerHTML = this.buildNavbar();
    const footer = document.getElementById('footer-wrap');
    if (footer) footer.innerHTML = this.buildFooter();
    
    document.body.insertAdjacentHTML('beforeend', `
      <div id="toast-container" style="position:fixed;bottom:2rem;right:2rem;z-index:3000"></div>
      <div id="wish-overlay"></div>
      <button id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
    `);
  },

  buildNavbar() {
    const buildDropdown = (label, type) => {
      const cats = CATEGORIES[type] || [];
      return `
      <div class="nav-dropdown">
        <div class="dropdown-inner">
          <div class="dropdown-grid">
            ${cats.map(c => `
              <a class="dropdown-link" href="#" onclick="navigate('/${type}?cat=${c.id}');return false">
                <span class="dropdown-link__icon">${c.icon}</span>
                <div class="dropdown-link__text">
                  <div class="dropdown-link__name">${c.name}</div>
                  <div class="dropdown-link__sub">${c.description}</div>
                </div>
              </a>`).join('')}
            <a class="dropdown-link view-all" href="#" onclick="navigate('/${type}');return false">
              <span class="dropdown-link__icon">→</span>
              <div class="dropdown-link__text"><div class="dropdown-link__name">VIEW ALL ${label.toUpperCase()}</div></div>
            </a>
          </div>
        </div>
      </div>`;
    };

    return `
    <nav id="navbar">
      <div class="container nav-inner">
        <a class="nav-logo" href="#" onclick="navigate('/');return false">
          <svg class="nav-logo__mark" style="width:2.5rem;height:2.5rem;padding:0.4rem;display:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="7"></circle>
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(35 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-35 12 12)"></ellipse>
            <line x1="12" y1="3" x2="12" y2="21"></line>
          </svg>
          <div class="nav-logo__name">INTERIOR PLANET</div>
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a class="nav-link" href="#" data-path="/ceilings" onclick="navigate('/ceilings');return false">CEILINGS</a>
            ${buildDropdown('Ceilings', 'ceilings')}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-path="/cupboards" onclick="navigate('/cupboards');return false">CUPBOARDS</a>
            ${buildDropdown('Cupboards', 'cupboards')}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-path="/paintings" onclick="navigate('/paintings');return false">ART</a>
            ${buildDropdown('Art', 'paintings')}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-path="/lighting" onclick="navigate('/lighting');return false">LIGHTS</a>
            ${buildDropdown('Lights', 'lighting')}
          </li>
        </ul>
        <div class="nav-actions">
          <button class="nav-icon-btn" onclick="toggleSearch()" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button class="nav-icon-btn" onclick="openWishlist()" title="Wishlist">
            ♡ <span class="wish-count" style="display:none">0</span>
          </button>
          <button class="nav-hamburger" onclick="App.toggleMobileNav()">☰</button>
        </div>
      </div>
      <div class="nav-search-bar" id="nav-search-bar">
        <div class="container">
          <input class="nav-search-input" id="nav-search-input" placeholder="SEARCH SPATIAL ASSETS..." oninput="App.updateSearchSuggestions(this.value)" onkeydown="if(event.key==='Enter'&&this.value){navigate('/search?q='+encodeURIComponent(this.value));toggleSearch()}">
          <div class="search-suggestions" id="search-suggestions"></div>
        </div>
      </div>
      <div id="mobile-nav" class="mobile-nav">
        <a href="#" onclick="navigate('/ceilings');App.toggleMobileNav();return false">CEILINGS</a>
        <a href="#" onclick="navigate('/cupboards');App.toggleMobileNav();return false">CUPBOARDS</a>
        <a href="#" onclick="navigate('/paintings');App.toggleMobileNav();return false">ART</a>
        <a href="#" onclick="navigate('/lighting');App.toggleMobileNav();return false">LIGHTING</a>
        <a href="#" onclick="navigate('/contact');App.toggleMobileNav();return false">CONTACT</a>
      </div>
    </nav>`;
  },

  updateSearchSuggestions(q) {
    const box = document.getElementById('search-suggestions');
    if (!box) return;
    if (q.length < 2) { box.classList.remove('show'); return; }
    const results = searchProducts(q).slice(0, 5);
    if (!results.length) { box.classList.remove('show'); return; }
    box.innerHTML = results.map(p => `
      <div class="suggestion-item" onclick="navigate('/product/${p.id}');toggleSearch()">
        <div class="mono" style="font-size:1rem;font-weight:700">${p.name.toUpperCase()}</div>
        <div class="mono" style="font-size:0.8rem;opacity:0.6">${p.room.toUpperCase()} // ${formatPrice(p.price)}</div>
      </div>`).join('');
    box.classList.add('show');
  },

  toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    if (nav) nav.classList.toggle('open');
    document.body.classList.toggle('mobile-nav-open');
  },

  buildFooter() {
    return `
    <footer id="footer">
      <div class="newsletter-bar">
        <div class="container newsletter-inner">
          <div>
            <h3 class="display">NEWSLETTER SUBSCRIPTION</h3>
            <p class="mono" style="font-size:1rem;opacity:0.7">GET SPATIAL DATA UPDATES WEEKLY</p>
          </div>
          <div class="newsletter-form">
            <input type="email" class="newsletter-input" id="nl-email" placeholder="ENTER EMAIL ADDR">
            <button class="btn btn-accent btn-sm" onclick="subscribeNewsletter()">SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <h2 class="display" style="font-size:4rem;margin-bottom:1rem;color:var(--accent-2)">INT PLANET</h2>
            <p class="mono" style="font-size:1rem;opacity:0.6">// STATUS: OPERATIONAL SINCE 2013<br>// SECTOR: SPATIAL ENGINEERING</p>
            <div class="footer-socials" style="margin-top:2rem; display:flex; gap:1.5rem; align-items:center;">
              <a href="#" class="social-btn" aria-label="Instagram">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="social-btn" aria-label="WhatsApp">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path><polyline points="8 10 10.5 15 12 12 13.5 15 16 10"></polyline></svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>SERVICES</h5>
            <div class="footer-links">
              <a href="#" class="footer-link" onclick="navigate('/ceilings');return false">CEILING MOD</a>
              <a href="#" class="footer-link" onclick="navigate('/cupboards');return false">STORAGE SYS</a>
              <a href="#" class="footer-link" onclick="navigate('/paintings');return false">ART ASSETS</a>
              <a href="#" class="footer-link" onclick="navigate('/lighting');return false">LIGHT MODULES</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>CONTACT</h5>
            <div class="footer-links">
              <a href="#" class="footer-link" onclick="navigate('/about');return false">MANIFESTO</a>
              <a href="#" class="footer-link" onclick="navigate('/contact');return false">COMMS</a>
              <a href="#" class="footer-link" onclick="navigate('/terms');return false">PROTOCOLS</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>LOC DATA</h5>
            <p class="mono" style="font-size:1rem;line-height:1.8">
              BENGALURU HQ<br>
              +91 98765 43210<br>
              HELLO@PLANET.IN
            </p>
          </div>
        </div>
        <div class="footer-bottom mono">
          <span style="font-size:0.85rem">© 2025 INTERIOR PLANET // ALL RIGHTS RESERVED</span>
          <span style="font-size:0.85rem;color:var(--accent-2)">LATENCY: 12ms // BUFFER: OPTIMAL</span>
        </div>
      </div>
    </footer>`;
  },

  updateUI() {
    const hash = window.location.hash.slice(1) || '/';
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.path === hash.split('?')[0]);
    });
    updateWishBadge();
  },

  initGlobalEvents() {
    window.addEventListener('scroll', () => {
      document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 50);
      document.getElementById('back-to-top')?.classList.toggle('show', window.scrollY > 500);
    });
    document.addEventListener('click', e => {
      const bar = document.getElementById('nav-search-bar');
      const btn = e.target.closest('[onclick="toggleSearch()"]');
      if (bar && !bar.contains(e.target) && !btn) bar.classList.remove('open');
    });
  },

  render404() {
    return `
      <section class="section" style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center">
        <div class="container">
          <h1 class="display" style="font-size:15rem;color:var(--accent)">ERR 404</h1>
          <p class="mono" style="margin-bottom:3rem">VOID SPACE DETECTED // THE PIECE IS MISSING</p>
          <button class="btn btn-accent" onclick="navigate('/')">REBOOT SYSTEM</button>
        </div>
      </section>`;
  }
};

// Global Helpers
function navigate(path) { window.location.hash = path; }
function formatPrice(price) { return '₹' + price.toLocaleString('en-IN'); }
function toggleSearch() { 
  const bar = document.getElementById('nav-search-bar'); 
  if (!bar) return; 
  bar.classList.toggle('open'); 
  if (bar.classList.contains('open')) document.getElementById('nav-search-input')?.focus(); 
}
function subscribeNewsletter() { 
  const e = document.getElementById('nl-email')?.value; 
  if (!e || !e.includes('@')) { showToast('INVALID EMAIL ADDR','error'); return; } 
  showToast('SUBSCRIPTION SUCCESSFUL // WELCOME TO THE PLANET','success'); 
}

// Register Routes
App.register('/', renderHome);
App.register('/ceilings', (p) => renderCatalogue('ceilings', p));
App.register('/cupboards', (p) => renderCatalogue('cupboards', p));
App.register('/paintings', (p) => renderCatalogue('paintings', p));
App.register('/lighting', (p) => renderCatalogue('lighting', p));
App.register('/about', renderAbout);
App.register('/contact', renderContact);
App.register('/terms', renderTerms);
App.register('/privacy', renderPrivacy);
App.register('/cookies', renderCookies);

App.init();
