
const POINTS = 10
const SPEED = 100

const containerGameHtml  = document.getElementById('container-game')
const scoreGameHtml  = document.getElementById('score-game')
const gameOverHtml = document.getElementById('game-over-container')
let score = 0


let food = Food(containerGameHtml)
food.randomRender()

const snake = Snake(containerGameHtml)
snake.render(5)

const checkGameOver = function() {
  const headPosition = snake.getHeadPosition()
  const itemsPositions = snake.getItemsPosition()

  for (const key in itemsPositions) {
    if (key > 0) {
      if (
        itemsPositions[key].x === headPosition.x &&
        itemsPositions[key].y === headPosition.y
      ){
        snake.stop()
        gameOverHtml.style.display = 'flex'
        gameOverHtml.innerHTML = '<div> Game Over! </div> <br/> <div> Score: ' + score + '</div>'
      }
    }
  }

}

const detectCollision = function() {
  if (
    food.getPosition().x === snake.getHeadPosition().x &&
    food.getPosition().y === snake.getHeadPosition().y
  ){
    const position = snake.getEndPosition()
    score += POINTS
    scoreGameHtml.innerHTML = 'Score: ' + score
    setTimeout( function () {
      snake.addItem(position.x, position.y)
      food.remove()
      food.randomRender()
    }, SPEED)
  }

  checkGameOver()
  
}

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
    case 'ArrowRight':
      if (snake.getHeadDirection() == "LEFT") return
      snake.moveLoop('RIGHT', SPEED)
      break
    case 'a':
    case 'ArrowLeft':
      if (snake.getHeadDirection() == "RIGHT") return
      snake.moveLoop('LEFT', SPEED)
      break
    case 'w':
    case 'ArrowUp':
      if (snake.getHeadDirection() == "DOWN") return
      snake.moveLoop('UP', SPEED)
      break
    case 's':
    case 'ArrowDown':
      if (snake.getHeadDirection() == "UP") return
      snake.moveLoop('DOWN', SPEED)
      break
  }
})

snake.handleMove = function () {
  detectCollision()
}