// I decided to go along with the starter code and use functions instead of classes to create player and enemies.

// variables for location and movement on the game board
var x = 5;
var xStep = 101; // represents the x-axis increments per horizontal step by field size
var y = 62;
var yStep = 83; // represents the y-axis increments vertical step by field size

function resetPlayer(){
  player.y = 400;
  player.x = 202;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 500);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// setting new bugs at random start position once they left the screen on the right
Enemy.prototype.reset = function(){
  var startPosEnemy = Math.floor(Math.random() * 500) *-1;
  for (i = 0; i < allEnemies.length; i++){
    if (allEnemies[i].x > 500){
      this.x = startPosEnemy;
    }
  }
}

// rendering enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// added steps to y coordinate to make enemies show up on separate rows
var allEnemies = [new Enemy(x, y), new Enemy(x-40, y), new Enemy(x, y+yStep), new Enemy(x, y+(yStep*2)), new Enemy(x-75, y+(yStep*2))];

// Now write your own player class
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 171;
  this.sprite = "images/char-cat-girl.png"
}

// render function for player was not included in starter code, here it is
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// adding player movement functionality within boundaries on canvas
Player.prototype.handleInput = function(allowedKeys){
  if (allowedKeys === "left" && player.x > 0){
    player.x -= xStep;
  } else if (allowedKeys === "right" && player.x < 404){
    player.x += xStep;
  } else if (allowedKeys === "up" && player.y > 0){
    player.y -= yStep;
  } else if (allowedKeys === "down" && player.y < 400){
    player.y += yStep;
  }
};

// update method checks winning status, triggers player position reset
Player.prototype.update = function() {
  if (player.y == -15){
    resetPlayer();
    console.log ("Player won")
  }
};

// using 2d collision detection model: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// dividing width and height by 2 to make the collision less sensitive
Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++){
    if (player.x < allEnemies[i].x + allEnemies[i].width/2 &&
       player.x + player.width/2 > allEnemies[i].x &&
       player.y < allEnemies[i].y + allEnemies[i].height/2 &&
       player.height/2 + player.y > allEnemies[i].y) {
       console.log ("collision detected!")
       resetPlayer();
    }
  }
}

// x and y coordinates to render player in middle of bottom row
var player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
