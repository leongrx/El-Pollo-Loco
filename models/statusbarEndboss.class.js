class StatusbarEndboss extends DrawableObject {
    width = 200;
    height = 50;
    y = 1;

    IMAGES_STATUSBAR_ENDBOSS = [
        "img/7_statusbars/2_statusbar_endboss/orange/0.png",
        "img/7_statusbars/2_statusbar_endboss/orange/20.png",
        "img/7_statusbars/2_statusbar_endboss/orange/40.png",
        "img/7_statusbars/2_statusbar_endboss/orange/60.png",
        "img/7_statusbars/2_statusbar_endboss/orange/80.png",
        "img/7_statusbars/2_statusbar_endboss/orange/100.png"
    ]
    world;
    done = false;

    constructor(world) {
        super().loadImage(this.IMAGES_STATUSBAR_ENDBOSS[0])
        this.world = world;
        this.x = canvas.height - 10;

        this.setPercentage();
        this.awakeEndboss();
    }

    setPercentage() {
        setInterval(() => {
          if (this.world.endboss.bossEnergy > 81) {
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[5]);
          } else if (this.world.endboss.bossEnergy > 61) {
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[4]);
          } else if (this.world.endboss.bossEnergy > 41) {
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[3]);
          } else if (this.world.endboss.bossEnergy > 21) {
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[2]);
          } else if(this.world.endboss.bossEnergy > 0){
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[1]);
          } else {
            this.loadImage(this.IMAGES_STATUSBAR_ENDBOSS[0])
            this.ifDone();
            this.pauseEndbossFightSound();
          }
        }, 100);
    }

    ifDone() {
      if(!this.done){
        this.done = true;
        this.world.endboss.isDead();
      }
    }

    awakeEndboss() {
      setInterval(() => {
        if (this.world.endboss.bossEnergy <= 90 && this.world.endboss.bossEnergy > 0) {
          this.world.endboss.bossWalking();
          this.ifVolumeOnSwitchSound();
        } 
      }, 200)
    }

    ifVolumeOnSwitchSound() {
      if(this.world.isVolumeOn) {
        this.switchGameSoundToFightSound();
      }
    }

    pauseEndbossFightSound() {
      if(this.world.endboss.bossEnergy == 0) {
        this.world.endboss.endbossFight_sound.pause();
        this.world.endboss.endbossFight_sound.currentTime = 0;
        this.world.endboss.endbossFight_sound.loop = false;
      }
    }

    switchGameSoundToFightSound() {
      this.world.endboss.endbossFight_sound.play();
      this.world.endboss.endbossFight_sound.loop = true;
      this.world.gameSound_sound.pause();
      this.world.gameSound_sound.loop = false;
    }

}