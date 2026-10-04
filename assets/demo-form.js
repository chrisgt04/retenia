/* Retenia — Popup "Agendar demo" compartido.
   Úsalo en cualquier landing: <script src="/assets/demo-form.js" defer></script>
   Dispara con cualquier <a href="#demo"> o [data-demo].
   Envía a n8n (webhook) con gating (>1 sucursal y ticket>=300) y redirige a Calendly. */
(function(){
  var CAL="https://calendly.com/hola-retenia/30min";
  var HOOK="https://n8n.unifai.com.mx/webhook/87e15310-bc00-4a0d-a3cf-a5e1b724b389";
  var LADAS=[["🇲🇽","+52"],["🇺🇸","+1"],["🇨🇴","+57"],["🇦🇷","+54"],["🇨🇱","+56"],["🇵🇪","+51"],["🇪🇨","+593"],["🇬🇹","+502"],["🇪🇸","+34"]];
  var GIROS=["Cafetería","Restaurante","Estética / Salón de belleza","Gimnasio / Fitness","Tienda / Retail","Panadería","Consultorio","Veterinaria","Servicios profesionales","Área de juegos infantil","Otro"];
  var SUC=["1","2 – 5","6 – 10","11 – 20","Más de 20"];
  var ROLES=["Dueño / Dueña","Gerente","Marketing","Otro"];
  var TICKETS=["Menos de $100","$100 – $300","$300 – $600","$600 – $1,000","$1,000 – $3,000","Más de $3,000"];
  var CSS="#rt-ov{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(10,16,14,.55);backdrop-filter:blur(4px);padding:18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}"
  +"#rt-ov.open{display:flex}#rt-modal{background:#faf9f5;color:#0f1714;width:100%;max-width:470px;max-height:93vh;overflow:auto;border-radius:22px;padding:26px 24px 22px;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);position:relative}"
  +"#rt-modal h3{font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0 6px 4px 0}#rt-modal .rt-sub{font-size:14px;color:#5f6864;margin:0 0 16px}"
  +"#rt-x{position:absolute;top:12px;right:14px;border:0;background:none;font-size:26px;line-height:1;color:#5f6864;cursor:pointer}"
  +"#rt-modal label{display:block;font-size:12.5px;font-weight:600;margin:12px 0 5px;color:#24392f}"
  +"#rt-modal input,#rt-modal select{width:100%;padding:11px 13px;border:1px solid rgba(15,23,20,.16);border-radius:12px;font-size:15px;background:#fff;color:#0f1714;outline:none;font-family:inherit}"
  +"#rt-modal input:focus,#rt-modal select:focus{border-color:#1E7A52;box-shadow:0 0 0 3px rgba(30,122,82,.15)}"
  +".rt-phone{display:flex;gap:8px}.rt-phone select{width:122px;flex:none}.rt-row{display:flex;gap:10px}.rt-row>div{flex:1;min-width:0}"
  +"#rt-go{width:100%;margin-top:18px;padding:14px;border:0;border-radius:999px;background:#1E7A52;color:#fff;font-size:16px;font-weight:700;cursor:pointer}#rt-go:hover{background:#176242}#rt-go:disabled{opacity:.6;cursor:default}"
  +"#rt-err{color:#b4232a;font-size:13px;margin-top:8px;display:none}";
  function opt(a){return '<option value="">Selecciona…</option>'+a.map(function(v){return '<option>'+v+'</option>';}).join('');}
  function ladaOpts(){return LADAS.map(function(l,i){return '<option value="'+l[1]+'"'+(i===0?' selected':'')+'>'+l[0]+' '+l[1]+'</option>';}).join('');}
  function qp(n){try{return new URLSearchParams(location.search).get(n)||"";}catch(e){return "";}}
  function ck(n){var m=document.cookie.match('(^|;)\\s*'+n+'\\s*=\\s*([^;]+)');return m?m.pop():"";}
  var modal=null,sent=false;
  function build(){
    var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
    var ov=document.createElement('div');ov.id='rt-ov';
    ov.innerHTML='<div id="rt-modal" role="dialog" aria-modal="true" aria-label="Agenda tu demo">'
    +'<button id="rt-x" aria-label="Cerrar">&times;</button>'
    +'<h3>Agenda tu demo</h3><p class="rt-sub">Déjanos tus datos y elige un horario. Te mostramos Retenia en 30 minutos.</p>'
    +'<form id="rt-form" novalidate>'
    +'<label>Nombre*</label><input name="nombre" required autocomplete="name">'
    +'<label>Empresa / Negocio*</label><input name="negocio" required>'
    +'<label>WhatsApp*</label><div class="rt-phone"><select name="lada">'+ladaOpts()+'</select><input name="telefono" required inputmode="numeric" placeholder="10 dígitos" autocomplete="tel"></div>'
    +'<label>Correo*</label><input name="correo" type="email" required autocomplete="email">'
    +'<label>Giro del negocio*</label><select name="giro" required>'+opt(GIROS)+'</select>'
    +'<div class="rt-row"><div><label>Sucursales*</label><select name="sucursales" required>'+opt(SUC)+'</select></div><div><label>Ciudad*</label><input name="ciudad" required></div></div>'
    +'<div class="rt-row"><div><label>Rol*</label><select name="rol" required>'+opt(ROLES)+'</select></div><div><label>Ticket promedio*</label><select name="ticket" required>'+opt(TICKETS)+'</select></div></div>'
    +'<div id="rt-err"></div><button id="rt-go" type="submit">Continuar a agendar →</button>'
    +'</form></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){if(e.target===ov)closeM();});
    ov.querySelector('#rt-x').addEventListener('click',closeM);
    ov.querySelector('#rt-form').addEventListener('submit',onSubmit);
    return ov;
  }
  function openM(){if(!modal)modal=build();modal.classList.add('open');document.documentElement.style.overflow='hidden';}
  function closeM(){if(modal)modal.classList.remove('open');document.documentElement.style.overflow='';}
  function onSubmit(e){
    e.preventDefault();
    var f=e.target,btn=f.querySelector('#rt-go'),err=f.querySelector('#rt-err');
    var g=function(n){return (f.elements[n]&&f.elements[n].value||'').trim();};
    var tel=g('telefono').replace(/\D/g,''),lada=g('lada').replace(/\D/g,'');
    if(!g('nombre')||!g('negocio')||tel.length<8||!/.+@.+\..+/.test(g('correo'))||!g('giro')||!g('sucursales')||!g('ciudad')||!g('rol')||!g('ticket')){
      err.textContent='Completa todos los campos (WhatsApp y correo válidos).';err.style.display='block';return;
    }
    var sucV=g('sucursales');var tkN=parseInt((g('ticket').replace(/,/g,'').match(/[0-9]+/)||['0'])[0],10);
    if(sucV==='1'||tkN<300){err.textContent='Por ahora Retenia trabaja con negocios de más de 1 sucursal y ticket promedio desde $300. Aún no podemos agendar tu demo.';err.style.display='block';return;}
    err.style.display='none';btn.disabled=true;btn.textContent='Enviando…';
    var data={nombre:g('nombre'),negocio:g('negocio'),whatsapp:lada+tel,correo:g('correo'),tipo_negocio:g('giro'),sucursales:g('sucursales'),ciudad:g('ciudad'),rol:g('rol'),ticket_promedio:g('ticket'),submittedAt:new Date().toISOString(),page_url:location.href,utm_source:qp('utm_source'),utm_medium:qp('utm_medium'),utm_campaign:qp('utm_campaign'),utm_content:qp('utm_content'),utm_term:qp('utm_term'),fbclid:qp('fbclid'),fbp:ck('_fbp'),fbc:ck('_fbc')};
    var body=Object.keys(data).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(data[k]);}).join('&');
    function go(){if(sent)return;sent=true;location.href=CAL+'?name='+encodeURIComponent(data.nombre)+'&email='+encodeURIComponent(data.correo);}
    try{fetch(HOOK,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:body}).then(go,go);}catch(_){}
    setTimeout(go,1800);
  }
  document.addEventListener('click',function(e){
    var t=e.target.closest?e.target.closest('a[href="#demo"], [data-demo]'):null;
    if(!t)return;e.preventDefault();openM();
  },true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM();});
})();
