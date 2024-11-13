"use strict";

function Vector2(x, y) {
  this.x = typeof x !== "undefined" ? x : 0;
  this.y = typeof y !== "undefined" ? y : 0;
}

Object.defineProperty(Vector2, "zero", {
  get: function () {
    return new Vector2();
  },
});

Object.defineProperty(Vector2.prototype, "isZero", {
  get: function () {
    return this.x === 0 && this.y === 0;
  },
});

Object.defineProperty(Vector2.prototype, "length", {
  get: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
});

Vector2.prototype.addTo = function (v) {
  if (v.constructor === Vector2) {
    this.x += v.x;
    this.y += v.y;
  } else if (v.constructor === Number) {
    this.x += v;
    this.y += v;
  }
  return this;
};

Vector2.prototype.add = function (v) {
  var result = this.copy();
  return result.addTo(v);
};

Vector2.prototype.subtractFrom = function (v) {
  if (v.constructor === Vector2) {
    this.x -= v.x;
    this.y -= v.y;
  } else if (v.constructor === Number) {
    this.x -= v;
    this.y -= v;
  }
  return this;
};

Vector2.prototype.subtract = function (v) {
  var result = this.copy();
  return result.subtractFrom(v);
};

Vector2.prototype.divideBy = function (v) {
  if (v.constructor === Vector2) {
    this.x /= v.x;
    this.y /= v.y;
  } else if (v.constructor === Number) {
    this.x /= v;
    this.y /= v;
  }
  return this;
};

Vector2.prototype.divide = function (v) {
  var result = this.copy();
  return result.divideBy(v);
};

Vector2.prototype.multiplyWith = function (v) {
  if (v.constructor === Vector2) {
    this.x *= v.x;
    this.y *= v.y;
  } else if (v.constructor === Number) {
    this.x *= v;
    this.y *= v;
  }
  return this;
};

Vector2.prototype.multiply = function (v) {
  var result = this.copy();
  return result.multiplyWith(v);
};

Vector2.prototype.toString = function () {
  return "(" + this.x + ", " + this.y + ")";
};

Vector2.prototype.normalize = function () {
  var length = this.length;
  if (length === 0) return;
  this.divideBy(length);
};

Vector2.prototype.copy = function () {
  return new Vector2(this.x, this.y);
};

Vector2.prototype.equals = function (obj) {
  return this.x === obj.x && this.y === obj.y;
};

Vector2.prototype.distanceFrom = function (obj) {
  return Math.sqrt(
    (this.x - obj.x) * (this.x - obj.x) + (this.y - obj.y) * (this.y - obj.y)
  );
};

/**This code defines a `Vector2` object, which represents points or directions in a 2D space, like positions on the pool table. Each `Vector2` has two numbers: `x` and `y`, which represent horizontal and vertical coordinates. The code includes various functions that allow you to do math with these vectors, like adding, subtracting, multiplying, and dividing them. For example, you can add two vectors together to get a new position, or scale the vector by a number to make it longer or shorter. The vector also has methods to calculate distance between two points or check if a vector is at zero. This helps manage how balls move and collide in the pool game. */
