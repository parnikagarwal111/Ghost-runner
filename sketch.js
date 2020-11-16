var ghost,ghostImage;
var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climberGroup;
var spookySound;
var block,blockGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,600,600);
  tower.addImage("tower",towerImage);
  tower.velocityY=2;
  
  ghost=createSprite(300,300,20,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  climberGroup=new Group();
  doorsGroup=new Group();
  blockGroup=new Group();
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
  if(tower.y>=600){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  ghost.velocityY=ghost.velocityY+0.2;
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  
  doors();
  
  if(ghost.isTouching(blockGroup) || ghost.y>=600){
    gameState=END;
  }
  
  drawSprites();
  }
  
  else if(gameState===END){
  textSize(50);
  fill("yellow");
  text("GAME OVER",170,300);
  }
}

function doors(){
  
  if(frameCount%250===0){
  door=createSprite(Math.round(random(100,500)),0,20,40);
  door.addImage(doorImage);
  door.velocityY=2;
  door.lifetime=300;
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  
  climber=createSprite(300,50,40,10);
  climber.x=door.x;
  climber.addImage(climberImage);
  climber.velocityY=2;
  climber.lifetime=300;
    
  block=createSprite(30,60,60,2);
  block.width=climber.width;
  block.x=door.x;
  block.velocityY=2;
  block.lifetime=300;
  block.debug=true;
  block.visible=false;
    
  blockGroup.add(block);
  doorsGroup.add(door);
  climberGroup.add(climber);
  }
}