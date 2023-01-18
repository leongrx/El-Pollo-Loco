class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    IMAGES_CLOUD = [
        "img/5_background/layers/4_clouds/1.png",
        "img/5_background/layers/4_clouds/2.png",
    ];
    

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUD);
        this.x = Math.random() * 6000; // Eine Zahl zwischen 0 und 2200
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}