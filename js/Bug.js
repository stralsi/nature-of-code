var natureOfCode = natureOfCode || {};

natureOfCode.createBug = function(settings){
  "use strict";
  console.log(settings);
  return new natureOfCode.Mover({
    x: settings.x,
    y: settings.y,
    draw: function(context,x,y){
      context.beginPath();

      context.arc(x, y, 10, 0, 2 * Math.PI, false);
      context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      context.fill();
    },
    accelerate: function(currentAcceleration){
      var randX = Math.random() * 0.1 - 0.05,
          randY = Math.random() * 0.1 - 0.05;

      return new natureOfCode.Vector2D(currentAcceleration.x + randX, currentAcceleration.y + randY);
    }
  });
};
