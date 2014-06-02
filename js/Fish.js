var natureOfCode = natureOfCode || {};

//the fish follows the mouse
natureOfCode.createFish = function(settings,environment){
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
    accelerate: function(){
      if(!environment) return;

      var pointOfInterest = new natureOfCode.Vector2D(environment.mouseX,environment.mouseY);
      var directionOfMovement = pointOfInterest.subtractVector(this.location);
      directionOfMovement.normalize();
      directionOfMovement = directionOfMovement.multiply(0.5);

      return directionOfMovement;
    }
  });
};
