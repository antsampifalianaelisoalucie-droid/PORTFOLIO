/* ══════════════════════════════════════════════
   PORTFOLIO ELISOA ANTSAMPIFALIANA Lucie
   script.js — Interactions Premium · 2026
   ══════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────
   1. PAGE LOADER
   ──────────────────────────────────────────── */
(function(){
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loaderProgress');
  const status  = document.getElementById('loaderStatus');
  if(!loader) return;

  const msgs = ['Initialisation…','Chargement des styles…','Animations prêtes…','Bienvenue !'];
  let p = 0, mi = 0;

  const iv = setInterval(()=>{
    const inc = p < 55 ? 3.5 : p < 80 ? 1.8 : 0.6;
    p = Math.min(p + inc, 92);
    bar.style.width = p + '%';
    const ni = Math.floor(p / 25);
    if(ni !== mi && msgs[ni]){ mi = ni; status.textContent = msgs[ni]; }
  }, 28);

  const finish = ()=>{
    clearInterval(iv);
    bar.style.width = '100%';
    status.textContent = 'Bienvenue !';
    setTimeout(()=> loader.classList.add('gone'), 500);
  };

  window.addEventListener('load', finish);
  setTimeout(finish, 3800);
})();


/* ────────────────────────────────────────────
   2. CURSEUR PERSONNALISÉ
   ──────────────────────────────────────────── */
(function(){
  const dot   = document.getElementById('cursorDot');
  const trail = document.getElementById('cursorTrail');
  if(!dot || !trail) return;
  if('ontouchstart' in window){ dot.style.display='none'; trail.style.display='none'; document.body.style.cursor='auto'; return; }

  let tx=0,ty=0,dx=0,dy=0;

  document.addEventListener('mousemove', e=>{ tx=e.clientX; ty=e.clientY;
    dot.style.left=tx+'px'; dot.style.top=ty+'px'; });

  (function loop(){
    dx += (tx-dx)*.14; dy += (ty-dy)*.14;
    trail.style.left=dx+'px'; trail.style.top=dy+'px';
    requestAnimationFrame(loop);
  })();

  const hov = 'a,button,.chip,.tool-tag,.proj-card,.cc-row,.nav-item,[data-tilt]';
  document.addEventListener('mouseover', e=>{ if(e.target.closest(hov)) document.body.classList.add('cur-hover'); });
  document.addEventListener('mouseout',  e=>{ if(e.target.closest(hov)) document.body.classList.remove('cur-hover'); });
})();


/* ────────────────────────────────────────────
   3. NAVBAR — SCROLL & ACTIVE
   ──────────────────────────────────────────── */
(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;

  window.addEventListener('scroll',()=> nav.classList.toggle('stuck', scrollY>50), {passive:true});

  const secs  = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-item[data-s]');

  new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting)
      links.forEach(l=> l.classList.toggle('on', l.dataset.s===e.target.id)); });
  },{threshold:.45}).observe || secs.forEach(s=>{
    new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting)
        links.forEach(l=> l.classList.toggle('on', l.dataset.s===e.target.id)); });
    },{threshold:.45}).observe(s);
  });

  // init properly
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting)
      links.forEach(l=> l.classList.toggle('on', l.dataset.s===e.target.id)); });
  },{threshold:.45});
  secs.forEach(s=> io.observe(s));
})();


/* ────────────────────────────────────────────
   4. BURGER MENU
   ──────────────────────────────────────────── */
(function(){
  const btn  = document.getElementById('burgerBtn');
  const menu = document.getElementById('navMenu');
  if(!btn||!menu) return;

  btn.addEventListener('click',()=>{
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.nav-item').forEach(l=> l.addEventListener('click',()=>{
    menu.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow='';
  }));
})();


/* ────────────────────────────────────────────
   5. SMOOTH SCROLL
   ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    window.scrollTo({top: t.getBoundingClientRect().top + scrollY - 78, behavior:'smooth'});
  });
});


/* ────────────────────────────────────────────
   6. CANVAS — RÉSEAU DE PARTICULES
   ──────────────────────────────────────────── */
(function(){
  const c = document.getElementById('bgCanvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts=[];
  const N=55;

  const resize=()=>{ W=c.width=innerWidth; H=c.height=innerHeight; };
  resize();
  window.addEventListener('resize', resize, {passive:true});

  class Pt{
    constructor(){this.reset(true)}
    reset(init){
      this.x = Math.random()*W;
      this.y = init ? Math.random()*H : H+8;
      this.r = Math.random()*1.6+.4;
      this.vy = -(Math.random()*.35+.08);
      this.vx = (Math.random()-.5)*.18;
      this.a  = Math.random()*.45+.08;
      this.hue = Math.random()>.5 ? 145 : 45; // emerald or gold
    }
    tick(){ this.x+=this.vx; this.y+=this.vy; if(this.y<-8) this.reset(); }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${this.hue},65%,60%,${this.a})`;
      ctx.fill();
    }
  }

  pts = Array.from({length:N},()=>new Pt());

  (function loop(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(52,183,120,${.055*(1-d/110)})`;
          ctx.lineWidth=.6;
          ctx.stroke();
        }
      }
      pts[i].tick(); pts[i].draw();
    }
    requestAnimationFrame(loop);
  })();
})();


/* ────────────────────────────────────────────
   7. TYPING EFFECT
   ──────────────────────────────────────────── */
(function(){
  const el = document.getElementById('typedText');
  if(!el) return;

  const roles=[
    'Étudiante en Informatique',
    'Développeuse Web en formation',
    'Passionnée de code',
    'Future ingénieure logiciel',
    'Créatrice de solutions numériques',
  ];

  let ri=0, ci=0, del=false;

  const type=()=>{
    const r=roles[ri];
    if(!del){ el.textContent=r.slice(0,++ci);
      if(ci===r.length){ del=true; return setTimeout(type,2300); }
    } else {
      el.textContent=r.slice(0,--ci);
      if(ci===0){ del=false; ri=(ri+1)%roles.length; }
    }
    setTimeout(type, del?42:88);
  };
  setTimeout(type, 2200);
})();


/* ────────────────────────────────────────────
   8. REVEAL AU SCROLL
   ──────────────────────────────────────────── */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); }
    });
  },{threshold:.1, rootMargin:'0px 0px -36px 0px'});

  els.forEach((el,i)=>{ el.style.transitionDelay=(i%4)*.08+'s'; io.observe(el); });
})();


/* ────────────────────────────────────────────
   9. BARRES DE COMPÉTENCES
   ──────────────────────────────────────────── */
(function(){
  const section = document.getElementById('competences');
  if(!section) return;

  let done=false;
  new IntersectionObserver(([e])=>{
    if(e.isIntersecting && !done){
      done=true;
      section.querySelectorAll('.si-fill,.sfc-fill').forEach(f=>{
        f.style.width=(f.dataset.w||0)+'%';
      });
    }
  },{threshold:.15}).observe(section);
})();


/* ────────────────────────────────────────────
   10. COMPTEURS ANIMÉS
   ──────────────────────────────────────────── */
(function(){
  document.querySelectorAll('.stat-n[data-to]').forEach(el=>{
    new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return;
      const end=parseInt(el.dataset.to), dur=1700, t0=performance.now();
      const upd=now=>{
        const p=Math.min((now-t0)/dur,1);
        const eased=1-Math.pow(1-p,3);
        el.textContent=Math.round(eased*end);
        if(p<1) requestAnimationFrame(upd);
        else el.textContent=end+(end===100?'%':'+');
      };
      requestAnimationFrame(upd);
    },{threshold:.85}).observe(el);
  });
})();


/* ────────────────────────────────────────────
   11. THEME TOGGLE
   ──────────────────────────────────────────── */
(function(){
  const btn  = document.getElementById('themeBtn');
  const html = document.documentElement;
  if(!btn) return;

  const saved = localStorage.getItem('eltheme')||'dark';
  html.setAttribute('data-theme',saved);
  btn.textContent = saved==='dark'?'🌙':'☀️';

  btn.addEventListener('click',()=>{
    const next = html.getAttribute('data-theme')==='dark'?'light':'dark';
    html.setAttribute('data-theme',next);
    btn.textContent = next==='dark'?'🌙':'☀️';
    localStorage.setItem('eltheme',next);
  });
})();


/* ────────────────────────────────────────────
   12. FORMULAIRE DE CONTACT
   ──────────────────────────────────────────── */
(function(){
  const form   = document.getElementById('contactForm');
  const ok     = document.getElementById('formOk');
  const sub    = document.getElementById('submitBtn');
  const subTxt = document.getElementById('submitTxt');
  const msg    = document.getElementById('msg');
  const count  = document.getElementById('msgCount');
  if(!form) return;

  // Compteur de caractères
  msg && msg.addEventListener('input',()=>{
    const l=msg.value.length;
    count.textContent=`${l}/400`;
    count.style.color=l>360?'var(--danger)':'';
  });

  const setErr=(id,errId,txt)=>{
    const el=document.getElementById(id), er=document.getElementById(errId);
    if(!el) return true;
    if(!el.value.trim()){ el.classList.add('err'); if(er){er.textContent=txt;er.classList.add('show');} return false; }
    el.classList.remove('err'); if(er) er.classList.remove('show'); return true;
  };

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const v1=setErr('prenom','prenomErr','Prénom requis.');
    const v2=setErr('nom','nomErr','Nom requis.');
    const v3=setErr('msg','msgErr','Message requis.');
    const emailEl=document.getElementById('cemail');
    const emailErr=document.getElementById('cemailErr');
    let v4=true;
    if(emailEl){
      const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value);
      if(!valid){ emailEl.classList.add('err'); if(emailErr){emailErr.textContent='Email invalide.';emailErr.classList.add('show');} v4=false; }
      else { emailEl.classList.remove('err'); if(emailErr) emailErr.classList.remove('show'); }
    }
    if(!v1||!v2||!v3||!v4) return;

    sub.disabled=true; subTxt.textContent='Envoi en cours…';
    setTimeout(()=>{
      sub.disabled=false; subTxt.textContent='Envoyer le message';
      form.querySelectorAll('input,textarea,select').forEach(f=>f.value='');
      if(count) count.textContent='0/400';
      if(ok){ ok.classList.add('show'); setTimeout(()=>ok.classList.remove('show'),6000); }
    },1500);
  });

  form.querySelectorAll('input,textarea').forEach(el=>
    el.addEventListener('focus',()=>el.classList.remove('err')));
})();


/* ────────────────────────────────────────────
   13. RETOUR EN HAUT
   ──────────────────────────────────────────── */
document.getElementById('topBtn')?.addEventListener('click',()=>
  window.scrollTo({top:0,behavior:'smooth'}));


/* ────────────────────────────────────────────
   14. PARALLAXE HERO
   ──────────────────────────────────────────── */
(function(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  window.addEventListener('scroll',()=>{
    const y=scrollY;
    if(y<innerHeight){
      hero.querySelectorAll('.hero-glow').forEach((g,i)=>{
        g.style.transform=`translateY(${y*(0.09+i*.04)}px)`;
      });
    }
  },{passive:true});
})();


/* ────────────────────────────────────────────
   15. EFFET MAGNÉTIQUE BOUTONS
   ──────────────────────────────────────────── */
(function(){
  document.querySelectorAll('.btn-primary,.btn-ghost').forEach(btn=>{
    btn.addEventListener('mousemove', e=>{
      const r=btn.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)*.2;
      const dy=(e.clientY-r.top-r.height/2)*.2;
      btn.style.transform=`translate(${dx}px,${dy}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transition='transform .45s cubic-bezier(.34,1.56,.64,1)';
      btn.style.transform='';
      setTimeout(()=>btn.style.transition='',450);
    });
  });
})();


/* ────────────────────────────────────────────
   16. TILT 3D SUR LES CARTES PROJET
   ──────────────────────────────────────────── */
(function(){
  document.querySelectorAll('.proj-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r=card.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform=`perspective(800px) rotateX(${-dy*6}deg) rotateY(${dx*6}deg) translateY(-7px)`;
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';
      card.style.transform='';
      setTimeout(()=>card.style.transition='',500);
    });
  });
})();


/* ────────────────────────────────────────────
   17. EASTER EGG CONSOLE
   ──────────────────────────────────────────── */
console.log('%c🌿 Bonjour !','font-size:20px;font-weight:bold;color:#34b778;padding:8px;');
console.log('%cPortfolio de ELISOA ANTSAMPIFALIANA Lucie\nÉtudiante L1 Informatique — EMIT Fianarantsoa 🇲🇬\nContact : antsampifalianaelisoalucie@gmail.com',
  'font-size:13px;color:#7aaa88;padding:4px;');
