class Character extends MovableObject {
  height = 273;
  y = 0 ;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];
  IMAGES_KILLEDENEMY = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ]
  world;
  startIdle = 0;
  walking_sound = new Audio("audio/walking.mp3");
  characterFalling_sound = new Audio("audio/characterFalling.mp3");
  characterHitted_sound = new Audio("audio/characterHitted.mp3");

  constructor(world) {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.world = world;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_KILLEDENEMY);

    this.applyGravity();
    this.animate();
    this.walkAndIdle();
    this.walkAnimation();
  }
  
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      this.walkRight();
      this.walkLeft();
      this.ifJump();
      this.world.camera_x = -this.x + 100;
    }, 20);
  }
  
  playWalkingSound() {
    if(this.world.isVolumeOn == true) {
      this.walking_sound.play();
    } else {
      this.walking_sound.pause();
    }
  }
  
  walkRight() {
    if (this.canWalkRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.playWalkingSound();
    }
  }

  canWalkRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  walkLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.playWalkingSound();
    }
  }

  ifJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
  }

  walkAndIdle() {
    this.ifAboveGround();
    this.ifIdle();
    this.ifLongIdle();
  }

  walkAnimation() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()) {
          this.playAnimation(this.IMAGES_WALKING);
      }
    }, 75);
  }

  ifAboveGround() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.startIdle = 0;
      } 
    }, 125);
  }
  
  ifIdle() {
    setInterval(() => {
      if (this.canIdle()) {
          this.playAnimation(this.IMAGES_IDLE);
          setInterval(this.timer());
        }
      }, 200);
    }
  
  canIdle() {
    return !this.world.keyboard.RIGHT &&
    !this.world.keyboard.LEFT &&
    this.startIdle < 5
  }

  ifLongIdle() {
    setInterval(() => {
      if (this.startIdle >= 5) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }
    }, 400);
  }

  timer() {
    if (this.startIdle < 5) {
      this.startIdle += 0.2;
    }
  }

  jump() {
    this.startIdle = 0;
    this.speedY = 25;
  }

  isHurt() {
    this.playAnimation(this.IMAGES_HURT);
  }

  killedEnemy() {
    this.loadImage(this.IMAGES_KILLEDENEMY, 100, 100, 50, 50);
  }
  
  isDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.characterFallingDown();
  }
  
  characterFallingDown() {
    setInterval(() => {
      this.y += 10;
      if(!this.world.hasBeenPlayed) {
        this.pauseSounds();
        this.world.playCharacterFallingDown();
        this.world.hasBeenPlayed = true;
        this.world.gameIsOver = true;
        gameOver();
      }
    }, 50)
  }
  
  pauseSounds() {
    this.world.gameSound_sound.pause();
    this.world.gameSound_sound.loop = false;
    this.world.gameSound_sound.currentTime = 0;
    this.world.endboss.endbossFight_sound.pause();
    this.world.endboss.endbossFight_sound.currentTime = 0;
    this.world.endboss.endbossFight_sound.loop = false;
  }

}
