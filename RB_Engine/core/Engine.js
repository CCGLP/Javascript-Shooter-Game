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
    var physics = new Physics(0)
    var audioHandler = new AudioHandler()
    update.startUpdate()

  }
}

//Shortcuts to box2D
var   b2Vec2 = Box2D.Common.Math.b2Vec2
            ,  b2AABB = Box2D.Collision.b2AABB
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
            ;