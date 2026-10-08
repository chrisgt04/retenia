/* Retenia — medición compartida: Microsoft Clarity + eventos (Meta Pixel trackCustom + Clarity + dataLayer).
   Inclúyelo en el <head> de cualquier página: <script src="/assets/track.js"></script>
   Llama window.rtTrack('Evento', {..}) para eventos propios (ej. el formulario de /agendar). */
(function(){
  // Microsoft Clarity
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "yul43sqvd4");

  var page=location.pathname.replace(/\.html$/,'')||'/';
  function qp(n){try{return new URLSearchParams(location.search).get(n)||'';}catch(e){return '';}}
  try{
    clarity('set','pagina',page);
    if(qp('utm_source'))clarity('set','utm_source',qp('utm_source'));
    if(qp('utm_campaign'))clarity('set','utm_campaign',qp('utm_campaign'));
    if(qp('utm_content'))clarity('set','utm_content',qp('utm_content'));
  }catch(e){}

  function track(name,params){
    params=params||{};params.pagina=params.pagina||page;
    try{if(window.fbq)fbq('trackCustom',name,params);}catch(e){}
    try{if(window.clarity)clarity('event',name);}catch(e){}
    try{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:name},params));}catch(e){}
  }
  window.rtTrack=track;

  // Clics en CTAs (listener en window: sobrevive al runtime de los bundles)
  window.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a,button'):null;
    if(!a)return;
    var h=a.getAttribute('href')||'',label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
    var sticky=a.id==='rt-sticky';
    if(/\/agendar/.test(h))track('ClickAgendarDemo',{boton:label,sticky:sticky?'si':'no'});
    else if(/getpass/.test(h))track('ClickProbarTarjeta',{boton:label});
    else if(/wa\.me|api\.whatsapp/.test(h))track('ClickWhatsApp',{boton:label});
    else if(/^#/.test(h)&&h.length>1)track('ClickMenu',{seccion:h.slice(1)});
  },true);

  // Profundidad de scroll (una vez por umbral)
  var hit={};
  function onScroll(){
    var d=document.documentElement,max=(d.scrollHeight-window.innerHeight)||1,p=Math.round(window.scrollY/max*100);
    [50,90].forEach(function(t){if(p>=t&&!hit[t]){hit[t]=1;track('Scroll'+t);}});
  }
  window.addEventListener('scroll',onScroll,{passive:true});
})();
