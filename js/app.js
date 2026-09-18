/* صفر چی — اپلیکیشن بازار سوپرپریمیوم */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const view = () => $("#view");

  const state = {
    vehicle: "car",
    filters: {},
    sort: "new",
    compare: JSON.parse(localStorage.getItem("sc_cmp") || "[]"),
    favs: JSON.parse(localStorage.getItem("sc_fav") || "[]"),
    alerts: JSON.parse(localStorage.getItem("sc_alerts") || "[]"),
    ads: JSON.parse(localStorage.getItem("sc_ads") || "[]"),
    user: JSON.parse(localStorage.getItem("sc_user") || "null"),
    sellStep: 1,
    sellDraft: {},
    chatOpen: false,
    story: null,
    priceTab: "market",
    accTab: "ads"
  };
  if (state.user && state.user.kind === "admin") {
    state.user = null;
    try { localStorage.setItem("sc_user", "null"); } catch (e) {}
  }
  SC.toast = toast;

  const faDigits = "۰۱۲۳۴۵۶۷۸۹";
  const fa = (n) => String(n).replace(/\d/g, (d) => faDigits[d]);
  const group3 = (n) => {
    if (n == null || n === "") return "";
    const num = Number(String(n).replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d.-]/g, ""));
    if (!isFinite(num)) return fa(n);
    const neg = num < 0;
    const [int, dec] = String(Math.abs(Math.round(num))).split(".");
    const g = int.replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
    return fa((neg ? "-" : "") + g + (dec ? "." + dec : ""));
  };
  const money = (n) => {
    if (n == null || n === "") return "—";
    return group3(n) + " تومان";
  };
  const km = (n) => (Number(n) === 0 ? "صفر کیلومتر" : group3(n) + " کیلومتر");
  SC.fa = fa;
  SC.group3 = group3;
  SC.money = money;
  SC.parseNum = (s) => {
    const t = String(s == null ? "" : s).replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d.-]/g, "");
    return t === "" || t === "-" ? 0 : Number(t);
  };
  const save = () => {
    try {
      localStorage.setItem("sc_cmp", JSON.stringify(state.compare));
      localStorage.setItem("sc_fav", JSON.stringify(state.favs));
      localStorage.setItem("sc_alerts", JSON.stringify(state.alerts));
      localStorage.setItem("sc_user", JSON.stringify(state.user));
      try { localStorage.setItem("sc_ads", JSON.stringify(state.ads)); }
      catch (e) {
        const slim = (state.ads || []).map((a) => ({ ...a, gallery: (a.gallery || []).slice(0, 2), cert: a.cert ? "" : "" }));
        localStorage.setItem("sc_ads", JSON.stringify(slim));
      }
    } catch (e) { console.warn(e); }
  };
  SC.getAppState = () => state;
  SC.saveApp = save;

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2400);
  }

  function allVehicles() {
    const live = (state.ads || []).filter((a) => a.status === "published" || (!a.status && a.verified));
    return [...SC.cars, ...SC.motors, ...SC.heavies, ...live];
  }
  function byId(id) {
    return allVehicles().find((x) => x.id === id) || (state.ads || []).find((x) => x.id === id);
  }

  function applyFilters(list, extra = {}) {
    const f = { ...state.filters, ...extra };
    return list.filter((c) => {
      if (f.q) {
        const blob = `${c.brand} ${c.model} ${c.trim || ""} ${c.city}`.toLowerCase();
        if (!blob.includes(String(f.q).toLowerCase())) return false;
      }
      if (f.brand && c.brand !== f.brand && c.brandId !== f.brand) return false;
      if (f.body && c.body !== f.body) return false;
      if (f.city && c.city !== f.city) return false;
      if (f.gear && c.gear !== f.gear) return false;
      if (f.fuel && c.fuel !== f.fuel) return false;
      if (f.color && c.color !== f.color) return false;
      if (f.paint && c.paint !== f.paint) return false;
      if (f.drive && c.drive !== f.drive) return false;
      if (f.origin && c.origin !== f.origin) return false;
      if (f.special && c.special !== f.special) return false;
      if (f.lifestyle && !(c.lifestyle || []).includes(f.lifestyle)) return false;
      if (f.installment === true && !c.installment) return false;
      if (f.inspected && !c.inspected) return false;
      if (f.verified && !c.verified) return false;
      if (f.video && !c.video) return false;
      if (f.discount && !c.oldPrice) return false;
      if (f.photoOnly && !(c.photos > 0)) return false;
      if (f.cylinders && c.cylinders !== f.cylinders) return false;
      if (f.yearMin != null && (c.yearFa || c.year) < f.yearMin && c.year < f.yearMin) return false;
      if (f.mileageMax != null && c.mileage > f.mileageMax) return false;
      if (f.mileageMin != null && c.mileage < f.mileageMin) return false;
      if (f.priceMin != null && c.price < f.priceMin) return false;
      if (f.priceMax != null && c.price > f.priceMax) return false;
      if (f.status === "zero" && c.mileage !== 0) return false;
      if (f.status === "used" && c.mileage === 0) return false;
      return true;
    });
  }

  function sortList(list) {
    const arr = [...list];
    if (state.sort === "cheap") arr.sort((a, b) => a.price - b.price);
    else if (state.sort === "exp") arr.sort((a, b) => b.price - a.price);
    else if (state.sort === "year") arr.sort((a, b) => (b.year || 0) - (a.year || 0));
    else if (state.sort === "oldyear") arr.sort((a, b) => (a.year || 0) - (b.year || 0));
    else if (state.sort === "km") arr.sort((a, b) => a.mileage - b.mileage);
    else arr.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    return arr;
  }

  function icon(name) {
    const p = 'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    const map = {
      search: `<svg ${p} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>`,
      user: `<svg ${p} viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19"/></svg>`,
      heart: `<svg ${p} viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z"/></svg>`,
      bell: `<svg ${p} viewBox="0 0 24 24"><path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`,
      cmp: `<svg ${p} viewBox="0 0 24 24"><path d="M7 4v16M17 4v16M4 8h6M14 16h6"/></svg>`,
      menu: `<svg ${p} viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
      phone: `<svg ${p} viewBox="0 0 24 24"><path d="M7 3h4l1 5-3 2a12 12 0 0 0 5 5l2-3 5 1v4c0 1-1 2-2 2C10 19 5 14 5 5c0-1 1-2 2-2z"/></svg>`,
      chat: `<svg ${p} viewBox="0 0 24 24"><path d="M5 6h14v9H8l-3 3V6z"/></svg>`,
      close: `<svg ${p} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
      shield: `<svg ${p} viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z"/></svg>`,
      scan: `<svg ${p} viewBox="0 0 24 24"><path d="M4 8V5h3M16 5h3v3M20 16v3h-3M8 19H5v-3M4 12h16"/></svg>`,
      chart: `<svg ${p} viewBox="0 0 24 24"><path d="M4 19h16M7 16V9M12 16V5M17 16v-6"/></svg>`,
      card: `<svg ${p} viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>`,
      swap: `<svg ${p} viewBox="0 0 24 24"><path d="M7 7h11l-3-3M17 17H6l3 3"/></svg>`
    };
    return map[name] || map.search;
  }

  function flagSvg(country) {
    const codes = {
      "ایران": "ir", "چین": "cn", "ژاپن": "jp", "کره": "kr", "آلمان": "de",
      "آمریکا": "us", "انگلستان": "gb", "فرانسه": "fr", "ایتالیا": "it",
      "روسیه": "ru", "مالزی": "my", "رومانی": "ro", "چک": "cz", "اسپانیا": "es", "سوئد": "se"
    };
    const code = codes[country] || "un";
    return `<img class="cty-flag" src="images/flags/${code}.png" alt="${country}" width="160" height="107">`;
  }

  function bodySvg(id) {
    const file = { sedan: "sedan", suv: "suv", hatchback: "hatch", crossover: "cross", pickup: "pickup", coupe: "coupe", convertible: "conv", van: "van" }[id] || "sedan";
    return `<span class="bt-img"><i class="bt-halo" aria-hidden="true"></i><img src="images/body/${file}.png?v=7" alt="${id}"></span>`;
  }

  /* ---------- pieces ---------- */
  function cardHTML(c) {
    const favOn = state.favs.includes(c.id) ? "on" : "";
    const href = c.type === "motor" ? `#/motor/${c.id}` : c.type === "heavy" ? `#/heavy/${c.id}` : `#/car/${c.id}`;
    return `
      <article class="card">
        <a class="card-media" href="${href}">
          <img src="${c.img}" alt="${c.brand} ${c.model}">
          <div class="badges">
            ${c.pinned ? `<span class="badge gold">سنجاق‌شده</span>` : ""}
            ${c.inspected ? `<span class="badge ok">برگه کارشناسی</span>` : ""}
            ${c.verified ? `<span class="badge">احراز هویت</span>` : ""}
            ${c.oldPrice ? `<span class="badge warn">تخفیف‌دار</span>` : ""}
            ${c.mileage === 0 ? `<span class="badge gold">صفر</span>` : ""}
            ${c.installment ? `<span class="badge">اقساطی</span>` : ""}
            ${c.video ? `<span class="badge">ویدیو</span>` : ""}
          </div>
          <button class="fav ${favOn}" data-fav="${c.id}" aria-label="علاقه‌مندی">${icon("heart")}</button>
        </a>
        <div class="card-body">
          <a href="${href}"><h3>${c.brand} ${c.model}${c.trim ? " " + c.trim : ""}</h3></a>
          <div class="meta">
            <span>${fa(c.yearFa || c.year)}</span>
            <span>${km(c.mileage)}</span>
            <span>${c.gear || ""}</span>
          </div>
          <div class="loc">${c.city}${c.district ? " | " + c.district : ""} · ${c.posted || ""}</div>
          <div class="price-row-c">
            <div>
              ${c.oldPrice ? `<div class="old">${money(c.oldPrice)}</div>` : ""}
              <div class="price">${money(c.price)}</div>
            </div>
            <button class="icon-btn" data-cmp="${c.id}" title="مقایسه">${icon("cmp")}</button>
          </div>
        </div>
      </article>`;
  }

  function headerActive(path) {
    $$(".nav a").forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === `#${path}` || (path.startsWith("/car") && href === "#/cars"));
    });
    $("#cmpCount").textContent = state.compare.length || "";
    $("#cmpCount").style.display = state.compare.length ? "grid" : "none";
    $("#favCount").textContent = state.favs.length || "";
    $("#favCount").style.display = state.favs.length ? "grid" : "none";
    $("#userLabel").textContent = state.user ? (state.user.name || "حساب من") : "ورود";
  }

  /* ---------- pages ---------- */
  function renderHome() {
    const featured = SC.cars.filter((c) => c.pinned).slice(0, 8);
    const lifeBg = {
      luxury: "images/porsche.jpg",
      offroad: "images/pickup.jpg",
      work: "images/life-work.jpg",
      eco: "images/tesla.jpg",
      market: "images/hero.jpg",
      urban: "images/life-urban.jpg",
      family: "images/toyota-land.jpg",
      first: "images/life-first.jpg"
    };
    view().innerHTML = `
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-main-grid">

            <div class="hero-text-pane">
              <div class="eyebrow">ATELIER · صفر چی</div>
              <h1>بازار واقعی<br><em>خودروهای خاص</em></h1>
              <p class="hero-lead">از صفر کیلومتر تا کلکسیونی؛ کارشناسی‌شده، احراز هویت‌شده، با قیمت منصفانه بازار.</p>

              <div class="search-panel">
                <div class="tabs" id="vehTabs">
                  <button class="tab ${state.vehicle === "car" ? "active" : ""}" data-veh="car">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M7 17v2M17 17v2"/></svg>
                    <span>خودرو</span>
                  </button>
                  <button class="tab ${state.vehicle === "motor" ? "active" : ""}" data-veh="motor">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6M12 9l3 8M12 9H9l-3 4"/></svg>
                    <span>موتور</span>
                  </button>
                  <button class="tab ${state.vehicle === "heavy" ? "active" : ""}" data-veh="heavy">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    <span>کامیون</span>
                  </button>
                </div>

                <form class="search-grid" id="heroSearch">
                  <div class="field field-q">
                    <label>جستجو</label>
                    <input name="q" placeholder="برند یا مدل خودرو…">
                  </div>
                  <div class="field" id="heroFilter1">
                    <label>وضعیت</label>
                    <select name="status">
                      <option value="">همه</option>
                      <option value="zero">صفر</option>
                      <option value="used">کارکرده</option>
                    </select>
                  </div>
                  <div class="field" id="heroFilter2">
                    <label>گیربکس</label>
                    <select name="gear">
                      <option value="">همه</option>
                      <option>اتوماتیک</option>
                      <option>دنده‌ای</option>
                    </select>
                  </div>
                  <div class="field" id="heroFilter3">
                    <label>بودجه تا</label>
                    <select name="priceMax">
                      <option value="">آزاد</option>
                      <option value="2000000000">۲ میلیارد</option>
                      <option value="5000000000">۵ میلیارد</option>
                      <option value="12000000000">۱۲ میلیارد</option>
                      <option value="25000000000">۲۵ میلیارد</option>
                    </select>
                  </div>
                  <button class="btn btn-gold search-go" type="submit">
                    <span>جستجوی خودرو</span>
                  </button>
                </form>
              </div>
            </div>

            <div class="hero-vehicle-stage" id="heroVehicleStage" title="کلیک کنید تا نور بالا بزند!">
              <div class="veh-media-wrap" id="vehInteractiveArea">
                <img class="veh-img" id="vehMainImg" src="images/car-hero.jpg?v=20" alt="Eplakcar Atelier Vehicle">
                <div class="veh-ground-glow" id="vehGroundGlow"></div>
                <div class="headlights-layer" id="vehHeadlightsLayer"></div>
                <canvas class="exhaust-smoke-canvas" id="exhaustSmokeCanvas"></canvas>
              </div>

              <div class="veh-hud-top">
                <div class="veh-gauge-cluster" id="vehGaugeCluster" title="صفحه کیلومتر و دور موتور هوشمند">
                  <div class="cluster-dial-box">
                    <svg class="cluster-dial-svg" viewBox="0 0 100 62">
                      <path class="cluster-track-bg" d="M 14 54 A 38 38 0 1 1 86 54" fill="none" stroke-width="4.5" stroke-linecap="round"/>
                      <path class="cluster-track-active" id="clusterRpmArc" d="M 14 54 A 38 38 0 1 1 86 54" fill="none" stroke="url(#clusterRpmGrad)" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="170" stroke-dashoffset="170"/>
                      <defs>
                        <linearGradient id="clusterRpmGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#0b989c"/>
                          <stop offset="65%" stop-color="#f48711"/>
                          <stop offset="92%" stop-color="#ef4444"/>
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="54" r="5" fill="#0d1b22" stroke="#f48711" stroke-width="1.5"/>
                      <line id="clusterNeedle" x1="50" y1="54" x2="50" y2="18" stroke="#f48711" stroke-width="2.2" stroke-linecap="round" transform="rotate(-115 50 54)"/>
                    </svg>
                    <div class="cluster-shift-light" id="clusterShiftLight"></div>
                  </div>

                  <div class="cluster-data">
                    <div class="cluster-data-top">
                      <span class="cluster-gear" id="clusterGear" title="وضعیت گیربکس">P</span>
                      <div class="cluster-speed">
                        <span class="speed-num" id="clusterSpeedNum">۰</span>
                        <span class="speed-unit">KM/H</span>
                      </div>
                    </div>
                    <div class="cluster-data-bottom">
                      <div class="cluster-rpm-digital">
                        <span class="rpm-lbl">دور:</span>
                        <span class="rpm-val"><b id="vehRpmValue">۰</b> <small>RPM</small></span>
                      </div>
                      <div class="cluster-status-icons">
                        <span class="cluster-icon icon-engine" id="clusterEngineIcon" title="چراغ چک انجین">ENG</span>
                        <span class="cluster-icon icon-ready" id="clusterReadyIcon" title="وضعیت استارت پیشرانه">READY</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="veh-specs-pill" id="vehSpecs">V6 توئین‌توربو · ۶۰۰ اسب بخار</div>
              </div>

              <div class="veh-hud-bottom">
                <div class="veh-model-badge">
                  <b id="vehModelName">پورشه 911 GT3 RS</b>
                  <small>آتلیه تخصصی صفر چی · تست چراغ و پیشرانه</small>
                </div>
                <div class="veh-actions-bar">
                  <button type="button" class="veh-act-btn btn-flash" id="vehFlashBtn" title="نور بالا دوبل">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <span>نور بالا</span>
                  </button>
                  <button type="button" class="veh-act-btn btn-rev" id="vehRevBtn" title="نگه دارید تا کاتاف بزند">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    <span>گاز دادن (کاتاف)</span>
                  </button>
                  <button type="button" class="veh-act-btn btn-audio btn-engine-start" id="vehAudioBtn" title="استارت و کنترل پیشرانه">
                    <svg class="engine-start-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                    <span class="btn-lbl">استارت پیشرانه</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="sec">
        <div class="wrap">
          <div class="sec-head">
            <div><h2>نوع بدنه</h2><p>انتخاب دقیق‌تر از همان نگاه اول</p></div>
            <a class="link-more" href="#/cars">نمایش همه آگهی‌ها ←</a>
          </div>
          <div class="body-grid">
            ${SC.bodyTypes.map((b) => `
              <a class="body-card" href="#/cars" data-set='${JSON.stringify({ body: b.id })}'>
                ${bodySvg(b.id)}<span>${b.name}</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head"><div><h2>آخرین استوری شعب</h2><p>فرصت‌های محدود، مستقیم از گالری</p></div></div>
          <div class="stories">
            ${SC.stories.map((s) => `
              <button class="story" data-story="${s.id}">
                <div class="story-ring"><img src="${s.img}" alt=""></div>
                <small>${s.branch}</small>
              </button>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <a href="#/estimate" class="est-banner" id="homeEstimate">
            <div>
              <div class="eyebrow">BODY MAP</div>
              <h2>تخمین قیمت با نقشه بدنه</h2>
              <p class="mute">روی کاپوت، گلگیر، درب، سقف، صندوق یا شاسی کلیک کنید و بگویید سالم است، رنگ شده، خوردگی دارد یا تعویض شده. قیمت همان لحظه کم می‌شود.</p>
              <span class="btn btn-gold" style="margin-top:14px;pointer-events:none">شروع تخمین قیمت</span>
            </div>
            <div class="est-banner-vis" aria-hidden="true"></div>
          </a>
        </div>
      </section>

      <section class="sec brand-sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <h2>برندها بر اساس کشور</h2>
              <p>روی پرچم برو؛ برندهای همان کشور داخل کادر می‌آیند</p>
            </div>
            <span class="mute">${fa(SC.brands.length)} برند · ${fa((SC.countryOrder || []).length)} کشور</span>
          </div>
          <div class="brand-find">
            <div class="inp brand-find-box">
              <label>جستجوی برند</label>
              <input id="brandFind" autocomplete="off" placeholder="نام برند را بنویسید؛ مثلاً تویوتا، فونیکس، بنز...">
            </div>
            <div class="brand-find-out" id="brandFindOut" hidden></div>
          </div>
          <div class="cty-grid">
            ${(SC.countryOrder || []).map((c) => {
              const list = SC.brands.filter((b) => b.country === c);
              if (!list.length) return "";
              return `
              <article class="cty-card" tabindex="0" data-country="${c}">
                <div class="cty-face">
                  <span class="cty-cloth">${flagSvg(c)}</span>
                  <h3>${c}</h3>
                  <em>${fa(list.length)} برند</em>
                </div>
                <div class="cty-brands">
                  <div class="cty-brands-head">
                    <span class="cty-cloth sm">${flagSvg(c)}</span>
                    <div><b>${c}</b><small>${fa(list.length)} برند</small></div>
                  </div>
                  <div class="cty-chips">
                    ${list.map((b) => `<a href="#/cars" data-set='${JSON.stringify({ brand: b.name })}'>${b.name}</a>`).join("")}
                  </div>
                </div>
              </article>`;
            }).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head">
            <div><h2>پیشنهادات ویژه صفر چی</h2><p>منتخب خودروهای شعبه با قیمت استثنایی</p></div>
            <a class="link-more" href="#/cars">همه پیشنهادها ←</a>
          </div>
          <div class="cards">${featured.map(cardHTML).join("")}</div>
        </div>
      </section>

      <section class="sec life-sec">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="eyebrow">LIFESTYLE</div>
              <h2>بر اساس کاربرد</h2>
              <p>از آتلیه لوکس تا بار کاری؛ هر سبک، آگهی خودش را دارد</p>
            </div>
            <a class="link-more" href="#/cars">همه سبک‌ها ←</a>
          </div>
          <div class="life-mosaic">
            ${SC.lifestyles.map((l) => `
              <a class="life-card life-${l.size}" href="#/cars" data-set='${JSON.stringify({ lifestyle: l.id })}'>
                <span class="life-bg" style="background-image:url('${lifeBg[l.id]}')"></span>
                <span class="life-num">${l.n}</span>
                <div class="life-in">
                  <small>${l.blurb}</small>
                  <h3>${l.name}</h3>
                  <div class="chips">${l.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
                  <em class="life-go">مشاهده آگهی‌ها</em>
                </div>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec svc-atelier-sec">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="eyebrow">ATELIER SERVICES</div>
              <h2>خدمات تخصصی</h2>
              <p>از کارشناسی تا کلید؛ مسیر معامله در یک نگاه</p>
            </div>
            <a class="link-more" href="#/services">همه خدمات ←</a>
          </div>
          <div class="svc-atelier">
            ${(() => {
              const go = (id) => ["fine","loan","custom","trade"].includes(id) ? "#/services" : id === "price" ? "#/prices" : "#/" + id;
              const vis = {
                fine: { cls: "feat", img: "images/svc-fine.jpg", n: "۰۱", tag: "PLATE" },
                custom: { cls: "feat", img: "images/svc-custom.jpg", n: "۰۲", tag: "FIND" },
                trade: { cls: "tile", img: "images/svc-trade.jpg", n: "۰۳", tag: "SWAP" },
                loan: { cls: "tile", img: "images/svc-loan.jpg", n: "۰۴", tag: "LEASE" },
                estimate: { cls: "tile", img: "images/svc-estimate.jpg", n: "۰۵", tag: "ATELIER" },
                inspect: { cls: "tile", img: "images/svc-inspect.jpg", n: "۰۶", tag: "INSPECT" },
                price: { cls: "slim", img: "images/svc-price.jpg", n: "۰۷", tag: "MARKET" },
                compare: { cls: "slim", img: "images/svc-compare.jpg", n: "۰۸", tag: "DUEL" },
                alert: { cls: "slim", img: "images/svc-alert.jpg", n: "۰۹", tag: "SIGNAL" }
              };
              const order = ["fine","custom","trade","loan","estimate","inspect","price","compare","alert"];
              return order.map((id) => {
                const s = (SC.services || []).find((x) => x.id === id);
                const v = vis[id];
                if (!s || !v) return "";
                return `<a class="svc-x ${v.cls}" href="${go(id)}">
                  <span class="svc-bg" style="background-image:url('${v.img}')"></span>
                  <span class="svc-n">${v.n}</span>
                  <span class="svc-tag">${v.tag}</span>
                  <div class="svc-in">
                    <h3>${s.title}</h3>
                    <p>${s.desc}</p>
                    <em>ورود به خدمت</em>
                  </div>
                </a>`;
              }).join("");
            })()}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head"><div><h2>فیلترهای پرطرفدار</h2><p>با چند فیلتر کاربردی، انتخابت را دقیق‌تر کن</p></div></div>
          <div class="quick-row">
            ${SC.quickFilters.map((q) => `
              <a class="quick" href="#/cars" data-set='${JSON.stringify({ [q.key]: q.val })}'>${q.label}</a>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head"><div><h2>کلاس قیمتی</h2><p>با توجه به بودجه</p></div></div>
          <div class="price-row">
            ${SC.priceClasses.map((p) => `
              <a class="pclass" href="#/cars" data-set='${JSON.stringify({ priceMin: p.min, priceMax: p.max === Infinity ? null : p.max })}'>
                <b>${p.name}</b><span>${p.range}</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head"><div><h2>برندهای پرتقاضا</h2></div></div>
          <div class="brand-row">
            ${SC.brands.filter((b) => b.hot).map((b) => `<a class="brand-pill" href="#/cars" data-set='${JSON.stringify({ brand: b.name })}'>${b.name}</a>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap why">
          <div class="why-visual"></div>
          <div>
            <div class="eyebrow">چرا صفر چی</div>
            <h2 style="font-size:32px;margin-bottom:16px">معامله‌ای بی‌دغدغه؛ از انتخاب تا تحویل کلید</h2>
            <ul>
              <li><span class="n">۰۱</span><div><b>کارشناسی استاندارد شعبه</b><p class="mute">ضخامت رنگ، شاسی، فنی و دیاگ قبل از انتشار آگهی.</p></div></li>
              <li><span class="n">۰۲</span><div><b>احراز هویت فروشنده</b><p class="mute">شماره، سند و هویت بررسی می‌شود؛ تماس بی‌واسطه با دلال نیست.</p></div></li>
              <li><span class="n">۰۳</span><div><b>قیمت‌گذاری هوشمند</b><p class="mute">نمودار بازار، کارخانه و نمایندگی برای هر مدل.</p></div></li>
              <li><span class="n">۰۴</span><div><b>دستیار هوشمند و گوش‌به‌زنگ</b><p class="mute">آگهی مطابق بودجه و سلیقه‌تان، همان لحظه به شما می‌رسد.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:10px">
        <div class="wrap">
          <div class="sec-head">
            <div><h2>مقالات و راهنمای خرید</h2></div>
            <a class="link-more" href="#/blog">مشاهده همه ←</a>
          </div>
          <div class="blog-grid">
            ${SC.blog.map((b) => `
              <a class="blog-card" href="#/blog/${b.id}">
                <img src="${b.img}" alt="">
                <div class="txt"><small>${b.cat} · ${b.date}</small><h3>${b.title}</h3><p class="mute">${b.excerpt}</p></div>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="sec garage-sec" id="garage">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="eyebrow">360° ATELIER</div>
              <h2>آتلیه M4 G82</h2>
              <p>عکس واقعی ماشین · موس را بالا، پایین، چپ و راست بکشید</p>
            </div>
            <a class="link-more" href="#/cars">رفتن به آگهی‌ها ←</a>
          </div>
          <div class="garage-layout">
            <div class="garage-stage" id="gStage">
              <div class="garage-status" id="gStatus">در حال آماده‌سازی دوربین ۳۶۰…</div>
              <div class="garage-hud">
                <div>
                  <small id="gBrand">${SC.garageBuilds[0].brand} · ${SC.garageBuilds[0].year}</small>
                  <h3 id="gName">${SC.garageBuilds[0].name}</h3>
                </div>
                <span class="garage-stance" id="gStance">${SC.garageBuilds[0].stance}</span>
              </div>
              <div class="garage-mods" id="gMods">
                ${SC.garageBuilds[0].mods.map((m) => `<span>${m}</span>`).join("")}
              </div>
              <div class="garage-ctrl">
                <button type="button" id="gLeft" aria-label="چرخش راست">↻</button>
                <button type="button" id="gReset" aria-label="بازنشانی">مرکز</button>
                <button type="button" id="gRight" aria-label="چرخش چپ">↺</button>
              </div>
              <div class="garage-note">دوربین ۳۶۰° · بکشید: چپ راست و بالا پایین</div>
            </div>
            <div class="garage-rail">
              ${SC.garageBuilds.map((g, i) => `
                <button type="button" class="garage-thumb ${i === 0 ? "on" : ""}" data-gbuild="${g.id}">
                  <img src="${g.img}" alt="">
                  <div>
                    <b>${g.name}</b>
                    <small>${g.brand} · ${g.year}</small>
                  </div>
                </button>`).join("")}
            </div>
          </div>
        </div>
      </section>`;

    if (window.heroVehicleCtrl) {
      window.heroVehicleCtrl.destroy();
      window.heroVehicleCtrl = null;
    }
    if (window.HeroVehicleController) {
      window.heroVehicleCtrl = new window.HeroVehicleController();
      window.heroVehicleCtrl.init();
      if (state.vehicle) {
        window.heroVehicleCtrl.switchVehicle(state.vehicle, true);
      }
    }
  }

  function filterSidebar(kind) {
    const fuels = kind === "heavy"
      ? ["دیزلی", "بنزینی"]
      : ["بنزینی", "هیبرید", "برقی", "دوگانه‌سوز", "دیزلی"];
    const pill = (name, val, label, cur) =>
      `<label class="${cur === val || (!cur && val === "") ? "on" : ""}"><input type="radio" name="${name}" value="${val}" ${cur === val || (!cur && val === "") ? "checked" : ""}>${label}</label>`;
    return `
      <aside class="filters">
        <div class="f-head">فیلتر آگهی</div>
        <div class="inp f-search"><input id="fQ" placeholder="برند یا مدل" value="${state.filters.q || ""}"></div>
        <h3>برند</h3>
        <div class="inp"><select id="fBrand">
          <option value="">همه برندها</option>
          ${SC.brands.map((b) => `<option ${state.filters.brand === b.name ? "selected" : ""}>${b.name}</option>`).join("")}
        </select></div>
        ${kind === "car" ? `
        <h3>بدنه</h3>
        <div class="f-pills">
          ${pill("body", "", "همه", state.filters.body)}
          ${SC.bodyTypes.map((b) => pill("body", b.id, b.name, state.filters.body)).join("")}
        </div>` : ""}
        <h3>وضعیت</h3>
        <div class="f-pills">
          ${pill("status", "", "همه", state.filters.status)}
          ${pill("status", "zero", "صفر", state.filters.status)}
          ${pill("status", "used", "کارکرده", state.filters.status)}
        </div>
        <h3>گیربکس</h3>
        <div class="f-pills">
          ${pill("gear", "", "همه", state.filters.gear)}
          ${pill("gear", "اتوماتیک", "اتومات", state.filters.gear)}
          ${pill("gear", "دنده‌ای", "دنده", state.filters.gear)}
        </div>
        <h3>سوخت</h3>
        <div class="f-pills">
          ${pill("fuel", "", "همه", state.filters.fuel)}
          ${fuels.map((f) => pill("fuel", f, f, state.filters.fuel)).join("")}
        </div>
        <h3>شهر</h3>
        <div class="inp"><select id="fCity">
          <option value="">همه شهرها</option>
          ${SC.cities.map((c) => `<option ${state.filters.city === c ? "selected" : ""}>${c}</option>`).join("")}
        </select></div>
        <h3>قیمت</h3>
        <div class="range-2">
          <div class="inp"><input id="fPmin" class="num3" inputmode="numeric" placeholder="از" value="${state.filters.priceMin || ""}"></div>
          <div class="inp"><input id="fPmax" class="num3" inputmode="numeric" placeholder="تا" value="${state.filters.priceMax || ""}"></div>
        </div>
        <h3>کارکرد</h3>
        <div class="range-2">
          <div class="inp"><input id="fKmin" placeholder="از" value="${state.filters.mileageMin || ""}"></div>
          <div class="inp"><input id="fKmax" placeholder="تا" value="${state.filters.mileageMax || ""}"></div>
        </div>
        ${kind === "car" ? `
        <h3>رنگ بدنه</h3>
        <div class="f-pills">
          ${pill("paint", "", "همه", state.filters.paint)}
          ${["بدون رنگ", "یک لکه", "چند لکه", "رنگ کامل"].map((p) => pill("paint", p, p, state.filters.paint)).join("")}
        </div>
        <h3>رنگ</h3>
        <div class="f-pills">
          ${pill("color", "", "همه", state.filters.color)}
          ${SC.colors.map((c) => pill("color", c, c, state.filters.color)).join("")}
        </div>` : ""}
        <h3>سایر</h3>
        <div class="f-pills f-checks">
          <label class="${state.filters.inspected ? "on" : ""}"><input type="checkbox" id="fIns" ${state.filters.inspected ? "checked" : ""}> کارشناسی</label>
          <label class="${state.filters.verified ? "on" : ""}"><input type="checkbox" id="fVer" ${state.filters.verified ? "checked" : ""}> احراز</label>
          <label class="${state.filters.video ? "on" : ""}"><input type="checkbox" id="fVid" ${state.filters.video ? "checked" : ""}> ویدیو</label>
          <label class="${state.filters.discount ? "on" : ""}"><input type="checkbox" id="fDisc" ${state.filters.discount ? "checked" : ""}> تخفیف</label>
          <label class="${state.filters.installment ? "on" : ""}"><input type="checkbox" id="fInst" ${state.filters.installment ? "checked" : ""}> اقساط</label>
        </div>
        <div class="f-actions">
          <button class="btn btn-gold btn-full" id="applyF">اعمال</button>
          <button class="btn btn-ghost" id="clearF">پاک</button>
        </div>
      </aside>`;
  }

  function renderList(kind) {
    const map = { car: SC.cars, motor: SC.motors, heavy: SC.heavies };
    const titles = { car: "خرید و فروش خودرو", motor: "خرید و فروش موتورسیکلت", heavy: "خودروهای سنگین" };
    let list = sortList(applyFilters([...(map[kind] || []), ...state.ads.filter((a) => (a.type || "car") === kind)]));
    const sorts = [
      ["new", "جدیدترین"],
      ["cheap", "ارزان‌ترین"],
      ["exp", "گران‌ترین"],
      ["year", "جدیدترین سال"],
      ["oldyear", "قدیمی‌ترین سال"],
      ["km", "کم‌کارکرد"]
    ];
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / ${titles[kind]}</div>
        <h1>${titles[kind]}</h1>
      </div>
      <div class="wrap listing">
        ${filterSidebar(kind)}
        <div>
          <div class="toolbar">
            <div class="left">${fa(list.length)} آگهی</div>
            <div class="sorts">
              ${sorts.map(([k, l]) => `<button data-sort="${k}" class="${state.sort === k ? "on" : ""}">${l}</button>`).join("")}
            </div>
          </div>
          ${list.length ? `<div class="cards">${list.map(cardHTML).join("")}</div>` : `<div class="empty">آگهی‌ای با این فیلتر پیدا نشد.</div>`}
        </div>
      </div>`;
    bindFilters();
  }

  function bindFilters() {
    $("#applyF")?.addEventListener("click", () => {
      const getR = (n) => document.querySelector(`input[name="${n}"]:checked`)?.value || "";
      state.filters = {
        ...state.filters,
        q: $("#fQ")?.value.trim() || "",
        brand: getR("brand"),
        body: getR("body"),
        status: getR("status"),
        gear: getR("gear"),
        fuel: getR("fuel"),
        color: getR("color"),
        paint: document.querySelector('input[name="paint"]:checked')?.value || state.filters.paint || "",
        city: $("#fCity")?.value || "",
        priceMin: $("#fPmin")?.value ? +$("#fPmin").value : null,
        priceMax: $("#fPmax")?.value ? +$("#fPmax").value : null,
        mileageMin: $("#fKmin")?.value ? +$("#fKmin").value : null,
        mileageMax: $("#fKmax")?.value ? +$("#fKmax").value : null,
        inspected: $("#fIns")?.checked,
        verified: $("#fVer")?.checked,
        video: $("#fVid")?.checked,
        discount: $("#fDisc")?.checked,
        installment: $("#fInst")?.checked
      };
      route();
    });
    $("#clearF")?.addEventListener("click", () => {
      state.filters = {};
      route();
    });
  }

  function renderDetail(id) {
    const c = byId(id);
    if (!c) {
      view().innerHTML = `<div class="wrap page-head"><div class="empty">آگهی پیدا نشد.</div></div>`;
      return;
    }
    const similar = SC.cars.filter((x) => x.id !== c.id && (x.body === c.body || x.brand === c.brand)).slice(0, 4);
    const scores = c.scores || { drive: 80, cabin: 80, value: 80, quality: 80 };
    const scoreLabel = { drive: "رانندگی", design: "طراحی", cabin: "کابین", value: "ارزش", quality: "کیفیت" };
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / آگهی‌ها / ${c.brand} ${c.model}</div>
      </div>
      <div class="wrap detail">
        <div>
          <div class="gallery">
            <div class="gallery-main"><img id="gMain" src="${c.img}" alt=""></div>
            <div class="thumbs">
              ${(c.gallery && c.gallery.length ? c.gallery : [c.img, "images/hero.jpg", "images/porsche.jpg", "images/bmw-m5.jpg"]).map((src, i) =>
                `<img src="${src}" class="${i === 0 ? "on" : ""}" data-g>`).join("")}
            </div>
          </div>
          <div class="panel">
            <h3>توضیحات فروشنده</h3>
            <p>${c.desc}</p>
          </div>
          ${c.bodyMap && Object.keys(c.bodyMap).length ? `<div class="panel"><h3>نقشه بدنه همین آگهی</h3>
            <div id="adBodyMap"></div></div>` : ""}
          <div class="panel">
            <h3>امکانات و آپشن‌ها</h3>
            <div class="chips">${(c.options || []).map((o) => `<span class="chip gold">${o}</span>`).join("") || "—"}</div>
          </div>
          ${c.scores ? `
          <div class="panel">
            <h3>امتیاز کارشناسی صفر چی</h3>
            <div class="score-row">
              ${Object.entries(scores).map(([k, v]) => `
                <div class="score"><span>${scoreLabel[k]}</span><div class="bar"><i style="width:${v}%"></i></div><b>${fa(v)}</b></div>
              `).join("")}
            </div>
          </div>` : ""}
          <div class="panel">
            <h3>نمودار قیمت بازار</h3>
            <canvas id="pChart" height="140"></canvas>
          </div>
          <div class="panel">
            <h3>آگهی‌های مشابه</h3>
            <div class="cards" style="grid-template-columns:repeat(2,1fr)">${similar.map(cardHTML).join("")}</div>
          </div>
        </div>
        <aside class="buybox">
          <div class="chips">
            ${c.inspected ? `<span class="chip gold">برگه کارشناسی</span>` : ""}
            ${c.verified ? `<span class="chip gold">احراز هویت</span>` : ""}
            ${c.branch ? `<span class="chip">${c.branch}</span>` : ""}
          </div>
          <h1>${c.brand} ${c.model} ${c.trim || ""}</h1>
          ${c.oldPrice ? `<div class="old">${money(c.oldPrice)}</div>` : ""}
          <div class="buy-price">${money(c.price)}</div>
          <table class="spec-table">
            <tr><td>سال</td><td>${fa(c.yearFa || c.year)}</td></tr>
            <tr><td>کارکرد</td><td>${km(c.mileage)}</td></tr>
            <tr><td>گیربکس</td><td>${c.gear || "—"}</td></tr>
            <tr><td>سوخت</td><td>${c.fuel || "—"}</td></tr>
            <tr><td>رنگ بدنه</td><td>${c.color || "—"}</td></tr>
            <tr><td>رنگ داخل</td><td>${c.interior || "—"}</td></tr>
            <tr><td>وضعیت رنگ</td><td>${c.paint || "—"}</td></tr>
            <tr><td>محور محرک</td><td>${c.drive || "—"}</td></tr>
            <tr><td>سیلندر</td><td>${c.cylinders ? fa(c.cylinders) : "—"}</td></tr>
            <tr><td>شهر</td><td>${c.city}${c.district ? "، " + c.district : ""}</td></tr>
            <tr><td>فروشنده</td><td>${c.seller} (${c.sellerType || "—"})</td></tr>
            <tr><td>انتشار</td><td>${c.posted || "—"}</td></tr>
          </table>
          <div class="buy-actions">
            <a class="btn btn-gold" href="tel:02191009000">${icon("phone")} تماس با فروشنده</a>
            <button class="btn btn-ghost" id="bookVisit">رزرو بازدید / تست درایو</button>
            <button class="btn btn-dark" data-fav="${c.id}">افزودن به علاقه‌مندی</button>
            <button class="btn btn-dark" data-cmp="${c.id}">افزودن به مقایسه</button>
            <a class="btn btn-ghost" href="#/inspect">درخواست کارشناسی مستقل</a>
          </div>
        </aside>
      </div>`;
    drawChart();
    if (c.bodyMap && $("#adBodyMap") && SC.mountBodyMap) SC.mountBodyMap($("#adBodyMap"), c.bodyMap);
    $$("[data-g]").forEach((img) =>
      img.addEventListener("click", () => {
        $("#gMain").src = img.src;
        $$("[data-g]").forEach((x) => x.classList.remove("on"));
        img.classList.add("on");
      })
    );
    $("#bookVisit")?.addEventListener("click", () => {
      toast("درخواست بازدید ثبت شد. مشاور شعبه تا یک ساعت تماس می‌گیرد.");
    });
  }

  function drawChart() {
    const cv = $("#pChart");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const w = (cv.width = cv.parentElement.clientWidth - 10);
    const h = (cv.height = 160);
    const pts = [88, 90, 87, 92, 95, 93, 97, 100, 98, 96, 99, 97];
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    for (let i = 0; i < 4; i++) {
      const y = 20 + i * 35;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = (i / (pts.length - 1)) * (w - 10) + 5;
      const y = h - 20 - (p / 110) * (h - 40);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.strokeStyle = "#0b989c";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function renderSell() {
    if (SC.renderSellPage) { SC.renderSellPage(); return; }
    if (!state.user) {
      view().innerHTML = `<div class="wrap page-head"><div class="crumbs">خانه / فروش</div><h1>ثبت آگهی</h1>
        <div class="empty">برای ساخت و انتشار آگهی باید با شماره و رمز وارد شوید.
        <div style="margin-top:14px"><button class="btn btn-gold" id="needLogin">ورود / ثبت‌نام</button>
        <a class="btn btn-ghost" href="#/seller">پنل فروشنده</a></div></div></div>`;
      $("#needLogin").onclick = () => SC.openAuth && SC.openAuth({ next: "#/sell", reason: "برای ثبت آگهی وارد شوید." });
      return;
    }
    const s = state.sellStep;
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / فروش</div>
        <h1>ثبت آگهی خودرو</h1>
        <p class="mute">در چهار گام، آگهی شما در صفر چی منتشر می‌شود.</p>
      </div>
      <div class="wrap" style="padding-bottom:60px">
        <div class="form-card">
          <div class="steps">
            ${[1, 2, 3, 4].map((n) => `<div class="step ${s >= n ? "on" : ""}"></div>`).join("")}
          </div>
          <p class="mute" style="margin-bottom:16px">گام ${fa(s)} از ۴ —
            ${["مشخصات خودرو", "وضعیت و قیمت", "توضیحات و تماس", "بازبینی و انتشار"][s - 1]}</p>
          <div id="sellBody"></div>
          <div style="display:flex;gap:8px;margin-top:18px">
            ${s > 1 ? `<button class="btn btn-ghost" id="sellPrev">قبلی</button>` : ""}
            <button class="btn btn-gold" id="sellNext">${s === 4 ? "انتشار آگهی" : "ادامه"}</button>
          </div>
        </div>
      </div>`;
    const body = $("#sellBody");
    const d = state.sellDraft;
    if (s === 1) {
      body.innerHTML = `
        <div class="form-grid">
          <div class="inp"><label>نوع</label>
            <select id="sType"><option value="car">خودرو</option><option value="motor">موتور</option><option value="heavy">سنگین</option></select></div>
          <div class="inp"><label>برند</label>
            <select id="sBrand">${SC.brands.map((b) => `<option>${b.name}</option>`).join("")}</select></div>
          <div class="inp"><label>مدل</label><input id="sModel" value="${d.model || ""}" placeholder="مثلاً کمری"></div>
          <div class="inp"><label>تیپ</label><input id="sTrim" value="${d.trim || ""}" placeholder="مثلاً لومیر"></div>
          <div class="inp"><label>سال ساخت</label><input id="sYear" type="number" value="${d.year || 1403}"></div>
          <div class="inp"><label>کارکرد (کیلومتر)</label><input id="sKm" type="number" value="${d.mileage ?? 0}"></div>
          <div class="inp"><label>گیربکس</label>
            <select id="sGear"><option>اتوماتیک</option><option>دنده‌ای</option></select></div>
          <div class="inp"><label>سوخت</label>
            <select id="sFuel"><option>بنزینی</option><option>هیبرید</option><option>برقی</option><option>دیزلی</option><option>دوگانه‌سوز</option></select></div>
        </div>`;
    } else if (s === 2) {
      body.innerHTML = `
        <div class="form-grid">
          <div class="inp"><label>رنگ بدنه</label><select id="sColor">${SC.colors.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="inp"><label>وضعیت رنگ</label>
            <select id="sPaint"><option>بدون رنگ</option><option>یک لکه</option><option>دو لکه</option><option>چند لکه</option><option>رنگ کامل</option></select></div>
          <div class="inp"><label>قیمت (تومان)</label><input id="sPrice" type="number" value="${d.price || ""}"></div>
          <div class="inp"><label>شرایط</label>
            <select id="sPay"><option value="0">نقدی</option><option value="1">اقساطی</option></select></div>
          <div class="inp"><label>شهر</label><select id="sCity">${SC.cities.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="inp"><label>محله</label><input id="sDist" value="${d.district || ""}"></div>
        </div>`;
    } else if (s === 3) {
      body.innerHTML = `
        <div class="form-grid">
          <div class="inp full"><label>توضیحات</label><textarea id="sDesc" rows="5">${d.desc || ""}</textarea></div>
          <div class="inp"><label>نام فروشنده</label><input id="sName" value="${d.seller || state.user?.name || ""}"></div>
          <div class="inp"><label>موبایل</label><input id="sTel" value="${d.tel || state.user?.tel || ""}" placeholder="۰۹۱۲..."></div>
        </div>`;
    } else {
      body.innerHTML = `
        <div class="panel" style="margin:0">
          <p>${d.brand || ""} ${d.model || ""} · ${fa(d.year || "")} · ${km(d.mileage || 0)}</p>
          <p class="gold" style="font-size:22px;font-weight:800;margin:8px 0">${money(d.price || 0)}</p>
          <p class="mute">${d.desc || "بدون توضیح"}</p>
          <p style="margin-top:10px">با انتشار، آگهی شما پس از بررسی کوتاه در لیست قرار می‌گیرد. می‌توانید بعداً از حساب کاربری تمدید یا ویرایش کنید.</p>
        </div>`;
    }
    $("#sellNext").onclick = () => {
      if (s === 1) {
        Object.assign(state.sellDraft, {
          type: $("#sType").value, brand: $("#sBrand").value, model: $("#sModel").value,
          trim: $("#sTrim").value, year: +$("#sYear").value, yearFa: +$("#sYear").value,
          mileage: +$("#sKm").value, gear: $("#sGear").value, fuel: $("#sFuel").value
        });
      }
      if (s === 2) {
        Object.assign(state.sellDraft, {
          color: $("#sColor").value, paint: $("#sPaint").value, price: +$("#sPrice").value,
          installment: $("#sPay").value === "1", city: $("#sCity").value, district: $("#sDist").value
        });
      }
      if (s === 3) {
        Object.assign(state.sellDraft, { desc: $("#sDesc").value, seller: $("#sName").value, tel: $("#sTel").value });
      }
      if (s === 4) {
        if (!state.user) {
          openLogin();
          toast("برای انتشار وارد شوید.");
          return;
        }
        const ad = {
          ...state.sellDraft,
          id: "ad" + Date.now(),
          img: "images/peugeot.jpg",
          photos: 1,
          posted: "لحظاتی پیش",
          inspected: false,
          verified: true,
          pinned: false,
          sellerType: "شخصی",
          seller: state.sellDraft.seller || state.user.name
        };
        state.ads.unshift(ad);
        save();
        state.sellStep = 1;
        state.sellDraft = {};
        toast("آگهی شما منتشر شد.");
        location.hash = "#/account";
        return;
      }
      state.sellStep++;
      renderSell();
    };
    $("#sellPrev") && ($("#sellPrev").onclick = () => { state.sellStep--; renderSell(); });
  }

  function renderPrices() {
    const tab = state.priceTab;
    const key = tab === "factory" ? "factory" : tab === "dealer" ? "dealer" : "market";
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / قیمت روز</div>
        <h1>قیمت روز خودرو — ۲۳ مرداد ۱۴۰۵</h1>
        <p class="mute">آخرین به‌روزرسانی امروز · بازار، کارخانه و نمایندگی · <a class="gold" href="#/estimate">تخمین قیمت کارکرده با نقشه بدنه</a></p>
        <div class="tabs" style="margin-top:16px">
          <button class="tab ${tab === "market" ? "active" : ""}" data-pt="market">بازار</button>
          <button class="tab ${tab === "factory" ? "active" : ""}" data-pt="factory">کارخانه</button>
          <button class="tab ${tab === "dealer" ? "active" : ""}" data-pt="dealer">نمایندگی</button>
        </div>
      </div>
      <div class="wrap" style="padding-bottom:60px">
        <div class="inp" style="max-width:360px;margin-bottom:14px"><input id="priceQ" placeholder="جستجوی برند یا مدل"></div>
        <div class="panel" style="margin:0;overflow:auto">
          <table class="price-table" id="pTable">
            <thead><tr><th>برند</th><th>مدل</th><th>سال</th><th>قیمت</th><th>تغییر</th></tr></thead>
            <tbody>
              ${SC.prices.map((p) => `
                <tr>
                  <td>${p.brand}</td><td>${p.model}</td><td>${fa(p.year)}</td>
                  <td>${p[key] ? money(p[key]) : "—"}</td>
                  <td class="${p.change >= 0 ? "up" : "down"}">${p.change >= 0 ? "▲" : "▼"} ${fa(Math.abs(p.change))}٪</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;
    $$("[data-pt]").forEach((b) =>
      b.addEventListener("click", () => {
        state.priceTab = b.dataset.pt;
        renderPrices();
      })
    );
    $("#priceQ").addEventListener("input", (e) => {
      const q = e.target.value.trim();
      $$("#pTable tbody tr").forEach((tr) => {
        tr.style.display = tr.textContent.includes(q) || !q ? "" : "none";
      });
    });
  }

  function renderCompare() {
    const items = state.compare.map(byId).filter(Boolean);
    while (items.length < 3) items.push(null);
    const rows = [
      ["قیمت", (c) => money(c.price)],
      ["سال", (c) => fa(c.yearFa || c.year)],
      ["کارکرد", (c) => km(c.mileage)],
      ["گیربکس", (c) => c.gear],
      ["سوخت", (c) => c.fuel],
      ["رنگ", (c) => c.color],
      ["وضعیت رنگ", (c) => c.paint || "—"],
      ["محور", (c) => c.drive || "—"],
      ["شهر", (c) => c.city]
    ];
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / مقایسه</div>
        <h1>مقایسه خودرو</h1>
        <p class="mute">تا سه آگهی را کنار هم بگذارید.</p>
      </div>
      <div class="wrap" style="padding-bottom:60px">
        <div class="compare-grid">
          ${items.map((c, i) => c ? `
            <article class="card">
              <div class="card-media"><img src="${c.img}" alt=""><button class="fav on" data-rmcmp="${c.id}">${icon("close")}</button></div>
              <div class="card-body"><h3>${c.brand} ${c.model}</h3><div class="price">${money(c.price)}</div></div>
            </article>` : `
            <a class="cmp-pick" href="#/cars"><div>+ افزودن خودرو از لیست آگهی‌ها</div></a>`
          ).join("")}
        </div>
        ${state.compare.length ? `
        <div class="panel">
          <table class="price-table">
            <thead><tr><th>مشخصه</th>${items.map((c) => `<th>${c ? c.model : "—"}</th>`).join("")}</tr></thead>
            <tbody>
              ${rows.map(([n, fn]) => `<tr><td>${n}</td>${items.map((c) => `<td>${c ? fn(c) : "—"}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>` : `<div class="empty" style="margin-top:20px">هنوز خودرویی برای مقایسه انتخاب نشده.</div>`}
      </div>`;
  }

  function renderSpecs() {
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / مشخصات فنی</div>
        <h1>کاتالوگ مشخصات فنی</h1>
        <p class="mute">امتیازدهی صفر چی روی رانندگی، طراحی، کابین، ارزش و کیفیت</p>
      </div>
      <div class="wrap" style="padding-bottom:60px;display:grid;gap:16px">
        ${SC.specs.map((s) => `
          <div class="panel" style="display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:center">
            <img src="${s.img}" alt="" style="border-radius:14px;height:140px;width:100%;object-fit:cover">
            <div>
              <h3>${s.brand} ${s.model} ${fa(s.year)}</h3>
              <div class="meta" style="margin:8px 0">${s.engine} · ${s.power} · ۰ تا ۱۰۰: ${s.acc}</div>
              <div class="score-row">
                ${Object.entries(s.scores).map(([k, v]) => {
                  const L = { drive: "رانندگی", design: "طراحی", cabin: "کابین", value: "ارزش", quality: "کیفیت" };
                  return `<div class="score"><span>${L[k]}</span><div class="bar"><i style="width:${v}%"></i></div><b>${fa(v)}</b></div>`;
                }).join("")}
              </div>
              <p class="mute" style="margin-top:8px">شتاب ${s.acc} · نهایت ${fa(s.top)} · مصرف ${s.fuelCons} · ابعاد ${s.dim} · ${fa(s.seats)} صندلی · ${fa(s.airbags)} ایربگ</p>
            </div>
          </div>`).join("")}
      </div>`;
  }

  function renderInspect() {
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / کارشناسی</div>
        <div class="hero-slim">
          <div><div class="eyebrow">INSPECTION</div>
          <h1>کارشناسی تخصصی بدنه و فنی</h1>
          <p class="mute">کارشناس تا یک ساعت در محل شماست. گزارش مکتوب + قیمت‌گذاری روز.</p></div>
        </div>
      </div>
      <div class="wrap" style="padding-bottom:60px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
        <div class="form-card">
          <h3 style="margin-bottom:12px">رزرو کارشناسی</h3>
          <div class="form-grid">
            <div class="inp"><label>نام</label><input id="iName"></div>
            <div class="inp"><label>موبایل</label><input id="iTel"></div>
            <div class="inp"><label>نوع</label><select><option>در محل شما</option><option>در شعبه</option></select></div>
            <div class="inp"><label>شهر</label><select>${SC.cities.map((c) => `<option>${c}</option>`).join("")}</select></div>
            <div class="inp full"><label>آدرس یا شعبه</label><input></div>
            <div class="inp full"><label>توضیح خودرو</label><textarea rows="3"></textarea></div>
          </div>
          <button class="btn btn-gold" style="margin-top:14px" id="iGo">ثبت درخواست</button>
        </div>
        <div>
          <div class="panel"><h3>چه چیزهایی بررسی می‌شود؟</h3>
            <ul class="mute">
              <li>• ضخامت رنگ تمام قطعات و تشخیص رنگ‌شدگی / تعویض</li>
              <li>• شاسی، ستون، سقف و کف</li>
              <li>• موتور، گیربکس، دیاگ و نشتی‌ها</li>
              <li>• آپشن‌ها، کیلومتر، اصالت اتاق</li>
              <li>• قیمت‌گذاری منصفانه نسبت به بازار صفر چی</li>
            </ul>
          </div>
          <div class="panel"><h3>تعرفه</h3>
            <table class="spec-table">
              <tr><td>سواری در محل تهران</td><td>۲٬۹۰۰٬۰۰۰ تومان</td></tr>
              <tr><td>شاسی‌بلند / لوکس</td><td>۳٬۹۰۰٬۰۰۰ تومان</td></tr>
              <tr><td>موتورسیکلت</td><td>۱٬۴۰۰٬۰۰۰ تومان</td></tr>
              <tr><td>سنگین</td><td>توافقی</td></tr>
            </table>
          </div>
        </div>
      </div>`;
    $("#iGo").onclick = () => toast("درخواست کارشناسی ثبت شد. هماهنگ‌کننده به‌زودی تماس می‌گیرد.");
  }

  function renderBranches() {
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / شعب</div>
        <h1>شعب حضوری صفر چی</h1>
        <p class="mute">برای مشاوره، کارشناسی و ثبت آگهی ویژه به نزدیک‌ترین گالری سر بزنید.</p>
      </div>
      <div class="wrap branch-grid" style="padding-bottom:60px">
        ${SC.branches.map((b) => `
          <article class="branch">
            <small class="gold">${b.city}</small>
            <h3>${b.name}</h3>
            <p class="mute">${b.addr}</p>
            <p style="margin:8px 0">${b.tel} · داخلی ${b.ext}</p>
            <p class="mute">${b.hours}</p>
            <div class="chips" style="margin:10px 0">${b.services.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
            <a class="btn btn-ghost" href="tel:02191009000">تماس با شعبه</a>
          </article>`).join("")}
      </div>`;
  }

  function renderBlog(id) {
    if (id) {
      const b = SC.blog.find((x) => x.id === id);
      if (!b) return;
      view().innerHTML = `
        <div class="wrap page-head"><div class="crumbs">خانه / مجله / ${b.title}</div></div>
        <div class="wrap" style="max-width:820px;padding-bottom:60px">
          <img src="${b.img}" style="border-radius:22px;width:100%;height:360px;object-fit:cover;margin-bottom:18px">
          <small class="gold">${b.cat} · ${b.date}</small>
          <h1 style="margin:8px 0 16px">${b.title}</h1>
          <p style="font-size:17px;color:var(--ivory-dim)">${b.body}</p>
        </div>`;
      return;
    }
    view().innerHTML = `
      <div class="wrap page-head"><div class="crumbs">خانه / مجله</div><h1>مجله صفر چی</h1></div>
      <div class="wrap blog-grid" style="padding-bottom:60px">
        ${SC.blog.map((b) => `
          <a class="blog-card" href="#/blog/${b.id}">
            <img src="${b.img}" alt="">
            <div class="txt"><small>${b.cat} · ${b.date}</small><h3>${b.title}</h3><p class="mute">${b.excerpt}</p></div>
          </a>`).join("")}
      </div>`;
  }

  function renderAlert() {
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / گوش‌به‌زنگ</div>
        <h1>گوش‌به‌زنگ</h1>
        <p class="mute">فیلتر دلخواه‌تان را ذخیره کنید؛ به‌محض انتشار آگهی مطابق، خبرتان می‌کنیم.</p>
      </div>
      <div class="wrap" style="padding-bottom:60px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
        <div class="form-card">
          <div class="form-grid">
            <div class="inp"><label>برند</label><select id="aBrand"><option value="">همه</option>${SC.brands.map((b) => `<option>${b.name}</option>`).join("")}</select></div>
            <div class="inp"><label>حداکثر قیمت</label><input id="aPrice" type="number"></div>
            <div class="inp"><label>حداکثر کارکرد</label><input id="aKm" type="number"></div>
            <div class="inp"><label>شهر</label><select id="aCity"><option value="">همه</option>${SC.cities.map((c) => `<option>${c}</option>`).join("")}</select></div>
          </div>
          <button class="btn btn-gold" style="margin-top:14px" id="aGo">فعال‌سازی گوش‌به‌زنگ</button>
        </div>
        <div>
          ${state.alerts.length ? state.alerts.map((a, i) => `
            <div class="panel"><b>${a.brand || "همه برندها"}</b>
              <p class="mute">تا ${a.price ? money(a.price) : "هر قیمت"} · ${a.km ? km(a.km) : "هر کارکرد"} · ${a.city || "همه شهرها"}</p>
              <button class="btn btn-ghost" data-adel="${i}">حذف</button>
            </div>`).join("") : `<div class="empty">هنوز گوش‌به‌زنگی ندارید.</div>`}
        </div>
      </div>`;
    $("#aGo").onclick = () => {
      if (!state.user) { openLogin(); toast("برای ساخت گوش‌به‌زنگ وارد شوید."); return; }
      state.alerts.push({
        brand: $("#aBrand").value, price: +$("#aPrice").value || null,
        km: +$("#aKm").value || null, city: $("#aCity").value
      });
      save();
      toast("گوش‌به‌زنگ فعال شد.");
      renderAlert();
    };
  }

  function renderServices() {
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / خدمات</div>
        <h1>خدمات جانبی بازار</h1>
      </div>
      <div class="wrap" style="padding-bottom:60px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
        <div class="form-card">
          <h3>استعلام خلافی خودرو و موتور</h3>
          <p class="mute" style="margin:8px 0 14px">پلاک را وارد کنید تا خلاصه جریمه‌ها نمایش داده شود. این نسخه نمایشی است.</p>
          <div class="form-grid">
            <div class="inp"><label>نوع پلاک</label><select><option>سواری</option><option>موتور</option></select></div>
            <div class="inp"><label>شماره پلاک</label><input placeholder="۱۲ب۳۴۵ایران۱۱"></div>
          </div>
          <button class="btn btn-gold" style="margin-top:12px" id="fineGo">استعلام</button>
          <div id="fineRes"></div>
        </div>
        <div>
          <div class="panel">
            <h3>خرید اقساطی</h3>
            <p class="mute">پیش‌پرداخت از ۳۰٪، بازپرداخت ۱۲ تا ۳۶ ماهه با بانک‌های همکار. از صفحه آگهی، فیلتر «اقساطی» را بزنید یا از مشاور شعبه شرایط بگیرید.</p>
            <a class="btn btn-ghost" href="#/cars" style="margin-top:10px">آگهی‌های اقساطی</a>
          </div>
          <div class="panel">
            <h3>خرید سفارشی</h3>
            <p class="mute">مدل مدنظرتان در سایت نیست؟ بودجه و مشخصات را بگویید تا شبکه شعب پیدا کند.</p>
            <div class="inp" style="margin:10px 0"><input id="customQ" placeholder="مثلاً پورشه ماکان ۲۰۲۳ تا ۱۸ میلیارد"></div>
            <button class="btn btn-gold" id="customGo">ثبت سفارش پیدا کردن</button>
          </div>
          <div class="panel">
            <h3>معاوضه</h3>
            <p class="mute">خودرویتان را در شعبه قیمت‌گذاری می‌کنیم و مابه‌تفاوت را برای مدل بالاتر حساب می‌کنیم.</p>
            <a class="btn btn-ghost" href="#/branches">نزدیک‌ترین شعبه</a>
          </div>
        </div>
      </div>`;
    $("#fineGo").onclick = () => {
      $("#fineRes").innerHTML = `<div class="panel"><p>خلافی شبیه‌سازی‌شده: ${fa(3)} فقره · جمع ${money(4850000)}</p><p class="mute">پرداخت از درگاه رسمی پلیس راهور انجام شود.</p></div>`;
    };
    $("#customGo").onclick = () => toast("سفارش ثبت شد. مشاور اختصاصی پیگیری می‌کند.");
  }

  function renderAccount() {
    if (!state.user) {
      view().innerHTML = `<div class="wrap page-head"><h1>ورود مراجعه</h1>
        <p class="mute">ثبت آگهی، نقشه بدنه و گفتگو بعد از ورود اینجاست.</p></div>
        <div class="wrap" style="padding-bottom:80px"><div class="empty">وارد نشده‌اید.
        <div style="margin-top:14px"><button class="btn btn-gold" id="needLogin">ورود / ثبت‌نام</button></div></div></div>`;
      $("#needLogin").onclick = () => SC.openAuth ? SC.openAuth({ next: "#/account", reason: "برای بخش فروشنده وارد شوید." }) : openLogin();
      return;
    }
    if (SC.renderSeller) { SC.renderSeller(); return; }
    const favs = state.favs.map(byId).filter(Boolean);
    const myAds = state.ads.filter((a) => a.owner === state.user.id || a.tel === state.user.tel);
    view().innerHTML = `
      <div class="wrap page-head"><h1>حساب من</h1><p class="mute">${state.user.name} · ${state.user.tel}</p></div>
      <div class="wrap acc-grid" style="padding-bottom:60px">
        <nav class="side-nav">
          <a href="#/account" class="${state.accTab === "ads" ? "on" : ""}" data-at="ads">آگهی‌های من</a>
          <a href="#/account" class="${state.accTab === "fav" ? "on" : ""}" data-at="fav">علاقه‌مندی‌ها</a>
          <a href="#/alert">گوش‌به‌زنگ‌ها</a>
          <a href="#/compare">لیست مقایسه</a>
          <a href="#/sell">ثبت آگهی جدید</a>
          <a href="#/seller">پرونده فروشنده</a>
          <a id="logout">خروج</a>
        </nav>
        <div>
          ${state.accTab === "fav"
            ? (favs.length ? `<div class="cards">${favs.map(cardHTML).join("")}</div>` : `<div class="empty">علاقه‌مندی خالی است.</div>`)
            : (myAds.length ? `<div class="cards">${myAds.map(cardHTML).join("")}</div>` : `<div class="empty">هنوز آگهی ثبت نکرده‌اید.</div>`)}
        </div>
      </div>`;
    $$("[data-at]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        state.accTab = a.dataset.at;
        renderAccount();
      })
    );
    $("#logout").onclick = () => {
      state.user = null;
      save();
      toast("خارج شدید.");
      route();
    };
  }

  /* ---------- login / chat ---------- */
  function openLogin() {
    if (state.user) {
      location.hash = "#/account";
      return;
    }
    if (SC.openAuth) SC.openAuth({ next: "#/account", reason: "ورود مراجعه با شماره و رمز." });
  }

  function openStory(id) {
    const s = SC.stories.find((x) => x.id == id);
    if (!s) return;
    $("#overlay").classList.add("show");
    $("#overlay").classList.add("story-modal");
    $("#overlay").innerHTML = `
      <div class="modal">
        <img src="${s.img}" alt="">
        <div class="cap"><b>${s.branch}</b><p>${s.title}</p>
        <button class="btn btn-gold" id="stX">بستن</button></div>
      </div>`;
    $("#stX").onclick = closeOverlay;
  }
  function closeOverlay() {
    $("#overlay").className = "overlay";
    $("#overlay").innerHTML = "";
  }

  function botReply(q) {
    const t = q.toLowerCase();
    if (t.includes("قیمت") || t.includes("صفر")) return "قیمت روز بازار، کارخانه و نمایندگی را در بخش «قیمت روز» می‌بینید. برای مدل خاص، نامش را در جستجو بنویسید.";
    if (t.includes("مقایسه")) return "تا سه آگهی را با دکمه مقایسه ذخیره کنید و به صفحه مقایسه بروید.";
    if (t.includes("شعبه") || t.includes("آدرس")) return "شش شعبه داریم: فرمانیه، پاسداران، شریعتی، فردوس، نوشهر و ایرانمال. جزئیات در صفحه شعب است.";
    if (t.includes("کارشناس")) return "کارشناسی بدنه و فنی در محل یا شعبه انجام می‌شود. از صفحه کارشناسی رزرو کنید.";
    if (t.includes("اقساط")) return "آگهی‌های اقساطی را با فیلتر اقساطی ببینید. پیش‌پرداخت معمولاً از ۳۰ درصد است.";
    if (t.includes("میباخ") || t.includes("پورشه") || t.includes("لندکروز"))
      return "چند آگهی لوکس کارشناسی‌شده در پیشنهادات ویژه صفحه اصلی هست. می‌توانم شما را به لیست خودروها ببرم.";
    return "می‌توانم در پیدا کردن آگهی، مشخصات فنی، قیمت صفر، مقایسه، تخفیف‌دارها، خرید سفارشی و شعب کمکتان کنم. بودجه یا برند را بگویید.";
  }

  function pushChat(role, text) {
    const box = $("#chatMsgs");
    const d = document.createElement("div");
    d.className = "bubble " + role;
    d.textContent = text;
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
  }

  /* ---------- events / router ---------- */
  function bindGlobalClicks(e) {
    const set = e.target.closest("[data-set]");
    if (set) {
      try { state.filters = { ...state.filters, ...JSON.parse(set.dataset.set) }; } catch (_) {}
    }
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      e.preventDefault();
      const id = fav.dataset.fav;
      if (state.favs.includes(id)) state.favs = state.favs.filter((x) => x !== id);
      else state.favs.push(id);
      save();
      fav.classList.toggle("on");
      headerActive(location.hash.slice(1) || "/");
      toast("علاقه‌مندی به‌روز شد.");
    }
    const cmp = e.target.closest("[data-cmp]");
    if (cmp) {
      e.preventDefault();
      const id = cmp.dataset.cmp;
      if (state.compare.includes(id)) {
        state.compare = state.compare.filter((x) => x !== id);
      } else {
        if (state.compare.length >= 3) {
          toast("حداکثر سه خودرو برای مقایسه.");
          return;
        }
        state.compare.push(id);
      }
      save();
      headerActive(location.hash.slice(1) || "/");
      toast("لیست مقایسه به‌روز شد.");
    }
    const rm = e.target.closest("[data-rmcmp]");
    if (rm) {
      state.compare = state.compare.filter((x) => x !== rm.dataset.rmcmp);
      save();
      renderCompare();
      headerActive("/compare");
    }
    const st = e.target.closest("[data-story]");
    if (st) openStory(st.dataset.story);
    const adel = e.target.closest("[data-adel]");
    if (adel) {
      state.alerts.splice(+adel.dataset.adel, 1);
      save();
      renderAlert();
    }
    const veh = e.target.closest("[data-veh]");
    if (veh) {
      state.vehicle = veh.dataset.veh;
      $$("#vehTabs .tab").forEach((t) => t.classList.toggle("active", t === veh));
      if (window.heroVehicleCtrl) {
        window.heroVehicleCtrl.switchVehicle(state.vehicle);
      }
    }
    const sort = e.target.closest("[data-sort]");
    if (sort) {
      state.sort = sort.dataset.sort;
      route();
    }
  }

  function route() {
    const raw = location.hash.replace(/^#/, "") || "/";
    const parts = raw.split("/").filter(Boolean);
    const page = parts[0] || "home";
    const id = parts[1];
    window.scrollTo(0, 0);
    if (window.SC && SC.disposeGarage3D) SC.disposeGarage3D();
    if (page !== "home" && raw !== "/" && window.heroVehicleCtrl) {
      window.heroVehicleCtrl.destroy();
      window.heroVehicleCtrl = null;
    }
    $("#overlay").className = "overlay";
    $("#overlay").innerHTML = "";

    if (page === "home" || raw === "/") renderHome();
    else if (page === "cars") renderList("car");
    else if (page === "motor" && id) renderDetail(id);
    else if (page === "motor") renderList("motor");
    else if (page === "heavy" && id) renderDetail(id);
    else if (page === "heavy") renderList("heavy");
    else if (page === "car" && id) renderDetail(id);
    else if (page === "sell") renderSell();
    else if (page === "seller") renderAccount();
    else if (page === "admin") SC.renderAdmin ? SC.renderAdmin() : renderAccount();
    else if (page === "estimate") {
      const u = state.user;
      if (!u || u.kind === "admin") {
        view().innerHTML = `<div class="wrap page-head"><div class="crumbs">خانه / تخمین قیمت</div>
          <h1>تخمین قیمت با نقشه بدنه</h1>
          <p class="mute">برای شروع تخمین باید عضو صفر چی شوید.</p></div>
          <div class="wrap" style="padding-bottom:80px"><div class="empty">تخمین قیمت فقط برای اعضا است.
          <div style="margin-top:14px"><button class="btn btn-gold" id="needLoginEst">ورود / ثبت‌نام</button></div></div></div>`;
        const go = () => SC.openAuth
          ? SC.openAuth({ next: "#/estimate", reason: "برای شروع تخمین قیمت باید عضو شوید." })
          : openLogin();
        $("#needLoginEst") && ($("#needLoginEst").onclick = go);
        go();
        return;
      }
      SC.renderEstimate(view());
    }
    else if (page === "prices") renderPrices();
    else if (page === "compare") renderCompare();
    else if (page === "specs") renderSpecs();
    else if (page === "inspect") renderInspect();
    else if (page === "branches") renderBranches();
    else if (page === "blog") renderBlog(id);
    else if (page === "alert") renderAlert();
    else if (page === "services") renderServices();
    else if (page === "account") renderAccount();
    else renderHome();

    const path = "/" + (page === "home" ? "" : page);
    headerActive(raw.startsWith("/") ? raw : "/" + raw);
    bindPageForms();
  }

  function bindPageForms() {
    $$(".cty-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        const on = card.classList.contains("open");
        $$(".cty-card").forEach((c) => c.classList.remove("open"));
        if (!on) card.classList.add("open");
      });
    });
    const find = $("#brandFind");
    const out = $("#brandFindOut");
    if (find && out) {
      const runFind = () => {
        const q = find.value.trim().toLowerCase();
        if (!q) {
          out.hidden = true;
          out.innerHTML = "";
          $$(".cty-card").forEach((c) => c.classList.remove("hit"));
          return;
        }
        const hits = SC.brands.filter((b) =>
          `${b.name} ${b.id} ${b.country}`.toLowerCase().includes(q)
        );
        $$(".cty-card").forEach((c) => {
          c.classList.toggle("hit", hits.some((b) => b.country === c.dataset.country));
        });
        if (!hits.length) {
          out.hidden = false;
          out.innerHTML = `<div class="brand-miss">برندی با این نام پیدا نشد.</div>`;
          return;
        }
        out.hidden = false;
        out.innerHTML = hits.slice(0, 24).map((b) => `
          <a class="brand-hit" href="#/cars" data-set='${JSON.stringify({ brand: b.name })}'>
            ${flagSvg(b.country)}
            <span><b>${b.name}</b><small>${b.country}</small></span>
          </a>`).join("");
      };
      find.addEventListener("input", runFind);
    }
    const builds = SC.garageBuilds || [];
    const stage = $("#gStage");
    if (stage && builds.length && SC.mountGarage3D) {
      const go = () => { if (document.getElementById("gStage")) SC.mountGarage3D(stage); };
      requestAnimationFrame(() => requestAnimationFrame(go));
      const showBuild = (id) => {
        const g = builds.find((x) => x.id === id) || builds[0];
        SC.setGarageBuild(g.id);
        const b = $("#gBrand"); if (b) b.textContent = `${g.brand} · ${g.year}`;
        const n = $("#gName"); if (n) n.textContent = g.name;
        const s = $("#gStance"); if (s) s.textContent = g.stance;
        const m = $("#gMods");
        if (m) m.innerHTML = g.mods.map((x) => `<span>${x}</span>`).join("");
        $$("[data-gbuild]").forEach((el) => el.classList.toggle("on", el.dataset.gbuild === g.id));
        SC.resetGarageCam && SC.resetGarageCam();
      };
      $("#gLeft")?.addEventListener("click", () => SC.nudgeGarage && SC.nudgeGarage(-1));
      $("#gRight")?.addEventListener("click", () => SC.nudgeGarage && SC.nudgeGarage(1));
      $("#gReset")?.addEventListener("click", () => SC.resetGarageCam && SC.resetGarageCam());
      $$("[data-gbuild]").forEach((el) => el.addEventListener("click", () => showBuild(el.dataset.gbuild)));
    }
    $("#heroSearch")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.filters = {
        q: fd.get("q"),
        status: fd.get("status"),
        gear: fd.get("gear"),
        priceMax: fd.get("priceMax") ? +fd.get("priceMax") : null,
        volume: fd.get("volume"),
        class: fd.get("class"),
        heavyType: fd.get("heavyType"),
        emission: fd.get("emission")
      };
      const dest = state.vehicle === "motor" ? "#/motor" : state.vehicle === "heavy" ? "#/heavy" : "#/cars";
      location.hash = dest;
    });
  }

  function init() {
    document.addEventListener("click", bindGlobalClicks);
    window.addEventListener("hashchange", route);
    $("#themeToggle")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.scToggleTheme) window.scToggleTheme(e);
    });
    $("#openLogin").addEventListener("click", openLogin);
    $("#overlay").addEventListener("click", (e) => {
      if (e.target.id === "overlay") closeOverlay();
    });
    $$(".js-chat-toggle").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.chatOpen = !state.chatOpen;
        $("#chatBox").classList.toggle("open", state.chatOpen);
      })
    );
    $("#chatSend").addEventListener("click", sendChat);
    $("#chatInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendChat();
    });
    $$("[data-q]").forEach((b) =>
      b.addEventListener("click", () => {
        $("#chatInput").value = b.dataset.q;
        sendChat();
      })
    );
    $("#menuToggle").addEventListener("click", () => {
      $(".nav")?.classList.toggle("open");
    });
    SC.reroute = route;
    route();
  }

  function sendChat() {
    const inp = $("#chatInput");
    const q = inp.value.trim();
    if (!q) return;
    pushChat("me", q);
    inp.value = "";
    setTimeout(() => pushChat("bot", botReply(q)), 400);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
