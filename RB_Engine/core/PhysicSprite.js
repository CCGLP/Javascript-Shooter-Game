class PhysicSprite extends Sprite{
    constructor(width,height,positionX, positionY, spriteImage,widthImage, heightImage,isStatic, renderOrder = 0, density = 1, friction = 0.5,   restitution = 0.2, isSquare = true,
                 tilePositionX = 0, tilePositionY = 0 ){
        super(width,height,positionX,positionY,spriteImage,widthImage, heightImage, renderOrder, tilePositionX, tilePositionY)
        var bodyDef = new b2BodyDef
        var fixDef = new b2FixtureDef
        var SCALE = window.SCALEPHYSICS; 
      
        
        fixDef.density = density; 
        fixDef.friction = friction;
        fixDef.restitution = restitution; 
        
        bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
        
        if (isSquare){
            fixDef.shape = new b2PolygonShape;
            fixDef.shape.SetAsBox((width*0.5) / SCALE, (height *0.5) / SCALE); //No soy muy amigo de poner comentarios en general, y menos
            //Explicativos, pero me parece horripilante que pida la mitad de width y la mitad de height el constructor. 
        }
        else{
            fixDef.shape = new b2CircleShape((width*0.5)/SCALE)
        }
        
        bodyDef.position.Set((positionX + (width*0.5)) / SCALE, ((positionY + (height*0.5))) / SCALE)

        this.body = window.physics.createBody(bodyDef, fixDef)
        this.body.spriteParent = this; 
       // this.body.SetLinearVelocity(new b2Vec2(0,5))   
    }
    
    
 
    remove(){
        window.physics.removeBody(this)
        super.remove()
    }
    
    setVelocity(x,y){
        this.body.SetLinearVelocity(new b2Vec2(x / window.SCALEPHYSICS,y / window.SCALEPHYSICS))
    }
    
    setPosition(x,y){
        this.body.SetPosition(new b2Vec2(x,y))
    }
   
    
    tick(){
        this.positionX = this.body.GetPosition().x * window.SCALEPHYSICS - this.width * 0.5
        this.positionY = this.body.GetPosition().y * window.SCALEPHYSICS - this.height * 0.5
        this.rotation = this.body.GetAngle() /(Math.PI/180)
    }
}



