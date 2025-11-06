const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinButton");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
let deg = 0;
let isSpinning = false;

const prizes = [
  { name: "iPhone 16", color: "#ff7675" },
  { name: "Pixel 9a", color: "#74b9ff" },
  { name: "Rs 10,000", color: "#55efc4" },
  { name: "Nothing", color: "#ffeaa7" },
  { name: "40% Discount", color: "#fd79a8" },
  { name: "Dell Laptop", color: "#a29bfe" }
];

function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

function createConfetti(color){
  confetti = [];
  for (let i = 0; i < 200; i++){
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 5,
      color,
      tilt: Math.random() * 10 - 10
    });
  }
}

let confettiAnimationId = null;

function drawConfetti(){
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(p =>{
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti(){
  confetti.forEach(p =>{
    p.y += p.d / 2;
    if (p.y > confettiCanvas.height) p.y = -10;
  });
  confettiAnimationId = requestAnimationFrame(drawConfetti);
}

spinBtn.addEventListener("click", () =>{
  spinBtn.classList.add("spinning");
  if (isSpinning) return;
  isSpinning = true;

  const randomDeg = Math.floor(2000 + Math.random() * 3000);
  deg += randomDeg;

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() =>{
    isSpinning = false;

    const normalized = (deg % 360 + 360) % 360;
    const offset = 75;
    const adjustedDeg = (normalized + offset) % 360;

    const segment = Math.floor(adjustedDeg / 60);
    const prize = prizes[(6 - segment) % 6];

    showPopup(prize);
    spinBtn.classList.remove("spinning");
  }, 5200);
});

function showPopup(prize){
  popup.style.display = "flex";
  popupText.textContent = `🎉 You won: ${prize.name}!`;
  popupText.style.color = prize.color;

  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  createConfetti(prize.color);
  drawConfetti();
}

closePopup.addEventListener("click", () =>{
  popup.style.display = "none";
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
});

const heading = document.querySelector("h1");

heading.addEventListener("mouseenter", () =>{
  document.body.classList.add("heading-hover");
});

heading.addEventListener("mouseleave", () =>{
  document.body.classList.remove("heading-hover");
});
