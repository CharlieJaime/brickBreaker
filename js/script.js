// Global
var canvas, canvasContext;

// ball
var ballX = 75;
var ballSpeedX = 15;
var ballY = 75;
var ballSpeedY = 7;

// Main Paddle
var mainPaddleY = 0;
const PADDLE_HEIGHT = 15;
const PADDLE_THICKNESS = 100;

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond)
}

function updateAll(){
  playArea();
  movement();
}

function colorRect(leftX, topY, width, height, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function playArea(){
  // gameCanvas
  colorRect(0,0,canvas.width, canvas.height, 'black');
  // ball
  canvasContext.fillStyle = 'lightgrey';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
  // paddle
  colorRect(canvas.width/2-PADDLE_THICKNESS, canvas.height-PADDLE_HEIGHT, PADDLE_THICKNESS, PADDLE_HEIGHT, 'lightgrey');
}

function movement(){
  // ballMovement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // ballY
  if(ballY > canvas.height){
    ballSpeedY = -ballSpeedY;
  } else if(ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
  // ballx
  if(ballX > canvas.width){
    ballSpeedX = -ballSpeedX;
  } else if(ballX < 0){
    ballSpeedX = -ballSpeedX;
  }
}
