import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    let bird = document.querySelector('.bird')
    let gameDisplay = document.querySelector('.game-container')
    let ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 200
    let gravity = 2
    let gap = 500
    
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
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)

    function generateObstacle(){
        let obstacleLeft = 500
        let obstacle = document.createElement('div')
        let topObstacle = document.createElement('div')
        if(!isGameOver){
        obstacle.className = "obstacle"
        topObstacle.className = 'topObstacle'}

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

            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200 ) || //we have to fix this
                birdBottom === 0 ){
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
 
    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
        
    }
    
})
