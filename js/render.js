/* ============================================================
   PARCO Lab — Apple Design — render.js
   All render functions. Language-aware via I18N + bl().
   Image best practices: native lazy loading, explicit w/h,
   aspect-ratio, fade-in on load, graceful fallback.
   ============================================================ */

const Render = (() => {

  const esc   = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const nl2br = s => esc(s).replace(/\n/g,'<br>');

  /* ─── Person avatar: photo OR initials fallback ─── */
  function personAvatar(p) {
    if (p.photo) {
      const alt = bl(p.photoAlt) || p.name;
      return `
        <div style="position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--avatar-bg)">
          <img
            class="person-avatar-img"
            src="${esc(p.photo)}"
            alt="${esc(alt)}"
            width="400" height="400"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            onload="this.classList.add('loaded')"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          >
          <div class="person-avatar-fallback" style="display:none;position:absolute;inset:0">
            ${esc(p.initials)}
          </div>
        </div>`;
    }
    return `<div class="person-avatar-fallback">${esc(p.initials)}</div>`;
  }

  /* ─── Person card ─── */
  function personCard(p) {
    const lang = I18N.getLang();
    return `
      <div class="person-card">
        ${personAvatar(p)}
        <div class="person-body">
          <div class="person-name">${esc(p.name)}</div>
          <div class="person-role">${esc(bl(p.role))}${p.dept ? ` · ${esc(p.dept)}` : ''}</div>
          <div class="person-area">${esc(bl(p.area))}</div>
          ${p.office ? `<div class="person-office">${esc(p.office)}</div>` : ''}
          <a class="person-link" href="${esc(p.url)}" target="_blank" rel="noopener">
            ${esc(I18N.t('people.profile_link'))}
          </a>
        </div>
      </div>`;
  }

  /* ══════════════════════════════════════
     HOME (injected into #home-content)
  ══════════════════════════════════════ */
  function renderHome(data) {
    const T = I18N.t.bind(I18N);
    const stats = data.stats.map(s => `
      <div class="hero-stat">
        <div class="hero-stat-num" data-count="${s.value}">0</div>
        <div class="hero-stat-label">${esc(T(s.labelKey))}</div>
      </div>`).join('');

    const aboutCells = T('about').map(a => `
      <div class="about-cell reveal">
        <div class="about-cell-label">${esc(a.label)}</div>
        <div class="about-cell-text">${esc(a.text)}</div>
      </div>`).join('');

    return `
      <section id="section-home">
        <div class="hero-eyebrow">
          <div class="hero-eyebrow-dot"></div>${esc(T('hero.eyebrow'))}
        </div>
        <h1 class="hero-title">
          ${esc(T('hero.title_line1'))}<br>
          <span class="hero-title-accent">${esc(T('hero.title_line2'))}</span><br>
          ${esc(T('hero.title_line3'))}
        </h1>
        <p class="hero-subtitle">${esc(T('hero.subtitle'))}</p>
        <div class="hero-ctas">
          <a class="btn btn-primary"    href="#section-ricerca">${esc(T('hero.cta_primary'))}</a>
          <a class="btn btn-secondary"  href="#section-persone">${esc(T('hero.cta_secondary'))}</a>
        </div>
        <div class="hero-stats reveal">${stats}</div>
        <div class="scroll-hint">
          <span class="scroll-hint-text">${esc(T('hero.scroll'))}</span>
          <div class="scroll-hint-arrow"></div>
        </div>
      </section>
      <div class="about-strip">${aboutCells}</div>`;
  }

  /* ══════════════════════════════════════
     RICERCA
  ══════════════════════════════════════ */
  function renderRicerca(data) {
    const T = I18N.t.bind(I18N);
    const cards = data.research.map(r => `
      <div class="research-card reveal">
        <div class="rc-num">${esc(r.num)}</div>
        <div class="rc-title">${esc(bl(r.title))}</div>
        <p class="rc-desc">${esc(bl(r.desc))}</p>
        <div class="rc-tags">${r.tags.map(t=>`<span class="rc-tag">${esc(t)}</span>`).join('')}</div>
      </div>`).join('');

    return `
      <section id="section-ricerca">
        <div class="section-inner container-wide">
          <div class="section-header reveal">
            <span class="section-eyebrow">${esc(T('research.eyebrow'))}</span>
            <h2 class="section-title">${esc(T('research.title'))}</h2>
            <p class="section-subtitle">${esc(T('research.subtitle'))}</p>
          </div>
          <div class="grid-auto-280">${cards}</div>
        </div>
      </section>`;
  }

  /* ══════════════════════════════════════
     PROGETTI
  ══════════════════════════════════════ */
  function renderProgetti(data) {
    const T = I18N.t.bind(I18N);
    const items = data.projects.map(p => `
      <div class="proj-item reveal collapsible-item" data-type="${esc(p.type)}">
        <div class="proj-dot"></div>
        <div class="proj-body">
          <div class="proj-title">${esc(bl(p.title))}</div>
          <div class="proj-funder">${esc(typeof p.funder === 'object' ? bl(p.funder) : p.funder)}</div>
        </div>
        <div class="proj-year">${esc(p.year)}</div>
      </div>`).join('');

    const total = data.projects.length;
    const showToggle = total > 5;

    return `
      <section id="section-progetti">
        <div class="section-inner container-wide">
          <div class="section-header reveal">
            <span class="section-eyebrow">${esc(T('projects.eyebrow'))}</span>
            <h2 class="section-title">${esc(T('projects.title'))}</h2>
            <p class="section-subtitle">${esc(T('projects.subtitle'))}</p>
          </div>
          <div class="filter-bar reveal">
            <button class="filter-btn active" data-filter="all">${esc(T('projects.filter_all'))}</button>
            <button class="filter-btn" data-filter="academic">${esc(T('projects.filter_ac'))}</button>
            <button class="filter-btn" data-filter="industry">${esc(T('projects.filter_in'))}</button>
            <button class="filter-btn" data-filter="medical">${esc(T('projects.filter_med'))}</button>
          </div>
          <div id="proj-list" class="list-collapsed">${items}</div>
          ${showToggle ? `
          <button class="list-toggle-btn list-collapsed" id="proj-toggle">
            <span class="toggle-icon">+</span>
            <span class="toggle-label">${esc(T('list.show_all'))} (${total})</span>
          </button>` : ''}
        </div>
      </section>`;
  }

  /* ══════════════════════════════════════
     PUBBLICAZIONI
  ══════════════════════════════════════ */
  function renderPubblicazioni(data) {
    const T = I18N.t.bind(I18N);
    const items = data.publications.map(p => `
      <div class="pub-item reveal collapsible-item" data-type="${esc(p.type)}">
        <div class="pub-year">${esc(p.year)}</div>
        <div>
          <div class="pub-title">${esc(p.title)}</div>
          <div class="pub-authors">${esc(p.authors)}</div>
          <div class="pub-venue">${esc(p.venue)}</div>
        </div>
        <span class="pub-badge">${esc(p.type)}</span>
      </div>`).join('');

    const total = data.publications.length;
    const showToggle = total > 5;

    return `
      <section id="section-pubblicazioni">
        <div class="section-inner container-wide">
          <div class="section-header reveal">
            <span class="section-eyebrow">${esc(T('publications.eyebrow'))}</span>
            <h2 class="section-title">${esc(T('publications.title'))}</h2>
            <p class="section-subtitle">${esc(T('publications.subtitle'))}</p>
          </div>
          <div class="filter-bar reveal">
            <button class="filter-btn active" data-filter="all">${esc(T('publications.filter_all'))}</button>
            <button class="filter-btn" data-filter="journal">${esc(T('publications.filter_jo'))}</button>
            <button class="filter-btn" data-filter="conference">${esc(T('publications.filter_co'))}</button>
            <button class="filter-btn" data-filter="workshop">${esc(T('publications.filter_wo'))}</button>
          </div>
          <div id="pub-list" class="list-collapsed">${items}</div>
          ${showToggle ? `
          <button class="list-toggle-btn list-collapsed" id="pub-toggle">
            <span class="toggle-icon">+</span>
            <span class="toggle-label">${esc(T('list.show_all'))} (${total})</span>
          </button>` : ''}
        </div>
      </section>`;
  }

  /* ══════════════════════════════════════
     PERSONE
  ══════════════════════════════════════ */
  function renderPersone(data) {
    const T = I18N.t.bind(I18N);

    return `
      <section id="section-persone">
        <div class="section-inner container-wide">
          <div class="section-header reveal">
            <span class="section-eyebrow">${esc(T('people.eyebrow'))}</span>
            <h2 class="section-title">${esc(T('people.title'))}</h2>
            <p class="section-subtitle">${esc(T('people.subtitle'))}</p>
          </div>
          <p class="people-label reveal">${esc(T('people.label_prof'))}</p>
          <div class="grid-auto-200 reveal" style="margin-bottom:48px">
            ${data.people.professors.map(personCard).join('')}
          </div>
          <p class="people-label reveal">${esc(T('people.label_staff'))}</p>
          <div class="grid-auto-200 reveal" style="margin-bottom:48px">
            ${data.people.staff.map(personCard).join('')}
          </div>
          <p class="people-label reveal">${esc(T('people.label_phd'))}</p>
          <div class="grid-auto-200 reveal">
            ${data.people.phd.map(personCard).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ══════════════════════════════════════
     SPINOFF
  ══════════════════════════════════════ */
  function renderSpinoff(data) {
    const T = I18N.t.bind(I18N);
    const cards = data.spinoffs.map(s => `
      <div class="spinoff-card reveal">
        <div class="spinoff-code">${esc(s.code)}</div>
        <div class="spinoff-name">${esc(s.name)}</div>
        <div class="spinoff-founded">${esc(s.founded)}</div>
        <p class="spinoff-desc">${esc(bl(s.desc))}</p>
        <a class="spinoff-link" href="${esc(s.url)}" target="_blank" rel="noopener">
          ${esc(T('spinoff.visit'))}
        </a>
      </div>`).join('');

    return `
      <section id="section-spinoff">
        <div class="section-inner container-wide">
          <div class="section-header reveal">
            <span class="section-eyebrow">${esc(T('spinoff.eyebrow'))}</span>
            <h2 class="section-title">${esc(T('spinoff.title'))}</h2>
            <p class="section-subtitle">${esc(T('spinoff.subtitle'))}</p>
          </div>
          <div class="grid-auto-280">${cards}</div>
        </div>
      </section>`;
  }

  /* ══════════════════════════════════════
     FOOTER
  ══════════════════════════════════════ */
  function renderFooter(data) {
    const T   = I18N.t.bind(I18N);
    const { meta } = data;
    const secs = [
      { id:'section-home',          key:'nav.home' },
      { id:'section-ricerca',       key:'nav.research' },
      { id:'section-progetti',      key:'nav.projects' },
      { id:'section-pubblicazioni', key:'nav.publications' },
      { id:'section-persone',       key:'nav.people' },
      { id:'section-spinoff',       key:'nav.spinoff' },
    ];
    return `
      <div class="footer-top container-wide">
        <div>
          <div class="footer-brand">${esc(meta.name)}</div>
          <p class="footer-tagline">
            ${esc(bl(meta.fullName))}<br>
            ${esc(bl(meta.dept))}<br>
            ${esc(meta.address)}
          </p>
        </div>
        <div class="footer-col">
          <h4>${esc(T('footer.sections'))}</h4>
          <ul>${secs.map(s=>`<li><a href="#${s.id}">${esc(T(s.key))}</a></li>`).join('')}</ul>
        </div>
        <div class="footer-col">
          <h4>${esc(T('footer.department'))}</h4>
          <ul>
            <li><a href="https://www.dimi.univr.it" target="_blank">DIMI UniVR</a></li>
            <li><a href="${esc(meta.officialUrl)}" target="_blank">${esc(T('nav.official'))}</a></li>
            <li><a href="${esc(meta.cspUrl)}" target="_blank">Computer Science Park</a></li>
            <li><a href="https://www.univr.it" target="_blank">${esc(bl(meta.univ))}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${esc(T('footer.contact'))}</h4>
          <ul>
            <li><a href="mailto:${esc(meta.email)}">${esc(meta.email)}</a></li>
            <li><a href="tel:${esc(meta.phone)}">${esc(meta.phone)}</a></li>
            <li><a>${esc(T('footer.room'))}</a></li>
            <li><a>${esc(T('footer.address'))}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom container-wide">
        <p class="footer-copy">${esc(T('footer.copyright'))}</p>
        <p class="footer-copy">${esc(T('footer.dept_line'))}</p>
      </div>`;
  }

  return {
    renderHome, renderRicerca, renderProgetti,
    renderPubblicazioni, renderPersone, renderSpinoff, renderFooter,
  };
})();
