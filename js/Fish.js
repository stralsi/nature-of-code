var natureOfCode = natureOfCode || {};

(function(ns){
  //the fish follows the mouse with a wavy motion
  ns.Fish = function(settings,environment){
    "use strict";
    var tailLength=5, tail = new Array(tailLength),
        bellySize=10;

    settings.topSpeed = 3;

    settings.draw = function(context,x,y){
      context.beginPath();

      context.arc(x, y, 10, 0, 2 * Math.PI, false);
      context.fillStyle = settings.color;
      context.fill();

      if(tail){
        for(var i = 0;i<tail.length;i++){
          var segment = tail[i];
          if(!segment) break;

          var segmentSize = bellySize-i;
          if(segmentSize <= 0) break;

          context.arc(segment.x, segment.y, segmentSize, 0, 2 * Math.PI, false);
          context.fillStyle = settings.color;
          context.fill();
        }
      }
    };

    settings.will = function(){
      if(!environment) return;

      var size = 100;
      var mousePosition = new ns.Vector2D(environment.mouseX,environment.mouseY);

      var directionToMouse = mousePosition.subtractVector(this.location);
      var distanceToMouse = directionToMouse.magnitude();
      directionToMouse.normalize();
      var perpendicular = new ns.Vector2D(directionToMouse.y,-directionToMouse.x);
      perpendicular = perpendicular.multiply( Math.sin(distanceToMouse/10) * 10);

      var newAcceleration = perpendicular.addVector(directionToMouse);

      newAcceleration.normalize();
      newAcceleration = newAcceleration.multiply(0.5);

      return newAcceleration;
    };

    settings.afterUpdate = function(){
      var i = tailLength-1;
      while(i > 0){
        tail[i] = tail[i-1];
        i--;
      }
      tail[0] = new ns.Vector2D(this.location.x,this.location.y);
    };

    ns.Creature.call(this, settings, environment);
  };

  ns.Fish.prototype = ns.Creature.prototype;

})(natureOfCode);
