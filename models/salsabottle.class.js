class Salsabottle extends MovableObject{
    height = 50;
    width = 50;
    y = 370;

    IMAGES_SALSABOTTLE = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
    constructor() {
        super().loadImage(this.IMAGES_SALSABOTTLE[0]);
        this.loadImages(this.IMAGES_SALSABOTTLE);

        this.x = 200 + Math.random() * 2000;
    }
}