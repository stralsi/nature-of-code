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
      context.fillStyle = settings.color;
      context.fill();
    },
    accelerate: function(currentAcceleration){
      var randX = Math.random() - 0.5,
          randY = Math.random() - 0.5;

      return new natureOfCode.Vector2D(randX, randY);
    }
  });
};
