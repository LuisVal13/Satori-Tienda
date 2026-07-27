/* ============================================================
   SATORI — Ficha de producto (producto.html)
   URL: producto.html?id=<modelo>&color=<índice>
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  const money = (v) => `${CURRENCY}${Number(v).toFixed(2)}`;

  const root = $("#product-root");
  if (!root || typeof PRODUCTS === "undefined") return;

  const params = new URLSearchParams(location.search);
  const product = PRODUCTS.find((p) => p.id === params.get("id")) || PRODUCTS[0];
  if (!product) {
    root.innerHTML = `<div class="wrap" style="padding:160px 0;text-align:center"><p>Producto no encontrado. <a href="index.html" style="text-decoration:underline">Volver</a></p></div>`;
    return;
  }
  document.title = `SATORI — ${product.name}`;

  let current = Math.max(0, Math.min(product.variants.length - 1, Number(params.get("color")) || 0));

  /* Precio en bolívares (config en products.js) */
  function bsText(usd) {
    if (typeof BCV_RATE === "undefined" || !BCV_RATE || BCV_RATE <= 0) return null;
    const base = (typeof USE_FIXED_MARKUP !== "undefined" && USE_FIXED_MARKUP)
      ? usd + FIXED_MARKUP_USD
      : usd * (typeof BS_MARKUP !== "undefined" ? BS_MARKUP : 1);
    return `≈ Bs ${(base * BCV_RATE).toLocaleString("es-VE", { maximumFractionDigits: 2 })}`;
  }
  const markupLabel = (typeof USE_FIXED_MARKUP !== "undefined" && USE_FIXED_MARKUP) ? "+$5" : "+15%";

  function waLink() {
    const v = product.variants[current];
    const msg = `Hola SATORI, me interesa el ${product.name} en ${v.color} (${money(product.priceUSD)}). ¿Está disponible?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function images(v) { return [v.image, ...(v.gallery || [])]; }

  function render() {
    const v = product.variants[current];
    const imgs = images(v);
    const bs = bsText(product.priceUSD);

    const slides = imgs.map((src, i) => `
      <div class="slide" data-i="${i}">
        <img src="${esc(src)}" alt="${esc(product.name)} ${esc(v.color)}" ${i ? 'loading="lazy"' : ""}
             onerror="this.closest('.slide').classList.add('is-missing')">
        <span class="slide__ph">SATORI</span>
      </div>`).join("");

    const dots = imgs.map((_, i) => `<button class="cdot ${i===0?"is-active":""}" data-go="${i}" aria-label="Foto ${i+1}"></button>`).join("");

    // Miniaturas circulares de color (imagen real)
    const swatches = product.variants.map((vr, i) => `
      <a class="swatch ${i === current ? "is-active" : ""}" href="producto.html?id=${encodeURIComponent(product.id)}&color=${i}"
         aria-label="${esc(vr.color)}" title="${esc(vr.color)}">
        <img src="${esc(vr.image)}" alt="" onerror="this.style.opacity=0">
      </a>`).join("");

    const specs = product.specs.map((s) => `<div class="spec"><span>${esc(s.label)}</span><b>${esc(s.value)}</b></div>`).join("");
    const pays = (typeof PAYMENTS !== "undefined" ? PAYMENTS : []).map((p) => `<li>${esc(p)}</li>`).join("");

    root.innerHTML = `
      <div class="wrap"><a class="pd__back" href="index.html">← Volver al catálogo</a></div>
      <div class="wrap pd">
        <!-- Galería: carrusel con scroll horizontal táctil -->
        <div class="pd__gallery">
          <div class="pd__carousel" id="pd-carousel">${slides}</div>
          <div class="pd__cdots">${dots}</div>
        </div>

        <!-- Información -->
        <div class="pd__info">
          <p class="eyebrow">Referencia ${esc(product.code)}</p>
          <h1 class="pd__name">${esc(product.name)}</h1>
          <p class="pd__insp">${esc(product.inspiration || "")}</p>

          <p class="pd__price">
            <span class="price__now">${money(product.priceUSD)}</span>
            ${bs ? `<span class="pd__bs">${bs}</span>` : ""}
          </p>
          <p class="pd__bsnote">Precio en Bs a tasa BCV del día (${markupLabel}).</p>

          <div class="pd__variants">
            <p class="pd__label">Color · <span>${esc(v.color)}</span></p>
            <div class="swatches">${swatches}</div>
          </div>

          <div class="pd__specs">${specs}</div>

          ${pays ? `<div class="pd__pay"><p class="pd__label">Métodos de pago</p><ul>${pays}</ul></div>` : ""}

          <a class="btn btn--primary pd__cta" href="${waLink()}" target="_blank" rel="noopener">Consultar disponibilidad</a>
        </div>
      </div>`;

    wireCarousel();
  }

  function wireCarousel() {
    const car = $("#pd-carousel");
    const dots = $$(".cdot");
    if (!car) return;
    // Clic en punto → desplaza el carrusel a esa foto
    dots.forEach((d) => d.addEventListener("click", () => {
      const i = Number(d.dataset.go);
      const slide = car.children[i];
      if (slide) car.scrollTo({ left: slide.offsetLeft - car.offsetLeft, behavior: "smooth" });
    }));
    // Al deslizar, marca el punto activo
    let t;
    car.addEventListener("scroll", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(car.scrollLeft / car.clientWidth);
        dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
      }, 60);
    }, { passive: true });
  }

  function wireChrome() {
    const h = $("#header");
    if (h) { const f = () => h.classList.toggle("is-scrolled", window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); }
    const d = $("#drawer"), o = $("#menu-open"), c = $("#menu-close");
    if (d) { const t = (s)=>{ d.classList.toggle("is-open",s); document.body.style.overflow=s?"hidden":""; };
      o?.addEventListener("click",()=>t(true)); c?.addEventListener("click",()=>t(false));
      $$("#drawer a").forEach((a)=>a.addEventListener("click",()=>t(false))); }
    if (typeof WHATSAPP_NUMBER !== "undefined") {
      const g = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola SATORI, quiero información sobre sus relojes.")}`;
      $$("[data-wa]").forEach((a) => (a.href = g));
    }
  }

  document.addEventListener("DOMContentLoaded", () => { render(); wireChrome(); });
})();
