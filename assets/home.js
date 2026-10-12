/* Retenia — interacción del home estático (sin frameworks).
   Cada bloque replica la lógica que tenía su componente en el bundle anterior. */
(function(){
  'use strict';
  var REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function onView(el, fn, th){
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function(es){ if (es[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold: th || 0.12 });
    io.observe(el);
  }
  // Reinicia animaciones CSS (equivale al "key" que remontaba nodos)
  function remount(el){ if (!el || !el.parentNode) return el; var c = el.cloneNode(true); el.parentNode.replaceChild(c, el); return c; }

  /* ---------- Revelado de secciones (.rv dentro de cada raíz) ---------- */
  $$('.sc-host > div').forEach(function(root){
    if (root.id === 'rt-sec-roi') return; // ROI lo maneja su propio bloque
    onView(root, function(){ root.classList.add('shown'); }, 0.12);
  });

  /* ---------- FAQ ---------- */
  (function(){
    var qs = $$('#faq .q');
    qs.forEach(function(q, i){
      var b = $('.qb', q);
      b.addEventListener('click', function(){
        var open = q.classList.contains('open');
        qs.forEach(function(x){ x.classList.remove('open'); $('.qb', x).setAttribute('aria-expanded', 'false'); });
        if (!open) { q.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });
  })();

  /* ---------- Negocios como el tuyo (Foto) ---------- */
  (function(){
    var sec = $('#casos'); if (!sec) return;
    var C = [
      { label: 'Cafeterías', photo: 'assets/fondos/cafeteria.webp', alt: 'barista atendiendo a clientes en una cafetería', pos: '30% center', bg: '#2b3a33', brand: 'Aroma Café', wa: 'María, te faltan 2 sellos para tu bebida gratis.', quote: 'Cada café suma un sello y Retenia le recuerda a tu cliente cuánto le falta para el gratis.' },
      { label: 'Restaurantes', photo: 'assets/fondos/restaurante.webp', alt: 'mesero entregando la carta', pos: '50% center', bg: '#3b2c1d', brand: 'La Trattoria', wa: 'Carlos, tu postre de cortesía te espera este fin de semana.', quote: 'Tus comensales reciben una cortesía para volver el fin de semana, sin que tú les escribas.' },
      { label: 'Tiendas', photo: 'assets/fondos/tienda.webp', alt: 'clienta pagando en el mostrador de una tienda', pos: '55% center', bg: '#3e2c35', brand: 'Mercado Local', wa: 'Ana, tienes $120 de cashback para tu próxima compra.', quote: 'Cada compra le deja cashback a tu cliente y Retenia le avisa cuando ya puede usarlo.' },
      { label: 'Gimnasios', photo: 'assets/fondos/gimnasio.webp', alt: 'entrenador revisando el plan de una socia', pos: '50% 30%', bg: '#1d262c', brand: 'Iron Gym', wa: 'Luis, ¡te extrañamos! Vuelve esta semana y suma puntos dobles.', quote: 'Si un socio deja de venir, Retenia le manda un “te extrañamos” con puntos dobles.' }
    ];
    var tabs = $$('.tab', sec), i = 0, user = false;
    function render(){
      var c = C[i];
      var ph = $('.fphoto', sec); if (ph) ph.style.background = c.bg;
      var img = remount($('.fimg', sec));
      if (img) { img.src = '/' + c.photo; img.alt = c.alt; img.style.objectPosition = c.pos; }
      var sw = remount($('.swap.qw', sec));
      if (sw) {
        var sp = $$('span', sw);
        sp.forEach(function(s){
          var t = s.textContent;
          if (/^Ejemplo · /.test(t) && !s.children.length) s.textContent = 'Ejemplo · ' + c.label;
          else if (/^“/.test(t) && !s.children.length) s.textContent = '“' + c.quote + '”';
        });
        var wa = $('small', sw);
        if (wa) { wa.textContent = 'WhatsApp · ' + c.brand; var p = wa.parentNode; while (wa.nextSibling) p.removeChild(wa.nextSibling); p.appendChild(document.createTextNode(c.wa)); }
      }
      tabs.forEach(function(t, k){ t.classList.toggle('sel', k === i); t.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    }
    tabs.forEach(function(t, k){ t.addEventListener('click', function(){ i = k; user = true; render(); }); });
    render();
    if (!REDUCE) setInterval(function(){ if (!user) { i = (i + 1) % C.length; render(); } }, 4200);
  })();

  /* ---------- Conoce a tus clientes (Datos) ---------- */
  (function(){
    var sec = $('#clientes'); if (!sec) return;
    var C = [
      { name: 'María García', ini: 'MG', av: '#1E7A52', visits: 14, last: 'Hace 2 días', fav: 'Latte de avena', seg: 'Frecuente', spent: '$2,940', ticket: '$210', freq: 'Cada 5 días', on: 9, top: [['Latte de avena', 11], ['Croissant', 6], ['Galleta de avena', 3]], when: 'en su próxima visita', msg: 'María, te falta 1 sello para tu latte gratis. ¡Te esperamos!' },
      { name: 'Carlos López', ini: 'CL', av: '#2F5A6E', visits: 9, last: 'Hace 26 días', fav: 'Americano y croissant', seg: 'En riesgo', spent: '$1,620', ticket: '$180', freq: 'Cada 8 días', on: 4, top: [['Americano', 9], ['Croissant', 7], ['Pan de elote', 2]], when: 'hoy, 9:00', msg: 'Carlos, te extrañamos. Hoy tu americano va con sello doble.' },
      { name: 'Sofía Ramos', ini: 'SR', av: '#9A6F85', visits: 22, last: 'Ayer', fav: 'Flat white', seg: 'VIP', spent: '$5,170', ticket: '$235', freq: 'Cada 3 días', on: 6, top: [['Flat white', 18], ['Pastel de zanahoria', 8], ['Cold brew', 4]], when: 'en su cumpleaños', msg: 'Sofía, feliz cumpleaños. Como clienta VIP, tu flat white de hoy va por nuestra cuenta.' },
      { name: 'Diego Ruiz', ini: 'DR', av: '#C08A3E', visits: 1, last: 'Hoy', fav: 'Cold brew', seg: 'Nuevo', spent: '$95', ticket: '$95', freq: 'Primera visita', on: 1, top: [['Cold brew', 1]], when: 'en 1 minuto', msg: '¡Bienvenido, Diego! Tu primer sello ya está en tu wallet.' },
      { name: 'Ana Martínez', ini: 'AM', av: '#5F3F52', visits: 11, last: 'Hace 4 días', fav: 'Chai latte', seg: 'Frecuente', spent: '$2,310', ticket: '$210', freq: 'Cada 6 días', on: 7, top: [['Chai latte', 10], ['Muffin de moras', 5], ['Té verde', 2]], when: 'el viernes', msg: 'Ana, este viernes tu chai latte suma doble sello.' },
      { name: 'Luis Herrera', ini: 'LH', av: '#26323A', visits: 6, last: 'Hace 34 días', fav: 'Capuchino', seg: 'En riesgo', spent: '$1,080', ticket: '$180', freq: 'Cada 10 días', on: 6, top: [['Capuchino', 6], ['Bagel', 3]], when: 'hoy, 9:00', msg: 'Luis, hace un mes que no te vemos. Tu capuchino de esta semana va 2×1.' },
      { name: 'Valeria Cruz', ini: 'VC', av: '#24506A', visits: 2, last: 'Hace 3 días', fav: 'Frappé de mocha', seg: 'Nuevo', spent: '$240', ticket: '$120', freq: 'Cada 4 días', on: 2, top: [['Frappé de mocha', 2]], when: 'mañana', msg: 'Valeria, llevas 2 de 10 sellos. Tu frappé gratis está más cerca.' },
      { name: 'Jorge Medina', ini: 'JM', av: '#176242', visits: 8, last: 'Hace 6 días', fav: 'Espresso doble', seg: 'Frecuente', spent: '$1,280', ticket: '$160', freq: 'Cada 7 días', on: 8, top: [['Espresso doble', 8], ['Brownie', 4]], when: 'el lunes', msg: 'Jorge, ¿tu espresso de los lunes? Te faltan 2 sellos para el gratis.' }
    ];
    var F = ['Todos', 'Frecuente', 'VIP', 'Nuevo', 'En riesgo'];
    var f = 'Todos', sel = 0;
    var ftabs = $$('.ftab', sec);
    var firstRow = $('.row', sec), tbl = firstRow && firstRow.parentNode, panel = $('.panel', sec);
    function segCls(s){ return s === 'En riesgo' ? 'seg-riesgo' : 'seg-' + s; }
    function rowHtml(c, isSel){
      return '<button type="button" class="row ' + (isSel ? 'sel' : '') + '" data-i="' + c.i + '" aria-pressed="' + (isSel ? 'true' : 'false') + '">'
        + '<span style="display: flex; align-items: center; gap: 10px; min-width: 0">'
        + '<span style="width: 32px; height: 32px; flex: none; border-radius: 50%; background: ' + c.av + '; color: #fff; display: grid; place-items: center; font-size: 12px; font-weight: 600">' + esc(c.ini) + '</span>'
        + '<span style="display: flex; flex-direction: column; line-height: 1.25; min-width: 0"><b style="font-size: 14.5px; font-weight: 500">' + esc(c.name) + '</b><small style="font-size: 12px; color: #7A8580">' + esc(c.spent) + ' en total</small></span>'
        + '</span>'
        + '<span class="cm" style="font-size: 14.5px">' + c.visits + '</span>'
        + '<span class="cm" style="font-size: 14px; color: ' + (c.seg === 'En riesgo' ? '#8A3A22' : '#46524D') + '">' + esc(c.last) + '</span>'
        + '<span class="cm" style="font-size: 14px; color: #46524D; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">' + esc(c.fav) + '</span>'
        + '<span><span class="chip ' + segCls(c.seg) + '">' + esc(c.seg) + '</span></span>'
        + '</button>';
    }
    function panelHtml(p){
      var stat = function(l, v){ return '<div style="padding: 12px 14px; border-radius: 14px; background: #fff; border: 1px solid rgba(14,26,21,.07)"><small style="display: block; font-size: 12px; color: #7A8580">' + l + '</small><span style="font-size: 22px; letter-spacing: -0.03em">' + esc(v) + '</span></div>'; };
      var top = p.top.map(function(t){ return '<div style="display: flex; justify-content: space-between; font-size: 14px; padding: 8px 0; border-bottom: 1px solid rgba(14,26,21,.07)"><span>' + esc(t[0]) + '</span><span style="color: #7A8580">' + t[1] + ' veces</span></div>'; }).join('');
      var st = ''; for (var k = 0; k < 10; k++) st += '<span style="aspect-ratio: 1; border-radius: 50%; background: ' + (k < p.on ? '#1E7A52' : 'transparent') + '; border: 1.5px solid #1E7A52; box-sizing: border-box"></span>';
      return '<div style="display: flex; align-items: center; gap: 14px">'
        + '<span style="width: 56px; height: 56px; border-radius: 50%; background: ' + p.av + '; color: #fff; display: grid; place-items: center; font-size: 18px; font-weight: 600">' + esc(p.ini) + '</span>'
        + '<span style="display: flex; flex-direction: column; gap: 4px"><b style="font-size: 20px; font-weight: 500; letter-spacing: -0.02em">' + esc(p.name) + '</b><span><span class="chip ' + segCls(p.seg) + '">' + esc(p.seg) + '</span></span></span>'
        + '</div>'
        + '<div class="pstat" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">' + stat('Visitas', p.visits) + stat('Gasto total', p.spent) + stat('Ticket promedio', p.ticket) + stat('Suele venir', p.freq) + '</div>'
        + '<div class="ptop" style="display: flex; flex-direction: column; gap: 8px"><small style="font-size: 12.5px; color: #7A8580">Lo que más consume</small>' + top + '</div>'
        + '<div class="pstamps" style="display: flex; flex-direction: column; gap: 8px"><small style="font-size: 12.5px; color: #7A8580">Su tarjeta · ' + p.on + ' de 10 sellos</small><div style="display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 5px">' + st + '</div></div>'
        + '<div style="margin-top: auto; border-radius: 16px; padding: 12px; background: #E9E2D8; display: flex; flex-direction: column; gap: 6px">'
        + '<small style="font-size: 12px; color: #46524D; display: flex; align-items: center; gap: 6px"><span style="width: 8px; height: 8px; border-radius: 50%; background: #25D366"></span>Próximo WhatsApp automático · ' + esc(p.when) + '</small>'
        + '<span style="align-self: flex-start; background: #fff; border-radius: 12px; padding: 9px 11px; font-size: 13.5px; line-height: 1.35; box-shadow: 0 1px 1px rgba(0,0,0,.06)">' + esc(p.msg) + '</span>'
        + '</div>';
    }
    function render(){
      var visible = C.map(function(c, i){ var o = {}; for (var k in c) o[k] = c[k]; o.i = i; return o; }).filter(function(c){ return f === 'Todos' || c.seg === f; });
      var selI = visible.some(function(c){ return c.i === sel; }) ? sel : (visible[0] ? visible[0].i : 0);
      ftabs.forEach(function(b, k){ b.classList.toggle('sel', F[k] === f); b.setAttribute('aria-pressed', F[k] === f ? 'true' : 'false'); });
      if (tbl) { $$('.row', tbl).forEach(function(r){ r.parentNode.removeChild(r); }); tbl.insertAdjacentHTML('beforeend', visible.map(function(c){ return rowHtml(c, c.i === selI); }).join('')); }
      if (panel) { panel = remount(panel); panel.innerHTML = panelHtml(C[selI]); }
    }
    ftabs.forEach(function(b, k){ b.addEventListener('click', function(){ f = F[k]; render(); }); });
    if (tbl) tbl.addEventListener('click', function(e){ var r = e.target.closest && e.target.closest('.row'); if (!r) return; sel = Number(r.getAttribute('data-i')); render(); });
    render();
  })();

  /* ---------- Calculadora de retorno (ROI) ---------- */
  (function(){
    var sec = $('#roi'); if (!sec) return;
    var root = $('.sc-host > div', sec);
    var PLAN = 1499;
    var st = { cli: 600, tk: 350, pc: 15, disp: 0, shown: false }, raf = 0;
    var r1 = $('#r1', sec), r2 = $('#r2', sec), r3 = $('#r3', sec);
    function k(n){ return $('[data-k="' + n + '"]', sec); }
    function setT(n, v){ var e = k(n); if (e) e.textContent = v; }
    function money(n){ return '$' + Math.round(n).toLocaleString('es-MX'); }
    function target(){ return st.cli * st.tk * st.pc / 100; }
    function fill(v, a, b){ var p = (v - a) / (b - a) * 100; return 'linear-gradient(90deg,#1E7A52 ' + p + '%,#DBE1DE ' + p + '%)'; }
    var paths = $$('path.line', sec), mark = $('.mark', sec), svg = $('svg[role="img"]', sec);
    function render(){
      var ex = target(), g = st.shown ? 1 : 0, perDay = ex / 30;
      var days = perDay > 0 ? Math.max(1, Math.ceil(PLAN / perDay)) : 0;
      var max = Math.max(ex * 12, PLAN * 12, 1);
      var X = function(m){ return 20 + m / 12 * 520; }, Y = function(v){ return 200 - v / max * 180; };
      var ext = '', cost = '';
      for (var m = 0; m <= 12; m++) { ext += (m ? ' L' : 'M') + X(m).toFixed(1) + ' ' + Y(ex * m * g).toFixed(1); cost += (m ? ' L' : 'M') + X(m).toFixed(1) + ' ' + Y(PLAN * m * g).toFixed(1); }
      var area = ext + ' L' + X(12) + ' 200 L' + X(0) + ' 200 Z';
      if (paths[0]) paths[0].setAttribute('d', area);
      if (paths[1]) paths[1].setAttribute('d', cost);
      if (paths[2]) paths[2].setAttribute('d', ext);
      var pm = Math.min(days / 30, 12);
      if (mark) mark.style.transform = 'translate(' + X(pm).toFixed(1) + 'px, ' + Y(PLAN * g).toFixed(1) + 'px)';
      if (svg) svg.setAttribute('aria-label', 'Ingreso extra acumulado de ' + money(ex * 12) + ' en 12 meses contra ' + money(PLAN * 12) + ' de costo del plan');
      setT('cliTxt', st.cli.toLocaleString('es-MX')); setT('tkTxt', money(st.tk)); setT('pcTxt', st.pc + '%');
      if (r1) r1.style.background = fill(st.cli, 100, 5000);
      if (r2) r2.style.background = fill(st.tk, 100, 3000);
      if (r3) r3.style.background = fill(st.pc, 5, 40);
      setT('exTxt', money(st.disp)); setT('yrTxt', money(ex * 12));
      setT('daysTxt', ex < PLAN ? '+30 días' : (days === 1 ? '1 día' : days + ' días'));
      setT('visTxt', Math.round(st.cli * st.pc / 100).toLocaleString('es-MX'));
      var x = ex / PLAN; setT('xTxt', (x >= 10 ? Math.round(x) : x.toFixed(1)) + '×');
    }
    function tween(){
      var to = target(); cancelAnimationFrame(raf);
      if (REDUCE) { st.disp = to; render(); return; }
      var from = st.disp, t0 = null;
      function step(t){ if (!t0) t0 = t; var p = Math.min((t - t0) / 900, 1); p = 1 - Math.pow(1 - p, 3); st.disp = from + (to - from) * p; render(); if (p < 1) raf = requestAnimationFrame(step); }
      raf = requestAnimationFrame(step);
    }
    [[r1, 'cli'], [r2, 'tk'], [r3, 'pc']].forEach(function(a){
      if (!a[0]) return;
      a[0].value = st[a[1]];
      var h = function(e){ var v = Number(e.target.value); if (st[a[1]] === v) return; st[a[1]] = v; render(); tween(); };
      a[0].addEventListener('input', h); a[0].addEventListener('change', h);
    });
    render();
    onView(root || sec, function(){ st.shown = true; if (root) root.classList.add('shown'); render(); tween(); }, 0.2);
  })();

  /* ---------- Cómo funciona: celular animado (Ciclo) ---------- */
  (function(){
    var sec = $('#como'); if (!sec) return;
    var SEQ = [[0,0,1400],[0,1,1100],[0,2,2000],[1,0,1500],[1,1,1500],[1,2,2100],[2,0,1900],[2,1,1500],[2,2,2100],[3,0,1300],[3,1,1600],[3,2,3800]];
    var STEPS = [
      { day: 'Día 1', channel: 'Wallet', title: 'Escanea el QR y guarda su tarjeta' },
      { day: 'Día 1', channel: 'WhatsApp', title: 'Recibe su bienvenida' },
      { day: 'Día 12', channel: 'WhatsApp', title: 'Si deja de venir, Retenia la invita' },
      { day: 'Día 14', channel: 'Wallet', title: 'Regresa, completa su tarjeta y gana' }
    ];
    var steps = $$('.step', sec), dots = $$('.dots button', sec), stamps = $$('.st', sec), msgs = $$('.msgs .m', sec);
    var cfs = $$('.cf', sec);
    var t = 0, idx = 0;
    function dur(s){ var d = 0; SEQ.forEach(function(q){ if (q[0] === s) d += q[2]; }); return d + 'ms'; }
    function tog(sel, on, cls){ var e = typeof sel === 'string' ? $(sel, sec) : sel; if (e) e.classList.toggle(cls || 'on', !!on); }
    function txt(sel, v){ var e = $(sel, sec); if (e) e.textContent = v; }
    function render(){
      var a = SEQ[idx][0], k = SEQ[idx][1];
      var n = a === 0 ? (k >= 2 ? 1 : 0) : a === 3 ? (k === 0 ? 8 : 10) : 1;
      txt('.sb span', a >= 2 ? '10:24' : '9:12');
      tog('.sb', (a === 0 && k === 0) || (a === 2 && k === 0), 'lt');
      tog('.L.scan', a === 0 && k === 0);
      tog('.L.wal', (a === 0 && k >= 1) || (a === 1 && k === 0) || a === 3);
      tog('.pass', a === 3 && k >= 1, 'gold');
      tog('.toast', a === 0 && k >= 2);
      stamps.forEach(function(s, j){
        var lit = j < n, was = s.classList.contains('on');
        s.classList.toggle('on', lit); s.classList.toggle('gd', lit && j === 9);
        s.textContent = lit ? (j === 9 ? '★' : '✓') : '';
        s.style.animationDelay = (a === 3 && j >= 8) ? ((j - 8) * 0.25) + 's' : '0s';
        if (lit && !was) { s.style.animation = 'none'; void s.offsetWidth; s.style.animation = ''; }
      });
      var cnt = $$('.pass .ph-v', sec)[1]; if (cnt) cnt.textContent = n === 10 ? '¡Premio!' : (n + ' de 10');
      tog('.L.lock', a === 2 && k === 0);
      tog('.L.chat', (a === 1 && k >= 1) || (a === 2 && k >= 1));
      var mon = [a >= 1, a === 2 || (a === 1 && k >= 1), a === 2 || (a === 1 && k >= 2), a === 2, a === 2, a === 2 && k >= 2];
      msgs.forEach(function(m, j){ m.classList.toggle('on', !!mon[j]); });
      tog('.ban', (a === 1 && k === 0) || (a === 3 && k === 2));
      txt('.ban .bd', a === 3 ? '¡Felicidades María! 🎉 Tu bebida es gratis.' : '¡Hola María! 👋 Bienvenida a Aroma Café.');
      var win = $('.L.win', sec), wasWin = win && win.classList.contains('on');
      tog(win, a === 3 && k === 2);
      if (win && a === 3 && k === 2 && !wasWin) cfs.forEach(function(c){ c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; });
      tog('.fchip', a === 3 && k === 2);
      txt('.cap .dy', STEPS[a].day + ' · ' + STEPS[a].channel);
      txt('.cap .tt', STEPS[a].title);
      steps.forEach(function(s, j){
        var act = j === a, was = s.classList.contains('act');
        s.classList.toggle('act', act);
        var bar = $('.bar i', s); if (bar) { bar.style.animationDuration = dur(j); if (act && !was) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; bar.style.animationDuration = dur(j); } }
      });
      dots.forEach(function(d, j){ d.classList.toggle('act', j === a); });
    }
    function go(i){
      clearTimeout(t);
      if (REDUCE) { idx = SEQ.length - 1; render(); return; }
      idx = i; render();
      t = setTimeout(function(){ go((i + 1) % SEQ.length); }, SEQ[i][2]);
    }
    function jump(j){ for (var q = 0; q < SEQ.length; q++) if (SEQ[q][0] === j) { go(q); return; } }
    steps.forEach(function(s, j){ s.addEventListener('click', function(){ jump(j); }); });
    dots.forEach(function(d, j){ d.addEventListener('click', function(){ jump(j); }); });
    render();
    onView($('.sc-host > div', sec) || sec, function(){ go(0); }, 0.2);
  })();

  /* ---------- Video del hero: intenta con sonido; si no, silencio + sonido al primer toque ---------- */
  (function(){
    var unlocked = false;
    function v(){ return $('.vd-v'); }
    function ui(on){ var b = $('.vd-snd'); if (!b) return;
      if (on) { b.classList.add('on'); b.textContent = '🔇 Silenciar'; b.setAttribute('aria-label', 'Silenciar'); }
      else { b.classList.remove('on'); b.textContent = '🔊 Toca para escuchar'; b.setAttribute('aria-label', 'Activar sonido'); } }
    function track(n, p){ try { window.rtTrack && rtTrack(n, p); } catch (_) {} }
    function soundOn(restart){ var el = v(); if (!el) return; unlocked = true; el.muted = false; if (restart) try { el.currentTime = 0; } catch (_) {} var p = el.play(); if (p && p.catch) p.catch(function(){}); ui(true); }
    var el = v();
    if (el) {
      el.playsInline = true; el.setAttribute('playsinline', ''); el.muted = false;
      var p = el.play();
      var fb = function(){ el.muted = true; el.setAttribute('muted', ''); var q = el.play(); if (q && q.catch) q.catch(function(){}); ui(false); };
      if (p && p.then) p.then(function(){ unlocked = true; ui(true); track('VideoSonidoAuto', { video: 'demo2' }); }, fb); else fb();
      if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { var q = el.play(); if (q && q.catch) q.catch(function(){}); } else el.pause(); }); }, { threshold: 0.4 }).observe(el);
    }
    function first(e){ if (unlocked) return; if (e.target.closest && e.target.closest('.vd-snd,a.cta2')) return; if (!v()) return; soundOn(true); track('VideoSonidoOn', { video: 'demo2', via: 'primer_toque' }); }
    ['pointerdown', 'touchend', 'keydown'].forEach(function(n){ window.addEventListener(n, first, true); });
    document.addEventListener('click', function(e){
      var c = e.target.closest && e.target.closest('a.cta2');
      if (c) { var vv = v(); if (vv) { e.preventDefault(); vv.scrollIntoView({ behavior: 'smooth', block: 'center' }); soundOn(true); track('VideoSonidoOn', { video: 'demo2', via: 'ver_como_funciona' }); } return; }
      var b = e.target.closest && e.target.closest('.vd-snd'); if (!b) return;
      var el2 = v(); if (!el2) return;
      if (el2.muted) { soundOn(true); track('VideoSonidoOn', { video: 'demo2' }); }
      else { el2.muted = true; ui(false); track('VideoSonidoOff', { video: 'demo2' }); }
    });
  })();
})();
