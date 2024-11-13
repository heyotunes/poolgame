"use strict";

function Score(position) {
  this.position = position;
  this.origin = new Vector2(47, 82);
  this.value = 0;
}

Score.prototype.reset = function () {
  this.position = position;
  this.origin = new Vector2(30, 0);
  this.value = 0;
};

Score.prototype.draw = function () {
  Canvas2D.drawText(
    this.value,
    this.position,
    this.origin,
    "#096834",
    "top",
    "Impact",
    "200px"
  );
};

Score.prototype.drawLines = function (color) {
  for (let i = 0; i < this.value; i++) {
    let pos = this.position.add(new Vector2(i * 15, 0));

    Canvas2D.drawText("I", pos, this.origin, color, "top", "Arial", "20px");
  }
};

Score.prototype.increment = function () {
  this.value++;
};

/* This code manages the player's score in a pool game. It tracks the position where the score will be shown on the screen, starting at 0. The `reset` function sets the score back to 0, while keeping its position on the screen. The `draw` function displays the score as a number using big, bold text on the game screen. The `drawLines` function shows the score using lines instead of numbers, like tally marks. Finally, the `increment` function increases the score by 1 whenever called. This helps keep track of how many points a player has during the game. */
