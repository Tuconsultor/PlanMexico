# PlanMexico Landing

Landing page estática para promoción del Programa de Vehículos Pesados 2026.

## Qué se corrigió

- Se eliminó la duplicación accidental del HTML.
- Se separó la configuración y la lógica del formulario en archivos JS.
- Se activó el envío real a Google Sheets mediante Google Apps Script.
- Se añadieron prompts para generar imágenes profesionales.

## Estructura

- `index.html`: landing principal.
- `assets/js/config.js`: URL de Apps Script y configuración básica.
- `assets/js/form-handler.js`: validación y envío del formulario.
- `apps-script.gs`: backend para guardar leads en Google Sheets.
- `docs/image-prompts.md`: prompts de imágenes.

## Configuración rápida

1. Publica tu script de Google Apps Script usando `apps-script.gs`.
2. Copia la URL de web app en `assets/js/config.js`, campo `googleScriptUrl`.
3. Sube las imágenes locales:
   - `assets/images/hero-camion.jpg`
   - `assets/images/contacto-bg.jpg`
4. Haz commit y push.

## Publicar en GitHub Pages

1. Ve a **Settings > Pages**.
2. En Source selecciona **Deploy from a branch**.
3. Elige la rama (por ejemplo `main`) y carpeta `/root`.
4. Guarda y espera el despliegue.

Tu landing quedará en:

`https://<usuario>.github.io/<repositorio>/`
