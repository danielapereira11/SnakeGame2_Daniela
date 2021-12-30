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
let timerId = 0;
let direction = 1;
let speed = 0.9;

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

function startGame() {
  snake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  snake = [2, 1, 0];
  score = 0;
  scoreBoard.innerHTML = score;
  direction = 1;
  timer = 1000;
  generateApple();
  snake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(movingSnake, timer);
}

function movingSnake() {
  if (
    (snake[0] % width === Math.floor(9) && direction === 1) ||
    (snake[0] % width === 0 && direction === -1) ||
    (snake[0] < width && direction === -width) ||
    (snake[0] >= gridArea - width && direction === width) ||
    squares[snake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }

  let snakeTail = snake.pop();
  squares[snakeTail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  squares[snake[0]].classList.add("snake");

  if (squares[snake[0]] === squares[appleIndex]) {
    squares[appleIndex].classList.remove("apple");
    squares[appleIndex].classList.add("snake");
    snake.push(snakeTail);
    squares[snakeTail].classList.add("snake");
    generateApple();
    score++;
    scoreBoard.innerHTML = score;
    clearInterval(timerId);
    timer = timer * speed;
    timerId = setInterval(movingSnake, timer);
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * gridArea);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
  // SEE WHATS GOING ON HERE, BECAUSE NO LONGER IS TAKING INTO CONSIDERATION WHERE THE SNAKE IS!!!!!
}

function control(e) {
  switch (e.key) {
    case "ArrowDown":
      direction = width;
      break;
    case "ArrowUp":
      direction = -width;
      break;
    case "ArrowRight":
      direction = 1;
      break;
    case "ArrowLeft":
      direction = -1;
  }
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keyup", control);
