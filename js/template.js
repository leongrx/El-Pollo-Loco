function startscreenHTML() {
  return /*html*/ `
    <img id="startscreenImg" src="./img/9_intro_outro_screens/start/startscreen_1.png">
    <img onclick="play()" id="playBtn" src="./img/5_background/icons/play.png" alt="">
    `;
}

function keyboardDescriptionHTML() {
  return /*html*/ `
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/D.png" alt="">
            <span class="keyboardDescription">Throw</span>
        </div>
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/space.png" alt="">
            <span class="keyboardDescription">Jump</span>
        </div>
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/leftArrow.png" alt="">
            <span class="keyboardDescription">Left</span>
        </div>
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/rightArrow.png" alt="">
            <span class="keyboardDescription">Right</span>
        </div>
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/F.png" alt="">
            <span class="keyboardDescription">Fullscreen</span>
        </div>
        <div class="keyboard">
            <img class="keyboardFrame" src="img/5_background/icons/frame.png" alt="">
            <img class="keyLetter" src="img/5_background/icons/M.png" alt="">
            <span class="keyboardDescription">Mute</span>
        </div>`;
}

function gameoverHTML() {
  return /*html*/ `
    <img id="gameoverImg" src="img/9_intro_outro_screens/game_over/game over.png" alt="">
    <button onclick="preInit()" id="returnBtn">Return</button>
    `;
}

function mobileKeyboardHTML() {
  return /*html*/ `
          <div class="leftMobileKeyboard">
            <div class="mobileKeyboard">
                <img class="mobileOperation" id="btnLeft" src="img/5_background/icons/mobileArrowLeft.png">
            </div>
            <div class="mobileKeyboard">
                <img class="mobileOperation" id="btnRight" src="img/5_background/icons/mobileArrowRight.png">
            </div>
          </div>

          <div class="rightMobileKeyboard">
            <div class="mobileKeyboard">
                <img class="mobileOperation" id="btnJump" src="img/5_background/icons/mobileArrowJump.png">
            </div>
            <div class="mobileKeyboard">
                <img class="mobileOperation" id="btnThrow" src="img/5_background/icons/mobileArrowAttack.png">
            </div>
          </div>`;
          
}
