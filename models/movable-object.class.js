class MovableObject extends DrawableObject {
  otherDirection = false;
  directionCounter = 199;
  energy = 100;
  bossEnergy = 100;
  acceleration = 2; // Wie schnell unser Charakter beschleunigt werden soll
  speed = 0.3;
  speedY = 0;
  coin = 0;
  salsabottle = 0;
  character = {
    left : 20,//left
    top : 120,//top
    right : 35, //right
    bottom : 20//bottom
  };
  coins = {
    left : 30,
    top : 30,
    right : 30,
    bottom : 30
  };
  salsabottles = { 
    left : 20,
    top : 5,
    right : 20,
    bottom : 5
  };
  boss = {
    top : 60,
    bottom : 70,
    left : 40
  };
  characterMass = {
    characterYtop : 0,
    characterYbottom : 0,
    characterXright : 0,
    characterXleft : 0,
  }

  updateCharacterMass() {
    this.characterMass.characterYtop = this.y + this.character.top, // Kopf Character
    this.characterMass.characterYbottom = this.y + this.height, //Fuß Character
    this.characterMass.characterXright = this.x + this.width - this.character.left, // Brust Character
    this.characterMass.characterXleft = this.x + this.character.right // Rücken Character
  }  

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // speedY soll negativ sein deswegen ziehen wir etwas von this.y ab (-=)
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 156; // Gibt den Wert von "this.y < 155 wieder"
    }
  }

  /**
   *
   * @param mo = Ob Character oder Chicken (mobile objects)
   * @returns = Ob die Objekte miteinander kolidieren
   */
  isCollidingEnemy(mo) {
    this.updateCharacterMass();
    let enemyYtop = mo.y; // Kopf Enemy
    let enemyYbottom = mo.y + mo.height; // Fuß Enemy
    let enemyXleft = mo.x; // Brust Enemy
    let enemyXright = mo.x + mo.width; // Rücken Enemy
    return enemyXleft < this.characterMass.characterXright && enemyXright > this.characterMass.characterXleft && enemyYtop < this.characterMass.characterYbottom && enemyYbottom > this.characterMass.characterYtop;
    }

  isCollidingEndboss(mo) {
    this.updateCharacterMass();
    let endbossYtop = mo.y + this.boss.top; // Kopf Endboss
    let endbossYbottom = mo.y + mo.height - this.boss.bottom; // Fuß Endboss
    let endbossXleft = mo.x + this.boss.left; // Brust Endboss
    let endbossXright = mo.x + mo.width; // Rücken Endboss
    return endbossXleft < this.characterMass.characterXright && endbossXright > this.characterMass.characterXleft && endbossYtop < this.characterMass.characterYbottom && endbossYbottom > this.characterMass.characterYtop;
    }

  salsabottleIsCollidingEndboss(mo) {
    let salsaBottleYtop = this.world.throwableObjects[0].y + 7; // Kopf Salsabottle
    let salsaBottleYbottom = this.world.throwableObjects[0].y + this.world.throwableObjects[0].height - 7; //Fuß Salsabottle
    let salsaBottleXright = this.world.throwableObjects[0].x + this.world.throwableObjects[0].width - 5; // Brust Salsabottle
    let salsaBottleXleft = this.world.throwableObjects[0].x + 5; // Rücken Salsabottle

    let endbossYtop = mo.y + this.boss.top; // Kopf Endboss
    let endbossYbottom = mo.y + mo.height - this.boss.bottom; // Fuß Endboss
    let endbossXleft = mo.x + this.boss.left; // Brust Endboss
    let endbossXright = mo.x + mo.width; // Rücken Endboss
    return endbossXleft < salsaBottleXright && endbossXright > salsaBottleXleft && endbossYtop < salsaBottleYbottom && endbossYbottom > salsaBottleYtop;
    }

  isCollidingAboveEnemy(mo) {
    this.updateCharacterMass();
    let enemyYtop = mo.y; // Kopf Enemy
    let enemyYbottom = mo.y + mo.height - 10; // Fuß Enemy
    let enemyXleft = mo.x; // Brust Enemy
    let enemyXright = mo.x + mo.width; // Rücken Enemy
    return enemyXleft < this.characterMass.characterXright && enemyXright > this.characterMass.characterXleft && enemyYtop < this.characterMass.characterYbottom && enemyYbottom > this.characterMass.characterYtop;
    }

  isCollidingCoin(mo) {
    this.updateCharacterMass();
    let coinYtop = mo.y + this.coins.bottom;
    let coinYbottom = mo.y + mo.height - this.coins.top;
    let coinXleft = mo.x + this.coins.right;
    let coinXright = mo.x + mo.width - this.coins.left;
    return coinXleft < this.characterMass.characterXright && coinXright > this.characterMass.characterXleft && coinYtop < this.characterMass.characterYbottom && coinYbottom > this.characterMass.characterYtop;
  }

  isCollidingSalsabottle(mo) {
    this.updateCharacterMass();
    let salsabottleYtop = mo.y + this.salsabottles.bottom;
    let salsabottleYbottom = mo.y + mo.height - this.salsabottles.top;
    let salsabottleXright = mo.x + mo.width + this.salsabottles.left;
    let salsabottleXleft = mo.x + this.salsabottles.right;
    return salsabottleXleft < this.characterMass.characterXright && salsabottleXright > this.characterMass.characterXleft && salsabottleYtop < this.characterMass.characterYbottom && salsabottleYbottom > this.characterMass.characterYtop;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
