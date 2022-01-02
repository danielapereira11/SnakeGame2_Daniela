const mainText = document.getElementById("main-text");
const grid = document.getElementById("grid");
const scoreBoard = document.getElementById("score");
const startBtn = document.getElementById("btn-start");
const themeBtn = document.getElementById("btn-theme");
const sizeBtn = document.getElementById("btn-size");
const controlsBtn = document.getElementById("btn-controls");
var width = 20;
var gridArea = width * width;
var squares = [];
var snake = [2, 1, 0];
let score = 0;
let timer = 900;
let appleIndex = 0;
let timerId = 0;
let direction = 1;
let speed = 0.9;
let gameRunning = false;

scoreBoard.innerHTML = score;
let starterMainText = () => (mainText.innerHTML = "SN🐍KE G🐍ME");

function createGrid() {
  if (gameRunning === false) {
    squares = [];
    grid.innerHTML = "";
    if (sizeBtn.innerText === "Smaller grid ⬇") {
      for (let i = 0; i < gridArea; i++) {
        const square = document.createElement("div");
        sizeBtn.innerText = "Bigger grid ⬆";
        width = 10;
        gridArea = width * width;
        square.classList.remove("square-big-grid");
        square.classList.add("square", "square-small-grid");
        grid.appendChild(square);
        squares.push(square);
      }
    } else if (sizeBtn.innerText === "Bigger grid ⬆") {
      for (let i = 0; i < gridArea; i++) {
        const square = document.createElement("div");
        sizeBtn.innerText = "Smaller grid ⬇";
        width = 20;
        gridArea = width * width;
        square.classList.remove("square-small-grid");
        square.classList.add("square", "square-big-grid");
        grid.appendChild(square);
        squares.push(square);
      }
    }
    addSnakeClass();
  }
}
createGrid();

sizeBtn.addEventListener("click", createGrid);

function addSnakeClass() {
  snake.forEach((index) => squares[index].classList.add("snake"));
}
addSnakeClass();

function startGame() {
  gameRunning = true;
  snake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  snake = [2, 1, 0];
  score = 0;
  scoreBoard.innerHTML = score;
  direction = 1;
  timer = 900;
  generateApple();
  addSnakeClass();
  timerId = setInterval(movingSnake, timer);
}

function movingSnake() {
  if (
    (snake[0] % width === 19 && direction === 1 && width === 20) ||
    (snake[0] % width === 9 && direction === 1 && width === 10) ||
    (snake[0] % width === 0 && direction === -1) ||
    (snake[0] < width && direction === -width) ||
    (snake[0] >= gridArea - width && direction === width) ||
    squares[snake[0] + direction].classList.contains("snake")
  ) {
    mainText.innerHTML = "OUCH! 🐍";
    gameRunning = false;
    setTimeout(starterMainText, 1000);
    return clearInterval(timerId);
  }

  let snakeTail = snake.pop();
  squares[snakeTail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  squares[snake[0]].classList.add("snake");

  if (squares[snake[0]] === squares[appleIndex]) {
    mainText.innerHTML = "YUM! 🍎";
    setTimeout(starterMainText, 1500);
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
document.addEventListener("keydown", control);

// --- CHANGING THEME --- //

let screenBgImage = ["dirt-bg.JPG", "cloud-bg.JPG", "tree-bg.JPG"];
let gameBgImage = ["grass-bg.JPG", "cotton-bg.JPG", "wood-bg.JPG"];
let gameBgColor = [
  "rgb(134, 134, 134)",
  "rgb(214, 195, 212)",
  "rgb(236, 236, 236)",
];
let buttonBg = [
  "linear-gradient(100deg, #3ca55c, #b5ac49)",
  "linear-gradient(100deg, #bd8eb0, #6f9fbb)",
  "linear-gradient(100deg, #360b0a, #663c3c)",
];
let buttonBgInverse = [
  "linear-gradient(-100deg, #3ca55c, #b5ac49)",
  "linear-gradient(-100deg, #bd8eb0, #6f9fbb)",
  "linear-gradient(-100deg, #360b0a, #663c3c)",
];
let textColor = ["rgb(102, 165, 60)", "rgb(189, 142, 176)", "rgb(91, 37, 36)"];

let snakeColor = [
  "linear-gradient(180deg, brown, rgb(165, 112, 42))",
  "linear-gradient(180deg, rgb(184, 21, 62), rgb(150, 70, 94))",
  "linear-gradient(180deg, rgb(23, 151, 123), rgb(118, 221, 199))",
];

function theme(index) {
  mainText.style.color = textColor[index];
  scoreBoard.style.color = textColor[index];
  startBtn.style.background = buttonBg[index];
  themeBtn.style.background = buttonBg[index];
  sizeBtn.style.background = buttonBg[index];
  controlsBtn.style.background = buttonBg[index];
  grid.style.backgroundImage = `url("${gameBgImage[index]}")`;
  grid.style.backgroundColor = gameBgColor[index];
  document.querySelector(
    "body"
  ).style.backgroundImage = `url("${screenBgImage[index]}")`;

  document.documentElement.style.setProperty(
    "--snake-color",
    `${snakeColor[index]}`
  );
  document.documentElement.style.setProperty(
    "--btn-hover-focus",
    `${buttonBgInverse[index]}`
  );
}

function changeTheme() {
  let textColorStyle = getComputedStyle(mainText).color;
  if (textColorStyle === textColor[0]) {
    theme(1);
  } else if (textColorStyle === textColor[1]) {
    theme(2);
  } else {
    theme(0);
  }
}

themeBtn.addEventListener("click", changeTheme);

// --- END OF CHANGING THEME --- //

// ON-SCREEN CONTROLS DISPLAY //

function displayControls() {
  let controlsContainer = document.querySelector(".controls-container");
  let controlsDisplay = getComputedStyle(controlsContainer).display;
  if (controlsDisplay === "flex") {
    controlsContainer.style.setProperty("display", "none");
    controlsBtn.innerHTML = "Show Controls";
  } else {
    controlsContainer.style.setProperty("display", "flex");
    controlsBtn.innerHTML = "Hide Controls";
  }
}

controlsBtn.addEventListener("click", displayControls);

// END OF ON-SCREEN CONTROLS DISPLAY //
