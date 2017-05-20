class Update{

  constructor(){
    if (window.update == null){

      this.gameObjectTicks = [];
      window.update = this;
    }
    else{
      return window.update;

    }
  }


  update(){

    for (var i = 0; i<window.update.gameObjectTicks.length; i++){
      window.update.gameObjectTicks[i]()
    }
  }

  startUpdate(){
    this.updaterutine = setInterval(this.update, 1000/60)
  }

  add(tick){
    this.gameObjectTicks[this.gameObjectTicks.length] = tick
  }


}
