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

## Preview local

```bash
cd ~/Documents/retenia
python3 -m http.server 8000
# abrir http://localhost:8000
```

> Preferir revisar cambios de UI en local antes de deployar a staging/prod.

## Estado

- Proyecto recién inicializado (1-oct-2026). Assets y landing importados desde
  `~/Downloads`. Aún sin deploy ni repo remoto definido.

## Pendientes / decisiones abiertas

- [ ] Definir destino de deploy (Vercel / nginx+Docker / otro).
- [ ] Decidir si se mantiene el formato bundle o se extrae a fuente editable.
- [ ] Conectar CTA de la landing al flujo real de WhatsApp.
