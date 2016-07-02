// Global
var canvas, canvasContext;

// ball
var ballX = 75;
var ballSpeedX = 15;
var ballY = 75;
var ballSpeedY = 7;

// Main Paddle
var mainPaddleY = 0;
var paddleX = 400;
const PADDLE_HEIGHT = 15;
const PADDLE_WIDTH = 100;


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
  colorRect(paddleX, canvas.height-PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, 'lightgrey');
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


function updateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrolltop;

  paddleX = mouseX-PADDLE_WIDTH/2;
}
