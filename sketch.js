const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, rope, l, b, cb, r, m, r1, b1, bli, eat, sad,bc,s,e,b5,c1,bl,v,m
function preload() {
  b = loadImage("background.png");
  m = loadImage("melon.png");
  r = loadImage("Rabbit.png");
  bli = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation(
    "eat_0.png",
    "eat_1.png",
    "eat_2.png",
    "eat_3.png",
    "eat_4.png"
  );
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  bli.playing = true;
  eat.playing = true;
  eat.looping = false;
  bc=loadSound("sound1.mp3")
  s=loadSound("sad.wav")
  e=loadSound("eating_sound.mp3")
  b5=loadSound("air.wav")
  c1=loadSound("rope_cut.mp3")

}
function setup() {
  // createCanvas(500, 700);
  var w=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(w){
  createCanvas(displayWidth+80,displayHeight)  
  }
  else{
createCanvas(windowWidth-5,windowHeight-5)   
  }
  frameRate(80);
  imageMode(CENTER);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2-50, height-10, width, 20);
  rope = new Rope(8, { x: 40, y: 30 });
  rope1 = new Rope(8, { x: width/2+120, y: 40 });
  rope2 = new Rope(6, { x: width/2+100, y: height/7+125 });
  c = Bodies.circle(width/2, height/2, 30, { density: 0.0001 });
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  v="volume.png"
  
m3=createImg(v)
m3.position(width-80,30)
m3.size(50,50)
m3.mouseClicked(mute)
  // bc.play()
  // bl=createImg("balloon.png")
  // bl.position(-10,height/2-120)
  // bl.size(180,180)
  // bl.mouseClicked(blowair)
  Matter.Composite.add(rope.body, c);
  l = new Link(rope, c);
  l1 = new Link(rope1, c);
  l2 = new Link(rope2, c);
  eat.frameDelay = 25;
  sad.frameDelay = 25;
  bli.frameDelay = 25;
  r1 = createSprite(width/5+25, height - 100);
  r1.addAnimation("blink", bli);
  r1.addAnimation("eat", eat);
  r1.addAnimation("sad", sad);
  r1.addImage(r);
  r1.scale = 0.25;
  b1 = createImg("cut_button.png");
  b1.position(20,30);
  b1.size(50, 50);
  b1.mouseClicked(drop);
  b2 = createImg("cut_button.png");
  b2.position(width/2+80,30);
  b2.size(50, 50);
  b2.mouseClicked(drop1);
  b3 = createImg("cut_button.png");
  b3.position(width/2+110,height/5+60);
  b3.size(50, 50);
  b3.mouseClicked(drop2);
}

function draw() {
  background(51);
  image(b, width / 2, height / 2, width, height);
  // ground.show();
  Engine.update(engine);
  // ellipse(c.position.x,c.position.y,30,30)
  if (c != null) {
    image(m, c.position.x, c.position.y, 90, 90);
    var col=Matter.SAT.collides(c,ground.body)
    if(col.collided){
    r1.changeAnimation("sad") 
    s.play() 
    bc.stop()
    c=null
    }
  }
  rope.show();
  rope1.show();
  rope2.show();
if(collide(c,r1)){
r1.changeAnimation("eat")  
e.play()
}
  drawSprites();
}
function drop() {
  rope.break();
  l.detatch();
  l = null;
 c1.play() 
}
function drop1() {
  rope1.break();
  l1.detatch();
  l1 = null;
 c1.play() 
}
function drop2() {
  rope2.break();
  l2.detatch();
  l2 = null;
 c1.play() 
}
function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (d <= 50) {
      Matter.World.remove(world, body);
      c = null;
      return true;
    } else return false;
  }
}
function blowair(){
Matter.Body.applyForce(c,c.position,{x:0.025,y:0})
b5.play()
}
function mute(){
if(bc.isPlaying()){
bc.stop() 
v="mute.png" 
} 
else {
bc.play() 
v="volume.png" 
} 
}