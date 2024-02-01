var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var tileSize = 10;
var snake = [{x: 10, y: 10}];
var direction = {x: 1, y: 0};
var apples = [{x: 15, y: 15}, {x: 20, y: 20}];
var score = 0;

function RandomCoordonates(){

// var min=0;
// var max=400;
 //Math.floor(Math.random() * (max - min) + min);
    return Math.floor(Math.random() * (canvas.width / tileSize ));
}

function drawSnake() {
  ctx.fillStyle = "green";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(function(segment) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

function moveSnake() {
  snake.unshift({x: snake[0].x + direction.x, y: snake[0].y + direction.y});
  snake.pop();
}

function drawApples() {
  ctx.fillStyle = "red";
  apples.forEach(function(apple) {
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
  });
}

function checkCollisions() {
  // Check if snake hits a wall
  if (snake[0].x < 0 || snake[0].x >= canvas.width / tileSize || snake[0].y < 0 || snake[0].y >= canvas.height / tileSize) {
    gameOver();
  }
  
  // Check if snake hits itself
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
  
  // Check if snake hits an apple
apples.forEach(function(apple){
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      var last_segment= {x:snake[snake.length-1].x,y:snake[snake.length-1].y}

      apple.x=RandomCoordonates();
      apple.y=RandomCoordonates();

      snake.push({x: last_segment.x-direction.x, y:last_segment.y-direction.y});
      score += 10;
    }

});
}

function gameOver() {
  alert("Game over! Your score is " + score);
  location.reload();
}

function changeDirection(event) {
  switch(event.keyCode) {
    case 37: // left arrow
      if (direction.x !== 1) {
        direction = {x: -1, y: 0};
      }
      break;
    case 81: // q key
      if (direction.x !== 1) {
        direction = {x: -1, y: 0};
      }
      break;
    case 38: // up arrow
      if (direction.y !== 1) {
        direction = {x: 0, y: -1};
      }
      break;
    
    case 90: // z key
      if (direction.y !== 1) {
        direction = {x: 0, y: -1};
      }
      break;
    case 39: // right arrow
      if (direction.x !== -1) {
        direction = {x: 1, y: 0};
      }
      break;
    case 68: // d key
      if (direction.x !== -1) {
        direction = {x: 1, y: 0};
      }
      break;
    case 40: // down arrow
      if (direction.y !== -1) {
        direction = {x: 0, y: 1};
      }
      break;
     case 83: // s key
      if (direction.y !== -1) {
        direction = {x: 0, y: 1};
      }
      break;
  }
}

function gameLoop() {
  moveSnake();
  drawSnake();
  drawApples();
  checkCollisions();
  setTimeout(gameLoop, 90);//100
}

document.addEventListener("keydown", changeDirection);
gameLoop();
