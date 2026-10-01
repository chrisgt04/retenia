# Retenia

Landing page de **Retenia** — programa de **lealtad impulsado por WhatsApp**
(puntos, cashback y recompensas) para negocios de servicio: cafeterías,
restaurantes y retail.

## Qué hay en este repo

| Ruta | Qué es |
|------|--------|
| `index.html` | Landing page. **Es un artifact de Claude exportado**: un bundle HTML self-contained con el markup/CSS/JS reales embebidos como JSON dentro de `<script type="__bundler/manifest">` y `<script type="__bundler/template">`. El runtime al inicio del archivo reconstruye la página en el navegador. **No es fuente editable línea por línea** — ver "Cómo editar". |
| `heroimages/` | 7 PNG recortados con **fondo transparente** (personal de servicio: mesero, barista con cafés, etc.). Son las figuras del hero / secciones. |
| `assets/referencia-1.png`, `referencia-2.png` | Capturas de referencia de la marca (logo Retenia sobre fondo oscuro y sobre verde). Solo referencia de diseño, no se usan en la página. |

## Marca

- **Nombre:** Retenia
- **Tagline:** "Lealtad impulsada por WhatsApp"
- **Logo:** pato / ave que forma una "R" (blanco sobre fondo oscuro o verde),
  con un punto verde esmeralda como ojo.
- **Propuesta:** puntos, cashback, recompensas y fidelización vía WhatsApp.

### Paleta (extraída del bundle)

| Rol | Hex |
|-----|-----|
| Verde primario | `#1f9371` |
| Verde profundo | `#1e6b4a` / `#0e4a3b` |
| Verde claro / mint | `#7fd9b0` / `#a8ebd3` |
| Acento dorado | `#e8b96b` |
| Oscuro (texto/fondo dark) | `#0a100e` / `#0f1714` |
| Fondo crema | `#faf9f5` |
| Blanco | `#ffffff` |

### Tipografías

- **Display:** Bricolage Grotesque (`--f-display`)
- **Body:** Instrument Sans (`--f-body`)
- **Mono:** IBM Plex Mono (`--f-mono`)

## Cómo editar

`index.html` es un bundle generado por Claude (artifact exportado), no fuente
limpia. Dos caminos:

1. **Recomendado — regenerar desde el artifact:** editar el artifact original
   en Claude/claude.ai y volver a exportar el HTML, reemplazando `index.html`.
   Esto mantiene el bundle consistente.
2. **Edición directa:** el HTML/CSS/JS vive como strings JSON dentro de los
   `<script type="__bundler/*">`. Se puede parchear ahí, pero es frágil
   (escapes, manifest). Hacerlo solo para cambios puntuales de copy/color.

Si se quiere pasar a una landing "normal" mantenible, extraer el template del
bundle a `index.html` plano + `/css` + `/js` y servir las `heroimages/` como
archivos estáticos.

## Hero images (⚠️ importante)

El carrusel del hero muestra 7 fotos (una por categoría de negocio). El HTML
exportado las referenciaba como `/_blob/<hash>` — binarios que **el export NO
incluyó** (solo el logo quedó embebido). Por eso al abrir la página las fotos
no cargaban. Se **reconectaron** las 7 referencias a `heroimages/N.png`:

| Categoría | hash original | archivo local | foto |
|-----------|---------------|---------------|------|
| Cafeterías | `4664e45a…` | `heroimages/4.png` | barista con 2 cafés |
| Restaurantes | `6dca93fb…` | `heroimages/1.png` | mesero con carta |
| Salones de belleza | `e8aa6b82…` | `heroimages/2.png` | estilista con tijeras |
| Consultorios | `3968123c…` | `heroimages/3.png` | médico con estetoscopio |
| Gimnasios | `a4d36e7d…` | `heroimages/5.png` | mujer ropa deportiva |
| Deportes | `21023c7c…` | `heroimages/6.png` | jugadora de pádel |
| Veterinarias | `f56e8d96…` | `heroimages/7.png` | veterinario con perro |

Si se regenera `index.html` desde el artifact, revisar que las fotos sigan
embebidas; si vuelven como `/_blob/`, repetir este remapeo.

## Preview local

```bash
cd ~/Documents/retenia
python3 -m http.server 8000
# abrir http://localhost:8000
```

> Preferir revisar cambios de UI en local antes de deployar a staging/prod.

## Deploy (en vivo desde 1-oct-2026)

| | |
|---|---|
| **Sitio** | https://retenia.mx y https://www.retenia.mx (HTTPS, SSL por Vercel) |
| **Vercel** | proyecto `retenia`, cuenta personal **`christiangtz`** (scope default, NO pasar `--scope`) |
| **GitHub** | https://github.com/chrisgt04/retenia (privado, cuenta `chrisgt04`) |
| **Preview Vercel** | https://retenia-gamma.vercel.app |

### Re-deploy
```bash
cd ~/Documents/retenia
vercel deploy --prod --yes      # requiere `vercel login` con cuenta christiangtz
```
> El scope personal es el default; si se pasa `--scope christiangtrrz04-9975`
> falla con "You cannot set your Personal Account as the scope".

### DNS (GoDaddy, nameservers ns59/ns60.domaincontrol.com)
- `A @` → `76.76.21.21`
- `A www` → `76.76.21.21`
- No tocar los demás registros (email secureserver / sistema GoDaddy).
- **Gotcha:** GoDaddy sirve una página `/lander` (parking) mientras propaga el
  DNS; NO es un registro de la tabla. Se resuelve solo al propagar (~min–2h).
  Verificar con `curl --resolve retenia.mx:443:76.76.21.21 https://retenia.mx`.

## Pendientes / decisiones abiertas

- [ ] Decidir si se mantiene el formato bundle o se extrae a fuente editable.
- [ ] Conectar CTA de la landing al flujo real de WhatsApp.
- [ ] (Opcional) Conectar el repo de GitHub a Vercel para auto-deploy en cada
      push (`vercel git connect`).
