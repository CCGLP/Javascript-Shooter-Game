class Physics extends GameObject{

    constructor(gravity = 10,canSleep= true, scalePixelUnit = 30){
       
        if (window.physics == null){
            super()
            this.world = new b2World(new b2Vec2(0, gravity), canSleep)
            window.SCALEPHYSICS = scalePixelUnit; 
            window.physics = this; 
        }
        else{
            return window.physics;
        }
            
    }
    
    createBody(body,fix){
        var aux = this.world.CreateBody(body).CreateFixture(fix);
        return aux.GetBody();
    }
    tick(){
        super.tick();
        this.world.Step(1 / 60, 10, 10);
        this.world.ClearForces();
    }
}
