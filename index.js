const mainText = document.getElementById("main-text");
const grid = document.getElementById("grid");
const scoreBoard = document.getElementById("score");
const startBtn = document.getElementById("btn-start");
const width = 10;
const gridArea = width * width;
let snake = [2, 1, 0];
let squares = [];
let score = 0;
let timer = 1000;
let appleIndex = 0;
let direction = 1;

scoreBoard.innerHTML = score;

function createGrid() {
  let i;
  for (i = 0; i < gridArea; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

snake.forEach((index) => squares[index].classList.add("snake"));

function generateApple() {
  appleIndex = Math.floor(Math.random() * gridArea);
  if (squares[appleIndex].classList.contains("snake") === false) {
    squares[appleIndex].classList.add("apple");
  }
}

function movingSnake() {
  let snakeHead = snake[0];
  let snakeTail = snake.pop();
  squares[snakeTail].classList.remove("snake");
  snake.unshift(snakeHead + direction);
  snake.forEach((index) => squares[index].classList.add("snake"));
}

}

startGame = () => {
  generateApple();
  let timerID = setInterval(movingSnake, timer);
};

startBtn.addEventListener("click", startGame);
