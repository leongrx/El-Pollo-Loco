class DrawableObject {
  x = 120;
  y = 290;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  // loadImage('img/test.png')
  /**
   * Mit loadImage() laden wir unsere Bilder. In dieser Funktion wird "path", also quasi der Pfad mitgegeben. Mit this.img greifen wir auf das
   * äußere img zu und fügen mit "new Image()" ein Bild hinzu. Dabei müssen wir das "Image()" bei "new Image()" nicht neu definieren, sondern
   * ist bereits eine vordefinierte Javascript Abbildung von dem <img>. Also quasi: this.img = document.getElementById('image'); <img id=image">
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        img.style = "transform: scaleX(-1)";
        this.imageCache[path] = img;
      });
  }

  drawImage(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}