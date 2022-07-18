// FUNCTIONS

// Draw Start Screen
function drawStart() {
  drawMainComponents();
  
  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285)
  
  ctx.font = "25px Consolas";
  ctx.fillText("USE LEFT MOUSE BUTTON OR ARROW KEYS TO MOVE", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  ctx.fillText("YOU CAN ALSO MOVE LEFT/RIGHT USING ARROW KEYS", 75, 510);
}
  
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  updateRedZone();
  checkCollisions();

  // DRAW
  drawGame();
}

function moveHeli() {
  // Accelerate Upwards if mouseisPressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }
  // Left/Right Motion
  if (leftKeyisPressed) {
    heli.x += -2;
  } else if (rightKeyisPressed) {
    heli.x += 2;
  } else if (upKeyisPressed) {
    heli.speed += -1;
  }

  // Apply Gravity/Acceleration
  heli.speed += heli.accel;

  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Helicopter based on Speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Wall 1
  wall[0].x += wallSpeed;
  if (wall[0].x + wall[0].w < 0) {
    wall[0].x = wall[2].x + 500;
    wall[0].y = Math.random() * 300 + 100;
  }
    
  // Wall 2
  wall[1].x += wallSpeed;
  if (wall[1].x + wall[1].w < 0) {
    wall[1].x = wall[0].x + 500;
    wall[1].y = Math.random() * 300 + 100;
  }

  // Wall 3
  wall[2].x += wallSpeed;
  if (wall[2].x + wall[2].w < 0) {
    wall[2].x = wall[1].x + 500;
    wall[2].y = Math.random() * 300 + 100;
  }

  changeWallSpeed();
}


function changeWallSpeed() {
  // Wall Speed incrementally increases
  if (distance > 100 && distance < 200) {
    wallSpeed = -3.3;
  } else if (distance > 200 && distance < 300) {
    wallSpeed = -3.6;
  } else if (distance > 300 && distance < 400) {
    wallSpeed = -3.9;
  } else if (distance > 400 && distance < 500) {
    wallSpeed = -4.2;
  } else if (distance > 500 && distance < 600) {
    wallSpeed = -4.5;
  } else if (distance > 600 && distance < 700) {
    wallSpeed = -4.8;
  } else if (distance > 700 && distance < 800) {
    wallSpeed = -5.1;
  } else if (distance > 800 && distance < 900) {
    wallSpeed = -5.4;
  } else if (distance > 900 && distance < 1000) {
    wallSpeed = -5.7;
  } else if (distance > 1000 && distance < 1100) {
    wallSpeed = -6.0;
  } else if (distance > 1100 && distance < 1200) {
    wallSpeed = -6.3;
  } else if (distance > 1200 && distance < 1300) {
    wallSpeed = -6.6;
  } else if (distance > 1300 && distance < 1400) {
    wallSpeed = -6.9;
  } else if (distance > 1400 && distance < 1500) {
    wallSpeed = -7.2;
  } else if (distance > 1500 && distance < 1700) {
    wallSpeed = -7.5;
  } else if (distance > 1700 && distance < 1900) {
    wallSpeed = -7.8;
  } else if (distance > 1900 && distance < 2100) {
    wallSpeed = -8.1;
  } else if (distance > 2100 && distance < 2300) {
    wallSpeed = -8.4;
  } else if (distance > 2300 && distance < 2500) {
    wallSpeed = -8.7;
  } else if (distance > 2500 && distance < 3000) {
    wallSpeed = -9.0;
  } else if (distance > 3000 && distance < 3500) {
    wallSpeed = -9.3;
  } else if (distance > 3500 && distance < 4000) {
    wallSpeed = -9.6;
  } else if (distance > 4000 && distance < 4500) {
    wallSpeed = -9.9;
  } else if (distance > 4000 && distance < 5000) {
    wallSpeed = -10.2;
  }
}

function horizontalRedZone() {
  random = Math.random();
  if (random < 0.5) {
    redZone3.y = -100;
    placement = "above";
  } else {
    redZone3.y = cnv.height + 100;
    placement = "below";
  }
}

function updateRedZone() {
  rValue += 2;

  // First Red Zone
  if (distance > randZone1) {
    redZone1.x--;
  } else if (redZone1.x < randDistanceEnd1 && rValue > 250) {
    redZone1.x++;
  }

  // Second Red Zone
  if (distance > randDistanceEnd2) {
    redZone2.x++
  } else {
    redZone2.x--;
  }

  // Third Red Zone
  if (placement === "above") {
    if (distance < 400) {
      redZone3.y++;
    } else if (distance > 400 && distance < 1000) {
      redZone3.y--;
    } else if (distance > 1000 && distance < 1600) {
      redZone3.y++;
    } else if (distance > 1300 && distance < 2000) {
      redZone3.y--;
    } 
  } else if (placement === "below") {
    if (distance < 400) {
      redZone3.y--;
    } else if (distance > 400 && distance < 1000) {
      redZone3.y++;
    } else if (distance > 1000 && distance < 1600) {
      redZone3.y--;
    } else if (distance > 1300 && distance < 2000) {
      redZone3.y++;
    }
  }

}

function drawRedZone() {

  ctx.fillStyle = "rgb(" + rValue + ", 0, 0, 0.4";
  ctx.fillRect(redZone1.x, redZone1.y, redZone1.w, redZone1.h);

  ctx.fillStyle = "rgb(" + rValue + ", 0, 0, 0.4";
  ctx.fillRect(redZone2.x, redZone2.y, redZone2.w, redZone2.h);

  ctx.fillStyle = "rgb(" + rValue + ", 0, 0, 0.4";
  ctx.fillRect(redZone3.x, redZone3.y, redZone3.w, redZone3.h);
}

// CS20 Functionize Collision Detection
function rectCollide(rect1, rect2) {
  let rect1Top = rect1.y;
  let rect1Bot = rect1.y + rect1.h;
  let rect1Left = rect1.x;
  let rect1Right = rect1.x + rect1.w;
  let rect2Top = rect2.y;
  let rect2Bot = rect2.y + rect2.h;
  let rect2Left = rect2.x;
  let rect2Right = rect2.x + rect2.w;

  return rect1Top < rect2Bot && rect1Bot > rect2Top && rect1Left < rect2Right && rect1Right > rect2Left
}

function checkCollisions() {
  // Collision with Top / Bottom Green Bars
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  } else if (heli.x < 0) {
    gameOver();
  }

  // Walls 1-3
  if (rectCollide(heli, walls[0]) || rectCollide(heli, walls[1]) || rectCollide(heli, walls[2])) {
    gameOver();
  }

  // Helicopter caught in red zone
  if (rectCollide(heli, redZone1) || rectCollide(heli, redZone2) || rectCollide(heli, redZone3)) {
    gameOver();
  }
}

function gameOver() {
    explosion.play();
    state = "gameover";

    setTimeout(reset, 2000);
}


// Draw Game Elements
function drawGame() {
    drawMainComponents()
    drawRedZone();
    drawWalls();
}
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMainComponents()
    drawRedZone();
  
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
  } 


// Helper Functions
function reset() {
  state = "start";
  heli = {
      x: 200,
      y: 250,
      w: 80,
      h: 40,
      speed: 0,
      accel: 0.7,
  };

  walls[0] = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  };

  walls[1] = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  };

  walls[2] = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  };

  redZone1 = {
    x: 0,
    y: 50,
    w: 50,
    h: cnv.height - 100
  };

  redZone2 = {
    x: 1500,
    y: 50,
    w: 50,
    h: cnv.height - 100
  };

  redZone3 = {
    x: 0,
    y: rZoneY,
    w: cnv.width,
    h: 50
  };
}

function initWalls() {
  let temp = [{
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  }, {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  }, {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
  ];
  console.log(temp)

  return temp;

}

function drawWalls() {
  // Draw Walls
  ctx.fillStyle = "green";
  ctx.fillRect(walls[0].x, walls[0].y, walls[0].w, walls[0].h);
  ctx.fillRect(walls[1].x, walls[1].y, walls[1].w, walls[1].h);
  ctx.fillRect(walls[2].x, walls[2].y, walls[2].w, walls[2].h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  
  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE: " + distance, 25, cnv.height - 15);
  ctx.fillText("LAST SCORE: " + latestScore, 260, cnv.height - 15);
  ctx.fillText("BEST: " + bestScore, cnv.width - 230, cnv.height - 15);
  
  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

}
