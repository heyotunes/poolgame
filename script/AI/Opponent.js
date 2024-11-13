function Opponent(power, rotation) {
  this.power = power || Math.random() * 75 + 1;
  this.rotation = rotation || Math.random() * 6.283 - 3.141;
  this.evaluation = 0;
}
/* The Opponent function is a constructor for creating an opponent in a pool game. 
It assigns the opponent's power and rotation based on either provided values or randomly generated ones.
 The power is a random value between 1 and 75 if not provided. The rotation is randomly generated within 
 a range of -π to π (approximately -3.141 to 3.141 radians) if not provided. Additionally, the opponent's 
 evaluation is initialized to 0, which will later be used to assess the performance of this opponent. This
 function sets the basic attributes needed for simulating the opponent's actions in the game.*/
