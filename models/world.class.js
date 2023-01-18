class World {
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character;
  endboss;
  statusbarHealth;
  statusbarCoin;
  statusbarBottle;
  statusbarEndboss;
  throwableObjects = [];
  isVolumeOn = true;
  isFullscreen = false;
  gamestate = false;
  gameIsOver = false;
  runOnce = true;
  coolDownDirections = false;
  hasBeenPlayed = false;
  currentWalking = false;
  gameSound_sound = new Audio('audio/gameSound.mp3');

  constructor(canvas, keyboard) {
    /**
     * Mit der Variable ctx kann man nun durch das "getContext("2d")" auf dem Canvas im 2d Format zeichnen.
     * Ohne das "getContext("2d")" geht es nicht.
     */
    this.ctx = canvas.getContext("2d", {alpha: false});
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.endboss = new Endboss(this);
    this.statusbarHealth = new StatusbarHealth(this);
    this.statusbarCoin = new StatusbarCoin(this);
    this.statusbarBottle = new StatusbarBottle(this);
    this.statusbarEndboss = new StatusbarEndboss(this);
    this.checkGamestate();
  }

  checkGamestate() {
    setInterval(() => {
      if (this.gamestate && this.runOnce) {
        this.setWorld();
        this.run();
        this.runOnce = false;
      }
    }, 100);
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    this.statusbarHealth.world = this;
    this.statusbarCoin.world = this;
    this.statusbarBottle.world = this;
    this.statusbarEndboss.world = this;
  }

  run() {
    this.checkThrowObjects();
    this.checkCollisionEnemy();
    this.checkCollisionAboveEnemy();
    this.checkCollisionCoin();
    this.checkCollisionSalsabottle();
    this.checkCollisionCharacterEndboss();
    this.playGameSound();
  }

  checkThrowObjects() {
    setInterval(() => {
      if (this.keyboard.D && this.character.salsabottle > 0 && this.throwableObjects.length <= 0) {
        this.checkThrowObjectsExecution();
      }
    }, 100);
  }
  
  checkThrowObjectsExecution() {
    let bottle = new ThrowableObject(this.character.x, this.character.y, this);
    this.throwableObjects.push(bottle);
    this.character.salsabottle -= 10;
    this.character.startIdle = 0;
    this.checkCollisionEndboss();
  }
  
  checkCollisionCharacterEndboss() {
    setInterval(() => {
      if (
        this.character.isCollidingEndboss(this.endboss) &&
        this.character.energy > 0
        ) {
          this.checkCollisionCharacterEndbossExecution();
        }
      }, 50);
    }
    
    checkCollisionCharacterEndbossExecution() {
      this.character.isHurt();
      this.playCharacterHittedSound();
      this.character.energy -= 0.2;
      this.character.startIdle = 0;
    }
    
    checkCollisionEndboss() {
      setInterval(() => {
        if (this.throwableObjects.length > 0) {
          if (this.canCollideEndboss()) {
            this.checkCollisionEndbossExecution();
          } else if(this.throwableObjects[0].y > 400) {
            this.throwableObjects = [];
            this.playSalsabottleBreakSound();
          }
        }
      }, 50);
    }
    
    canCollideEndboss() {
      return this.character.salsabottleIsCollidingEndboss(this.endboss) &&
      this.endboss.bossEnergy > 0
    }
    
    checkCollisionEndbossExecution() {
      this.endboss.bossEnergy -= 20;
      this.character.startIdle = 0;
      this.throwableObjects = [];    
      this.endboss.isHurt();
      this.playSalsabottleBreakSound();
      this.playEndbossHittedSound();
  }

  checkCollisionAboveEnemy() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.canCollideAboveEnemy(enemy)) {
          this.checkCollisionAboveEnemyExecution(enemy);
        }
      });
    }, 50);
  }

  canCollideAboveEnemy(enemy) {
    return this.character.isCollidingAboveEnemy(enemy) &&
    this.character.isAboveGround() &&
    this.character.speedY < 1
  }

  checkCollisionAboveEnemyExecution(enemy) {
    this.character.speedY = 17;
    let removeEnemy = this.level.enemies.indexOf(enemy);
    this.level.enemies.splice(removeEnemy, 1);
    this.character.characterHitted_sound.pause();
  }

  checkCollisionCoin() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isCollidingCoin(coin) && this.character.coin < 100) {
          this.checkSoundIsPaused();
          this.playGetCoinSound();
          this.checkCollisionCoinExecution(coin);
        }
      });
    }, 50);
  }

  checkCollisionCoinExecution(coin) {
    let removeCoin = this.level.coins.indexOf(coin);
    this.level.coins.splice(removeCoin, 1);
    this.character.coin += 10;
  }

  checkCollisionEnemy() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.canCollideEnemy(enemy)) {
          this.checkCollisionEnemyExecution();
        }
      });
    }, 50);
  }
  
  canCollideEnemy(enemy) {
    return this.character.isCollidingEnemy(enemy) &&
    this.character.energy > 0
  }
  
  checkCollisionEnemyExecution() {
    if(this.character.speedY < 1) {
      this.playCharacterHittedSound();
      this.character.isHurt();
      this.character.energy -= 1;
      this.character.startIdle = 0;
    }
  }

  checkCollisionSalsabottle() {
    setInterval(() => {
      this.level.salsabottle.forEach((salsabottle) => {
        if (this.canGetSalsabottle(salsabottle)) {
          this.checkSoundIsPaused();
          this.playGetSalsabottleSound();
          this.checkCollisionSalsabottleExecution(salsabottle);
        }
      });
    }, 50);
  }

  canGetSalsabottle(salsabottle) {
    return this.character.isCollidingSalsabottle(salsabottle) &&
    this.character.salsabottle < 100
  }

  checkCollisionSalsabottleExecution(salsabottle) {
    let removeSalsabottle = this.level.salsabottle.indexOf(salsabottle);
    this.level.salsabottle.splice(removeSalsabottle, 1);
    this.character.salsabottle += 10;
  }

  checkSoundIsPaused() {
    if (!this.statusbarCoin.getCoin_sound.paused) {
      this.statusbarCoin.getCoin_sound.pause();
      this.statusbarCoin.getCoin_sound.currentTime = 0;
    }
    if (!this.statusbarBottle.getSalsabottle_sound.paused) {
      this.statusbarBottle.getSalsabottle_sound.pause();
      this.statusbarBottle.getSalsabottle_sound.currentTime = 0;
    }
    if (!this.statusbarBottle.salsabottleBreak_sound.paused) {
      this.statusbarBottle.salsabottleBreak_sound.pause();
      this.statusbarBottle.salsabottleBreak_sound.currentTime = 0;
    }
    if (!this.endboss.endbossHitted_sound.paused) {
      this.endboss.endbossHitted_sound.pause();
      this.endboss.endbossHitted_sound.currentTime = 0;
    }
  }

  playFightSound() {
    if(!this.isVolumeOn) {
      this.endboss.endbossFight_sound.pause();
      this.endboss.endbossFight_sound.loop = false;
    } else if(this.isVolumeOn && this.gameSound_sound.paused) {
      this.endboss.endbossFight_sound.play();
      this.endboss.endbossFight_sound.loop = true;
    }
  }

  playGameSound() {
    if(!this.isVolumeOn) {
      this.gameSound_sound.pause();
      this.gameSound_sound.loop = false;
    } else if(this.isVolumeOn && this.endboss.endbossFight_sound.paused) {
      this.gameSound_sound.play();
      this.gameSound_sound.loop = true;
    }
  }

  playCharacterHittedSound() {
      if (!this.isVolumeOn) {
        this.character.characterHitted_sound.pause();
      } else if (this.isVolumeOn) {
        this.character.characterHitted_sound.play();
      }
  }

  playEndbossHittedSound() {
    if (!this.isVolumeOn) {
      this.endboss.endbossHitted_sound.pause();
    } else if (this.isVolumeOn) {
      this.endboss.endbossHitted_sound.play();
    }
  }
  
  playSalsabottleBreakSound() {
    if (!this.isVolumeOn) {
      this.statusbarBottle.salsabottleBreak_sound.pause();
    } else if (this.isVolumeOn) {
      this.statusbarBottle.salsabottleBreak_sound.play();
    }
  }

  playCharacterFallingDown() {
    if (!this.isVolumeOn) {
      this.character.characterFalling_sound.pause();
    } else if (this.isVolumeOn) {
      this.character.characterFalling_sound.loop = false;
      this.character.characterFalling_sound.play();
    }
  }

  playGetCoinSound() {
    if (!this.isVolumeOn) {
      this.statusbarCoin.getCoin_sound.pause();
    } else if (this.isVolumeOn) {
      this.statusbarCoin.getCoin_sound.play();
    }
  }

  playGetSalsabottleSound() {
    if (!this.isVolumeOn) {
      this.statusbarBottle.getSalsabottle_sound.pause();
    } else {
      this.statusbarBottle.getSalsabottle_sound.play();
    }
  }

  playEndbossFallingDown() {
    if (!this.isVolumeOn) {
      this.endboss.endbossFalling_sound.pause();
    } else if (this.isVolumeOn) {
      this.endboss.endbossFalling_sound.loop = false;
      this.endboss.endbossFalling_sound.play();
    }
  }

  /**
   * Bei der draw() Funktion wird die Welt gezeichnet.
   * Ohne das "clearRect()" würden alle Bilder weiterhin existieren. Läufst du also einmal nach rechts, würde das aktuelle Bild bestehen bleiben und ein neues,
   * dass gelaufene, hinzugefügt werden ohne dass das alte gelöscht wird. Also hast du dann 2 Bilder und immer so weiter. Also jedesmal, wenn die "draw()" Funktion
   * unten bei der "requestAnimationFram()" Funktion aufgerufen wird, wird zuerst dass ganze Canvas gelöscht.
   * Die "requestAnimationFrame" Funktion sorgt dafür, dass die "self.draw()" Funktion so häufig ausgeführt wird, wie die Grafikkarte hergibt.
   * Die Funktion in der "requestAnimationFrame", also die "self.draw()" Funktion wird erst ausgeführt, sobald alles darüber gezeichnet wurde.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMapFunctions();
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMapFunctions();
    this.ifDrawFunction();
  }
  
  ifDrawFunction() {
    if (this.gamestate) {
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  addObjectsToMapFunctions() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.salsabottle);
  }

  addToMapFunctions() {
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarEndboss);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawImage(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
