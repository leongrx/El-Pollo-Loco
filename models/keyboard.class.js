class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  D = false;
  F = false;
  M = false;
  
  constructor() {
    this.touchEvents();
  }

  touchEvents() {
    this.leftTouchButtons();
    this.rightTouchButtons();
    this.jumpTouchButtons();
    this.throwTouchButtons();
  }
  
  leftTouchButtons() {
      document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
      });
      
      document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
      });
    }

    rightTouchButtons() {
      document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
      });
      
      document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
      });
    }

    jumpTouchButtons() {
      document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
      });
      
      document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
      });
    }

    throwTouchButtons() {
      document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
      });
      
      document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
      });
    }

}