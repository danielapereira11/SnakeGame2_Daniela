const mainText = document.getElementById("main-text");
const grid = document.getElementById("grid");
const scoreBoard = document.getElementById("score");
const startBtn = document.getElementById("btn-start");
let snake = [2, 1, 0];
let squares = [];
let score = 0;
scoreBoard.innerHTML = score;
const width = 10;
let timer = 1000;

function createGrid() {
  let i;
  for (i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

createSnake = () =>
  snake.forEach((index) => squares[index].classList.add("snake"));
createSnake();

function movingSnake() {
  let snakeHead = snake[0];
  let snakeTail = snake.pop();
  squares[snakeTail].classList.remove("snake");
  snake.unshift(snakeHead + 1);
  createSnake();
}

startGame = () => {
  let timerID = setInterval(movingSnake, timer);
};

startBtn.addEventListener("click", startGame);
