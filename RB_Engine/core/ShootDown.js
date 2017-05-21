class Bullet extends Sprite{
  constructor(width,height,positionX, positionY, spriteImage, renderOrder = 0, widthScreen, heightScreen){
    super(width, height, positionX, positionY, spriteImage, renderOrder)
    this.speedX = 0
    this.speedY = 0
  }
  tick(){
    super.tick()
    if (this.positionX > widthScreen){
      this.remove()
    }
    else if (this.positionX < 0 - this.width){
      this.remove()
    }

    if (this.positionY > heightScreen){
      this.remove()
    }
    else if (this.positionY < 0 - this.height){
      this.remove()
    }

  }

}

function pepe (){
     var bull = new Bullet(4,4, 120, 120, "cuadradito.png",0, widthScreen, heightScreen)
     bull.speedY = 3;
    window.requestAnimationFrame(pepe)
}
var widthScreen = 600;
var heightScreen = 600;

var engine = new Engine(widthScreen, heightScreen)

engine.start()
var textPause = new TextSprite("PAUSE", 3000, 3000, 0, "white")

var ESC = false

window.requestAnimationFrame(pepe)

document.addEventListener('keydown', function(event) {
  if (!ESC){

    if (event.keyCode == 37){ //LEFT
     
    }
    else if (event.keyCode == 38){ //UP
     var bull = new Bullet(4,4, 120, 120, "cuadradito.png",0, widthScreen, heightScreen)
     bull.speedY = 2; 

    }
    else if (event.keyCode == 39){ // RIGHT
     
    }
    else if (event.keyCode == 40){ //DOWN
    
    }
    }
     if (event.keyCode == 27){
        ESC = !ESC
        if (ESC){
            textPause.changePosition(widthScreen/2 - textPause.width /2, heightScreen/2 - textPause.height/2)

        }
        else{
          textPause.changePosition(2000,2000)
        }
      }
});