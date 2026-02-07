const dialogueText = [
  "Some moments are quiet, yet unforgettable.",
  "Some gestures say more than words ever could.",
  "Today is a small reminder of warmth, kindness, and care.",
  "So here is a rose — simple, sincere, and full of meaning."
];

let index = 0;
let charIndex = 0;
const dialogueEl = document.getElementById("dialogue");
const revealBtn = document.getElementById("revealBtn");
const rose = document.getElementById("rose");

function typeText() {
  if (charIndex < dialogueText[index].length) {
    dialogueEl.textContent += dialogueText[index][charIndex];
    charIndex++;
    setTimeout(typeText, 50);
  } else {
    setTimeout(() => {
      dialogueEl.textContent = "";
      charIndex = 0;
      index = (index + 1) % dialogueText.length;
      typeText();
    }, 1800);
  }
}

typeText();

revealBtn.addEventListener("click", () => {
  rose.classList.add("show");
  revealBtn.style.display = "none";
  startPetals();
});

/* 🌸 Falling petals animation */
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];

function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 2 + 1,
    drift: Math.random() * 1 - 0.5
  };
}

function startPetals() {
  for (let i = 0; i < 40; i++) {
    petals.push(createPetal());
  }
  animatePetals();
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 105, 135, 0.8)";
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.speed;
    p.x += p.drift;

    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animatePetals);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
