class ThrowableObject extends MovableObject {

    IMAGES_BOTTLEROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]
    world;

    constructor(x, y, world) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_BOTTLEROTATION);
        this.world = world;
        this.x = x + 25;
        this.y = y + 120;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwWhichDirection();
        this.playThrowableObjects();
    }

    playThrowableObjects() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLEROTATION);
        }, 100) 
    }

    throwWhichDirection() {
        if(!this.world.character.otherDirection && this.world.keyboard.D) {
            setInterval(() => {
                this.x += 25;
            }, 50);
        } else if (this.world.character.otherDirection && this.world.keyboard.D) {
            setInterval(() => {
                this.x -= 25;
            }, 50);
        }
    }

}