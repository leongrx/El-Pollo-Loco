let canvas;
let world;
let keyboard;
alertCounter = 0;

/**
 * Die Init() Funktion ist dafür da, um die "id=canvas" an eine Variable zu binden. Mit der Variable "canvas" können wir nun zeichnen.
 * Ebenfalls eröffnen wir quasi eine neue Welt und binden dies an die Variable "world".
 * Bei der Erstellung der neuen Welt wird die Variable "Canvas" mitgegeben, damit wir im model "world.class.js" die Welt zeichnen können.
 */
function preInit() {
  disableCanvas();
  disablePreloader();
  loadTemplate();
  disableGameoverReturnbtn();
  rotateDevice();
}

function loadTemplate() {
  document.getElementById("startscreen").innerHTML = startscreenHTML();
  document.getElementById("keyboardContainer").innerHTML = keyboardDescriptionHTML();
  document.getElementById("gameover").innerHTML = gameoverHTML();
  document.getElementById("mobileKeyboardContainer").innerHTML = mobileKeyboardHTML();
}

function disableGameoverReturnbtn() {
  let gameover = document.getElementById("gameoverImg");
  let returnBtn = document.getElementById("returnBtn");
  gameover.classList.add("d-none");
  returnBtn.classList.add("d-none");
}

function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  world.gamestate = true;
}

function disablePreloader() {
  document.getElementById("preloader").classList.add("d-none");
}

function preloader() {
  let preloader = document.getElementById("preloader");
  preloader.classList.remove("d-none");
  preloader.style.opacity = "1";
}

function play() {
  document.getElementById('canvas').style.visibility="visible";
  preloader();
  awaitPlay();
  disableStartscreenPlaybtn();
}

function disableStartscreenPlaybtn() {
  let startscreen = document.getElementById("startscreenImg");
  let playBtn = document.getElementById("playBtn");
  startscreen.classList.add("d-none");
  playBtn.classList.add("d-none");
}

function awaitPlay() {
  level1 = getLevel1();
  init();
  drawWorld();
}

function drawWorld() {
  world.draw();
  setTimeout(() => {
    disablePreloader();
  }, 1500);
}

function gameOver() {
  world.isVolumeOn = false;
  laterGameOverExecution();
  if (world) {
    world.runOnce = true;
  }
}

function laterGameOverExecution() {
  setTimeout(() => {
    clearAllIntervals();
    displayGameoverReturnbtn();
    world = undefined;
    disableCanvas();
  }, 500);
}

function disableCanvas() {
  setInterval(() => {
    if(window.innerWidth <= 720 && !world) {
      document.getElementById('canvas').style.visibility="hidden";
    }
  }, 200);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i)
  };
}

function displayGameoverReturnbtn() {
  world.gamestate = false;
  world.gameIsOver = false;
  let gameover = document.getElementById("gameoverImg");
  let returnBtn = document.getElementById("returnBtn");
  gameover.classList.remove("d-none");
  returnBtn.classList.remove("d-none");
}

function rotateDevice() {
  setTimeout(() => {
    if (window.innerHeight > window.innerWidth) {
      alert("Please rotate your Mobile");
    }
  }, 1500)
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 77 && world.isVolumeOn == true) {
    world.isVolumeOn = false;
    world.playGameSound();
    world.playFightSound();
  } else if (e.keyCode == 77 && world.isVolumeOn == false) {
    world.isVolumeOn = true;
    world.playGameSound();
    world.playFightSound();
  }
  if (e.keyCode == 70 && world.isFullscreen == false) {
    world.isFullscreen = true;
    canvas.requestFullscreen();
  } else if (e.keyCode == 70 && world.isFullscreen == true) {
    world.isFullscreen = false;
    document.exitFullscreen();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
