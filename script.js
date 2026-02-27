n style.css
text

/* =============================================
   PORTFOLIO — style.css
   Développeur Tech | Professionnel & Sobre
   ============================================= */

/* ---------- RESET & BASE ---------- */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg:          #080b12;
  --bg-dark:     #050810;
  --surface:     #0e1420;
  --surface2:    #141b2d;
  --border:      #1e2840;
  --accent:      #4f9eff;
  --accent2:     #7b5ea7;
  --accent-glow: rgba(79,158,255,0.15);
  --text:        #e2e8f0;
  --muted:       #64748b;
  --soft:        #94a3b8;
  --success:     #22c55e;
  --white:       #ffffff;
  --font-d: 'Syne', sans-serif;
  --font-b: 'Outfit', sans-serif;
  --radius:  12px;
  --radius-lg: 20px;
  --tr: 0.3s ease;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-b);
  line-height: 1.7;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-dark); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

h1,h2,h3,h4 { font-family: var(--font-d); font-weight: 700; line-height: 1.2; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; display: block; }
.hidden { display: none !important; }

.container { max-width: 1100px; margin: 0 auto; padding: 0 32px; }

.section { padding: 100px 0; position: relative; }

.section-dark { background: var(--bg-dark); }
.section-dark::before,
.section-dark::after {
  content: ''; position: absolute; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}
.section-dark::before { top:0; }
.section-dark::after  { bottom:0; }

/* =============================================
   NAVIGATION
   ============================================= */
.navbar {
  position: fixed; top:0; left:0; right:0; z-index:1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 48px;
  transition: var(--tr);
}
.navbar.scrolled {
  background: rgba(8,11,18,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 14px 48px;
}
.nav-logo {
  font-family: var(--font-d); font-size: 20px; font-weight: 800;
  color: var(--white); letter-spacing: -0.02em;
}
.logo-bracket { color: var(--accent); }
.logo-dot     { color: var(--accent2); }

.nav-links { list-style:none; display:flex; gap:8px; }
.nav-link {
  font-size: 14px; font-weight: 500; padding: 8px 16px;
  border-radius: 8px; color: var(--soft); transition: var(--tr); position: relative;
}
.nav-link:hover, .nav-link.active { color: var(--white); background: rgba(79,158,255,0.1); }
.nav-link.active::after {
  content:''; position:absolute; bottom:4px; left:50%; transform:translateX(-50%);
  width:4px; height:4px; border-radius:50%; background:var(--accent);
}
.burger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
.burger span { display:block; width:24px; height:2px; background:var(--text); border-radius:2px; transition:var(--tr); }

/* =============================================
   HERO
   ============================================= */
.hero-section {
  min-height: 100vh; display:flex; align-items:center; justify-content:center;
  text-align:center; padding: 120px 32px 80px; position:relative; overflow:hidden;
}
.hero-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.hero-orb {
  position:absolute; border-radius:50%;
  filter:blur(80px); opacity:0.15;
  animation: floatOrb 8s ease-in-out infinite alternate;
}
.orb1 { width:500px; height:500px; background:var(--accent); top:-150px; right:-100px; }
.orb2 { width:400px; height:400px; background:var(--accent2); bottom:-100px; left:-80px; animation-delay:3s; }
@keyframes floatOrb {
  0%   { transform: translate(0,0) scale(1); }
  100% { transform: translate(30px,30px) scale(1.1); }
}
.grid-overlay {
  position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(79,158,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79,158,255,0.04) 1px, transparent 1px);
  background-size: 50px 50px;
}
.hero-content {
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center;
  max-width: 720px; margin:0 auto;
}

/* ── PROFIL x2 ── */
.profile-wrapper {
  position:relative; width:320px; height:320px;
  margin-bottom:36px;
  animation: fadeDown 0.7s ease both;
}
.profile-ring {
  position:absolute; inset:-6px; border-radius:50%;
  background: conic-gradient(var(--accent), var(--accent2), var(--accent));
  animation: rotateBorder 4s linear infinite; opacity:0.8;
}
@keyframes rotateBorder { to { transform:rotate(360deg); } }
.profile-img-container {
  position:absolute; inset:6px; border-radius:50%;
  overflow:hidden; background:var(--surface); border:4px solid var(--bg);
}
.profile-img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
.profile-status {
  position:absolute; bottom:16px; right:-14px;
  background:var(--surface2); border:1px solid var(--border);
  border-radius:20px; padding:5px 12px;
  font-size:12px; font-weight:500; color:var(--success);
  display:flex; align-items:center; gap:6px; white-space:nowrap;
}
.status-dot {
  width:8px; height:8px; background:var(--success); border-radius:50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100%{ opacity:1; transform:scale(1); }
  50%    { opacity:0.5; transform:scale(1.4); }
}

/* Hero Text */
.hero-name {
  font-family:var(--font-d); font-size:clamp(42px,7vw,72px); font-weight:800;
  letter-spacing:-0.03em; color:var(--white); margin-bottom:10px;
  animation: fadeUp 0.7s ease 0.1s both;
}
.name-highlight {
  color:transparent;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text; background-clip:text;
}
.hero-title {
  font-size:17px; color:var(--soft); font-weight:400; margin-bottom:28px;
  letter-spacing:0.02em; animation:fadeUp 0.7s ease 0.2s both;
}
.hero-intro {
  background:rgba(79,158,255,0.05);
  border:1px solid var(--border); border-left:3px solid var(--accent);
  border-radius:0 var(--radius) var(--radius) 0;
  padding:20px 24px; margin-bottom:28px;
  text-align:left; font-size:15px; color:var(--soft); line-height:1.8;
  animation:fadeUp 0.7s ease 0.3s both;
}
.hero-intro strong { color:var(--text); }
.hero-badges {
  display:flex; flex-wrap:wrap; justify-content:center; gap:10px;
  margin-bottom:36px; animation:fadeUp 0.7s ease 0.4s both;
}
.badge {
  background:var(--surface2); border:1px solid var(--border);
  color:var(--soft); font-size:13px; font-weight:500;
  padding:6px 14px; border-radius:30px; transition:var(--tr);
}
.badge:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); }
.hero-cta { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; animation:fadeUp 0.7s ease 0.5s both; }

/* Buttons */
.btn-primary {
  display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
  background:linear-gradient(135deg,var(--accent),#2563eb);
  color:var(--white); font-family:var(--font-b); font-size:14px; font-weight:600;
  border:none; border-radius:var(--radius); cursor:pointer; transition:var(--tr);
  box-shadow:0 4px 24px rgba(79,158,255,0.3);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(79,158,255,0.4); }
.btn-secondary {
  display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
  background:transparent; color:var(--text); font-family:var(--font-b);
  font-size:14px; font-weight:500; border:1px solid var(--border);
  border-radius:var(--radius); cursor:pointer; transition:var(--tr);
}
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); }
.btn-full { width:100%; justify-content:center; }

/* Scroll indicator */
.scroll-indicator {
  position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
  display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0.4;
}
.scroll-line {
  width:1px; height:40px;
  background:linear-gradient(to bottom,var(--accent),transparent);
  animation:scrollDown 1.5s ease-in-out infinite;
}
.scroll-indicator span { font-size:10px; letter-spacing:0.15em; color:var(--muted); }
@keyframes scrollDown {
  0%  { transform:scaleY(0); transform-origin:top; }
  50% { transform:scaleY(1); transform-origin:top; }
  51% { transform:scaleY(1); transform-origin:bottom; }
  100%{ transform:scaleY(0); transform-origin:bottom; }
}

/* =============================================
   SECTION HEADERS
   ============================================= */
.section-header { display:flex; align-items:center; gap:20px; margin-bottom:60px; }
.section-number { font-family:var(--font-d); font-size:13px; font-weight:700; color:var(--accent); letter-spacing:0.1em; opacity:0.7; }
.section-title  { font-family:var(--font-d); font-size:clamp(26px,4vw,40px); font-weight:800; color:var(--white); }
.section-line   { flex:1; height:1px; background:linear-gradient(90deg,var(--border),transparent); }

/* =============================================
   À PROPOS
   ============================================= */
.about-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
.about-text p { color:var(--soft); margin-bottom:18px; font-size:15px; }
.about-lead   { font-size:18px !important; color:var(--text) !important; font-weight:500; }
.about-infos {
  display:grid; grid-template-columns:1fr 1fr; gap:14px;
  margin:28px 0; padding:24px;
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
}
.info-item  { display:flex; flex-direction:column; gap:3px; }
.info-label { font-size:12px; color:var(--muted); }
.info-value { font-size:14px; font-weight:500; color:var(--text); }
.about-stats { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.stat-card {
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:32px 20px; text-align:center;
  transition:var(--tr); position:relative; overflow:hidden;
}
.stat-card::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg,var(--accent-glow),transparent);
  opacity:0; transition:var(--tr);
}
.stat-card:hover::before { opacity:1; }
.stat-card:hover { border-color:var(--accent); transform:translateY(-4px); }
.stat-number {
  font-family:var(--font-d); font-size:44px; font-weight:800;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text; background-clip:text; color:transparent;
  line-height:1; margin-bottom:8px;
}
.stat-label { font-size:13px; color:var(--muted); }

/* =============================================
   COMPÉTENCES
   ============================================= */
.skills-wrapper {
  display:grid; grid-template-columns:repeat(3,1fr); gap:32px; margin-bottom:60px;
}
.skills-category {
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:28px; transition:var(--tr);
}
.skills-category:hover { border-color:rgba(79,158,255,0.3); }
.skills-cat-title {
  font-family:var(--font-d); font-size:16px; font-weight:700; color:var(--white);
  margin-bottom:24px; display:flex; align-items:center; gap:10px;
}
.skills-cat-title span { font-size:20px; }
.skill-item   { margin-bottom:18px; }
.skill-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:7px; }
.skill-name   { font-size:14px; font-weight:500; color:var(--text); }
.skill-pct    { font-size:12px; color:var(--accent); font-family:var(--font-d); font-weight:700; }
.skill-bar    { height:5px; background:var(--border); border-radius:10px; overflow:hidden; }
.skill-fill   {
  height:100%;
  background:linear-gradient(90deg,var(--accent),var(--accent2));
  border-radius:10px; width:0%;
  transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
}
.tools-section { padding-top:20px; }
.tools-title { font-family:var(--font-d); font-size:16px; font-weight:700; color:var(--white); margin-bottom:20px; text-align:center; }
.tools-grid  { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
.tool-chip {
  padding:8px 18px; background:var(--surface); border:1px solid var(--border);
  border-radius:30px; font-size:13px; color:var(--soft); font-weight:500;
  cursor:default; transition:var(--tr);
}
.tool-chip:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); transform:translateY(-2px); }

/* =============================================
   LOCALISATION
   ============================================= */
.location-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
.location-card {
  background:linear-gradient(135deg,var(--surface),var(--surface2));
  border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:28px; text-align:center; margin-bottom:24px;
}
.location-icon { font-size:40px; margin-bottom:12px; }
.location-card h3 { font-size:20px; color:var(--white); margin-bottom:10px; }
.location-card p  { font-size:14px; color:var(--soft); line-height:1.7; }
.location-details { display:flex; flex-direction:column; gap:14px; }
.location-detail-item {
  display:flex; align-items:center; gap:14px;
  padding:14px 18px; background:var(--surface);
  border:1px solid var(--border); border-radius:var(--radius); transition:var(--tr);
}
.location-detail-item:hover { border-color:var(--accent); }
.ld-icon { font-size:22px; width:36px; text-align:center; }
.location-detail-item strong { display:block; font-size:12px; color:var(--muted); margin-bottom:2px; }
.location-detail-item span   { display:block; font-size:14px; font-weight:500; color:var(--text); }
.location-map { height:100%; }
.map-container {
  width:100%; height:420px; background:var(--surface);
  border:1px solid var(--border); border-radius:var(--radius-lg);
  overflow:hidden; position:relative;
}
.map-placeholder {
  width:100%; height:100%; display:flex; flex-direction:column;
  align-items:center; justify-content:center; position:relative;
  background:radial-gradient(ellipse at center,rgba(79,158,255,0.08) 0%,transparent 70%);
}
.map-grid-lines {
  position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(79,158,255,0.06) 1px,transparent 1px),
    linear-gradient(90deg,rgba(79,158,255,0.06) 1px,transparent 1px);
  background-size:40px 40px;
}
.map-pin-pulse { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; }
.map-pin { font-size:48px; animation:bounce 2s ease-in-out infinite; filter:drop-shadow(0 4px 20px rgba(79,158,255,0.5)); }
@keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
.pin-pulse {
  width:60px; height:60px; background:rgba(79,158,255,0.15); border-radius:50%;
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  animation:pingPulse 2s ease-in-out infinite;
}
@keyframes pingPulse {
  0%  {transform:translate(-50%,-50%) scale(0.5); opacity:0.8;}
  100%{transform:translate(-50%,-50%) scale(2.5); opacity:0;}
}
.map-city { font-family:var(--font-d); font-size:22px; font-weight:700; color:var(--white); margin-top:16px; position:relative; z-index:2; }

/* =============================================
   CONTACT
   ============================================= */
.contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
.contact-lead { font-size:16px; color:var(--soft); margin-bottom:32px; line-height:1.8; }
.contact-links { display:flex; flex-direction:column; gap:12px; }
.contact-item {
  display:flex; align-items:center; gap:16px; padding:16px 20px;
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius); transition:var(--tr);
}
.contact-item:hover { border-color:var(--accent); background:var(--accent-glow); transform:translateX(4px); }
.contact-icon { font-size:22px; width:40px; text-align:center; }
.ci-label { display:block; font-size:11px; color:var(--muted); letter-spacing:0.05em; margin-bottom:2px; }
.ci-value { display:block; font-size:14px; font-weight:500; color:var(--text); }
.contact-form { display:flex; flex-direction:column; gap:18px; }
.form-group   { display:flex; flex-direction:column; gap:7px; }
.form-group label { font-size:13px; font-weight:500; color:var(--soft); letter-spacing:0.02em; }
.form-group input,
.form-group textarea {
  width:100%; padding:12px 16px; background:var(--surface);
  border:1px solid var(--border); border-radius:var(--radius);
  color:var(--text); font-family:var(--font-b); font-size:14px;
  transition:var(--tr); outline:none; resize:vertical;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color:var(--muted); }
.form-group input:focus,
.form-group textarea:focus {
  border-color:var(--accent); background:rgba(79,158,255,0.04);
  box-shadow:0 0 0 3px rgba(79,158,255,0.1);
}
.form-success {
  padding:14px 18px; background:rgba(34,197,94,0.1);
  border:1px solid rgba(34,197,94,0.3); border-radius:var(--radius);
  color:var(--success); font-size:14px; font-weight:500; text-align:center;
}

/* =============================================
   FOOTER
   ============================================= */
.footer { background:var(--bg-dark); border-top:1px solid var(--border); padding:40px 32px; text-align:center; }
.footer-content { display:flex; flex-direction:column; align-items:center; gap:10px; }
.footer-text { font-size:13px; color:var(--muted); }
.footer-made { font-size:12px; color:var(--muted); opacity:0.6; }

/* =============================================
   KEYFRAMES
   ============================================= */
@keyframes fadeUp   { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
@keyframes fadeDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }

/* =============================================
   RESPONSIVE
   ============================================= */
@media(max-width:900px){
  .navbar,.navbar.scrolled{padding:16px 24px;}
  .nav-links{
    display:none; position:fixed; top:64px; left:0; right:0;
    background:rgba(8,11,18,0.98); backdrop-filter:blur(20px);
    flex-direction:column; align-items:center; gap:4px;
    padding:20px; border-bottom:1px solid var(--border);
  }
  .nav-links.open{display:flex;}
  .burger{display:flex;}
  .about-grid,.contact-grid,.location-grid{grid-template-columns:1fr;}
  .skills-wrapper{grid-template-columns:1fr;}
  
