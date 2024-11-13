function Label(text, position, origin, color, textAlign, fontname, fontsize) {
  this.text = typeof text !== "undefined" ? text : "";
  this.position = typeof position !== "undefined" ? position : Vector2.zero;
  this.origin = typeof origin !== "undefined" ? origin : Vector2.zero;
  this.color = typeof color !== "undefined" ? color : Color.black;
  this.textAlign = typeof textAlign !== "undefined" ? textAlign : "top";
  this.fontname = typeof fontname !== "undefined" ? fontname : "Courier New";
  this.fontsize = typeof fontsize !== "undefined" ? fontsize : "20px";
}

Label.prototype.draw = function () {
  Canvas2D.drawText(
    this.text,
    this.position,
    this.origin,
    this.color,
    this.textAlign,
    this.fontname,
    this.fontsize
  );
};
/*This code creates a button that the player can see and interact with in the pool game. The button has a normal image (sprite) and a different image that shows when the mouse moves over it, making it look like the player is about to click. The button checks if the player’s mouse is inside its area, and if the player clicks it, the button performs a specific action, like starting the game or pausing it. The game uses this button to let players control different features by clicking. The button knows when the player is hovering over it and changes its appearance to show it's clickable. It's like a clickable image that triggers a response when you press it.*/
