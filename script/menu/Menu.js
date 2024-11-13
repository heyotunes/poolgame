function Menu() {}

Menu.prototype.init = function (backgroundSprite, labels, buttons, sound) {
  this.background = backgroundSprite;
  this.labels = labels || [];
  this.buttons = buttons || [];
  this.sound = sound ? sound : undefined;

  this.active = false;
};

Menu.prototype.load = function () {
  this.sound.currentTime = 0;
  this.active = true;

  requestAnimationFrame(this.menuLoop.bind(this));
  if (SOUND_ON) {
    this.sound.volume = 0.8;
  }

  this.sound.play();
};

Menu.prototype.draw = function () {
  Canvas2D._canvas.style.cursor = "auto";

  Canvas2D.drawImage(this.background, Vector2.zero, 0, 1, Vector2.zero);

  for (let i = 0; i < this.labels.length; i++) {
    this.labels[i].draw();
  }

  for (let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
};

Menu.prototype.handleInput = function () {
  for (let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].handleInput();
  }
};

Menu.prototype.menuLoop = function () {
  if (this.active) {
    this.handleInput();
    Canvas2D.clear();
    this.draw();
    Mouse.reset();
    requestAnimationFrame(this.menuLoop.bind(this));
  }
};

/*This code creates and manages the game’s menu, like the main menu or settings menu. It has a Menu object that includes a background image, labels (text), and buttons. When the menu is activated, it plays background music (if there's any), and the music starts from the beginning every time the menu is loaded. The menu continuously updates itself, showing the background, text, and buttons, while checking for any mouse clicks on the buttons. If a button is clicked, it will perform an action, like starting a game or changing settings. The whole process makes sure the menu is interactive, looks good, and responds to player input, like mouse movements and clicks.*/
