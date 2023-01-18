class StatusbarCoin extends DrawableObject {
  width = 200;
  height = 50;
  y = 45;

  IMAGES_STATUSBAR_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  getCoin_sound = new Audio("audio/getCoin.mp3");
  world;

  constructor(world) {
    super().loadImage(this.IMAGES_STATUSBAR_COIN[0]);
    this.world = world;
    this.x = 25;

    this.setPercentage();
  }

  setPercentage() {
    setInterval(() => {
      if (this.world.character.coin > 81) {
        this.loadImage(this.IMAGES_STATUSBAR_COIN[5]);
      } else if (this.world.character.coin > 61) {
        this.loadImage(this.IMAGES_STATUSBAR_COIN[4]);
      } else if (this.world.character.coin > 41) {
        this.loadImage(this.IMAGES_STATUSBAR_COIN[3]);
      } else if (this.world.character.coin > 21) {
        this.loadImage(this.IMAGES_STATUSBAR_COIN[2]);
      } else if(this.world.character.coin > 0){
        this.loadImage(this.IMAGES_STATUSBAR_COIN[1]);
      } else {
        this.loadImage(this.IMAGES_STATUSBAR_COIN[0])
      }
    }, 200);
  }
}
