/* Retenia — inyecta las secciones compartidas de la landing de conversión.
   Requiere un <div id="rt-sections"></div> y assets/lp.css. */
(function(){
  var mount=document.getElementById('rt-sections');
  if(!mount) return;
  // símbolos SVG (#wa logo WhatsApp, #qrpat patrón QR) usados por los celulares
  if(!document.getElementById('wa')){
    var sym=document.createElement('div');
    sym.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true">'
      +'<symbol id="wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.86 9.86 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"/></symbol>'
      +'<symbol id="qrpat" viewBox="0 0 100 100"><rect x="2" y="2" width="26" height="26" fill="none" stroke="currentColor" stroke-width="5"/><rect x="11" y="11" width="8" height="8" fill="currentColor"/><rect x="72" y="2" width="26" height="26" fill="none" stroke="currentColor" stroke-width="5"/><rect x="81" y="11" width="8" height="8" fill="currentColor"/><rect x="2" y="72" width="26" height="26" fill="none" stroke="currentColor" stroke-width="5"/><rect x="11" y="81" width="8" height="8" fill="currentColor"/><path fill="currentColor" d="M36 6h6v6h-6zM48 6h6v6h-6zM60 12h6v6h-6zM36 18h6v6h-6zM54 24h6v6h-6zM6 36h6v6H6zM18 36h6v6h-6zM30 36h6v6h-6zM42 42h6v6h-6zM54 36h6v6h-6zM66 42h6v6h-6zM78 36h6v6h-6zM90 42h6v6h-6zM6 54h6v6H6zM24 54h6v6h-6zM36 60h6v6h-6zM48 54h6v6h-6zM66 60h6v6h-6zM84 54h6v6h-6zM36 78h6v6h-6zM48 84h6v6h-6zM60 78h6v6h-6zM72 84h6v6h-6zM84 78h6v6h-6zM90 90h6v6h-6z"/></symbol>'
      +'</svg>';
    document.body.appendChild(sym.firstChild);
  }
  var mxn=function(n){return '$'+n.toLocaleString('es-MX');};
  var PLANS=[
    {name:'Starter',m:999,a:799,pop:false,feats:['Sin límite de usuarios','1 tipo de tarjeta','1 manager','Hasta 1,000 clientes','Recordatorios por WhatsApp']},
    {name:'Growth',m:1499,a:1199,pop:true,feats:['Todo lo de Starter','3 tipos de tarjetas','10 managers','Hasta 5,000 clientes','Campañas y segmentación']},
    {name:'Pro',m:3999,a:3199,pop:false,feats:['Todo lo de Growth','10 tipos de tarjetas','50 managers','Clientes ilimitados','Diseño 100% a medida']}
  ];
  var TESTI=[
    {img:'/heroimages/4.png',name:'María Rodríguez',role:'Dueña · Cafetería La Esquina · CDMX',q:'Antes dependía de que la gente se acordara de nosotros. Ahora Retenia les manda el aviso y regresan por su décimo café. En 3 meses cambió el flujo del negocio.',r:'+40% clientes recurrentes'},
    {img:'/heroimages/1.png',name:'Carlos García',role:'Dueño · Restaurante El Fogón · Monterrey',q:'Lo configuré en una tarde y la primera campaña llenó el fin de semana. Recuperé lo que invertí en dos semanas, sin gastar de más en publicidad.',r:'ROI en 2 semanas'},
    {img:'/heroimages/2.png',name:'Laura Pérez',role:'Gerente · Salón Glamour · Guadalajara',q:'Mis clientas reservan cuando les llega el recordatorio. Ya no persigo a nadie; el sistema lo hace por mí y la agenda se mantiene llena.',r:'90 citas al mes'},
    {img:'/heroimages/5.png',name:'Daniela Ruiz',role:'Dueña · Iron Gym · Monterrey',q:'Socios que ya no venían volvieron con una promo de puntos. Tener la tarjeta en el wallet hace que no se olviden del gym.',r:'120 socios reactivados'},
    {img:'/heroimages/7.png',name:'Andrés Molina',role:'Dueño · Huellitas Vet · Puebla',q:'Los recordatorios de vacunas y desparasitación hacen que los dueños regresen a tiempo. Subió muchísimo la recurrencia de consultas.',r:'180 pacientes al mes'},
    {img:'/heroimages/6.png',name:'Valeria Ortiz',role:'Dueña · Pádel Club Norte · Monterrey',q:'Los jugadores acumulan puntos por cada reserva y los canjean por cancha gratis. Reservan directo desde el mensaje, sin llamar.',r:'70 reservas por semana'}
  ];
  var FAQ=[
    ['¿Mis clientes tienen que descargar una app?','No. La tarjeta se guarda en Apple Wallet o Google Wallet, que ya vienen en el teléfono. Un escaneo de QR y listo.'],
    ['¿Sirve para mi tipo de negocio?','Sí. Cafeterías, restaurantes, gimnasios, salones, retail, panaderías, consultorios, veterinarias y más. Se adapta a tu giro en minutos.'],
    ['¿Cuánto tarda en estar listo?','Minutos. Diseñas tu tarjeta y la lanzas el mismo día, sin desarrolladores ni integraciones complejas.'],
    ['¿Cómo llegan los recordatorios?','Por WhatsApp (y otros canales como complemento), en el momento justo: sellos, premios, cumpleaños y promociones.'],
    ['¿Necesito WhatsApp Business?','Te ayudamos a conectarlo. Es opcional para arrancar, pero potencia los recordatorios y la recompra.'],
    ['¿Puedo medir resultados?','Sí. Ves quién regresa, cada cuánto, cuánto gasta y qué recompensa convierte mejor.']
  ];
  function card(ic,h,p){return '<div class="rt-card"><div class="ic">'+ic+'</div><h3>'+h+'</h3><p>'+p+'</p></div>';}
  function demoCta(cls,txt){return '<a href="#demo" data-demo class="'+cls+'">'+(txt||'Agendar demo')+' &rarr;</a>';}
  var WCARDS=[
    {i:'A',brand:'Aroma Café',sub:'Tarjeta de sellos',chip:'SELLOS',metric:'7 / 10',note:'La 10ª bebida va gratis',grad:'linear-gradient(145deg,#1E7A52,#133f2c)',stamps:7,st:10},
    {i:'I',brand:'Iron Gym',sub:'Miembro Gold',chip:'PUNTOS',metric:'2,450',note:'550 pts para tu próximo premio',grad:'linear-gradient(145deg,#176242,#0e4a3b)',prog:82},
    {i:'B',brand:'Bella Spa',sub:'Programa cashback',chip:'CASHBACK',metric:'$245.00',note:'5% de cashback en cada visita',grad:'linear-gradient(145deg,#1F9371,#14604a)',prog:55},
    {i:'T',brand:'La Trattoria',sub:'Gift card',chip:'GIFT',metric:'$500.00',note:'Regalo en cualquier sucursal',grad:'linear-gradient(145deg,#E8B96B,#b98a3e)',dark:true},
    {i:'B',brand:'Barber & Co',sub:'Nivel VIP',chip:'NIVEL',metric:'VIP',note:'Beneficios exclusivos',grad:'linear-gradient(145deg,#24392f,#0f1714)',prog:100},
    {i:'D',brand:'Dulce Pan',sub:'Promo del día',chip:'PROMO',metric:'2 × 1',note:'En pan recién horneado',grad:'linear-gradient(145deg,#2B8C5D,#1E6B4A)'}
  ];
  function wcard(c){
    var extra = c.stamps!=null
      ? '<div class="wstamps">'+Array.apply(null,{length:c.st}).map(function(_,i){return '<span class="'+(i<c.stamps?'on':'')+'"></span>';}).join('')+'</div>'
      : (c.prog?'<div class="wbar"><i style="width:'+c.prog+'%"></i></div>':'');
    return '<div class="wcard'+(c.dark?' dark':'')+'" style="background:'+c.grad+'">'
      +'<div class="wtop"><div class="wlogo"><div class="wdot">'+c.i+'</div><div><div class="wb">'+c.brand+'</div><div class="ws">'+c.sub+'</div></div></div><span class="wchip">'+c.chip+'</span></div>'
      +'<div class="wmetric">'+c.metric+'</div><div class="wnote">'+c.note+'</div>'+extra+'</div>';
  }
  function walletPhone(){
    var st='';for(var i=0;i<10;i++){st+='<span class="'+(i<7?'on':'')+'"></span>';}
    return '<div class="mphone"><div class="mscr">'
      +'<div class="w-top"><b>Wallet</b><span class="add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></div>'
      +'<div class="stack"><div class="peek p1"></div><div class="peek p2"></div>'
      +'<div class="pass-in"><div class="gpass g-cafe">'
      +'<div class="gp-top"><span class="gp-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4ZM6 2v2M10 2v2M14 2v2"/></svg></span>'
      +'<span class="gp-brand"><span class="b">Aroma Café</span><span class="s">Tarjeta de sellos</span></span><span class="gp-chip">Sellos</span></div>'
      +'<div class="gp-stamps">'+st+'</div>'
      +'<div class="gp-note">7 de 10 · la 10ª bebida va gratis</div>'
      +'<div class="gp-foot"><svg class="qr" viewBox="0 0 100 100"><use href="#qrpat"></use></svg><span class="who"><span class="t">Titular</span><span class="n">María García</span></span></div>'
      +'</div></div></div>'
      +'<div class="ph-toast"><span class="ti"><svg viewBox="0 0 24 24"><use href="#wa"></use></svg></span><span class="tt"><small>WhatsApp · Aroma Café</small><span>¡Hola María! Te faltan 3 sellos para tu bebida gratis.</span></span></div>'
      +'</div></div>';
  }
  function chatPhone(){
    return '<div class="mphone chat"><div class="chat-screen">'
      +'<div class="chat-head"><span class="chat-av"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4ZM6 2v2M10 2v2M14 2v2"/></svg></span>'
      +'<span class="chat-name"><b>Aroma Café</b><span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 9.6 4.4 6.2 4l-.4 3.4L3 9.5 4.4 12.5 3 15.5l2.8 2.1.4 3.4 3.4-.4L12 23l2.4-2.4 3.4.4.4-3.4 2.8-2.1-1.4-3 1.4-3-2.8-2.1-.4-3.4-3.4.4Z"/></svg>Cuenta de empresa</span></span></div>'
      +'<div class="chat-body"><span class="chat-day">Hoy</span>'
      +'<div class="bub in">¡Hola María! Llevas 8 de 10 sellos en Aroma Café. Te faltan 2 para tu bebida gratis.<time>9:40</time></div>'
      +'<div class="bub in">Tu tarjeta ya está en tu wallet.<span class="bub-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>Ver mi tarjeta</span><time>9:40</time></div>'
      +'<div class="bub out">¡Paso hoy en la tarde!<time>9:41<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5l4 4 8-9M10 16.5l1 1 8-9"/></svg></time></div>'
      +'<div class="bub in">Te esperamos. Hoy tu sello cuenta doble.<time>9:41</time></div>'
      +'</div></div></div>';
  }

  var html='';
  /* CARRUSEL ANIMADO DE TARJETAS */
  var wc=WCARDS.map(wcard).join('');
  html+='<section class="rt-sec rt-dark" style="padding-bottom:clamp(40px,5vw,60px)"><div class="rt-wrap"><div class="rt-head">'
    +'<span class="rt-eyebrow">Así se ven en el wallet</span><h2 class="rt-h2">Tarjetas que viven en el teléfono de tus clientes</h2>'
    +'<p class="rt-lead">Sellos, puntos, cashback, gift cards, membresías y cupones. Cada logro se le recuerda por WhatsApp.</p></div></div>'
    +'<div class="rt-marquee"><div class="rt-track">'+wc+wc+'</div></div></section>';
  /* VENTAJAS */
  html+='<section class="rt-sec rt-cream"><div class="rt-wrap">'
    +'<div class="rt-head"><span class="rt-eyebrow">Por qué Retenia</span><h2 class="rt-h2">Retener sale más barato que <em>volver a empezar</em></h2><p class="rt-lead">Tus mejores clientes son los que ya tienes. Retenia los hace volver con una tarjeta de lealtad que viven en su wallet.</p></div>'
    +'<div class="rt-stats">'
      +'<div class="rt-stat"><div class="n">5×</div><div class="l">más barato retener que adquirir</div><div class="src">Invesp</div></div>'
      +'<div class="rt-stat"><div class="n">+95%</div><div class="l">más utilidad subiendo la retención 5%</div><div class="src">Bain &amp; Company</div></div>'
      +'<div class="rt-stat"><div class="n">65%</div><div class="l">de las ventas vienen de clientes actuales</div><div class="src">Benchmark de industria</div></div>'
    +'</div>'
    +'<div class="rt-grid">'
      +card('◆','En el wallet que ya traen','Tu tarjeta vive en Apple Wallet y Google Wallet. Sin apps que descargar ni fricción.')
      +card('↺','Se recuerdan solas','Cada sello, premio o cumpleaños se le avisa a tu cliente por WhatsApp en el momento justo.')
      +card('⚡','Listo el mismo día','Sin desarrolladores. Diseña tu tarjeta, lánzala y empieza a fidelizar hoy.')
      +card('📈','Mide lo que importa','Ve quién regresa, cuánto gasta y qué recompensa convierte mejor.')
    +'</div>'
  +'</div></section>';

  /* CÓMO FUNCIONA (split + celular wallet animado) */
  function ico(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
  var STEPS=[
    [ico('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>'),'Diseña tu tarjeta','Elige sellos, puntos, cashback o membresía y ponle tu marca.'],
    [ico('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>'),'Tus clientes la guardan','Escanean un QR y la tarjeta queda en su wallet. Sin apps que descargar.'],
    [ico('<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),'Se les recuerda','Retenia les avisa por WhatsApp cuando les falta poco para su premio.'],
    [ico('<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>'),'Vuelven más seguido','Cada visita suma. Tus clientes regresan solos, sin perseguirlos.']
  ];
  var stepCards=STEPS.map(function(s){return '<div class="rt-card"><div class="ic">'+s[0]+'</div><h3>'+s[1]+'</h3><p>'+s[2]+'</p></div>';}).join('');
  html+='<section class="rt-sec rt-dark"><div class="rt-wrap">'
    +'<div class="rt-head"><span class="rt-eyebrow">Cómo funciona</span><h2 class="rt-h2">Lanza tu programa de lealtad hoy</h2>'
    +'<p class="rt-lead">Así vive tu tarjeta en el teléfono de tus clientes — y así los traes de vuelta por WhatsApp.</p></div>'
    +'<div class="rt-grid">'+stepCards+'</div>'
    +'<div class="rt-phones" style="margin-top:48px">'+walletPhone()+chatPhone()+'</div>'
    +'<div class="rt-center">'+demoCta('rt-cta-green')+'</div>'
    +'</div></section>';

  /* PRECIOS */
  var plansHtml=PLANS.map(function(p){
    return '<div class="rt-plan'+(p.pop?' pop':'')+'">'+(p.pop?'<span class="badge">Más popular</span>':'')
      +'<div class="pname">'+p.name+'</div>'
      +'<div class="price" data-m="'+p.m+'" data-a="'+p.a+'">'+mxn(p.m)+' <small>MXN</small></div>'
      +'<div class="per">por mes · facturado mensual</div>'
      +'<ul>'+p.feats.map(function(f){return '<li>'+f+'</li>';}).join('')+'</ul>'
      +demoCta(p.pop?'rt-cta-green':'rt-cta-green')
    +'</div>';
  }).join('');
  html+='<section class="rt-sec rt-sage"><div class="rt-wrap">'
    +'<div class="rt-head"><span class="rt-eyebrow">Precios</span><h2 class="rt-h2">Planes que crecen contigo</h2><p class="rt-lead">Sin comisiones por cliente. Cambia de plan cuando quieras.</p></div>'
    +'<div class="rt-toggle"><button class="on" data-cycle="m">Mensual</button><button data-cycle="a">Anual · ahorra 20%</button></div>'
    +'<div class="rt-plans">'+plansHtml+'</div>'
  +'</div></section>';

  /* TESTIMONIOS */
  var tHtml=TESTI.map(function(t){
    return '<div class="rt-t"><div class="stars">★★★★★</div><p class="quote">“'+t.q+'”</p><span class="result">'+t.r+'</span>'
      +'<div class="who"><img src="'+t.img+'" alt="'+t.name+'" loading="lazy"><div><b>'+t.name+'</b><span>'+t.role+'</span></div></div></div>';
  }).join('');
  html+='<section class="rt-sec rt-dark"><div class="rt-wrap">'
    +'<div class="rt-head"><span class="rt-eyebrow">Historias reales</span><h2 class="rt-h2">Negocios que ya hacen <em>volver</em> a sus clientes</h2></div>'
    +'<div class="rt-tgrid">'+tHtml+'</div>'
  +'</div></section>';

  /* FAQ */
  var fHtml=FAQ.map(function(f){return '<div class="rt-q"><button type="button">'+f[0]+'</button><div class="a">'+f[1]+'</div></div>';}).join('');
  html+='<section class="rt-sec rt-cream"><div class="rt-wrap">'
    +'<div class="rt-head"><span class="rt-eyebrow">Preguntas frecuentes</span><h2 class="rt-h2">Lo que seguro te preguntas</h2></div>'
    +'<div class="rt-faq">'+fHtml+'</div>'
  +'</div></section>';

  /* CTA FINAL */
  html+='<section class="rt-sec rt-dark rt-final"><div class="rt-wrap">'
    +'<h2 class="rt-h2">¿Listo para que tus clientes <em>vuelvan solos</em>?</h2>'
    +'<p class="rt-lead" style="margin-inline:auto;max-width:48ch">Agenda una demo de 30 minutos, personalizada para tu negocio.</p>'
    +demoCta('rt-cta')+'<div class="rt-micro">Sin compromiso · te mostramos Retenia en vivo</div>'
  +'</div></section>';

  mount.innerHTML=html;

  /* toggle precios */
  var tog=mount.querySelectorAll('.rt-toggle button');
  tog.forEach(function(b){b.addEventListener('click',function(){
    tog.forEach(function(x){x.classList.remove('on');});b.classList.add('on');
    var c=b.getAttribute('data-cycle');
    mount.querySelectorAll('.rt-plan .price').forEach(function(pr){
      var v=pr.getAttribute(c==='a'?'data-a':'data-m');
      pr.innerHTML='$'+Number(v).toLocaleString('es-MX')+' <small>MXN</small>';
      pr.nextElementSibling.textContent=c==='a'?'por mes · facturado anual':'por mes · facturado mensual';
    });
  });});

  /* acordeón faq */
  mount.querySelectorAll('.rt-q button').forEach(function(b){b.addEventListener('click',function(){
    b.parentElement.classList.toggle('open');
  });});
})();
