Snake = function (containerGameHtml) {
  const that = {}
  const STEP = 15
  let snakeItems = []
  let interval = null
  let breakPoints = []

  that.render = function(countElements = 1) {
    for (let i = (countElements - 1); i >= 0; i--) {
      const className = i ==  (countElements - 1) ? 'square-head' : 'square'
      const direction =  'RIGHT' 
      that.addItem(i*STEP, 0, direction ,className)
    }
  }

  that.handleMove = function () {}

  that.getItemsPosition = function () {
    return snakeItems.length ?
      snakeItems.map(
        function (item) {
          return item.square.getPosition()
        }
      )
      : []
  }

  that.getHeadPosition = function () {
    return snakeItems.length ?
      snakeItems[0].square.getPosition()
      : { x: 0, y: 0 }
  }

  that.getHeadDirection = function () {
    return snakeItems.length ?
      snakeItems[0].direction
      : null
  }

  that.getEndPosition = function () {
    return snakeItems.length ?
      snakeItems[ snakeItems.length - 1 ].square.getPosition()
      : { x: 0, y: 0 }
  }

  that.moveLoop = function(direction, duration = 300) {
    breakPoints.push({
      x: snakeItems[0].square.getPosition().x,
      y: snakeItems[0].square.getPosition().y,
      counter: 0,
      direction,
    });

    if(!interval) {
      interval = setInterval( () => {
        for (const key in snakeItems) {
          const square = snakeItems[key].square
          const prevDirection = snakeItems[key].direction

          let hasBreakpoint = false
          let breakPointDirection = null
          for (const b in breakPoints) {
            const breakPoint = breakPoints[b]
            if (  
              square.getPosition().x === breakPoint.x &&
              square.getPosition().y === breakPoint.y
            ){
              hasBreakpoint = true
              breakPointDirection = breakPoint.direction
              breakPoints[b].counter += 1
            }

            if (breakPoints[b].counter === snakeItems.length){
              delete breakPoints[b]
            }
          }

          if (hasBreakpoint){
            square.move(breakPointDirection)
            snakeItems[key].direction = breakPointDirection
          } else if (prevDirection) {
            square.move(prevDirection)
          }

        }
        that.handleMove()

      }, duration)
    }
  }

  that.stop = function() {
    clearInterval(interval);
    interval = null
  }

  that.addItem = function (x = 0, y = 0, direction = 'RIGHT', className = 'square'){
    const square = Square(containerGameHtml, {
      initX: x,
      initY: y,
      className
    });
    snakeItems.push({
      square,
      direction: snakeItems.length ? snakeItems[snakeItems.length - 1].direction : direction
    })
    square.renderElementHtml()
  }

  return that
}