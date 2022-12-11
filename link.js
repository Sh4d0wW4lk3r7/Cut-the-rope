class Link {
  constructor(bodyA, bodyB) {
    var l = bodyA.body.bodies.length-2; console.log(l)
    this.link = Matter.Constraint.create({
      bodyA: bodyA.body.bodies[l],
      bodyB: bodyB,
      stiffness: 0.01,
      length: -10,
    });
    World.add(world, this.link);
  }
  detatch (){
Matter.World.remove(world,this.link)    
  }
}
