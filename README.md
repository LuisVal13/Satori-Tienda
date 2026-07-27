# SATORI — Catálogo de relojería

Catálogo (sin carrito). El cliente ve los relojes, toca uno y llega a su **ficha**
con galería (scroll táctil), colores y características. Pedidos por WhatsApp.

## Estructura
```
satori/
├── index.html              → inicio (hero lifestyle → catálogo → marca → galería → detalles → footer)
├── producto.html           → ficha del reloj (se abre al tocar una tarjeta)
└── assets/
    ├── css/styles.css       → diseño (blanco · verde bosque · oro)
    ├── js/products.js       → ★ MODELOS, COLORES, PRECIOS, PAGOS (lo único que editas)
    ├── js/main.js           → catálogo (no tocar)
    ├── js/producto.js       → ficha (no tocar)
    ├── brand/               → logos
    └── products/
        ├── deluxe/ oak/ signature/ royal/ president/   → cada modelo (fotos por color)
        ├── leather/         → 930 cuero (oculto por ahora)
        └── lifestyle/       → hero + galería del inicio
```

## Editar (solo `products.js`)
- **Config arriba del archivo:** `WHATSAPP_NUMBER`, `BCV_RATE` (tasa Bs del día; 0 = solo nota),
  `BS_MARKUP` (1.15 = +15%; o pon `USE_FIXED_MARKUP=true` para +$5), `PAYMENTS`.
- Cada **modelo** tiene `variants` (colores). Cada color: `image` (foto fondo blanco = principal
  y miniatura) y `gallery` (fotos de ambiente que salen en el carrusel de la ficha).
- La **miniatura circular** del color = la foto de fondo blanco. Se ve en la tarjeta y en la ficha.
- Mostrar el de cuero: cambia `visible: false` → `true` en el modelo "cuero".

## Modelos y precios (de tu Excel)
| Modelo | Código | Precio | Inspiración |
|---|---|---|---|
| Deluxe | 613 | $30 | Patek Philippe Nautilus |
| Oak | 930 · 6.5 | $30 | Rolex Day-Date |
| Signature | 930 · 6.5 | $30 | Rolex Day-Date |
| Royal | 853 | $35 | Audemars Piguet Royal Oak |
| Président | 2628 | $35 | Rolex Day-Date |
| Edición Cuero (oculto) | 930 · 5.5 | $25 | — |

> Oak y Signature son dos estilos del 930·6.5, ambos a $30. Si quieres una sola ficha, se juntan fácil.

## Reglas de fotos
- Carpetas y archivos en minúsculas, sin espacios ni acentos.
- Foto principal de cada color = fondo blanco.
- Imágenes completas, sin bordes ni recortes.

## Ver / publicar
- Local: abre la carpeta `satori` en VS Code → clic derecho en `index.html` → **Open with Live Server**.
- Publicar gratis con HTTPS: Netlify / Vercel / Cloudflare Pages / GitHub Pages.
- Nunca pongas claves ni tokens aquí (todo el front es público).
