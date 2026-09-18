/* صفر چی — تخمین قیمت کارکرده + نقشه بدنه تعاملی */
(function () {
  const faD = "۰۱۲۳۴۵۶۷۸۹";
  const fa = (n) => String(n).replace(/\d/g, (d) => faD[d]);
  const money = (n) => {
    if (!n && n !== 0) return "—";
    const g = String(Math.round(Math.abs(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
    return fa((Number(n) < 0 ? "-" : "") + g) + " تومان";
  };

  const STAT = {
    ok: { label: "سالم", color: "#4b5160", stroke: "rgba(232,212,139,.55)", drop: 0 },
    pdr: { label: "صافکاری بدون رنگ", color: "#c9b15a", stroke: "#e8d48b", drop: 0.008 },
    spot: { label: "رنگ جزئی / آبرنگ", color: "#c9843a", stroke: "#e8a04a", drop: 0.015 },
    paint: { label: "رنگ‌شده", color: "#b4533c", stroke: "#e07a62", drop: 0 },
    replace: { label: "تعویض‌شده", color: "#6b2d7a", stroke: "#c084d4", drop: 0 },
    rust: { label: "خوردگی", color: "#8a4b28", stroke: "#d4925a", drop: 0 },
    damage: { label: "آسیب‌دیده", color: "#8b1e2d", stroke: "#e05a6a", drop: 0 }
  };

  const PARTS = [
    { id: "hood", name: "کاپوت", group: "body", paint: 0.035, replace: 0.048, rust: 0.025, damage: 0.03 },
    { id: "roof", name: "سقف", group: "body", paint: 0.06, replace: 0.11, rust: 0.04, damage: 0.05 },
    { id: "trunk", name: "صندوق عقب", group: "body", paint: 0.04, replace: 0.05, rust: 0.025, damage: 0.03 },
    { id: "flf", name: "گلگیر جلو راننده", group: "body", paint: 0.025, replace: 0.035, rust: 0.018, damage: 0.022 },
    { id: "frf", name: "گلگیر جلو شاگرد", group: "body", paint: 0.025, replace: 0.035, rust: 0.018, damage: 0.022 },
    { id: "rlf", name: "گلگیر عقب راننده", group: "body", paint: 0.025, replace: 0.035, rust: 0.018, damage: 0.022 },
    { id: "rrf", name: "گلگیر عقب شاگرد", group: "body", paint: 0.025, replace: 0.035, rust: 0.018, damage: 0.022 },
    { id: "fld", name: "درب جلو راننده", group: "body", paint: 0.035, replace: 0.045, rust: 0.02, damage: 0.028 },
    { id: "frd", name: "درب جلو شاگرد", group: "body", paint: 0.035, replace: 0.045, rust: 0.02, damage: 0.028 },
    { id: "rld", name: "درب عقب راننده", group: "body", paint: 0.032, replace: 0.042, rust: 0.02, damage: 0.026 },
    { id: "rrd", name: "درب عقب شاگرد", group: "body", paint: 0.032, replace: 0.042, rust: 0.02, damage: 0.026 },
    { id: "lrock", name: "رکاب راننده", group: "body", paint: 0.018, replace: 0.028, rust: 0.022, damage: 0.02 },
    { id: "rrock", name: "رکاب شاگرد", group: "body", paint: 0.018, replace: 0.028, rust: 0.022, damage: 0.02 },
    { id: "fbump", name: "سپر جلو", group: "body", paint: 0.008, replace: 0.012, rust: 0.01, damage: 0.01 },
    { id: "rbump", name: "سپر عقب", group: "body", paint: 0.008, replace: 0.012, rust: 0.01, damage: 0.01 },
    { id: "fpanel", name: "سینی جلو", group: "body", paint: 0.012, replace: 0.02, rust: 0.015, damage: 0.018 },
    { id: "flch", name: "شاسی جلو راننده", group: "chassis", paint: 0.07, replace: 0.12, rust: 0.06, damage: 0.09 },
    { id: "frch", name: "شاسی جلو شاگرد", group: "chassis", paint: 0.07, replace: 0.12, rust: 0.06, damage: 0.09 },
    { id: "rlch", name: "شاسی عقب راننده", group: "chassis", paint: 0.065, replace: 0.11, rust: 0.055, damage: 0.085 },
    { id: "rrch", name: "شاسی عقب شاگرد", group: "chassis", paint: 0.065, replace: 0.11, rust: 0.055, damage: 0.085 },
    { id: "apl", name: "ستون A راننده", group: "chassis", paint: 0.04, replace: 0.07, rust: 0.03, damage: 0.05 },
    { id: "apr", name: "ستون A شاگرد", group: "chassis", paint: 0.04, replace: 0.07, rust: 0.03, damage: 0.05 },
    { id: "bpl", name: "ستون B راننده", group: "chassis", paint: 0.045, replace: 0.075, rust: 0.032, damage: 0.055 },
    { id: "bpr", name: "ستون B شاگرد", group: "chassis", paint: 0.045, replace: 0.075, rust: 0.032, damage: 0.055 },
    { id: "cpl", name: "ستون C راننده", group: "chassis", paint: 0.038, replace: 0.065, rust: 0.028, damage: 0.048 },
    { id: "cpr", name: "ستون C شاگرد", group: "chassis", paint: 0.038, replace: 0.065, rust: 0.028, damage: 0.048 },
    { id: "tfloor", name: "کف صندوق", group: "chassis", paint: 0.03, replace: 0.055, rust: 0.04, damage: 0.045 }
  ];

  const OPTIONS = [
    "سانروف / پانوراما", "کروز کنترل", "کروز تطبیقی", "دوربین ۳۶۰",
    "صندلی برقی", "تهویه صندلی", "سنسور پارک", "ورود بدون کلید",
    "هدآپ دیسپلی", "گیربکس اتومات", "صندلی حافظه‌دار", "آینه تاشو برقی"
  ];

  const SPECIAL = [
    { id: "ring", name: "رینگ اسپرت / آلیاژی", pct: 0.008 },
    { id: "audio", name: "سیستم صوتی پریمیوم (بوز / JBL / هارمن)", pct: 0.006 },
    { id: "pano", name: "سقف پانوراما دوتکه", pct: 0.01 },
    { id: "android", name: "مانیتور اندروید فابریک", pct: 0.004 },
    { id: "cam360", name: "دوربین ۳۶۰ و سنسور هوشمند", pct: 0.005 },
    { id: "bodykit", name: "کیت بدنه و اسپویلر", pct: 0.005 },
    { id: "exhaust", name: "اگزوز اسپرت", pct: 0.003 },
    { id: "leather", name: "چرم کامل کابین", pct: 0.004 },
    { id: "ambient", name: "نورپردازی کابین", pct: 0.002 },
    { id: "caliper", name: "کالیپر رنگی / ترمز اسپرت", pct: 0.003 },
    { id: "awd", name: "دو دیفرانسیل", pct: 0.012 },
    { id: "offroad", name: "وینچ / باربند / آفرود پکیج", pct: 0.006 }
  ];

  const CHASSIS_POINTS = [
    { id: "flch", name: "شاسی جلو راننده" },
    { id: "frch", name: "شاسی جلو شاگرد" },
    { id: "rlch", name: "شاسی عقب راننده" },
    { id: "rrch", name: "شاسی عقب شاگرد" }
  ];
  const CHASSIS_STAT = [
    { id: "ok", label: "سالم" },
    { id: "damage", label: "ضربه" },
    { id: "paint", label: "ترمیم" },
    { id: "replace", label: "تعویض" }
  ];
  const KM_TYPES = [
    { id: "zero", label: "صفر کیلومتر" },
    { id: "low", label: "کم‌کارکرد" },
    { id: "normal", label: "متعارف" },
    { id: "high", label: "پرکارکرد" },
    { id: "taxi", label: "تاکسی / شرکتی" }
  ];
  const TIRE_STAT = [
    { id: "new", label: "نو / بالای ۸۰٪" },
    { id: "good", label: "خوب ۷۰٪" },
    { id: "mid", label: "متوسط ۵۰٪" },
    { id: "worn", label: "تعویض لازم" }
  ];
  const BODY_TYPES = [
    { id: "full", label: "کامل" },
    { id: "fran", label: "با فرانشیز" },
    { id: "theft", label: "آتش‌سوزی و سرقت" }
  ];
  const BODY_COVERS = [
    { id: "price", name: "نوسان قیمت" },
    { id: "steal", name: "سرقت درجا" },
    { id: "nature", name: "بلایای طبیعی" },
    { id: "glass", name: "شکست شیشه" },
    { id: "transit", name: "ایاب و ذهاب" },
    { id: "zerofran", name: "حذف فرانشیز" }
  ];

  function yearsBetween(from, to) {
    const a = [];
    for (let y = to; y >= from; y--) a.push(y);
    return a;
  }

  const Y = (base, start, end) => {
    const o = {};
    for (let y = start; y <= end; y++) {
      const age = end - y;
      o[y] = Math.round(base * Math.pow(0.93, age));
    }
    return o;
  };

  const CATALOG = [
    { brand: "پژو", models: [
      { name: "۲۰۷", trims: [
        { name: "دنده‌ای", years: Y(1050000000, 1396, 1404) },
        { name: "اتومات TU5P", years: Y(1280000000, 1398, 1404) },
        { name: "پانوراما اتومات", years: Y(1420000000, 1400, 1404) }
      ]},
      { name: "۲۰۶", trims: [
        { name: "تیپ ۲", years: Y(720000000, 1390, 1402) },
        { name: "تیپ ۵", years: Y(850000000, 1392, 1402) }
      ]},
      { name: "۲۰۰۸", trims: [{ name: "GT Line", years: Y(3450000000, 1396, 1398) }]}
    ]},
    { brand: "ایران خودرو", models: [
      { name: "دنا پلاس", trims: [
        { name: "دنده‌ای", years: Y(980000000, 1397, 1404) },
        { name: "توربو اتومات", years: Y(1240000000, 1399, 1404) }
      ]},
      { name: "تارا", trims: [
        { name: "دنده‌ای", years: Y(920000000, 1400, 1404) },
        { name: "اتومات V4", years: Y(1120000000, 1401, 1404) }
      ]},
      { name: "سورن پلاس", trims: [{ name: "XU7P", years: Y(780000000, 1400, 1404) }]}
    ]},
    { brand: "سایپا", models: [
      { name: "شاهین", trims: [
        { name: "G", years: Y(820000000, 1400, 1404) },
        { name: "پلاس اتومات", years: Y(980000000, 1402, 1404) }
      ]},
      { name: "کوییک", trims: [
        { name: "دنده‌ای", years: Y(520000000, 1398, 1404) },
        { name: "اتومات", years: Y(610000000, 1399, 1404) }
      ]},
      { name: "ساینا", trims: [{ name: "S", years: Y(480000000, 1398, 1404) }]}
    ]},
    { brand: "تویوتا", models: [
      { name: "لندکروز", trims: [
        { name: "۳۰۰ VX", years: Y(19800000000, 1401, 1404) },
        { name: "۲۰۰ سری", years: Y(14500000000, 1395, 1400) }
      ]},
      { name: "کمری", trims: [
        { name: "هیبرید لومیر", years: Y(15200000000, 1403, 1404) },
        { name: "GLX", years: Y(6800000000, 1395, 1400) }
      ]},
      { name: "پریوس", trims: [{ name: "تیپ C", years: Y(4300000000, 1395, 1398) }]}
    ]},
    { brand: "بنز", models: [
      { name: "E200", trims: [
        { name: "Avantgarde", years: Y(9800000000, 1395, 1403) },
        { name: "W213", years: Y(11800000000, 1397, 1403) }
      ]},
      { name: "C200", trims: [{ name: "W205", years: Y(8900000000, 1393, 1400) }]},
      { name: "S580 میباخ", trims: [{ name: "۴MATIC", years: Y(44500000000, 1402, 1404) }]}
    ]},
    { brand: "ب ام و", models: [
      { name: "M5 Competition", trims: [{ name: "xDrive", years: Y(32500000000, 1400, 1403) }]},
      { name: "۵۳۰i", trims: [{ name: "G30", years: Y(18600000000, 1398, 1403) }]},
      { name: "iX1", trims: [{ name: "eDrive 25L", years: Y(9890000000, 1403, 1404) }]}
    ]},
    { brand: "هیوندای", models: [
      { name: "سوناتا", trims: [
        { name: "۱.۵ توربو", years: Y(9700000000, 1403, 1404) },
        { name: "LF", years: Y(4200000000, 1394, 1398) }
      ]},
      { name: "سانتافه", trims: [{ name: "۴WD", years: Y(6200000000, 1398, 1402) }]},
      { name: "آزرا گرنجور", trims: [{ name: "۶ سیلندر", years: Y(6500000000, 1390, 1394) }]}
    ]},
    { brand: "کی ام سی", models: [
      { name: "T8", trims: [{ name: "دیزل دوکابین", years: Y(3890000000, 1401, 1404) }]},
      { name: "J7", trims: [{ name: "اتومات", years: Y(2150000000, 1401, 1404) }]}
    ]},
    { brand: "فونیکس", models: [
      { name: "تیگو ۷ پرو", trims: [
        { name: "پریمیوم", years: Y(4480000000, 1401, 1404) },
        { name: "IE", years: Y(3980000000, 1401, 1404) }
      ]}
    ]},
    { brand: "بهمن", models: [
      { name: "فیدلیتی پرایم", trims: [
        { name: "۵ نفره", years: Y(4180000000, 1400, 1404) },
        { name: "۷ نفره", years: Y(4320000000, 1400, 1404) }
      ]},
      { name: "دیگنیتی پرایم", trims: [{ name: "پرایم", years: Y(4380000000, 1401, 1404) }]}
    ]},
    { brand: "پورشه", models: [
      { name: "۹۱۱ Carrera S", trims: [{ name: "۹۹۲", years: Y(40100000000, 1400, 1403) }]}
    ]},
    { brand: "تسلا", models: [
      { name: "Model S", trims: [{ name: "Plaid", years: Y(23100000000, 1402, 1404) }]}
    ]},
    { brand: "کیا", models: [
      { name: "اسپورتیج", trims: [{ name: "GT Line", years: Y(5400000000, 1396, 1401) }]},
      { name: "سراتو", trims: [{ name: "۲۰۰۰", years: Y(2100000000, 1393, 1398) }]}
    ]}
  ];

  const COLORS = ["سفید", "مشکی", "خاکستری", "نقره‌ای", "نوک‌مدادی", "آبی", "قرمز", "سبز", "بژ", "قهوه‌ای", "طلایی"];

  const st = {
    step: 1,
    brand: "",
    model: "",
    trim: "",
    year: "",
    color: "سفید",
    km: "",
    kmType: "normal",
    kmTampered: false,
    chassis: { flch: "ok", frch: "ok", rlch: "ok", rrch: "ok" },
    tires: "good",
    tireMatch: true,
    insThird: "yes",
    insThirdMonths: "6",
    insBody: "no",
    insBodyMonths: "12",
    insBodyType: "full",
    insBodyFran: "10",
    insBodyCovers: [],
    insNoClaim: "0",
    insBodyNoClaim: "0",
    warranty: "no",
    warrantyType: "factory",
    warrantyMonths: "12",
    options: [],
    special: [],
    parts: {},
    selected: null,
    mapTab: "body",
    result: null
  };

  function brandObj() { return CATALOG.find((b) => b.brand === st.brand); }
  function modelObj() { return brandObj()?.models.find((m) => m.name === st.model); }
  function trimObj() { return modelObj()?.trims.find((t) => t.name === st.trim); }

  function dropOf(part, status) {
    if (!status || status === "ok") return 0;
    if (status === "pdr") return STAT.pdr.drop;
    if (status === "spot") return STAT.spot.drop + part.paint * 0.35;
    return part[status] || 0;
  }

  function calc() {
    const tr = trimObj();
    const base = tr?.years[st.year];
    if (!base) return null;
    const year = +st.year;
    const km = Math.max(0, +st.km || 0);
    const now = 1405;
    const age = Math.max(0, now - year);
    const expected = age * 18000;
    let kmAdj = 0;
    if (km > expected) kmAdj = -Math.min(0.18, ((km - expected) / 10000) * 0.009);
    else kmAdj = Math.min(0.06, ((expected - km) / 10000) * 0.004);
    if (km === 0) kmAdj += 0.025;

    if (st.kmType === "zero") kmAdj += 0.015;
    else if (st.kmType === "low") kmAdj += 0.008;
    else if (st.kmType === "high") kmAdj -= 0.02;
    else if (st.kmType === "taxi") kmAdj -= 0.07;
    if (st.kmTampered) kmAdj -= 0.045;

    const popular = ["سفید", "مشکی", "خاکستری", "نقره‌ای", "نوک‌مدادی"];
    const colorAdj = popular.includes(st.color) ? 0 : -0.012;

    const optAdj = st.options.length * 0.0035;
    const specList = SPECIAL.filter((s) => st.special.includes(s.id));
    const specAdj = specList.reduce((a, s) => a + s.pct, 0);

    let tireAdj = 0;
    if (st.tires === "new") tireAdj = 0.012;
    else if (st.tires === "good") tireAdj = 0.004;
    else if (st.tires === "mid") tireAdj = -0.008;
    else if (st.tires === "worn") tireAdj = -0.022;
    if (!st.tireMatch) tireAdj -= 0.006;

    let thirdAdj = 0;
    if (st.insThird === "yes") thirdAdj += Math.min(0.008, (+st.insThirdMonths || 0) * 0.0008);
    else thirdAdj -= 0.01;
    thirdAdj += Math.min(0.012, (+st.insNoClaim || 0) * 0.0012);

    let bodyInsAdj = 0;
    if (st.insBody === "yes") {
      bodyInsAdj += 0.012;
      bodyInsAdj += Math.min(0.008, (+st.insBodyMonths || 0) * 0.0005);
      if (st.insBodyType === "full") bodyInsAdj += 0.008;
      else if (st.insBodyType === "theft") bodyInsAdj += 0.003;
      if (st.insBodyFran === "0") bodyInsAdj += 0.006;
      else if (st.insBodyFran === "20") bodyInsAdj -= 0.003;
      const coverBoost = { price: 0.004, steal: 0.003, nature: 0.002, glass: 0.001, transit: 0.002, zerofran: 0.004 };
      (st.insBodyCovers || []).forEach((c) => { bodyInsAdj += coverBoost[c] || 0; });
      bodyInsAdj += Math.min(0.015, (+st.insBodyNoClaim || 0) * 0.0012);
    } else {
      bodyInsAdj -= 0.006;
    }
    const insAdj = thirdAdj + bodyInsAdj;

    let warrantyAdj = 0;
    if (st.warranty === "yes") {
      const left = Math.min(36, +st.warrantyMonths || 0);
      if (st.warrantyType === "factory") warrantyAdj = 0.012 + left * 0.0006;
      else if (st.warrantyType === "agency") warrantyAdj = 0.008 + left * 0.0004;
      else warrantyAdj = 0.005 + left * 0.0003;
    } else {
      warrantyAdj = -0.004;
    }

    CHASSIS_POINTS.forEach((p) => {
      const s = st.chassis[p.id] || "ok";
      if (s !== "ok") st.parts[p.id] = s;
    });

    const drops = [];
    let bodyAdj = 0;
    PARTS.forEach((p) => {
      const s = st.parts[p.id] || "ok";
      const d = dropOf(p, s);
      if (d > 0) {
        drops.push({ name: p.name, status: STAT[s].label, pct: d, amount: base * d });
        bodyAdj -= d;
      }
    });
    bodyAdj = Math.max(bodyAdj, -0.42);

    const mid = Math.round(base * (1 + kmAdj + colorAdj + optAdj + specAdj + tireAdj + insAdj + warrantyAdj + bodyAdj));
    return {
      base, mid,
      min: Math.round(mid * 0.965),
      max: Math.round(mid * 1.035),
      kmAdj, colorAdj, optAdj, specAdj, tireAdj, insAdj, thirdAdj, bodyInsAdj, warrantyAdj, bodyAdj, drops, specList
    };
  }

  function svgBody(parts, selected, uid, opts) {
    const P = parts || st.parts;
    const S = selected !== undefined ? selected : st.selected;
    const uid_ = uid || "est";
    opts = opts || {};
    const bare = !!opts.bare;
    const fill = (id) => STAT[P[id] || "ok"].color;
    const str = (id) => STAT[P[id] || "ok"].stroke;
    const sel = (id) => (S === id ? " part-sel" : "");
    const r = (id, x, y, w, h, rx = 8) =>
      `<rect data-part="${id}" class="car-part${sel(id)}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill(id)}" stroke="${str(id)}" stroke-width="1.6"/>`;
    const ff = `font-family="YekanBakh, IranSans, Vazirmatn, Tahoma, sans-serif"`;
    const labels = bare ? "" : `
      <text x="210" y="26" text-anchor="middle" fill="#ffd0d6" font-size="14" font-weight="700" ${ff}>جلو</text>
      <text x="210" y="158" text-anchor="middle" fill="#fff5f6" font-size="15" font-weight="700" ${ff} pointer-events="none">کاپوت</text>
      <text x="210" y="348" text-anchor="middle" fill="#fff5f6" font-size="15" font-weight="700" ${ff} pointer-events="none">سقف</text>
      <text x="210" y="576" text-anchor="middle" fill="#fff5f6" font-size="15" font-weight="700" ${ff} pointer-events="none">صندوق</text>
      <text x="210" y="778" text-anchor="middle" fill="#ffd0d6" font-size="14" font-weight="700" ${ff}>عقب</text>
      <rect x="8" y="318" width="28" height="168" rx="10" fill="rgba(22,6,10,.72)" stroke="rgba(255,208,214,.28)"/>
      <text x="22" y="402" text-anchor="middle" fill="#ffd0d6" font-size="13" font-weight="700" ${ff} transform="rotate(-90 22 402)" pointer-events="none">سمت راننده</text>
      <rect x="384" y="318" width="28" height="168" rx="10" fill="rgba(22,6,10,.72)" stroke="rgba(255,208,214,.28)"/>
      <text x="398" y="402" text-anchor="middle" fill="#ffd0d6" font-size="13" font-weight="700" ${ff} transform="rotate(90 398 402)" pointer-events="none">سمت شاگرد</text>
    `;

    return `
    <svg class="car-svg" viewBox="0 0 420 800" width="420" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${uid_}-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#9bb4c9" stop-opacity=".35"/>
          <stop offset="1" stop-color="#6a8094" stop-opacity=".18"/>
        </linearGradient>
        <filter id="${uid_}-glow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#e0566a" flood-opacity=".55"/></filter>
      </defs>
      <rect x="68" y="122" width="22" height="70" rx="10" fill="#16161a" stroke="#3a3a42"/>
      <rect x="330" y="122" width="22" height="70" rx="10" fill="#16161a" stroke="#3a3a42"/>
      <rect x="68" y="524" width="22" height="70" rx="10" fill="#16161a" stroke="#3a3a42"/>
      <rect x="330" y="524" width="22" height="70" rx="10" fill="#16161a" stroke="#3a3a42"/>

      ${r("fbump", 122, 40, 176, 28, 14)}
      ${r("fpanel", 138, 66, 144, 22, 6)}
      ${r("hood", 138, 90, 144, 118, 10)}
      ${r("flf", 92, 96, 44, 108, 10)}
      ${r("frf", 284, 96, 44, 108, 10)}

      <path d="M138 210 L282 210 L268 252 L152 252 Z" fill="url(#${uid_}-glass)" stroke="rgba(255,208,214,.25)"/>

      ${r("fld", 88, 218, 48, 148, 10)}
      ${r("frd", 284, 218, 48, 148, 10)}
      ${r("roof", 142, 256, 136, 168, 12)}
      ${r("rld", 88, 372, 48, 138, 10)}
      ${r("rrd", 284, 372, 48, 138, 10)}
      ${r("lrock", 78, 254, 12, 240, 6)}
      ${r("rrock", 330, 254, 12, 240, 6)}

      ${r("rlf", 92, 512, 44, 108, 10)}
      ${r("rrf", 284, 512, 44, 108, 10)}
      ${r("trunk", 138, 512, 144, 112, 10)}
      ${r("rbump", 122, 628, 176, 28, 14)}
      ${labels}
    </svg>`;
  }

  function svgChassis() {
    const fill = (id) => STAT[st.parts[id] || "ok"].color;
    const strk = (id) => STAT[st.parts[id] || "ok"].stroke;
    const sel = (id) => (st.selected === id ? " part-sel" : "");
    const r = (id, x, y, w, h, rx = 8) =>
      `<rect data-part="${id}" class="car-part${sel(id)}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill(id)}" stroke="${strk(id)}" stroke-width="1.8"/>`;

    return `
    <svg class="car-svg" viewBox="0 0 360 780" xmlns="http://www.w3.org/2000/svg">
      <rect x="86" y="70" width="188" height="620" rx="70" fill="none" stroke="rgba(232,212,139,.18)" stroke-dasharray="6 6"/>
      ${r("flch", 70, 90, 70, 90, 12)}
      ${r("frch", 220, 90, 70, 90, 12)}
      ${r("apl", 78, 210, 28, 90, 6)}
      ${r("apr", 254, 210, 28, 90, 6)}
      ${r("bpl", 78, 330, 28, 90, 6)}
      ${r("bpr", 254, 330, 28, 90, 6)}
      ${r("cpl", 78, 450, 28, 90, 6)}
      ${r("cpr", 254, 450, 28, 90, 6)}
      ${r("rlch", 70, 570, 70, 90, 12)}
      ${r("rrch", 220, 570, 70, 90, 12)}
      ${r("tfloor", 122, 560, 116, 80, 10)}
      <text x="105" y="140" text-anchor="middle" fill="#f4efe3" font-size="10" pointer-events="none">شاسی جلو</text>
      <text x="255" y="140" text-anchor="middle" fill="#f4efe3" font-size="10" pointer-events="none">شاسی جلو</text>
      <text x="92" y="258" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">A</text>
      <text x="268" y="258" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">A</text>
      <text x="92" y="378" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">B</text>
      <text x="268" y="378" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">B</text>
      <text x="92" y="498" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">C</text>
      <text x="268" y="498" text-anchor="middle" fill="#f4efe3" font-size="9" pointer-events="none">C</text>
      <text x="180" y="604" text-anchor="middle" fill="#f4efe3" font-size="11" pointer-events="none">کف صندوق</text>
    </svg>`;
  }

  function statusPad() {
    const part = PARTS.find((p) => p.id === st.selected);
    if (!part) {
      return `<div class="status-pad mute">روی هر قسمت بدنه کلیک کنید و وضعیت آن را انتخاب نمایید: سالم، صافکاری، رنگ جزئی، رنگ‌شده، تعویض یا خوردگی.</div>`;
    }
    const cur = st.parts[part.id] || "ok";
    const keys = part.group === "chassis"
      ? ["ok", "damage", "paint", "replace", "rust"]
      : ["ok", "pdr", "spot", "paint", "replace", "rust"];
    return `
      <div class="status-pad">
        <div class="sp-head">
          <b>${part.name}</b>
          <span class="mute">افت تقریبی این قطعه تا ${fa(Math.round((part.replace || 0) * 1000) / 10)}٪</span>
        </div>
        <div class="stat-grid">
          ${keys.map((k) => `
            <button class="stat-btn ${cur === k ? "on" : ""}" data-setstat="${k}" style="--c:${STAT[k].color}">
              <i></i>${STAT[k].label}
            </button>`).join("")}
        </div>
      </div>`;
  }

  function legend() {
    return `<div class="map-legend">
      ${["ok", "pdr", "spot", "paint", "replace", "rust", "damage"].map((k) =>
        `<span><i style="background:${STAT[k].color};border-color:${STAT[k].stroke}"></i>${STAT[k].label}</span>`
      ).join("")}
    </div>`;
  }

  function damagedList() {
    const items = PARTS.filter((p) => st.parts[p.id] && st.parts[p.id] !== "ok");
    if (!items.length) return `<p class="mute" style="margin-top:10px">هنوز قطعه‌ای علامت‌گذاری نشده — بدنه سالم فرض می‌شود.</p>`;
    return `<ul class="dmg-list">${items.map((p) => {
      const s = st.parts[p.id];
      return `<li><i style="background:${STAT[s].color}"></i><b>${p.name}</b><span>${STAT[s].label}</span>
        <button data-clear="${p.id}">✕</button></li>`;
    }).join("")}</ul>`;
  }

  function render(view) {
    if (st.step === 3 && st.result) return renderResult(view);

    const models = brandObj()?.models || [];
    const trims = modelObj()?.trims || [];
    const years = trimObj() ? Object.keys(trimObj().years).map(Number).sort((a, b) => b - a) : [];

    view.innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / تخمین قیمت</div>
        <h1>تخمین قیمت خودرو کارکرده</h1>
        <p class="mute">مشخصات را وارد کنید، روی نقشه بدنه رنگ‌شدگی، خوردگی یا تعویض هر قطعه را مشخص کنید؛ قیمت منصفانه بازار محاسبه می‌شود.</p>
      </div>
      <div class="wrap est-layout">
        <aside class="est-form">
          <div class="steps">
            <div class="step ${st.step >= 1 ? "on" : ""}"></div>
            <div class="step ${st.step >= 2 ? "on" : ""}"></div>
            <div class="step ${st.step >= 3 ? "on" : ""}"></div>
          </div>
          <p class="mute" style="margin-bottom:14px">${st.step === 1 ? "گام ۱ از ۳ — مشخصات خودرو" : "گام ۲ از ۳ — وضعیت بدنه و شاسی"}</p>

          ${st.step === 1 ? `
          <h3 class="est-h">مشخصات خودرو</h3>
          <div class="form-grid">
            <div class="inp"><label>برند</label>
              <select id="eBrand"><option value="">انتخاب کنید</option>
                ${CATALOG.map((b) => `<option ${st.brand === b.brand ? "selected" : ""}>${b.brand}</option>`).join("")}
              </select></div>
            <div class="inp"><label>مدل</label>
              <select id="eModel" ${!st.brand ? "disabled" : ""}><option value="">انتخاب کنید</option>
                ${models.map((m) => `<option ${st.model === m.name ? "selected" : ""}>${m.name}</option>`).join("")}
              </select></div>
            <div class="inp"><label>تریم / تیپ</label>
              <select id="eTrim" ${!st.model ? "disabled" : ""}><option value="">انتخاب کنید</option>
                ${trims.map((t) => `<option ${st.trim === t.name ? "selected" : ""}>${t.name}</option>`).join("")}
              </select></div>
            <div class="inp"><label>سال ساخت</label>
              <select id="eYear" ${!st.trim ? "disabled" : ""}><option value="">انتخاب کنید</option>
                ${years.map((y) => `<option ${+st.year === y ? "selected" : ""}>${y}</option>`).join("")}
              </select></div>
            <div class="inp"><label>رنگ خودرو</label>
              <select id="eColor">${COLORS.map((c) => `<option ${st.color === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
            <div class="inp"><label>کارکرد دقیق (کیلومتر)</label>
              <input id="eKm" type="number" min="0" value="${st.km}" placeholder="مثلاً ۵۶۰۰۰"></div>
          </div>

          <h3 class="est-h">وضعیت کارکرد خودرو</h3>
          <p class="sub-note">علاوه بر عدد کیلومتر، نوع استفاده هم روی قیمت اثر دارد.</p>
          <div class="choice-row" id="kmTypes">
            ${KM_TYPES.map((k) => `<button type="button" class="choice ${st.kmType === k.id ? "on" : ""}" data-field="kmType" data-val="${k.id}">${k.label}</button>`).join("")}
          </div>
          <label class="opt-chip" style="margin-top:10px">
            <input type="checkbox" id="eTamper" ${st.kmTampered ? "checked" : ""}>
            احتمال دستکاری کیلومترشمار
          </label>

          <h3 class="est-h">وضعیت شاسی‌ها</h3>
          <p class="sub-note">هر چهار گوشه را جداگانه مشخص کنید. جزئیات بیشتر روی نقشه هم قابل تنظیم است.</p>
          <div class="chassis-grid">
            ${CHASSIS_POINTS.map((p) => `
              <div class="chassis-card">
                <b>${p.name}</b>
                <div class="choice-row">
                  ${CHASSIS_STAT.map((s) => `
                    <button type="button" class="choice ${st.chassis[p.id] === s.id ? "on" : ""}" data-ch="${p.id}" data-val="${s.id}">${s.label}</button>
                  `).join("")}
                </div>
              </div>`).join("")}
          </div>

          <h3 class="est-h">وضعیت لاستیک</h3>
          <div class="choice-row">
            ${TIRE_STAT.map((t) => `<button type="button" class="choice ${st.tires === t.id ? "on" : ""}" data-field="tires" data-val="${t.id}">${t.label}</button>`).join("")}
          </div>
          <label class="opt-chip" style="margin-top:10px">
            <input type="checkbox" id="eTireMatch" ${st.tireMatch ? "checked" : ""}>
            چهار حلقه جفت و هم‌برند هستند
          </label>

          <h3 class="est-h">بیمه شخص ثالث</h3>
          <div class="form-grid">
            <div>
              <p class="sub-note">وضعیت ثالث</p>
              <div class="choice-row">
                <button type="button" class="choice ${st.insThird === "yes" ? "on" : ""}" data-field="insThird" data-val="yes">دارد</button>
                <button type="button" class="choice ${st.insThird === "no" ? "on" : ""}" data-field="insThird" data-val="no">ندارد / منقضی</button>
              </div>
            </div>
            <div class="inp"><label>مانده ثالث (ماه)</label>
              <select id="eInsM">
                ${[1, 2, 3, 6, 8, 10, 12].map((n) => `<option value="${n}" ${st.insThirdMonths == n ? "selected" : ""}>${n} ماه</option>`).join("")}
              </select>
            </div>
            <div class="inp"><label>تخفیف عدم خسارت ثالث</label>
              <select id="eNoClaim">
                ${[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((n) => `<option value="${n}" ${st.insNoClaim == n ? "selected" : ""}>${n === 0 ? "بدون تخفیف" : n + " سال"}</option>`).join("")}
              </select>
            </div>
          </div>

          <h3 class="est-h">بیمه بدنه</h3>
          <p class="sub-note">بیمه بدنه فعال، مانده پوشش و الحاقیه‌ها روی قیمت فروش اثر مستقیم دارد.</p>
          <div class="choice-row" style="margin-bottom:10px">
            <button type="button" class="choice ${st.insBody === "yes" ? "on" : ""}" data-field="insBody" data-val="yes">بیمه بدنه دارد</button>
            <button type="button" class="choice ${st.insBody === "no" ? "on" : ""}" data-field="insBody" data-val="no">بیمه بدنه ندارد</button>
          </div>
          <div class="form-grid" style="${st.insBody === "yes" ? "" : "opacity:.45;pointer-events:none"}">
            <div class="inp"><label>مانده بیمه بدنه</label>
              <select id="eBodyM">
                ${[1, 2, 3, 6, 8, 10, 12].map((n) => `<option value="${n}" ${st.insBodyMonths == n ? "selected" : ""}>${n} ماه</option>`).join("")}
              </select>
            </div>
            <div class="inp"><label>تخفیف عدم خسارت بدنه</label>
              <select id="eBodyNoClaim">
                ${[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((n) => `<option value="${n}" ${st.insBodyNoClaim == n ? "selected" : ""}>${n === 0 ? "بدون تخفیف" : n + " سال"}</option>`).join("")}
              </select>
            </div>
            <div>
              <p class="sub-note">نوع پوشش</p>
              <div class="choice-row">
                ${BODY_TYPES.map((t) => `<button type="button" class="choice ${st.insBodyType === t.id ? "on" : ""}" data-field="insBodyType" data-val="${t.id}">${t.label}</button>`).join("")}
              </div>
            </div>
            <div>
              <p class="sub-note">فرانشیز</p>
              <div class="choice-row">
                <button type="button" class="choice ${st.insBodyFran === "0" ? "on" : ""}" data-field="insBodyFran" data-val="0">صفر</button>
                <button type="button" class="choice ${st.insBodyFran === "10" ? "on" : ""}" data-field="insBodyFran" data-val="10">۱۰٪</button>
                <button type="button" class="choice ${st.insBodyFran === "20" ? "on" : ""}" data-field="insBodyFran" data-val="20">۲۰٪</button>
              </div>
            </div>
          </div>
          <p class="sub-note" style="margin-top:12px">الحاقیه‌های بیمه بدنه</p>
          <div class="opt-grid">
            ${BODY_COVERS.map((c) => `
              <label class="opt-chip"><input type="checkbox" class="eBodyCover" value="${c.id}" ${ (st.insBodyCovers || []).includes(c.id) ? "checked" : "" } ${st.insBody === "yes" ? "" : "disabled"}> ${c.name}</label>
            `).join("")}
          </div>

          <h3 class="est-h">گارانتی</h3>
          <p class="sub-note">گارانتی فعال کارخانه یا نمایندگی قیمت فروش را بالا می‌برد.</p>
          <div class="choice-row" style="margin-bottom:10px">
            <button type="button" class="choice ${st.warranty === "yes" ? "on" : ""}" data-field="warranty" data-val="yes">گارانتی فعال</button>
            <button type="button" class="choice ${st.warranty === "no" ? "on" : ""}" data-field="warranty" data-val="no">گارانتی غیرفعال / تمام‌شده</button>
          </div>
          <div class="form-grid" style="${st.warranty === "yes" ? "" : "opacity:.45;pointer-events:none"}">
            <div>
              <p class="sub-note">نوع گارانتی</p>
              <div class="choice-row">
                <button type="button" class="choice ${st.warrantyType === "factory" ? "on" : ""}" data-field="warrantyType" data-val="factory">شرکت سازنده</button>
                <button type="button" class="choice ${st.warrantyType === "agency" ? "on" : ""}" data-field="warrantyType" data-val="agency">نمایندگی</button>
                <button type="button" class="choice ${st.warrantyType === "extra" ? "on" : ""}" data-field="warrantyType" data-val="extra">گارانتی تمدیدی</button>
              </div>
            </div>
            <div class="inp"><label>مانده گارانتی</label>
              <select id="eWarM">
                ${[1, 2, 3, 6, 8, 12, 18, 24, 36].map((n) => `<option value="${n}" ${st.warrantyMonths == n ? "selected" : ""}>${n} ماه</option>`).join("")}
              </select>
            </div>
          </div>

          <h3 class="est-h">آپشن‌های رفاهی</h3>
          <div class="opt-grid">
            ${OPTIONS.map((o) => `
              <label class="opt-chip"><input type="checkbox" class="eOpt" value="${o}" ${st.options.includes(o) ? "checked" : ""}> ${o}</label>
            `).join("")}
          </div>

          <h3 class="est-h">آپشن‌های ویژه</h3>
          <p class="sub-note">رینگ، سیستم صوتی، کیت بدنه و تجهیزات خاص که قیمت را جداگانه بالا می‌برند.</p>
          <div class="opt-grid">
            ${SPECIAL.map((o) => `
              <label class="opt-chip"><input type="checkbox" class="eSpec" value="${o.id}" ${st.special.includes(o.id) ? "checked" : ""}> ${o.name}</label>
            `).join("")}
          </div>
          <button class="btn btn-gold btn-full" style="margin-top:18px" id="eNext">تکمیل اطلاعات و رفتن به نقشه بدنه</button>
          ` : `
          <p>روی نقشه کلیک کنید و برای هر قطعه یکی از وضعیت‌ها را بزنید. شاسی و ستون‌ها در زبانه دوم هستند.</p>
          ${statusPad()}
          ${damagedList()}
          <div style="display:flex;gap:8px;margin-top:18px">
            <button class="btn btn-ghost" id="eBack">بازگشت</button>
            <button class="btn btn-gold btn-full" id="eCalc">تخمین قیمت</button>
          </div>
          `}
        </aside>

        <section class="est-visual">
          ${st.step === 1 ? `
            <div class="est-hero-card">
              <img src="images/hero.jpg" alt="">
              <div class="txt">
                <div class="eyebrow">PRICE ATELIER</div>
                <h2>محاسبه دقیق با جزئیات رنگ، شاسی و تعویض</h2>
                <p class="mute">همان منطق کارشناسی بازار ایران: هر لکه رنگ، صافکاری، خوردگی یا تعویض قطعه، درصد مشخصی از قیمت روز کم می‌کند.</p>
              </div>
            </div>
          ` : `
            <div class="map-card">
              <div class="map-tabs">
                <button class="${st.mapTab === "body" ? "on" : ""}" data-mtab="body">نقشه بدنه</button>
                <button class="${st.mapTab === "chassis" ? "on" : ""}" data-mtab="chassis">شاسی و ستون</button>
                <button class="${st.mapTab === "list" ? "on" : ""}" data-mtab="list">لیست قطعات</button>
              </div>
              ${legend()}
              ${st.mapTab === "list" ? partList() : `<div class="map-stage">${st.mapTab === "chassis" ? svgChassis() : svgBody()}</div>`}
              <p class="mute" style="text-align:center;margin-top:8px">کلیک روی قطعه → انتخاب وضعیت → رنگ همان قسمت عوض می‌شود</p>
            </div>
          `}
        </section>
      </div>`;

    bind(view);
  }

  function partList() {
    const group = (g, title) => `
      <h4>${title}</h4>
      <div class="plist">
        ${PARTS.filter((p) => p.group === g).map((p) => {
          const s = st.parts[p.id] || "ok";
          return `<button class="plist-item ${st.selected === p.id ? "on" : ""}" data-part="${p.id}">
            <i style="background:${STAT[s].color}"></i>${p.name}
            <small>${STAT[s].label}</small>
          </button>`;
        }).join("")}
      </div>`;
    return `<div class="plist-wrap">${group("body", "بدنه")}${group("chassis", "شاسی و اتاق")}</div>`;
  }

  function renderResult(view) {
    const r = st.result;
    const title = `${st.brand} ${st.model} ${st.trim} ${fa(st.year)}`;
    view.innerHTML = `
      <div class="wrap page-head">
        <div class="crumbs">خانه / تخمین قیمت / نتیجه</div>
        <h1>قیمت تخمینی ${title}</h1>
        <p class="mute">${st.color} · ${(+st.km === 0 ? "صفر کیلومتر" : fa((+st.km).toLocaleString("en-US")) + " کیلومتر")} · ${KM_TYPES.find((k) => k.id === st.kmType)?.label || ""} · لاستیک ${TIRE_STAT.find((t) => t.id === st.tires)?.label || ""}</p>
      </div>
      <div class="wrap" style="padding-bottom:70px">
        <div class="kpi">
          <div><span class="mute">حداقل بازار</span><b>${money(r.min)}</b></div>
          <div><span class="mute">پیشنهاد صفر چی</span><b>${money(r.mid)}</b></div>
          <div><span class="mute">حداکثر بازار</span><b>${money(r.max)}</b></div>
          <div><span class="mute">قیمت پایه سالم</span><b>${money(r.base)}</b></div>
        </div>
        <div class="est-layout">
          <div>
            <div class="panel">
              <h3>جزئیات افت قیمت</h3>
              <table class="price-table">
                <tr><td>کارکرد و نوع استفاده${st.kmTampered ? " (دستکاری کیلومتر)" : ""}</td><td class="${r.kmAdj >= 0 ? "up" : "down"}">${r.kmAdj >= 0 ? "+" : ""}${fa((r.kmAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>رنگ بدنه (${st.color})</td><td class="${r.colorAdj >= 0 ? "up" : "down"}">${r.colorAdj >= 0 ? "بدون اثر" : fa((r.colorAdj * 100).toFixed(1)) + "٪"}</td></tr>
                <tr><td>لاستیک (${TIRE_STAT.find((t) => t.id === st.tires)?.label || ""}${st.tireMatch ? "" : " · ناجفت"})</td><td class="${r.tireAdj >= 0 ? "up" : "down"}">${r.tireAdj >= 0 ? "+" : ""}${fa((r.tireAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>شخص ثالث ${st.insThird === "yes" ? fa(st.insThirdMonths) + " ماه · تخفیف " + fa(st.insNoClaim) + " سال" : "ندارد"}</td><td class="${r.thirdAdj >= 0 ? "up" : "down"}">${r.thirdAdj >= 0 ? "+" : ""}${fa((r.thirdAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>بیمه بدنه ${st.insBody === "yes" ? (BODY_TYPES.find((t) => t.id === st.insBodyType)?.label || "") + " · مانده " + fa(st.insBodyMonths) + " ماه · فرانشیز " + fa(st.insBodyFran) + "٪ · تخفیف " + fa(st.insBodyNoClaim) + " سال" + ((st.insBodyCovers || []).length ? " · " + fa(st.insBodyCovers.length) + " الحاقیه" : "") : "ندارد"}</td><td class="${r.bodyInsAdj >= 0 ? "up" : "down"}">${r.bodyInsAdj >= 0 ? "+" : ""}${fa((r.bodyInsAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>گارانتی ${st.warranty === "yes" ? ({ factory: "شرکت سازنده", agency: "نمایندگی", extra: "تمدیدی" }[st.warrantyType] || "") + " · مانده " + fa(st.warrantyMonths) + " ماه" : "غیرفعال"}</td><td class="${r.warrantyAdj >= 0 ? "up" : "down"}">${r.warrantyAdj >= 0 ? "+" : ""}${fa((r.warrantyAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>آپشن رفاهی (${fa(st.options.length)} مورد)</td><td class="up">+${fa((r.optAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>آپشن ویژه (${fa(st.special.length)} مورد)</td><td class="up">+${fa((r.specAdj * 100).toFixed(1))}٪</td></tr>
                <tr><td>شاسی‌ها: ${CHASSIS_POINTS.map((p) => CHASSIS_STAT.find((s) => s.id === (st.chassis[p.id] || "ok"))?.label).join(" / ")}</td><td class="mute">در افت بدنه</td></tr>
                <tr><td>جمع افت بدنه و شاسی</td><td class="down">${fa((r.bodyAdj * 100).toFixed(1))}٪</td></tr>
              </table>
              ${r.drops.length ? `
              <h3 style="margin-top:18px">قطعات علامت‌خورده</h3>
              <table class="price-table">
                <thead><tr><th>قطعه</th><th>وضعیت</th><th>افت</th><th>مبلغ</th></tr></thead>
                <tbody>
                  ${r.drops.map((d) => `<tr><td>${d.name}</td><td>${d.status}</td><td class="down">${fa((d.pct * 100).toFixed(1))}٪</td><td>${money(d.amount)}</td></tr>`).join("")}
                </tbody>
              </table>` : `<p class="mute" style="margin-top:12px">بدنه و شاسی سالم ثبت شده؛ افت رنگی لحاظ نشده است.</p>`}
            </div>
            <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
              <button class="btn btn-ghost" id="eAgain">تخمین دوباره</button>
              <a class="btn btn-gold" href="#/sell">ثبت آگهی با این قیمت</a>
              <a class="btn btn-ghost" href="#/inspect">رزرو کارشناسی حضوری</a>
            </div>
          </div>
          <div class="map-card">
            ${legend()}
            <div class="map-stage">${svgBody()}</div>
          </div>
        </div>
      </div>`;
    view.querySelector("#eAgain").onclick = () => {
      st.step = 1;
      st.result = null;
      render(view);
    };
  }

  function bind(view) {
    const $ = (s) => view.querySelector(s);
    const $$ = (s) => [...view.querySelectorAll(s)];

    $("#eBrand")?.addEventListener("change", (e) => {
      st.brand = e.target.value; st.model = ""; st.trim = ""; st.year = "";
      render(view);
    });
    $("#eModel")?.addEventListener("change", (e) => {
      st.model = e.target.value; st.trim = ""; st.year = "";
      render(view);
    });
    $("#eTrim")?.addEventListener("change", (e) => {
      st.trim = e.target.value; st.year = "";
      render(view);
    });
    $("#eYear")?.addEventListener("change", (e) => { st.year = e.target.value; });
    $("#eColor")?.addEventListener("change", (e) => { st.color = e.target.value; });
    $("#eKm")?.addEventListener("input", (e) => { st.km = e.target.value; });
    $("#eInsM")?.addEventListener("change", (e) => { st.insThirdMonths = e.target.value; });
    $("#eNoClaim")?.addEventListener("change", (e) => { st.insNoClaim = e.target.value; });
    $("#eBodyM")?.addEventListener("change", (e) => { st.insBodyMonths = e.target.value; });
    $("#eBodyNoClaim")?.addEventListener("change", (e) => { st.insBodyNoClaim = e.target.value; });
    $$(".eBodyCover").forEach((c) => c.addEventListener("change", () => {
      st.insBodyCovers = $$(".eBodyCover").filter((x) => x.checked).map((x) => x.value);
    }));
    $("#eTamper")?.addEventListener("change", (e) => { st.kmTampered = e.target.checked; });
    $("#eTireMatch")?.addEventListener("change", (e) => { st.tireMatch = e.target.checked; });
    $$(".eOpt").forEach((c) => c.addEventListener("change", () => {
      st.options = $$(".eOpt").filter((x) => x.checked).map((x) => x.value);
    }));
    $$(".eSpec").forEach((c) => c.addEventListener("change", () => {
      st.special = $$(".eSpec").filter((x) => x.checked).map((x) => x.value);
    }));
    $$("[data-field]").forEach((b) => b.addEventListener("click", () => {
      st[b.dataset.field] = b.dataset.val;
      render(view);
    }));
    $$("[data-ch]").forEach((b) => b.addEventListener("click", () => {
      st.chassis[b.dataset.ch] = b.dataset.val;
      if (b.dataset.val === "ok") delete st.parts[b.dataset.ch];
      else st.parts[b.dataset.ch] = b.dataset.val;
      render(view);
    }));

    $("#eNext")?.addEventListener("click", () => {
      st.color = $("#eColor")?.value || st.color;
      st.km = $("#eKm")?.value ?? st.km;
      st.year = $("#eYear")?.value || st.year;
      if (!st.brand || !st.model || !st.trim || !st.year) {
        SC.toast ? SC.toast("برند، مدل، تریم و سال را کامل کنید.") : alert("برند، مدل، تریم و سال را کامل کنید.");
        return;
      }
      st.step = 2;
      render(view);
    });
    $("#eBack")?.addEventListener("click", () => { st.step = 1; render(view); });
    $("#eCalc")?.addEventListener("click", () => {
      st.result = calc();
      if (!st.result) return;
      st.step = 3;
      render(view);
    });

    $$("[data-mtab]").forEach((b) => b.addEventListener("click", () => {
      st.mapTab = b.dataset.mtab;
      render(view);
    }));
    $$("[data-part]").forEach((el) => el.addEventListener("click", () => {
      st.selected = el.getAttribute("data-part");
      render(view);
    }));
    $$("[data-setstat]").forEach((b) => b.addEventListener("click", () => {
      if (!st.selected) return;
      st.parts[st.selected] = b.dataset.setstat;
      render(view);
    }));
    $$("[data-clear]").forEach((b) => b.addEventListener("click", () => {
      delete st.parts[b.dataset.clear];
      render(view);
    }));
  }

  SC.renderEstimate = render;
  SC.estimateReset = () => {
    st.step = 1; st.result = null; st.selected = null;
  };
  SC.estimateSTAT = STAT;
  SC.estimatePARTS = PARTS;
  SC.svgEstimateBody = (parts, selected, uid) => svgBody(parts, selected, uid);
  SC.svgEstimateChassis = (parts, selected) => svgChassis(parts, selected);
  SC.mountEstimateMap = function (el, parts, onChange) {
    if (!el) return;
    parts = parts || {};
    let selected = null, mapTab = "body";
    const $ = (s, r) => (r || el).querySelector(s);
    const $$ = (s, r) => [...(r || el).querySelectorAll(s)];
    const draw = () => {
      const part = PARTS.find((p) => p.id === selected);
      const cur = part ? (parts[part.id] || "ok") : "ok";
      const keys = part && part.group === "chassis"
        ? ["ok", "damage", "paint", "replace", "rust"]
        : ["ok", "pdr", "spot", "paint", "replace", "rust"];
      const items = PARTS.filter((p) => parts[p.id] && parts[p.id] !== "ok");
      el.innerHTML = `
        <div class="map-card">
          <div class="map-tabs">
            <button type="button" class="${mapTab === "body" ? "on" : ""}" data-mtab="body">نقشه بدنه</button>
            <button type="button" class="${mapTab === "chassis" ? "on" : ""}" data-mtab="chassis">شاسی و ستون</button>
            <button type="button" class="${mapTab === "list" ? "on" : ""}" data-mtab="list">لیست قطعات</button>
          </div>
          ${legend()}
          ${mapTab === "list" ? `<div class="plist-wrap">
            ${["body", "chassis"].map((g) => `
              <h4>${g === "body" ? "بدنه" : "شاسی و اتاق"}</h4>
              <div class="plist">${PARTS.filter((p) => p.group === g).map((p) => {
                const s = parts[p.id] || "ok";
                return `<button type="button" class="plist-item ${selected === p.id ? "on" : ""}" data-part="${p.id}">
                  <i style="background:${STAT[s].color}"></i>${p.name}<small>${STAT[s].label}</small></button>`;
              }).join("")}</div>`).join("")}
          </div>` : `<div class="map-stage">${mapTab === "chassis" ? svgChassis(parts, selected) : svgBody(parts, selected, "sell")}</div>`}
          <div class="status-pad">
            ${part ? `<div class="sp-head"><b>${part.name}</b></div>
              <div class="stat-grid">${keys.map((k) => `
                <button type="button" class="stat-btn ${cur === k ? "on" : ""}" data-setstat="${k}" style="--c:${STAT[k].color}"><i></i>${STAT[k].label}</button>`).join("")}
              </div>` : `<div class="mute">روی هر قسمت بدنه کلیک کنید و وضعیت را انتخاب کنید: سالم، صافکاری، رنگ جزئی، رنگ‌شده، تعویض یا خوردگی.</div>`}
          </div>
          ${items.length ? `<ul class="dmg-list">${items.map((p) => {
            const s = parts[p.id];
            return `<li><i style="background:${STAT[s].color}"></i><b>${p.name}</b><span>${STAT[s].label}</span>
              <button type="button" data-clear="${p.id}">✕</button></li>`;
          }).join("")}</ul>` : `<p class="mute" style="margin-top:10px">هنوز قطعه‌ای علامت‌گذاری نشده — بدنه سالم فرض می‌شود.</p>`}
        </div>`;
      $$("[data-mtab]").forEach((b) => b.onclick = () => { mapTab = b.dataset.mtab; selected = null; draw(); });
      $$("[data-part]").forEach((b) => b.onclick = () => { selected = b.getAttribute("data-part"); draw(); });
      $$("[data-setstat]").forEach((b) => b.onclick = () => {
        if (!selected) return;
        if (b.dataset.setstat === "ok") delete parts[selected];
        else parts[selected] = b.dataset.setstat;
        if (onChange) onChange({ ...parts });
        draw();
      });
      $$("[data-clear]").forEach((b) => b.onclick = () => {
        delete parts[b.dataset.clear];
        if (onChange) onChange({ ...parts });
        draw();
      });
    };
    draw();
    return { get: () => ({ ...parts }), set: (p) => { parts = { ...p }; draw(); } };
  };
})();
