/* ===== MODERN ROSE DAY - CLEAN VERSION ===== */

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMusic();
  initTypewriter();
  initControls();
  initParticles();
  loadHeartCount();
});

// ===== THEME SYSTEM =====
function initTheme() {
  const savedTheme = localStorage.getItem('roseTheme') || 'dark';
  const themeBtn = document.getElementById('themeToggle');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  
  themeBtn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('roseTheme', isLight ? 'light' : 'dark');
}

// ===== MUSIC SYSTEM =====
function initMusic() {
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;
  
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(err => console.log('Audio play failed:', err));
    }
    isPlaying = !isPlaying;
  });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const messages = [
    "Some moments are quiet, yet unforgettable.",
    "Some gestures say more than words ever could.",
    "Today is a small reminder of warmth and kindness.",
    "So here is a rose — simple, sincere, full of meaning."
  ];

  let messageIndex = 0;
  let charIndex = 0;
  const dialogueEl = document.getElementById("dialogue");
  const typingSpeed = 50;
  const pauseTime = 2500;

  function typeText() {
    if (charIndex < messages[messageIndex].length) {
      dialogueEl.textContent += messages[messageIndex][charIndex];
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      setTimeout(() => {
        dialogueEl.textContent = "";
        charIndex = 0;
        messageIndex = (messageIndex + 1) % messages.length;
        typeText();
      }, pauseTime);
    }
  }

  typeText();
}

// ===== MAIN CONTROLS =====
function initControls() {
  const revealBtn = document.getElementById("revealBtn");
  const rose = document.getElementById("rose");
  const roseGlow = document.querySelector('.rose-glow');
  const successMessage = document.getElementById('successMessage');
  
  revealBtn.addEventListener("click", () => {
    // Hide button with smooth transition
    revealBtn.classList.add('hidden');
    
    // Show rose with animation
    setTimeout(() => {
      rose.classList.add("show");
      roseGlow.classList.add("show");
    }, 200);
    
    // Show success message
    setTimeout(() => {
      successMessage.classList.remove('hidden');
      successMessage.classList.add('show');
    }, 1000);
    
    // Start confetti
    startConfetti();
    
    // Update heart count
    updateHeartCount();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') toggleTheme();
    if (e.key.toLowerCase() === 'm') document.getElementById('musicToggle').click();
    if (e.key === 'Enter' && !revealBtn.classList.contains('hidden')) {
      revealBtn.click();
    }
  });
}

// ===== PARTICLES SYSTEM =====
function initParticles() {
  const container = document.getElementById('particles');
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }

  setInterval(() => {
    createParticle(container);
  }, 3000);
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 5 + 's';
  particle.style.animationDuration = (8 + Math.random() * 4) + 's';
  
  container.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 12000);
}

// ===== CONFETTI SYSTEM =====
let confetti = [];
let animationFrameId = null;

function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create confetti pieces
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push(createConfettiPiece());
  }

  animateConfetti(ctx, canvas);

  // Stop after 5 seconds
  setTimeout(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, 5000);
}

function createConfettiPiece() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  return {
    x: centerX + (Math.random() - 0.5) * 300,
    y: centerY + (Math.random() - 0.5) * 200,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 10 - 5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    size: Math.random() * 8 + 4,
    color: ['#ff6b9d', '#ff8fb3', '#ffa8c5', '#ffb3c1', '#ff758f'][Math.floor(Math.random() * 5)],
    life: 1,
    decay: Math.random() * 0.01 + 0.008
  };
}

function animateConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, idx) => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.globalAlpha = c .life;
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    ctx.restore();

    // Update confetti
    c.x += c.vx;
    c.y += c.vy;
    c.vy += 0.3; // gravity
    c.rotation += c.rotationSpeed;
    c.life -= c.decay;

    // Remove dead confetti
    if (c.life <= 0 || c.y > canvas.height) {
      confetti.splice(idx, 1);
    }
  });

  if (confetti.length > 0) {
    animationFrameId = requestAnimationFrame(() => animateConfetti(ctx, canvas));
  }
}

// ===== HEART COUNT =====
function updateHeartCount() {
  const counter = document.getElementById('heartCount').querySelector('span');
  let count = parseInt(localStorage.getItem('heartCount') || '0');
  count++;
  localStorage.setItem('heartCount', count);
  
  // Animate count update
  counter.style.transform = 'scale(1.5)';
  setTimeout(() => {
    counter.textContent = count;
    setTimeout(() => {
      counter.style.transform = 'scale(1)';
    }, 200);
  }, 100);
}

function loadHeartCount() {
  const count = localStorage.getItem('heartCount') || '0';
  document.getElementById('heartCount').querySelector('span').textContent = count;
}

// ===== RESPONSIVE CANVAS =====
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// ===== ADD SMOOTH SCROLL =====
document.documentElement.style.scrollBehavior = 'smooth';
