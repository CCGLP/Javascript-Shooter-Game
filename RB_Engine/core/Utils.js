class Vector2{
    constructor(x,y){
        this.x = x; 
        this.y = y; 
    }
    normalize(){
        var mag = this.magnitude()
        this.x/=mag
        this.y/=mag
    }
    
    magnitude(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }
    
    getDirectionFrom(vector){
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }
    
    multiplierScalar(scalar){
        this.x *= scalar
        this.y *= scalar
    }
}


function getMousePos(canvas,evt){
     var rect = canvas.getBoundingClientRect();
     return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top)
        
}

function checkCollisionBetweenSprites(sprite1, sprite2){
    return (sprite1.positionX < sprite2.positionX + sprite2.width &&
   sprite1.positionX + sprite1.width > sprite2.positionX &&
   sprite1.positionY < sprite2.positionY + sprite2.height &&
   sprite1.height + sprite1.positionY > sprite2.positionY)
}

function GetRandomNumberBetween(min,max){
    return Math.floor((Math.random() * max) + min)
}