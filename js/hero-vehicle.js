/**
 * Eplakcar - Master Ultra-Realistic Hero Vehicle Stage
 *  - 100% Identical studio background with glowing Eplakcar logo on the back wall
 *  - 3 Vibrant cheerful vehicles on the central turntable:
 *      * Car: Vibrant Sunset Orange Porsche 911 GT3 RS
 *      * Motor: Vibrant Rosso Corsa Red Ducati Panigale V4 S
 *      * Truck: 2024 Modern European Scania V8 770S Cab-Over Heavy Tractor (Teal & Chrome)
 *  - Headlight optics strictly and exclusively inside the physical glass lenses
 *  - Separated gas/throttle vs headlights:
 *      * Pressing gas ONLY revs the engine & exhausts smoke (headlights do NOT flash!)
 *      * Press & hold gas (نگه داشتن پدال): revs to redline and hits rev limiter (کاتاف / limiter bounce)!
 *      * Headlights flash double high-beam ONLY when requested (tab switch or flash button)
 *  - Clean, warm, noise-free Web Audio engines (Zero harsh buzz/hiss):
 *      * Car: Smooth throaty Boxer-6 sports car purr with sports limiter bounce
 *      * Motor: Crisp, high-pitched superbike cadence with rapid racing limiter bounce
 *      * Truck: Deep, heavy, soothing low-bass diesel rumble with air brake hiss on release
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
      image: 'images/car-hero.jpg?v=30',
      audioBtnLabel: 'صدای پورشه GT3',
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
      name: 'دوکاتی Panigale V4 S مدل ۲۰۲۴',
      category: 'موتورسیکلت‌های مسابقه‌ای و سوپربایک',
      specs: 'انجین Desmosedici V4 · ۲۱۴ اسب بخار · ۱۴,۵۰۰ دور',
      image: 'images/motor-hero.jpg?v=30',
      audioBtnLabel: 'صدای دوکاتی V4',
      idleRpm: 1350,
      revRpm: 9500,
      maxRpm: 14500,
      headlights: [
        { id: 'nose', x: 60.09, y: 46.61, w: 24, h: 10, isStrip: true }
      ],
      groundGlow: { x: 60.0, y: 68.0, w: 28, h: 14 },
      exhaust: {
        x: 46.0,
        y: 57.5,
        angleDeg: 210,
        speed: 2.6,
        size: 4.5,
        growRate: 0.6,
        maxAge: 55,
        buoyancy: 0.045
      },
      searchFields: {
        qPlaceholder: 'برند یا مدل موتور (دوکاتی، کاوازاکی، یاماها، وسپا…)',
        f1Label: 'حجم انجین',
        f1Name: 'volume',
        f1Options: [
          { val: '', label: 'همه حجم‌ها' },
          { val: '250', label: 'تا ۲۵۰ سی‌سی (پلاک ملی)' },
          { val: '600', label: '۳۰۰ تا ۶۵۰ سی‌سی' },
          { val: '1000', label: '۱۰۰۰ سی‌سی به بالا' }
        ],
        f2Label: 'کلاس موتور',
        f2Name: 'class',
        f2Options: [
          { val: '', label: 'همه کلاس‌ها' },
          { val: 'superbike', label: 'ریس (Superbike)' },
          { val: 'naked', label: 'نیکد و استریت' },
          { val: 'adventure', label: 'ادونچر و تورینگ' },
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
      image: 'images/truck-hero.jpg?v=30',
      audioBtnLabel: 'صدای دیزل اسکانیا',
      idleRpm: 600,
      revRpm: 2100,
      maxRpm: 2500,
      // Strictly the two bumper headlights of the modern Scania
      headlights: [
        { id: 'bump-l', x: 34.61, y: 59.10, w: 26, h: 13, isProjector: true },
        { id: 'bump-r', x: 47.18, y: 59.89, w: 28, h: 13, isProjector: true }
      ],
      groundGlow: { x: 41.0, y: 73.5, w: 34, h: 16 },
      exhaust: {
        x: 58.24,
        y: 14.97, // Top opening of vertical chrome smokestack!
        angleDeg: 260,
        speed: 3.0,
        size: 7,
        growRate: 0.9,
        maxAge: 80,
        buoyancy: 0.08
      },
      searchFields: {
        qPlaceholder: 'برند یا کشنده (اسکانیا، ولوو، اکتروس، داف…)',
        f1Label: 'تیپ کاربری',
        f1Name: 'heavyType',
        f1Options: [
          { val: '', label: 'همه کاربری‌ها' },
          { val: 'tractor_single', label: 'کشنده تک‌محور (4x2)' },
          { val: 'tractor_double', label: 'کشنده جفت‌محور (6x4)' },
          { val: 'dump', label: 'کمپرسی معدنی' },
          { val: 'cargo', label: 'باری و کفی' }
        ],
        f2Label: 'استاندارد موتور',
        f2Name: 'emission',
        f2Options: [
          { val: '', label: 'همه استانداردها' },
          { val: 'euro6', label: 'یورو ۶ (Euro 6)' },
          { val: 'euro5', label: 'یورو ۵ (Euro 5)' }
        ],
        f3Label: 'بودجه تا',
        f3Name: 'priceMax',
        f3Options: [
          { val: '', label: 'آزاد' },
          { val: '5000000000', label: 'تا ۵ میلیارد' },
          { val: '10000000000', label: 'تا ۱۰ میلیارد' },
          { val: '20000000000', label: 'تا ۲۰ میلیارد' },
          { val: '35000000000', label: 'تا ۳۵ میلیارد' }
        ]
      }
    }
  };

  // Pre-render soft smoke sprite once for GPU blitting
  let smokeSprite = null;
  function getSmokeSprite() {
    if (smokeSprite) return smokeSprite;
    const c = document.createElement('canvas');
    const S = 96;
    c.width = S;
    c.height = S;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(240, 245, 252, 0.72)');
    g.addColorStop(0.3, 'rgba(220, 230, 242, 0.42)');
    g.addColorStop(0.7, 'rgba(195, 208, 222, 0.12)');
    g.addColorStop(1, 'rgba(180, 195, 210, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    smokeSprite = c;
    return smokeSprite;
  }

  /**
   * Physics Smoke Particle
   */
  class SmokeParticle {
    constructor(x, y, cfg, isRev) {
      this.x = x + (Math.random() - 0.5) * (isRev ? 8 : 3);
      this.y = y + (Math.random() - 0.5) * (isRev ? 8 : 3);

      const spd = (cfg.speed || 2.4) * (isRev ? 1.7 : 1.0) * (0.85 + Math.random() * 0.3);
      const rad = ((cfg.angleDeg || 0) + (Math.random() - 0.5) * (isRev ? 30 : 16)) * (Math.PI / 180);
      this.vx = Math.cos(rad) * spd;
      this.vy = Math.sin(rad) * spd;

      this.size = (cfg.size || 5) * (isRev ? 1.5 : 1.0) * (0.85 + Math.random() * 0.3);
      this.growRate = (cfg.growRate || 0.8) * (isRev ? 1.3 : 1.0);
      this.alpha = isRev ? 0.6 : 0.36;
      this.initialAlpha = this.alpha;
      this.age = 0;
      this.maxAge = (cfg.maxAge || 60) * (0.85 + Math.random() * 0.3);
      this.buoyancy = cfg.buoyancy || 0.04;
      this.turbulence = (Math.random() - 0.5) * 0.06;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= this.buoyancy;
      this.vx += this.turbulence;
      this.size += this.growRate;
      this.age++;

      const p = this.age / this.maxAge;
      if (p < 0.15) {
        this.alpha = this.initialAlpha * (p / 0.15);
      } else {
        this.alpha = this.initialAlpha * Math.pow(1 - p, 1.35);
      }
    }

    draw(ctx, sprite) {
      if (this.alpha <= 0.01 || this.size <= 0.5) return;
      ctx.globalAlpha = this.alpha;
      const d = this.size * 2;
      ctx.drawImage(sprite, this.x - this.size, this.y - this.size, d, d);
    }

    isDead() {
      return this.age >= this.maxAge || this.alpha <= 0.01;
    }
  }

  /**
   * Authentic Real-Sample Vehicle Audio Engine
   * Utilizes real recorded PCM acoustic waveforms for:
   *  - Car: Real naturally-aspirated high-performance sports engine (idle + full-throttle rev)
   *  - Motor: Real high-cadence racing motorcycle engine (idle + racing rev)
   *  - Truck: Real Scania V8 diesel combustion rumble (idle + heavy load rev + pneumatic air-brake hiss)
   * Real-time dual-track crossfading, dynamic RPM playbackRate scaling, and authentic limiter bounce (کاتاف).
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
      this.limiterPulse = false;
      this.decodedBuffers = {};
      this.currentGeneration = 0; // Guard against rapid async tab switching
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
        let arrayBuffer = null;
        if (window.REAL_VEHICLE_AUDIO_DATA && window.REAL_VEHICLE_AUDIO_DATA[key]) {
          const b64 = window.REAL_VEHICLE_AUDIO_DATA[key];
          const bin = window.atob(b64);
          const len = bin.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
          arrayBuffer = bytes.buffer;
        } else {
          const res = await fetch(`audio/${key}.wav`);
          arrayBuffer = await res.arrayBuffer();
        }

        const decoded = await new Promise((resolve, reject) => {
          this.ctx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
        });
        this.decodedBuffers[key] = decoded;
        return decoded;
      } catch (err) {
        console.warn('Audio decode error for', key, err);
        return null;
      }
    }

    async start(type) {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        try { await this.ctx.resume(); } catch (_) {}
      }

      this.stop();
      this.activeType = type;
      this.isPlaying = true;
      const gen = ++this.currentGeneration;

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(0.38, now + 0.18);
      this.masterGain.connect(this.ctx.destination);

      const idleKey = type === 'car' ? 'car_idle' : (type === 'motor' ? 'motor_idle' : 'truck_idle');
      const revKey = type === 'car' ? 'car_rev' : (type === 'motor' ? 'motor_rev' : 'truck_rev');

      // Preload & decode both idle and rev samples
      const [idleBuf, revBuf] = await Promise.all([
        this._getBuffer(idleKey),
        this._getBuffer(revKey)
      ]);

      // If user switched vehicle or turned off audio while loading, abort
      if (!this.isPlaying || !this.ctx || this.currentGeneration !== gen) return;

      const baseRate = this.baseRates[type] || 1.0;
      const playTime = this.ctx.currentTime;

      // 1. Authentic Idle Combustion Track
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

      // 2. Authentic Rev / Load Exhaust Roar Track
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

    // Set dynamic pitch & crossfade during throttle ramp
    setThrottlePitch(progress, type) {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const base = this.baseRates[type] || 1.0;
      const max = this.maxRates[type] || 3.0;
      const targetRate = base + (max - base) * progress;

      // Smoothly update acoustic playback speed (RPM pitch)
      if (this.idleSource) {
        this.idleSource.playbackRate.linearRampToValueAtTime(targetRate, now + 0.05);
      }
      if (this.revSource) {
        this.revSource.playbackRate.linearRampToValueAtTime(targetRate, now + 0.05);
      }

      // Dynamic crossfade: idle volume softens while open-throttle rev roars
      if (this.idleGain) {
        const ig = Math.max(0.12, 1.0 - progress * 0.88);
        this.idleGain.gain.linearRampToValueAtTime(ig, now + 0.05);
      }
      if (this.revGain) {
        const rg = Math.min(1.0, progress * 1.15);
        this.revGain.gain.linearRampToValueAtTime(rg, now + 0.05);
      }
    }

    // Rev limiter cut stutter (کاتاف واقعی با تپش سوخت و جرقه‌زنی و بک‌فایر)
    triggerLimiterCut(type) {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      this.limiterPulse = !this.limiterPulse;
      const maxRate = this.maxRates[type] || 2.0;

      if (this.limiterPulse) {
        // Fuel Cut-off: momentary volume dip and micro pitch reduction
        this.masterGain.gain.setValueAtTime(0.08, now);
        if (this.idleSource) this.idleSource.playbackRate.setValueAtTime(maxRate * 0.95, now);
        if (this.revSource) this.revSource.playbackRate.setValueAtTime(maxRate * 0.95, now);
      } else {
        // Combustion Pop / Bang: immediate volume restoration and peak bounce pitch
        this.masterGain.gain.setValueAtTime(0.44, now);
        if (this.idleSource) this.idleSource.playbackRate.setValueAtTime(maxRate * 1.02, now);
        if (this.revSource) this.revSource.playbackRate.setValueAtTime(maxRate * 1.02, now);
        this._playBackfirePop(type);
      }
    }

    // Authentic exhaust combustion backfire pop on rev limiter
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

    // Release throttle smoothly back to idle purr
    releaseThrottle(type) {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const base = this.baseRates[type] || 1.0;

      if (this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(0.38, now + 0.25);
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
        this.idleGain.gain.linearRampToValueAtTime(1.0, now + 0.35);
      }
      if (this.revGain) {
        this.revGain.gain.cancelScheduledValues(now);
        this.revGain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      }

      // If truck, trigger the authentic recorded Scania pneumatic air-brake release hiss!
      if (type === 'heavy') {
        setTimeout(() => {
          this._playAirBrakeHiss();
        }, 300);
      }
    }

    // Authentic Scania Pneumatic Air-Brake Release Hiss
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
      if (!this.isPlaying && !this.idleSource && !this.revSource) return;
      this.isPlaying = false;
      this.currentGeneration++;

      try {
        if (this.masterGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.masterGain.gain.cancelScheduledValues(now);
          this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.1);
        }
        setTimeout(() => {
          try {
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
        }, 120);
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
      this.audioEnabled = false;
      this.rpmVal = 800;
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

      // Event attachments
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

      const audioBtn = document.getElementById('vehAudioBtn');
      if (audioBtn) {
        audioBtn.onclick = (e) => {
          e.preventDefault();
          this.toggleAudio(audioBtn);
        };
      }

      const stageClickable = document.getElementById('vehInteractiveArea');
      if (stageClickable) {
        stageClickable.onclick = (e) => {
          if (!e.target.closest('button') && !e.target.closest('a')) {
            this.triggerDoubleFlash();
          }
        };
      }

      // Start Smoke Loop
      if (this.animId) cancelAnimationFrame(this.animId);
      this.startSmokeLoop();
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

    switchVehicle(type, isInitial = false) {
      // If user was throttling, stop immediately
      if (this.isThrottling) this.stopThrottle();

      const cfg = VEHICLE_CONFIGS[type];
      if (!cfg) return;
      this.activeType = type;
      this.rpmVal = cfg.idleRpm;

      const img = document.getElementById('vehMainImg');
      const modelNameEl = document.getElementById('vehModelName');
      const specsEl = document.getElementById('vehSpecs');
      const lightsLayer = document.getElementById('vehHeadlightsLayer');
      const groundGlow = document.getElementById('vehGroundGlow');
      const audioBtn = document.getElementById('vehAudioBtn');

      if (modelNameEl) modelNameEl.textContent = cfg.name;
      if (specsEl) specsEl.textContent = cfg.specs;

      // 1. Immediately wipe previous headlights & ground glow to avoid premature flashing before image renders
      if (lightsLayer) lightsLayer.innerHTML = '';
      if (groundGlow) groundGlow.style.opacity = '0';

      const applyNewVehicle = () => {
        if (lightsLayer) {
          lightsLayer.innerHTML = this.renderHeadlightsHtml(cfg);
        }
        if (groundGlow) {
          groundGlow.style.left = `${cfg.groundGlow.x}%`;
          groundGlow.style.top = `${cfg.groundGlow.y}%`;
          groundGlow.style.width = `${cfg.groundGlow.w}%`;
          groundGlow.style.height = `${cfg.groundGlow.h}%`;
          groundGlow.style.opacity = '';
        }
        // Trigger high-beam double flash ONLY after the vehicle image has loaded and is cleanly displayed!
        setTimeout(() => {
          this.triggerDoubleFlash();
        }, isInitial ? 180 : 160);
      };

      if (img) {
        const cleanCfgSrc = cfg.image.split('?')[0];
        if (img.complete && img.src.includes(cleanCfgSrc)) {
          applyNewVehicle();
        } else {
          img.onload = () => {
            applyNewVehicle();
          };
          img.src = cfg.image;
        }
      } else {
        applyNewVehicle();
      }

      // Switch audio engine if active
      if (this.audioEnabled) {
        this.audio.start(type);
      }
      if (audioBtn) {
        const lbl = audioBtn.querySelector('.btn-lbl');
        if (lbl) {
          lbl.textContent = this.audioEnabled ? `${cfg.audioBtnLabel}: روشن` : cfg.audioBtnLabel;
        }
      }

      this.updateSearchFields(cfg);
    }

    renderHeadlightsHtml(cfg) {
      let html = '';
      cfg.headlights.forEach((hl) => {
        const shapeClass = hl.isStrip ? 'strip-lens' : 'projector-lens';
        html += `
          <div class="headlight-lens ${shapeClass}" style="left:${hl.x}%; top:${hl.y}%; width:${hl.w}px; height:${hl.h}px;">
            <div class="lamp-crystal-core"></div>
            <div class="lamp-soft-halo"></div>
          </div>`;
      });
      return html;
    }

    // Double high beam flash (CALLED ONLY BY TAB SWITCH OR FLASH BUTTON, NEVER BY GAS!)
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

    // START THROTTLE (گاز دادن و نگه داشتن پدال تا کاتاف)
    startThrottle() {
      if (this.isThrottling) return;
      this.isThrottling = true;
      this.throttleProgress = 0;

      const cfg = VEHICLE_CONFIGS[this.activeType];
      const stage = document.getElementById('heroVehicleStage');
      const revBtn = document.getElementById('vehRevBtn');

      if (stage) stage.classList.add('vehicle-rev-squat');
      if (revBtn) revBtn.classList.add('throttling-active');

      // Continuous smoke burst
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
          if (this.audioEnabled) {
            this.audio.setThrottlePitch(this.throttleProgress, this.activeType);
          }
          emitBurst();
        } else {
          // AT REDLINE: ENTER REV LIMITER BOUNCE (کاتاف)!
          if (!this.limiterTimer) {
            this._startLimiterBounce();
          }
        }
      }, 40);
    }

    // REV LIMITER BOUNCE (کاتاف و شلیک پاف‌های دود)
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
        if (this.audioEnabled) {
          this.audio.triggerLimiterCut(this.activeType);
        }

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

    // RELEASE THROTTLE (رها کردن گاز و بازگشت نرم به دور آرام)
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

      if (stage) {
        stage.classList.remove('vehicle-rev-squat');
        stage.classList.remove('limiter-shake');
      }
      if (revBtn) revBtn.classList.remove('throttling-active');

      if (this.audioEnabled) {
        this.audio.releaseThrottle(this.activeType);
      }
    }

    toggleAudio(btn) {
      const cfg = VEHICLE_CONFIGS[this.activeType];
      if (!this.audioEnabled) {
        this.audio.start(this.activeType);
        this.audioEnabled = true;
        if (btn) {
          btn.classList.add('on');
          btn.querySelector('.btn-lbl').textContent = `${cfg ? cfg.audioBtnLabel : 'صدا'}: روشن`;
        }
      } else {
        this.audio.stop();
        this.audioEnabled = false;
        if (btn) {
          btn.classList.remove('on');
          btn.querySelector('.btn-lbl').textContent = cfg ? cfg.audioBtnLabel : 'صدا: خاموش';
        }
      }
    }

    startSmokeLoop() {
      let frameCount = 0;
      const sprite = this.smokeSprite || getSmokeSprite();

      const loop = () => {
        this.animId = requestAnimationFrame(loop);
        if (!this.canvas || !this.ctx) return;

        frameCount++;
        const cfg = VEHICLE_CONFIGS[this.activeType];
        if (!cfg) return;

        const cw = this.cssW;
        const ch = this.cssH;

        this.ctx.clearRect(0, 0, cw, ch);

        // Continuous realistic idle exhaust
        if (!this.isThrottling && frameCount % 3 === 0 && this.particles.length < 32) {
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

        // Live smooth RPM indicator with limiter bounce
        let targetRpm = cfg.idleRpm;
        if (this.isThrottling) {
          if (this.throttleProgress >= 0.98) {
            // Limiter bounce oscillation (کاتاف)
            const jitter = (Math.random() - 0.5) * (cfg.maxRpm * 0.04);
            targetRpm = cfg.maxRpm + jitter;
          } else {
            targetRpm = cfg.idleRpm + (cfg.revRpm - cfg.idleRpm) * this.throttleProgress;
          }
        }

        if (Math.abs(this.rpmVal - targetRpm) > 4) {
          this.rpmVal += (targetRpm - this.rpmVal) * 0.18;
          const rpmEl = document.getElementById('vehRpmValue');
          if (rpmEl) rpmEl.textContent = Math.round(this.rpmVal).toLocaleString('fa-IR');
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
