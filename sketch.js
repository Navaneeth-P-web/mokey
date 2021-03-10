
  var PLAY = 1;
  var END = 0;
  var END1 = 2;
  var gameState = PLAY;

  var monkey , monkey_running, monkeyCollide;
  var ground, invisibleGround, groundImg;
  var banana ,bananaImage;
  var obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var score = 0;
  var bananaScore = 0;

function preload() {
  
 
  monkey_running =   loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  monkeyCollide = loadAnimation("monkey_1.png");
  groundImg = loadAnimation("ground.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup(){

  createCanvas(600,300);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  ground = createSprite(300,1070,600,10);
  ground.scale = 1;
  ground.addAnimation("ground", groundImg);
  
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = false;
}

function draw(){
  
   background("lightgreen");
  textSize(20)
   fill("darkblue");
   text("SURVIVAL TIME: "+score, 400, 20);
   text("BANANAS COLLECTED: "+bananaScore,0,20);
  
  if (gameState === PLAY){
    
    obstacles();
    bananas();
    
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4+score*1.5/100);
    if(keyDown("space") && monkey.y >= 220) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
       switch (score) {
    case 1:
      monkey.scale = 0.12;
      break;
    case 2:
      monkey.scale = 0.14;
      break;
    case 3:
      monkey.scale = 0.16;
      break;
    case 4:
      monkey.scale = 0.18;
      break;
    case 5:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
    if(bananaScore === 7){
      gameState = END1;
    
    }
  }
  
  if(gameState === END1) {
    
    ground.velocityX = 0;
    
    monkey.y = 200;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);      
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    textSize(30);
    fill("red");
    text("YOU WON", 150, 100);
    text("'R' to play again", 240, 150);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  if (gameState === END){
    
    ground.velocityX = 0;
    
    monkey.y = 200;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);       
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("BLACK")
    stroke("YELLOW")
    textSize(35);
    text("GAMEOVER", 220, 170);
    
    fill("violet");
    textSize(15);
    text("'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
  }
   }
  
    drawSprites(); 
  
    monkey.collide(invisibleGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}