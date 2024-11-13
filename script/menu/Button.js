function Button(sprite, position, callback, hoverSprite) {
  this.sprite = sprite;
  this.hoverSprite = hoverSprite ? hoverSprite : sprite;
  this.position = position;
  this.callback = callback;
}

Button.prototype.draw = function () {
  if (this.mouseInsideBorders()) {
    Canvas2D.drawImage(this.hoverSprite, this.position, 0, 1);
    Canvas2D._canvas.style.cursor = "pointer";
  } else {
    Canvas2D.drawImage(this.sprite, this.position, 0, 0.98);
  }
};

Button.prototype.handleInput = function () {
  if (Mouse.left.pressed && this.mouseInsideBorders()) {
    this.callback();
  }
};

Button.prototype.mouseInsideBorders = function () {
  mousePos = Mouse.position;

  if (
    mousePos.x > this.position.x &&
    mousePos.x < this.position.x + this.sprite.width &&
    mousePos.y > this.position.y &&
    mousePos.y < this.position.y + this.sprite.height
  ) {
    return true;
  }

  return false;
};

/*This code creates a button that the player can see and interact with in the pool game. The button has a normal image (sprite) and a different image that shows when the mouse moves over it, making it look like the player is about to click. The button checks if the player’s mouse is inside its area, and if the player clicks it, the button performs a specific action, like starting the game or pausing it. The game uses this button to let players control different features by clicking. The button knows when the player is hovering over it and changes its appearance to show it's clickable. It's like a clickable image that triggers a response when you press it.*/
