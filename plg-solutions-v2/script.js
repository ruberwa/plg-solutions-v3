const pages = [
  ['Capabilities','capabilities.html'],
  ['Industries','industries.html'],
  ['About','about.html'],
  ['Contact','contact.html']
];

function injectShell(){
  const current = location.pathname.split('/').pop() || 'index.html';
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  if(header){
    header.innerHTML = `
      <header class="site-header">
        <div class="container nav">
          <a class="logo" href="index.html" aria-label="PLG Solutions home"><img src="assets/plg-logo.jpeg" alt="PLG Solutions"></a>
          <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span></button>
          <nav class="nav-links" aria-label="Primary navigation">
            ${pages.map(([label,href]) => `<a href="${href}" class="${current===href?'active':''}">${label}</a>`).join('')}
            <a class="nav-cta" href="contact.html">Start a conversation</a>
          </nav>
        </div>
      </header>`;
  }
  if(footer){
    footer.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid footer-grid-updated">
            <div class="footer-brand">
              <img src="assets/plg-logo.jpeg" alt="PLG Solutions">
              <p>PLG Solutions · Kigali, Rwanda · Building digital infrastructure for African institutions.</p>
            </div>
            <div><h4>Explore</h4><div class="footer-links"><a href="capabilities.html">Capabilities</a><a href="industries.html">Industries</a><a href="about.html">About</a><a href="contact.html">Contact</a></div></div>
            <div><h4>Contact</h4><div class="footer-links"><a href="mailto:hello@plgsolutions.com">hello@plgsolutions.com</a><span>PLG Building, KN 3 Ave</span><span>Opposite Kigali Serena Hotel</span><span>Kigali, Rwanda</span></div></div>
            <!-- Add approved registered entity name, company registration number, phone, LinkedIn, privacy notice and terms when supplied. -->
          </div>
          <div class="footer-bottom"><span>© <span data-year></span> PLG Solutions. All rights reserved.</span><span>Advanced technology, grounded delivery.</span></div>
        </div>
      </footer>`;
  }
}

injectShell();

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click',()=>{
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* Contact form ------------------------------------------------------------
   The client-supplied change list requires a live inbox. The front end is
   wired to POST to /api/contact. The deployment must provide that endpoint
   (or replace the action with the chosen CRM/form-service endpoint). */
const form = document.querySelector('#contactForm');
if(form){
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const success = form.querySelector('.form-success');
    const error = form.querySelector('.form-error');
    if(success) success.style.display='none';
    if(error) error.style.display='none';
    if(!form.reportValidity()) return;
    const submit = form.querySelector('[type="submit"]');
    const original = submit ? submit.textContent : '';
    if(submit){ submit.disabled = true; submit.textContent = 'Sending…'; }
    try{
      const body = new FormData(form);
      const response = await fetch(form.action, { method: form.method || 'POST', body, headers:{'Accept':'application/json'} });
      if(!response.ok) throw new Error('Submission failed');
      if(success) success.style.display='block';
      form.reset();
    }catch(err){
      if(error) error.style.display='block';
    }finally{
      if(submit){ submit.disabled = false; submit.textContent = original; }
    }
  });
}

/* Animated network visuals ------------------------------------------------ */
(function(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupGlobe(canvas, opts={}){
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w=0,h=0,dpr=1,t=0,raf;
    const cities = [
      [-0.12,51.5],[31.24,30.0],[55.27,25.2],[77.2,28.6],[103.8,1.35],[116.4,39.9],[139.7,35.7],[-74.0,40.7],[-122.4,37.8],[-46.6,-23.5],[18.4,-33.9],[151.2,-33.9],[28.0,-26.2]
    ].map(([lon,lat])=>({lon:lon*Math.PI/180,lat:lat*Math.PI/180}));

    function resize(){
      const r=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2); w=r.width; h=r.height;
      canvas.width=Math.max(1,Math.round(w*dpr)); canvas.height=Math.max(1,Math.round(h*dpr)); ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function project(lon,lat,rot,cx,cy,R){
      const L=lon+rot, cosLat=Math.cos(lat), x=cosLat*Math.sin(L), y=Math.sin(lat), z=cosLat*Math.cos(L);
      return {x:cx+x*R,y:cy-y*R,z};
    }
    function lineSphere(rot,cx,cy,R){
      ctx.lineWidth=.75;
      for(let lat=-60;lat<=60;lat+=30){
        ctx.beginPath(); let started=false;
        for(let lon=-180;lon<=180;lon+=4){
          const p=project(lon*Math.PI/180,lat*Math.PI/180,rot,cx,cy,R);
          if(p.z>-.1){ if(!started){ctx.moveTo(p.x,p.y);started=true}else ctx.lineTo(p.x,p.y)}
        }
        ctx.strokeStyle='rgba(154,207,242,.15)';ctx.stroke();
      }
      for(let lon=-150;lon<=180;lon+=30){
        ctx.beginPath(); let started=false;
        for(let lat=-90;lat<=90;lat+=3){
          const p=project(lon*Math.PI/180,lat*Math.PI/180,rot,cx,cy,R);
          if(p.z>-.1){ if(!started){ctx.moveTo(p.x,p.y);started=true}else ctx.lineTo(p.x,p.y)}
        }
        ctx.strokeStyle='rgba(154,207,242,.13)';ctx.stroke();
      }
    }
    function draw(){
      t += reduceMotion ? 0 : .0022;
      ctx.clearRect(0,0,w,h);
      const cx=w*(opts.cx ?? .58), cy=h*(opts.cy ?? .46), R=Math.min(w,h)*(opts.scale ?? .36);
      const glow=ctx.createRadialGradient(cx,cy,R*.15,cx,cy,R*1.18);glow.addColorStop(0,'rgba(35,135,204,.2)');glow.addColorStop(.7,'rgba(22,102,163,.08)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
      ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle='rgba(174,220,250,.28)';ctx.lineWidth=1.1;ctx.stroke();
      lineSphere(t,cx,cy,R);
      const pts=cities.map(c=>project(c.lon,c.lat,t,cx,cy,R));
      const edges=[[0,2],[0,7],[2,3],[3,4],[4,5],[4,12],[5,6],[7,8],[7,9],[2,10],[4,11],[10,12],[9,10]];
      edges.forEach(([a,b],idx)=>{
        const p1=pts[a],p2=pts[b]; if(p1.z<-.05||p2.z<-.05)return;
        const mx=(p1.x+p2.x)/2, my=(p1.y+p2.y)/2-Math.hypot(p2.x-p1.x,p2.y-p1.y)*.16;
        ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.quadraticCurveTo(mx,my,p2.x,p2.y);ctx.strokeStyle=`rgba(103,198,255,${.15 + (idx%3)*.06})`;ctx.lineWidth=.8;ctx.stroke();
      });
      pts.forEach((p,i)=>{if(p.z<-.08)return;const a=.35+.65*((p.z+1)/2);ctx.beginPath();ctx.arc(p.x,p.y,i%4===0?3.2:2.1,0,Math.PI*2);ctx.fillStyle=`rgba(126,212,255,${a})`;ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,8,0,Math.PI*2);ctx.strokeStyle=`rgba(126,212,255,${a*.16})`;ctx.stroke();});
      if(!reduceMotion) raf=requestAnimationFrame(draw);
    }
    resize();draw();window.addEventListener('resize',resize,{passive:true});
    if('ResizeObserver' in window){ const ro=new ResizeObserver(()=>resize()); ro.observe(canvas); if(canvas.parentElement) ro.observe(canvas.parentElement); }
  }

  function setupMap(canvas, seed=1){
    if(!canvas) return;
    const ctx=canvas.getContext('2d');let w=0,h=0,dpr=1,t=0,raf;let nodes=[];
    function rand(i){return (Math.sin(i*12.9898+seed*78.233)*43758.5453)%1}
    function rebuild(){
      const r=canvas.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);
      nodes=Array.from({length:26},(_,i)=>({x:(.08+Math.abs(rand(i))*0.84)*w,y:(.08+Math.abs(rand(i+40))*0.84)*h,r:i%6===0?3.6:2}));
    }
    function draw(){
      t+=reduceMotion?0:.008;ctx.clearRect(0,0,w,h);
      ctx.strokeStyle='rgba(128,200,245,.08)';ctx.lineWidth=1;
      for(let x=0;x<w;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
      nodes.forEach((n,i)=>{for(let j=i+1;j<nodes.length;j++){const m=nodes[j],d=Math.hypot(n.x-m.x,n.y-m.y);if(d<145){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.strokeStyle=`rgba(99,190,243,${Math.max(0,.18-d/900)})`;ctx.stroke()}}});
      nodes.forEach((n,i)=>{const pulse=1+Math.sin(t*2+i)*.2;ctx.beginPath();ctx.arc(n.x,n.y,n.r*pulse,0,Math.PI*2);ctx.fillStyle=i%5===0?'rgba(116,225,177,.95)':'rgba(122,207,255,.88)';ctx.fill();if(i%5===0){ctx.beginPath();ctx.arc(n.x,n.y,9+Math.sin(t+i)*2,0,Math.PI*2);ctx.strokeStyle='rgba(116,225,177,.22)';ctx.stroke()}});
      if(!reduceMotion)raf=requestAnimationFrame(draw)
    }
    rebuild();draw();window.addEventListener('resize',rebuild,{passive:true});
    if('ResizeObserver' in window){ const ro=new ResizeObserver(()=>rebuild()); ro.observe(canvas); if(canvas.parentElement) ro.observe(canvas.parentElement); }
  }

  document.querySelectorAll('[data-service-globe]').forEach(c=>setupGlobe(c,{cx:.5,cy:.5,scale:.44}));
  document.querySelectorAll('[data-network-map]').forEach((c,i)=>setupMap(c,i+1));
})();

/* Home What We Do stacked panels ------------------------------------------
   The dedicated Capabilities page now uses a normal grid, per the client
   change list. The home-page stack retains the previously approved cover
   interaction. */
(function(){
  const stacks = Array.from(document.querySelectorAll('[data-wwd-stack]'));
  if(!stacks.length) return;
  let raf = 0;

  function stickyTop(stack){
    const raw = getComputedStyle(stack).getPropertyValue('--wwd-sticky-top');
    const parsed = parseFloat(raw);
    if(Number.isFinite(parsed)) return parsed;
    const header = document.querySelector('.site-header');
    return (header ? header.getBoundingClientRect().height : 84) + 18;
  }

  function update(){
    raf = 0;
    stacks.forEach(stack => {
      const panels = Array.from(stack.querySelectorAll(':scope > [data-wwd-panel]'));
      if(!panels.length) return;
      const top = stickyTop(stack) + 2;
      let activeIndex = 0;
      panels.forEach((panel,index) => {
        if(panel.getBoundingClientRect().top <= top) activeIndex = index;
      });
      panels.forEach((panel,index) => {
        const active = index === activeIndex;
        panel.classList.toggle('is-active',active);
        panel.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    });
  }

  function requestUpdate(){
    if(raf) return;
    raf = requestAnimationFrame(update);
  }

  update();
  addEventListener('scroll',requestUpdate,{passive:true});
  addEventListener('resize',requestUpdate,{passive:true});
  if(window.visualViewport) window.visualViewport.addEventListener('resize',requestUpdate,{passive:true});
})();

/* Hero stock video: use motion only when the visitor allows it. */
const plgHeroVideo = document.querySelector('[data-hero-video]');
if(plgHeroVideo){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    plgHeroVideo.pause();
    plgHeroVideo.removeAttribute('autoplay');
  }else{
    const playPromise = plgHeroVideo.play();
    if(playPromise && typeof playPromise.catch === 'function') playPromise.catch(()=>{});
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden) plgHeroVideo.pause();
      else plgHeroVideo.play().catch(()=>{});
    });
  }
}

/* Lazy-play decorative background video only while it is useful. */
(function(){
  const videos = Array.from(document.querySelectorAll('[data-bg-video]'));
  if(!videos.length) return;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    videos.forEach(video=>{ video.pause(); video.removeAttribute('autoplay'); });
    return;
  }
  const videoObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const video = entry.target;
      if(entry.isIntersecting){
        const p = video.play();
        if(p && typeof p.catch === 'function') p.catch(()=>{});
      }else{
        video.pause();
      }
    });
  },{rootMargin:'180px 0px',threshold:.08});
  videos.forEach(video=>videoObserver.observe(video));
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) videos.forEach(v=>v.pause());
  });
})();

// Count-up treatment for the illustrative home-page metrics.
(() => {
  const counters = [...document.querySelectorAll('[data-count]')];
  if (!counters.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = (el) => {
    const target = Number(el.dataset.count || el.textContent || 0);
    if (reduceMotion || !Number.isFinite(target)) { el.textContent = target; return; }
    const duration = 950;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: .45 });
    counters.forEach(el => { el.textContent = '0'; observer.observe(el); });
  } else {
    counters.forEach(animate);
  }
})();

/* Media + canvas resilience ------------------------------------------------ */
(function(){
  const media = Array.from(document.querySelectorAll('.hero-bg-video,.cap-hero-video,.connected-bg-video,.visual-video-system video'));
  media.forEach(video=>{
    let ready = video.readyState >= 2;
    const markReady = ()=>{ ready = true; video.classList.remove('media-failed'); };
    const markFailed = ()=>{ if(!ready) video.classList.add('media-failed'); };
    video.addEventListener('loadeddata',markReady,{once:true});
    video.addEventListener('canplay',markReady,{once:true});
    video.addEventListener('error',markFailed);
    setTimeout(()=>{ if(video.readyState < 2) markFailed(); },6500);
  });

  const nudgeCanvases = ()=>window.dispatchEvent(new Event('resize'));
  window.addEventListener('load',()=>{ nudgeCanvases(); setTimeout(nudgeCanvases,180); setTimeout(nudgeCanvases,900); },{once:true});
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(nudgeCanvases).catch(()=>{});
})();
