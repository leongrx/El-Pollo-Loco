class Coins extends MovableObject {

    width = 100;
    height = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);

        this.x = 200 + Math.random() * 2000; // Eine Zahl zwischen 200 und 2200   
        this.y = 100 + Math.random() * 10 * 25;
    }

}