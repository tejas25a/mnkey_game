var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var Food, FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState =1;


function preload() {


monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(80, 300, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background(255);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8; 


  monkey.collide(ground);
  spawnFood();
  spawnObstacles();


  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score "+score, 100,50);
  
  if(FoodGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    FoodGroup.destroyEach();
  }

  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach ();
    score = 0;
    gameState = PLAY;
  }
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + score, 100, 50);
  score = score + Math.round(frameCount/1);
  
}


function spawnFood() {
  if(frameCount % 80 ===0){
    banana = createSprite(400,220,20,20);
    banana.velocityX = -6;
     var rand = Math.round(random);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 66;
    monkey.depth = banana.depth +1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(800, 325, 10, 40);
    obstacle.velocityX = -6;

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}