"use strict";

function handleKeyDown(evt) {
  var code = evt.keyCode;
  if (code < 0 || code > 255) return;
  if (!Keyboard._keyStates[code].down) Keyboard._keyStates[code].pressed = true;
  Keyboard._keyStates[code].down = true;
}

function handleKeyUp(evt) {
  var code = evt.keyCode;
  if (code < 0 || code > 255) return;
  Keyboard._keyStates[code].down = false;
}

function Keyboard_Singleton() {
  this._keyStates = [];
  for (var i = 0; i < 256; ++i) this._keyStates.push(new ButtonState());
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

Keyboard_Singleton.prototype.reset = function () {
  for (var i = 0; i < 256; ++i) this._keyStates[i].pressed = false;
};

Keyboard_Singleton.prototype.pressed = function (key) {
  return this._keyStates[key].pressed;
};

Keyboard_Singleton.prototype.down = function (key) {
  return this._keyStates[key].down;
};

var Keyboard = new Keyboard_Singleton();

/**This code manages how the pool game responds to keyboard presses. It tracks which keys are pressed and when they're released. The `handleKeyDown` function checks if a key is pressed and marks it as "down" or "pressed." The `handleKeyUp` function marks the key as no longer "down" when released. The `Keyboard_Singleton` is like a manager for all the keys on the keyboard, storing their states (pressed or down) in an array. This helps the game know what actions the player wants to do, like moving the stick or adjusting the aim. */
