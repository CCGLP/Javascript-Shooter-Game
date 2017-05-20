class TextSprite extends GameObject{
  constructor(text, positionX, positionY, renderOrder, color){
    super()
    this.text = text;
    this.height = 40;
    this.width = 40 * this.text.length;
    this.positionX = positionX;
    this.positionY = positionY;
    this.renderOrder = renderOrder;
    this.color = color;
    window.renderer.addNewElementToRender(this)
  }


  static changeCanvasFont(font){
    window.renderer.ctx.font = font;
  }

  static changeCanvasTextAlign(textalign){
    window.renderer.ctx.textAlign = textalign
  }

  changeText(text){
    this.text = text
  }
  changePosition(x,y){
    this.positionX = x
    this.positionY = y
  }

  tick(){
    super.tick()
  }
}
