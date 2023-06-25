const canvas = document.getElementById("sunsetCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "black");
gradient.addColorStop(0.3, "black");
gradient.addColorStop(0.6, "black");
gradient.addColorStop(1, "black");
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
      drawTree(treeX, treeY);
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
async function drawTree(x, y) {
  const img = new Image();
  img.src = "treeImage.png"; // Replace this with the URL of the tree image you want to use
  img.crossOrigin = "anonymous";
  await new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, x - img.width / 2, y - img.height + 50);
      resolve();
    };
  });
}



