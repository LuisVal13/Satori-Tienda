/* ============================================================
   SATORI — Catálogo (fuente de datos única)
   ------------------------------------------------------------
   Cada objeto de PRODUCTS es un MODELO. "variants" son los colores
   (se muestran como MINIATURAS de la foto de fondo blanco, tanto en
   la tarjeta del inicio como en la ficha). Cada color tiene:
     image   → foto PRINCIPAL (fondo blanco) — sale en catálogo y miniatura
     gallery → fotos secundarias/ambiente (scroll horizontal de la ficha)
   ============================================================ */

/* ---------- Configuración de la tienda ---------- */
const WHATSAPP_NUMBER = "584120000000"; // tu número, sin "+" ni espacios
const CURRENCY = "$";

/* Precio en bolívares:
   - BCV_RATE = tasa Bs por dólar del día (ponla y se calcula sola; 0 = solo se muestra la nota)
   - BS_MARKUP = recargo del precio en Bs (1.15 = +15%). Si prefieres "+5$ fijo",
     cambia USE_FIXED_MARKUP a true. */
const BCV_RATE = 0;            // ← actualízala cuando quieras (ej. 40)
const BS_MARKUP = 1.15;        // +15%
const USE_FIXED_MARKUP = false;// true = suma $5 fijo en vez de +15%
const FIXED_MARKUP_USD = 5;

/* Métodos de pago (aparecen en la ficha) */
const PAYMENTS = ["Pago Móvil a tasa BCV", "Efectivo en dólares"];

/* NOTA sobre "stock" (en cada producto):
   - Es tu inventario. Solo se usa para el aviso visual:
       stock 0        → etiqueta "Agotado"
       stock 1 a 6    → etiqueta "Últimas N unidades"
       stock 7 o más  → sin etiqueta
   - Actualízalo a mano cuando vendas. No cambia el precio ni oculta el modelo.
   - "Oak" y "Signature" son el mismo código 930·6.5: comparten esas 16 unidades. */

const PRODUCTS = [
  /* ============ DELUXE — Poedagar 613 ============ */
  {
    id: "deluxe", code: "613", name: "Deluxe",
    inspiration: "Inspirado en el Patek Philippe Nautilus",
    priceUSD: 30, compareUSD: null, visible: true, stock: 12,
    specs: [
      { label: "Material", value: "Acero inoxidable" },
      { label: "Caja", value: "Cojín · esfera texturizada" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Fecha" },
      { label: "Resistencia", value: "3 ATM" },
      { label: "Cristal", value: "Resistente a rayones" },
    ],
    variants: [
      { color: "Verde",  image: "assets/products/deluxe/verde.webp",
        gallery: ["assets/products/deluxe/verde-life-1.webp", "assets/products/deluxe/caseback.webp"] },
      { color: "Azul",   image: "assets/products/deluxe/azul.webp",
        gallery: ["assets/products/deluxe/azul-life-1.webp", "assets/products/deluxe/azul-life-2.webp", "assets/products/deluxe/azul-life-3.webp"] },
      { color: "Negro",  image: "assets/products/deluxe/negro.webp",  gallery: ["assets/products/deluxe/caseback.webp"] },
      { color: "Blanco", image: "assets/products/deluxe/blanco.webp", gallery: ["assets/products/deluxe/caseback.webp"] },
    ],
  },

  /* ============ OAK — Poedagar 930 · 6.5 (bisel estriado) ============ */
  {
    id: "oak", code: "930 · 6.5", name: "Oak",
    inspiration: "Inspirado en el Rolex Day-Date",
    priceUSD: 30, compareUSD: null, visible: true, stock: 16, // 930·6.5: inventario que compartes con "Signature"
    specs: [
      { label: "Material", value: "Acero inoxidable" },
      { label: "Caja", value: "Redonda · bisel estriado" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Día / Fecha" },
      { label: "Resistencia", value: "3 ATM" },
      { label: "Cristal", value: "Resistente a rayones" },
    ],
    variants: [
      { color: "Verde agua", image: "assets/products/oak/verde-agua.webp",
        gallery: ["assets/products/oak/verde-agua-life-1.webp", "assets/products/oak/verde-agua-life-2.webp"] },
      { color: "Azul",    image: "assets/products/oak/azul.webp",    gallery: [] },
      { color: "Blanco",  image: "assets/products/oak/blanco.webp",  gallery: [] },
      { color: "Grafito", image: "assets/products/oak/grafito.webp", gallery: [] },
    ],
  },

  /* ============ SIGNATURE — Poedagar 930 · 6.5 (esfera plana) ============ */
  {
    id: "signature", code: "930 · 6.5", name: "Signature",
    inspiration: "Inspirado en el Rolex Day-Date",
    priceUSD: 30, compareUSD: null, visible: true, stock: 16, // mismo código 930·6.5 que "Oak"
    specs: [
      { label: "Material", value: "Acero inoxidable" },
      { label: "Caja", value: "Redonda · esfera plana" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Día / Fecha" },
      { label: "Resistencia", value: "3 ATM" },
      { label: "Cristal", value: "Resistente a rayones" },
    ],
    variants: [
      { color: "Verde agua", image: "assets/products/signature/verde-agua.webp",
        gallery: ["assets/products/signature/verde-agua-life-1.webp", "assets/products/signature/verde-agua-life-2.webp"] },
      { color: "Azul",   image: "assets/products/signature/azul.webp",   gallery: [] },
      { color: "Blanco", image: "assets/products/signature/blanco.webp", gallery: ["assets/products/signature/blanco-life-1.webp"] },
      { color: "Negro",  image: "assets/products/signature/negro.webp",  gallery: ["assets/products/signature/negro-life-1.webp"] },
    ],
  },

  /* ============ ROYAL — Poedagar 853 (octagonal) ============ */
  {
    id: "royal", code: "853", name: "Royal",
    inspiration: "Inspirado en el Audemars Piguet Royal Oak",
    priceUSD: 35, compareUSD: null, visible: true, stock: 9,
    specs: [
      { label: "Material", value: "Acero inoxidable" },
      { label: "Caja", value: "Octagonal · bisel cepillado" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Día / Fecha" },
      { label: "Resistencia", value: "3 ATM" },
      { label: "Cristal", value: "Resistente a rayones" },
    ],
    variants: [
      { color: "Grafito", image: "assets/products/royal/grafito.webp",
        gallery: ["assets/products/royal/grafito-life-1.webp", "assets/products/royal/grafito-life-2.webp", "assets/products/royal/grafito-life-3.webp", "assets/products/royal/grafito-life-4.webp", "assets/products/royal/caseback.webp"] },
      { color: "Blanco", image: "assets/products/royal/blanco.webp", gallery: ["assets/products/royal/caseback.webp"] },
      { color: "Negro",  image: "assets/products/royal/negro.webp",  gallery: ["assets/products/royal/caseback.webp"] },
    ],
  },

  /* ============ PRÉSIDENT — Nibosi 2628 ============ */
  {
    id: "president", code: "2628", name: "Président",
    inspiration: "Inspirado en el Rolex Day-Date",
    priceUSD: 35, compareUSD: null, visible: true, stock: 6,
    specs: [
      { label: "Material", value: "Acero inoxidable" },
      { label: "Caja", value: "Redonda · bisel canelado" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Día / Fecha" },
      { label: "Resistencia", value: "3 ATM" },
      { label: "Cristal", value: "Resistente a rayones" },
    ],
    variants: [
      { color: "Blanco", image: "assets/products/president/blanco.webp",
        gallery: ["assets/products/president/blanco-life-1.webp", "assets/products/president/caseback.webp"] },
      { color: "Negro",  image: "assets/products/president/negro.webp",
        gallery: ["assets/products/president/negro-life-1.webp", "assets/products/president/caseback.webp"] },
    ],
  },

  /* ============ (OCULTO) Poedagar 930 · 5.5 — correa de cuero ============
     Solo 4 unidades. Tendrá su publicación dedicada cuando haya más fotos.
     Cambia visible: true cuando quieras mostrarlo. */
  {
    id: "cuero", code: "930 · 5.5", name: "Edición Cuero",
    inspiration: "Edición especial con correa de cuero",
    priceUSD: 25, compareUSD: null, visible: false, stock: 4,
    specs: [
      { label: "Material", value: "Acero · correa de cuero" },
      { label: "Movimiento", value: "Cuarzo" },
      { label: "Funciones", value: "Día / Fecha" },
      { label: "Resistencia", value: "3 ATM" },
    ],
    variants: [
      { color: "Blanco", image: "assets/products/leather/blanco.jpg", gallery: [] },
    ],
  },
];
