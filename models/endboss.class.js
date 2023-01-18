class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 7.5;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  
  world;
  bossWalkingTime = 0;
  gameWin_sound = new Audio("audio/gameWin.mp3");
  endbossFalling_sound = new Audio("audio/endbossFalling.mp3");
  endbossFight_sound = new Audio("audio/endbossFight.mp3");
  endbossHitted_sound = new Audio("audio/endbossHitted.mp3");

  constructor(world) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.world = world;
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2450;
    this.animate();
  }

  animate() {
    if (!this.speed > 0) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
      }, 200);
    }
  }

  isHurt() {
    this.playAnimation(this.IMAGES_HURT);
  }

  isDead() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 250)

    this.endbossFallingDown();
  }

  isWalking() {
    if (this.world.currentWalking) {
      this.playAnimation(this.IMAGES_WALK);
    }
    this.moveLeft();
  }

  coolDownDirection() {
    this.coolDownDirections = true;
    setTimeout(() => {
      this.coolDownDirections = false;
    }, 2100);
  }

  checkDirectionCounter() {
    setInterval(() => {
        if (this.canChangeDirectionRight()) {
            this.directionCounter++;
            this.isAttacking();
            this.coolDownDirection();
          } else if (this.canChangeDirectionLeft()) {
            this.directionCounter++;
            this.isAttacking();
            this.coolDownDirection();
          }
    }, 200)
  }

  canChangeDirectionRight() {
    return this.x < 100 && !this.coolDownDirections;
  }

  canChangeDirectionLeft() {
    return this.x > 2200 && !this.coolDownDirections;
  }

  isAttacking() {
    this.speed = 20;
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.directionCounter % 2) {
        this.otherDirection = true;
        this.moveRight();
    } else {
        this.otherDirection = false;
        this.moveLeft();
    }
  }

  endbossFallingDown() {
    setInterval(() => {
      this.y += 10;
      if (!this.world.hasBeenPlayed) {
        this.endbossFallingDownExecution();
      }
    }, 50);
  }
  
  endbossFallingDownExecution() {
    this.world.hasBeenPlayed = true;
    this.world.gameIsOver = true;
    this.world.playEndbossFallingDown();
    gameOver();
  }

  bossWalking() {
    this.bossWalkingTimer();
    if (this.bossWalkingTime <= 2) {
      this.checkDirectionCounter();
      this.isWalking();
    } else if (this.bossWalkingTime > 2) {
      this.isAttacking();
      this.world.currentWalking = false;
    }
  }
  
  bossWalkingTimer() {
    setInterval(() => {
      if (this.bossWalkingTime <= 3) {
        this.bossWalkingTime += 1;
      }
    }, 1000);
  }

}
