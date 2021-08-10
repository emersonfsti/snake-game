let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// snake como array

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
//variavel placar
let score = 0;

// movimento
let direction = "rigth";

//variavel para drawApple
let apple = {
    x: Math.floor(Math.random() * 12 + 1) * box,
    y: Math.floor(Math.random() *12 + 1) * box
}
function criarLimite() {
    // cor da tela
    context.fillStyle =  "gray";
    context.fillRect(0,0, 16 * box, 14 * box);
}
// função Definir Campo do jogo
function criarBG() {
    // cor da tela
    context.fillStyle =  "rgb(190,220,145)";
    // tamanho da tela
    context.fillRect(32,32, 14 * box, 12 * box);
}

// criar maça
function drawApple() {
    
    context.fillStyle = "red";  
    context.fillRect(apple.x, apple.y, box, box);
}
// função criar snake (cobra)
function snakeLitle() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


//
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// função StartGame
function startGame(params) {

    
    // GAme OVer limie borda
    if(snake[0].x >= 15 * box && direction == "right") {
        clearInterval(game);
        alert('Game Over - Seu placar foi: ' + score);
        snakeLitle.context.fillStyle = "gray";
    };
    if(snake[0].x <= 0 * box && direction == "left")  {
        clearInterval(game);
        alert('Game Over - Seu placar foi: ' + score);
        snakeLitle.context.fillStyle = "gray";
    };
    if(snake[0].y >= 13* box && direction == "down") { 
        clearInterval(game);
        alert('Game Over - Seu placar foi: ' + score);
        snakeLitle.context.fillStyle = "gray";
    };
    if(snake[0].y <= 0 * box && direction == "up")  { 
        clearInterval(game);
        alert('Game Over - Seu placar foi: ' + score);
        snakeLitle.context.fillStyle = "gray";
    };

    // GAme OVer h=header
    for(h = 1 ; h < snake.length; h++){
        if(snake[0].x == snake[h].x && snake[0].y == snake[h].y){
            clearInterval(game);
            alert('Game Over - Seu placar foi: ' + score);
        }
    }


criarLimite();
    criarBG();
    
    drawApple();
    snakeLitle();
    

    // position start snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direção que incremeta 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // aumentar tamanho da cobra
    if(snakeX != apple.x || snakeY != apple.y){ 
        snake.pop();
    }else{
       apple.x =  Math.floor(Math.random() * 12 + 1) * box;
       apple.y = Math.floor(Math.random() *12 + 1) * box;
       score++;
    }
   

    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);
    context.fillStyle = "white";
    context.font = "38px Changa One";
    context.fillText(score, 16, 32);
    
}


//iniciar function
let game = setInterval(startGame, 190);
