document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  const themeBtn = document.querySelector('.btn-theme-golden');
  const savedTheme = localStorage.getItem('knitfootprint_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-cashmere-light');
    if (themeBtn) themeBtn.textContent = 'Golden Dark';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-cashmere-light');
      themeBtn.textContent = isLight ? 'Golden Dark' : 'Cashmere Light';
      localStorage.setItem('knitfootprint_theme', isLight ? 'light' : 'dark');
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle-knit');
  const navMenu = document.querySelector('.knit-nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
    document.querySelectorAll('.knit-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  /* ==========================================================================
     1. GOLDEN KNIT ARCHITECTURE WORKBENCH ENGINE
  ========================================================================== */
  let currentSilhouette = 'crew';
  let currentFiber = 'merino';
  let currentGauge = 'gauge200';

  const silhouetteCards = document.querySelectorAll('.wb-silhouette-card');
  const fiberBtns = document.querySelectorAll('#fiber-badges .wb-badge-btn');
  const gaugeBtns = document.querySelectorAll('#gauge-badges .wb-badge-btn');

  const gMicronNum = document.getElementById('gauge-micron-num');
  const gMicronBadge = document.getElementById('gauge-micron-badge');
  const gMicronBar = document.getElementById('gauge-micron-bar');
  const gMicronNote = document.getElementById('gauge-micron-note');

  const gGsmNum = document.getElementById('gauge-gsm-num');
  const gGsmBadge = document.getElementById('gauge-gsm-badge');
  const gGsmNote = document.getElementById('gauge-gsm-note');
  const barZone1 = document.getElementById('bar-zone1-val');
  const barZone2 = document.getElementById('bar-zone2-val');
  const barZone3 = document.getElementById('bar-zone3-val');

  const gMvtrNum = document.getElementById('gauge-mvtr-num');
  const gMvtrBadge = document.getElementById('gauge-mvtr-badge');
  const gMvtrBar = document.getElementById('gauge-mvtr-bar');
  const gMvtrNote = document.getElementById('gauge-mvtr-note');

  const tFiber = document.getElementById('telem-fiber');
  const tGauge = document.getElementById('telem-gauge');
  const tLinking = document.getElementById('telem-linking');
  const tDurability = document.getElementById('telem-durability');

  function updateKnitWorkbench() {
    if (!gMicronNum) return;

    let micronVal = '15.5';
    let micronBadge = 'Superfine Saxon Merino';
    let micronBarPct = 85;
    let micronNote = 'Natural Spiral Crimp & Scaled Cuticle Protection';

    let gsmVal = '320';
    let gsmBadge = '200-Needle True Rib';
    let gsmNote = 'High-Tensile Elastic Recoil & Zero Sagging';
    let zZ1 = 'Cuff Rib (380 GSM)';
    let zZ2 = 'Instep Arch (290 GSM)';
    let zZ3 = 'Seamless Toe (340 GSM)';

    let mvtrVal = '94';
    let mvtrBadge = 'Active Vapor Evacuation';
    let mvtrBarPct = 94;
    let mvtrNote = 'Hydrophilic Core with Hydrophobic Exterior';

    let fiber = '15.5&mu;m Saxon Superfine Merino Wool';
    let gauge = '200-Needle Single-Cylinder Lonati Bed';
    let linking = 'Hand-Linked Seamless Rosso Toe Closure';
    let durability = '50,000-Cycle Martindale Abrasion Rating';

    if (currentSilhouette === 'dress') {
      gsmVal = '240';
      gsmBadge = 'Ultra-Fine 200-Needle Dress';
      zZ1 = 'Cuff Rib (280 GSM)';
      zZ2 = 'Instep Arch (220 GSM)';
      zZ3 = 'Seamless Toe (260 GSM)';
    } else if (currentSilhouette === 'lounge') {
      gsmVal = '420';
      gsmBadge = 'Heavy Plush Terry Cushion';
      zZ1 = 'Cuff Rib (450 GSM)';
      zZ2 = 'Instep Arch (380 GSM)';
      zZ3 = 'Seamless Toe (420 GSM)';
    } else if (currentSilhouette === 'compression') {
      gsmVal = '360';
      gsmBadge = 'Graduated 15-20 mmHg Compression';
    }

    if (currentFiber === 'cashmere') {
      fiber = 'Grade-A Inner Mongolian Raw Cashmere';
      micronVal = '14.2';
      micronBadge = 'Ultra-Fine Cashmere Fleece';
      micronBarPct = 95;
      micronNote = 'Exceptional Thermal Clo Insulation ($1.2\,\text{Clo}$)';
      mvtrVal = '98';
    } else if (currentFiber === 'silk') {
      fiber = 'Mulberry Silk Core Wrapped with Merino';
      micronVal = '16.0';
      micronBadge = 'Silk-Merino Core';
      mvtrVal = '91';
    } else if (currentFiber === 'giza') {
      fiber = 'Giza 45 Long-Staple Egyptian Cotton';
      micronVal = '18.5';
      micronBadge = 'Extra-Long Staple Cotton';
      micronBarPct = 70;
      micronNote = 'Mercerized Smooth Fiber with Zero Crimp';
      mvtrVal = '82';
    }

    if (currentGauge === 'gauge96') {
      gauge = '96-Needle Heavy Gauge Chunky Rib';
    } else if (currentGauge === 'gauge240') {
      gauge = '240-Needle Ultra-Micro Italian Knitting Bed';
    }

    gMicronNum.innerHTML = micronVal;
    gMicronBadge.innerHTML = micronBadge;
    gMicronBar.style.width = micronBarPct + '%';
    gMicronNote.innerHTML = micronNote;

    gGsmNum.innerHTML = gsmVal;
    gGsmBadge.innerHTML = gsmBadge;
    gGsmNote.innerHTML = gsmNote;
    barZone1.innerHTML = zZ1;
    barZone2.innerHTML = zZ2;
    barZone3.innerHTML = zZ3;

    gMvtrNum.innerHTML = mvtrVal;
    gMvtrBadge.innerHTML = mvtrBadge;
    gMvtrBar.style.width = mvtrBarPct + '%';
    gMvtrNote.innerHTML = mvtrNote;

    tFiber.innerHTML = fiber;
    tGauge.innerHTML = gauge;
    tLinking.innerHTML = linking;
    tDurability.innerHTML = durability;
  }

  silhouetteCards.forEach(card => {
    card.addEventListener('click', () => {
      silhouetteCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentSilhouette = card.getAttribute('data-silhouette');
      updateKnitWorkbench();
    });
  });

  fiberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fiberBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFiber = btn.getAttribute('data-fiber');
      updateKnitWorkbench();
    });
  });

  gaugeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gaugeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGauge = btn.getAttribute('data-gauge');
      updateKnitWorkbench();
    });
  });

  updateKnitWorkbench();

  /* ==========================================================================
     2. 5-STAGE HAUTE KNITWEAR CRAFTSMANSHIP MATRIX
  ========================================================================== */
  const matrixData = {
    "1": {
      tag: "Stage 01: Fleece Micron Grading",
      title: "Saxon Merino Curation & Sub-16 Micron Fleece Sorting",
      desc: "Raw fleece harvested from ethical Australian and Saxon flocks is hand-sorted under optical magnification. Only staple lengths above 75mm with an average fiber diameter under 15.5 microns are selected for our worsted spinning lots.",
      spi: "15.5 Micron Sorting",
      tannage: "Saxon High-Crimp Flocks",
      edge: "75mm Long-Staple Length",
      time: "6 Hours Fleece Optical Sorting",
      action: "Laser Micron Diameter Grading",
      artifact: "Curated Raw Merino Tops",
      metric: "100% Itch-Free Prickle Threshold",
      cue: "<strong>Master Knitter Cue:</strong> Fibers under 17.5 microns bend softly against skin nerve endings, eliminating the prickle factor associated with coarse wool."
    },
    "2": {
      tag: "Stage 02: Worsted Ring Spinning",
      title: "Worsted Combing, 2-Ply Ring Spinning & Botanical Wax Glazing",
      desc: "Raw wool tops are combed to align all fibers parallel before being spun into 2-ply worsted yarn on ring frames. The yarn passes through natural botanical wax baths to reduce friction during high-speed circular bed knitting.",
      spi: "2/60 Nm Worsted Count",
      tannage: "Natural Plant Wax Glaze",
      edge: "Parallel Fiber Alignment",
      time: "8 Hours Ring Spinning Cycle",
      action: "High-Twist 2-Ply Ring Spindles",
      artifact: "Precision Worsted Yarn Cones",
      metric: "Zero Pilling High-Tensile Twist",
      cue: "<strong>Master Knitter Cue:</strong> Worsted combing removes all short fuzzy fibers, leaving only long silky filaments that resist surface fuzz and pilling."
    },
    "3": {
      tag: "Stage 03: 200-Needle Circular Bed",
      title: "200-Needle Italian Circular Knitting & Engineered Arch Ribbing",
      desc: "Yarn is knitted on specialized 200-needle single-cylinder Italian machines. True 1x1 and 2x2 rib architectures are formed with variable stitch tension, creating targeted anatomical arch compression and stay-up cuff memory.",
      spi: "200 Precision Needles",
      tannage: "Italian Single-Cylinder Bed",
      edge: "Targeted Arch Elastic Rib",
      time: "12 Minutes Per Sock Cycle",
      action: "Multi-Feeder Cam Actuation",
      artifact: "Seamless Tubular Sock Body",
      metric: "Sub-Millimeter Stitch Regularity",
      cue: "<strong>Master Knitter Cue:</strong> 200-needle density packs more micro-loops per square inch, creating a luxurious fabric that feels like a second skin."
    },
    "4": {
      tag: "Stage 04: Hand-Linked Seamless Toe",
      title: "Loop-by-Loop Hand-Linking (Rosso Stitchless Toe Closure)",
      desc: "Instead of machine overlocking that leaves a thick, irritating ridge across the toes, our master linkers place every individual knit loop onto a radial dial needle bed by hand, knitting the toe closed with a single continuous invisible thread.",
      spi: "Loop-by-Loop Alignment",
      tannage: "Radial Dial Hand-Linking",
      edge: "Zero-Bulk Flat Seam",
      time: "15 Minutes Hand-Linking Bench",
      action: "Single-Thread Needle Dial Linking",
      artifact: "100% Seamless Flat Toe Closure",
      metric: "Zero Friction Blister Prevention",
      cue: "<strong>Master Knitter Cue:</strong> Hand-linking creates a completely smooth interior, eliminating pressure points inside dress shoes and boots."
    },
    "5": {
      tag: "Stage 05: Steam Boarding & Finishing",
      title: "Heated Aluminum Boarding & Natural Lanolin Conditioning Wash",
      desc: "Knitted socks undergo a gentle eco-wash infused with natural wool lanolin to restore fiber softness. Each sock is then fitted onto heated aluminum foot forms for steam boarding, setting the permanent architectural silhouette.",
      spi: "110°C Saturated Steam Set",
      tannage: "Natural Wool Lanolin Wash",
      edge: "Permanent Memory Form",
      time: "4 Hours Wash & Steam Setting",
      action: "Precision Aluminum Foot Form",
      artifact: "Finished Luxury Heirloom Hosiery",
      metric: "Zero Shrinkage Machine Washable",
      cue: "<strong>Master Knitter Cue:</strong> Steam boarding locks the knit structure into its anatomical shape, ensuring the sock never twists or shrinks when laundered."
    }
  };

  const matrixStepBtns = document.querySelectorAll('.matrix-step-btn');
  const dTag = document.getElementById('matrix-display-tag');
  const dTitle = document.getElementById('matrix-display-title');
  const dDesc = document.getElementById('matrix-display-desc');
  const dSpi = document.getElementById('matrix-spi-val');
  const dTannage = document.getElementById('matrix-tannage-val');
  const dEdge = document.getElementById('matrix-edge-val');
  const dTime = document.getElementById('matrix-time-val');
  const dAct = document.getElementById('matrix-act-val');
  const dArtifact = document.getElementById('matrix-artifact-val');
  const dMetric = document.getElementById('matrix-metric-val');
  const dCue = document.getElementById('matrix-textile-text');

  if (matrixStepBtns.length > 0) {
    matrixStepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matrixStepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const phaseKey = btn.getAttribute('data-phase');
        const data = matrixData[phaseKey];
        if (data && dTitle) {
          dTag.innerHTML = data.tag;
          dTitle.innerHTML = data.title;
          dDesc.innerHTML = data.desc;
          dSpi.innerHTML = data.spi;
          dTannage.innerHTML = data.tannage;
          dEdge.innerHTML = data.edge;
          dTime.innerHTML = data.time;
          dAct.innerHTML = data.action;
          dArtifact.innerHTML = data.artifact;
          dMetric.innerHTML = data.metric;
          dCue.innerHTML = data.cue;
        }
      });
    });
  }

  /* ==========================================================================
     3. FAQ & BLOG SEARCH
  ========================================================================== */
  const faqBtns = document.querySelectorAll('.faq-knit-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-knit-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const searchInput = document.getElementById('knit-search-input');
  const blogCards = document.querySelectorAll('.blog-knit-card');
  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }
});
