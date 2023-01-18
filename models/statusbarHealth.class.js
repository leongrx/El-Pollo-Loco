class StatusbarHealth extends DrawableObject {
  width = 200;
  height = 50;
  y = 1;

  IMAGES_STATUSBAR_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  world;

  constructor(world) {
    super().loadImage(this.IMAGES_STATUSBAR_HEALTH[0]);
    this.world = world;
    this.x = 25;
    
    this.setPercentage();
  }

  setPercentage() {
    setInterval(() => {
      if (this.world.character.energy > 81) {
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[5]);
      } else if (this.world.character.energy > 61) {
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[4]);
      } else if (this.world.character.energy > 41) {
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[3]);
      } else if (this.world.character.energy > 21) {
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[2]);
      } else if(this.world.character.energy > 0){
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[1]);
      } else {
        this.loadImage(this.IMAGES_STATUSBAR_HEALTH[0])
        this.world.character.isDead();
      }
    }, 200);
  }

  
}
