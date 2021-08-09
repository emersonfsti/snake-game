let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

// Definir Campo do jogo
function criarBG() {
    // cor da tela
    context.fillStyle =  "lightgreen";
    // rgb(190,220,145);
    // tamanho da tela
    context.fillRect(0,0, 16 * box, 16 * box);
}
//iniciar function
criarBG();