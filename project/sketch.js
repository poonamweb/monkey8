//Global Variables

var monkey,monkey1,jungle,jungle1,ground,banana1,BanansGroup,obstcale1,obstaclesGroup,gameState,restart,restart1,gameOver,gameOver1;

var count;
var play = 1;
var end = 2;
var gameState = play;

function preload(){
  
  monkey1 = loadAnimation ("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  jungle1 = loadImage("jungle.jpg");
  banana1 = loadImage("Banana.png");
  obstacle1 = loadImage("stone.png");
  restart1 = loadImage("restart.png");
  gameOver1 = loadImage("gameOver.png");
  
  
}


function setup() {
  createCanvas(600,300);
  
   monkey = createSprite(80,255,20,20);
  monkey.addAnimation("movingmonkey",monkey1);
  monkey.scale = 0.07;
  
   
     jungle = createSprite(295,55,0,0);
  jungle.addImage("trees",jungle1);
  jungle.scale = 1.2;
  
  jungle.x = jungle.width/2
  
  ground = createSprite(0,260,800,0);
  
  BananasGroup = new Group();
  obstaclesGroup = new Group();
  
  count = 0;
  
  restart = createSprite(300,150,20,20);
  restart.addImage(restart1);
  restart.scale = 0.6;
 
  
  gameOver = createSprite(300,110,20,20);
  gameOver.addImage(gameOver1);
 
  
  
}


function draw(){
 background(255); 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  jungle.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   restart.depth = restart.depth +110;
  gameOver.depth = gameOver.depth + 110;
  
  monkey.collide(ground);
  
  if(jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  

  if(gameState === play){
  if(keyDown("space") && monkey.y > 199){
    monkey.velocityY = -12;
    
  }
    
     
    
    jungle.velocityX = -4;
  
  if(BananasGroup.isTouching(monkey)){
   BananasGroup.destroyEach(); 
    monkey.scale = monkey.scale + 0.01;
  }
  
  if(monkey.scale === 0.01 && BananasGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale + 0;
    
    
  }
  
   spawnBananas();
  spawnObstacles();
 
       if(obstaclesGroup.isTouching(monkey)){
   gameState = end;
       }
    
     gameOver.visible = false;
     restart.visible = false;
    
 
    
}
  
  
  if(gameState === end){
    
   monkey.velocityY  = 0;
    monkey.velocityX = 0;
    jungle.velocityX = 0;
    jungle.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
   BananasGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;
  }
      
    if(mousePressedOver(restart)){
       gameState = play;
      obstaclesGroup.destroyEach();
      BananasGroup.destroyEach();
       monkey.scale = 0.07;
       
       }
      
      
    
    
        
  
  
 
  
  drawSprites();
}



function spawnBananas() {
  
  if (frameCount %110 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(70,125));
    banana.addImage(banana1);
    banana.scale = 0.1;
    banana.velocityX = -7;
      
    
    banana.lifetime = 250;
    
    banana.depth = banana.depth + 110;
    BananasGroup.add(banana);
    
    
  }
  
}

function spawnObstacles() {
  
  if (frameCount %70 === 0) {
    var obstacle = createSprite(580,240,40,10);
   
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.16;
    obstacle.velocityX = -5;
      
    
    obstacle.lifetime = 250;
    
   obstacle.depth = obstacle.depth + 110;
    obstaclesGroup.add(obstacle);
    
    obstacle.setCollider("rectangle",0,0,50,50);
    
    
  }
  
}