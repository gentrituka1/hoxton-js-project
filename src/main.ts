import './style.css'


<<<<<<< HEAD

=======
// document.addEventListener('DOMContentLoaded', () => {
>>>>>>> bf8276f058ed24bded7ce6d514286c1305fb5f1b
    let bird = document.querySelector('.bird')
    let gameDisplay = document.querySelector('.game-container')
    let ground = document.querySelector('.ground')
    let sky = document.querySelector('.sky')

    let birdLeft = 220
    let birdBottom = 200
    let gravity = 2
    let gap = 500
    type Count = number 
    let count : Count  = 0
    let obstacleBottom = 150
    let isGameOver = false
    

    function startGame(){
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(event : any){
        if(event.keyCode === 32){
            jump()
        }
    }

    function jump(){
        if(birdBottom < 480) birdBottom += 50
        bird.className = 'bird-jump'
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)

    function generateObstacle(){
        let obstacleLeft = 500
        let obstacle = document.createElement('div')
        let topObstacle = document.createElement('div')
        if(!isGameOver){
        obstacle.className = "obstacle"
        topObstacle.className = 'topObstacle'
    }

        let randomHeight = Math.floor(Math.random() * 60)
        obstacleBottom = randomHeight

        obstacle.style.left = obstacleLeft + 'px'  
        topObstacle.style.left =  obstacleLeft + 'px' 
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
        
        gameDisplay?.append(obstacle,topObstacle)
        
        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay?.removeChild(obstacle)
                gameDisplay?.removeChild(topObstacle)
            }    

            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200    ) || 
                birdBottom === 0 ){
                gameOver()
                clearInterval(timerId)
            }
            if (obstacleLeft < 220 && obstacleLeft > 217) {
               countPoints()
            }
        }

        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
 
    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        document.removeEventListener('keyup', control)
        lostRender()
        isGameOver = true
    }

    function lostRender() {
<<<<<<< HEAD
        if(isGameOver){
=======
        if(isGameOver === true){
        let gameContainer = document.querySelector('.game-container')

>>>>>>> bf8276f058ed24bded7ce6d514286c1305fb5f1b
        let sectionEl = document.createElement('section')
        sectionEl.className = 'container'

        let divEl1 = document.createElement('div')
        divEl1.className = 'score-div'

        let h1El1 = document.createElement('h1')
        h1El1.className = 'text'
        h1El1.textContent = 'SCORE'

        let spanEl1 = document.createElement('span')
        spanEl1.className = 'score-points'
        spanEl1.textContent = count

        let h1El2 = document.createElement('h1')
        h1El2.className = 'text'
        h1El2.textContent = 'BEST'

        let spanEl2 = document.createElement('span')
        spanEl2.className = 'score-points'
        
        spanEl2.textContent = '4'

        divEl1.append(h1El1, spanEl1, h1El2, spanEl2)

        let divEl2 = document.createElement('div')
        divEl2.className = 'buttons-container'

        let divEl3 = document.createElement('div')
        divEl3.className = 'second-buttons-container'

        let buttonEl1 = document.createElement('button')
        buttonEl1.className = 'button'
        buttonEl1.textContent = 'RESTART'
        buttonEl1.addEventListener('click', () => {
            location.reload()
        })

        let buttonEl2 = document.createElement('button')
        buttonEl2.className = 'button'
        buttonEl2.textContent = 'SHARE'

        //if we need leaderboard table button

        divEl3.append(buttonEl1, buttonEl2)
        divEl2.append(divEl3)
        sectionEl.append(divEl1 , divEl2)
<<<<<<< HEAD
        
        
        sky?.append(sectionEl)
      }
    }

    function countPoints() {  
            count++
            console.log(count)
    }
    

=======

        gameContainer.append(sectionEl)
        }
    }
    
// })
>>>>>>> bf8276f058ed24bded7ce6d514286c1305fb5f1b
