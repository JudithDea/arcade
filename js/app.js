// I decided to go along with the starter code and use functions instead of classes to create player and enemies.

// variables for location and movement on the game board
var x = 5;
var xStep = 101; // represents the x-axis increments per horizontal step by field size
var y = 62;
var yStep = 83; // represents the y-axis increments vertical step by field size

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
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [new Enemy(x, y), new Enemy(x, y+yStep), new Enemy(x, y+(yStep*2))];

// Now write your own player class
// This class requires an update() and
// a handleInput() method.
var Player = function() {
  this.x = 202+(xStep*-2);
  this.y = 400;
  this.sprite = "images/char-cat-girl.png"
  this.xEdgeLeft = x+(xStep*-2);
  this.xEdgeRight = x+(xStep*2);
}
// render function for player was not included in starter code
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = new Player();

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
