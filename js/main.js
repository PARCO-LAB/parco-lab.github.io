/* ============================================================
   PARCO Lab — main.js
   Bootstrap · i18n · Theme · Nav · Scroll · Interactions
   ============================================================ */
(function () {
  "use strict";

  const SECTIONS = [
    "section-home","section-ricerca","section-progetti",
    "section-pubblicazioni","section-persone","section-spinoff",
  ];

  const NAV_KEYS = [
    { id:"section-home",          key:"nav.home" },
    { id:"section-ricerca",       key:"nav.research" },
    { id:"section-progetti",      key:"nav.projects" },
    { id:"section-pubblicazioni", key:"nav.publications" },
    { id:"section-persone",       key:"nav.people" },
    { id:"section-spinoff",       key:"nav.spinoff" },
  ];

  const state = {
    theme:    localStorage.getItem("parco-theme") || "light",
    menuOpen: false,
  };

  /* ══════════════════════════
     THEME
  ══════════════════════════ */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("parco-theme", t);
    state.theme = t;
  }

  /* ══════════════════════════
     FULL RE-RENDER (called on lang change)
  ══════════════════════════ */
  function renderAll() {
    // Sections
    const slots = {
      "home-content":          Render.renderHome,
      "ricerca-content":       Render.renderRicerca,
      "progetti-content":      Render.renderProgetti,
      "pubblicazioni-content": Render.renderPubblicazioni,
      "persone-content":       Render.renderPersone,
      "spinoff-content":       Render.renderSpinoff,
    };
    Object.entries(slots).forEach(([id, fn]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = fn(PARCO_DATA);
    });

    // Footer
    const footer = document.querySelector("footer");
    if (footer) footer.innerHTML = Render.renderFooter(PARCO_DATA);

    // Update nav link labels (desktop + mobile)
    updateNavLabels();

    // Update page lang attribute
    document.documentElement.setAttribute("lang", I18N.getLang());

    // Re-init dynamic features on new DOM
    initReveals();
    initCounters();
    initFilters();
    initCollapsible();
    initSmoothAnchors();
    initScrollSpy();
  }

  /* ══════════════════════════
     NAV LABELS
  ══════════════════════════ */
  function updateNavLabels() {
    // Desktop nav links
    NAV_KEYS.forEach(({ id, key }) => {
      const a = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (a) a.textContent = I18N.t(key);
      const ma = document.querySelector(`.mobile-menu-link[href="#${id}"]`);
      if (ma) ma.textContent = I18N.t(key);
    });
    // Official link
    const official = document.querySelector(".nav-cta");
    if (official) official.textContent = I18N.t("nav.official");
  }

  /* ══════════════════════════
     LANGUAGE SWITCHER
  ══════════════════════════ */
  function initLangSwitcher() {
    document.addEventListener("click", e => {
      const btn = e.target.closest(".lang-btn");
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (!lang || lang === I18N.getLang()) return;

      // Update active states on ALL lang buttons (desktop + mobile)
      document.querySelectorAll(".lang-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.lang === lang);
      });

      I18N.setLang(lang);
      renderAll();
    });
  }

  /* ══════════════════════════
     SMOOTH ANCHORS
  ══════════════════════════ */
  function initSmoothAnchors() {
    document.querySelectorAll("a[href^='#']").forEach(a => {
      // Remove old listener by cloning
      const fresh = a.cloneNode(true);
      a.parentNode.replaceChild(fresh, a);
    });
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-nav")) || 44;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: "smooth" });
      closeMobileMenu();
    });
  }

  /* ══════════════════════════
     SCROLL SPY
  ══════════════════════════ */
  let spyObs;
  function initScrollSpy() {
    if (spyObs) spyObs.disconnect();
    spyObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        document.querySelectorAll(".nav-links a[href^='#']").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
        document.querySelectorAll(".mobile-menu-link[href^='#']").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) spyObs.observe(el);
    });
  }

  /* ══════════════════════════
     NAV SCROLL OPACITY
  ══════════════════════════ */
  function initNav() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  /* ══════════════════════════
     MOBILE MENU
  ══════════════════════════ */
  function openMobileMenu() {
    document.getElementById("mobile-menu").classList.add("open");
    document.getElementById("hamburger-btn").classList.add("open");
    document.body.style.overflow = "hidden";
    state.menuOpen = true;
  }
  function closeMobileMenu() {
    const m = document.getElementById("mobile-menu");
    const h = document.getElementById("hamburger-btn");
    if (m) m.classList.remove("open");
    if (h) h.classList.remove("open");
    document.body.style.overflow = "";
    state.menuOpen = false;
  }

  /* ══════════════════════════
     REVEAL ON SCROLL
  ══════════════════════════ */
  let revObs;
  function initReveals() {
    if (revObs) revObs.disconnect();
    revObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("visible"), i * 55);
        revObs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => revObs.observe(el));
  }

  /* ══════════════════════════
     COUNTERS
  ══════════════════════════ */
  function initCounters() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.count;
        let cur = 0; const step = target / 60;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.floor(cur);
          if (cur >= target) clearInterval(t);
        }, 16);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach(el => obs.observe(el));
  }

  /* ══════════════════════════
     FILTER BARS
  ══════════════════════════ */
  function initFilters() {
    document.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const bar = btn.closest(".filter-bar");
      if (!bar) return;
      bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      const list = bar.nextElementSibling?.querySelector(".collapsible-list") || bar.nextElementSibling;
      if (!list) return;
      list.querySelectorAll("[data-type]").forEach(item => {
        item.style.display = (f === "all" || item.dataset.type === f) ? "" : "none";
      });
    });
  }

  /* ══════════════════════════
    COLLAPSIBLE LISTS
  ══════════════════════════ */
  function initCollapsible() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.list-toggle-btn');
      if (!btn) return;

      const wrap = btn.closest('.collapsible-wrap');
      const list = wrap?.querySelector('.collapsible-list');
      if (!list) return;

      const T = I18N.t.bind(I18N);
      const isCollapsed = list.classList.contains('list-collapsed');
      const total = list.querySelectorAll('.collapsible-item').length;

      if (isCollapsed) {
        list.classList.replace('list-collapsed', 'list-expanded');
        wrap?.classList.replace('list-collapsed', 'list-expanded');
        btn.classList.replace('list-collapsed', 'list-expanded');
        btn.querySelector('.toggle-label').textContent = T('list.show_less');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        list.classList.replace('list-expanded', 'list-collapsed');
        wrap?.classList.replace('list-expanded', 'list-collapsed');
        btn.classList.replace('list-expanded', 'list-collapsed');
        btn.querySelector('.toggle-label').textContent = `${T('list.show_all')} (${total})`;
        btn.setAttribute('aria-expanded', 'false');
        list.scrollTo({ top: 0, behavior: 'smooth' });
        // scroll back to section top so user isn't stranded
        list.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ══════════════════════════
     BOOT
  ══════════════════════════ */
  function boot() {
    // Apply saved theme
    applyTheme(state.theme);

    // Apply saved language
    document.documentElement.setAttribute("lang", I18N.getLang());

    // Sync lang buttons initial state
    document.querySelectorAll(".lang-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === I18N.getLang());
    });

    // First render
    renderAll();

    // ── Theme toggles ──
    document.querySelectorAll(".theme-toggle").forEach(btn => {
      btn.addEventListener("click", () => applyTheme(state.theme === "light" ? "dark" : "light"));
    });

    // ── Language switcher ──
    initLangSwitcher();

    // ── Nav ──
    initNav();

    // ── Hamburger ──
    const ham = document.getElementById("hamburger-btn");
    if (ham) ham.addEventListener("click", () => state.menuOpen ? closeMobileMenu() : openMobileMenu());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

})();
