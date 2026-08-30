/* ==========================================================================
   HyperFrames Video Script: 60s One-Take Camera Engine
   Author: Luo Ruiyang Portfolio Showcase
   ========================================================================== */

(function initComposition() {
  const TOTAL_DURATION = 60.0;
  
  // HUD Elements
  const timerDisplay = document.getElementById('hud-timer-val');
  const progressFill = document.getElementById('hud-progress-fill');
  const chapterBadge = document.getElementById('hud-chapter-text');
  const ambientGlow = document.getElementById('ambient-glow-main');
  const scrubber = document.getElementById('scrubber');
  const playBtn = document.getElementById('btn-play');
  
  // Retrieve or create GSAP Master Timeline
  window.__timelines = window.__timelines || {};
  const master = gsap.timeline({
    paused: false,
    defaults: { ease: "power2.inOut" }
  });
  master.eventCallback("onUpdate", updateHud);

  // Expose timeline to window for HyperFrames headless rendering
  window.timeline = master;
  window.__timeline = master;
  window.__timelines['main'] = master;

  function updateHud() {
    const time = master.time();
    const progress = master.progress();
    
    // Update Timecode
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    const millis = Math.floor((time % 1) * 100).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}.${millis}`;
    
    // Update Progress Bar
    if (progressFill) progressFill.style.width = `${(progress * 100).toFixed(2)}%`;
    if (scrubber && !isScrubbing) scrubber.value = time.toString();
    
    // Update Chapter Badge & Theme Color
    if (chapterBadge) {
      if (time < 6) {
        chapterBadge.textContent = "PROLOGUE // PORTFOLIO INTRO";
        if (ambientGlow) ambientGlow.className = "ambient-glow glow-red";
      } else if (time < 22) {
        chapterBadge.textContent = "CH 01 // GAME DESIGN & POETICS";
        if (ambientGlow) ambientGlow.className = "ambient-glow glow-red";
      } else if (time < 40) {
        chapterBadge.textContent = "CH 02 // AI & MULTI-AGENT SYSTEMS";
        if (ambientGlow) ambientGlow.className = "ambient-glow glow-purple";
      } else if (time < 54) {
        chapterBadge.textContent = "CH 03 // QUANTITATIVE & CRYPTO";
        if (ambientGlow) ambientGlow.className = "ambient-glow glow-emerald";
      } else {
        chapterBadge.textContent = "EPILOGUE // CONNECT";
        if (ambientGlow) ambientGlow.className = "ambient-glow glow-red";
      }
    }
  }

  // =========================================================================
  // ONE-TAKE CONTINUOUS CAMERA TIMELINE (0s - 60s)
  // =========================================================================
  
  const world = document.getElementById('world-space');
  const scene0 = document.getElementById('scene-0'); // Intro
  const scene1 = document.getElementById('scene-1'); // Game Design
  const scene2 = document.getElementById('scene-2'); // AI Systems
  const scene3 = document.getElementById('scene-3'); // Quant & Crypto
  const scene4 = document.getElementById('scene-4'); // Outro

  // Initial State Setup
  gsap.set(scene0, { opacity: 1, y: 0, z: 0 });
  gsap.set(scene1, { opacity: 0, y: 1080, z: -200 });
  gsap.set(scene2, { opacity: 0, y: 2160, z: -200 });
  gsap.set(scene3, { opacity: 0, y: 3240, z: -200 });
  gsap.set(scene4, { opacity: 0, y: 4320, z: -200 });

  // -------------------------------------------------------------------------
  // 1. SCENE 0: PROLOGUE / HERO (0.0s -> 6.0s)
  // -------------------------------------------------------------------------
  master.fromTo(".hero-eyebrow", 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.2
  );
  master.fromTo(".hero-name", 
    { opacity: 0, scale: 0.9, letterSpacing: "-0.08em" }, 
    { opacity: 1, scale: 1, letterSpacing: "-0.04em", duration: 1.8, ease: "power4.out" }, 0.4
  );
  master.fromTo(".hero-tagline", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 1.0
  );
  master.fromTo(".pillar-badge", 
    { opacity: 0, y: 30, scale: 0.95 }, 
    { opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.2, ease: "back.out(1.4)" }, 1.6
  );

  // -------------------------------------------------------------------------
  // TRANSITION TO SCENE 1: GAME DESIGN (4.8s -> 22.0s)
  // -------------------------------------------------------------------------
  master.to(world, {
    y: -1080,
    z: 50,
    rotateX: 3,
    rotateY: -2,
    duration: 2.2,
    ease: "power2.inOut"
  }, 4.8);

  master.to(scene0, { opacity: 0, scale: 0.92, duration: 1.6 }, 4.8);
  master.to(scene1, { opacity: 1, z: 0, duration: 1.8 }, 5.2);

  master.fromTo("#scene-1 .section-kicker, #scene-1 .section-title, #scene-1 .section-subtitle",
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, 5.6
  );

  master.fromTo("#scene-1 .project-card",
    { opacity: 0, y: 80, rotateX: 6 },
    { opacity: 1, y: 0, rotateX: 0, stagger: 0.3, duration: 1.6, ease: "power3.out" }, 6.2
  );

  master.to(world, {
    rotateX: -1,
    rotateY: 2,
    z: 80,
    duration: 14.0,
    ease: "none"
  }, 7.0);

  master.to("#scene-1 .card-media img", {
    scale: 1.08,
    duration: 15.0,
    ease: "none"
  }, 7.0);

  // -------------------------------------------------------------------------
  // TRANSITION TO SCENE 2: AI & AGENT SYSTEMS (20.6s -> 40.0s)
  // -------------------------------------------------------------------------
  master.to(world, {
    y: -2160,
    z: 30,
    rotateX: -3,
    rotateY: 3,
    duration: 2.4,
    ease: "power3.inOut"
  }, 20.6);

  master.to(scene1, { opacity: 0, scale: 0.92, duration: 1.8 }, 20.6);
  master.to(scene2, { opacity: 1, z: 0, duration: 1.8 }, 21.2);

  master.fromTo("#scene-2 .section-kicker, #scene-2 .section-title, #scene-2 .section-subtitle",
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, 21.6
  );

  master.fromTo("#scene-2 .project-card",
    { opacity: 0, y: 70, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.25, duration: 1.4, ease: "back.out(1.2)" }, 22.2
  );

  master.fromTo(".architecture-callout",
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, stagger: 0.2, duration: 1.0, ease: "power2.out" }, 23.5
  );

  master.to(world, {
    rotateX: 1,
    rotateY: -2,
    z: 60,
    duration: 16.0,
    ease: "none"
  }, 23.0);

  // -------------------------------------------------------------------------
  // TRANSITION TO SCENE 3: QUANTITATIVE & CRYPTO (38.6s -> 54.0s)
  // -------------------------------------------------------------------------
  master.to(world, {
    y: -3240,
    z: 60,
    rotateX: 2,
    rotateY: -3,
    duration: 2.4,
    ease: "power3.inOut"
  }, 38.6);

  master.to(scene2, { opacity: 0, scale: 0.92, duration: 1.8 }, 38.6);
  master.to(scene3, { opacity: 1, z: 0, duration: 1.8 }, 39.2);

  master.fromTo("#scene-3 .section-kicker, #scene-3 .section-title, #scene-3 .section-subtitle",
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, 39.6
  );

  master.fromTo("#scene-3 .project-card",
    { opacity: 0, y: 70 },
    { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "power3.out" }, 40.2
  );

  master.fromTo(".metric-box",
    { opacity: 0, scale: 0.85 },
    { opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)" }, 41.5
  );

  master.to(world, {
    rotateX: -2,
    rotateY: 1,
    z: 90,
    duration: 13.0,
    ease: "none"
  }, 41.0);

  // -------------------------------------------------------------------------
  // TRANSITION TO SCENE 4: OUTRO / CONNECT (52.6s -> 60.0s)
  // -------------------------------------------------------------------------
  master.to(world, {
    y: -4320,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    duration: 2.2,
    ease: "power3.inOut"
  }, 52.6);

  master.to(scene3, { opacity: 0, scale: 0.92, duration: 1.6 }, 52.6);
  master.to(scene4, { opacity: 1, z: 0, duration: 1.8 }, 53.2);

  master.fromTo(".outro-heading",
    { opacity: 0, scale: 0.92, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power4.out" }, 53.8
  );

  master.fromTo(".contact-pill",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "back.out(1.4)" }, 54.5
  );

  master.to(".outro-container", {
    opacity: 0.95,
    duration: 5.0
  }, 55.0);

  // Ensure total duration reaches 60s
  master.duration(TOTAL_DURATION);

  // =========================================================================
  // Standalone Browser Playback Controls
  // =========================================================================
  let isScrubbing = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (master.paused()) {
        master.play();
        playBtn.textContent = 'PAUSE';
      } else {
        master.pause();
        playBtn.textContent = 'PLAY';
      }
    });
  }

  if (scrubber) {
    scrubber.addEventListener('mousedown', () => {
      isScrubbing = true;
      master.pause();
    });
    scrubber.addEventListener('input', (e) => {
      const targetTime = parseFloat(e.target.value);
      master.time(targetTime);
      updateHud();
    });
    scrubber.addEventListener('mouseup', () => {
      isScrubbing = false;
      if (playBtn && playBtn.textContent === 'PAUSE') {
        master.play();
      }
    });
  }

  // Speed toggles
  document.querySelectorAll('[data-speed]').forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseFloat(btn.getAttribute('data-speed'));
      master.timeScale(speed);
      document.querySelectorAll('[data-speed]').forEach(b => b.style.opacity = '0.5');
      btn.style.opacity = '1.0';
    });
  });

  // Responsive stage auto-scaling
  function handleResize() {
    const viewport = document.getElementById('viewport');
    if (!viewport) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scale = Math.min(windowWidth / 1920, windowHeight / 1080);
    viewport.style.transform = `scale(${scale})`;
    viewport.style.transformOrigin = `center center`;
  }

  window.addEventListener('resize', handleResize);
  handleResize();
})();
