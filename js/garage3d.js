/* صفر چی — دوربین ۳۶۰ روی عکس واقعی ماشین پریمیوم */
(function () {
  const SC = (window.SC = window.SC || {});

  let raf = 0, disposed = true, stageEl = null;
  let auto = true, dragging = false, px = 0, py = 0, last = 0;
  let yaw = 0, pitch = 0, buildId = "g1";
  let frames = [], imgA, imgB, usingA = true, cur = -1;
  const cache = new Map();

  function $(id) { return document.getElementById(id); }

  function status(msg, keep) {
    const el = $("gStatus");
    if (!el) return;
    if (!msg) {
      el.classList.add("off");
      el.innerHTML = "";
      return;
    }
    el.classList.remove("off");
    el.innerHTML = `<span class="g-spin"></span><b>${msg}</b>`;
    if (!keep) setTimeout(() => el.classList.add("off"), 1400);
  }

  function framesOf(id) {
    const g = (SC.garageBuilds || []).find((x) => x.id === id);
    if (g && g.frames && g.frames.length) return g.frames.slice();
    return g && g.img ? [g.img] : [];
  }

  function preload(list) {
    return Promise.all(list.map((src) => {
      if (cache.has(src) && cache.get(src).complete && cache.get(src).naturalWidth) {
        return cache.get(src);
      }
      return new Promise((resolve) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => { cache.set(src, im); resolve(im); };
        im.onerror = () => resolve(null);
        im.src = src;
        cache.set(src, im);
      });
    }));
  }

  function frameIndex() {
    const n = frames.length || 1;
    const t = ((yaw % n) + n) % n;
    return Math.round(t) % n;
  }

  function applyTilt() {
    const wrap = stageEl && stageEl.querySelector(".garage-rig");
    if (!wrap) return;
    wrap.style.transform = "perspective(1400px) rotateX(" + pitch.toFixed(2) + "deg) scale(1.06)";
  }

  function showFrame(i) {
    if (!imgA || !frames.length) return;
    i = ((i % frames.length) + frames.length) % frames.length;
    if (i === cur) return;
    const src = frames[i];
    const next = usingA ? imgB : imgA;
    const prev = usingA ? imgA : imgB;
    next.src = src;
    next.classList.add("on");
    prev.classList.remove("on");
    usingA = !usingA;
    cur = i;
  }

  function tick(t) {
    if (disposed) return;
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
    last = t;
    if (auto && !dragging && frames.length > 1) {
      yaw += dt * 0.42;
      showFrame(frameIndex());
    }
    applyTilt();
    raf = requestAnimationFrame(tick);
  }

  SC.disposeGarage3D = function () {
    disposed = true;
    cancelAnimationFrame(raf);
    raf = 0;
    if (stageEl) {
      const rig = stageEl.querySelector(".garage-rig");
      if (rig) rig.remove();
    }
    imgA = imgB = stageEl = null;
    cur = -1;
  };

  SC.setGarageBuild = function (id) {
    buildId = id || "g1";
    frames = framesOf(buildId);
    yaw = 0;
    pitch = 0;
    cur = -1;
    status("در حال بارگذاری…", true);
    preload(frames).then(() => {
      if (disposed) return;
      showFrame(0);
      status("");
    });
  };

  SC.mountGarage3D = function (stage) {
    if (!stage) return;
    SC.disposeGarage3D();
    disposed = false;
    stageEl = stage;
    auto = true;
    dragging = false;
    yaw = 0;
    pitch = 0;
    buildId = (SC.garageBuilds && SC.garageBuilds[0] && SC.garageBuilds[0].id) || "g1";
    frames = framesOf(buildId);

    const rig = document.createElement("div");
    rig.className = "garage-rig";
    imgA = document.createElement("img");
    imgB = document.createElement("img");
    imgA.className = "garage-hero on";
    imgB.className = "garage-hero";
    imgA.alt = imgB.alt = "نمایش ۳۶۰ ماشین";
    imgA.draggable = imgB.draggable = false;
    rig.appendChild(imgB);
    rig.appendChild(imgA);
    stage.insertBefore(rig, stage.firstChild);

    status("در حال بارگذاری M4…", true);
    preload(frames).then(() => {
      if (disposed) return;
      showFrame(0);
      status("");
    });
    (SC.garageBuilds || []).forEach((g) => { if (g.frames) preload(g.frames); });

    const onDown = (e) => {
      if (e.target.closest("button")) return;
      dragging = true;
      auto = false;
      px = e.clientX;
      py = e.clientY;
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (Math.abs(dx) >= 7 && frames.length > 1) {
        yaw += dx > 0 ? -1 : 1;
        px = e.clientX;
        showFrame(frameIndex());
      }
      if (Math.abs(dy) >= 2) {
        pitch = Math.max(-11, Math.min(11, pitch - dy * 0.08));
        py = e.clientY;
      }
    };
    const onUp = () => { dragging = false; };
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  SC.nudgeGarage = function (dir) {
    auto = false;
    yaw += dir;
    showFrame(frameIndex());
  };
  SC.resetGarageCam = function () {
    yaw = 0;
    pitch = 0;
    auto = true;
    showFrame(0);
    applyTilt();
  };
})();
