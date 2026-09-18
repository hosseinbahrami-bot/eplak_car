/* صفر چی — دادهٔ نمایشی بازار خودرو */
window.SC = window.SC || {};

SC.countryOrder = [
  "ایران", "چین", "ژاپن", "کره", "آلمان", "فرانسه", "ایتالیا",
  "انگلستان", "آمریکا", "سوئد", "اسپانیا", "چک", "رومانی", "روسیه", "مالزی"
];

SC.brands = [
  { id: "ikco", name: "ایران خودرو", country: "ایران", g: "ir", hot: true },
  { id: "saipa", name: "سایپا", country: "ایران", g: "ir", hot: true },
  { id: "parskhodro", name: "پارس خودرو", country: "ایران", g: "ir" },
  { id: "zamyad", name: "زامیاد", country: "ایران", g: "ir" },
  { id: "bahman", name: "بهمن", country: "ایران", g: "ir", hot: true },
  { id: "fidelity", name: "فیدلیتی", country: "ایران", g: "ir" },
  { id: "dignity", name: "دیگنیتی", country: "ایران", g: "ir" },
  { id: "respect", name: "ریسپکت", country: "ایران", g: "ir" },
  { id: "capra", name: "کاپرا", country: "ایران", g: "ir" },
  { id: "amico", name: "آمیکو", country: "ایران", g: "ir" },
  { id: "farda", name: "فردا", country: "ایران", g: "ir" },
  { id: "tigard", name: "تیگارد", country: "ایران", g: "ir" },
  { id: "lamari", name: "لاماری", country: "ایران", g: "ir", hot: true },
  { id: "lamaco", name: "لاماکو", country: "ایران", g: "ir" },
  { id: "lucano", name: "لوکانو", country: "ایران", g: "ir", hot: true },
  { id: "maxmotor", name: "مکث موتور", country: "ایران", g: "ir" },
  { id: "karmania", name: "کارمانیا", country: "ایران", g: "ir" },
  { id: "bamco", name: "خودروسازان بم", country: "ایران", g: "ir" },
  { id: "rayen", name: "خودروسازان راین", country: "ایران", g: "ir" },
  { id: "padra", name: "پادرا", country: "ایران", g: "ir" },
  { id: "coupa", name: "کوپا", country: "ایران", g: "ir" },
  { id: "manian", name: "مانیان", country: "ایران", g: "ir" },
  { id: "suprazu", name: "سوپرازو", country: "ایران", g: "ir" },
  { id: "mvm", name: "ام وی ام", country: "چین", g: "cn", hot: true },
  { id: "fownix", name: "فونیکس", country: "چین", g: "cn", hot: true },
  { id: "xtrim", name: "اکستریم", country: "چین", g: "cn", hot: true },
  { id: "chery", name: "چری", country: "چین", g: "cn", hot: true },
  { id: "kmc", name: "کی ام سی", country: "چین", g: "cn", hot: true },
  { id: "jac", name: "جک", country: "چین", g: "cn", hot: true },
  { id: "geely", name: "جیلی", country: "چین", g: "cn" },
  { id: "changan", name: "چانگان", country: "چین", g: "cn" },
  { id: "haima", name: "هایما", country: "چین", g: "cn", hot: true },
  { id: "haval", name: "هاوال", country: "چین", g: "cn" },
  { id: "jetour", name: "جتور", country: "چین", g: "cn" },
  { id: "byd", name: "بی وای دی", country: "چین", g: "cn" },
  { id: "baic", name: "بایک", country: "چین", g: "cn" },
  { id: "beijing", name: "بیجینگ", country: "چین", g: "cn" },
  { id: "dongfeng", name: "دانگ فنگ", country: "چین", g: "cn" },
  { id: "foton", name: "فوتون", country: "چین", g: "cn" },
  { id: "lifan", name: "لیفان", country: "چین", g: "cn" },
  { id: "brilliance", name: "برلیانس", country: "چین", g: "cn" },
  { id: "zotye", name: "زوتی", country: "چین", g: "cn" },
  { id: "greatwall", name: "گریت وال", country: "چین", g: "cn" },
  { id: "tank", name: "تانک", country: "چین", g: "cn" },
  { id: "hongqi", name: "هونگچی", country: "چین", g: "cn" },
  { id: "avatr", name: "آواتار", country: "چین", g: "cn" },
  { id: "voyah", name: "وویا", country: "چین", g: "cn" },
  { id: "wey", name: "وی", country: "چین", g: "cn" },
  { id: "venucia", name: "ونوسیا", country: "چین", g: "cn" },
  { id: "mg", name: "ام جی", country: "چین", g: "cn" },
  { id: "roewe", name: "رووی", country: "چین", g: "cn" },
  { id: "faw", name: "فاو", country: "چین", g: "cn" },
  { id: "bestune", name: "بستیون", country: "چین", g: "cn" },
  { id: "jaecoo", name: "جیکو", country: "چین", g: "cn" },
  { id: "swm", name: "SWM", country: "چین", g: "cn" },
  { id: "vgv", name: "VGV", country: "چین", g: "cn" },
  { id: "baw", name: "BAW", country: "چین", g: "cn" },
  { id: "jmc", name: "JMC", country: "چین", g: "cn" },
  { id: "gac", name: "جی ای سی", country: "چین", g: "cn" },
  { id: "jetta", name: "جتا", country: "چین", g: "cn" },
  { id: "xpeng", name: "ایکس پنگ", country: "چین", g: "cn" },
  { id: "zeekr", name: "زیکر", country: "چین", g: "cn" },
  { id: "xiaomi", name: "شیائومی", country: "چین", g: "cn" },
  { id: "leapmotor", name: "لیپ موتور", country: "چین", g: "cn" },
  { id: "lynkco", name: "لینک اند کو", country: "چین", g: "cn" },
  { id: "skywell", name: "اسکای ول", country: "چین", g: "cn" },
  { id: "hanteng", name: "هن تنگ", country: "چین", g: "cn" },
  { id: "bisu", name: "بیسو", country: "چین", g: "cn" },
  { id: "domy", name: "دامای", country: "چین", g: "cn" },
  { id: "dayun", name: "دایون", country: "چین", g: "cn" },
  { id: "soueast", name: "سوئست", country: "چین", g: "cn" },
  { id: "hafei", name: "هافی", country: "چین", g: "cn" },
  { id: "landmark", name: "لندمارک", country: "چین", g: "cn" },
  { id: "leopard", name: "لئوپارد", country: "چین", g: "cn" },
  { id: "maxus", name: "مکسوس", country: "چین", g: "cn" },
  { id: "rox", name: "راکس", country: "چین", g: "cn" },
  { id: "im", name: "آی ام", country: "چین", g: "cn" },
  { id: "eres", name: "ارس", country: "چین", g: "cn" },
  { id: "lona", name: "لونا", country: "چین", g: "cn" },
  { id: "sinogold", name: "سینوگلد", country: "چین", g: "cn" },
  { id: "hyundai", name: "هیوندای", country: "کره", g: "as", hot: true },
  { id: "kia", name: "کیا", country: "کره", g: "as", hot: true },
  { id: "genesis", name: "جنسیس", country: "کره", g: "as" },
  { id: "ssangyong", name: "سانگ یانگ", country: "کره", g: "as" },
  { id: "daewoo", name: "دوو", country: "کره", g: "as" },
  { id: "samsung", name: "سامسونگ", country: "کره", g: "as" },
  { id: "toyota", name: "تویوتا", country: "ژاپن", g: "as", hot: true },
  { id: "lexus", name: "لکسوس", country: "ژاپن", g: "as", hot: true },
  { id: "nissan", name: "نیسان", country: "ژاپن", g: "as", hot: true },
  { id: "mazda", name: "مزدا", country: "ژاپن", g: "as" },
  { id: "honda", name: "هوندا", country: "ژاپن", g: "as" },
  { id: "mitsubishi", name: "میتسوبیشی", country: "ژاپن", g: "as" },
  { id: "suzuki", name: "سوزوکی", country: "ژاپن", g: "as" },
  { id: "subaru", name: "سوبارو", country: "ژاپن", g: "as" },
  { id: "isuzu", name: "ایسوزو", country: "ژاپن", g: "as" },
  { id: "infiniti", name: "اینفینیتی", country: "ژاپن", g: "as" },
  { id: "proton", name: "پروتون", country: "مالزی", g: "as" },
  { id: "peugeot", name: "پژو", country: "فرانسه", g: "eu", hot: true },
  { id: "renault", name: "رنو", country: "فرانسه", g: "eu", hot: true },
  { id: "citroen", name: "سیتروئن", country: "فرانسه", g: "eu" },
  { id: "ds", name: "دی اس", country: "فرانسه", g: "eu" },
  { id: "dacia", name: "داچیا", country: "رومانی", g: "eu" },
  { id: "mercedes", name: "بنز", country: "آلمان", g: "eu", hot: true },
  { id: "bmw", name: "ب ام و", country: "آلمان", g: "eu", hot: true },
  { id: "porsche", name: "پورشه", country: "آلمان", g: "eu", hot: true },
  { id: "audi", name: "آئودی", country: "آلمان", g: "eu", hot: true },
  { id: "vw", name: "فولکس واگن", country: "آلمان", g: "eu" },
  { id: "skoda", name: "اشکودا", country: "چک", g: "eu" },
  { id: "seat", name: "سئات", country: "اسپانیا", g: "eu" },
  { id: "opel", name: "اپل", country: "آلمان", g: "eu" },
  { id: "smart", name: "اسمارت", country: "آلمان", g: "eu" },
  { id: "mini", name: "مینی", country: "انگلستان", g: "eu" },
  { id: "volvo", name: "ولوو", country: "سوئد", g: "eu" },
  { id: "fiat", name: "فیات", country: "ایتالیا", g: "eu" },
  { id: "alfaromeo", name: "آلفارومئو", country: "ایتالیا", g: "eu" },
  { id: "maserati", name: "مازراتی", country: "ایتالیا", g: "eu" },
  { id: "ferrari", name: "فراری", country: "ایتالیا", g: "eu" },
  { id: "lotus", name: "لوتوس", country: "انگلستان", g: "eu" },
  { id: "landrover", name: "لندروور", country: "انگلستان", g: "eu" },
  { id: "jaguar", name: "جگوار", country: "انگلستان", g: "eu" },
  { id: "bentley", name: "بنتلی", country: "انگلستان", g: "eu" },
  { id: "lada", name: "لادا", country: "روسیه", g: "eu" },
  { id: "uaz", name: "یواز", country: "روسیه", g: "eu" },
  { id: "tesla", name: "تسلا", country: "آمریکا", g: "ot", hot: true },
  { id: "chevrolet", name: "شورولت", country: "آمریکا", g: "ot" },
  { id: "ford", name: "فورد", country: "آمریکا", g: "ot" },
  { id: "dodge", name: "دوج", country: "آمریکا", g: "ot" },
  { id: "jeep", name: "جیپ", country: "آمریکا", g: "ot" },
  { id: "cadillac", name: "کادیلاک", country: "آمریکا", g: "ot" },
  { id: "hummer", name: "هامر", country: "آمریکا", g: "ot" }
];

SC.cities = [
  "تهران", "کرج", "اصفهان", "شیراز", "مشهد", "تبریز", "اهواز",
  "رشت", "نوشهر", "قم", "کرمان", "یزد", "همدان", "اراک", "ساری"
];

SC.colors = ["مشکی", "سفید", "نقره‌ای", "خاکستری", "آبی", "قرمز", "سبز", "بژ", "قهوه‌ای", "طلایی"];

SC.bodyTypes = [
  { id: "sedan", name: "سدان", icon: "sedan" },
  { id: "suv", name: "شاسی‌بلند", icon: "suv" },
  { id: "hatchback", name: "هاچ‌بک", icon: "hatch" },
  { id: "crossover", name: "کراس‌اوور", icon: "cross" },
  { id: "pickup", name: "وانت", icon: "pickup" },
  { id: "coupe", name: "کوپه", icon: "coupe" },
  { id: "convertible", name: "کروک", icon: "conv" },
  { id: "van", name: "ون", icon: "van" }
];

SC.lifestyles = [
  { id: "luxury", name: "لوکس", size: "feat", n: "۰۱", blurb: "آتلیه خاص‌پسندان", tags: ["پرآپشن", "باکیفیت", "پرقدرت"] },
  { id: "offroad", name: "آفرود", size: "tall", n: "۰۲", blurb: "خاک، کوه، شمال", tags: ["طبیعت‌گردی", "شاسی مستقل", "دو دیفرانسیل"] },
  { id: "work", name: "کاری", size: "half", n: "۰۳", blurb: "بار و درآمد", tags: ["جابجایی", "بار", "درآمدزا"] },
  { id: "eco", name: "کم‌مصرف", size: "half", n: "۰۴", blurb: "هیبرید و برقی", tags: ["هیبرید", "موتور کم‌حجم", "دوستدار محیط"] },
  { id: "market", name: "محبوب بازار", size: "tile", n: "۰۵", blurb: "خوش‌فروش و نقدشو", tags: ["پول نقد", "خوش‌فروش", "رند بازار"] },
  { id: "urban", name: "شهری", size: "tile", n: "۰۶", blurb: "روزمرهٔ جمع‌وجور", tags: ["جمع‌وجور", "اتوماتیک", "روزمره"] },
  { id: "family", name: "خانوادگی", size: "tile", n: "۰۷", blurb: "جادار برای سفر", tags: ["جادار", "مناسب سفر", "بی‌دردسر"] },
  { id: "first", name: "اولین خودرو", size: "tile", n: "۰۸", blurb: "کم‌خرج، بی‌دردسر", tags: ["کم‌خرج", "جمع‌وجور", "بدون افت"] }
];

SC.priceClasses = [
  { id: "base", name: "پایه", range: "تا ۱ میلیارد", min: 0, max: 1000000000 },
  { id: "eco", name: "اقتصادی", range: "۱ تا ۲ میلیارد", min: 1000000000, max: 2000000000 },
  { id: "mid", name: "میان‌رده", range: "۲ تا ۵ میلیارد", min: 2000000000, max: 5000000000 },
  { id: "high", name: "بالارده", range: "۵ تا ۱۲ میلیارد", min: 5000000000, max: 12000000000 },
  { id: "lux", name: "لوکس", range: "۱۲ تا ۲۵ میلیارد", min: 12000000000, max: 25000000000 },
  { id: "special", name: "خاص", range: "از ۲۵ میلیارد", min: 25000000000, max: Infinity }
];

SC.quickFilters = [
  { id: "installment", label: "اقساطی", key: "installment", val: true },
  { id: "zero", label: "صفر کیلومتر", key: "mileageMax", val: 0 },
  { id: "electric", label: "برقی", key: "fuel", val: "برقی" },
  { id: "chinese", label: "چینی", key: "origin", val: "چین" },
  { id: "v8", label: "۸ سیلندر", key: "cylinders", val: 8 },
  { id: "classic", label: "کلاسیک", key: "special", val: "classic" },
  { id: "hybrid", label: "هیبرید", key: "fuel", val: "هیبرید" },
  { id: "auto", label: "اتوماتیک", key: "gear", val: "اتوماتیک" },
  { id: "nopaint", label: "بدون رنگ", key: "paint", val: "بدون رنگ" },
  { id: "awd", label: "دو محور", key: "drive", val: "دو دیفرانسیل" },
  { id: "newmodel", label: "مدل بالا", key: "yearMin", val: 1403 },
  { id: "lowkm", label: "کم‌کارکرد", key: "mileageMax", val: 30000 }
];

SC.cars = [
  {
    id: "c01", type: "car", brand: "بنز", brandId: "mercedes", model: "S580 میباخ", trim: "۴MATIC",
    year: 2024, yearFa: 1403, mileage: 4200, price: 42800000000, oldPrice: 44500000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "مشکی", interior: "کرم نappa",
    city: "تهران", district: "فرمانیه", cylinders: 8, drive: "دو دیفرانسیل",
    paint: "بدون رنگ", origin: "آلمان", installment: false, special: "luxury",
    lifestyle: ["luxury", "market"],
    img: "images/hero.jpg", photos: 12, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۲ ساعت پیش",
    desc: "میباخ S580 فول آپشن، وارداتی، پلاک ملی، سرویس کامل نمایندگی. سقف پانوراما، سیستم Burmester 4D، صندلی‌های عقب مجزا با ماساژور.",
    options: ["سانروف پانوراما", "صندلی ماساژور", "هدآپ دیسپلی", "رانندگی نیمه‌خودران", "سیستم صوتی Burmester", "تهویه چهارگانه", "در صندوق برقی", "دوربین ۳۶۰"],
    scores: { drive: 96, design: 98, cabin: 99, value: 78, quality: 97 }
  },
  {
    id: "c02", type: "car", brand: "ب ام و", brandId: "bmw", model: "M5 Competition", trim: "xDrive",
    year: 2023, yearFa: 1402, mileage: 18600, price: 31200000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "آبی", interior: "مشکی آلکانترا",
    city: "تهران", district: "پاسداران", cylinders: 8, drive: "دو دیفرانسیل",
    paint: "بدون رنگ", origin: "آلمان", installment: false, special: "luxury",
    lifestyle: ["luxury"],
    img: "images/bmw-m5.jpg", photos: 9, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه پریس سنتر",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۵ ساعت پیش",
    desc: "M5 کامپتیشن با پکیج کربن، اگزوز Akrapovic، ترمز کربن سرامیک. کارکرد واقعی، سرویس‌های دوره‌ای در نمایندگی.",
    options: ["پکیج M Driver", "کربن سقف", "ترمز سرامیک", "هدآپ", "صندلی اسپرت برقی", "دوربین ۳۶۰", "هارمن کاردن"],
    scores: { drive: 99, design: 94, cabin: 90, value: 72, quality: 95 }
  },
  {
    id: "c03", type: "car", brand: "پورشه", brandId: "porsche", model: "۹۱۱ Carrera S", trim: "992",
    year: 2022, yearFa: 1401, mileage: 24100, price: 38900000000, oldPrice: 40100000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "coupe", color: "سبز", interior: "قهوه‌ای چرم",
    city: "تهران", district: "الهیه", cylinders: 6, drive: "دیفرانسیل عقب",
    paint: "بدون رنگ", origin: "آلمان", installment: false, special: "luxury",
    lifestyle: ["luxury"],
    img: "images/porsche.jpg", photos: 14, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "دیروز",
    desc: "۹۱۱ نسل ۹۹۲، رنگ خاص British Racing Green، پکیج اسپرت کرونو، اگزوز اسپرت. سند آزاد، کارشناسی کامل.",
    options: ["اسپرت کرونو", "اگزوز اسپرت", "صندلی اسپرت پلاس", "بوز", "سانروف", "PASM"],
    scores: { drive: 100, design: 99, cabin: 88, value: 70, quality: 98 }
  },
  {
    id: "c04", type: "car", brand: "تویوتا", brandId: "toyota", model: "لندکروز", trim: "۳۰۰ VX",
    year: 2023, yearFa: 1402, mileage: 31000, price: 18600000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "suv", color: "سفید", interior: "بژ",
    city: "تهران", district: "سعادت‌آباد", cylinders: 6, drive: "دو دیفرانسیل",
    paint: "یک لکه", origin: "ژاپن", installment: false, special: "offroad",
    lifestyle: ["offroad", "family", "luxury"],
    img: "images/toyota-land.jpg", photos: 11, video: false,
    inspected: true, verified: true, pinned: false, branch: "شعبه فردوس",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "دیروز",
    desc: "لندکروز ۳۰۰ فول، آفرود پکیج، وینچ فابریک، سقف پانوراما. مناسب سفر و خانواده.",
    options: ["سانروف پانوراما", "کروز تطبیقی", "دوربین ۳۶۰", "صندلی تهویه‌دار", "آفرود پکیج", "۷ نفره"],
    scores: { drive: 92, design: 88, cabin: 94, value: 82, quality: 96 }
  },
  {
    id: "c05", type: "car", brand: "بنز", brandId: "mercedes", model: "E200", trim: "Avantgarde",
    year: 2018, yearFa: 1397, mileage: 98000, price: 6450000000, oldPrice: 6680000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "طلایی", interior: "کرم",
    city: "تهران", district: "شریعتی", cylinders: 4, drive: "دیفرانسیل عقب",
    paint: "دو لکه", origin: "آلمان", installment: true, special: null,
    lifestyle: ["luxury", "urban"],
    img: "images/mercedes-e.jpg", photos: 8, video: false,
    inspected: true, verified: true, pinned: false, branch: "شعبه شریعتی",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۳ روز پیش",
    desc: "E200 فیس‌لیفت، سرویس کامل، گیربکس ۹ سرعته. مناسب استفاده شهری لوکس.",
    options: ["سانروف", "صندلی برقی حافظه‌دار", "کروز", "سنسور پارک", "چراغ LED", "ورود بدون کلید"],
    scores: { drive: 86, design: 90, cabin: 91, value: 80, quality: 89 }
  },
  {
    id: "c06", type: "car", brand: "تسلا", brandId: "tesla", model: "Model S", trim: "Plaid",
    year: 2024, yearFa: 1403, mileage: 0, price: 22400000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "برقی", body: "sedan", color: "نقره‌ای", interior: "سفید",
    city: "تهران", district: "فرمانیه", cylinders: 0, drive: "دو دیفرانسیل",
    paint: "بدون رنگ", origin: "آمریکا", installment: true, special: null,
    lifestyle: ["eco", "luxury"],
    img: "images/tesla.jpg", photos: 10, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "لحظاتی پیش",
    desc: "Model S Plaid صفر کیلومتر، شتاب ۲٫۱ ثانیه، برد ۶۰۰ کیلومتر. گارانتی کارخانه فعال.",
    options: ["اتوپایلوت", "سقف شیشه‌ای", "صدا ۱۷ بلندگو", "شارژ سریع", "حالت ترک", "صفحه ۱۷ اینچ"],
    scores: { drive: 98, design: 91, cabin: 93, value: 76, quality: 90 }
  },
  {
    id: "c07", type: "car", brand: "پژو", brandId: "peugeot", model: "۲۰۰۸", trim: "GT Line",
    year: 2018, yearFa: 1397, mileage: 87000, price: 3180000000, oldPrice: 3290000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "crossover", color: "خاکستری", interior: "مشکی",
    city: "تهران", district: "ونک", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "گلگیر رنگ", origin: "فرانسه", installment: true, special: null,
    lifestyle: ["urban", "first", "eco"],
    img: "images/peugeot.jpg", photos: 7, video: false,
    inspected: true, verified: true, pinned: false, branch: "شعبه فردوس",
    seller: "مالک شخصی", sellerType: "شخصی",
    posted: "۴ ساعت پیش",
    desc: "۲۰۰۸ فول، سانروف، پشت آمپر دیجیتال. کارکرد واقعی، بیمه تا پایان سال.",
    options: ["سانروف", "کروز", "سنسور عقب", "آینه‌های تاشو", "ورود بدون کلید", "دوربین عقب"],
    scores: { drive: 78, design: 84, cabin: 80, value: 86, quality: 77 }
  },
  {
    id: "c08", type: "car", brand: "کی ام سی", brandId: "kmc", model: "T8", trim: "دیزل",
    year: 2024, yearFa: 1403, mileage: 19000, price: 3740000000, oldPrice: 3890000000,
    gear: "دنده‌ای", fuel: "دیزلی", body: "pickup", color: "مشکی", interior: "مشکی",
    city: "تهران", district: "فرمانیه", cylinders: 4, drive: "دو دیفرانسیل",
    paint: "بدون رنگ", origin: "چین", installment: false, special: "offroad",
    lifestyle: ["work", "offroad"],
    img: "images/pickup.jpg", photos: 6, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۱ هفته پیش",
    desc: "T8 دوکابین چهارچرخ محرک، مناسب کار و آفرود سبک. گارانتی باقی‌مانده.",
    options: ["قفل دیفرانسیل", "باربند", "دوربین عقب", "کروز", "تودوزی چرم", "رینگ ۱۸"],
    scores: { drive: 80, design: 76, cabin: 74, value: 88, quality: 79 }
  },
  {
    id: "c09", type: "car", brand: "هیوندای", brandId: "hyundai", model: "سوناتا", trim: "۱٫۵ توربو",
    year: 2025, yearFa: 1404, mileage: 0, price: 9700000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "سفید", interior: "کرم",
    city: "ایلام", district: "مرکز", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "کره", installment: true, special: null,
    lifestyle: ["family", "urban", "market"],
    img: "images/mercedes-e.jpg", photos: 5, video: false,
    inspected: false, verified: true, pinned: false, branch: null,
    seller: "واردکننده رسمی", sellerType: "نمایندگی",
    posted: "لحظاتی پیش",
    desc: "سوناتا ۲۰۲۵ صفر، گارانتی ۵ ساله. سقف دیجیتال، رانندگی نیمه‌خودران.",
    options: ["سقف دیجیتال", "کروز تطبیقی", "صندلی تهویه", "بوز", "دوربین ۳۶۰", "HUD"],
    scores: { drive: 84, design: 88, cabin: 90, value: 81, quality: 87 }
  },
  {
    id: "c10", type: "car", brand: "تویوتا", brandId: "toyota", model: "کمری هیبرید", trim: "۲٫۵ لومیر",
    year: 2025, yearFa: 1404, mileage: 10000, price: 15200000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "هیبرید", body: "sedan", color: "سفید", interior: "قهوه‌ای",
    city: "تهران", district: "ایرانمال", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "ژاپن", installment: false, special: null,
    lifestyle: ["eco", "family", "luxury"],
    img: "images/tesla.jpg", photos: 8, video: true,
    inspected: true, verified: true, pinned: false, branch: "شعبه ایرانمال",
    seller: "آرکان خودرو", sellerType: "نمایشگاه",
    posted: "لحظاتی پیش",
    desc: "کمری هیبرید لومیر، کم‌کارکرد، مصرف ترکیبی ۴٫۵ لیتر. مناسب خانواده.",
    options: ["هیبرید", "سانروف", "صندلی برقی", "کروز تطبیقی", "JBL", "دوربین ۳۶۰"],
    scores: { drive: 85, design: 86, cabin: 89, value: 83, quality: 94 }
  },
  {
    id: "c11", type: "car", brand: "فونیکس", brandId: "fownix", model: "تیگو ۷ پرو", trim: "پریمیوم",
    year: 2024, yearFa: 1403, mileage: 49000, price: 4350000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "crossover", color: "آبی", interior: "نارنجی",
    city: "تهران", district: "ایرانمال", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "چین", installment: true, special: null,
    lifestyle: ["family", "urban", "market"],
    img: "images/peugeot.jpg", photos: 6, video: false,
    inspected: false, verified: true, pinned: false, branch: null,
    seller: "آرکان خودرو", sellerType: "نمایشگاه",
    posted: "۱ ساعت پیش",
    desc: "تیگو ۷ پرو پریمیوم، سقف پانوراما، اداس کامل. خوش‌فروش بازار.",
    options: ["سقف پانوراما", "ADAS", "صندلی برقی", "دوربین ۳۶۰", "شارژر بی‌سیم", "تهویه اتومات"],
    scores: { drive: 79, design: 82, cabin: 85, value: 87, quality: 80 }
  },
  {
    id: "c12", type: "car", brand: "پژو", brandId: "peugeot", model: "۲۰۷", trim: "اتومات TU5P",
    year: 2022, yearFa: 1401, mileage: 56000, price: 1950000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "hatchback", color: "سفید", interior: "مشکی",
    city: "تهران", district: "میرداماد", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "ایران", installment: false, special: null,
    lifestyle: ["urban", "first", "eco"],
    img: "images/peugeot.jpg", photos: 4, video: false,
    inspected: false, verified: false, pinned: false, branch: null,
    seller: "مالک شخصی", sellerType: "شخصی",
    posted: "۱ ساعت پیش",
    desc: "۲۰۷ اتومات TU5P، بیمه شخص ثالث، سرویس منظم. مناسب اولین خودرو.",
    options: ["شیشه دودی", "سنسور عقب", "مولتی‌مدیا", "ریموت", "مه شکن"],
    scores: { drive: 70, design: 74, cabin: 72, value: 90, quality: 71 }
  },
  {
    id: "c13", type: "car", brand: "بهمن", brandId: "bahman", model: "فیدلیتی پرایم", trim: "۵ نفره",
    year: 2023, yearFa: 1402, mileage: 98000, price: 3980000000, oldPrice: 4070000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "suv", color: "سفید", interior: "قهوه‌ای",
    city: "تهران", district: "فردوس", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "یک لکه", origin: "چین", installment: false, special: null,
    lifestyle: ["family", "market"],
    img: "images/toyota-land.jpg", photos: 10, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه فردوس",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۱ هفته پیش",
    desc: "فیدلیتی پرایم ۵ نفره، سقف پانوراما، کارشناسی‌شده. قیمت ویژه شعبه.",
    options: ["سقف پانوراما", "صندلی برقی", "دوربین ۳۶۰", "کروز", "ورود بدون کلید"],
    scores: { drive: 77, design: 80, cabin: 86, value: 84, quality: 78 }
  },
  {
    id: "c14", type: "car", brand: "هیوندای", brandId: "hyundai", model: "آزرا گرنجور", trim: "۶ سیلندر",
    year: 2013, yearFa: 1392, mileage: 169000, price: 6140000000, oldPrice: 6290000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "مشکی", interior: "کرم",
    city: "تهران", district: "فرمانیه", cylinders: 6, drive: "دیفرانسیل جلو",
    paint: "چند لکه", origin: "کره", installment: false, special: null,
    lifestyle: ["luxury", "family"],
    img: "images/hero.jpg", photos: 5, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۲ هفته پیش",
    desc: "آزرا ۶ سیلندر فول، سیستم صوتی Lexicon، صندلی‌های عقب برقی. ماشین سالم و جاافتاده.",
    options: ["سانروف", "صندلی عقب برقی", "تهویه چهارگانه", "Lexicon", "کروز"],
    scores: { drive: 82, design: 85, cabin: 92, value: 79, quality: 84 }
  },
  {
    id: "c15", type: "car", brand: "تویوتا", brandId: "toyota", model: "پریوس", trim: "تیپ C",
    year: 2017, yearFa: 1396, mileage: 140000, price: 3990000000, oldPrice: 4290000000,
    gear: "اتوماتیک", fuel: "هیبرید", body: "hatchback", color: "سفید", interior: "خاکستری",
    city: "تهران", district: "فرمانیه", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "ژاپن", installment: false, special: null,
    lifestyle: ["eco", "urban"],
    img: "images/tesla.jpg", photos: 5, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۱ هفته پیش",
    desc: "پریوس تیپ C، باتری هیبرید تست‌شده، مصرف ۳٫۹. ایده‌آل شهر.",
    options: ["هیبرید", "هدآپ", "سنسور پارک", "دوربین عقب", "کروز"],
    scores: { drive: 74, design: 70, cabin: 76, value: 88, quality: 91 }
  },
  {
    id: "c16", type: "car", brand: "بهمن", brandId: "bahman", model: "دیگنیتی پرایم", trim: "پرایم",
    year: 2025, yearFa: 1404, mileage: 5000, price: 4250000000, oldPrice: 4300000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "suv", color: "مشکی", interior: "قرمز",
    city: "تهران", district: "فردوس", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "چین", installment: false, special: null,
    lifestyle: ["luxury", "family", "market"],
    img: "images/toyota-land.jpg", photos: 9, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فردوس",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۱ هفته پیش",
    desc: "دیگنیتی پرایم کم‌کارکرد، گارانتی فعال، سقف پانوراما دو تکه.",
    options: ["سقف پانوراما", "صندلی چرم قرمز", "ADAS", "دوربین ۳۶۰", "شارژر بی‌سیم"],
    scores: { drive: 80, design: 86, cabin: 88, value: 83, quality: 81 }
  },
  {
    id: "c17", type: "car", brand: "بنز", brandId: "mercedes", model: "E230", trim: "W124",
    year: 1992, yearFa: 1371, mileage: 321000, price: 2190000000, oldPrice: 2290000000,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "سبز", interior: "کرم",
    city: "تهران", district: "پاسداران", cylinders: 6, drive: "دیفرانسیل عقب",
    paint: "رنگ کامل", origin: "آلمان", installment: false, special: "classic",
    lifestyle: ["luxury"],
    img: "images/mercedes-e.jpg", photos: 10, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه پریس سنتر",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۱ ماه پیش",
    desc: "W124 کلکسیونی، موتور و گیربکس بازسازی‌شده، داخل فابریک. مناسب علاقه‌مندان کلاسیک.",
    options: ["شیشه برقی", "تهویه اتومات", "سانروف برقی", "صندلی چرم"],
    scores: { drive: 75, design: 93, cabin: 80, value: 85, quality: 88 }
  },
  {
    id: "c18", type: "car", brand: "ب ام و", brandId: "bmw", model: "iX1", trim: "eDrive 25L",
    year: 2025, yearFa: 1404, mileage: 0, price: 9890000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "برقی", body: "crossover", color: "خاکستری", interior: "آبی",
    city: "تهران", district: "فرمانیه", cylinders: 0, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "آلمان", installment: true, special: null,
    lifestyle: ["eco", "urban", "luxury"],
    img: "images/bmw-m5.jpg", photos: 4, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۲ روز پیش",
    desc: "iX1 تمام‌برقی صفر، برد ۴۴۰ کیلومتر، گارانتی باتری ۸ ساله.",
    options: ["اتوپایلوت", "سقف شیشه‌ای", "هارمن کاردن", "شارژ سریع", "صفحه منحنی"],
    scores: { drive: 87, design: 89, cabin: 90, value: 77, quality: 92 }
  },
  {
    id: "c19", type: "car", brand: "هیوندای", brandId: "hyundai", model: "سانتافه", trim: "۴ سیلندر ۴WD",
    year: 2022, yearFa: 1401, mileage: 42000, price: 5990000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "suv", color: "سفید", interior: "مشکی",
    city: "نوشهر", district: "ساحلی", cylinders: 4, drive: "دو دیفرانسیل",
    paint: "بدون رنگ", origin: "کره", installment: false, special: "offroad",
    lifestyle: ["family", "offroad"],
    img: "images/toyota-land.jpg", photos: 8, video: false,
    inspected: true, verified: true, pinned: true, branch: "شعبه نوشهر",
    seller: "صفر چی گالری", sellerType: "نمایشگاه",
    posted: "۲۳ ساعت پیش",
    desc: "سانتافه دو دیفرانسیل، ۷ نفره، مناسب شمال و سفر.",
    options: ["سانروف دوتکه", "۷ نفره", "کروز تطبیقی", "دوربین ۳۶۰", "صندلی تهویه"],
    scores: { drive: 83, design: 84, cabin: 91, value: 82, quality: 86 }
  },
  {
    id: "c20", type: "car", brand: "ایران خودرو", brandId: "ikco", model: "دنا پلاس", trim: "توربو اتومات",
    year: 2024, yearFa: 1403, mileage: 22000, price: 1180000000, oldPrice: null,
    gear: "اتوماتیک", fuel: "بنزینی", body: "sedan", color: "سفید", interior: "مشکی",
    city: "اصفهان", district: "خوابگاه", cylinders: 4, drive: "دیفرانسیل جلو",
    paint: "بدون رنگ", origin: "ایران", installment: true, special: null,
    lifestyle: ["first", "urban", "family"],
    img: "images/peugeot.jpg", photos: 3, video: false,
    inspected: false, verified: true, pinned: false, branch: null,
    seller: "مالک شخصی", sellerType: "شخصی",
    posted: "۶ ساعت پیش",
    desc: "دنا پلاس توربو اتومات، گارانتی باقی‌مانده، بیمه بدنه.",
    options: ["سانروف", "مولتی‌مدیا", "سنسور عقب", "کروز", "آینه تاشو"],
    scores: { drive: 68, design: 70, cabin: 73, value: 91, quality: 69 }
  }
];

SC.motors = [
  {
    id: "m01", type: "motor", brand: "دوکاتی", model: "Panigale V4", year: 2023, yearFa: 1402,
    mileage: 3100, price: 4850000000, oldPrice: 5100000000, gear: "دنده‌ای", fuel: "بنزینی",
    color: "قرمز", city: "تهران", district: "فرمانیه", img: "images/ducati.jpg", photos: 8, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", posted: "دیروز",
    desc: "پانیگاله V4 کم‌کارکرد، سرویس کامل کارخانه، تایرهای نو.",
    cc: 1103, category: "اسپرت"
  },
  {
    id: "m02", type: "motor", brand: "هوندا", model: "CBR 1000RR-R", year: 2022, yearFa: 1401,
    mileage: 8700, price: 3620000000, oldPrice: null, gear: "دنده‌ای", fuel: "بنزینی",
    color: "قرمز", city: "تهران", district: "شریعتی", img: "images/ducati.jpg", photos: 6, video: false,
    inspected: true, verified: true, pinned: false, branch: "شعبه شریعتی",
    seller: "صفر چی گالری", posted: "۳ روز پیش",
    desc: "CBR فایرblade، اگزوز آکراپوویچ، ترکشن کنترل.",
    cc: 1000, category: "اسپرت"
  },
  {
    id: "m03", type: "motor", brand: "یاماها", model: "NMAX 155", year: 2024, yearFa: 1403,
    mileage: 4200, price: 485000000, oldPrice: null, gear: "اتوماتیک", fuel: "بنزینی",
    color: "مشکی", city: "تهران", district: "ونک", img: "images/ducati.jpg", photos: 4, video: false,
    inspected: false, verified: true, pinned: false, branch: null,
    seller: "مالک شخصی", posted: "۵ ساعت پیش",
    desc: "NMAX شهری، کم‌مصرف، مناسب روزانه.",
    cc: 155, category: "اسکوتر"
  },
  {
    id: "m04", type: "motor", brand: "کاوازاکی", model: "Z900", year: 2021, yearFa: 1400,
    mileage: 19000, price: 1980000000, oldPrice: 2100000000, gear: "دنده‌ای", fuel: "بنزینی",
    color: "سبز", city: "شیراز", district: "مرکز", img: "images/ducati.jpg", photos: 5, video: false,
    inspected: true, verified: true, pinned: false, branch: null,
    seller: "مالک شخصی", posted: "۱ هفته پیش",
    desc: "Z900 نیکد، اگزوز اسپرت، بدون رنگ.",
    cc: 948, category: "نیکد"
  },
  {
    id: "m05", type: "motor", brand: "بی‌ام‌و", model: "R 1250 GS", year: 2023, yearFa: 1402,
    mileage: 14500, price: 6200000000, oldPrice: null, gear: "دنده‌ای", fuel: "بنزینی",
    color: "سفید", city: "تهران", district: "پاسداران", img: "images/ducati.jpg", photos: 9, video: true,
    inspected: true, verified: true, pinned: true, branch: "شعبه پریس سنتر",
    seller: "صفر چی گالری", posted: "۲ روز پیش",
    desc: "GS ادونچر، مناسب تور و آفرود، سایدکیس آلومینیوم.",
    cc: 1254, category: "ادونچر"
  },
  {
    id: "m06", type: "motor", brand: "هارلی", model: "Sportster S", year: 2022, yearFa: 1401,
    mileage: 6100, price: 5400000000, oldPrice: null, gear: "دنده‌ای", fuel: "بنزینی",
    color: "مشکی", city: "تهران", district: "فرمانیه", img: "images/ducati.jpg", photos: 7, video: false,
    inspected: true, verified: true, pinned: false, branch: "شعبه فرمانیه",
    seller: "صفر چی گالری", posted: "۴ روز پیش",
    desc: "اسپورتستر S، گشتاور بالا، صدای خاص.",
    cc: 1252, category: "کروزر"
  }
];

SC.heavies = [
  {
    id: "h01", type: "heavy", brand: "ولوو", model: "FH16 750", year: 2021, yearFa: 1400,
    mileage: 210000, price: 18500000000, oldPrice: null, gear: "اتوماتیک", fuel: "دیزلی",
    color: "سفید", city: "تهران", district: "شورآباد", img: "images/pickup.jpg", photos: 8, video: false,
    inspected: true, verified: true, pinned: true, branch: null,
    seller: "بازرگانی سنگین صفر چی", posted: "۲ روز پیش",
    desc: "FH16 سقف بلند، تخت خواب دوتایی، ریتاردر، مناسب بین‌المللی.",
    category: "کشنده"
  },
  {
    id: "h02", type: "heavy", brand: "اسکانیا", model: "R500", year: 2019, yearFa: 1398,
    mileage: 340000, price: 14200000000, oldPrice: 14900000000, gear: "اتوماتیک", fuel: "دیزلی",
    color: "آبی", city: "اصفهان", district: "صنعتی", img: "images/pickup.jpg", photos: 6, video: false,
    inspected: true, verified: true, pinned: false, branch: null,
    seller: "مالک شخصی", posted: "۱ هفته پیش",
    desc: "اسکانیا R500، سرویس کامل، لاستیک ۸۰ درصد.",
    category: "کشنده"
  },
  {
    id: "h03", type: "heavy", brand: "بنز", model: "آکسور 1843", year: 2016, yearFa: 1395,
    mileage: 480000, price: 8900000000, oldPrice: null, gear: "دنده‌ای", fuel: "دیزلی",
    color: "سفید", city: "تبریز", district: "جاده قدیم", img: "images/pickup.jpg", photos: 5, video: false,
    inspected: false, verified: true, pinned: false, branch: null,
    seller: "شرکت حمل", posted: "۳ روز پیش",
    desc: "آکسور سالم، موتور پلمپ، مناسب بار داخلی.",
    category: "کشنده"
  },
  {
    id: "h04", type: "heavy", brand: "ایسوزو", model: "NPR 75", year: 2023, yearFa: 1402,
    mileage: 45000, price: 4200000000, oldPrice: null, gear: "دنده‌ای", fuel: "دیزلی",
    color: "سفید", city: "تهران", district: "خاوران", img: "images/pickup.jpg", photos: 4, video: false,
    inspected: true, verified: true, pinned: false, branch: null,
    seller: "نمایندگی", posted: "۵ ساعت پیش",
    desc: "کامیونت ایسوزو اتاق مسقف، مناسب توزیع شهری.",
    category: "کامیونت"
  }
];

SC.prices = [
  { brand: "بنز", model: "E200", year: 2024, market: 11800000000, factory: 10900000000, dealer: 11400000000, change: 1.2 },
  { brand: "بنز", model: "S580 میباخ", year: 2024, market: 42800000000, factory: 0, dealer: 43500000000, change: -0.8 },
  { brand: "ب ام و", model: "۵۳۰i", year: 2024, market: 18600000000, factory: 0, dealer: 19100000000, change: 0.4 },
  { brand: "ب ام و", model: "X5 40i", year: 2023, market: 22400000000, factory: 0, dealer: 22900000000, change: -1.1 },
  { brand: "تویوتا", model: "لندکروز ۳۰۰", year: 2024, market: 19800000000, factory: 0, dealer: 20400000000, change: 2.1 },
  { brand: "تویوتا", model: "کمری هیبرید", year: 2025, market: 15200000000, factory: 0, dealer: 15600000000, change: 0.6 },
  { brand: "تویوتا", model: "پریوس", year: 2017, market: 4100000000, factory: 0, dealer: 0, change: -1.4 },
  { brand: "هیوندای", model: "سوناتا ۱٫۵", year: 2025, market: 9700000000, factory: 0, dealer: 9900000000, change: 0.0 },
  { brand: "هیوندای", model: "سانتافه", year: 2022, market: 6100000000, factory: 0, dealer: 0, change: -0.5 },
  { brand: "پژو", model: "۲۰۷ اتومات", year: 1403, market: 1180000000, factory: 1120000000, dealer: 1150000000, change: 1.8 },
  { brand: "پژو", model: "۲۰۰۸", year: 1397, market: 3250000000, factory: 0, dealer: 0, change: -0.9 },
  { brand: "ایران خودرو", model: "دنا پلاس توربو", year: 1404, market: 1240000000, factory: 1185000000, dealer: 1210000000, change: 0.7 },
  { brand: "ایران خودرو", model: "تارا اتومات", year: 1404, market: 1080000000, factory: 1020000000, dealer: 1050000000, change: 0.3 },
  { brand: "سایپا", model: "شاهین پلاس", year: 1404, market: 890000000, factory: 845000000, dealer: 870000000, change: 1.1 },
  { brand: "فونیکس", model: "تیگو ۷ پرو", year: 1403, market: 4380000000, factory: 4190000000, dealer: 4290000000, change: -0.4 },
  { brand: "بهمن", model: "فیدلیتی پرایم", year: 1403, market: 4120000000, factory: 3980000000, dealer: 4050000000, change: 0.2 },
  { brand: "بهمن", model: "دیگنیتی پرایم", year: 1404, market: 4280000000, factory: 4150000000, dealer: 4220000000, change: -0.3 },
  { brand: "کی ام سی", model: "T8", year: 1403, market: 3810000000, factory: 3650000000, dealer: 3740000000, change: -1.6 },
  { brand: "تسلا", model: "Model S Plaid", year: 2024, market: 22400000000, factory: 0, dealer: 23100000000, change: 0.9 },
  { brand: "پورشه", model: "۹۱۱ Carrera S", year: 2022, market: 39500000000, factory: 0, dealer: 40200000000, change: -0.6 }
];

SC.specs = [
  {
    id: "s1", brand: "بنز", model: "S580 میباخ", year: 2024,
    engine: "۴.۰ لیتر V8 توئین‌توربو + هیبرید ملایم", power: "۴۹۶ اسب", torque: "۷۰۰ نیوتن",
    acc: "۴.۸ ثانیه", top: "۲۵۰", fuelCons: "۱۰.۲", tank: "۷۶",
    dim: "۵۴۶۹ × ۱۹۲۱ × ۱۵۱۰", weight: "۲۳۵۰", seats: 4, airbags: 12,
    scores: { drive: 96, design: 98, cabin: 99, value: 78, quality: 97 },
    img: "images/hero.jpg"
  },
  {
    id: "s2", brand: "ب ام و", model: "M5 Competition", year: 2023,
    engine: "۴.۴ لیتر V8 توئین‌توربو", power: "۶۲۵ اسب", torque: "۷۵۰ نیوتن",
    acc: "۳.۳ ثانیه", top: "۳۰۵", fuelCons: "۱۲.۸", tank: "۶۸",
    dim: "۴۹۸۳ × ۱۹۰۳ × ۱۴۶۹", weight: "۱۹۷۰", seats: 5, airbags: 8,
    scores: { drive: 99, design: 94, cabin: 90, value: 72, quality: 95 },
    img: "images/bmw-m5.jpg"
  },
  {
    id: "s3", brand: "پورشه", model: "۹۱۱ Carrera S", year: 2022,
    engine: "۳.۰ لیتر ۶ سیلندر تخت توئین‌توربو", power: "۴۵۰ اسب", torque: "۵۳۰ نیوتن",
    acc: "۳.۵ ثانیه", top: "۳۰۸", fuelCons: "۱۰.۱", tank: "۶۴",
    dim: "۴۵۱۹ × ۱۸۵۲ × ۱۳۰۰", weight: "۱۵۱۵", seats: 4, airbags: 6,
    scores: { drive: 100, design: 99, cabin: 88, value: 70, quality: 98 },
    img: "images/porsche.jpg"
  },
  {
    id: "s4", brand: "تویوتا", model: "لندکروز ۳۰۰", year: 2023,
    engine: "۳.۵ لیتر V6 توئین‌توربو", power: "۴۱۵ اسب", torque: "۶۵۰ نیوتن",
    acc: "۶.۷ ثانیه", top: "۲۱۰", fuelCons: "۱۲.۱", tank: "۱۱۰",
    dim: "۴۹۵۰ × ۱۹۸۰ × ۱۹۴۵", weight: "۲۶۳۰", seats: 7, airbags: 10,
    scores: { drive: 92, design: 88, cabin: 94, value: 82, quality: 96 },
    img: "images/toyota-land.jpg"
  },
  {
    id: "s5", brand: "تسلا", model: "Model S Plaid", year: 2024,
    engine: "سه موتور الکتریکی", power: "۱۰۲۰ اسب", torque: "۱۴۲۰ نیوتن",
    acc: "۲.۱ ثانیه", top: "۳۲۲", fuelCons: "۰", tank: "—",
    dim: "۵۰۲۱ × ۱۹۸۷ × ۱۴۳۱", weight: "۲۱۶۲", seats: 5, airbags: 8,
    scores: { drive: 98, design: 91, cabin: 93, value: 76, quality: 90 },
    img: "images/tesla.jpg"
  },
  {
    id: "s6", brand: "پژو", model: "۲۰۰۸", year: 2018,
    engine: "۱.۶ لیتر توربو", power: "۱۶۵ اسب", torque: "۲۴۰ نیوتن",
    acc: "۸.۵ ثانیه", top: "۲۰۷", fuelCons: "۶.۵", tank: "۵۰",
    dim: "۴۳۰۰ × ۱۷۷۰ × ۱۵۵۰", weight: "۱۲۷۵", seats: 5, airbags: 6,
    scores: { drive: 78, design: 84, cabin: 80, value: 86, quality: 77 },
    img: "images/peugeot.jpg"
  }
];

SC.branches = [
  {
    id: "b1", name: "گالری فرمانیه", city: "تهران",
    addr: "تقاطع فرمانیه و پاسداران — مجتمع A1، ورودی پارکینگ بن‌بست ترنج",
    tel: "۰۲۱-۹۱۰۰۹۰۰۰", ext: "۹۰۱", hours: "شنبه تا پنجشنبه ۹ تا ۲۰",
    services: ["کارشناسی حضوری", "تست درایو", "ثبت آگهی ویژه", "معاوضه"]
  },
  {
    id: "b2", name: "پریس سنتر پاسداران", city: "تهران",
    addr: "خیابان پاسداران، گلستان یکم، مجتمع پریس سنتر",
    tel: "۰۲۱-۹۱۰۰۹۰۰۰", ext: "۹۰۲", hours: "شنبه تا پنجشنبه ۹ تا ۲۰",
    services: ["کارشناسی حضوری", "کلاسیک", "لوکس وارداتی"]
  },
  {
    id: "b3", name: "نمایشگاه شریعتی", city: "تهران",
    addr: "شریعتی، بالاتر از چهارراه مطهری، نبش کوچه ناز",
    tel: "۰۲۱-۹۱۰۰۹۰۰۰", ext: "۹۰۳", hours: "شنبه تا پنجشنبه ۹ تا ۱۹",
    services: ["کارشناسی", "مشاوره خرید", "ثبت آگهی فوری"]
  },
  {
    id: "b4", name: "آیریک سنتر فردوس", city: "تهران",
    addr: "بلوار فردوس شرق، نبش وفاآذر، طبقه همکف و پارکینگ",
    tel: "۰۲۱-۹۱۰۰۹۰۰۰", ext: "۹۰۴", hours: "شنبه تا پنجشنبه ۹ تا ۲۰",
    services: ["کارشناسی", "اقساط", "معاوضه"]
  },
  {
    id: "b5", name: "گالری نوشهر", city: "مازندران",
    addr: "جاده ساحلی نوشهر به رویان، قبل از وازیوار، روبه‌روی ویلاشهر",
    tel: "۰۱۱-۹۱۰۰۹۰۰۰", ext: "۹۰۵", hours: "همه‌روزه ۹ تا ۱۹",
    services: ["کارشناسی", "شمال‌نشین", "تست درایو ساحلی"]
  },
  {
    id: "b6", name: "ایرانمال", city: "تهران",
    addr: "اتوبان شهید خرازی، ایرانمال، طبقه G3، واحد گالری صفر چی",
    tel: "۰۲۱-۹۱۰۰۹۰۰۰", ext: "۹۰۶", hours: "هر روز ۱۰ تا ۲۲",
    services: ["لوکس", "وارداتی", "مشاوره VIP"]
  }
];

SC.stories = [
  { id: 1, branch: "فرمانیه", title: "میباخ تازه رسید", img: "images/hero.jpg" },
  { id: 2, branch: "پاسداران", title: "M5 امشب", img: "images/bmw-m5.jpg" },
  { id: 3, branch: "شریعتی", title: "پورشه سبز", img: "images/porsche.jpg" },
  { id: 4, branch: "فردوس", title: "لندکروز سفید", img: "images/toyota-land.jpg" },
  { id: 5, branch: "نوشهر", title: "سانتافه ساحلی", img: "images/toyota-land.jpg" },
  { id: 6, branch: "ایرانمال", title: "پلاید صفر", img: "images/tesla.jpg" }
];

SC.blog = [
  {
    id: "bl1",
    title: "آیا کارشناسی خودرو قبل از خرید ضروری است؟",
    cat: "راهنمای خرید",
    date: "۱۸ مرداد ۱۴۰۵",
    excerpt: "کارشناسی بدنه و فنی پیش از معامله، وضعیت واقعی خودرو را مشخص می‌کند و جلوی اختلاف قیمت میلیونی را می‌گیرد.",
    body: "کارشناسی خودرو پیش از خرید یا فروش، وضعیت فنی و بدنه را مشخص کرده و زمینه یک معامله منصفانه را فراهم می‌کند. در صفر چی هر خودرو شعبه با برگه کارشناسی استاندارد عرضه می‌شود: ضخامت رنگ، شاسی، موتور، گیربکس، آپشن‌ها و تست دیاگ. بهترین زمان کارشناسی، بعد از توافق اولیه روی قیمت و قبل از انتقال سند است. اگر فروشنده از کارشناسی امتناع کند، معمولاً نشانهٔ پنهان‌کاری است.",
    img: "images/hero.jpg"
  },
  {
    id: "bl2",
    title: "راهنمای جامع خرید خودروهای کلاسیک و نوستالژیک",
    cat: "کلاسیک",
    date: "۱۲ مرداد ۱۴۰۵",
    excerpt: "دنیای کلاسیک ترکیبی از هنر، مهندسی و نوستالژی است؛ اما خرید آن برخلاف خودرو مدرن به بررسی دقیق‌تری نیاز دارد.",
    body: "برای خرید کلاسیک سه اصل را جدی بگیرید: اصالت قطعات، تاریخچه سرویس و وضعیت شاسی. خودروهایی مثل بنز W124 یا پژو ۴۰۵ GLX دوگانه‌سوز کلکسیونی اگر بازسازی اصولی شده باشند ارزش نگهداری دارند. بودجهٔ نگهداری سالانه را حداقل ۸ تا ۱۲ درصد قیمت خرید در نظر بگیرید.",
    img: "images/mercedes-e.jpg"
  },
  {
    id: "bl3",
    title: "ماشین صفر بخریم یا کارکرده؟",
    cat: "تصمیم‌گیری",
    date: "۵ مرداد ۱۴۰۵",
    excerpt: "با ماه‌ها پس‌انداز، بالاخره زمان گرفتن کلید رسیده. اما صفر همیشه انتخاب درست نیست.",
    body: "خودرو صفر گارانتی و آرامش خاطر می‌دهد اما در سال اول افت قیمت بیشتری دارد. کارکردهٔ کم‌کارکرد کارشناسی‌شده، اغلب ارزش خرید بالاتری دارد. اگر بودجه محدود است، یک کارکردهٔ بدون رنگ با سرویس منظم بهتر از صفرِ اقتصادیِ پراپشنِ ضعیف است.",
    img: "images/tesla.jpg"
  },
  {
    id: "bl4",
    title: "بهترین ماشین‌های آفرود در ایران",
    cat: "آفرود",
    date: "۲۸ تیر ۱۴۰۵",
    excerpt: "انتخاب خودروی مناسب، مهم‌ترین شرط برای تجربه‌ای امن در مسیرهای خاکی است.",
    body: "لندکروز ۳۰۰، پرادو، هایلوکس، کی‌ام‌سی T8 و سانتافه ۴WD گزینه‌های رایج بازار ایران هستند. برای آفرود جدی شاسی مستقل و قفل دیفرانسیل مهم‌تر از ظاهر عضلانی است. قبل از خرید، زیر خودرو را برای زنگ‌زدگی شاسی بررسی کنید؛ به‌خصوص خودروهای شمال‌دیده.",
    img: "images/toyota-land.jpg"
  }
];

SC.services = [
  { id: "fine", title: "استعلام خلافی", desc: "خلافی خودرو و موتور با پلاک", icon: "shield" },
  { id: "inspect", title: "کارشناسی تخصصی", desc: "بدنه، فنی، آپشن و قیمت‌گذاری", icon: "scan" },
  { id: "alert", title: "گوش‌به‌زنگ", desc: "اعلان لحظه‌ای آگهی مطابق فیلتر شما", icon: "bell" },
  { id: "compare", title: "مقایسه خودرو", desc: "تا سه مدل روبه‌رو، امتیاز و مشخصات", icon: "cmp" },
  { id: "estimate", title: "تخمین قیمت", desc: "نقشه بدنه: رنگ، خوردگی، تعویض", icon: "chart" },
  { id: "price", title: "قیمت روز", desc: "بازار، کارخانه و نمایندگی", icon: "chart" },
  { id: "loan", title: "خرید اقساطی", desc: "همکاری با بانک و لیزینگ معتبر", icon: "card" },
  { id: "custom", title: "خرید سفارشی", desc: "نبود؟ برات پیدا می‌کنیم", icon: "search" },
  { id: "trade", title: "معاوضه", desc: "خودرویتان را با مدل بالاتر عوض کنید", icon: "swap" }
];

SC.garageBuilds = [
  {
    id: "g0", name: "M4 Competition", brand: "ب ام و", year: "۲۰۲۱",
    img: "images/garage/m4-q.jpg", hex: "#8a8d92",
    frames: [
      "images/garage/m4-front.jpg",
      "images/garage/m4-q.jpg",
      "images/garage/m4-side.jpg",
      "images/garage/m4-rear.jpg",
      "images/garage/m4-rear-r.jpg",
      "images/garage/m4-side-r.jpg",
      "images/garage/m4-q-r.jpg"
    ],
    stance: "کوپه", mods: ["گریل عمودی", "رینگ مشکی M", "کالیپر قرمز", "اگزوز چهارگانه"],
    views: "۳۶۰°"
  },
  {
    id: "g1", name: "پاترول", brand: "نیسان", year: "۲۰۲۶",
    img: "images/garage/pat-q.jpg", hex: "#4a4d52",
    frames: [
      "images/garage/pat-front.jpg",
      "images/garage/pat-q.jpg",
      "images/garage/pat-side.jpg",
      "images/garage/pat-rear.jpg",
      "images/garage/pat-rear-r.jpg",
      "images/garage/pat-side-r.jpg",
      "images/garage/pat-q-r.jpg"
    ],
    stance: "فلگ‌شیپ", mods: ["V۶ توئین‌توربو", "سیستم ۴×۴", "کابین چرم", "سقف پانورامیک"],
    views: "۳۶۰°"
  },
  {
    id: "g2", name: "لندکروز ۳۰۰", brand: "تویوتا", year: "۲۰۲۶",
    img: "images/garage/lc-q.jpg", hex: "#f3efe8",
    frames: [
      "images/garage/lc-q.jpg",
      "images/garage/lc-q-r.jpg"
    ],
    stance: "لوکس آفرود", mods: ["VX", "مولتی‌ترِین", "صندلی تهویه", "دوربین ۳۶۰"],
    views: "۳۶۰°"
  }
];
