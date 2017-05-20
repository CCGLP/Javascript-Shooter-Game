class Engine{


  constructor(width = 600, height = 600){
    this.width = width;
    this.height = height
  }

  start(){
    var renderer = new Renderer(this.width,this.height,2500,2500)
    renderer.startRender();
    renderer.setBackgroundColor("#000000")
    var update =  new Update()
    var audioHandler = new AudioHandler()
    update.startUpdate()
  }
}
