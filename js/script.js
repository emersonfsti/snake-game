let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// snake como array
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// função Definir Campo do jogo
function criarBG() {
    // cor da tela
    context.fillStyle =  "lightgreen";
    // rgb(190,220,145);
    // tamanho da tela
    context.fillRect(0,0, 16 * box, 16 * box);
}
// função criar snake (cobra)
function snakeLitle() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//iniciar function
criarBG();
snakeLitle();