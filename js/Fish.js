var natureOfCode = natureOfCode || {};

//the fish follows the mouse with a wavy motion
natureOfCode.createFish = function(settings,environment){
  "use strict";
  //console.log(settings);
  return new natureOfCode.Mover({
    x: settings.x,
    y: settings.y,
    topSpeed: 3,
    draw: function(context,x,y){
      context.beginPath();

      context.arc(x, y, 10, 0, 2 * Math.PI, false);
      context.fillStyle = settings.color;
      context.fill();
    },
    accelerate: function(){
      if(!environment) return;
      var size = 100;
      var mousePosition = new natureOfCode.Vector2D(environment.mouseX,environment.mouseY);

      var directionToMouse = mousePosition.subtractVector(this.location);
      var distanceToMouse = directionToMouse.magnitude();
      directionToMouse.normalize();
      var perpendicular = new natureOfCode.Vector2D(directionToMouse.y,-directionToMouse.x);
      perpendicular = perpendicular.multiply( Math.sin(distanceToMouse/10) * 10);

      var newAcceleration = perpendicular.addVector(directionToMouse);

      newAcceleration.normalize();
      newAcceleration = newAcceleration.multiply(0.5);

      return newAcceleration;
    }
  });
};
