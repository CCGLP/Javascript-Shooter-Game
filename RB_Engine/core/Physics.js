class Physics{
  constructor(){
    if (window.physics == null){
      this.physicsTicks = []
      this.gravity = 0.98;

    }
    else{
      return window.physics;
    }
  }

  getGravity(){
    return this.gravity;
  }

  addPhysicTick(tick){
    this.physicsTicks[this.physicsTicks.length] = tick;
  }

  tick(){
    for (var i = 0; i < this.physicsTicks.length; i++){
      this.physicsTicks[i]();
    }
  }

}

class PhysicSprite extends Sprite{
  constructor(width,height,positionX = 0, positionY = 0, spriteImage, renderOrder = 0){
    super(width,height,positionX,positionY,spriteImage, renderOrder);
    window.physics.addPhysicTick(this.physicTick.bind(this))
  }

  tick(){
    super.tick()
  }

  physicTick(){

  }

}
