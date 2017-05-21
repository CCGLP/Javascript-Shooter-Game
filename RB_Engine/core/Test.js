class Snake extends Sprite{
  constructor(width,height,positionX, positionY, spriteImage, renderOrder = 0, widthScreen, heightScreen){
    super(width, height, positionX, positionY, spriteImage, renderOrder)
    this.speedX = 0
    this.speedY = 0
  }
  tick(){
    super.tick()
    if (this.positionX > widthScreen){
      this.positionX = 1 - this.width
    }
    else if (this.positionX < 0 - this.width){
      this.positionX = widthScreen -1
    }

    if (this.positionY > heightScreen){
      this.positionY = 1 - this.height
    }
    else if (this.positionY < 0 - this.height){
      this.positionY = heightScreen -1
    }

  }

}
var widthScreen = 600;
var heightScreen = 600;

var engine = new Engine(widthScreen, heightScreen)

engine.start()
var snake = new Snake(64,64, 120, 120, "cuadradito.png",0, widthScreen, heightScreen)
var text = new TextSprite("lastKeyPressed: ", 150, 40,0, "white")
var textPause = new TextSprite("PAUSE", 3000, 3000, 0, "white")
TextSprite.changeCanvasFont("40px Arial")
var KEYUPLEFT, KEYUPRIGHT, KEYUPUP, KEYUPDOWN, ESC = false

document.addEventListener('keydown', function(event) {
  if (!ESC){

    text.changeText("lastKeyPressed: " + event.keyCode)
    if (event.keyCode == 37){
      snake.speedX = -3
      KEYUPLEFT = true
      snake.remove()
    }
    else if (event.keyCode == 38){
      snake.speedY = -3
      KEYUPUP= true
    }
    else if (event.keyCode == 39){
      //window.update.clearAllObjects();
     // window.renderer.clearAllRenders();
      snake.speedX = 3
      KEYUPRIGHT = true
    }
    else if (event.keyCode == 40){
      snake.speedY = 3
      KEYUPDOWN = true
    }
    }
     if (event.keyCode == 27){
        snake.speedX = 0
        snake.speedY = 0
        ESC = !ESC
        if (ESC){
            textPause.changePosition(widthScreen/2 - textPause.width /2, heightScreen/2 - textPause.height/2)

        }
        else{
          textPause.changePosition(2000,2000)
        }
      }
});

document.addEventListener('keyup', function(event){
  if (event.keyCode == 37 && KEYUPLEFT){
    snake.speedX = 0
    KEYUPLEFT = false
  }
  else if (event.keyCode == 38 && KEYUPUP){
    snake.speedY = 0
    KEYUPUP= false
  }
  else if (event.keyCode == 39 && KEYUPRIGHT){
    snake.speedX = 0
    KEYUPRIGHT = false
  }
  else if (event.keyCode == 40 && KEYUPDOWN){
    snake.speedY = 0
    KEYUPDOWN = false
  }
})


/*class MoveCamera extends GameObject{
  constructor(){
    super()
    this.speedX = 0;
    this.speedY = 0;
  }

  tick(){
    super.tick()
    window.renderer.camera.positionX += this.speedX;
    window.renderer.camera.positionY += this.speedY;
  }
}

var engine = new Engine()
engine.start()
var x = 600;
var y = 600;
var i = 0;
var arr = []
for (x = 0; x<2000; x+=64){
  for (y = 600; y<2000; y+=64){
    arr[i] = new Sprite(64,64,x,y,"tile_rock.png", 1);
    i++;
  }
}
var tux = new Sprite(64,64, 600,546, "tux_anims/1.png", 2);
tux.speedByFrame(1,0);
tux.addAnimation(["tux_anims/1.png","tux_anims/2.png","tux_anims/3.png","tux_anims/4.png"], 270)
tux.addAnimation(["house.png", "scream.jpg", "tile_rock.png"])

var moveCamera = new MoveCamera();
window.renderer.camera.positionX = 600;
window.renderer.camera.positionY = 100;
window.renderer.setBackgroundColor("#4dd2ff")
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37){
    window.renderer.camera.positionX -=10;
  }
  else if (event.keyCode == 38){
    window.renderer.camera.positionY -=10;
  }
  else if (event.keyCode == 39){
    window.renderer.camera.positionX+=10;
  }
  else if (event.keyCode == 40){
    window.renderer.camera.positionY +=10;
  }
});
TextSprite.changeCanvasFont("40px Comic Sans MS")
var text = new TextSprite("hola", 10 , 20, 10, "white");
var text2 = new TextSprite("Hola, yo tenía un barco", 650,600,2,"white")
var nX = 01920;
var nY = 0;
var arr = []
/*for (var i = 0; i < 200; i++){
  for (var j = 0; j< 200; j++){
    arr[i] = new Sprite(10,10, nX, nY, "images.jpg", -1);
    nX+=10;
  }
  nX = 1920;
  nY+=10;
}


//window.audioHandler.setAudio("oggTest.ogg")
//var g = window.audioHandler.setAudio("greys.mp3")


setInterval(function(){window.renderer.camera.positionX += 0.6;}, 16)
*/
