const mainText = document.getElementById("main-text");
const gameBoard = document.getElementById("main-game");
const scoreBoard = document.getElementById("score");
const startBtn = document.getElementById("btn-start");

let score = 0;
scoreBoard.innerHTML = score;

let snake = [2, 1, 0];
let gameSquare = [];

function addSnake() {
  let i;
  for (i = 0; i < snake.length; i++) {
    gameBoard.innerHTML += `<div class="square"></div>`;
  }
}

addSnake();
