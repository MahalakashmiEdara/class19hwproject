var car;

var ground, invisibleGround, groundImage,cloudImage,car,Rock1,Rock2,Rock3,Rock4,Rock5,Rock6;
var jumpSound,dieSound,checkPointSound;
var score=0;
var cloudsGroup,RockGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage,restart,restartImage;

function preload() {

        
        carImage = loadImage("car1.png");

        groundImage = loadImage("ground2.png")
        cloudImage=loadImage("cloud.png");
        Rock1=loadImage("Rock1.png");
        Rock2=loadImage("Rock2.png");
        Rock3=loadImage("Rock3.png");
        Rock4=loadImage("Rock4.png");
        Rock5=loadImage("Rock5.png");
        Rock6=loadImage("Rock6.png");
        gameOverImage=loadImage("gameOver.png");
        restartImage=loadImage("restart.png");
        jumpSound=loadSound("jump.mp3");
        dieSound=loadSound("die.mp3");
        checkPointSound=loadSound("checkpoint.mp3")
}

function setup() {

        createCanvas(600, 200);
        
        

        
        car = createSprite(50,160,20,50);
        car.addImage(carImage);
        car.scale = 0.1;
        car.debug=true;
        car.setCollider("rectangle",0,0,200,car.height);

        

        
        ground = createSprite(200,180,400,20);
        ground.addImage("grounds",groundImage);
        ground.x = ground.width /2;
     

        gameOver=createSprite(300,100);
        gameOver.addImage("gameOver",gameOverImage);
        gameOver.scale= 0.6


        restart=createSprite(300,140);
        restart.addImage("restart",restartImage);
        restart.scale= 0.4
        
        invisibleGround=createSprite(200,190,400,20);
        invisibleGround.visible=false;

        cloudsGroup=new Group();
        RockGroup=new Group();

          
}

function draw() {
  
        background(180);
         
        //console.log(message);
        text("Score : "+score,500,50 );
        if(gameState===PLAY){
                score=score+Math.round(frameCount/60);
                ground.velocityX = -(4+3*score/100);
                if(score>0 && score%100===0){
                        checkPointSound.play();
                }

                gameOver.visible=false;
                restart.visible=false;

                 //jump when the space button is pressed
                 if (keyDown("space") && car.y>=155) {

                car.velocityY = -10;
                jumpSound.play();

                }
                car.velocityY = car.velocityY + 0.8
                if (ground.x < 0) {

                ground.x = ground.width / 2;
        
                }
                spawnClouds();
                spawnRocks();
                if(RockGroup.isTouching(car)){
                       gameState=END;
                       dieSound.play();
                       
                }
        }
        else if (gameState===END){
                ground.velocityX=0;
                car.velocityY=0;
                car.addImage("Collided");
                RockGroup.setVelocityXEach(0);
                cloudsGroup.setVelocityXEach(0);
                RockGroup.setLifetimeEach(-1);
                cloudsGroup.setLifetimeEach(-1);
                gameOver.visible=true
                restart.visible=true

                if(mousePressedOver(restart)){
                        reset();
                }
        }
        
        car.collide(invisibleGround);
        
        drawSprites();
}
function reset(){
       score=0;
       gameState=PLAY;
       restart.visible=false;
       gameOver.visible=false;
       RockGroup.destroyEach();
        cloudsGroup.destroyEach();

}
function spawnClouds(){
   if(frameCount % 60 === 0){
        var cloud=createSprite(600,100,40,10);
        cloud.addImage("cloud",cloudImage);
        cloud.y = Math.round(random(10,60));
        cloud.scale=0.1;
        cloud.velocityX=-3;
        cloud.lifetime=210;
        cloud.depth=car.depth;
        car.depth+=1

        cloudsGroup.add(cloud);
   }
}
function spawnRocks(){
        if(frameCount % 60 === 0){
        var Rock=createSprite(600,165,20,20);
        Rock.velocityX=-(6+score/100);
           
        var rand=Math.round(random(1,6));

        switch(rand){
                case 1 : Rock.addImage(Rock1);
                        break;
                case 2 : Rock.addImage(Rock2);
                        break;
                case 3 : Rock.addImage(Rock3);
                        break;
                case 4 : Rock.addImage(Rock4);
                        break;
                case 5 : Rock.addImage(Rock5);
                        break;
                case 6 : Rock.addImage(Rock6);
                        break;
                default:break;
        }
        Rock.scale=0.1;
        Rock.lifetime=160;

        RockGroup.add(Rock);
       
}
}