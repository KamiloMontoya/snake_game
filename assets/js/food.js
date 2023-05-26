Food = function (parentHtmlElement) {
  const that = new Square(parentHtmlElement, {className: 'food'})
  const STEP = 15

  const maxX = parentHtmlElement.clientWidth
  const maxY = parentHtmlElement.clientHeight

  that.randomRender = function(){
    let x = Math.floor(Math.random()*STEP)*maxX/10
    let y = Math.floor(Math.random()*STEP)*maxY/10

    if (x >= maxX) x = maxX - STEP
    if (y >= maxY) y = maxY - STEP

    that.setPosition(x, y)
    that.renderElementHtml()
  }

  that.remove = function () {
    document.getElementById(that.elementHtmlId).remove() 
  }

  return that
}