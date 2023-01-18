class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    salsabottle;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins, salsabottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsabottle = salsabottle;
    }
}