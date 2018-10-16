class GameObject{

  constructor(){
    this.bindtick = this.tick.bind(this)
    window.update.add(this.bindtick)
  }

  remove(){
    window.update.clearObject(this.bindtick)


  }
    
    
  tick(){

  }

}
