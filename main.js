// Helicopter Game Start
// add vertical zones where the helicopter must get out of by x seconds

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";
let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let mouseIsPressed = false;
let leftKeyisPressed = false;
let rightKeyisPressed = false;
let upKeyisPressed = false;

// Global Variables (repeated)
let state;
let heli;
let distance = 0;
let latestScore = 0;
let bestScore = 0;
let wallSpeed = -3;
let rValue = 0;
let rZone1X = 0;
let rZone2X = 1500;
let randZone1 = Math.random() * 600 + 300;
let randDistanceEnd1 = Math.random() * 300 + 50;
let randDistanceEnd2 = Math.random() * 1300 + 75;

let rZoneY;
let placement;
let random = Math.random();
horizontalRedZone();


// Wall Y value (top-left corner) should be between 100 and 400
    // 100: Gives space for green row + 50px
    // 400 because the wall is 100px long on top of the 100px at the bottom
// All 3 walls are 3 pixels apart

let wall1, wall2, wall3;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
    distance = 0;
    wallSpeed = -3;
    rValue = 0;
    rZone1X = 0;
    rZone2X = 1500;
    horizontalRedZone();

  } else if (state === "gameon") {
    runGame();
    distance++;

  } else if (state === "gameover") {
    drawGameOver();
    latestScore = distance;
    if (distance > bestScore) {
      bestScore = distance;
    }
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// Events
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function mousedownHandler() {
    mouseIsPressed = true;

    // Propeller Sound
    propeller.CurrentTime = 0;
    propeller.play();

    // Start Game on Mouse press
    if (state === "start") {
        state = "gameon";
    }
}

function mouseupHandler() {
    mouseIsPressed = false;

    propeller.pause();
}

function keydownHandler(event) {
  if (event.code === "ArrowLeft") {
    leftKeyisPressed = true;
  } else if (event.code === "ArrowRight") {
    rightKeyisPressed = true;
  } else if (event.code === "ArrowUp") {
    upKeyisPressed = true;
  }


  // Propeller Sound
  propeller.CurrentTime = 0;
  propeller.play();
}

function keyupHandler(event) {
  propeller.pause();

  if (event.code === "ArrowLeft") {
    leftKeyisPressed = false;
  } else if (event.code === "ArrowRight") {
    rightKeyisPressed = false;
  } else if (event.code === "ArrowUp") {
    upKeyisPressed = false;
  }

}