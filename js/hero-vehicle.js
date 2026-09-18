/**
 * Eplakcar - Master Ultra-Realistic Hero Vehicle Stage
 *  - 100% Identical studio background with glowing Eplakcar logo on the back wall
 *  - 3 Authentic Vehicles on the central turntable:
 *      * Car: Porsche 911 GT3 RS
 *      * Motor: Honda CB1300 Super Four (White-Red)
 *      * Truck: 2024 Scania V8 770S Cab-Over Heavy Tractor (Teal & Chrome)
 *  - Headlight optics strictly and exclusively inside physical glass lenses
 *  - Guaranteed Image-First Headlights: Image completely renders and displays before any high-beam flash
 *  - Interactive Cockpit Speedometer / Gauge Cluster (صفحه کیلومتر و دور موتور هوشمند)
 *  - Authentic Engine Starter Sequence (استارت کرانک -> روشن شدن -> آیدل و کاتاف)
 */

(function (window) {
  'use strict';

  const VEHICLE_CONFIGS = {
    car: {
      id: 'car',
      tabLabel: 'خودرو',
      name: 'پورشه 911 GT3 RS مدل ۲۰۲۴',
      category: 'سوپراسپرت‌های صفر و کلکسیونی',
      specs: 'موتور ۴ لیتری تخت تنفس‌طبیعی · ۵۲۵ اسب بخار · ۹,۰۰۰ دور',
      image: 'images/car-hero.jpg?v=35',
      audioBtnLabel: 'استارت پورشه 911',
      idleRpm: 800,
      revRpm: 6800,
      maxRpm: 9200,
      headlights: [
        { id: 'proj-l', x: 34.45, y: 53.78, w: 20, h: 20, isProjector: true },
        { id: 'proj-r', x: 49.64, y: 53.65, w: 20, h: 20, isProjector: true },
        { id: 'strip-l', x: 32.32, y: 61.20, w: 16, h: 5, isStrip: true },
        { id: 'strip-r', x: 45.31, y: 61.98, w: 18, h: 5, isStrip: true }
      ],
      groundGlow: { x: 42.0, y: 72.0, w: 36, h: 16 },
      exhaust: {
        x: 67.5,
        y: 64.5,
        angleDeg: 15,
        speed: 2.0,
        size: 5,
        growRate: 0.65,
        maxAge: 60,
        buoyancy: 0.04
      },
      searchFields: {
        qPlaceholder: 'برند یا مدل خودرو (پورشه، بنز، ب‌ام‌و، فراری…)',
        f1Label: 'وضعیت',
        f1Name: 'status',
        f1Options: [
          { val: '', label: 'همه وضعیت‌ها' },
          { val: 'zero', label: 'صفر کیلومتر' },
          { val: 'used', label: 'کارکرده کارشناسی‌شده' }
        ],
        f2Label: 'گیربکس',
        f2Name: 'gear',
        f2Options: [
          { val: '', label: 'همه' },
          { val: 'اتوماتیک', label: 'اتوماتیک PDK' },
          { val: 'دنده‌ای', label: 'دستی ۶ سرعته' }
        ],
        f3Label: 'بودجه تا',
        f3Name: 'priceMax',
        f3Options: [
          { val: '', label: 'آزاد' },
          { val: '2000000000', label: 'تا ۲ میلیارد' },
          { val: '5000000000', label: 'تا ۵ میلیارد' },
          { val: '12000000000', label: 'تا ۱۲ میلیارد' },
          { val: '25000000000', label: 'تا ۲۵ میلیارد' }
        ]
      }
    },

    motor: {
      id: 'motor',
      tabLabel: 'موتور',
      name: 'هوندا CB1300 Super Four مدل ۲۰۲۴ (سفید-قرمز)',
      category: 'موتورسیکلت‌های سنگین استریت و ۴ سیلندر',
      specs: 'انجین ۱۲۸۴ سی‌سی ۴ سیلندر خطی · ۱۱۴ اسب بخار · گشتاور ۱۱۹ نیوتن‌متر',
      image: 'images/motor-hero.jpg?v=35',
      audioBtnLabel: 'استارت هوندا CB1300',
      idleRpm: 1000,
      revRpm: 7800,
      maxRpm: 9600,
      headlights: [
        { id: 'cb-headlight', x: 60.16, y: 38.02, w: 32, h: 32, isRound: true }
      ],
      groundGlow: { x: 60.16, y: 65.0, w: 26, h: 14 },
      exhaust: {
        x: 37.3,
        y: 50.8,
        angleDeg: 215,
        speed: 2.8,
        size: 4.8,
        growRate: 0.6,
        maxAge: 55,
        buoyancy: 0.045
      },
      searchFields: {
        qPlaceholder: 'برند یا مدل موتور (هوندا CB1300، یاماها، کاوازاکی، وسپا…)',
        f1Label: 'حجم انجین',
        f1Name: 'volume',
        f1Options: [
          { val: '', label: 'همه حجم‌ها' },
          { val: '250', label: 'تا ۲۵۰ سی‌سی (پلاک ملی)' },
          { val: '600', label: '۳۰۰ تا ۶۵۰ سی‌سی' },
          { val: '1000', label: '۱۰۰۰ سی‌سی به بالا (CB1300)' }
        ],
        f2Label: 'کلاس موتور',
        f2Name: 'class',
        f2Options: [
          { val: '', label: 'همه کلاس‌ها' },
          { val: 'naked', label: 'استریت و نیکد (CB1300)' },
          { val: 'superbike', label: 'ریس و اسپرت' },
          { val: 'touring', label: 'تورینگ و مسافرتی' },
          { val: 'scooter', label: 'اسکوتر شهری' }
        ],
        f3Label: 'بودجه تا',
        f3Name: 'priceMax',
        f3Options: [
          { val: '', label: 'آزاد' },
          { val: '500000000', label: 'تا ۵۰۰ میلیون' },
          { val: '1000000000', label: 'تا ۱ میلیارد' },
          { val: '2000000000', label: 'تا ۲ میلیارد' },
          { val: '4000000000', label: 'تا ۴ میلیارد' }
        ]
      }
    },

    heavy: {
      id: 'heavy',
      tabLabel: 'کامیون',
      name: 'کشنده اسکانیا V8 770S سوپر لاین ۲۰۲۴',
      category: 'کشنده‌های فوق‌مدرن اروپایی',
      specs: 'V8 توربودیزل ۱۶٫۴ لیتری · ۷۷۰ اسب بخار · ۳۷۰۰ نیوتن‌متر',
      image: 'images/truck-hero.jpg?v=35',
      audioBtnLabel: 'استارت دیزل اسکانیا',
      idleRpm: 600,
      revRpm: 2100,
      maxRpm: 2500,
      headlights: [
        { id: 'bump-l', x: 34.61, y: 59.10, w: 26, h: 13, isProjector: true },
        { id: 'bump-r', x: 47.18, y: 59.89, w: 28, h: 13, isProjector: true }
      ],
      groundGlow: { x: 41.0, y: 73.5, w: 34, h: 16 },
      exhaust: {
        x: 58.24,
        y: 14.97,
        angleDeg: 260,
        speed: 3.0,
        size: 7,
        growRate: 0.9,
        maxAge: 80,
        buoyancy: 0.08
      },
      searchFields: {
        qPlaceholder: 'برند یا مدل کشنده (اسکانیا، ولوو FH، مرسدس آکتروس، داف…)',
        f1Label: 'کاربری',
        f1Name: 'usage',
        f1Options: [
          { val: '', label: 'همه کاربری‌ها' },
          { val: 'tractor', label: 'کشنده جاده‌ای' },
          { val: 'tipper', label: 'کمپرسی' },
          { val: 'cargo', label: 'باری و چادری' }
        ],
        f2Label: 'قدرت موتور',
        f2Name: 'power',
        f2Options: [
          { val: '', label: 'همه قدرت‌ها' },
          { val: '450', label: '۴۵۰ تا ۵۰۰ اسب' },
          { val: '540', label: '۵۰۰ تا ۶۰۰ اسب' },
          { val: '700', label: 'بالای ۶۵۰ اسب بخار (V8)' }
        ],
        f3Label: 'بودجه تا',
        f3Name: 'priceMax',
        f3Options: [
          { val: '', label: 'آزاد' },
          { val: '5000000000', label: 'تا ۵ میلیارد' },
          { val: '10000000000', label: 'تا ۱۰ میلیارد' },
          { val: '18000000000', label: 'تا ۱۸ میلیارد' },
          { val: '28000000000', label: 'تا ۲۸ میلیارد' }
        ]
      }
    }
  };

  /**
   * Pre-rendered Realistic Volumetric Smoke Sprite
   */
  let cachedSmokeCanvas = null;
  function getSmokeSprite() {
    if (cachedSmokeCanvas) return cachedSmokeCanvas;
    const size = 64;
    const can = document.createElement('canvas');
    can.width = size;
    can.height = size;
    const ctx = can.getContext('2d');

    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(235, 245, 255, 0.48)');
    grad.addColorStop(0.35, 'rgba(180, 205, 220, 0.28)');
    grad.addColorStop(0.7, 'rgba(120, 150, 170, 0.10)');
    grad.addColorStop(1, 'rgba(100, 130, 150, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    cachedSmokeCanvas = can;
    return can;
  }

  /**
   * Smoke Particle
   */
  class SmokeParticle {
    constructor(emitX, emitY, exhaustCfg, isBurst = false) {
      this.x = emitX + (Math.random() - 0.5) * 4;
      this.y = emitY + (Math.random() - 0.5) * 4;
      const angleRad = (exhaustCfg.angleDeg + (Math.random() - 0.5) * 25) * (Math.PI / 180);
      const spd = exhaustCfg.speed * (isBurst ? (1.5 + Math.random() * 0.9) : (0.8 + Math.random() * 0.5));
      this.vx = Math.cos(angleRad) * spd;
      this.vy = Math.sin(angleRad) * spd;
      this.size = exhaustCfg.size * (isBurst ? 1.4 : 1.0) * (0.8 + Math.random() * 0.4);
      this.growRate = exhaustCfg.growRate * (0.8 + Math.random() * 0.5);
      this.age = 0;
      this.maxAge = exhaustCfg.maxAge * (0.85 + Math.random() * 0.4);
      this.alpha = isBurst ? 0.65 : 0.42;
      this.buoyancy = exhaustCfg.buoyancy || 0.04;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
    }

    update() {
      this.age++;
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= this.buoyancy;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.size += this.growRate;
      this.rot += this.rotSpeed;

      const progress = this.age / this.maxAge;
      if (progress < 0.2) {
        this.currentAlpha = this.alpha * (progress / 0.2);
      } else {
        this.currentAlpha = this.alpha * (1 - (progress - 0.2) / 0.8);
      }
    }

    draw(ctx, sprite) {
      if (this.currentAlpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.currentAlpha));
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.drawImage(sprite, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }

    isDead() {
      return this.age >= this.maxAge || this.alpha <= 0.01;
    }
  }

  /**
   * Authentic Vehicle Audio Engine with Starter Ignition Support
   */
  class VehicleAudioEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.activeType = 'car';
      this.masterGain = null;
      this.idleGain = null;
      this.revGain = null;
      this.idleSource = null;
      this.revSource = null;
      this.starterSource = null;
      this.limiterPulse = false;
      this.decodedBuffers = {};
      this.currentGeneration = 0;
      this.baseRates = {
        car: 1.0,
        motor: 1.0,
        heavy: 1.0
      };
      this.maxRates = {
        car: 1.75,
        motor: 1.85,
        heavy: 2.2
      };
    }

    init() {
      if (this.ctx) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
      } catch (_) {}
    }

    async _getBuffer(key) {
      if (this.decodedBuffers[key]) return this.decodedBuffers[key];
      if (!this.ctx) return null;

      try {
        const res = await fetch(`audio/${key}.wav`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arrayBuffer = await res.arrayBuffer();
        const decoded = await new Promise((resolve, reject) => {
          this.ctx.decodeAudioData(arrayBuffer, resolve, reject);
        });
        this.decodedBuffers[key] = decoded;
        return decoded;
      } catch (err) {
        console.warn('Audio fetch/decode error for', key, err);
        return null;
      }
    }

    // Preload all assets in memory for 0ms lag
    preload(type) {
      this.init();
      if (!this.ctx) return;
      const starterKey = type === 'car' ? 'car_start' : (type === 'motor' ? 'motor_start' : 'truck_start');
      const idleKey = type === 'car' ? 'car_idle' : (type === 'motor' ? 'motor_idle' : 'truck_idle');
      const revKey = type === 'car' ? 'car_rev' : (type === 'motor' ? 'motor_rev' : 'truck_rev');
      this._getBuffer(starterKey);
      this._getBuffer(idleKey);
      this._getBuffer(revKey);
    }

    // Authentic Engine Starter Sequence
    async startWithStarter(type, onEngineCaught) {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        try { await this.ctx.resume(); } catch (_) {}
      }

      this.stop();
      this.activeType = type;
      this.isPlaying = true;
      const gen = ++this.currentGeneration;

      const starterKey = type === 'car' ? 'car_start' : (type === 'motor' ? 'motor_start' : 'truck_start');
      const idleKey = type === 'car' ? 'car_idle' : (type === 'motor' ? 'motor_idle' : 'truck_idle');
      const revKey = type === 'car' ? 'car_rev' : (type === 'motor' ? 'motor_rev' : 'truck_rev');

      // Concurrently ensure starter and loop buffers
      const [startBuf, idleBuf, revBuf] = await Promise.all([
        this._getBuffer(starterKey),
        this._getBuffer(idleKey),
        this._getBuffer(revKey)
      ]);

      if (!this.isPlaying || this.currentGeneration !== gen) return;

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.42, now);
      this.masterGain.connect(this.ctx.destination);

      // Play starter cranking audio
      if (startBuf) {
        this.starterSource = this.ctx.createBufferSource();
        this.starterSource.buffer = startBuf;
        this.starterSource.connect(this.masterGain);
        this.starterSource.start(now);
      }

      const starterDuration = startBuf ? startBuf.duration : 2.0;
      // Overlap point where engine catches fire and settles into idle
      const catchDelayMs = Math.max(150, Math.floor((starterDuration - 0.4) * 1000));

      setTimeout(() => {
        if (!this.isPlaying || this.currentGeneration !== gen) return;
        this._startLoopTracks(idleBuf, revBuf, type);
        if (onEngineCaught) onEngineCaught();
      }, catchDelayMs);
    }

    // Direct loop start (for seamless switching while already running)
    async startDirect(type) {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        try { await this.ctx.resume(); } catch (_) {}
      }

      this.stop();
      this.activeType = type;
      this.isPlaying = true;
      const gen = ++this.currentGeneration;

      const idleKey = type === 'car' ? 'car_idle' : (type === 'motor' ? 'motor_idle' : 'truck_idle');
      const revKey = type === 'car' ? 'car_rev' : (type === 'motor' ? 'motor_rev' : 'truck_rev');

      const [idleBuf, revBuf] = await Promise.all([
        this._getBuffer(idleKey),
        this._getBuffer(revKey)
      ]);

      if (!this.isPlaying || this.currentGeneration !== gen) return;

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, now);
      this.masterGain.gain.linearRampToValueAtTime(0.40, now + 0.15);
      this.masterGain.connect(this.ctx.destination);

      this._startLoopTracks(idleBuf, revBuf, type);
    }

    _startLoopTracks(idleBuf, revBuf, type) {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      const baseRate = this.baseRates[type] || 1.0;
      const playTime = this.ctx.currentTime;

      // 1. Idle Combustion Loop
      if (idleBuf) {
        this.idleGain = this.ctx.createGain();
        this.idleGain.gain.setValueAtTime(1.0, playTime);

        this.idleSource = this.ctx.createBufferSource();
        this.idleSource.buffer = idleBuf;
        this.idleSource.loop = true;
        this.idleSource.playbackRate.setValueAtTime(baseRate, playTime);

        this.idleSource.connect(this.idleGain);
        this.idleGain.connect(this.masterGain);
        this.idleSource.start(playTime);
      }

      // 2. Rev / Load Exhaust Roar Loop
      if (revBuf) {
        this.revGain = this.ctx.createGain();
        this.revGain.gain.setValueAtTime(0.001, playTime);

        this.revSource = this.ctx.createBufferSource();
        this.revSource.buffer = revBuf;
        this.revSource.loop = true;
        this.revSource.playbackRate.setValueAtTime(baseRate, playTime);

        this.revSource.connect(this.revGain);
        this.revGain.connect(this.masterGain);
        this.revSource.start(playTime);
      }
    }

    setThrottlePitch(progress, type) {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const base = this.baseRates[type] || 1.0;
      const max = this.maxRates[type] || 2.0;
      const targetRate = base + (max - base) * progress;

      if (this.idleSource) {
        this.idleSource.playbackRate.linearRampToValueAtTime(targetRate, now + 0.05);
      }
      if (this.revSource) {
        this.revSource.playbackRate.linearRampToValueAtTime(targetRate, now + 0.05);
      }

      if (this.idleGain) {
        const ig = Math.max(0.12, 1.0 - progress * 0.88);
        this.idleGain.gain.linearRampToValueAtTime(ig, now + 0.05);
      }
      if (this.revGain) {
        const rg = Math.min(1.0, progress * 1.15);
        this.revGain.gain.linearRampToValueAtTime(rg, now + 0.05);
      }
    }

    triggerLimiterCut(type) {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      this.limiterPulse = !this.limiterPulse;
      const maxRate = this.maxRates[type] || 2.0;

      if (this.limiterPulse) {
        this.masterGain.gain.setValueAtTime(0.08, now);
        if (this.idleSource) this.idleSource.playbackRate.setValueAtTime(maxRate * 0.95, now);
        if (this.revSource) this.revSource.playbackRate.setValueAtTime(maxRate * 0.95, now);
      } else {
        this.masterGain.gain.setValueAtTime(0.46, now);
        if (this.idleSource) this.idleSource.playbackRate.setValueAtTime(maxRate * 1.02, now);
        if (this.revSource) this.revSource.playbackRate.setValueAtTime(maxRate * 1.02, now);
        this._playBackfirePop(type);
      }
    }

    _playBackfirePop(type) {
      if (!this.isPlaying || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        const flt = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(type === 'car' ? 140 : (type === 'motor' ? 240 : 65), now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.055);

        flt.type = 'lowpass';
        flt.frequency.setValueAtTime(type === 'car' ? 520 : (type === 'motor' ? 950 : 220), now);

        popGain.gain.setValueAtTime(0.35, now);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

        osc.connect(flt);
        flt.connect(popGain);
        popGain.connect(this.masterGain || this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      } catch (_) {}
    }

    releaseThrottle(type) {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const base = this.baseRates[type] || 1.0;

      if (this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(0.40, now + 0.25);
      }

      if (this.idleSource) {
        this.idleSource.playbackRate.cancelScheduledValues(now);
        this.idleSource.playbackRate.exponentialRampToValueAtTime(base, now + 0.45);
      }
      if (this.revSource) {
        this.revSource.playbackRate.cancelScheduledValues(now);
        this.revSource.playbackRate.exponentialRampToValueAtTime(base, now + 0.45);
      }
      if (this.idleGain) {
        this.idleGain.gain.cancelScheduledValues(now);
        this.idleGain.gain.linearRampToValueAtTime(1.0, now + 0.45);
      }
      if (this.revGain) {
        this.revGain.gain.cancelScheduledValues(now);
        this.revGain.gain.linearRampToValueAtTime(0.001, now + 0.45);
      }

      if (type === 'heavy') {
        setTimeout(() => {
          this._playAirBrakeHiss();
        }, 120);
      }
    }

    async _playAirBrakeHiss() {
      if (!this.isPlaying || !this.ctx) return;
      try {
        const brakeBuf = await this._getBuffer('truck_brakes');
        if (!brakeBuf || !this.ctx || !this.isPlaying) return;

        const now = this.ctx.currentTime;
        const src = this.ctx.createBufferSource();
        src.buffer = brakeBuf;
        src.playbackRate.setValueAtTime(1.0, now);

        const gn = this.ctx.createGain();
        gn.gain.setValueAtTime(0.40, now);
        gn.gain.exponentialRampToValueAtTime(0.01, now + 0.30);

        src.connect(gn);
        gn.connect(this.masterGain || this.ctx.destination);
        src.start(now);
      } catch (_) {}
    }

    stop() {
      if (!this.isPlaying && !this.idleSource && !this.revSource && !this.starterSource) return;
      this.isPlaying = false;
      this.currentGeneration++;

      try {
        if (this.masterGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.masterGain.gain.cancelScheduledValues(now);
          this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        }
        setTimeout(() => {
          try {
            if (this.starterSource) {
              this.starterSource.stop();
              this.starterSource.disconnect();
              this.starterSource = null;
            }
            if (this.idleSource) {
              this.idleSource.stop();
              this.idleSource.disconnect();
              this.idleSource = null;
            }
            if (this.revSource) {
              this.revSource.stop();
              this.revSource.disconnect();
              this.revSource = null;
            }
          } catch (_) {}
        }, 160);
      } catch (_) {}
    }
  }

  /**
   * Hero Vehicle Controller
   */
  class HeroVehicleController {
    constructor() {
      this.activeType = 'car';
      this.particles = [];
      this.canvas = null;
      this.ctx = null;
      this.animId = null;
      this.isFlashing = false;
      this.isThrottling = false;
      this.throttleProgress = 0;
      this.throttleTimer = null;
      this.limiterTimer = null;
      this.audio = new VehicleAudioEngine();

      // Engine & Gauge State
      this.isEngineRunning = false;
      this.isStarting = false;
      this.isGaugeSweeping = false;
      this.currentRpm = 0;
      this.targetRpm = 0;
      this.currentSpeed = 0;
      this.targetSpeed = 0;

      this.smokeSprite = getSmokeSprite();
      this.cssW = 600;
      this.cssH = 350;
      this._initialized = false;
    }

    init() {
      if (this._initialized) return;
      const container = document.getElementById('heroVehicleStage');
      if (!container) return;
      this._initialized = true;

      this.canvas = document.getElementById('exhaustSmokeCanvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.resizeCanvas();
        window.removeEventListener('resize', this._onResize);
        this._onResize = () => this.resizeCanvas();
        window.addEventListener('resize', this._onResize);
      }

      // Preload audio files
      this.audio.preload('car');
      this.audio.preload('motor');
      this.audio.preload('heavy');

      // Double Flash Button
      const flashBtn = document.getElementById('vehFlashBtn');
      if (flashBtn) {
        flashBtn.onclick = (e) => {
          e.preventDefault();
          this.triggerDoubleFlash();
        };
      }

      // Gas / Throttle Button: Supports Click + PRESS & HOLD FOR REV LIMITER (کاتاف)
      const revBtn = document.getElementById('vehRevBtn');
      if (revBtn) {
        const onStart = (e) => {
          e.preventDefault();
          this.startThrottle();
        };
        const onEnd = (e) => {
          e.preventDefault();
          this.stopThrottle();
        };

        revBtn.onmousedown = onStart;
        revBtn.onmouseup = onEnd;
        revBtn.onmouseleave = (e) => {
          if (this.isThrottling) onEnd(e);
        };
        revBtn.ontouchstart = onStart;
        revBtn.ontouchend = onEnd;
        revBtn.ontouchcancel = (e) => {
          if (this.isThrottling) onEnd(e);
        };
      }

      // Push-to-Start Button
      const audioBtn = document.getElementById('vehAudioBtn');
      if (audioBtn) {
        audioBtn.onclick = (e) => {
          e.preventDefault();
          this.toggleEngineStart(audioBtn);
        };
      }

      // Click vehicle image for headlights double flash
      const stageClickable = document.getElementById('vehInteractiveArea');
      if (stageClickable) {
        stageClickable.onclick = (e) => {
          if (!e.target.closest('button') && !e.target.closest('a')) {
            this.triggerDoubleFlash();
          }
        };
      }

      // Initialize Main Animation & Cluster Render Loop
      if (this.animId) cancelAnimationFrame(this.animId);
      this.startMainLoop();
    }

    resizeCanvas() {
      if (!this.canvas || !this.ctx) return;
      const rect = this.canvas.getBoundingClientRect();
      const w = Math.max(rect.width, 300);
      const h = Math.max(rect.height, 160);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(w * dpr);
      this.canvas.height = Math.floor(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.cssW = w;
      this.cssH = h;
    }

    /**
     * GUARANTEED IMAGE-FIRST VEHICLE SWITCH:
     * 1. Wipes previous headlights completely
     * 2. Pre-decodes new image in RAM
     * 3. Sets image source and awaits double requestAnimationFrame compositor paint
     * 4. Renders headlights in low beam
     * 5. Pauses 350ms so user clearly sees the car on stage
     * 6. Double high-beam flash fires!
     */
    async switchVehicle(type, isInitial = false) {
      if (this.isThrottling) this.stopThrottle();

      const cfg = VEHICLE_CONFIGS[type];
      if (!cfg) return;
      this.activeType = type;

      const img = document.getElementById('vehMainImg');
      const lightsLayer = document.getElementById('vehHeadlightsLayer');
      const groundGlow = document.getElementById('vehGroundGlow');
      const modelNameEl = document.getElementById('vehModelName');
      const specsEl = document.getElementById('vehSpecs');
      const stage = document.getElementById('heroVehicleStage');

      // 1. Immediately wipe previous headlights, glow, and any running flash animation
      if (stage) stage.classList.remove('double-flash-active');
      if (lightsLayer) {
        lightsLayer.innerHTML = '';
        lightsLayer.style.opacity = '0';
      }
      if (groundGlow) groundGlow.style.opacity = '0';

      // 2. Pre-decode the new vehicle image completely in memory before touching the DOM
      const preImg = new Image();
      preImg.src = cfg.image;
      try {
        if (preImg.decode) {
          await preImg.decode();
        } else {
          await new Promise((res) => { preImg.onload = res; preImg.onerror = res; });
        }
      } catch (_) {}

      // Guard if user clicked away to another tab in the meantime
      if (this.activeType !== type) return;

      // 3. Update DOM texts and image
      if (modelNameEl) modelNameEl.textContent = cfg.name;
      if (specsEl) specsEl.textContent = cfg.specs;
      if (img) img.src = cfg.image;

      // 4. Force browser paint cycle to ensure image is 100% visible on screen
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (this.activeType !== type) return;

      // 5. Render headlights & ground glow
      if (lightsLayer) {
        lightsLayer.innerHTML = this.renderHeadlightsHtml(cfg);
        lightsLayer.style.opacity = '1';
      }
      if (groundGlow) {
        groundGlow.style.left = `${cfg.groundGlow.x}%`;
        groundGlow.style.top = `${cfg.groundGlow.y}%`;
        groundGlow.style.width = `${cfg.groundGlow.w}%`;
        groundGlow.style.height = `${cfg.groundGlow.h}%`;
        groundGlow.style.opacity = '1';
      }

      // Update button label
      this.updateAudioButtonUi();

      // If engine was already running, transition audio smoothly
      if (this.isEngineRunning) {
        this.audio.startDirect(type);
        this.targetRpm = cfg.idleRpm;
      } else {
        this.targetRpm = 0;
      }

      this.updateSearchFields(cfg);

      // 6. ONLY AFTER image is visibly rendered and settled: Double Flash
      setTimeout(() => {
        if (this.activeType === type) {
          this.triggerDoubleFlash();
        }
      }, isInitial ? 480 : 340);
    }

    renderHeadlightsHtml(cfg) {
      let html = '';
      cfg.headlights.forEach((hl) => {
        const shapeClass = hl.isStrip ? 'strip-lens' : (hl.isRound ? 'round-lens' : 'projector-lens');
        html += `
          <div class="headlight-lens ${shapeClass}" style="left:${hl.x}%; top:${hl.y}%; width:${hl.w}px; height:${hl.h}px;">
            <div class="lamp-crystal-core"></div>
            <div class="lamp-soft-halo"></div>
          </div>`;
      });
      return html;
    }

    triggerDoubleFlash() {
      if (this.isFlashing) return;
      this.isFlashing = true;

      const stage = document.getElementById('heroVehicleStage');
      if (stage) {
        stage.classList.remove('double-flash-active');
        void stage.offsetWidth;
        stage.classList.add('double-flash-active');
      }

      setTimeout(() => {
        if (stage) stage.classList.remove('double-flash-active');
        this.isFlashing = false;
      }, 580);
    }

    /**
     * Engine Push-to-Start Sequence (استارت پیشرانه)
     */
    async toggleEngineStart(btn) {
      if (this.isStarting) return;

      if (this.isEngineRunning) {
        // Stop Engine
        this.stopEngine();
      } else {
        // Start Engine with authentic starter crank
        await this.startEngineSequence();
      }
    }

    async startEngineSequence() {
      if (this.isStarting || this.isEngineRunning) return;
      this.isStarting = true;
      const cfg = VEHICLE_CONFIGS[this.activeType];

      const btn = document.getElementById('vehAudioBtn');
      const cluster = document.getElementById('vehGaugeCluster');
      if (btn) {
        btn.classList.add('is-starting');
        btn.classList.remove('engine-running');
        const lbl = btn.querySelector('.btn-lbl');
        if (lbl) lbl.textContent = 'در حال استارت...';
      }
      if (cluster) {
        cluster.classList.add('is-running');
      }

      // 1. Cockpit Gauge Sweep (تست عقربه سوییچ)
      this.isGaugeSweeping = true;
      const startTime = performance.now();
      const sweepDuration = 1800; // 1.8s sweep

      const runSweep = (now) => {
        if (!this.isGaugeSweeping) return;
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / sweepDuration);

        if (progress < 0.45) {
          // 0 to Max Redline sweep
          const p = progress / 0.45;
          this.currentRpm = (cfg ? cfg.maxRpm : 9000) * Math.sin(p * Math.PI / 2);
          this.currentSpeed = Math.floor(25 * p);
        } else if (progress < 0.75) {
          // Drop back to 0
          const p = (progress - 0.45) / 0.3;
          this.currentRpm = (cfg ? cfg.maxRpm : 9000) * (1 - p);
          this.currentSpeed = Math.floor(25 * (1 - p));
        } else {
          // Blip to initial idle
          const p = (progress - 0.75) / 0.25;
          this.currentRpm = (cfg ? cfg.idleRpm : 800) * p;
          this.currentSpeed = 0;
        }

        if (progress < 1.0) {
          requestAnimationFrame(runSweep);
        } else {
          this.isGaugeSweeping = false;
        }
      };
      requestAnimationFrame(runSweep);

      // 2. Play Starter Cranking Sound
      await this.audio.startWithStarter(this.activeType, () => {
        // Engine Caught & Running!
        this.isStarting = false;
        this.isEngineRunning = true;
        this.targetRpm = cfg.idleRpm;
        this.targetSpeed = 0;
        this.updateAudioButtonUi();
      });
    }

    stopEngine() {
      this.isEngineRunning = false;
      this.isStarting = false;
      this.isGaugeSweeping = false;
      this.targetRpm = 0;
      this.targetSpeed = 0;

      this.audio.stop();
      this.updateAudioButtonUi();

      const cluster = document.getElementById('vehGaugeCluster');
      if (cluster) {
        cluster.classList.remove('is-running', 'is-revving');
      }
    }

    updateAudioButtonUi() {
      const btn = document.getElementById('vehAudioBtn');
      if (!btn) return;
      const cfg = VEHICLE_CONFIGS[this.activeType];
      const lbl = btn.querySelector('.btn-lbl');

      btn.classList.remove('is-starting');
      if (this.isEngineRunning) {
        btn.classList.add('engine-running');
        if (lbl) lbl.textContent = 'خاموش کردن پیشرانه';
      } else {
        btn.classList.remove('engine-running');
        if (lbl) lbl.textContent = cfg ? cfg.audioBtnLabel : 'استارت پیشرانه';
      }
    }

    // START THROTTLE (گاز دادن و کاتاف)
    async startThrottle() {
      // If engine is not running yet, auto-start first!
      if (!this.isEngineRunning && !this.isStarting) {
        await this.startEngineSequence();
        return;
      }
      if (this.isStarting || !this.isEngineRunning) return;

      this.isThrottling = true;
      this.throttleProgress = 0;

      const cfg = VEHICLE_CONFIGS[this.activeType];
      const stage = document.getElementById('heroVehicleStage');
      const revBtn = document.getElementById('vehRevBtn');
      const cluster = document.getElementById('vehGaugeCluster');

      if (stage) stage.classList.add('vehicle-rev-squat');
      if (revBtn) revBtn.classList.add('throttling-active');
      if (cluster) cluster.classList.add('is-revving');

      const emitBurst = () => {
        if (this.canvas && cfg) {
          const emitX = (cfg.exhaust.x / 100) * this.cssW;
          const emitY = (cfg.exhaust.y / 100) * this.cssH;
          for (let i = 0; i < 4; i++) {
            this.particles.push(new SmokeParticle(emitX, emitY, cfg.exhaust, true));
          }
        }
      };
      emitBurst();

      // Rev-up loop (reaches 100% in ~380ms)
      if (this.throttleTimer) clearInterval(this.throttleTimer);
      this.throttleTimer = setInterval(() => {
        if (!this.isThrottling) return;

        if (this.throttleProgress < 1.0) {
          this.throttleProgress = Math.min(1.0, this.throttleProgress + 0.12);
          this.audio.setThrottlePitch(this.throttleProgress, this.activeType);
          emitBurst();
        } else {
          // Redline Limiter Bounce (کاتاف)!
          if (!this.limiterTimer) {
            this._startLimiterBounce();
          }
        }
      }, 40);
    }

    _startLimiterBounce() {
      const cfg = VEHICLE_CONFIGS[this.activeType];
      const stage = document.getElementById('heroVehicleStage');

      this.limiterTimer = setInterval(() => {
        if (!this.isThrottling) {
          clearInterval(this.limiterTimer);
          this.limiterTimer = null;
          return;
        }

        // Trigger audio limiter cut stutter (کاتاف)
        this.audio.triggerLimiterCut(this.activeType);

        // Rapid limiter smoke puff
        if (this.canvas && cfg) {
          const emitX = (cfg.exhaust.x / 100) * this.cssW;
          const emitY = (cfg.exhaust.y / 100) * this.cssH;
          for (let i = 0; i < 3; i++) {
            this.particles.push(new SmokeParticle(emitX, emitY, cfg.exhaust, true));
          }
        }

        // Micro vibration bounce on stage
        if (stage) {
          stage.classList.toggle('limiter-shake');
        }
      }, 65);
    }

    stopThrottle() {
      if (!this.isThrottling) return;
      this.isThrottling = false;
      this.throttleProgress = 0;

      if (this.throttleTimer) {
        clearInterval(this.throttleTimer);
        this.throttleTimer = null;
      }
      if (this.limiterTimer) {
        clearInterval(this.limiterTimer);
        this.limiterTimer = null;
      }

      const stage = document.getElementById('heroVehicleStage');
      const revBtn = document.getElementById('vehRevBtn');
      const cluster = document.getElementById('vehGaugeCluster');

      if (stage) {
        stage.classList.remove('vehicle-rev-squat', 'limiter-shake');
      }
      if (revBtn) revBtn.classList.remove('throttling-active');
      if (cluster) cluster.classList.remove('is-revving');

      if (this.isEngineRunning) {
        this.audio.releaseThrottle(this.activeType);
      }
    }

    /**
     * Main Animation Loop:
     * - Renders dynamic smoke particles only when engine running
     * - Drives Cockpit Gauge Cluster (عقربه دور موتور، سرعت دیجیتال، دنده، چراغ کاتاف)
     */
    startMainLoop() {
      let frameCount = 0;
      const sprite = this.smokeSprite || getSmokeSprite();

      const needleEl = document.getElementById('clusterNeedle');
      const arcEl = document.getElementById('clusterRpmArc');
      const shiftLightEl = document.getElementById('clusterShiftLight');
      const gearEl = document.getElementById('clusterGear');
      const speedNumEl = document.getElementById('clusterSpeedNum');
      const rpmNumEl = document.getElementById('vehRpmValue');
      const readyIconEl = document.getElementById('clusterReadyIcon');
      const engineIconEl = document.getElementById('clusterEngineIcon');

      const loop = () => {
        this.animId = requestAnimationFrame(loop);
        frameCount++;

        const cfg = VEHICLE_CONFIGS[this.activeType];
        if (!cfg) return;

        // 1. Smoke Canvas rendering (only emits when engine is on)
        if (this.canvas && this.ctx) {
          const cw = this.cssW;
          const ch = this.cssH;
          this.ctx.clearRect(0, 0, cw, ch);

          if (this.isEngineRunning && !this.isThrottling && frameCount % 3 === 0 && this.particles.length < 32) {
            const emitX = (cfg.exhaust.x / 100) * cw;
            const emitY = (cfg.exhaust.y / 100) * ch;
            this.particles.push(new SmokeParticle(emitX, emitY, cfg.exhaust, false));
          }

          for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx, sprite);
            if (p.isDead()) {
              this.particles.splice(i, 1);
            }
          }
        }

        // 2. Cockpit Instrument Cluster Dynamics
        if (!this.isGaugeSweeping) {
          if (this.isEngineRunning) {
            if (this.isThrottling) {
              if (this.throttleProgress >= 0.98) {
                // Cutoff Limiter Jitter (پرش عقربه در کاتاف)
                const jitter = (Math.random() - 0.5) * (cfg.maxRpm * 0.05);
                this.targetRpm = cfg.maxRpm + jitter;
                this.targetSpeed = this.activeType === 'car' ? 118 : (this.activeType === 'motor' ? 95 : 42);
              } else {
                this.targetRpm = cfg.idleRpm + (cfg.revRpm - cfg.idleRpm) * this.throttleProgress;
                this.targetSpeed = (this.activeType === 'car' ? 110 : (this.activeType === 'motor' ? 90 : 40)) * this.throttleProgress;
              }
            } else {
              this.targetRpm = cfg.idleRpm;
              this.targetSpeed = 0;
            }
          } else {
            this.targetRpm = 0;
            this.targetSpeed = 0;
          }

          // Smooth interpolation towards target
          this.currentRpm += (this.targetRpm - this.currentRpm) * 0.20;
          this.currentSpeed += (this.targetSpeed - this.currentSpeed) * 0.18;
        }

        // Cluster calculations
        const maxGaugeRpm = (cfg.maxRpm || 9000) * 1.05;
        const progress = Math.max(0, Math.min(1.0, this.currentRpm / maxGaugeRpm));
        // Dial sweeps from -115 deg to +115 deg (230 total sweep)
        const needleAngle = -115 + (progress * 230);
        const arcOffset = 170 * (1 - progress);

        // Apply to SVG Needle & Arc
        if (needleEl) {
          needleEl.style.transform = `rotate(${needleAngle.toFixed(1)}deg)`;
        }
        if (arcEl) {
          arcEl.style.strokeDashoffset = `${arcOffset.toFixed(1)}`;
        }

        // Shift Light (Flashes when RPM >= 92% of max)
        if (shiftLightEl) {
          if (progress >= 0.92) {
            shiftLightEl.classList.add('active');
          } else {
            shiftLightEl.classList.remove('active');
          }
        }

        // Transmission Gear Indicator
        if (gearEl) {
          if (!this.isEngineRunning && !this.isStarting) {
            gearEl.textContent = 'P';
            gearEl.className = 'cluster-gear';
          } else if (this.isThrottling) {
            gearEl.textContent = '1';
            gearEl.className = 'cluster-gear gear-drive';
          } else {
            gearEl.textContent = 'N';
            gearEl.className = 'cluster-gear gear-n';
          }
        }

        // Digital Speedometer (KM/H)
        if (speedNumEl) {
          const spdVal = Math.round(this.currentSpeed);
          speedNumEl.textContent = spdVal.toLocaleString('fa-IR');
        }

        // Digital RPM Readout
        if (rpmNumEl) {
          const rpmVal = Math.max(0, Math.round(this.currentRpm));
          rpmNumEl.textContent = rpmVal.toLocaleString('fa-IR');
        }

        // Status Icons
        if (readyIconEl) {
          if (this.isEngineRunning) readyIconEl.classList.add('active');
          else readyIconEl.classList.remove('active');
        }
        if (engineIconEl) {
          if (this.isEngineRunning) engineIconEl.classList.add('off');
          else engineIconEl.classList.remove('off');
        }
      };

      loop();
    }

    updateSearchFields(cfg) {
      const form = document.getElementById('heroSearch');
      if (!form) return;
      const sf = cfg.searchFields;
      if (!sf) return;

      const qInp = form.querySelector('input[name="q"]');
      if (qInp) qInp.placeholder = sf.qPlaceholder;

      const f1 = document.getElementById('heroFilter1');
      if (f1) {
        f1.querySelector('label').textContent = sf.f1Label;
        const sel = f1.querySelector('select');
        sel.name = sf.f1Name;
        sel.innerHTML = sf.f1Options.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
      }

      const f2 = document.getElementById('heroFilter2');
      if (f2) {
        f2.querySelector('label').textContent = sf.f2Label;
        const sel = f2.querySelector('select');
        sel.name = sf.f2Name;
        sel.innerHTML = sf.f2Options.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
      }

      const f3 = document.getElementById('heroFilter3');
      if (f3) {
        f3.querySelector('label').textContent = sf.f3Label;
        const sel = f3.querySelector('select');
        sel.name = sf.f3Name;
        sel.innerHTML = sf.f3Options.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
      }

      const submitBtn = form.querySelector('.search-go');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>جستجوی ${cfg.tabLabel}</span>`;
      }
    }

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this.throttleTimer) clearInterval(this.throttleTimer);
      if (this.limiterTimer) clearInterval(this.limiterTimer);
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      if (this.audio) this.audio.stop();
      this.particles = [];
      this._initialized = false;
    }
  }

  window.HeroVehicleController = HeroVehicleController;
})(window);
