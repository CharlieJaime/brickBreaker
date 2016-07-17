/**********
Global Var
***********/
// Global
var canvas, canvasContext;

// Bricks
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 16;
var brickGrid = new Array(BRICK_COLS*BRICK_ROWS);

// Ball
var ballX = 75;
var ballSpeedX = 8;
var ballY = 75;
var ballSpeedY = 8;

// Main Paddle
var paddleX = 400;
const PADDLE_THICKNESS = 15;
const PADDLE_WIDTH = 100;
const PADDLE_DIST_FROM_EDGE = 60;

// Mouse
var mouseX = 0;
var mouseY = 0;

/**********
General GamePlay
***********/
window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
  brickReset();
}

function updateAll(){
  movement();
  playArea();
}

function ballRest(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function brickReset(){
  for (var i=0; i<BRICK_COLS*BRICK_ROWS; i++) {
    if(Math.random()<0.5){
      brickGrid[i] = true;
    } else {
      brickGrid[i] = false;
    }
  }
}

function movement(){
  // ballMovement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // ballY
  if(ballY > canvas.height){
    // ballSpeedY = -ballSpeedY;
    ballRest();
  } else if(ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
  // ballx
  if(ballX > canvas.width){
    ballSpeedX = -ballSpeedX;
  } else if(ballX < 0){
    ballSpeedX = -ballSpeedX;
  }

  // paddle
  var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY+PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleX+PADDLE_WIDTH;
  if(ballY > paddleTopEdgeY && // top of paddle
      ballY < paddleBottomEdgeY && // bottom of paddle
      ballX > paddleLeftEdgeX && // left half of paddle
      ballX < paddleRightEdgeX // right half of paddle
      ){

    ballSpeedY = -ballSpeedY;

    var paddleCenterX = paddleX + PADDLE_WIDTH/2;
    var ballDistFromCenterX = ballX - paddleCenterX;
    ballSpeedX = ballDistFromCenterX * 0.35;
  }
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}

/**********
GamePlay Draw functions
***********/
function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // ball
  colorCircle();
  // paddle
  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'lightgrey');

  drawbricks();

  var mouseBrickCol = Math.floor(mouseX / BRICK_W);
  var mouseBrickRow = Math.floor(mouseY / BRICK_H);
  var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow)
  colorText(mouseBrickCol+","+mouseBrickRow+": "+brickIndexUnderMouse, mouseX, mouseY, 'white');
}

function colorRect(leftX, topY, width, height, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function rowColToArrayIndex(col, row){
  return col + BRICK_COLS * row;
}

function drawbricks(){
  for (var eachRow=0; eachRow<BRICK_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<BRICK_COLS; eachCol++){
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if(brickGrid[arrayIndex]){
        colorRect(BRICK_W*eachCol , BRICK_H*eachRow,
          BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
      } //   if brick
    }// each brick
  }// each brickrow
}// drawbricks

function colorCircle(){
  canvasContext.fillStyle = 'lightgrey';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}
