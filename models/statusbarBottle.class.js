class StatusbarBottle extends DrawableObject {
  width = 200;
  height = 50;
  y = 90;

  IMAGES_STATUSBAR_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  getSalsabottle_sound = new Audio("audio/getSalsabottle.mp3");
  salsabottleBreak_sound = new Audio('audio/salsabottleBreak.mp3');
  world;

  constructor(world) {
    super().loadImage(this.IMAGES_STATUSBAR_BOTTLE[0]);
    this.world = world;
    this.x = 25;

    this.setPercentage();

  }

  setPercentage() {
    setInterval(() => {
      if (this.world.character.salsabottle > 81) {
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[5]);
      } else if (this.world.character.salsabottle > 61) {
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[4]);
      } else if (this.world.character.salsabottle > 41) {
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[3]);
      } else if (this.world.character.salsabottle > 21) {
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[2]);
      } else if(this.world.character.salsabottle > 0){
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[1]);
      } else {
        this.loadImage(this.IMAGES_STATUSBAR_BOTTLE[0])
      }
    }, 200);
  }

}