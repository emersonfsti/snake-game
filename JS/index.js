const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.body.addEventListener("keydown", keyDown);

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLength = 2;

// Maça
let appleX = 5;
let appleY = 5;

// Velocidade
let xVelocity = 0;
let yVelocity = 0;

// Placar
let score = 0;

// Ranking
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    updateHighScores();
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  drawHighScores();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  // walls
  if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < SnakeParts.length; i++) {
    let part = SnakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    ctx.fillText(
      "Score: " + score + "pts",
      canvas.width / 6.5,
      canvas.height / 1.5
    );
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

function drawHighScores() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("High Scores:", canvas.width - 120, 30);
  highScores.forEach((highScore, index) => {
    ctx.fillText(
      `${index + 1}. ${highScore}`,
      canvas.width - 120,
      40 + index * 10
    );
  });
}

function updateHighScores() {
  highScores.push(score);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5); // Mantém apenas os 5 melhores
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < SnakeParts.length; i++) {
    let part = SnakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  SnakeParts.push(new SnakePart(headX, headY));
  if (SnakeParts.length > tailLength) {
    SnakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function keyDown(event) {
  // up snake
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  // down snake
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  // left snake
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  // right snake
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
