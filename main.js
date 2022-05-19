// Helicopter Game Start

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

// Global Variables (repeated)
let state;
let heli;
let distance = 0;
let latestScore = 0;
let bestScore = 0;
let wallSpeed = -3;

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
  } else if (state === "gameon") {
    runGame();
    distance++;
    console.log(wallSpeed)

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