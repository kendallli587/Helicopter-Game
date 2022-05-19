// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMainComponents();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  }
  
function runGame() {
    // LOGIC
    moveHeli();
    moveWalls();
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
    wall1.x += wallSpeed;
    if (wall1.x + wall1.w < 0) {
        wall1.x = wall3.x + 500;
        wall1.y = Math.random() * 300 + 100;
    }
    
    // Wall 2
    wall2.x += wallSpeed;
    if (wall2.x + wall2.w < 0) {
        wall2.x = wall1.x + 500;
        wall2.y = Math.random() * 300 + 100;
    }

    // Wall 3
    wall3.x += wallSpeed;
    if (wall3.x + wall3.w < 0) {
        wall3.x = wall2.x + 500;
        wall3.y = Math.random() * 300 + 100;
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

function checkCollisions() {
    // Collision with Top / Bottom Green Bars
    if (heli.y < 50) {
        gameOver();
    } else if (heli.y + heli.h > cnv.height - 50) {
        gameOver();
    }

    // Collision with Walls
    let heliFront = heli.x + heli.w;
    let heliBack = heli.x
    // let heliTop = heli.y;
    // let heliBottom = heli.y + heli.h;
    // let heliXCenter = heli.x + (heli.x / 2);
    let heliYCenter = heli.y + (heli.h / 2);

    let wall1Left = wall1.x;
    let wall1Right = wall1.x + wall1.w
    let wall1Top = wall1.y;
    let wall1Bottom = wall1.y + wall1.h

    let wall2Left = wall2.x;
    let wall2Right = wall2.x + wall2.w
    let wall2Top = wall2.y;
    let wall2Bottom = wall2.y + wall2.h

    let wall3Left = wall3.x;
    let wall3Right = wall3.x + wall3.w
    let wall3Top = wall3.y;
    let wall3Bottom = wall3.y + wall3.h

    // HITS THE LEFT WALL
    if (heliFront > wall1Left && heliBack < wall1Right) {
        if (wall1Top < heliYCenter && heliYCenter < wall1Bottom) {
            gameOver();
        }
    } else if (heliFront > wall2Left && heliBack < wall2Right) {
        if (wall2Top < heliYCenter && heliYCenter < wall2Bottom) {
            gameOver();
        }
    } else if (heliFront > wall3Left && heliBack < wall3Right) {
        if (wall3Top < heliYCenter && heliYCenter < wall3Bottom) {
            gameOver();
        }
    }

    // // HITS TOP OF WALL (helicopted falls onto wall, rather than flies into)
    // if (heliBottom > wall1Top && heliTop < wall1Top) {
    //     if (heliXCenter > wall1Left && heliXCenter < wall1Right) {
    //         gameOver();
    //     }
    // } else if (heliBottom > wall2Top && heliTop < wall2Top) {
    //     if (heliXCenter > wall2Left && heliXCenter < wall2Right) {
    //         gameOver();
    //     }
    // } else if (heliBottom > wall3Top && heliTop < wall2Top) {
    //     if (heliXCenter > wall3Left && heliXCenter < wall3Right) {
    //         gameOver();
    //     }
    // }
    // // HITS BOTTOM OF WALL
    // if (heliTop < wall1Bottom && heliBottom > wall1Bottom) {
    //     if (heliXCenter > wall1Left && heliXCenter < wall1Right) {
    //         gameOver();
    //     }
    // } else if (heliTop < wall2Bottom && heliBottom > wall2Bottom) {
    //     if (heliXCenter > wall2Left && heliXCenter < wall2Right) {
    //         gameOver();
    //     }
    // } else if (heliTop < wall3Bottom && heliBottom > wall3Bottom) {
    //     if (heliXCenter > wall3Left && heliXCenter < wall3Right) {
    //         gameOver();
    //     }
    // }
}

function gameOver() {
    explosion.play();
    state = "gameover";

    setTimeout(reset, 2000);
}


// Draw Game Elements
function drawGame() {
    drawMainComponents()
  
    drawWalls();
}
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMainComponents()
  
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

    wall1 = {
        x: cnv.width,
        y: Math.random() * 300 + 100,
        w: 50,
        h: 100,
    };

    wall2 = {
        x: cnv.width + 500,
        y: Math.random() * 300 + 100,
        w: 50,
        h: 100,
    };

    wall3 = {
        x: cnv.width + 1000,
        y: Math.random() * 300 + 100,
        w: 50,
        h: 100,
    };
}

  function drawWalls() {
    // Draw Walls
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
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
