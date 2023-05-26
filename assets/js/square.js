Square = function (parentHtmlElement, params = {}) {

    const that = {}
    that.elementHtmlId = null

    const {initX = 0, initY = 0, className = 'square'} = params

    const STEP = 15
    let x = initX
    let y = initY
    let currentDirection = null
    const maxX = parentHtmlElement.clientWidth
    const maxY = parentHtmlElement.clientHeight


    that.getPosition = function () {
      return { x, y }
    }

    that.setPosition = function (posX, posY) {
      x = posX
      y = posY
      return that.getPosition()
    }

    that.getDirection = function () {
      return currentDirection
    }

    that.renderElementHtml = function () {
      that.elementHtmlId = `${className}-${Math.floor(Math.random()*1000)}`
      parentHtmlElement.innerHTML += `<div class="${className}" id="${that.elementHtmlId}" style="top:${y}px; left:${x}px;"> </div>`
    }

    that.move = function (direction) {
      switch (direction) {
        case "LEFT":
          x = ((x - STEP) < 0) ? maxX - STEP  : x - STEP
          break
        case "DOWN":
          y = ((y + STEP) >= maxY) ? 0 : y + STEP
          break
        case "RIGHT":
          x = ((x + STEP) >= maxX) ? 0 : x + STEP
          break
        case "UP":
          y = ((y - STEP) < 0) ? maxY - STEP : y - STEP
          break
      }

      const elementHtml = document.getElementById(that.elementHtmlId)
      elementHtml.style.top = `${y}px`
      elementHtml.style.left = `${x}px`
      currentDirection = direction
    }

    return that
}