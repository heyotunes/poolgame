"use strict";

function handleMouseMove(evt) {
  var canvasScale = Canvas2D.scale;
  var canvasOffset = Canvas2D.offset;
  var mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
  var my = (evt.pageY - canvasOffset.y) / canvasScale.y;
  Mouse._position = new Vector2(mx, my);
}

function handleMouseDown(evt) {
  handleMouseMove(evt);

  if (evt.which === 1) {
    if (!Mouse._left.down) Mouse._left.pressed = true;
    Mouse._left.down = true;
  } else if (evt.which === 2) {
    if (!Mouse._middle.down) Mouse._middle.pressed = true;
    Mouse._middle.down = true;
  } else if (evt.which === 3) {
    if (!Mouse._right.down) Mouse._right.pressed = true;
    Mouse._right.down = true;
  }
}

function handleMouseUp(evt) {
  handleMouseMove(evt);

  if (evt.which === 1) Mouse._left.down = false;
  else if (evt.which === 2) Mouse._middle.down = false;
  else if (evt.which === 3) Mouse._right.down = false;
}

function Mouse_Singleton() {
  this._position = Vector2.zero;
  this._left = new ButtonState();
  this._middle = new ButtonState();
  this._right = new ButtonState();
  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
}

Object.defineProperty(Mouse_Singleton.prototype, "left", {
  get: function () {
    return this._left;
  },
});

Object.defineProperty(Mouse_Singleton.prototype, "middle", {
  get: function () {
    return this._middle;
  },
});

Object.defineProperty(Mouse_Singleton.prototype, "right", {
  get: function () {
    return this._right;
  },
});

Object.defineProperty(Mouse_Singleton.prototype, "position", {
  get: function () {
    return this._position;
  },
});

Mouse_Singleton.prototype.reset = function () {
  this._left.pressed = false;
  this._middle.pressed = false;
  this._right.pressed = false;
};

Mouse_Singleton.prototype.containsMouseDown = function (rect) {
  return this._left.down && rect.contains(this._position);
};

Mouse_Singleton.prototype.containsMousePress = function (rect) {
  return this._left.pressed && rect.contains(this._position);
};

var Mouse = new Mouse_Singleton();
/*This code helps the game know where the mouse is and what buttons the player is clicking. It tracks the mouse position and updates it when the mouse moves over the game screen. When a mouse button is pressed, like the left, middle, or right button, it marks the button as "down" and tracks if it was "pressed." The code also keeps track of whether the player released a button and updates the state of the buttons accordingly. The `Mouse_Singleton` is like a manager for the mouse, storing its position and button states. This helps the game know where the player is clicking, which could be useful for aiming the stick or interacting with objects in the pool game.*/
