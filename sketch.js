var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obe1Image,obe2Image,obe3Image,obe4Image,obe5Image,obe6Image;
var cloud, cloudsGroup, cloudImage;
var cloudgroup, obastaclegroup; 
var PLAY=1;
var END=0
var newImage;
var gamestate= PLAY;
var score;
var clonbos, restartimg, gameoverimg, salto, kill, chepoin, ovniimg, ovny;
// clonvos es un ajolote jigante de fornite

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_collided = loadAnimation("trex_collided.png");
  clonbos= loadAnimation('trex_collided.png')
  groundImage = loadImage("ground2.png");
  salto= loadSound('jump.mp3')
  kill= loadSound('die.mp3')
  chepoin= loadSound('checkpoint.mp3')
  cloudImage = loadImage("cloud.png");
ovniimg= loadImage('OVNY.PNG')
  obe1Image = loadImage("obstacle1.png");
  obe2Image = loadImage("obstacle2.png");
  obe3Image = loadImage("obstacle3.png");
  obe4Image = loadImage("obstacle4.png");
  obe5Image = loadImage("obstacle5.png");
  obe6Image = loadImage("obstacle6.png");

  restartimg= loadImage('restart.png')
  gameoverimg= loadImage('gameOver.png')
}

function setup() {
  createCanvas(600, 200);

  score=0
  cloudgroup = new Group();
  obastaclegroup = new Group();
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",clonbos)
  trex.scale = 0.5;
  trex.debug=false
  ovny=createSprite(100,100);
  ovny.scale=0.3
  ovny.addImage(ovniimg)
  trex.setCollider('circle',0,0,45);
  gameOver=createSprite(300, 100)
 restart=createSprite(300, 140)
 gameOver.addImage(gameoverimg);
 restart.addImage(restartimg);
 restart.scale=.5
 restart.scale=.5
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hola"+ 5)
  
}

function draw() {
  background(180);
  text('points: ' +score,500,40 );
 console.log(trex.y)
  score = score + Math.round(getFrameRate()/60);  
if(score>0 && score % 100===0){
chepoin.play
}
  if(gamestate===PLAY){

    restart.visible=false;
    gameOver.visible=false;
    if(keyDown("space")&& trex.y >= 130) {
      trex.velocityY = -10;
      salto.play();

    }
    
    if(keyDown("a") && keyDown('1')) {
      trex.y = 90;
ovny.visible=true
    }
else{
  ovny.visible=false
}
    
  
  
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
  
      ground.x = ground.width/2;
        //aparecer nubes
    }
        spawnClouds();
        spawnOvstaculos();
    if(obastaclegroup.isTouching(trex) ){
gamestate= END;
kill.play();
    }
} 
    
    else{
ground.velocityX=0
obastaclegroup.setVelocityXEach(0);
cloudgroup.setVelocityXEach(0);
trex.velocityY=0
obastaclegroup.setLifetimeEach (-1)
cloudgroup.setLifetimeEach (-1)
trex.changeAnimation("collided",clonbos)
restart.visible=true    
gameOver.visible=true 
if(mousePressedOver(restart)){
reset();
}
    }
    trex.collide(invisibleGround);
    



    drawSprites();

}
function spawnOvstaculos(){
  if (frameCount % 60 === 0) {
    ovstaculo = createSprite(400,165,10,40);
   ovstaculo.scale = 0.4;
    ovstaculo.velocityX = -4;

    //asignar tiempo de vida a una variable
    ovstaculo.lifetime = 220
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: ovstaculo.addImage(obe1Image);
      break;
      //case 1: ovs
      case 2: ovstaculo.addImage(obe2Image);
      break;
      case 3: ovstaculo.addImage(obe3Image);
      break;
      case 4: ovstaculo.addImage(obe4Image);
      break;
      case 5: ovstaculo.addImage(obe5Image);
      break;
      case 6: ovstaculo.addImage(obe6Image);
      break;
      default:break
}
    //ajustar la profundidad
    trex.depth = trex.depth + 1;
    
    ovstaculo.depth = trex.depth
    obastaclegroup.add (ovstaculo);
    }
    
}
function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 220
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
    }
}
function reset(){

  gamestate= PLAY
  gameOver.visible=false;
restart.visible=false;
trex.changeAnimation("running", trex_running)
obastaclegroup.destroyEach()
cloudgroup.destroyEach()
score=00000
}