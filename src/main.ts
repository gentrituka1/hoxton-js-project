import "./style.css";

let gameContainer = document.querySelector(".game-container");
let score = document.querySelector(".score");
let bird = document.querySelector(".bird");
let gameDisplay = document.querySelector(".game-container");
let ground = document.querySelector(".ground");
let sky = document.querySelector(".sky");

let bestScore = Number(localStorage.bestScore) || 0;
let birdLeft = 220;
let birdBottom = 200;
let gravity = 2;
let gap = 500;
let count = 0;
let obstacleBottom = 150;
let isGameOver = false;
let obstacleTimeoutID = null

function startGame() {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
}
let gameTimerId = setInterval(startGame, 20);

function control(event: any) {
  if (event.keyCode === 32) {
    jump();
  }
}

function jump() {
  if (birdBottom < 480) birdBottom += 50;
  bird.className = "bird-jump";
  bird.style.bottom = birdBottom + "px";
}

document.addEventListener("keyup", control);

function generateObstacle() {
    // if(isGameOver) return
    console.log(`generate obstacle`)
  let obstacleLeft = 500;
  let obstacle = document.createElement("div");
  let topObstacle = document.createElement("div");
  if (!isGameOver) {
    obstacle.className = "obstacle";
    topObstacle.className = "topObstacle";
  }

  let randomHeight = Math.floor(Math.random() * 60);
  obstacleBottom = randomHeight;

  obstacle.style.left = obstacleLeft + "px";
  topObstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  topObstacle.style.bottom = obstacleBottom + gap + "px";

  gameDisplay?.append(obstacle, topObstacle);

  function moveObstacle() {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";

    if (obstacleLeft === -60) {
      clearInterval(timerId);
      gameDisplay?.removeChild(obstacle);
      gameDisplay?.removeChild(topObstacle);
    }

    if (
      (obstacleLeft > 200 &&
        obstacleLeft < 280 &&
        birdLeft === 220 &&
        (birdBottom < obstacleBottom + 153 ||
          birdBottom > obstacleBottom + gap - 200)) ||
      birdBottom === 0
    ) {
      clearInterval(timerId);
      gameOver();
    }
    if (obstacleLeft < 220 && obstacleLeft > 217) {
      countPoints();
    }
  }

  let timerId = setInterval(moveObstacle, 20);
  
  if (!isGameOver) {
    obstacleTimeoutID =  setTimeout(generateObstacle, 3000)
    };
}

generateObstacle();

function gameOver() {
    if(isGameOver) return 
    console.log(`game over`)
  clearInterval(gameTimerId);
  clearTimeout(obstacleTimeoutID);
  document.removeEventListener("keyup", control);
  isGameOver = true;
  lostRender();
  if (count > bestScore) {
    bestScore = count;
    localStorage.bestScore = count;
  }

}

function lostRender() {
  if (isGameOver) {
    let sectionEl = document.createElement("section");
    sectionEl.className = "container";

    let divEl1 = document.createElement("div");
    divEl1.className = "score-div";

    let h1El1 = document.createElement("h1");
    h1El1.className = "text";
    h1El1.textContent = "SCORE";

    let spanEl1 = document.createElement("span");
    spanEl1.className = "score-points";
    spanEl1.textContent = `${count}`;

    let h1El2 = document.createElement("h1");
    h1El2.className = "text";
    h1El2.textContent = "BEST";

    let spanEl2 = document.createElement("span");
    spanEl2.className = "score-points";

    spanEl2.textContent = `${bestScore}`;

    divEl1.append(h1El1, spanEl1, h1El2, spanEl2);

    let divEl2 = document.createElement("div");
    divEl2.className = "buttons-container";

    let divEl3 = document.createElement("div");
    divEl3.className = "second-buttons-container";

    let buttonEl1 = document.createElement("button");
    buttonEl1.className = "button";
    buttonEl1.textContent = "RESTART";
    buttonEl1.addEventListener("click", () => {
      location.reload();
    });

    let buttonEl2 = document.createElement("button");
    buttonEl2.className = "button";
    buttonEl2.textContent = "SHARE";

    //if we need leaderboard table button

    divEl3.append(buttonEl1, buttonEl2);
    divEl2.append(divEl3);
    sectionEl.append(divEl1, divEl2);

    sky?.append(sectionEl);
  }
}

function countPoints() {
  score.textContent = "";

  let scorePoints = document.createElement("span");
  scorePoints.className = "score-points";
  scorePoints.textContent = `Score: ${++count}`;

  score.append(scorePoints);
}
