 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var ninja , ninja_running , ninja_collided , ninja_attack;
 var ground , invisibleGround , groundImage;
 var obstaclesGroup , obstacle1 , obstacle2 , obstacle3;
 var ghost , ghost_running;
 var skeleton , skeleton_run;
 var bat;
 var trap , trap_trapping;
 var background , backgroundImg , canvas;

 var score;
 var gameOverImg,restartImg;
 
     function preload(){
       ninja_running = loadAnimation("../Images/ninja2.png" , "../Images/ninja3.png" , "../Images/ninja4.png" , "../Images/ninja5.png" , "../Images/ninja6.png" , "../Images/ninja7.png");
       ninja_collided = loadAnimation("../Images/ninja20.png" , "../Images/ninja21.png");
       ninja_attack = loadAnimation("../Images/ninja8.png" , "../Images/ninja15.png" , "../Images/ninja16.png");

       obstacle1 = loadImage("../Images/obstacle1.png");
       obstacle2 = loadImage("../Images/obstacle2.png");
       obstacle3 = loadImage("../Images/obstacle3.png");

       skeleton = loadAnimation("../Images/skeleton1.png" , "../Images/skeleton2.png");

       trap = loadAnimation("../Images/trap1");
       trap_traping = loadAnimation("../Images/trap2.png" , "../Images/trap3.png" , "../Images/trap4.png" , "../Images/trap5.png" , "../Images/trap6.png");

       bat = loadAnimation("../Images/bat1.png" , "../Images/bat2.png" , "../Images/bat3.png");
       restartImg = loadImage("../Images/restart.png");
       gameOverImg = loadImage("../Imagegs/gameOver");
       backgroundImg = loadImage("../Images/background.jpg");
     }
 
     function setup(){
      canvas = createCanvas(displayWidth - 20, displayHeight-30);

      ninja = createSprite(50,160,20,50);
      ninja.addAnimation("running", ninja_running);
      ninja.addAnimation("collided", ninja_collided);
      ninja.addAnimation("attack", ninja_attack);

      ninja.scale = 0.5;
      ninja.setCollider("rectangle",0,0,ninja.width,ninja.height);
      ninja.debug = true

      ghost = createSprite(300,60,30,30);
      ghost.addAnimation("running", ghost_running);

      skeleton = createSprite(160,160,30,30);
      skeleton.addAnimation("running",skeleton_run);

      gameOver = createSprite(300,100);
      gameOver.addImage(gameOverImg);
      
      restart = createSprite(300,140);
      restart.addImage(restartImg);
      
      gameOver.scale = 0.5;
      restart.scale = 0.5;

      //ground = createSprite(200,180,400,20);
      //ground.addImage("ground",groundImage);
      //ground.x = ground.width /2;
      obstaclesGroup = createGroup();
      //skeletonGroup = createGroup();
      //ghostGroup = createGroup();
      

      score = 0;
 
     }
 
     function draw(){
      background(backgroundImg);

      if(gameState === PLAY){
        gameOverImg.visible = false;
        restartImg.visible = flase;

        score = score + Math.round(getFrameRate()/60);

        if(score>0 && score%100 === 0){
         // checkPointSound.play() 
        }

        if(keyDown("space")&& ninja.y >= 100) {
         ninja.velocityY = -12;
        }

       ninja.velocityY = ninja.velocityY + 0.8

        if(obstaclesGroup.isTouching(ninja)){
          //trex.velocityY = -12;
          //jumpSound.play();
          gameState = END;
          //dieSound.play()
   
      }

      if(trap.isTouching(ninja)){
        gameState = END;
      }

      //spawn the clouds
    spawnObstacles();
    //spawnghost();
   // spawnSkeleton();
  
    //spawn obstacles on the ground
    //spawnObstacles();

     }

     else if (gameState === END) {
       gameOver.visible = true;
       restart.visible = true;
     
      //change the ninja animation
       ninja.changeAnimation("collided", ninja_collided);
    
     
     
       ground.velocityX = 0;
       ninja.velocityY = 0;

       obstaclesGroup.setLifetimeEach(-1);
       //cloudsGroup.setLifetimeEach(-1);
     
       obstaclesGroup.setVelocityXEach(0);
       //cloudsGroup.setVelocityXEach(0);    
      
      if(mousePressedOver(restart)) {
      reset();
      }
    }
    displaySprites();
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    //cloudsGroup.destroyEach();
    ninja.changeAnimation("running", trex_running);
    score = 0;
  
  }

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
      //   case 4: obstacle.addImage(obstacle4);
      //          break;
      //   case 5: obstacle.addImage(obstacle5);
      //           break;
      //   case 6: obstacle.addImage(obstacle6);
      //           break;
      //  default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

  /* function spawnskeleton(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
      //   case 2: obstacle.addImage(obstacle2);
       //          break;
      //   case 3: obstacle.addImage(obstacle3);
      //           break;
      //   case 4: obstacle.addImage(obstacle4);
      //          break;
      //   case 5: obstacle.addImage(obstacle5);
      //           break;
      //   case 6: obstacle.addImage(obstacle6);
      //           break;
      //  default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }*/