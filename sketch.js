var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;
var banana,bananaImage;
var obstacle,obstacleImage;

var bananaGroup,obstacleGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");


}

function setup() {
  createCanvas(600,600);

  backgr = createSprite(300,300,600,600);
  backgr.addImage(backImage);
  backgr.scale = 2;
  
  
  monkey = createSprite(100,500,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
  
  //obstacle = createSprite(300,500,20,20);
  
  ground = createSprite(100,570,600,20);
  ground.x = ground.width/2;
  


  obstacleGroup =createGroup();
  bananaGroup =createGroup();
  
  score =0;

  backgr.velocityX=-3;
  backgr.x = backgr.width/2;
  
}

function draw(){
  
  background("white");
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnObstacles();
  spawnBanana();
  
 if(keyDown("space") ) {
  monkey.velocityY = -12;
}
  
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score=score+1;
   }

   if(obstacleGroup.isTouching(monkey)){
     gameState = END;

   } else if(gameState === END){

    backgr.velocityX =0;
    monkey.visible = false;

    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("GAME OVER!",300,220);
   }
  

  
  
  
  
    monkey.velocityY = monkey.velocityY +0.8;
  
    monkey.collide(ground);
  
    drawSprites();
  fill("green");
  text("Score"+ score,500,50);
  
  fill("black");
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime"+ survivalTime ,100,50);
}

function spawnObstacles(){
  if(frameCount %150 === 0){
    obstacle = createSprite(500,530,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand){
      case 1 : obstacle.addImage(obstacleImage);
        break;
        default: break;
    }
    
    //assign scale and lifetime to the obstacle
    obstacle.scale =0.25;
    obstacle.lifetime=500;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  //write code here to spawn banana
  if(frameCount %160 === 0){
    banana = createSprite(600,100,60,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX= -3;
    
    //assign lifetime to the variable
    
    banana.lifetime=500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    //adding banana to the group
    bananaGroup.add(banana);
  }
}


