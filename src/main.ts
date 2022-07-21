import "./style.css";

let gameContainer = document.querySelector(".game-container");
let score = document.querySelector(".score");
let bird = document.querySelector(".bird");
let gameDisplay = document.querySelector(".game-container");
let ground = document.querySelector(".ground");
let sky = document.querySelector(".sky");
let overSky = document.querySelector(".over-sky");

let bestScore = Number(localStorage.bestScore) || 0;
let birdLeft = 220;
let birdBottom = 200;
let gravity = 2;
let gap = 500;
let count = 0;
let obstacleBottom = 150;
let isGameOver = false;
let obstacleTimeoutID = null;
let leaderboardArray = [];

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
    if (isGameOver) return
    console.log(`generate obstacle`)
    let obstacleLeft = 500;
    let obstacle = document.createElement("div");
    let topObstacle = document.createElement("div");
    if (!isGameOver) {
        obstacle.className = "obstacle";
        topObstacle.className = "topObstacle";
    }

    let randomHeight = Math.floor(Math.random() * 80);
    obstacleBottom = randomHeight;

    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    gameDisplay?.append(obstacle, topObstacle);

    function moveObstacle() {
        obstacleLeft -= 4;
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
        if (obstacleLeft < 220 && obstacleLeft > 216) {
            countPoints();
        }
    }

    let timerId = setInterval(moveObstacle, 20);

    if (!isGameOver) {
        obstacleTimeoutID = setTimeout(generateObstacle, 3000)
    };
}

generateObstacle();

function gameOver() {
    if (isGameOver) return
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

function postLeaderboardItem(username: string, score: number) {
    fetch('http://localhost:4000/leaderboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            score: score
        })
    }).then(response => { return response.json(); })
}

function getLeaderboardItems(){
    fetch('http://localhost:4000/leaderboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => { return response.json(); })
    .then(data => {
        leaderboardArray = data;
    })
}

function renderLeaderboard() {

    let leaderboard = document.createElement("section");
    leaderboard.className = "leaderboard";
    
    let leaderboardName = document.createElement("h2");
    leaderboardName.className = "leaderboard-name";
    leaderboardName.textContent = "Leaderboard";

    let leaderboardHeader = document.createElement("header");
    leaderboardHeader.className = "leaderboard-header";

    let rank = document.createElement("span");
    rank.textContent = "ID";
    let playerName = document.createElement("span");
    playerName.textContent = "Player Name";
    let score = document.createElement("span");
    score.textContent = "Score";

    leaderboardHeader.append(rank, playerName, score);

    let leaderboardData = document.createElement("main");
    leaderboardData.className = "leaderboard-data";

    for(let element of leaderboardArray){

      if (element.username !== localStorage.name){

      let playerData = document.createElement("ul");
      playerData.className = "player-data";

      let playerDataItem = document.createElement("li");
      playerDataItem.textContent = element.id;

      let playerDataItem2 = document.createElement("li");
      playerDataItem2.textContent = element.username;

      let playerDataItem3 = document.createElement("li");
      playerDataItem3.textContent = element.score;

      playerData.append(playerDataItem, playerDataItem2, playerDataItem3);
      leaderboardData.append(playerData);
      }
  }

    let restartLeaderboard = document.createElement("button");
    restartLeaderboard.className = "restart-button";
    restartLeaderboard.textContent = "Restart Leaderboard";
    restartLeaderboard.addEventListener("click", function(){
      // loop the json array and delete all items

      for(let element of leaderboardArray){
        fetch('http://localhost:4000/leaderboard/' + element.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => { return response.json(); })
      }
      getLeaderboardItems();

  })

    let restartButton = document.createElement("button");
    restartButton.className = "restart-button";
    restartButton.textContent = "Restart Game";
    restartButton.addEventListener("click", () => {
        location.reload();
    })

    let divEl = document.createElement("div");
    divEl.className = "leaderboardWhole";

    
    
    divEl.append(leaderboardHeader, leaderboardData)
    leaderboard.append(leaderboardName, divEl, restartLeaderboard, restartButton);
    document.body.append(leaderboard);
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
        buttonEl2.textContent = "LEADERBOARD";
        buttonEl2.addEventListener("click", () => {
          document.body.innerHTML = ''
            renderLeaderboard();
        }, {once : true});

        let form = document.createElement("form");
        form.className = "username-form";
        form.addEventListener('submit', function(event){
          event.preventDefault();
          
          localStorage.username = username.value;
          
          postLeaderboardItem(username.value, bestScore);

          username.style.display = "none";

          let h2El = document.createElement("h2");
          h2El.className = "leaderboard-check";
          h2El.textContent = `Done Check Leaderboard`;

          divEl2.append(h2El);

          getLeaderboardItems();
        })

        let username = document.createElement("input");
        username.className = "username";
        username.placeholder = "Enter your username";
    
        form.append(username);

        //if we need leaderboard table button

        divEl3.append(buttonEl1, buttonEl2);
        divEl2.append(divEl3);
        sectionEl.append(divEl1, divEl2, form);

        sky?.append(sectionEl);
    }
}

function countPoints() {
    score.textContent = "";

    let scorePoints = document.createElement("span");
    scorePoints.className = "score-points";
    scorePoints.textContent = `Score: ${++count}`;

    score?.append(scorePoints);
}

getLeaderboardItems();