/* ============================================================
   PARCO Lab — i18n.js
   All UI strings and content in EN (default) and IT.
   Usage: i18n.t('key') returns string for current language.
   ============================================================ */

const I18N = (() => {

  const translations = {

    /* ─────────────────────────────────────────
       NAV
    ───────────────────────────────────────── */
    en: {
      nav: {
        home:           "Home",
        research:       "Research",
        projects:       "Projects",
        publications:   "Publications",
        people:         "People",
        spinoff:        "Spin-offs",
        official:       "GitHub ›",
      },

      /* ─── HERO ─── */
      hero: {
        eyebrow:        "DIMI — University of Verona",
        title_line1:    "Parallel",
        title_line2:    "Computing",
        title_line3:    "Laboratory",
        subtitle:       "Development, analysis, and optimization of parallel code for multi-core and many-core architectures. Edge Computing and High-Performance Computing.",
        cta_primary:    "Explore research",
        cta_secondary:  "Meet the team",
        scroll:         "Scroll",
        stat_members:   "Team members",
        stat_servers:   "GPU servers",
        stat_projects:  "Projects",
        stat_spinoffs:  "Spin-offs",
      },

      /* ─── ABOUT STRIP ─── */
      about: [
        { label: "Focus",       text: "Development, analysis, and optimization of parallel code for multi-core CPU and many-core GPU architectures with performance, power, and energy efficiency constraints." },
        { label: "Technologies", text: "CUDA · OpenCL · OpenACC · OpenMP · MPI. HW/SW environments for Edge Computing and High-Performance Computing." },
        { label: "Location",    text: "Ca' Vignal 2, Strada le Grazie 15, 37134 Verona. Part of DIMI — University of Verona." },
      ],

      /* ─── RESEARCH ─── */
      research: {
        eyebrow:    "Research",
        title:      "Research areas.",
        subtitle:   "The lab develops and optimizes software for multi-core CPUs and many-core GPUs, targeting performance, power, and energy efficiency."
      },

      /* ─── PROJECTS ─── */
      projects: {
        eyebrow:   "Funding",
        title:     "Research projects.",
        subtitle:  "Applied research and industrial contracts with national, regional, and industrial funding.",
        filter_all:"All",
        filter_ac: "Academic",
        filter_in: "Industrial",
        filter_med:"Biomedical",
      },

      /* ─── PUBLICATIONS ─── */
      publications: {
        eyebrow:    "Scientific output",
        title:      "Publications.",
        subtitle:   "Research published in international IEEE and ACM journals and conferences.",
        filter_all: "All",
        filter_jo:  "Journal",
        filter_co:  "Conference",
        filter_wo:  "Workshop",
      },

      /* ─── PEOPLE ─── */
      people: {
        eyebrow:      "Team",
        title:        "People.",
        subtitle:     "PARCO Lab is part of DIMI — Department of Engineering for Innovation Medicine, University of Verona, Ca' Vignal 2.",
        label_prof:   "Faculty & Principal Investigators",
        label_staff:  "Staff & Technicians",
        profile_link: "University profile",
        label_phd:    "PhD Students",
      },

      /* ─── SPIN-OFFS ─── */
      spinoff: {
        eyebrow:  "Technology transfer",
        title:    "Spin-offs.",
        subtitle: "The Computer Science Park at the University of Verona hosts companies born from departmental research.",
        visit:    "Visit website",
      },

      /* ─── FOOTER ─── */
      footer: {
        sections:    "Sections",
        department:  "Department",
        contact:     "Contact",
        copyright:   "Copyright © 2026 PARCO Lab — University of Verona. All rights reserved.",
        dept_line:   "DIMI — Department of Engineering for Innovation Medicine",
        room:        "Ca' Vignal 2, room 1.49",
        address:     "Strada le Grazie 15, Verona",
      },
    },

    /* ══════════════════════════════════════════
       ITALIANO
    ══════════════════════════════════════════ */
    it: {
      nav: {
        home:           "Home",
        research:       "Ricerca",
        projects:       "Progetti",
        publications:   "Pubblicazioni",
        people:         "Persone",
        spinoff:        "Spin-off",
        official:       "GitHub ›",
      },

      hero: {
        eyebrow:        "DIMI — Università degli Studi di Verona",
        title_line1:    "Parallel",
        title_line2:    "Computing",
        title_line3:    "Laboratory",
        subtitle:       "Sviluppo, analisi e ottimizzazione di codice parallelo per architetture multi-core e many-core. Edge Computing e High-Performance Computing.",
        cta_primary:    "Esplora la ricerca",
        cta_secondary:  "Il team",
        scroll:         "Scorri",
        stat_members:   "Membri del team",
        stat_servers:   "Server GPU",
        stat_projects:  "Progetti",
        stat_spinoffs:  "Spin-off",
      },

      about: [
        { label: "Focus",       text: "Sviluppo, analisi e ottimizzazione di codice parallelo per architetture multi-core CPU e many-core GPU con vincoli di performance, potenza ed efficienza energetica." },
        { label: "Tecnologie",  text: "CUDA · OpenCL · OpenACC · OpenMP · MPI. Ambienti HW/SW per Edge Computing e High-Performance Computing." },
        { label: "Sede",        text: "Ca' Vignal 2, Strada le Grazie 15, 37134 Verona. Afferisce al DIMI — Università degli Studi di Verona." },
      ],

      research: {
        eyebrow:    "Ricerca",
        title:      "Aree di ricerca.",
        subtitle:   "Il laboratorio sviluppa e ottimizza software per CPU multi-core e GPU many-core, con vincoli di performance, potenza ed efficienza energetica."
      },

      projects: {
        eyebrow:   "Finanziamenti",
        title:     "Progetti di ricerca.",
        subtitle:  "Ricerca applicata e contratti industriali con finanziamenti nazionali, regionali e industriali.",
        filter_all:"Tutti",
        filter_ac: "Accademico",
        filter_in: "Industriale",
        filter_med:"Biomedico",
      },

      publications: {
        eyebrow:    "Output scientifico",
        title:      "Pubblicazioni.",
        subtitle:   "Ricerca pubblicata su riviste e conferenze internazionali IEEE e ACM.",
        filter_all: "Tutti",
        filter_jo:  "Journal",
        filter_co:  "Conference",
        filter_wo:  "Workshop",
      },

      people: {
        eyebrow:      "Il team",
        title:        "Persone.",
        subtitle:     "Il PARCO Lab afferisce al DIMI — Dipartimento di Ingegneria per la Medicina di Innovazione, Università degli Studi di Verona, Ca' Vignal 2.",
        label_prof:   "Docenti & Responsabili",
        label_staff:  "Staff & Tecnici",
        profile_link: "Profilo universitario",
        label_phd:    "Dottorandi",
      },

      spinoff: {
        eyebrow:  "Trasferimento tecnologico",
        title:    "Spin-off.",
        subtitle: "Il Computer Science Park dell'Università di Verona ospita le realtà nate dalla ricerca del Dipartimento.",
        visit:    "Visita il sito",
      },

      footer: {
        sections:    "Sezioni",
        department:  "Dipartimento",
        contact:     "Contatti",
        copyright:   "Copyright © 2026 PARCO Lab — Università degli Studi di Verona. Tutti i diritti riservati.",
        dept_line:   "DIMI — Dipartimento di Ingegneria per la Medicina di Innovazione",
        room:        "Ca' Vignal 2, stanza 1.49",
        address:     "Strada le Grazie 15, Verona",
      },
    },
  };

  let current = localStorage.getItem("parco-lang") || "en";
  const listeners = [];

  function t(path) {
    const keys = path.split(".");
    let val = translations[current];
    for (const k of keys) {
      if (val === undefined) return path;
      val = val[k];
    }
    return val ?? path;
  }

  function setLang(lang) {
    if (!translations[lang]) return;
    current = lang;
    localStorage.setItem("parco-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    listeners.forEach(fn => fn(lang));
  }

  function getLang() { return current; }

  function onChange(fn) { listeners.push(fn); }

  return { t, setLang, getLang, onChange };
})();
