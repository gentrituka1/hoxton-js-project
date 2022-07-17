import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    let bird = document.querySelector('.bird')
    let gameDisplay = document.querySelector('.game-container')
    let ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let obstacleLeft = 500
    let obstacleBottom = 150

    function startGame(){
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let timerId = setInterval(startGame, 20)

    function control(e){
        if(e.keyCode === 32){
            jump()
        }
    }


    function jump(){
        if(birdBottom < 480) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup', control)

    function generateObstacle(){
        let obstacle = document.createElement('div')
        obstacle.className = "obstacle"

        let randomHeight = Math.floor(Math.random() * 60)
        obstacleBottom = randomHeight

        gameDisplay?.append(obstacle)

        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay?.removeChild(obstacle)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        setTimeout(generateObstacle, 3000)
    }
    generateObstacle()
})
