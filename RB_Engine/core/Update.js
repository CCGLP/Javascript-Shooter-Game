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

  clearObject(upd){
      for (var i = 0; i< window.update.gameObjectTicks.length; i++){
          if (upd == window.update.gameObjectTicks[i]){
              delete window.update.gameObjectTicks[i];
              window.update.gameObjectTicks.splice(i,1);
              break; 
          }
      }
  }
    
  clearAllObjects(){
      for (var i = 0; i < window.update.gameObjectTicks.length; i++){
        delete window.update.gameObjectTicks[i];
      }
      window.update.gameObjectTicks = [];
  }
  startUpdate(){
    this.updaterutine = setInterval(this.update, 1000/60)
  }

  add(tick){
    this.gameObjectTicks[this.gameObjectTicks.length] = tick
  }


}
