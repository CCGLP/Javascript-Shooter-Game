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

      for (var i = 0; i < chunks.length; i++){
          if (checkCollisionBetweenSprites(this, chunks[i])){
              console.log("HIHI")
              chunks[i].damageDone()
              this.remove()
          }
      }
      
  }

}


class Chunk extends Sprite{
    constructor(spriteImage, renderOrder = 0){
        var size = GetRandomNumberBetween(20,50);
        var positionX = GetRandomNumberBetween(size, widthScreen-size)
        var positionY = GetRandomNumberBetween(size, size*3)
        
        super(size, size, positionX, -positionY, spriteImage, renderOrder);
        var targetPos = new Vector2(GetRandomNumberBetween(0,widthScreen),heightScreen)
        var position = new Vector2(positionX, positionY)
        var normalizedSpeed = targetPos.getDirectionFrom(position)
        normalizedSpeed.normalize()
        
        normalizedSpeed.multiplierScalar(GetRandomNumberBetween(1, 2))
        this.speed = normalizedSpeed
    }
    tick(){
        super.tick();
        this.rotation += 44; 
        if (this.rotation > 360)
            this.rotation/= 360
    }
    damageDone(){
        this.width -= 2;
        this.height -= 2;
        if (this.width < 10){
            for (var i = 0; i< chunks.length; i++){
                if (chunks[i] == this){
                    chunks.splice(i,1);
                    break;
                }
            }
            this.remove();
            
        }
    }
    
}



var shootPoint = new Vector2(300,550)

function pepe (){
     var bull = new Bullet(4,4, 120, 120, "cuadradito.png",0, widthScreen, heightScreen)
     bull.speedByFrame(3,3)
    window.requestAnimationFrame(pepe)
}


var widthScreen = 600;
var heightScreen = 600;


var engine = new Engine(widthScreen, heightScreen)
engine.start()


var textPause = new TextSprite("PAUSE", 3000, 3000, 0, "white")

var chunks = []
for (var i = 0; i < 10; i++){
    chunks[i] = new Chunk("cuadradito.png")
    chunks[i].rotation = 40
}

var ESC = false

//window.requestAnimationFrame(pepe)

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


window.canvas.addEventListener('click', function(evt){
    var mouseP = getMousePos(window.canvas, evt)
    
    var bullet = new Bullet(4,4,shootPoint.x, shootPoint.y, "cuadradito.png", 0, widthScreen, heightScreen)
    var vectorNor = mouseP.getDirectionFrom(shootPoint)
    vectorNor.normalize()
    vectorNor.multiplierScalar(5)
    bullet.speed = vectorNor
  
    
},false)
