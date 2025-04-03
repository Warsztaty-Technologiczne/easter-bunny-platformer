import Player from "./player.js";
import Egg from "./egg.js";
import Platform from "./platform.js";
import { checkCollision } from "./collision.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = new Player(50, 300);
let eggs = [new Egg(300, 400), new Egg(500, 300), new Egg(700, 450)];
let platforms = [
  new Platform(200, 450, 100),
  new Platform(400, 350, 100),
  new Platform(600, 500, 100),
];

let score = 0;
let lastPlatformX = 600;
let lastEggX = 700;
let totalDistance = 0;

function generateNewPlatform() {
  const minGap = 150;
  const maxGap = 300;
  const gap = Math.random() * (maxGap - minGap) + minGap;

  const minY = 200;
  const maxY = 500;
  const y = Math.random() * (maxY - minY) + minY;

  const width = Math.random() * (150 - 80) + 80;

  lastPlatformX += gap;
  return new Platform(lastPlatformX, y, width);
}

function generateNewEgg() {
  const minGap = 200;
  const maxGap = 400;
  const gap = Math.random() * (maxGap - minGap) + minGap;

  const y = Math.random() * (450 - 200) + 200;

  lastEggX += gap;
  return new Egg(lastEggX, y);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    player.jump();
  }
});

// Touch controls
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    player.jump();
});

// Also allow mouse clicks for testing on desktop
canvas.addEventListener('click', () => {
    player.jump();
});

function gameLoop() {
  // Save the current canvas state
  ctx.save();

  // Clear the entire visible area (including translated space)
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the translation
  ctx.restore();

  // Update player
  player.update();
  player.x += player.speed;
  totalDistance += player.speed;

  // Generate new content
  if (totalDistance > lastPlatformX - canvas.width) {
    platforms.push(generateNewPlatform());
    // Remove platforms that are far behind
    platforms = platforms.filter((p) => p.x > totalDistance - canvas.width);
  }

  if (totalDistance > lastEggX - canvas.width) {
    eggs.push(generateNewEgg());
    // Remove collected eggs and eggs that are far behind
    eggs = eggs.filter((e) => !e.collected && e.x > totalDistance - canvas.width);
  }

  // Draw platforms
  platforms.forEach((platform) => {
    platform.draw(ctx);
    if (checkCollision(player, platform)) {
      player.y = platform.y - player.height;
      player.velY = 0;
      player.jumping = false;
    }
  });

  // Draw and check eggs
  eggs.forEach((egg) => {
    if (!egg.collected && checkCollision(player, egg)) {
      egg.collected = true;
      score++;
    }
    egg.draw(ctx);
  });

  // Draw player
  player.draw(ctx);

  // Draw score
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Eggs: ${score}`, 20, 30);
  ctx.restore();

  // Camera follow
  if (player.x > canvas.width / 2) {
    ctx.translate(-player.speed, 0);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
