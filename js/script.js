// Global
var canvas, canvasContext;

// ball
var ballX = 75;
var ballSpeedX = 6;
var ballY = 75;
var ballSpeedY = 6;

// Main Paddle
var mainPaddleY = 0;
var paddleX = 400;
const PADDLE_THICKNESS = 15;
const PADDLE_WIDTH = 100;
const PADDLE_DIST_FROM_EDGE = 60;


window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll(){
  playArea();
  movement();
}

function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // ball
  colorCircle();
  // paddle
  colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'lightgrey');
}

function colorRect(leftX, topY, width, height, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(){
  canvasContext.fillStyle = 'lightgrey';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}

function ballRest(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
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
  if(ballY > paddleTopEdgeY && ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX && ballX < paddleRightEdgeX){

    ballSpeedY = -ballSpeedY;

    var paddleCenterX = paddleX + PADDLE_WIDTH/2;
    var ballDistFromCenterX = ballX - paddleCenterX;
    ballSpeedX = ballDistFromCenterX * 0.35;
  }
}


function updateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrolltop;

  paddleX = mouseX-PADDLE_WIDTH/2;
}
