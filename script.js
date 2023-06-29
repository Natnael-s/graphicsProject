const canvas = document.getElementById("sunsetCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#0c1445");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawStar(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();
}

for (let i = 0; i < 100; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.4;
  const size = Math.random() * 2;
  drawStar(x, y, size);
}

function drawGlow(x, y, radius) {
  const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
  glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
  glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.beginPath();
  ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = glowGradient;
  ctx.fill();
}

async function drawMoon(x, y, radius) {
  const img = new Image();
  img.src = "moon3.jpg";
  img.crossOrigin = "anonymous";
  await new Promise((resolve) => {
    img.onload = () => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
      resolve();
    };
  });
}

function drawAsphaltRoad() {
  // Draw the dark asphalt road
  ctx.fillStyle = "#262626";
  ctx.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height * 0.2);

  // Draw dashed lane markings
  ctx.beginPath();
  ctx.setLineDash([10, 10]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#F0E68C";
  ctx.moveTo(0, canvas.height * 0.9);
  ctx.lineTo(canvas.width, canvas.height * 0.9);
  ctx.stroke();
  ctx.setLineDash([]);
  // drawCars();
}

const moonX = canvas.width * 0.9;
const moonY = canvas.height * 0.1;
const moonRadius = 30;
drawGlow(moonX, moonY, moonRadius);
drawMoon(moonX, moonY, moonRadius);
drawAsphaltRoad();

function drawSidewalkLights() {
  const lightSpacing = canvas.width / 5;

  for (let i = 0.5; i < 5; i++) {
    const lightX = i * lightSpacing;
    const lightYTop = canvas.height * 0.6;
    const lightYBottom = canvas.height * 0.8;

    // Draw the glowing light and light pole for the top side only
    drawGlowingLightAndPole(lightX, lightYTop, lightYBottom);

    // Draw trees between the poles
    if (i < 5) {
      const treeX = lightX + lightSpacing / 2;
      const treeY = canvas.height * 0.6;
    
    }
  }
}



function drawGlowingLightAndPole(lightX, lightYTop, lightYBottom) {
  // Draw the glowing light
  const glowRadius = 20;
  const glowGradient = ctx.createRadialGradient(lightX, lightYTop, 0, lightX, lightYTop, glowRadius);
  glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
  glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.beginPath();
  ctx.arc(lightX, lightYTop, glowRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = glowGradient;
  ctx.fill();

  // Draw the light pole
  ctx.beginPath();
  ctx.strokeStyle = "darkgray";
  ctx.lineWidth = 4;
  ctx.moveTo(lightX, lightYTop);
  ctx.lineTo(lightX, lightYBottom);
  ctx.stroke();
}

drawSidewalkLights();

//=================================================Animating walking man==================================================




let walkingManImg = new Image();
walkingManImg.src = 'manwalking.jpg';

let xIndex = 0;
let yIndex = 0;
let cols = 5;
let rows = 4;
let spriteWidth = 8000 / 8;
let spriteHeight = 3098;
let frame = 0;
let walkingManX = 0;



function animateWalkingMan() {
  requestAnimationFrame(animateWalkingMan);

  // We'll redraw every frame to speed up the animation
  frame = (frame + 1) % 32; // We'll increment the frame here
  if (frame % 1 > 0) return; // We'll only draw every frame

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  xIndex = (frame / 1) % 8; // xIndex is now derived from the frame

  ctx.drawImage(walkingManImg,
    xIndex * spriteWidth, 0, spriteWidth, spriteHeight, 
    walkingManX++, canvas.height * 0.6 - spriteHeight, spriteWidth, spriteHeight); // Adjusted y-coordinate

  if (walkingManX > canvas.width) {
    walkingManX = 0;
  }
}


walkingManImg.onload = function() {
  console.log('Image loaded');
  animateWalkingMan();
};




