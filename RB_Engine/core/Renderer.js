class Renderer{

  constructor(width, height, levelWidth = 0, levelHeight = 0){
    if (window.renderer == null){
      window.renderer =  this;
      var realWidth;
      var realHeight;
      if ((typeof width) == "number" && (typeof height) == "number"){
        realWidth = width;
        realHeight = height;
      }
      else{
        realHeight = 800;
        realWidth = 800;
      }

      this.width = realWidth;
      this.height = realHeight;
      this.camera = {positionX : 0, positionY : 0}
      document.write("<div id = \"wrapper\" style =\"width:" + realWidth + "px; height:" + realHeight +"px; overflow:hidden\">")
      document.write("<canvas id = \"riasBaixasCanvas\" width = \" " + levelWidth + "\" height = \" " + levelHeight + "\"  > </canvas>")
      document.write("</div>");
      this.wrapper = document.getElementById("wrapper");
      this.ctx = document.getElementById("riasBaixasCanvas").getContext("2d");
      window.canvas = document.getElementById("riasBaixasCanvas")
      this.frameCount = 0
      this.renderElements = []
    }
    else{
      return window.renderer;
    }

  }

  print(){
    console.log(this.image);

  }

  addNewElementToRender(sprite){
    var order = sprite.renderOrder
    var auxOrder;
    var aux;
    var aux2;
    var i= 0;
    var j = 0;
    for (i = 0; i< this.renderElements.length; i++){
      auxOrder = this.renderElements[i].renderOrder
      if (order < auxOrder){
        aux = this.renderElements[i]
        this.renderElements[i] = sprite
        var iterations = this.renderElements.length;
        for (j = i+1; j <= iterations; j++){
          aux2 = this.renderElements[j]
          this.renderElements[j] = aux
          aux = aux2
        }
        return;
      }
    }
    this.renderElements[this.renderElements.length] = sprite;

  }

  cleanScreen(){
    this.ctx.fillRect(this.camera.positionX,this.camera.positionY,this.width, this.height);
  }

  renderAll(){
    for (var i = 0; i < this.renderElements.length; i++){
      if (this.renderElements[i].text == undefined){
      if (((this.camera.positionX + this.width) > this.renderElements[i].positionX  &&
        this.renderElements[i].positionX + this.renderElements[i].width > (this.camera.positionX)) &&
        ((this.camera.positionY+ this.height) > this.renderElements[i].positionY  &&
        this.renderElements[i].positionY + this.renderElements[i].height  > (this.camera.positionY))) {
          if (this.renderElements[i].rotation == 0){
             this.ctx.drawImage(this.renderElements[i].image, this.renderElements[i].positionX, this.renderElements[i].positionY,this.renderElements[i].width, this.renderElements[i].height);
          }
          else{
              this.renderRotate(this.renderElements[i])
          }
      }
        }
        else if (((this.camera.positionX + this.width) > this.renderElements[i].positionX  &&
          this.renderElements[i].positionX + this.renderElements[i].width > (this.camera.positionX)) &&
          ((this.camera.positionY+ this.height) > this.renderElements[i].positionY  &&
          this.renderElements[i].positionY + this.renderElements[i].height  > (this.camera.positionY)) ) {
            this.ctx.fillStyle = this.renderElements[i].color
            this.ctx.fillText(this.renderElements[i].text, this.renderElements[i].positionX, this.renderElements[i].positionY)
        }

    }

  }

    renderRotate(image){
       // this.cleanScreen()
        this.ctx.save();
        this.ctx.translate(image.positionX, image.positionY);
        this.ctx.translate(image.width /2, image.height/2)
        this.ctx.scale(0.8, 0.8)
        this.ctx.rotate(image.rotation*(Math.PI/180));
        this.ctx.drawImage(image.image,-image.width/2,-image.width/2);
        this.ctx.restore();
    } 
    
   setBackgroundColor(color) {
    this.color = color;
    this.ctx.fillStyle = color;

  }

    
    clearAllRenders(){
        for (var i = 0; i < this.renderElements.length; i++){
            delete this.renderElements[i]
        }
        this.renderElements = []
    }
    
    clearRender(rend){
        for (var i = 0; i < this.renderElements.length;i++){
            if (rend == this.renderElements[i]){
                delete this.renderElements[i]
                this.renderElements.splice(i,1)
                break;
            }
            
        }
    }

  tick(){
     window.renderer.ctx.save()
     window.renderer.wrapper.scrollTop = window.renderer.camera.positionY;
     window.renderer.wrapper.scrollLeft = window.renderer.camera.positionX;
     window.renderer.cleanScreen();
     window.renderer.renderAll();
     window.renderer.ctx.restore();

  }

moveCameraTo(positionX, positionY){
  this.camera.positionX = positionX;
  this.camera.positionY = positionY;
}

   startRender(){
    //this.renderRutine  = setInterval(this.tick,1000/60);
    window.requestAnimationFrame(this.startRender.bind(this))
    this.tick()
  }




}
