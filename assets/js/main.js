/* ============================================================
   SATORI — Catálogo (index.html)
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  const money = (v) => `${CURRENCY}${Number(v).toFixed(2)}`;

  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>';

  // Aviso de stock: solo se muestra si queda poco (≤6) o si está agotado (0).
  function stockBadge(p) {
    if (typeof p.stock !== "number") return "";
    if (p.stock <= 0) return `<span class="badge badge--out">Agotado</span>`;
    if (p.stock <= 6) return `<span class="badge">Últimas ${p.stock} unidades</span>`;
    return "";
  }

  function cardHtml(p) {
    const v0 = p.variants[0] || {};
    // Miniaturas circulares (imagen real de cada color) que llevan a la ficha con ese color
    const swatches = p.variants.map((v, i) => `
      <a class="cswatch" href="producto.html?id=${encodeURIComponent(p.id)}&color=${i}" aria-label="${esc(p.name)} ${esc(v.color)}" title="${esc(v.color)}">
        <img src="${esc(v.image)}" alt="" loading="lazy" onerror="this.style.opacity=0">
      </a>`).join("");

    return `
      <div class="card">
        <a class="card__main" href="producto.html?id=${encodeURIComponent(p.id)}" aria-label="Ver ${esc(p.name)}">
          <div class="card__media">
            <img src="${esc(v0.image)}" alt="${esc(p.name)}" loading="lazy"
                 onerror="this.closest('.card__media').classList.add('is-missing')">
            <div class="card__ph">${SUN}<span>SATORI</span></div>
            ${stockBadge(p)}
          </div>
          <div class="card__body">
            <h3 class="card__name">${esc(p.name)}</h3>
            <p class="card__insp">${esc(p.inspiration || "")}</p>
            <p class="price"><span class="price__now">${money(p.priceUSD)}</span></p>
          </div>
        </a>
        <div class="card__swatches">${swatches}</div>
      </div>`;
  }

  function renderCatalog() {
    const root = $("#catalog-root");
    if (!root || typeof PRODUCTS === "undefined") return;
    const items = PRODUCTS.filter((p) => p.visible !== false);
    root.innerHTML = `<div class="grid">${items.map(cardHtml).join("")}</div>`;
    observeReveals();
  }

  function wireWhatsApp() {
    if (typeof WHATSAPP_NUMBER === "undefined") return;
    const g = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola SATORI, quiero información sobre sus relojes.")}`;
    $$("[data-wa]").forEach((a) => (a.href = g));
  }
  function wireHeader() {
    const h = $("#header"); if (!h) return;
    const f = () => h.classList.toggle("is-scrolled", window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
  }
  function wireDrawer() {
    const d = $("#drawer"), o = $("#menu-open"), c = $("#menu-close"); if (!d) return;
    const t = (s) => { d.classList.toggle("is-open", s); d.setAttribute("aria-hidden", s?"false":"true"); document.body.style.overflow = s?"hidden":""; };
    o?.addEventListener("click", () => t(true)); c?.addEventListener("click", () => t(false));
    $$("#drawer a").forEach((a) => a.addEventListener("click", () => t(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") t(false); });
  }
  let io;
  function observeReveals() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { $$(".reveal").forEach((e)=>e.classList.add("is-in")); return; }
    io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target);} }), { threshold: 0.12 });
    $$(".reveal:not(.is-in)").forEach((e) => io.observe(e));
  }

  document.addEventListener("DOMContentLoaded", () => { renderCatalog(); wireWhatsApp(); wireHeader(); wireDrawer(); observeReveals(); });
})();
