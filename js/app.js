// I decided to go along with the starter code and use functions instead of classes to create player and enemies.

// variables for location and movement on the game board
var x = 5;
var xStep = 101; // represents the x-axis increments per horizontal step by field size
var y = 62;
var yStep = 83; // represents the y-axis increments vertical step by field size



var xEdgeLeft = x+(xStep*-2);
var xEnemyEdgeRight = x+(xStep*5); // Enemies should disappear completely from the board, not just touch the edge

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = Math.floor(Math.random() * 400) + 100;
    var startPosEnemy = Math.floor(Math.random() * 500) *-1;
    if (allEnemies[0].x > xEnemyEdgeRight) {
      this.x = startPosEnemy; // enemies should show up from outside of the board, not suddenly appear on the first column
    } else {
      this.x += this.speed*dt;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [new Enemy(x, y), new Enemy(x, y+yStep), new Enemy(x, y+(yStep*2))];
// added steps to y coordinate to make enemies show up on separate rows

// Now write your own player class
var Player = function(x, y) {
  this.x = x;
  this.y = y;
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
  function resetPlayer(){
    player.y = 400;
    player.x = 202;
  };
  if (player.y == -15){
    resetPlayer();
  }
};

function checkCollisions() {
  for (i = 0; i < 5; i++){
    if (player.y == allEnemies[i].y && player.x >= allEnemies[i].x+50){
      console.log("bang");
    }
  }
}

var player = new Player(202, 400); // x and y coordinates to render player in middle of bottom row

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
