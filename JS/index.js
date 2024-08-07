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

let gameOver = false;

function drawGame() {
  if (gameOver) {
    showGameOverScreen();
    return;
  }

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    gameOver = true;
    updateHighScores();
    showGameOverScreen();
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  updateScore();
  updateHighScoresDisplay();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  // walls
  if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
    return true;
  }

  for (let i = 0; i < SnakeParts.length; i++) {
    let part = SnakeParts[i];
    if (part.x === headX && part.y === headY) {
      return true;
    }
  }

  return false;
}

function updateScore() {
  document.getElementById("score").textContent = "Score: " + score;
}

function updateHighScoresDisplay() {
  const highScoresList = document.getElementById("highScores");
  highScoresList.innerHTML = "High Scores:";
  highScores.forEach((highScore, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${highScore}`;
    highScoresList.appendChild(listItem);
  });
}

function updateHighScores() {
  highScores.push(score);
  highScores.sort((a, b) => b - a);
  highScores = highScores.slice(0, 5); // Mantém apenas os 5 melhores
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function clearScreen() {
  ctx.fillStyle = "#ccffcc"; // verde claro
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#006400"; // verde escuro
  for (let i = 0; i < SnakeParts.length; i++) {
    let part = SnakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  SnakeParts.push(new SnakePart(headX, headY));
  if (SnakeParts.length > tailLength) {
    SnakeParts.shift();
  }

  ctx.fillStyle = "black"; // cabeça da cobra em amarelo
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
  if (gameOver) {
    resetGame();
    return;
  }

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

function showGameOverScreen() {
  ctx.fillStyle = "black"; // texto preto
  ctx.font = "50px Verdana";
  ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  ctx.fillText(
    "Score: " + score + "pts",
    canvas.width / 6.5,
    canvas.height / 1.5
  );
  ctx.font = "20px Verdana";
  ctx.fillText(
    "Press any key to restart",
    canvas.width / 6.5,
    canvas.height / 1.2
  );
}

function resetGame() {
  headX = 10;
  headY = 10;
  SnakeParts.length = 0;
  tailLength = 2;
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  gameOver = false;
  drawGame();
}

drawGame();
