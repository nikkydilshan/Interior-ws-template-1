// ─── BRUTALIST COMPONENTS ENGINE ─────────────────────────

const WISHLIST_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.2em;height:1.2em;display:inline;vertical-align:middle;margin-right:0.4rem">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>`;

const Wishlist = {
  get items() {
    return JSON.parse(localStorage.getItem('ip_wish') || '[]');
  },
  set items(val) {
    localStorage.setItem('ip_wish', JSON.stringify(val));
  },
  save() { /* No longer needed due to setter */ },
  add(id) {
    const product = getProductById(id);
    if (!product || this.has(id)) return;
    const current = this.items;
    current.push(product);
    this.items = current;
    this.updateUI(id); 
    showToast(`UNIT ADDED TO WISHLIST // ID: ${id}`, 'success');
  },
  remove(id) { 
    this.items = this.items.filter(i => i.id !== parseInt(id)); 
    this.updateUI(id); 
  },
  has(id) { return this.items.some(i => i.id === parseInt(id)); },
  toggle(id) { if (this.has(id)) { this.remove(id); } else { this.add(id); } },
  updateUI(id) {
    updateWishBadge();
    const btns = document.querySelectorAll(`.wishlist-btn[onclick*="toggle(${id})"]`);
    const active = this.has(id);
    btns.forEach(btn => {
      btn.classList.toggle('active', active);
      btn.innerHTML = active ? '♥' : '♡';
    });
  },
  count() { return this.items.length; }
};

function buildProductCard(p) {
  const wishActive = Wishlist.has(p.id) ? 'active' : '';
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  
  return `
  <div class="product-card" data-id="${p.id}" onclick="navigate('/product/${p.id}')">
    <div class="product-card__image-wrap" style="overflow:hidden;position:relative;background:linear-gradient(135deg,${p.gradient[0]},${p.gradient[1]});">
      <img src="${p.image}" alt="${p.name}" class="product-img-hover" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);">
      ${p.badge ? `<div class="product-badge mono">${p.badge.toUpperCase()}</div>` : ''}
      <button class="wishlist-btn ${wishActive}" onclick="event.stopPropagation();Wishlist.toggle(${p.id})">${Wishlist.has(p.id)?'♥':'♡'}</button>
    </div>
    <div class="product-card__info">
      <div class="product-card__category">${p.material} // ${p.style}</div>
      <h3 class="product-card__name">${p.name}</h3>
      <div style="display:flex;align-items:baseline;gap:0.5rem">
        <div class="product-card__price">${formatPrice(p.price)}</div>
        ${p.originalPrice ? `<div class="mono" style="font-size:0.9rem;text-decoration:line-through;opacity:0.5">${formatPrice(p.originalPrice)}</div>` : ''}
      </div>
    </div>
  </div>`;
}

function updateWishBadge() {
  const badges = document.querySelectorAll('.wish-count');
  const count = Wishlist.count();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  });
}

function openWishlist() {
  const overlay = document.getElementById('wish-overlay');
  if (!overlay) return;
  overlay.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1900" onclick="closeWishlist()"></div>
    <div class="sidebar">
      <div class="sidebar-header">
        <div style="display:flex;align-items:center;gap:1rem">
          <div style="color:var(--accent);font-size:2.5rem;display:flex;align-items:center">
            ${WISHLIST_LOGO}
          </div>
          <h2 class="display" style="font-size:3rem;margin:0">WISHLIST</h2>
        </div>
        <button class="btn btn-sm" onclick="closeWishlist()">CLOSE X</button>
      </div>
      <div class="sidebar-body">
        ${Wishlist.items.map(i => `
          <div class="wish-item">
            <img src="${i.image}" alt="${i.name}" style="width:80px;height:80px;object-fit:cover;border:var(--border-w) solid var(--border);box-shadow:3px 3px 0px var(--border);">
            <div style="flex:1">
              <div class="mono" style="font-size:0.85rem;color:var(--accent)">REF: 00${i.id}</div>
              <h4 class="display" style="font-size:1.5rem">${i.name}</h4>
              <button class="mono" style="font-size:0.8rem;text-decoration:underline;margin-top:0.5rem" onclick="Wishlist.remove(${i.id});openWishlist()">[ REMOVE UNIT ]</button>
            </div>
          </div>
        `).join('') || '<p class="mono">// NO DATA DETECTED</p>'}
      </div>
      <div style="padding:1.5rem;border-top:var(--border-w) solid var(--border);background:white">
        <button class="btn btn-full btn-accent" onclick="closeWishlist();navigate('/contact')">GET A QUOTE</button>
      </div>
    </div>
  `;
  overlay.classList.add('open');
}

function closeWishlist() {
  document.getElementById('wish-overlay')?.classList.remove('open');
}

function showToast(msg, type) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `>> SYSTEM MSG: ${msg}`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
