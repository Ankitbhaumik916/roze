/* ===== ADVANCED ROSE DAY PROJECT ===== */

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMusic();
  initTypewriter();
  initEventListeners();
  initFloatingHearts();
  initParticleSystem();
});

// ===== THEME SYSTEM =====
function initTheme() {
  const savedTheme = localStorage.getItem('roseTheme') || 'dark';
  const themeBtn = document.getElementById('themeToggle');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }
  
  themeBtn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const themeBtn = document.getElementById('themeToggle');
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('roseTheme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  createPulseEffect(themeBtn);
}

// ===== MUSIC SYSTEM =====
function initMusic() {
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  
  // Create simple audio data (silence by default)
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Load or create a simple tone
  createSimpleAudio(bgMusic);
  
  let isPlaying = false;
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.textContent = '🔇';
    } else {
      bgMusic.play().catch(err => console.log('Audio play failed:', err));
      musicBtn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
    createPulseEffect(musicBtn);
  });
}

function createSimpleAudio(audioElement) {
  // Create a simple loopable audio tone using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const duration = 2; // 2 seconds
  const sampleRate = audioContext.sampleRate;
  const audioBuffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = audioBuffer.getChannelData(0);
  
  // Create a simple melody pattern
  const freq = 440;
  const amp = 0.1;
  for (let i = 0; i < audioBuffer.length; i++) {
    data[i] = Math.sin(2 * Math.PI * (freq / sampleRate) * i) * amp;
  }
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const dialogueText = [
    "Some moments are quiet, yet unforgettable.",
    "Some gestures say more than words ever could.",
    "Today is a small reminder of warmth, kindness, and care.",
    "So here is a rose — simple, sincere, and full of meaning.",
    "✨ Click the button to reveal something special... ✨"
  ];

  let index = 0;
  let charIndex = 0;
  const dialogueEl = document.getElementById("dialogue");

  function typeText() {
    if (charIndex < dialogueText[index].length) {
      dialogueEl.textContent += dialogueText[index][charIndex];
      charIndex++;
      setTimeout(typeText, 40);
    } else {
      setTimeout(() => {
        dialogueEl.textContent = "";
        charIndex = 0;
        index = (index + 1) % dialogueText.length;
        typeText();
      }, 2500);
    }
  }

  typeText();
}

// ===== MAIN EVENT LISTENERS =====
function initEventListeners() {
  const revealBtn = document.getElementById("revealBtn");
  const rose = document.getElementById("rose");
  const roseLight = document.querySelector('.rose-light');
  
  revealBtn.addEventListener("click", () => {
    revealBtn.style.opacity = '0';
    revealBtn.style.pointerEvents = 'none';
    rose.classList.add("show");
    roseLight.classList.add("show");
    
    startPetals();
    startConfetti();
    createMagicExplosion();
    playSuccessAnimation();
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') toggleTheme();
    if (e.key.toLowerCase() === 'm') document.getElementById('musicToggle').click();
    if (e.key === 'Enter') revealBtn.click();
  });
}

// ===== FLOATING HEARTS BACKGROUND =====
function initFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const heartSymbols = ['❤️', '💕', '💖', '💗'];
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
  }

  // Create hearts periodically
  setInterval(createHeart, 800);
}

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
  setupCanvases();
}

function setupCanvases() {
  // Setup petals canvas
  const petalCanvas = document.getElementById("petals");
  const petalCtx = petalCanvas.getContext("2d");
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;

  // Setup confetti canvas
  const confettiCanvas = document.getElementById("confetti");
  const confettiCtx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  // Setup hearts canvas
  const heartsCanvas = document.getElementById("hearts");
  const heartsCtx = heartsCanvas.getContext("2d");
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    petalCanvas.width = window.innerWidth;
    petalCanvas.height = window.innerHeight;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
  });

  // Store canvases in window for use in animation functions
  window.petalCtx = petalCtx;
  window.confettiCtx = confettiCtx;
  window.heartsCtx = heartsCtx;
  window.petalCanvas = petalCanvas;
  window.confettiCanvas = confettiCanvas;
  window.heartsCanvas = heartsCanvas;
}

// ===== PETALS ANIMATION =====
let petals = [];

function createPetal() {
  return {
    x: Math.random() * window.innerWidth,
    y: -20,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 2 + 1,
    drift: Math.random() * 1 - 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: Math.random() * 0.05 - 0.025
  };
}

function startPetals() {
  petals = [];
  for (let i = 0; i < 60; i++) {
    petals.push(createPetal());
  }
  animatePetals();
}

function animatePetals() {
  window.petalCtx.clearRect(0, 0, window.petalCanvas.width, window.petalCanvas.height);

  petals.forEach((p, idx) => {
    window.petalCtx.save();
    window.petalCtx.translate(p.x, p.y);
    window.petalCtx.rotate(p.rotation);
    
    window.petalCtx.beginPath();
    window.petalCtx.fillStyle = `rgba(255, 105, 135, ${0.8 - idx * 0.01})`;
    window.petalCtx.arc(0, 0, p.size, 0, Math.PI * 2);
    window.petalCtx.fill();
    window.petalCtx.restore();

    p.y += p.speed;
    p.x += p.drift;
    p.rotation += p.rotationSpeed;

    if (p.y > window.petalCanvas.height) {
      petals.splice(idx, 1);
    }
  });

  if (petals.length > 0) {
    requestAnimationFrame(animatePetals);
  }
}

// ===== CONFETTI ANIMATION =====
let confetti = [];

function createConfetti() {
  return {
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: window.innerHeight / 2,
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 10 - 3,
    size: Math.random() * 8 + 4,
    color: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ff6b9d'][Math.floor(Math.random() * 4)],
    life: 1,
    decay: Math.random() * 0.01 + 0.005
  };
}

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 100; i++) {
    confetti.push(createConfetti());
  }
  animateConfetti();
}

function animateConfetti() {
  window.confettiCtx.clearRect(0, 0, window.confettiCanvas.width, window.confettiCanvas.height);

  confetti.forEach((c, idx) => {
    window.confettiCtx.fillStyle = c.color;
    window.confettiCtx.globalAlpha = c.life;
    window.confettiCtx.fillRect(c.x, c.y, c.size, c.size);
    window.confettiCtx.globalAlpha = 1;

    c.x += c.vx;
    c.y += c.vy;
    c.vy += 0.2; // gravity
    c.life -= c.decay;

    if (c.life <= 0) {
      confetti.splice(idx, 1);
    }
  });

  if (confetti.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}

// ===== MAGIC EXPLOSION EFFECT =====
function createMagicExplosion() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;

  window.heartsCtx.clearRect(0, 0, window.heartsCanvas.width, window.heartsCanvas.height);

  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    const vx = Math.cos(angle) * 5;
    const vy = Math.sin(angle) * 5;

    drawMagicParticle(x, y, vx, vy);
  }
}

function drawMagicParticle(x, y, vx, vy, life = 1) {
  requestAnimationFrame(() => {
    window.heartsCtx.fillStyle = `rgba(255, 107, 157, ${life})`;
    window.heartsCtx.beginPath();
    window.heartsCtx.arc(x, y, 4, 0, Math.PI * 2);
    window.heartsCtx.fill();

    if (life > 0) {
      drawMagicParticle(x + vx, y + vy, vx * 0.95, vy + 0.1, life - 0.02);
    }
  });
}

// ===== SUCCESS ANIMATION =====
function playSuccessAnimation() {
  updateHeartCount();
  createPulseEffect(document.querySelector('.rose'));
}

function updateHeartCount() {
  const counter = document.getElementById('heartCount');
  let count = parseInt(localStorage.getItem('heartCount') || '0');
  count++;
  localStorage.setItem('heartCount', count);
  counter.textContent = `❤️ ${count}`;
  
  createFloatingText('+1 ❤️', window.innerWidth / 2, window.innerHeight / 2);
}

function createFloatingText(text, x, y) {
  const celebration = document.getElementById('celebration');
  const div = document.createElement('div');
  div.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    font-size: 2rem;
    font-weight: bold;
    color: #ff4d6d;
    pointer-events: none;
    z-index: 100;
    animation: floatUp 2s ease-out forwards;
  `;
  div.textContent = text;
  celebration.appendChild(div);
  
  setTimeout(() => div.remove(), 2000);
}

function createPulseEffect(element) {
  const clone = element.cloneNode(true);
  clone.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    animation: pulse 0.6s ease-out forwards;
    z-index: 999;
  `;
  document.body.appendChild(clone);
  setTimeout(() => clone.remove(), 600);
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(1.5);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Load saved heart count on page load
window.addEventListener('load', () => {
  const count = localStorage.getItem('heartCount') || '0';
  document.getElementById('heartCount').textContent = `❤️ ${count}`;
});
