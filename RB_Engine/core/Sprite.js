class Sprite extends GameObject{
  constructor(width,height,positionX, positionY, spriteImage, renderOrder = 0){
    super()
    this.image = new Image(width, height)
    this.image.src = spriteImage
    this.width = width;
    this.height = height;
    this.image.width = width;
    this.image.height = height;
    this.anims = [this.image]
    this.animsArray = [];
    this.numberOfAnimations = 0
    this.renderOrder = renderOrder
    window.renderer.addNewElementToRender(this);
    this.positionX = positionX;
    this.positionY = positionY;
    this.speedX = 0;
    this.speedY = 0;

  }

  speedByFrame(speedX, speedY){
    this.speedX = speedX;
    this.speedY = speedY;
  }

  tick(){
    super.tick()
    this.positionX += this.speedX
    this.positionY += this.speedY;
  }

  // anims needs to be an array of strings with the images timeBetween in ms
  addAnimation(anims,timeBetween = 1, loop = true){
      var animArr = []
      for (var i = 0; i < anims.length; i++){
        animArr[i] = new Image(this.width, this.height)
        animArr[i].src = anims[i]
        animArr[i].width = this.width
        animArr[i].height = this.height
      }

      this.animIndex = 0
      this.animsArray[this.numberOfAnimations] = animArr
      this.numberOfAnimations++;
      if (this.animsArray.length === 1){
        this.anims = animArr;
        this.timeBetweenAnim = timeBetween
        setInterval(function(){
           this.image = this.anims[this.animIndex];
           this.animIndex++;
           if (this.animIndex >=this.anims.length){
               this.animIndex =0
            }
          }.bind(this), this.timeBetweenAnim)
      }
  }

  changeAnimation(index){
    if (index < this.numberOfAnimations && index >= 0){
      this.animIndex = 0
      this.anims = this.animsArray[index]
    }
  }

}
