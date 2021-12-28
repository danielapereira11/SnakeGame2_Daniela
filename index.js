const mainText = document.getElementById("main-text");
const grid = document.getElementById("grid");
const scoreBoard = document.getElementById("score");
const startBtn = document.getElementById("btn-start");
let snake = [2, 1, 0];
let squares = [];
let score = 0;
scoreBoard.innerHTML = score;
const width = 10;

function createGrid() {
  let i;
  for (i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    square.classList.add("square");
  }
}
createGrid();
