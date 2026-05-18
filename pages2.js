// Login removed: auth UI and handlers deleted

// ── SEARCH PAGE ───────────────────────────────────────────
function renderSearch(q) {
  const results = q ? searchProducts(q) : [];
  return `
  <section class="section" style="padding-top:calc(var(--nav-h) + 4rem)">
    <div class="container">
      <div class="section-header reveal">
        <div class="mono" style="color:var(--accent)">// QUERY SEARCH OPS</div>
        <h2 class="display display-lg">RESULTS: "${q.toUpperCase()}"</h2>
        <p class="mono">${results.length} MATCHING UNITS FOUND</p>
      </div>
      <div class="grid-4" style="margin-top:4rem">
        ${results.map(p => buildProductCard(p)).join('')}
      </div>
      ${results.length === 0 ? `
        <div style="text-align:center;padding:10rem 0">
          <div class="display" style="font-size:5rem;opacity:0.1">NO DATA</div>
          <p class="mono">// SEARCH YIELDED ZERO RESULTS</p>
          <button class="btn btn-accent" style="margin-top:2rem" onclick="navigate('/')">REBOOT SEARCH</button>
        </div>
      ` : ''}
    </div>
  </section>`;
}

// ── ABOUT PAGE ────────────────────────────────────────────
function renderAbout() {
  return `
  <section class="section" style="padding-top:calc(var(--nav-h) + 4rem)">
    <div class="container">
      <div style="text-align:center;margin-bottom:4rem">
        <h2 class="display display-lg" style="margin-bottom:1rem">OUR MANIFESTO</h2>
        <p class="mono" style="font-size:1.2rem;color:var(--accent)">ENGINEERING SPACES SINCE 2013</p>
      </div>
      <div style="max-width:800px;margin:0 auto">
        <div style="display:flex;flex-wrap:wrap;gap:3rem;margin-top:3rem">
          <div style="display:flex;align-items:baseline;gap:1rem;flex:1;min-width:300px">
            <h4 class="display" style="color:var(--accent);margin:0;white-space:nowrap;">VISION 01</h4>
            <p class="mono" style="font-size:0.8rem;margin:0;">To bridge the gap between high-end architectural engineering and residential comfort.</p>
          </div>
          <div style="display:flex;align-items:baseline;gap:1rem;flex:1;min-width:300px">
            <h4 class="display" style="color:var(--accent);margin:0;white-space:nowrap;">VISION 02</h4>
            <p class="mono" style="font-size:0.8rem;margin:0;">Utilizing precision manufacturing to deliver bespoke interiors at scale.</p>
          </div>
        </div>
        <p style="font-size:1.1rem;margin-top:3rem;width:100%;line-height:1.8">Interior Planet is not just an interior firm; it's a spatial engineering lab. We specialize in the architectural elements that define a room: the ceilings that shelter us, the storage that organizes us, and the art that inspires us.</p>
      </div>
    </div>
  </section>
  <section class="section" id="contact-section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6rem">
        <div>
          <h2 class="display display-lg">INITIATE COMMS</h2>
          <p class="mono" style="margin-bottom:4rem;opacity:0.7">// REACH OUT TO SPATIAL ENGINEERS</p>
          
          <div style="margin-bottom:3rem">
            <h4 class="display" style="font-size:1.5rem">BENGALURU HQ</h4>
            <p class="mono">123 DESIGN AVENUE, KARNATAKA, INDIA<br>+91 98765 43210<br>HELLO@INTERIORPLANET.IN</p>
          </div>
          
          <div>
            <h4 class="display" style="font-size:1.5rem">OPS HOURS</h4>
            <p class="mono">MON-SAT // 1000 - 1900 HRS</p>
          </div>
        </div>
        <div>
          <div class="auth-form" style="width:100%">
            <div class="form-group">
              <label class="form-label mono">ID NAME</label>
              <input type="text" class="form-control" placeholder="ENTER NAME">
            </div>
            <div class="form-group">
              <label class="form-label mono">ID EMAIL</label>
              <input type="email" class="form-control" placeholder="USER@EMAIL.COM">
            </div>
            <div class="form-group">
              <label class="form-label mono">MESSAGE BODY</label>
              <textarea class="form-control" style="height:150px" placeholder="TRANSMIT DETAILS..."></textarea>
            </div>
            <button class="btn btn-full btn-accent" onclick="showToast('COMMS SENT // STAND BY FOR REPLY','success')">SEND MESSAGE</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ── CONTACT PAGE ──────────────────────────────────────────
function renderContact() {
  return `
  <section class="section" style="padding-top:calc(var(--nav-h) + 4rem)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6rem">
        <div>
          <h2 class="display display-lg">INITIATE COMMS</h2>
          <p class="mono" style="margin-bottom:4rem;opacity:0.7">// REACH OUT TO SPATIAL ENGINEERS</p>
          
          <div style="margin-bottom:3rem">
            <h4 class="display" style="font-size:1.5rem">BENGALURU HQ</h4>
            <p class="mono">123 DESIGN AVENUE, KARNATAKA, INDIA<br>+91 98765 43210<br>HELLO@INTERIORPLANET.IN</p>
          </div>
          
          <div>
            <h4 class="display" style="font-size:1.5rem">OPS HOURS</h4>
            <p class="mono">MON-SAT // 1000 - 1900 HRS</p>
          </div>
        </div>
        <div>
          <div class="auth-form" style="width:100%">
            <div class="form-group">
              <label class="form-label mono">ID NAME</label>
              <input type="text" class="form-control" placeholder="ENTER NAME">
            </div>
            <div class="form-group">
              <label class="form-label mono">ID EMAIL</label>
              <input type="email" class="form-control" placeholder="USER@EMAIL.COM">
            </div>
            <div class="form-group">
              <label class="form-label mono">MESSAGE BODY</label>
              <textarea class="form-control" style="height:150px" placeholder="TRANSMIT DETAILS..."></textarea>
            </div>
            <button class="btn btn-full btn-accent" onclick="showToast('COMMS SENT // STAND BY FOR REPLY','success')">SEND MESSAGE</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ── LEGAL PAGES ───────────────────────────────────────────
function renderTerms() { return `<section class="section"><div class="container"><h1 class="display">TERMS & PROTOCOLS</h1><p class="mono">STANDARD SERVICE AGREEMENT V2...</p></div></section>`; }
function renderPrivacy() { return `<section class="section"><div class="container"><h1 class="display">PRIVACY ENCRYPTION</h1><p class="mono">DATA PROTECTION PROTOCOLS...</p></div></section>`; }
function renderCookies() { return `<section class="section"><div class="container"><h1 class="display">COOKIE MODULES</h1><p class="mono">CACHE & TRACKING DATA POLICY...</p></div></section>`; }
