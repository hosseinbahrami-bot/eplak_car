/* صفر چی — ورود، پنل فروشنده، پنل ادمین */
(function () {
  const SC = (window.SC = window.SC || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const view = () => $("#view");
  const faD = "۰۱۲۳۴۵۶۷۸۹";
  const fa = (n) => String(n).replace(/\d/g, (d) => faD[d]);
  const toast = (m) => (SC.toast ? SC.toast(m) : alert(m));
  const group3 = (n) => {
    if (SC.group3) return SC.group3(n);
    if (n == null || n === "") return "";
    const num = Number(n);
    if (!isFinite(num)) return fa(n);
    return fa(String(Math.round(Math.abs(num))).replace(/\B(?=(\d{3})+(?!\d))/g, "٬"));
  };
  const money = (n) => (n == null || n === "" ? "—" : group3(n) + " تومان");
  const parseNum = (s) => (SC.parseNum ? SC.parseNum(s) : Number(String(s).replace(/[^\d.-]/g, "")) || 0);
  function fmtVal(n) { return n == null || n === "" ? "" : group3(n); }

  const ALL_PERMS = { ads: 1, users: 1, prices: 1, blog: 1, branches: 1, admins: 1, estimates: 1 };
  const ROLE_PRESETS = {
    super: { label: "مدیرکل", perms: { ...ALL_PERMS } },
    editor: { label: "ویراستار", perms: { ads: 1, prices: 1, blog: 1, branches: 1 } },
    support: { label: "پشتیبانی", perms: { ads: 1, users: 1 } },
    inspector: { label: "کارشناس بدنه", perms: { ads: 1, estimates: 1 } }
  };

  const STAT = {
    ok: { label: "سالم", color: "#2a3140", stroke: "rgba(11,152,156,.45)" },
    pdr: { label: "صافکاری", color: "#c9b15a", stroke: "#e8d48b" },
    spot: { label: "رنگ جزئی", color: "#c9843a", stroke: "#e8a04a" },
    paint: { label: "رنگ‌شده", color: "#b4533c", stroke: "#e07a62" },
    replace: { label: "تعویض", color: "#6b2d7a", stroke: "#c084d4" },
    rust: { label: "خوردگی", color: "#8a4b28", stroke: "#d4925a" },
    damage: { label: "آسیب", color: "#8b1e2d", stroke: "#e05a6a" }
  };
  const PARTS = [
    { id: "hood", name: "کاپوت" }, { id: "roof", name: "سقف" }, { id: "trunk", name: "صندوق" },
    { id: "flf", name: "گلگیر جلو راننده" }, { id: "frf", name: "گلگیر جلو شاگرد" },
    { id: "rlf", name: "گلگیر عقب راننده" }, { id: "rrf", name: "گلگیر عقب شاگرد" },
    { id: "fld", name: "درب جلو راننده" }, { id: "frd", name: "درب جلو شاگرد" },
    { id: "rld", name: "درب عقب راننده" }, { id: "rrd", name: "درب عقب شاگرد" },
    { id: "lrock", name: "رکاب راننده" }, { id: "rrock", name: "رکاب شاگرد" },
    { id: "fbump", name: "سپر جلو" }, { id: "rbump", name: "سپر عقب" },
    { id: "flch", name: "شاسی جلو راننده" }, { id: "frch", name: "شاسی جلو شاگرد" },
    { id: "rlch", name: "شاسی عقب راننده" }, { id: "rrch", name: "شاسی عقب شاگرد" }
  ];

  function hash(s) {
    let h = 5381;
    s = "sc|" + s;
    for (let i = 0; i < s.length; i++) h = Math.imul(h, 33) ^ s.charCodeAt(i);
    return (h >>> 0).toString(16);
  }
  function normTel(t) {
    t = String(t || "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    t = t.replace(/\D/g, "");
    if (t.startsWith("98")) t = "0" + t.slice(2);
    if (t.length === 10 && t.startsWith("9")) t = "0" + t;
    return t;
  }
  function loadUsers() {
    try { return JSON.parse(localStorage.getItem("sc_users") || "[]"); } catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem("sc_users", JSON.stringify(list)); }
  function loadVisitors() {
    try {
      const v = JSON.parse(localStorage.getItem("sc_visitors") || "[]");
      if (v.length) return v;
      return loadUsers().filter((u) => u.kind !== "admin");
    } catch (e) { return []; }
  }
  function saveVisitors(list) { localStorage.setItem("sc_visitors", JSON.stringify(list)); }
  function loadAdmins() {
    try {
      const a = JSON.parse(localStorage.getItem("sc_admins") || "[]");
      if (a.length) return a;
      return loadUsers().filter((u) => u.kind === "admin");
    } catch (e) { return []; }
  }
  function saveAdmins(list) { localStorage.setItem("sc_admins", JSON.stringify(list)); }
  function adminSession() {
    try { return JSON.parse(localStorage.getItem("sc_admin_session") || "null"); } catch (e) { return null; }
  }
  function setAdminSession(a) {
    if (a) localStorage.setItem("sc_admin_session", JSON.stringify(a));
    else localStorage.removeItem("sc_admin_session");
  }
  function loadCMS() {
    try { return JSON.parse(localStorage.getItem("sc_cms") || "{}"); } catch (e) { return {}; }
  }
  function saveCMS(cms) { localStorage.setItem("sc_cms", JSON.stringify(cms)); }

  function seed() {
    const admins = loadAdmins();
    if (!admins.find((u) => u.role === "super")) {
      admins.unshift({
        id: "u-admin",
        tel: "09120000000",
        pass: hash("Admin1405!"),
        name: "مدیر صفر چی",
        kind: "admin",
        role: "super",
        perms: { ...ALL_PERMS },
        city: "تهران",
        created: Date.now()
      });
      saveAdmins(admins);
    }
    applyCMS();
  }
  function applyCMS() {
    const cms = loadCMS();
    if (cms.cars) SC.cars = cms.cars;
    if (cms.motors) SC.motors = cms.motors;
    if (cms.heavies) SC.heavies = cms.heavies;
    if (cms.prices) SC.prices = cms.prices;
    if (cms.blog) SC.blog = cms.blog;
    if (cms.branches) SC.branches = cms.branches;
    if (cms.stories) SC.stories = cms.stories;
    if (cms.garageBuilds) SC.garageBuilds = cms.garageBuilds;
  }
  function persistSite() {
    const cms = loadCMS();
    cms.cars = SC.cars;
    cms.motors = SC.motors;
    cms.heavies = SC.heavies;
    cms.prices = SC.prices;
    cms.blog = SC.blog;
    cms.branches = SC.branches;
    cms.stories = SC.stories;
    cms.garageBuilds = SC.garageBuilds;
    saveCMS(cms);
  }
  seed();

  function session() {
    const st = SC.getAppState ? SC.getAppState() : null;
    return st && st.user ? st.user : null;
  }
  function setSession(user) {
    if (SC.getAppState) {
      const st = SC.getAppState();
      st.user = user ? { id: user.id, tel: user.tel, name: user.name, kind: user.kind, role: user.role, perms: user.perms, city: user.city } : null;
      if (SC.saveApp) SC.saveApp();
    }
  }
  function can(key) {
    const u = adminSession();
    if (!u) return false;
    if (u.role === "super" || !u.role) return true;
    return !!(u.perms && u.perms[key]);
  }

  SC.currentUser = session;
  SC.canAdmin = can;

  /* ---------- premium body map ---------- */
  function mapSvg(parts, selected) {
    const fill = (id) => STAT[parts[id] || "ok"].color;
    const str = (id) => STAT[parts[id] || "ok"].stroke;
    const cls = (id) => `pmap-part${selected === id ? " on" : ""}`;
    const P = (id, d) =>
      `<path data-part="${id}" class="${cls(id)}" d="${d}" fill="${fill(id)}" stroke="${str(id)}" stroke-width="1.8"/>`;
    return `
    <svg class="pmap-svg" viewBox="0 0 420 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f48711" stop-opacity=".16"/>
          <stop offset="1" stop-color="#0b989c" stop-opacity=".08"/>
        </linearGradient>
        <linearGradient id="pglass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c5d8ea" stop-opacity=".45"/>
          <stop offset="1" stop-color="#6b8498" stop-opacity=".18"/>
        </linearGradient>
        <filter id="pglow"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#0b989c" flood-opacity=".55"/></filter>
      </defs>
      <ellipse cx="210" cy="860" rx="150" ry="16" fill="#0b989c" opacity=".18"/>
      <text x="210" y="36" text-anchor="middle" fill="#f48711" font-size="14" font-weight="700" font-family="YekanBakh, IranSans, Vazirmatn, Tahoma, sans-serif">جلو</text>
      <rect x="52" y="148" width="24" height="86" rx="12" fill="#111014" stroke="#3a3336"/>
      <rect x="344" y="148" width="24" height="86" rx="12" fill="#111014" stroke="#3a3336"/>
      <rect x="52" y="598" width="24" height="86" rx="12" fill="#111014" stroke="#3a3336"/>
      <rect x="344" y="598" width="24" height="86" rx="12" fill="#111014" stroke="#3a3336"/>
      ${P("fbump", "M128 78 C168 52 252 52 292 78 L304 104 C270 92 150 92 116 104 Z")}
      ${P("hood", "M122 108 C168 96 252 96 298 108 L286 248 C250 236 170 236 134 248 Z")}
      ${P("flf", "M86 120 C96 108 120 112 128 128 L118 250 C92 246 78 210 80 168 Z")}
      ${P("frf", "M334 120 C324 108 300 112 292 128 L302 250 C328 246 342 210 340 168 Z")}
      <path d="M138 252 L282 252 L268 318 L152 318 Z" fill="url(#pglass)" stroke="rgba(255,208,214,.28)"/>
      ${P("fld", "M78 258 C88 250 118 252 126 268 L122 430 C90 428 72 390 74 320 Z")}
      ${P("frd", "M342 258 C332 250 302 252 294 268 L298 430 C330 428 348 390 346 320 Z")}
      ${P("lrock", "M68 300 L82 292 L80 560 L66 552 Z")}
      ${P("rrock", "M352 300 L338 292 L340 560 L354 552 Z")}
      ${P("roof", "M148 322 C186 308 234 308 272 322 L264 500 C228 512 192 512 156 500 Z")}
      ${P("rld", "M78 436 C90 428 118 432 124 448 L120 600 C88 596 70 560 72 500 Z")}
      ${P("rrd", "M342 436 C330 428 302 432 296 448 L300 600 C332 596 350 560 348 500 Z")}
      <path d="M156 504 L264 504 L276 560 L144 560 Z" fill="url(#pglass)" stroke="rgba(255,208,214,.22)"/>
      ${P("rlf", "M86 610 C98 598 124 602 130 620 L122 732 C94 726 78 690 80 650 Z")}
      ${P("rrf", "M334 610 C322 598 296 602 290 620 L298 732 C326 726 342 690 340 650 Z")}
      ${P("trunk", "M140 564 C180 552 240 552 280 564 L272 730 C232 744 188 744 148 730 Z")}
      ${P("rbump", "M126 732 C170 754 250 754 294 732 L282 768 C240 784 180 784 138 768 Z")}
      <text x="210" y="190" text-anchor="middle" fill="#ffffff" font-size="13" pointer-events="none">کاپوت</text>
      <text x="210" y="420" text-anchor="middle" fill="#ffffff" font-size="13" pointer-events="none">سقف</text>
      <text x="210" y="660" text-anchor="middle" fill="#ffffff" font-size="13" pointer-events="none">صندوق</text>
      <text x="210" y="888" text-anchor="middle" fill="#f48711" font-size="13" letter-spacing="4">عقب · REAR</text>
    </svg>`;
  }

  function chassisSvg(parts, selected) {
    const fill = (id) => STAT[parts[id] || "ok"].color;
    const str = (id) => STAT[parts[id] || "ok"].stroke;
    const cls = (id) => `pmap-part${selected === id ? " on" : ""}`;
    const R = (id, x, y, w, h) =>
      `<rect data-part="${id}" class="${cls(id)}" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill(id)}" stroke="${str(id)}" stroke-width="1.8"/>`;
    return `
    <svg class="pmap-svg" viewBox="0 0 420 900" xmlns="http://www.w3.org/2000/svg">
      <rect x="96" y="90" width="228" height="700" rx="90" fill="none" stroke="rgba(255,208,214,.16)" stroke-dasharray="7 7"/>
      ${R("flch", 78, 120, 86, 110)}
      ${R("frch", 256, 120, 86, 110)}
      ${R("rlch", 78, 640, 86, 110)}
      ${R("rrch", 256, 640, 86, 110)}
      <text x="121" y="180" text-anchor="middle" fill="#ffffff" font-size="12" pointer-events="none">شاسی جلو</text>
      <text x="299" y="180" text-anchor="middle" fill="#ffffff" font-size="12" pointer-events="none">شاسی جلو</text>
      <text x="121" y="700" text-anchor="middle" fill="#ffffff" font-size="12" pointer-events="none">شاسی عقب</text>
      <text x="299" y="700" text-anchor="middle" fill="#ffffff" font-size="12" pointer-events="none">شاسی عقب</text>
    </svg>`;
  }

  SC.mountBodyMap = function (el, parts, onChange) {
    if (!el) return;
    parts = parts || {};
    let selected = null, tab = "body";
    const draw = () => {
      const keys = tab === "chassis"
        ? ["ok", "damage", "paint", "replace", "rust"]
        : ["ok", "pdr", "spot", "paint", "replace", "rust"];
      const part = PARTS.find((p) => p.id === selected);
      el.innerHTML = `
        <div class="pmap">
          <div class="pmap-toolbar">
            <button type="button" class="${tab === "body" ? "on" : ""}" data-mt="body">نمای بدنه</button>
            <button type="button" class="${tab === "chassis" ? "on" : ""}" data-mt="chassis">نقشه شاسی</button>
          </div>
          <div class="pmap-stage">${tab === "chassis" ? chassisSvg(parts, selected) : mapSvg(parts, selected)}</div>
          <div class="pmap-legend">
            ${Object.keys(STAT).map((k) => `<span><i style="background:${STAT[k].color};border-color:${STAT[k].stroke}"></i>${STAT[k].label}</span>`).join("")}
          </div>
          <div class="pmap-pad">
            ${part ? `<b>${part.name}</b>
              <div class="pmap-stats">
                ${keys.map((k) => `<button type="button" class="pmap-st ${parts[part.id] === k ? "on" : ""}" data-st="${k}" style="--c:${STAT[k].color}">${STAT[k].label}</button>`).join("")}
              </div>` : `<span class="mute">روی هر قطعه بزنید و وضعیت را انتخاب کنید.</span>`}
          </div>
        </div>`;
      $$("[data-mt]", el).forEach((b) => b.onclick = () => { tab = b.dataset.mt; selected = null; draw(); });
      $$("[data-part]", el).forEach((b) => b.onclick = () => { selected = b.getAttribute("data-part"); draw(); });
      $$("[data-st]", el).forEach((b) => b.onclick = () => {
        if (!selected) return;
        if (b.dataset.st === "ok") delete parts[selected];
        else parts[selected] = b.dataset.st;
        if (onChange) onChange({ ...parts });
        draw();
      });
    };
    draw();
    return {
      get: () => ({ ...parts }),
      set: (p) => { parts = { ...p }; draw(); }
    };
  };

  /* ---------- auth: visitor vs admin are completely separate ---------- */
  function closeOverlay() {
    const overlay = $("#overlay");
    if (!overlay) return;
    overlay.className = "overlay";
    overlay.innerHTML = "";
  }

  SC.openAuth = function (opts) {
    opts = opts || {};
    const overlay = $("#overlay");
    if (!overlay) return;
    overlay.className = "overlay show";
    overlay.innerHTML = `
      <div class="modal auth-modal">
        <div class="auth-brand">صفر چی · مراجعه</div>
        <h2 id="authTitle">ورود مراجعه</h2>
        <p class="mute" id="authHint">${opts.reason || "با شماره موبایل و رمز شخصی وارد شوید."}</p>
        <div class="auth-tabs">
          <button type="button" class="on" data-amode="in">ورود</button>
          <button type="button" data-amode="up">ثبت‌نام</button>
        </div>
        <div class="inp"><label>شماره موبایل</label><input id="auTel" inputmode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"></div>
        <div class="inp" id="auNameWrap" hidden><label>نام و نام خانوادگی</label><input id="auName" placeholder="مثلاً سارا محمدی"></div>
        <div class="inp"><label>رمز عبور</label><input id="auPass" type="password" placeholder="حداقل ۶ کاراکتر"></div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-gold btn-full" id="auGo">ادامه</button>
          <button class="btn btn-ghost" id="auX">انصراف</button>
        </div>
      </div>`;
    let mode = "in";
    const setMode = (m) => {
      mode = m;
      $("#authTitle").textContent = m === "in" ? "ورود مراجعه" : "ثبت‌نام مراجعه";
      $("#auNameWrap").hidden = m === "in";
      $$("[data-amode]").forEach((b) => b.classList.toggle("on", b.dataset.amode === m));
    };
    $$("[data-amode]").forEach((b) => b.onclick = () => setMode(b.dataset.amode));
    $("#auX").onclick = closeOverlay;
    $("#auGo").onclick = () => {
      const tel = normTel($("#auTel").value);
      const pass = $("#auPass").value;
      const name = ($("#auName") && $("#auName").value.trim()) || "";
      if (!/^09\d{9}$/.test(tel)) return toast("شماره موبایل معتبر نیست.");
      if (pass.length < 6) return toast("رمز حداقل ۶ کاراکتر باشد.");
      const visitors = loadVisitors();
      if (mode === "up") {
        if (visitors.find((u) => u.tel === tel)) return toast("این شماره قبلاً ثبت شده. وارد شوید.");
        const u = {
          id: "u" + Date.now(), tel, pass: hash(pass), name: name || "مراجعه‌کننده",
          kind: "visitor", role: "visitor", city: "", created: Date.now(),
          profile: {}, cars: []
        };
        visitors.push(u);
        saveVisitors(visitors);
        setSession(u);
        toast("حساب مراجعه ساخته شد. خوش آمدید " + u.name);
      } else {
        const u = visitors.find((x) => x.tel === tel);
        if (!u || u.pass !== hash(pass)) return toast("شماره یا رمز مراجعه نادرست است.");
        setSession(u);
        toast("خوش آمدید " + u.name);
      }
      closeOverlay();
      if (opts.next) location.hash = opts.next;
      else if (SC.reroute) SC.reroute();
    };
  };

  SC.openAdminAuth = function (opts) {
    opts = opts || {};
    const overlay = $("#overlay");
    if (!overlay) return;
    overlay.className = "overlay show";
    overlay.innerHTML = `
      <div class="modal auth-modal">
        <div class="auth-brand">صفر چی · ادمین</div>
        <h2>ورود مدیریت</h2>
        <p class="mute">${opts.reason || "این بخش فقط برای ادمین‌هاست و از حساب مراجعه جدا است."}</p>
        <div class="inp"><label>شماره ادمین</label><input id="adTelIn" inputmode="tel" placeholder="۰۹۱۲۰۰۰۰۰۰۰"></div>
        <div class="inp"><label>رمز ادمین</label><input id="adPassIn" type="password"></div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-gold btn-full" id="adGo">ورود ادمین</button>
          <button class="btn btn-ghost" id="adX">انصراف</button>
        </div>
        <p class="mute" style="margin-top:12px;font-size:11.5px">نمونه: ۰۹۱۲۰۰۰۰۰۰۰ / Admin1405!</p>
      </div>`;
    $("#adX").onclick = closeOverlay;
    $("#adGo").onclick = () => {
      const tel = normTel($("#adTelIn").value);
      const pass = $("#adPassIn").value;
      const u = loadAdmins().find((x) => x.tel === tel);
      if (!u || u.pass !== hash(pass)) return toast("شماره یا رمز ادمین نادرست است.");
      setAdminSession({
        id: u.id, tel: u.tel, name: u.name, kind: "admin",
        role: u.role, perms: u.perms, city: u.city
      });
      closeOverlay();
      toast("وارد پنل ادمین شدید.");
      location.hash = "#/admin";
      if (SC.reroute) SC.reroute();
    };
  };

  SC.requireUser = function (next, reason) {
    if (session() && session().kind !== "admin") return true;
    SC.openAuth({ next, reason });
    return false;
  };
  SC.requireAdmin = function () {
    if (adminSession()) return true;
    SC.openAdminAuth({ reason: "ورود ادمین لازم است." });
    return false;
  };
  SC.adminSession = adminSession;
  SC.logoutAdmin = function () { setAdminSession(null); };

  /* ---------- sell listing with photos + body map ---------- */
  function paintLabel(parts) {
    const n = Object.keys(parts || {}).filter((k) => parts[k] && parts[k] !== "ok").length;
    if (!n) return "بدون رنگ";
    if (n === 1) return "یک لکه";
    if (n === 2) return "دو لکه";
    return "چند لکه";
  }


  function bindNum3(root) {
    (root || document).querySelectorAll(".num3").forEach((el) => {
      if (el.dataset.num3) return;
      el.dataset.num3 = "1";
      const fmt = () => {
        const raw = String(el.value || "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d]/g, "");
        el.value = raw ? group3(raw) : "";
      };
      el.addEventListener("input", fmt);
      el.addEventListener("blur", fmt);
    });
  }
  function empty(v) { return v == null || String(v).trim() === ""; }
  function compressPhoto(file, max = 1280) {
    return new Promise((resolve) => {
      const r = new FileReader();
      r.onerror = () => resolve("");
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          let w = img.width, h = img.height;
          if (w > max || h > max) {
            const k = Math.min(max / w, max / h);
            w = Math.round(w * k); h = Math.round(h * k);
          }
          const c = document.createElement("canvas");
          c.width = w; c.height = h;
          c.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL("image/jpeg", 0.72));
        };
        img.onerror = () => resolve(r.result || "");
        img.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }

  const AD_STATUS = {
    pending: { label: "در انتظار بررسی", cls: "st-wait" },
    review: { label: "در حال بررسی", cls: "st-rev" },
    published: { label: "منتشر شده", cls: "st-ok" },
    rejected: { label: "رد شده", cls: "st-no" }
  };
  function adStatusOf(a) {
    if (a.status && AD_STATUS[a.status]) return a.status;
    return a.verified ? "published" : "pending";
  }
  function wipeAd(id) {
    const st = SC.getAppState ? SC.getAppState() : null;
    if (!st || !id) return false;
    if (!Array.isArray(st.ads)) st.ads = [];
    st.ads = st.ads.filter((x) => x.id !== id);
    try {
      const chats = loadChats();
      delete chats[id];
      saveChats(chats);
    } catch (e) {}
    try {
      const certs = JSON.parse(localStorage.getItem("sc_certs") || "{}");
      delete certs[id];
      localStorage.setItem("sc_certs", JSON.stringify(certs));
    } catch (e) {}
    try { if (SC.saveApp) SC.saveApp(); } catch (e) {}
    if (SC._adOpen === id) SC._adOpen = null;
    return true;
  }
  function canSellerEdit(a) {
    return adStatusOf(a) !== "published";
  }
  function startSellerEdit(ad) {
    const st = SC.getAppState ? SC.getAppState() : null;
    if (!st || !ad) return;
    st.sellDraft = {
      type: ad.type || "car",
      brand: ad.brand || "",
      model: ad.model || "",
      trim: ad.trim || "",
      year: ad.year || "",
      yearFa: ad.yearFa || ad.year || "",
      mileage: ad.mileage,
      gear: ad.gear || "",
      fuel: ad.fuel || "",
      color: ad.color || "",
      price: ad.price,
      installment: !!ad.installment,
      pay: ad.installment ? "1" : "0",
      city: ad.city || "",
      district: ad.district || "",
      seller: ad.seller || "",
      desc: ad.desc || "",
      tel: ad.tel || "",
      gallery: (ad.gallery || (ad.img ? [ad.img] : [])).slice(),
      parts: Object.assign({}, ad.bodyMap || ad.parts || {}),
      mapConfirmed: true,
      editId: ad.id
    };
    st.sellStep = 1;
    location.hash = "#/sell";
    if (SC.renderSellPage) SC.renderSellPage();
  }
  function loadChats() {
    try { return JSON.parse(localStorage.getItem("sc_chats") || "{}"); } catch (e) { return {}; }
  }
  function saveChats(c) { localStorage.setItem("sc_chats", JSON.stringify(c)); }
  function pushMsg(adId, from, name, text) {
    const all = loadChats();
    if (!all[adId]) all[adId] = [];
    all[adId].push({ from, name, text: String(text || "").trim(), at: Date.now() });
    saveChats(all);
  }
  function timeFa(ts) {
    try { return new Date(ts).toLocaleString("fa-IR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }); }
    catch (e) { return ""; }
  }
  function bindThread(box, ad, who) {
    if (!box || !ad) return;
    const draw = () => {
      const msgs = (loadChats()[ad.id] || []);
      box.innerHTML = `
        <div class="th-log">${msgs.length ? msgs.map((m) => `
          <div class="th-msg ${m.from === who ? "me" : "them"}">
            <small>${m.from === "admin" ? "ادمین" : "فروشنده"} · ${timeFa(m.at)}</small>
            <p>${m.text}</p>
          </div>`).join("") : `<div class="th-empty">هنوز پیامی نیست. اولین پیام را بنویسید.</div>`}</div>
        <div class="th-in">
          <input placeholder="${who === "admin" ? "پاسخ به فروشنده…" : "پیام برای ادمین…"}" />
          <button type="button">ارسال</button>
        </div>`;
      const log = box.querySelector(".th-log");
      if (log) log.scrollTop = log.scrollHeight;
      const inp = box.querySelector("input");
      const send = () => {
        const t = (inp.value || "").trim();
        if (!t) return;
        const name = who === "admin" ? ((adminSession() || {}).name || "ادمین") : ((session() || {}).name || "فروشنده");
        pushMsg(ad.id, who, name, t);
        draw();
      };
      box.querySelector("button").onclick = send;
      inp.onkeydown = (e) => { if (e.key === "Enter") send(); };
    };
    draw();
  }

  const CERT_REV = 52;
  function saveCert(id, url) {
    if (!id || !url) return;
    try {
      const all = JSON.parse(localStorage.getItem("sc_certs") || "{}");
      all[id] = url;
      all["__rev"] = CERT_REV;
      localStorage.setItem("sc_certs", JSON.stringify(all));
    } catch (e) {
      try { localStorage.setItem("sc_certs", JSON.stringify({ [id]: url, __rev: CERT_REV })); } catch (e2) {}
    }
  }
  function getCert(id, fallback) {
    try {
      const all = JSON.parse(localStorage.getItem("sc_certs") || "{}");
      if (all.__rev !== CERT_REV) return "";
      return all[id] || fallback || "";
    } catch (e) { return fallback || ""; }
  }
  SC.getCert = getCert;

  function loadCertFonts() {
    if (SC._certFonts) return SC._certFonts;
    const add = (name, url, weight) => {
      const f = new FontFace(name, "url(" + url + ")", { weight: String(weight || 400) });
      return f.load().then((ff) => { document.fonts.add(ff); return ff; }).catch(() => null);
    };
    SC._certFonts = Promise.all([
      add("YekanBakh", "fonts/yekanbakh.woff", 400),
      add("YekanBakh", "fonts/yekan-bold.woff", 700),
      add("IranSans", "fonts/iransans.woff2", 400),
      add("IranSans", "fonts/iransans-bold.woff2", 700)
    ]);
    return SC._certFonts;
  }

  function makeExpertCard(d, u, done) {
    const STAT = SC.estimateSTAT || {};
    const PARTS = SC.estimatePARTS || [];
    const name = d.seller || (u && u.name) || "مالک خودرو";
    const marks = PARTS.filter((p) => d.parts && d.parts[p.id] && d.parts[p.id] !== "ok");
    let mapSvg = SC.svgEstimateBody ? SC.svgEstimateBody(d.parts || {}, null, "certx", { bare: true }) : "";
    if (mapSvg) mapSvg = mapSvg.replace(/<text[\s\S]*?<\/text>/g, "");
    const finish = (url) => { if (typeof done === "function") done(url); };

    const loadImg = (src) => new Promise((resolve) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => resolve(null);
      im.src = src;
    });

    const drawLux = (mapImg, logoImg) => {
      const W = 1680, H = 980;
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#081e20");
      g.addColorStop(0.45, "#041213");
      g.addColorStop(1, "#0a2628");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#0b989c";
      ctx.lineWidth = 3;
      roundRect(ctx, 28, 24, W - 56, H - 48, 22);
      ctx.stroke();
      ctx.strokeStyle = "rgba(232, 196, 122, 0.45)";
      ctx.lineWidth = 1;
      roundRect(ctx, 42, 38, W - 84, H - 76, 16);
      ctx.stroke();
      ctx.fillStyle = "rgba(11,152,156,0.22)";
      ctx.beginPath(); ctx.arc(150, 120, 180, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(232,196,122,0.06)";
      ctx.beginPath(); ctx.arc(1480, 820, 220, 0, Math.PI * 2); ctx.fill();

      const innerL = 64, innerR = W - 64, innerT = 52, innerB = H - 52;

      if (logoImg) {
        const lh = 96;
        const lw = Math.min(340, logoImg.width * (lh / logoImg.height));
        ctx.drawImage(logoImg, innerR - lw - 72, innerT + 4, lw, lh);
      }

      ctx.textAlign = "center";
      ctx.fillStyle = "#e8c47a";
      ctx.font = "600 16px IranSans, YekanBakh, sans-serif";
      ctx.fillText("برگه اختصاصی صفرچی پریمیوم", W / 2 - 90, 78);

      ctx.fillStyle = "#fff6f2";
      ctx.font = "700 26px YekanBakh, IranSans, sans-serif";
      const title = "برگه کارشناسی خودرو طبق اظهار مالک محترم خودرو جناب " + name;
      wrapText(ctx, title, W / 2 - 90, 124, 980, 36, "center");

      const mapBox = { x: 64, y: 188, w: 580, h: 720 };
      ctx.fillStyle = "rgba(8,2,4,0.45)";
      roundRect(ctx, mapBox.x, mapBox.y, mapBox.w, mapBox.h, 18);
      ctx.fill();
      ctx.strokeStyle = "rgba(232,196,122,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      let mapGeom = { dx: mapBox.x + 40, dy: mapBox.y + 40, dw: mapBox.w - 80, dh: mapBox.h - 80 };
      if (mapImg) {
        const padX = 58, padY = 42;
        const availW = mapBox.w - padX * 2, availH = mapBox.h - padY * 2;
        const scale = Math.min(availW / mapImg.width, availH / mapImg.height);
        const dw = mapImg.width * scale, dh = mapImg.height * scale;
        const dx = mapBox.x + (mapBox.w - dw) / 2;
        const dy = mapBox.y + (mapBox.h - dh) / 2;
        mapGeom = { dx, dy, dw, dh };
        ctx.save();
        ctx.shadowColor = "rgba(139,16,36,0.4)";
        ctx.shadowBlur = 22;
        ctx.drawImage(mapImg, dx, dy, dw, dh);
        ctx.restore();
      }

      const toXY = (sx, sy) => ({
        x: mapGeom.dx + (sx / 420) * mapGeom.dw,
        y: mapGeom.dy + (sy / 800) * mapGeom.dh
      });
      const drawPart = (text, sx, sy, rot, size) => {
        const p = toXY(sx, sy);
        ctx.save();
        ctx.fillStyle = "#fff8f4";
        ctx.font = "700 " + (size || 14) + "px YekanBakh, IranSans, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(8,2,4,0.9)";
        ctx.shadowBlur = 7;
        ctx.translate(p.x, p.y);
        if (rot) ctx.rotate(rot * Math.PI / 180);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };

      ctx.save();
      ctx.fillStyle = "#f48711";
      ctx.font = "700 17px YekanBakh, IranSans, sans-serif";
      ctx.textAlign = "center";
      ctx.translate(mapBox.x + 22, mapBox.y + mapBox.h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("سمت راننده", 0, 0);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "#f48711";
      ctx.font = "700 17px YekanBakh, IranSans, sans-serif";
      ctx.textAlign = "center";
      ctx.translate(mapBox.x + mapBox.w - 22, mapBox.y + mapBox.h / 2);
      ctx.rotate(Math.PI / 2);
      ctx.fillText("سمت شاگرد", 0, 0);
      ctx.restore();

      ctx.fillStyle = "#f48711";
      ctx.font = "700 15px YekanBakh, IranSans, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("جلو", mapBox.x + mapBox.w / 2, mapBox.y + 24);
      ctx.fillText("عقب", mapBox.x + mapBox.w / 2, mapBox.y + mapBox.h - 16);

      drawPart("سپر جلو", 210, 54, 0, 13);
      drawPart("سینی جلو", 210, 77, 0, 11);
      drawPart("کاپوت", 210, 149, 0, 16);
      drawPart("سقف", 210, 340, 0, 16);
      drawPart("صندوق", 210, 568, 0, 16);
      drawPart("سپر عقب", 210, 642, 0, 13);
      drawPart("گلگیر جلو راننده", 114, 150, -90, 12);
      drawPart("گلگیر جلو شاگرد", 306, 150, 90, 12);
      drawPart("درب جلو راننده", 112, 292, -90, 13);
      drawPart("درب جلو شاگرد", 308, 292, 90, 13);
      drawPart("درب عقب راننده", 112, 441, -90, 13);
      drawPart("درب عقب شاگرد", 308, 441, 90, 13);
      drawPart("رکاب راننده", 84, 374, -90, 11);
      drawPart("رکاب شاگرد", 336, 374, 90, 11);
      drawPart("گلگیر عقب راننده", 114, 566, -90, 12);
      drawPart("گلگیر عقب شاگرد", 306, 566, 90, 12);

      const colR = 1608, colL = 668, colY = 200;
      ctx.textAlign = "right";
      const lines = [
        ["شرکت سازنده", d.brand || "—"],
        ["مدل", [d.model, d.trim].filter(Boolean).join(" ") || "—"],
        ["سال خودرو", d.year || d.yearFa || "—"],
        ["رنگ", d.color || "—"],
        ["مالک", name],
        ["شهر / محله", [d.city, d.district].filter(Boolean).join(" — ") || "—"],
        ["کارکرد", d.mileage != null ? group3(d.mileage) + " کیلومتر" : "—"],
        ["وضعیت رنگ", paintLabel(d.parts)]
      ];
      lines.forEach((row, i) => {
        const y = colY + i * 56;
        ctx.fillStyle = "rgba(255,245,246,0.06)";
        roundRect(ctx, colL, y - 26, colR - colL, 48, 12); ctx.fill();
        const big = i < 3;
        ctx.fillStyle = "#e8c47a";
        ctx.font = (big ? "700 16px" : "600 15px") + " IranSans, YekanBakh, sans-serif";
        ctx.fillText(row[0], colR - 16, y + 5);
        ctx.fillStyle = "#ffffff";
        ctx.font = (big ? "700 24px" : "500 18px") + " YekanBakh, IranSans, sans-serif";
        fitText(ctx, String(row[1]), colR - 200, y + 5, colR - colL - 230, "right");
      });

      const marksTop = colY + lines.length * 56 + 18;
      ctx.fillStyle = "rgba(139,16,36,0.18)";
      roundRect(ctx, colL, marksTop, colR - colL, innerB - 36 - marksTop, 16);
      ctx.fill();
      ctx.strokeStyle = "rgba(232,196,122,0.2)";
      ctx.stroke();

      ctx.fillStyle = "#e8c47a";
      ctx.font = "700 17px YekanBakh, IranSans, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("قطعات علامت‌خورده", colR - 20, marksTop + 32);

      ctx.font = "500 16px IranSans, YekanBakh, sans-serif";
      if (!marks.length) {
        ctx.fillStyle = "#ffffff";
        ctx.fillText("تمام قطعات سالم اعلام شده است", colR - 20, marksTop + 68);
      } else {
        let x = colR - 20, y = marksTop + 68;
        marks.forEach((p) => {
          const stt = (STAT[d.parts[p.id]] || {}).label || "";
          const label = p.name + "  ·  " + stt;
          ctx.font = "600 15px IranSans, YekanBakh, sans-serif";
          const tw = Math.min(ctx.measureText(label).width + 28, colR - colL - 40);
          if (x - tw < colL + 16) { x = colR - 20; y += 42; }
          if (y > innerB - 70) return;
          ctx.fillStyle = "rgba(255,208,214,0.12)";
          roundRect(ctx, x - tw, y - 22, tw, 34, 10); ctx.fill();
          ctx.strokeStyle = "rgba(232,196,122,0.28)";
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "right";
          fitText(ctx, label, x - 12, y + 2, tw - 20, "right");
          x -= tw + 10;
        });
      }

      ctx.textAlign = "right";
      ctx.fillStyle = "#e8c47a";
      ctx.font = "600 15px YekanBakh, IranSans, sans-serif";
      ctx.fillText("این برگه مطابق با اعلام صاحب محترم خودرو میباشد و مورد تایید کارشناسان صفرچی نمیباشد", innerR - 8, 908);

      finish(c.toDataURL("image/jpeg", 0.9));
    };

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function wrapText(ctx, text, x, y, max, lh, align) {
      const prev = ctx.textAlign;
      if (align) ctx.textAlign = align;
      const words = String(text).split(" ");
      let line = "", yy = y;
      words.forEach((w, i) => {
        const test = line ? line + " " + w : w;
        if (ctx.measureText(test).width > max && line) {
          ctx.fillText(line, x, yy); line = w; yy += lh;
        } else line = test;
        if (i === words.length - 1) ctx.fillText(line, x, yy);
      });
      ctx.textAlign = prev;
    }
    function fitText(ctx, text, x, y, max, align) {
      const prev = ctx.textAlign;
      if (align) ctx.textAlign = align;
      let t = String(text || "");
      if (ctx.measureText(t).width > max) {
        while (t.length > 1 && ctx.measureText(t + "…").width > max) t = t.slice(0, -1);
        t += "…";
      }
      ctx.fillText(t, x, y);
      ctx.textAlign = prev;
    }

    Promise.all([
      loadCertFonts(),
      loadImg("images/logo.png?v=64"),
      mapSvg ? loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(mapSvg)) : Promise.resolve(null)
    ]).then(([, logo, map]) => drawLux(map, logo)).catch(() => drawLux(null, null));
  }
  SC.makeExpertCard = makeExpertCard;

  SC.renderSellPage = function () {
    const st = SC.getAppState ? SC.getAppState() : null;
    const u = session();
    if (!u || u.kind === "admin") {
      view().innerHTML = `<div class="wrap page-head"><div class="crumbs">خانه / فروش</div><h1>ثبت آگهی</h1>
        <div class="empty">ثبت آگهی فقط با حساب مراجعه است.
        <div style="margin-top:14px"><button class="btn btn-gold" id="needLogin">ورود / ثبت‌نام مراجعه</button></div></div></div>`;
      $("#needLogin").onclick = () => SC.openAuth({ next: "#/sell", reason: "برای ثبت آگهی با حساب مراجعه وارد شوید." });
      return;
    }
    if (!st.sellDraft) st.sellDraft = {};
    if (!st.sellDraft.parts) st.sellDraft.parts = {};
    if (!st.sellDraft.gallery) st.sellDraft.gallery = [];
    if (!st.sellStep) st.sellStep = 1;
    const s = st.sellStep;
    const d = st.sellDraft;
    const editing = !!(d.editId);
    const titles = ["مشخصات خودرو", "عکس و قیمت", "نقشه رنگ و بدنه", "بازبینی و انتشار"];
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / فروش</div>
        <h1>${editing ? "ویرایش آگهی" : "ثبت آگهی خودرو"}</h1>
        <p class="mute">${editing ? "پس از ذخیره، آگهی دوباره برای بررسی صفر چی ارسال می‌شود." : "همه فیلدها الزامی است. عکس‌هایتان را بگذارید و روی همان نقشه تخمین، رنگ‌ها را مشخص کنید."}</p>
      </div>
      <div class="wrap" style="padding-bottom:60px">
        <div class="form-card premium-card">
          <div class="steps">
            ${[1, 2, 3, 4].map((n) => `<div class="step ${s >= n ? "on" : ""}"></div>`).join("")}
          </div>
          <p class="mute" style="margin-bottom:16px">گام ${fa(s)} از ۴ — ${titles[s - 1]}</p>
          <div id="sellBody"></div>
          <div style="display:flex;gap:8px;margin-top:18px">
            ${s > 1 ? `<button class="btn btn-ghost" id="sellPrev" type="button">قبلی</button>` : ""}
            <button class="btn btn-gold" id="sellNext" type="button">${s === 4 ? (editing ? "ذخیره ویرایش و ارسال" : "ارسال برای صفر چی") : "ادامه"}</button>
          </div>
        </div>
      </div>`;
    const body = $("#sellBody");
    if (s === 1) {
      body.innerHTML = `
        <div class="form-grid">
          <div class="inp"><label>نوع *</label>
            <select id="sType"><option value="car">خودرو</option><option value="motor">موتور</option><option value="heavy">سنگین</option></select></div>
          <div class="inp"><label>برند *</label>
            <select id="sBrand">${(SC.brands || []).map((b) => `<option ${d.brand === b.name ? "selected" : ""}>${b.name}</option>`).join("")}</select></div>
          <div class="inp"><label>مدل *</label><input id="sModel" value="${d.model || ""}" placeholder="مثلاً کمری"></div>
          <div class="inp"><label>تیپ *</label><input id="sTrim" value="${d.trim || ""}" placeholder="مثلاً لومیر"></div>
          <div class="inp"><label>سال ساخت *</label><input id="sYear" type="number" value="${d.year || ""}" placeholder="۱۴۰۳"></div>
          <div class="inp"><label>کارکرد (کیلومتر) *</label><input id="sKm" class="num3" inputmode="numeric" value="${fmtVal(d.mileage)}" placeholder="۰ برای صفر"></div>
          <div class="inp"><label>گیربکس *</label>
            <select id="sGear"><option value="">انتخاب کنید</option><option ${d.gear === "اتوماتیک" ? "selected" : ""}>اتوماتیک</option><option ${d.gear === "دنده‌ای" ? "selected" : ""}>دنده‌ای</option></select></div>
          <div class="inp"><label>سوخت *</label>
            <select id="sFuel"><option value="">انتخاب کنید</option><option>بنزینی</option><option>هیبرید</option><option>برقی</option><option>دیزلی</option><option>دوگانه‌سوز</option></select></div>
        </div>`;
      if (d.type) $("#sType").value = d.type;
      if (d.fuel) $("#sFuel").value = d.fuel;
    } else if (s === 2) {
      body.innerHTML = `
        <div class="form-grid">
          <div class="inp"><label>رنگ بدنه *</label><select id="sColor"><option value="">انتخاب کنید</option>${(SC.colors || []).map((c) => `<option ${d.color === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
          <div class="inp"><label>قیمت (تومان) *</label><input id="sPrice" class="num3" inputmode="numeric" value="${fmtVal(d.price)}"></div>
          <div class="inp"><label>شرایط *</label>
            <select id="sPay"><option value="">انتخاب کنید</option><option value="0" ${d.installment === false ? "selected" : ""}>نقدی</option><option value="1" ${d.installment === true ? "selected" : ""}>اقساطی</option></select></div>
          <div class="inp"><label>شهر *</label><select id="sCity"><option value="">انتخاب کنید</option>${(SC.cities || []).map((c) => `<option ${d.city === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
          <div class="inp"><label>محله *</label><input id="sDist" value="${d.district || ""}"></div>
          <div class="inp"><label>نام فروشنده *</label><input id="sName" value="${d.seller || u.name || ""}"></div>
          <div class="inp full"><label>توضیحات *</label><textarea id="sDesc" rows="4">${d.desc || ""}</textarea></div>
          <div class="inp full"><label>عکس‌های ماشین * (چندتا با هم، تا ۱۲ تصویر)</label>
            <input id="sPhotos" type="file" accept="image/*" multiple>
            <p class="mute" style="margin-top:6px">هر بار که انتخاب کنید به گالری اضافه می‌شود. روی ✕ بزنید تا حذف شود.</p>
          </div>
        </div>
        <div class="seller-photos" id="sThumbs">${(d.gallery || []).map((p, i) => `<span class="ph"><img src="${p}" alt="عکس ${i + 1}"><button type="button" data-rmph="${i}">✕</button></span>`).join("")}</div>`;
      const paintThumbs = () => {
        $("#sThumbs").innerHTML = (d.gallery || []).map((p, i) => `<span class="ph"><img src="${p}" alt="عکس ${i + 1}"><button type="button" data-rmph="${i}">✕</button></span>`).join("");
        $$("[data-rmph]").forEach((b) => b.onclick = () => {
          d.gallery.splice(+b.dataset.rmph, 1);
          paintThumbs();
        });
      };
      paintThumbs();
      $("#sPhotos").onchange = (e) => {
        const room = 12 - (d.gallery || []).length;
        const files = [...e.target.files].slice(0, Math.max(0, room));
        if (!files.length) return toast("ظرفیت عکس پر است یا فایلی انتخاب نشد.");
        Promise.all(files.map((f) => compressPhoto(f))).then((urls) => {
          d.gallery = (d.gallery || []).concat(urls);
          paintThumbs();
          toast(fa(urls.length) + " عکس اضافه شد. جمع: " + fa(d.gallery.length));
          e.target.value = "";
        });
      };
    } else if (s === 3) {
      body.innerHTML = `
        <h3 class="est-h">نقشه بدنه — همان نقشه تخمین قیمت</h3>
        <p class="mute">روی هر قطعه بزنید و وضعیت رنگ / صافکاری / تعویض را مشخص کنید.</p>
        <label class="chk" style="display:flex;gap:8px;align-items:center;margin:10px 0 14px">
          <input type="checkbox" id="sMapOk" ${d.mapConfirmed ? "checked" : ""}>
          نقشه بدنه را کامل بررسی کردم
        </label>
        <div id="sellMap"></div>`;
      if (SC.mountEstimateMap) SC.mountEstimateMap($("#sellMap"), d.parts || {}, (p) => { d.parts = p; });
      else SC.mountBodyMap($("#sellMap"), d.parts || {}, (p) => { d.parts = p; });
      $("#sMapOk").onchange = () => { d.mapConfirmed = $("#sMapOk").checked; };
    } else {
      const n = Object.keys(d.parts || {}).filter((k) => d.parts[k] && d.parts[k] !== "ok").length;
      body.innerHTML = `
        <div class="review-grid">
          <div>
            <h3>عکس‌های بارگذاری‌شده</h3>
            <div class="seller-photos big">${(d.gallery || []).map((p) => `<img src="${p}" alt="">`).join("")}</div>
          </div>
          <div>
            <h3>کارت کارشناسی</h3>
            <div class="cert-box" id="certBox"><div class="g-spin"></div><p class="mute">در حال ساخت نقشه رنگی…</p></div>
          </div>
        </div>
        <div class="panel cert-meta">
          <p class="cert-title">برگه کارشناسی خودرو طبق اظهار مالک محترم خودرو جناب ${d.seller || u.name}</p>
          <p>${d.brand || ""} ${d.model || ""} ${d.trim || ""} · ${fa(d.year || "")} · ${d.color || ""}</p>
          <p>${d.city || ""} ${d.district || ""} · ${fa(u.tel)} · ${d.mileage != null ? fa(d.mileage) + " کیلومتر" : ""}</p>
          <p class="gold" style="font-size:22px;font-weight:800;margin:8px 0">${money(d.price || 0)}</p>
          <p>وضعیت بدنه: <b>${paintLabel(d.parts)}</b>${n ? " · " + fa(n) + " قطعه علامت‌خورده" : " · سالم"}</p>
          <p class="mute">${d.desc || ""}</p>
        </div>`;
      makeExpertCard(d, u, (url) => {
        d.cert = url;
        const box = $("#certBox");
        if (!box) return;
        if (url) box.innerHTML = `<img class="cert-img landscape" src="${url}" alt="برگه کارشناسی">
            <a class="btn btn-gold" download="bargh-karshenasi.jpg" href="${url}">دانلود برگه کارشناسی</a>`;
        else if (SC.svgEstimateBody) {
          box.innerHTML = `<div class="map-stage">${SC.svgEstimateBody(d.parts || {}, null, "rev")}</div>`;
        } else box.innerHTML = `<p class="mute">نقشه آماده نشد.</p>`;
      });
    }

    const grab = () => {
      if (s === 1) {
        Object.assign(d, {
          type: $("#sType").value, brand: $("#sBrand").value, model: $("#sModel").value.trim(),
          trim: $("#sTrim").value.trim(), year: $("#sYear").value, yearFa: $("#sYear").value,
          mileage: parseNum($("#sKm").value), gear: $("#sGear").value, fuel: $("#sFuel").value
        });
      }
      if (s === 2) {
        Object.assign(d, {
          color: $("#sColor").value, price: parseNum($("#sPrice").value),
          installment: $("#sPay").value === "1", pay: $("#sPay").value,
          city: $("#sCity").value, district: $("#sDist").value.trim(),
          seller: $("#sName").value.trim(), desc: $("#sDesc").value.trim(), tel: u.tel
        });
      }
      if (s === 3) d.mapConfirmed = !!( $("#sMapOk") && $("#sMapOk").checked );
      d.paint = paintLabel(d.parts);
    };

    const valid = () => {
      if (s === 1) {
        if (empty(d.type) || empty(d.brand) || empty(d.model) || empty(d.trim) || empty(d.year) || empty(d.mileage) || empty(d.gear) || empty(d.fuel)) {
          toast("همه فیلدهای این مرحله را پر کنید.");
          return false;
        }
      }
      if (s === 2) {
        if (empty(d.color) || empty(d.price) || empty(d.pay) || empty(d.city) || empty(d.district) || empty(d.seller) || empty(d.desc)) {
          toast("همه فیلدها الزامی است.");
          return false;
        }
        if (!d.gallery || !d.gallery.length) {
          toast("حداقل یک عکس بارگذاری کنید.");
          return false;
        }
      }
      if (s === 3 && !d.mapConfirmed) {
        toast("تأیید کنید که نقشه بدنه را بررسی کرده‌اید.");
        return false;
      }
      return true;
    };

    $("#sellNext").onclick = () => {
      try {
        grab();
        if (!valid()) return;
        if (s === 4) {
          if (!st) { toast("یک‌بار صفحه را رفرش کنید."); return; }
          if (!Array.isArray(st.ads)) st.ads = [];
          const gallery = (d.gallery || []).filter(Boolean).slice(0, 12);
          const ad = {
            id: "ad" + Date.now(),
            type: d.type || "car",
            brand: d.brand, model: d.model, trim: d.trim,
            year: +d.year || d.year, yearFa: +d.year || d.year,
            mileage: +d.mileage || 0, price: +d.price || 0,
            gear: d.gear, fuel: d.fuel, color: d.color,
            paint: paintLabel(d.parts),
            city: d.city, district: d.district, desc: d.desc,
            installment: !!d.installment,
            img: gallery[0] || "images/peugeot.jpg",
            photos: gallery.length || 1,
            gallery,
            cert: d.cert || "",
            posted: "لحظاتی پیش",
            inspected: false, verified: false, pinned: false,
            status: "pending",
            sellerType: "شخصی",
            seller: d.seller || u.name,
            tel: u.tel,
            owner: u.id,
            bodyMap: Object.assign({}, d.parts || {})
          };
          st.ads.unshift(ad);
          try { if (SC.saveApp) SC.saveApp(); }
          catch (err) {
            console.warn(err);
            try { localStorage.setItem("sc_ads", JSON.stringify(st.ads.map((x) => ({ ...x, gallery: (x.gallery || []).slice(0, 2), cert: "" })))); }
            catch (e2) { console.warn(e2); }
          }
          st.sellStep = 1;
          st.sellDraft = {};
          if (d.cert) saveCert(ad.id, d.cert);
          else makeExpertCard(ad, u, (url) => { if (url) { ad.cert = url; saveCert(ad.id, url); } });
          sellerTab = "ads";
          toast("آگهی برای بررسی صفر چی ارسال شد.");
          location.hash = "#/account";
          if (SC.reroute) SC.reroute();
          return;
        }
        st.sellStep++;
        SC.renderSellPage();
      } catch (err) {
        console.warn(err);
        toast("ارسال انجام نشد. عکس‌ها را کمتر کنید و دوباره بزنید.");
      }
    };
    bindNum3(view());
    if ($("#sellPrev")) $("#sellPrev").onclick = () => { grab(); st.sellStep--; SC.renderSellPage(); };
  };

  /* ---------- seller ---------- */
  let sellerTab = "me";
  let mapHandle = null;

  function sellerDraft() {
    try { return JSON.parse(localStorage.getItem("sc_seller_" + (session() || {}).id) || "{}"); } catch (e) { return {}; }
  }
  function saveSellerDraft(d) {
    const u = session();
    if (u) localStorage.setItem("sc_seller_" + u.id, JSON.stringify(d));
  }

  SC.renderSeller = function () {
    if (!SC.requireUser("#/account", "برای بارگذاری اطلاعات خودتان وارد شوید.")) {
      view().innerHTML = `<div class="wrap page-head"><h1>پنل مراجعه / فروشنده</h1>
        <div class="empty">این بخش مال حساب مراجعه است، نه ادمین.
        <button class="btn btn-gold" id="needLogin">ورود / ثبت‌نام مراجعه</button></div></div>`;
      $("#needLogin").onclick = () => SC.openAuth({ next: "#/account" });
      return;
    }
    const u = session();
    const d = Object.assign({
      name: u.name, city: u.city || "", nid: "", brand: "", model: "", year: 1403,
      km: 0, color: "سفید", gear: "اتوماتیک", fuel: "بنزینی", price: "", desc: "",
      parts: {}, photos: []
    }, sellerDraft());
    view().innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / پنل فروشنده</div>
        <h1>پرونده من در صفر چی</h1>
        <p class="mute">${u.name} · ${fa(u.tel)} — اطلاعات شخصی و ماشین را بارگذاری کنید.</p>
      </div>
      <div class="wrap seller-grid">
        <nav class="side-nav">
          <a href="#/account" class="${sellerTab === "me" ? "on" : ""}" data-st="me">اطلاعات من</a>
          <a href="#/sell">ثبت آگهی جدید</a>
          <a href="#/account" class="${sellerTab === "ads" ? "on" : ""}" data-st="ads">آگهی و وضعیت</a>
          <a href="#/account" class="${sellerTab === "chat" ? "on" : ""}" data-st="chat">گفتگو با ادمین</a>
          <a href="#/account" class="${sellerTab === "car" ? "on" : ""}" data-st="car">اطلاعات ماشین</a>
          <a href="#/account" class="${sellerTab === "map" ? "on" : ""}" data-st="map">نقشه بدنه</a>
          <a href="#/account" class="${sellerTab === "fav" ? "on" : ""}" data-st="fav">علاقه‌مندی</a>
          <a href="#/account" id="logoutAcc">خروج</a>
        </nav>
        <div class="seller-main" id="sellerMain"></div>
      </div>`;
    const main = $("#sellerMain");
    const paint = () => {
      if (sellerTab === "me") {
        main.innerHTML = `
          <div class="form-card premium-card">
            <h3>هویت مراجعه</h3>
            <div class="form-grid">
              <div class="inp"><label>نام</label><input id="sfName" value="${d.name || ""}"></div>
              <div class="inp"><label>موبایل</label><input value="${u.tel}" disabled></div>
              <div class="inp"><label>شهر</label><select id="sfCity">${(SC.cities || []).map((c) => `<option ${d.city === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
              <div class="inp"><label>کد ملی (اختیاری)</label><input id="sfNid" value="${d.nid || ""}" maxlength="10"></div>
            </div>
            <button class="btn btn-gold" id="sfSaveMe" style="margin-top:14px">ذخیره پرونده</button>
          </div>`;
        $("#sfSaveMe").onclick = () => {
          d.name = $("#sfName").value.trim();
          d.city = $("#sfCity").value;
          d.nid = $("#sfNid").value.trim();
          saveSellerDraft(d);
          const users = loadVisitors();
          const rec = users.find((x) => x.id === u.id);
          if (rec) { rec.name = d.name; rec.city = d.city; rec.nid = d.nid; saveVisitors(users); }
          setSession({ ...u, name: d.name, city: d.city });
          toast("پرونده ذخیره شد.");
        };
      } else if (sellerTab === "car") {
        main.innerHTML = `
          <div class="form-card premium-card">
            <h3>خودرو</h3>
            <div class="form-grid">
              <div class="inp"><label>برند</label><select id="sfBrand">${(SC.brands || []).map((b) => `<option ${d.brand === b.name ? "selected" : ""}>${b.name}</option>`).join("")}</select></div>
              <div class="inp"><label>مدل</label><input id="sfModel" value="${d.model || ""}"></div>
              <div class="inp"><label>سال</label><input id="sfYear" type="number" value="${d.year || 1403}"></div>
              <div class="inp"><label>کارکرد</label><input id="sfKm" class="num3" inputmode="numeric" value="${fmtVal(d.km)}"></div>
              <div class="inp"><label>رنگ</label><select id="sfColor">${(SC.colors || []).map((c) => `<option ${d.color === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
              <div class="inp"><label>گیربکس</label><select id="sfGear"><option ${d.gear === "اتوماتیک" ? "selected" : ""}>اتوماتیک</option><option ${d.gear === "دنده‌ای" ? "selected" : ""}>دنده‌ای</option></select></div>
              <div class="inp"><label>سوخت</label><select id="sfFuel"><option>بنزینی</option><option>هیبرید</option><option>برقی</option><option>دیزلی</option></select></div>
              <div class="inp"><label>قیمت درخواستی (تومان)</label><input id="sfPrice" class="num3" inputmode="numeric" value="${fmtVal(d.price)}"></div>
              <div class="inp full"><label>توضیح فروشنده</label><textarea id="sfDesc" rows="4">${d.desc || ""}</textarea></div>
              <div class="inp full"><label>عکس ماشین</label><input id="sfPhotos" type="file" accept="image/*" multiple></div>
            </div>
            <div class="seller-photos" id="sfThumbs">${(d.photos || []).map((p) => `<img src="${p}" alt="">`).join("")}</div>
            <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">
              <button class="btn btn-ghost" id="sfSaveCar">ذخیره پیش‌نویس</button>
              <button class="btn btn-gold" id="sfPublish">ارسال برای صفر چی</button>
            </div>
          </div>`;
        $("#sfFuel").value = d.fuel || "بنزینی";
        $("#sfPhotos").onchange = (e) => {
          const files = [...e.target.files].slice(0, 6);
          Promise.all(files.map((f) => new Promise((res) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.readAsDataURL(f);
          }))).then((urls) => {
            d.photos = urls;
            $("#sfThumbs").innerHTML = urls.map((p) => `<img src="${p}" alt="">`).join("");
          });
        };
        const grab = () => {
          Object.assign(d, {
            brand: $("#sfBrand").value, model: $("#sfModel").value, year: +$("#sfYear").value,
            km: parseNum($("#sfKm").value), color: $("#sfColor").value, gear: $("#sfGear").value,
            fuel: $("#sfFuel").value, price: parseNum($("#sfPrice").value), desc: $("#sfDesc").value
          });
          saveSellerDraft(d);
        };
        $("#sfSaveCar").onclick = () => { grab(); toast("پیش‌نویس ماشین ذخیره شد."); };
        $("#sfPublish").onclick = () => {
          grab();
          if (!d.model || !d.price) return toast("مدل و قیمت را کامل کنید.");
          const ad = {
            id: "ad" + Date.now(), type: "car", brand: d.brand, model: d.model, trim: "",
            year: d.year, yearFa: d.year, mileage: d.km, gear: d.gear, fuel: d.fuel,
            color: d.color, paint: Object.keys(d.parts || {}).length ? "چند لکه" : "بدون رنگ",
            price: d.price, city: d.city || u.city || "تهران", district: "",
            desc: d.desc, seller: d.name || u.name, tel: u.tel, sellerType: "شخصی",
            img: (d.photos && d.photos[0]) || "images/peugeot.jpg",
            photos: (d.photos || []).length || 1, posted: "لحظاتی پیش",
            inspected: false, verified: false, pinned: false, owner: u.id,
            bodyMap: d.parts || {}
          };
          const st = SC.getAppState();
          st.ads.unshift(ad);
          SC.saveApp();
          toast("برای بررسی ادمین ارسال شد.");
          sellerTab = "ads";
          SC.renderSeller();
        };
      } else if (sellerTab === "map") {
        main.innerHTML = `
          <div class="form-card premium-card">
            <h3>نقشه بدنه پریمیوم</h3>
            <p class="mute">وضعیت هر قطعه را روی سیلوئت بزنید. این نقشه همراه آگهی برای خریدار و ادمین ذخیره می‌شود.</p>
            <div id="sellerMap"></div>
          </div>`;
        mapHandle = SC.mountBodyMap($("#sellerMap"), { ...d.parts }, (p) => {
          d.parts = p;
          saveSellerDraft(d);
        });
      } else if (sellerTab === "fav") {
        const st = SC.getAppState ? SC.getAppState() : { favs: [] };
        const ids = st.favs || [];
        const items = ids.map((id) => (SC.cars||[]).concat(SC.motors||[], SC.heavies||[], st.ads||[]).find((x)=>x && x.id===id)).filter(Boolean);
        main.innerHTML = items.length
          ? `<div class="lux-head"><h3>علاقه‌مندی‌ها</h3></div><div class="inbox">${items.map((c)=>`<a class="inbox-card" href="#/car/${c.id}"><img src="${c.img}" alt=""><div><b>${c.brand} ${c.model}</b><p class="mute">${money(c.price)}</p></div></a>`).join("")}</div>`
          : `<div class="empty">هنوز چیزی ذخیره نکرده‌اید.</div>`;
      } else if (sellerTab === "chat") {
        const mine = (SC.getAppState().ads || []).filter((a) => a.owner === u.id || a.tel === u.tel);
        const open = mine[0];
        main.innerHTML = `
          <div class="lux-head"><h3>گفتگو با ادمین</h3><p class="mute">برای هر آگهی می‌توانید با بررسی‌کننده حرف بزنید.</p></div>
          ${mine.length ? `
            <div class="chat-pick">${mine.map((a, i) => `<button type="button" class="chip ${i === 0 ? "gold" : ""}" data-th="${a.id}">${a.brand} ${a.model}</button>`).join("")}</div>
            <div class="thread" id="sellerThread"></div>` : `<div class="empty">اول یک آگهی بفرستید تا گفتگو باز شود.</div>`}`;
        if (open) {
          let cur = open;
          bindThread($("#sellerThread"), cur, "seller");
          $$("[data-th]").forEach((b) => b.onclick = () => {
            $$("[data-th]").forEach((x) => x.classList.remove("gold"));
            b.classList.add("gold");
            cur = mine.find((a) => a.id === b.dataset.th);
            bindThread($("#sellerThread"), cur, "seller");
          });
        }
      } else {
        const mine = (SC.getAppState().ads || []).filter((a) => a.owner === u.id || a.tel === u.tel);
        main.innerHTML = mine.length ? `
          <div class="lux-head"><h3>آگهی‌های ارسالی</h3><p class="mute">ویرایش فقط تا قبل از انتشار ممکن است. حذف همیشه در دسترس است.</p></div>
          <div class="inbox">${mine.map((a) => {
            const stt = adStatusOf(a);
            const meta = AD_STATUS[stt];
            const editable = canSellerEdit(a);
            return `<article class="inbox-card">
              <img src="${a.img || a.gallery && a.gallery[0] || "images/peugeot.jpg"}" alt="">
              <div>
                <div class="inbox-top"><b>${a.brand} ${a.model}</b><span class="st-pill ${meta.cls}">${meta.label}</span></div>
                <p class="mute">${money(a.price)} · ${a.city || ""} · ${fa((a.gallery || []).length || a.photos || 1)} عکس</p>
                <p class="mute">${stt === "published" ? "روی سایت دیده می‌شود. ویرایش بسته است." : stt === "rejected" ? "رد شده؛ می‌توانید ویرایش کنید و دوباره بفرستید." : "هنوز روی سایت عمومی نیست."}</p>
                <div class="act-row" style="margin-top:10px">
                  ${editable
                    ? `<button type="button" class="btn btn-ghost" data-sedit="${a.id}">ویرایش</button>`
                    : `<span class="mute">ویرایش بعد از انتشار بسته است</span>`}
                  <button type="button" class="btn btn-ghost danger" data-sdel="${a.id}">حذف</button>
                </div>
              </div>
            </article>`;
          }).join("")}</div>` : `<div class="empty">هنوز آگهی‌ای نفرستاده‌اید.</div>`;
        $$("[data-sedit]", main).forEach((b) => b.onclick = () => {
          const ad = mine.find((x) => x.id === b.dataset.sedit);
          if (!ad) return;
          if (!canSellerEdit(ad)) return toast("بعد از انتشار، ویرایش برای فروشنده بسته است.");
          startSellerEdit(ad);
        });
        $$("[data-sdel]", main).forEach((b) => b.onclick = () => {
          if (!confirm("این آگهی برای همیشه حذف شود؟")) return;
          wipeAd(b.dataset.sdel);
          toast("آگهی حذف شد.");
          SC.renderSeller();
        });
      }
    };
    $$("[data-st]").forEach((a) => a.onclick = (e) => {
      e.preventDefault();
      sellerTab = a.dataset.st;
      SC.renderSeller();
    });
    const lo = $("#logoutAcc");
    if (lo) lo.onclick = (e) => {
      e.preventDefault();
      const st = SC.getAppState && SC.getAppState();
      if (st) { st.user = null; if (SC.saveApp) SC.saveApp(); }
      toast("خارج شدید.");
      location.hash = "#/";
      if (SC.reroute) SC.reroute();
    };
    paint();
  };

  /* ---------- admin ---------- */
  let adminTab = "dash";

  function gate(perm) {
    if (perm && !can(perm)) return `<div class="empty">دسترسی این بخش برای نقش شما فعال نیست.</div>`;
    return null;
  }

  SC.renderAdmin = function () {
    if (!adminSession()) {
      view().innerHTML = `<div class="wrap page-head"><h1>پنل ادمین</h1>
        <p class="mute">جدا از حساب مراجعه. فقط مدیران وارد می‌شوند.</p>
        <div class="empty"><button class="btn btn-gold" id="needAdmin">ورود ادمین</button></div></div>`;
      $("#needAdmin").onclick = () => SC.openAdminAuth({ reason: "ورود ادمین." });
      return;
    }
    const u = adminSession();
    if (u.role === "super") u.perms = { ...ALL_PERMS };
    const st = SC.getAppState() || { ads: [] };
    const visitors = loadVisitors();
    const adminList = loadAdmins();
    const userAds = st.ads || [];
    const catalog = [...(SC.cars || []), ...(SC.motors || []), ...(SC.heavies || [])];
    view().innerHTML = `
      <div class="admin-shell">
        <aside class="admin-side">
          <div class="admin-who"><b>${u.name}</b><small>${(ROLE_PRESETS[u.role] || {}).label || u.role}</small></div>
          ${[
            ["dash", "نمای کلی", null],
            ["site", "آگهی‌های سایت", "ads"],
            ["inbox", "صف بررسی فروشنده", "ads"],
            ["prices", "قیمت روز", "prices"],
            ["blog", "مجله", "blog"],
            ["branches", "شعب", "branches"],
            ["stories", "استوری‌ها", "blog"],
            ["users", "مراجعه‌کننده‌ها", "users"],
            ["admins", "ادمین‌ها", "admins"]
          ].filter((x) => !x[2] || can(x[2])).map((x) =>
            `<button type="button" class="${adminTab === x[0] ? "on" : ""}" data-at="${x[0]}">${x[1]}</button>`
          ).join("")}
          <a href="#/">بازگشت به سایت</a>
          <button type="button" id="adminOut">خروج ادمین</button>
        </aside>
        <section class="admin-main" id="adminMain"></section>
      </div>`;
    const main = $("#adminMain");
    const blocked = (p) => { const g = gate(p); if (g) { main.innerHTML = g; return true; } return false; };

    const findListing = (id) => {
      for (const key of ["cars", "motors", "heavies"]) {
        const i = (SC[key] || []).findIndex((x) => x.id === id);
        if (i >= 0) return { key, i, item: SC[key][i] };
      }
      const i = userAds.findIndex((x) => x.id === id);
      if (i >= 0) return { key: "ads", i, item: userAds[i] };
      return null;
    };
    const saveListing = () => {
      persistSite();
      if (SC.saveApp) SC.saveApp();
    };

    if (adminTab === "dash") {
      const pending = userAds.filter((a) => adStatusOf(a) === "pending" || adStatusOf(a) === "review").length;
      main.innerHTML = `
        <div class="lux-head"><h1>نمای کلی</h1><p class="mute">هر تغییری همین‌جا روی سایت زنده ذخیره می‌شود.</p></div>
        <div class="kpi admin-kpi">
          <div><b>${fa(catalog.length)}</b>آگهی گالری سایت</div>
          <div><b>${fa(userAds.length)}</b>آگهی فروشنده‌ها</div>
          <div><b>${fa(pending)}</b>در صف بررسی</div>
          <div><b>${fa((SC.prices || []).length)}</b>ردیف قیمت روز</div>
        </div>`;
    } else if (adminTab === "site" && !blocked("ads")) {
      const q = (SC._siteQ || "").toLowerCase();
      const list = catalog.filter((c) => !q || `${c.brand} ${c.model} ${c.id}`.toLowerCase().includes(q));
      const open = SC._siteOpen && findListing(SC._siteOpen);
      main.innerHTML = `
        <div class="lux-head"><h1>آگهی‌های فعلی سایت</h1><p class="mute">میباخ، M5، پورشه، لندکروز و بقیه — قیمت، متن، پین، نمایش.</p></div>
        <div class="inp" style="max-width:320px;margin-bottom:12px"><input id="siteQ" placeholder="جستجوی برند یا مدل" value="${SC._siteQ || ""}"></div>
        <div class="review-desk">
          <div class="inbox">${list.map((c) => `
            <button type="button" class="inbox-card ${open && open.item.id === c.id ? "on" : ""}" data-sid="${c.id}">
              <img src="${c.img}" alt="">
              <div>
                <div class="inbox-top"><b>${c.brand} ${c.model}</b>${c.pinned ? `<span class="st-pill st-ok">پین</span>` : ""}</div>
                <p class="mute">${money(c.price)} · ${c.city || ""}</p>
              </div>
            </button>`).join("")}</div>
          <div class="review-pane" id="siteEdit">${open ? "" : `<div class="empty">یک آگهی را از لیست انتخاب کنید.</div>`}</div>
        </div>`;
      const drawEdit = (item, key) => {
        const pane = $("#siteEdit");
        pane.innerHTML = `
          <div class="review-hero">
            <img src="${item.img}" alt="">
            <div><h2>${item.brand} ${item.model}</h2><p class="mute">${item.id} · ${item.type || key}</p></div>
          </div>
          <div class="form-grid">
            <div class="inp"><label>برند</label><input data-f="brand" value="${item.brand || ""}"></div>
            <div class="inp"><label>مدل</label><input data-f="model" value="${item.model || ""}"></div>
            <div class="inp"><label>تیپ</label><input data-f="trim" value="${item.trim || ""}"></div>
            <div class="inp"><label>سال</label><input data-f="year" type="number" value="${item.year || ""}"></div>
            <div class="inp"><label>کارکرد</label><input data-f="mileage" class="num3" inputmode="numeric" value="${fmtVal(item.mileage)}"></div>
            <div class="inp"><label>قیمت</label><input data-f="price" class="num3" inputmode="numeric" value="${fmtVal(item.price)}"></div>
            <div class="inp"><label>قیمت قبلی</label><input data-f="oldPrice" class="num3" inputmode="numeric" value="${fmtVal(item.oldPrice)}"></div>
            <div class="inp"><label>رنگ</label><input data-f="color" value="${item.color || ""}"></div>
            <div class="inp"><label>وضعیت رنگ</label><input data-f="paint" value="${item.paint || ""}"></div>
            <div class="inp"><label>شهر</label><input data-f="city" value="${item.city || ""}"></div>
            <div class="inp"><label>محله</label><input data-f="district" value="${item.district || ""}"></div>
            <div class="inp"><label>فروشنده</label><input data-f="seller" value="${item.seller || ""}"></div>
            <div class="inp full"><label>توضیحات</label><textarea data-f="desc" rows="4">${item.desc || ""}</textarea></div>
          </div>
          <div class="act-row">
            <label class="chk"><input type="checkbox" data-f="pinned" ${item.pinned ? "checked" : ""}> پین در ویژه</label>
            <label class="chk"><input type="checkbox" data-f="verified" ${item.verified ? "checked" : ""}> احراز هویت</label>
            <label class="chk"><input type="checkbox" data-f="inspected" ${item.inspected ? "checked" : ""}> کارشناسی‌شده</label>
            <button type="button" class="btn btn-gold" id="saveSite">ذخیره روی سایت</button>
            <button type="button" class="btn btn-ghost danger" id="delSite">حذف از سایت</button>
          </div>`;
        $("#saveSite").onclick = () => {
          pane.querySelectorAll("[data-f]").forEach((el) => {
            const k = el.dataset.f;
            if (el.type === "checkbox") item[k] = el.checked;
            else if (el.classList.contains("num3") || el.type === "number") item[k] = el.value === "" ? null : parseNum(el.value);
            else item[k] = el.value;
          });
          saveListing();
          toast("روی سایت ذخیره شد.");
          SC.renderAdmin();
        };
        $("#delSite").onclick = () => {
          SC[key] = SC[key].filter((x) => x.id !== item.id);
          saveListing();
          SC._siteOpen = null;
          toast("از سایت حذف شد.");
          SC.renderAdmin();
        };
      };
      if (open) drawEdit(open.item, open.key);
      $("#siteQ").onchange = $("#siteQ").onkeydown = (e) => {
        if (e.type === "keydown" && e.key !== "Enter") return;
        SC._siteQ = $("#siteQ").value.trim();
        SC.renderAdmin();
      };
      $$("[data-sid]").forEach((b) => b.onclick = () => { SC._siteOpen = b.dataset.sid; SC.renderAdmin(); });
    } else if (adminTab === "inbox" && !blocked("ads")) {
      const filter = SC._adFilter || "all";
      const filtered = userAds.filter((a) => filter === "all" || adStatusOf(a) === filter);
      const pick = userAds.find((a) => a.id === SC._adOpen) || filtered[0] || userAds[0];
      main.innerHTML = `
        <div class="lux-head"><h1>صف بررسی فروشنده</h1><p class="mute">انتشار، رد یا در حال بررسی.</p></div>
        <div class="ad-filters">
          ${[["all", "همه"], ["pending", "در انتظار"], ["review", "در حال بررسی"], ["published", "منتشر"], ["rejected", "رد"]].map(([k, l]) =>
            `<button type="button" class="${filter === k ? "on" : ""}" data-af="${k}">${l}</button>`).join("")}
        </div>
        ${userAds.length ? `<div class="review-desk">
          <div class="inbox">${filtered.map((a) => {
            const stt = adStatusOf(a);
            return `<button type="button" class="inbox-card ${pick && pick.id === a.id ? "on" : ""}" data-open="${a.id}">
              <img src="${(a.gallery && a.gallery[0]) || a.img || "images/peugeot.jpg"}" alt="">
              <div><div class="inbox-top"><b>${a.brand} ${a.model}</b><span class="st-pill ${AD_STATUS[stt].cls}">${AD_STATUS[stt].label}</span></div>
              <p class="mute">${a.seller || "—"} · ${money(a.price)}</p></div></button>`;
          }).join("") || `<div class="empty">در این فیلتر چیزی نیست.</div>`}</div>
          ${pick ? `<div class="review-pane">
            <h2>${pick.brand} ${pick.model}</h2>
            <p>${pick.seller || ""} · ${fa(pick.tel || "")} · ${money(pick.price)}</p>
            ${(pick.gallery || []).length ? `<div class="seller-photos">${pick.gallery.map((p) => `<img src="${p}" alt="">`).join("")}</div>` : ""}
            <div class="cert-admin" id="adminCertBox"><p class="mute">در حال آماده‌سازی برگه کارشناسی…</p></div>
            <div class="form-grid" style="margin-top:12px">
              <div class="inp"><label>قیمت</label><input id="inPrice" class="num3" inputmode="numeric" value="${fmtVal(pick.price)}"></div>
              <div class="inp"><label>رنگ / بدنه</label><input id="inPaint" value="${pick.paint || ""}"></div>
              <div class="inp full"><label>توضیح</label><textarea id="inDesc" rows="3">${pick.desc || ""}</textarea></div>
            </div>
            <div class="act-row">
              <button type="button" class="btn btn-gold" data-stset="published" data-id="${pick.id}">انتشار</button>
              <button type="button" class="btn btn-ghost" data-stset="review" data-id="${pick.id}">در حال بررسی</button>
              <button type="button" class="btn btn-ghost danger" data-stset="rejected" data-id="${pick.id}">رد</button>
              <button type="button" class="btn btn-ghost" id="inSave">ذخیره ویرایش</button>
              <button type="button" class="btn btn-ghost danger" id="inDel" data-id="${pick.id}">حذف</button>
            </div>
            <h3 style="margin:18px 0 8px">گفتگو با فروشنده</h3>
            <div class="thread" id="adminThread"></div>
          </div>` : ""}
        </div>` : `<div class="empty">هنوز آگهی فروشنده‌ای نرسیده.</div>`}`;
      $$("[data-af]").forEach((b) => b.onclick = () => { SC._adFilter = b.dataset.af; SC.renderAdmin(); });
      $$("[data-open]").forEach((b) => b.onclick = () => { SC._adOpen = b.dataset.open; SC.renderAdmin(); });
      $$("[data-stset]").forEach((b) => b.onclick = () => {
        const a = userAds.find((x) => x.id === b.dataset.id);
        if (!a) return;
        a.status = b.dataset.stset;
        a.verified = a.status === "published";
        SC.saveApp();
        toast(AD_STATUS[a.status].label);
        pushMsg(a.id, "admin", u.name, a.status === "published" ? "آگهی شما منتشر شد." : a.status === "rejected" ? "آگهی رد شد." : "آگهی شما در حال بررسی است.");
        SC.renderAdmin();
      });
      if (pick && $("#inSave")) {
        $("#inSave").onclick = () => {
          pick.price = parseNum($("#inPrice").value);
          pick.paint = $("#inPaint").value;
          pick.desc = $("#inDesc").value;
          SC.saveApp();
          toast("ویرایش ذخیره شد.");
        };
        if ($("#inDel")) $("#inDel").onclick = () => {
          if (!confirm("این درخواست فروشنده برای همیشه حذف شود؟")) return;
          wipeAd(pick.id);
          toast("درخواست حذف شد.");
          SC.renderAdmin();
        };
        bindThread($("#adminThread"), pick, "admin");
        const box = $("#adminCertBox");
        const showCert = (url) => {
          if (!box) return;
          if (!url) {
            box.innerHTML = `<p class="mute">برگه کارشناسی موجود نیست.</p>`;
            return;
          }
          pick.cert = url;
          saveCert(pick.id, url);
          box.innerHTML = `<img class="cert-img landscape" src="${url}" alt="برگه کارشناسی">
            <a class="btn btn-gold" id="dlCert" download="bargh-karshenasi-${pick.id}.jpg" href="${url}">دانلود برگه کارشناسی</a>`;
        };
        makeExpertCard({ ...pick, parts: pick.bodyMap || pick.parts || {} }, { name: pick.seller, tel: pick.tel }, (url) => {
          showCert(url);
        });
      }
    } else if (adminTab === "prices" && !blocked("prices")) {
      main.innerHTML = `<div class="lux-head"><h1>قیمت روز</h1></div>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>برند</th><th>مدل</th><th>سال</th><th>بازار</th><th>کارخانه</th><th>نمایندگی</th><th></th></tr></thead><tbody>
          ${(SC.prices || []).map((p, i) => `<tr>
            <td><input data-pf="${i}" data-k="brand" value="${p.brand || ""}"></td>
            <td><input data-pf="${i}" data-k="model" value="${p.model || ""}"></td>
            <td><input data-pf="${i}" data-k="year" type="number" value="${p.year || ""}"></td>
            <td><input data-pf="${i}" data-k="market" class="num3" inputmode="numeric" value="${fmtVal(p.market)}"></td>
            <td><input data-pf="${i}" data-k="factory" class="num3" inputmode="numeric" value="${fmtVal(p.factory)}"></td>
            <td><input data-pf="${i}" data-k="dealer" class="num3" inputmode="numeric" value="${fmtVal(p.dealer)}"></td>
            <td><button data-ps="${i}">ذخیره</button></td></tr>`).join("")}
        </tbody></table></div>`;
      $$("[data-ps]").forEach((b) => b.onclick = () => {
        const i = +b.dataset.ps;
        $$("[data-pf=\"" + i + "\"]").forEach((inp) => {
          const k = inp.dataset.k;
          SC.prices[i][k] = (inp.classList.contains("num3") || inp.type === "number" || ["market","factory","dealer"].includes(k)) ? parseNum(inp.value) : inp.value;
        });
        persistSite();
        toast("قیمت روز ذخیره شد.");
      });
    } else if (adminTab === "blog" && !blocked("blog")) {
      main.innerHTML = `<div class="lux-head"><h1>مجله</h1></div>
        ${(SC.blog || []).map((b, i) => `<div class="form-card premium-card" style="margin-bottom:12px">
          <div class="form-grid">
            <div class="inp full"><label>عنوان</label><input data-bt="${i}" value="${b.title || ""}"></div>
            <div class="inp"><label>دسته</label><input data-bc="${i}" value="${b.cat || ""}"></div>
            <div class="inp full"><label>خلاصه</label><textarea data-bx="${i}" rows="2">${b.excerpt || ""}</textarea></div>
            <div class="inp full"><label>متن</label><textarea data-bb="${i}" rows="4">${b.body || ""}</textarea></div>
          </div>
          <button class="btn btn-gold" data-bs="${i}" style="margin-top:10px">ذخیره مقاله</button>
        </div>`).join("")}`;
      $$("[data-bs]").forEach((b) => b.onclick = () => {
        const i = +b.dataset.bs;
        SC.blog[i].title = $(`[data-bt="${i}"]`).value;
        SC.blog[i].cat = $(`[data-bc="${i}"]`).value;
        SC.blog[i].excerpt = $(`[data-bx="${i}"]`).value;
        SC.blog[i].body = $(`[data-bb="${i}"]`).value;
        persistSite();
        toast("مقاله روی سایت ذخیره شد.");
      });
    } else if (adminTab === "branches" && !blocked("branches")) {
      main.innerHTML = `<div class="lux-head"><h1>شعب</h1></div>
        ${(SC.branches || []).map((br, i) => `<div class="form-card premium-card" style="margin-bottom:12px">
          <div class="form-grid">
            <div class="inp"><label>نام</label><input data-bn="${i}" value="${br.name || ""}"></div>
            <div class="inp"><label>شهر</label><input data-bcy="${i}" value="${br.city || ""}"></div>
            <div class="inp full"><label>آدرس</label><input data-ba="${i}" value="${br.addr || ""}"></div>
            <div class="inp"><label>تلفن</label><input data-btel="${i}" value="${br.tel || ""}"></div>
            <div class="inp"><label>ساعت</label><input data-bh="${i}" value="${br.hours || ""}"></div>
          </div>
          <button class="btn btn-gold" data-bas="${i}" style="margin-top:10px">ذخیره شعبه</button>
        </div>`).join("")}`;
      $$("[data-bas]").forEach((b) => b.onclick = () => {
        const i = +b.dataset.bas;
        const br = SC.branches[i];
        br.name = $(`[data-bn="${i}"]`).value;
        br.city = $(`[data-bcy="${i}"]`).value;
        br.addr = $(`[data-ba="${i}"]`).value;
        br.tel = $(`[data-btel="${i}"]`).value;
        br.hours = $(`[data-bh="${i}"]`).value;
        persistSite();
        toast("شعبه ذخیره شد.");
      });
    } else if (adminTab === "stories" && !blocked("blog")) {
      main.innerHTML = `<div class="lux-head"><h1>استوری شعب</h1></div>
        ${(SC.stories || []).map((s, i) => `<div class="form-card" style="margin-bottom:10px">
          <div class="form-grid">
            <div class="inp"><label>شعبه</label><input data-sb="${i}" value="${s.branch || ""}"></div>
            <div class="inp"><label>عنوان</label><input data-stt="${i}" value="${s.title || ""}"></div>
          </div>
          <button class="btn btn-ghost" data-ss="${i}" style="margin-top:8px">ذخیره</button>
        </div>`).join("")}`;
      $$("[data-ss]").forEach((b) => b.onclick = () => {
        const i = +b.dataset.ss;
        SC.stories[i].branch = $(`[data-sb="${i}"]`).value;
        SC.stories[i].title = $(`[data-stt="${i}"]`).value;
        persistSite();
        toast("استوری ذخیره شد.");
      });
    } else if (adminTab === "users" && !blocked("users")) {
      main.innerHTML = `<div class="lux-head"><h1>مراجعه‌کننده‌ها</h1></div>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>نام</th><th>موبایل</th><th>شهر</th></tr></thead><tbody>
          ${visitors.map((x) => `<tr><td>${x.name}</td><td>${fa(x.tel)}</td><td>${x.city || "—"}</td></tr>`).join("") || `<tr><td colspan="3">هنوز مراجعه‌ای نیست.</td></tr>`}
        </tbody></table></div>`;
    } else if (adminTab === "admins" && !blocked("admins")) {
      main.innerHTML = `
        <div class="lux-head"><h1>ادمین‌ها</h1></div>
        <div class="form-card premium-card">
          <h3>افزودن ادمین</h3>
          <div class="form-grid">
            <div class="inp"><label>نام</label><input id="adName"></div>
            <div class="inp"><label>موبایل</label><input id="adTel"></div>
            <div class="inp"><label>رمز</label><input id="adPass" type="password"></div>
            <div class="inp"><label>نقش</label>
              <select id="adRole">${Object.keys(ROLE_PRESETS).map((k) => `<option value="${k}">${ROLE_PRESETS[k].label}</option>`).join("")}</select>
            </div>
          </div>
          <button class="btn btn-gold" id="adAdd" style="margin-top:12px">ایجاد</button>
        </div>
        <div class="admin-table-wrap" style="margin-top:16px"><table class="admin-table"><thead><tr><th>نام</th><th>موبایل</th><th>نقش</th><th></th></tr></thead><tbody>
          ${adminList.map((a) => `<tr><td>${a.name}</td><td>${fa(a.tel)}</td><td>${(ROLE_PRESETS[a.role] || {}).label || a.role}</td>
            <td>${a.role === "super" ? "—" : `<button data-rmad="${a.id}">حذف</button>`}</td></tr>`).join("")}
        </tbody></table></div>`;
      $("#adAdd").onclick = () => {
        const tel = normTel($("#adTel").value);
        const pass = $("#adPass").value;
        const name = $("#adName").value.trim();
        const role = $("#adRole").value;
        if (!/^09\d{9}$/.test(tel) || pass.length < 6 || !name) return toast("نام، شماره و رمز را کامل کنید.");
        const list = loadAdmins();
        if (list.find((x) => x.tel === tel)) return toast("این شماره ادمین موجود است.");
        list.push({ id: "adm" + Date.now(), tel, pass: hash(pass), name, kind: "admin", role, perms: { ...ROLE_PRESETS[role].perms }, city: "تهران", created: Date.now() });
        saveAdmins(list);
        toast("ادمین اضافه شد.");
        SC.renderAdmin();
      };
      $$("[data-rmad]").forEach((b) => b.onclick = () => {
        saveAdmins(loadAdmins().filter((x) => x.id !== b.dataset.rmad));
        toast("حذف شد.");
        SC.renderAdmin();
      });
    }

    bindNum3(main);
    $$("[data-at]").forEach((b) => b.onclick = () => { adminTab = b.dataset.at; SC.renderAdmin(); });
    const out = $("#adminOut");
    if (out) out.onclick = () => {
      setAdminSession(null);
      toast("از پنل ادمین خارج شدید.");
      location.hash = "#/";
      if (SC.reroute) SC.reroute();
    };
  };
})();
