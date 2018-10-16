class Physics extends GameObject{

    constructor(gravity = 10,canSleep= true, scalePixelUnit = 30){
       
        if (window.physics == null){
            super()
            this.world = new b2World(new b2Vec2(0, gravity), canSleep)
            window.SCALEPHYSICS = scalePixelUnit; 
            window.physics = this; 
            this.destroyList = []
            this.pause = false
        }
        else{
            return window.physics;
        }
            
    }
    
    
    triggerPause(){
        this.pause = !this.pause
    }
    
    createBody(body,fix){
        var aux = this.world.CreateBody(body).CreateFixture(fix);
        return aux.GetBody();
    }
    
    removeBody(physicSprite){
        this.destroyList[this.destroyList.length] = physicSprite.body
    }
    
    removeAllInList(){
        for (var i = 0; i< this.destroyList.length; i++){
            this.world.DestroyBody(this.destroyList[i])
        }
        
        this.destroyList = []
        
    }
    
    tick(){
        super.tick();
        
        if (!this.pause){
            this.removeAllInList()
            this.world.Step(1 / 60, 10, 10);
            this.world.ClearForces();
        }
    }
}
