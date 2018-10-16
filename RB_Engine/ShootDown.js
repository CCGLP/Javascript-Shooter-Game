//Custom classes and functions for the game.

function Die(){
    die = true
    
    window.physics.triggerPause()
    gameUpdate.timer = 300000; 
    setTimeout(function(){
        location.reload()
    },3000)
}



class GameUpdate extends GameObject{
    
    constructor(){
        super()
        this.timer = 30000;
        this.timerSecond = 0; 
    }
    
    tick(){
       this.handleTimers();
    }
    
   
    
    handleTimers(){
         if (!ESC){
            this.timer+= 1000/60
            this.timerSecond+= 1000/60
            if (this.timer > roundTime * 1000){
                this.newRound()
                this.timer = 0; 
                
            }
            
            if (this.timerSecond > 1000 ){
                if (Math.random() > 0.9){
                    var powerup = new Powerup()
                }
                else{
                    var asteroid = new Asteroid()
                }
                this.timerSecond = 0
            }
        }
    }
    
    newRound(){
         roundText.positionX = 225; 
         roundText.positionY = 300;
        if (!die){
            asteroidCount+= 3;
            roundNumber++
            if (roundTime > 6){
                roundTime--
            }

            roundText.changeText("Round " +roundNumber )

            for(var i = 0; i < asteroidCount; i++){
                var asteroid = new Asteroid()
            }


            setTimeout(function(){
                roundText.positionX = 3000
                roundText.positionY = 3000
            }, roundTextTime)

          //  setTimeout(NewRound, roundTime * 1000)
        }
        else{
            roundText.changeText("GameOver")
        }
    }
}
  




class Bullet extends PhysicSprite{
    
 constructor(shootIndex = 0){
    super(16, 16, shootPoints[shootIndex].x, shootPoints[shootIndex].y, "bullet.png", 16,16, false, 0, 1, 0, 1, false)
    this.tag = 'bullet'
    
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




class Asteroid extends PhysicSprite{
    constructor(){
        var tileX = GetRandomNumberBetween(0,8)
        var tileY = GetRandomNumberBetween(0,8)
        var size = GetRandomNumberBetween(16, 64)
        var positionX = GetRandomNumberBetween(100, 500)
        var positionY = GetRandomNumberBetween(-size, -size *3)
        var speedX = GetRandomNumberBetween(-30, 30)
        var speedY = GetRandomNumberBetween(10,200)
        
        super(size, size, positionX,positionY, "asteroids_sheet.png", asteroidTileSize, asteroidTileSize,false, 0,1,0,1,true, tileX * asteroidTileSize, tileY * asteroidTileSize)
        this.setVelocity(speedX, speedY)
        this.tag = "asteroid"
       this.timer = 0
    }
    
    tick(){
        super.tick()
        if (!ESC){
            this.timer += 1000/60
            if (this.timer > 10000){
                this.timer = 0
                if (this.positionY < -this.height){
                    this.remove()
                }
            }
        }
        
    }
}





class Powerup extends Asteroid{
    constructor(){
        super()
        this.tag = 'powerup'
        this.image.src = "powerUp.png"
        this.sx = 0
        this.sy = 0
        this.heightTile = 512
        this.widthTile = 512
    }
}





class Base extends PhysicSprite{
    constructor(){
        super(256,256, 300 - 128, 600-100, "base.png", 256, 256, true, 0,1,0,1,false)
        this.life = 10; 
        this.tag = "base"
        this.timeAnimation = 500
        this.timer = 0
        this.frameX = 0
        this.frameY = 0
    }
    
    tick(){
        super.tick()
        this.timer+= 1000/60
        if (this.timer > this.timeAnimation){
            this.timer = 0
            this.nextAnim()
        }
    }
    
    nextAnim(){
        if (this.frameX == 0){
            this.frameX ++;
        }
        else if(this.frameY == 0){
            this.frameX = 0
            this.frameY = 1
        }
        else{
            this.frameX = 0
            this.frameY = 0
        }
        
        this.sx = this.frameX * 256
        this.sy = this.frameY * 256
    }
    
    minusLife(){
        this.life--
        if (this.life <= 0){
            Die();
        }
    }
}



class Listener extends Box2D.Dynamics.b2ContactListener{
    constructor(){
        super()
    }
    
    HandleBullet(bullet,other){
         if (bullet.spriteParent.tag == "bullet"){
            if (other.spriteParent.tag == "asteroid"){
                bullet.spriteParent.remove()
                other.spriteParent.remove()
                window.audioHandler.playAudio(explosionIndexAudio)
            }
             
            if (other.spriteParent.tag == "powerup"){
                bullet.spriteParent.remove()
                
                other.spriteParent.remove();
                powerUpActive = 20;
                
            }
        }
    }
    
    HandleBase(base, other){
        if (base.spriteParent.tag == "base"){
            if (other.spriteParent.tag == "asteroid"){
                base.spriteParent.minusLife();
                other.spriteParent.remove()
                window.audioHandler.playAudio(explosionIndexAudio)
            }
        }
    }
    
    BeginContact(contact){
        super.BeginContact(contact)
        
        var x = contact.GetFixtureA().GetBody(); 
        var y = contact.GetFixtureB().GetBody();
        this.HandleBullet(x,y)
        this.HandleBullet(y,x)
        this.HandleBase(x,y)
        this.HandleBase(y,x)
    }
    
}





//Engine SetUP and code

var widthScreen = 600;
var heightScreen = 600;
var shootPoints = [new Vector2(300,475), new Vector2(500, 550), new Vector2(100,550)]
var asteroidTileSize = 1024/8
var asteroidCount = 2; 
var roundTime = 15; 
var roundTextTime = 2000;
var roundNumber = 0; 
var die = false
var timeOutNewRound;
var powerUpActive = 0;


var engine = new Engine(widthScreen, heightScreen)
engine.start()
TextSprite.changeCanvasFont("42px Arial")


var ground = new PhysicSprite(600, 10, 0, 590, "square.png", 16,16,true, 0,1,0,1)
var wallLeft = new PhysicSprite(10, 600, 0,0, "square.png",16,16 ,true,0,1,0,1)
var wallRight = new PhysicSprite(10,600,590, 0, "square.png",16,16, true, 0,1,0,1)


var base = new Base()
window.audioHandler.setAudio("greys.mp3", true)
var explosionIndexAudio = window.audioHandler.setAudio("Explosion11.wav", false, false)

var listener = new Listener(); 
window.physics.world.SetContactListener(listener)


var textPause = new TextSprite("PAUSE", 3000, 3000, 10, "white")
var roundText = new TextSprite("Round 1", 3000, 3000, 10, "white")

var gameUpdate = new GameUpdate();





var ESC = false



//Pause control

document.addEventListener('keydown', function(event) {
 
     if (event.keyCode == 27){
        ESC = !ESC
        if (ESC){
            textPause.changePosition(widthScreen/2 - textPause.width /2, heightScreen/2 - textPause.height/2)
            window.physics.triggerPause()
        }
        else{
          textPause.changePosition(2000,2000)
            window.physics.triggerPause()
        }
      }
});


//Click control

window.canvas.addEventListener('click', function(evt){
    if (!ESC){
        for (var i = 0; i< shootPoints.length; i++){
            var mouseP = getMousePos(window.canvas, evt)

            var bullet = new Bullet(i)
            var vectorNor = mouseP.getDirectionFrom(shootPoints[i])
            vectorNor.normalize()
            vectorNor.multiplierScalar(700)
            bullet.setVelocity(vectorNor.x, vectorNor.y)
            
           if (powerUpActive <= 0){
               break; 
           }
        
        }
        powerUpActive--; 
        
    }
    

},false)
