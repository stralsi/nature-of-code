var natureOfCode = natureOfCode || {};

(function(ns){
  "use strict";

  var getDistance = function(p1,p2){
    return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
  }

  //this creature runs after the other creatures which get close to it
  ns.WantsToPlay = function(settings,environment){
    settings.topSpeed = 3;
    settings.draw = function(context,x,y){
      context.beginPath();

      context.arc(x, y, 7, 0, 2 * Math.PI, false);
      context.fillStyle = '#B40404';
      context.fill();
    };

    settings.will = function(){
      //find the closest creature
      var closestCreature,minDistance = Number.MAX_VALUE;
      for(var i = 0;i<environment.movers.length;i++){
        var c = environment.movers[i];
        if(c === this) continue;
        if(isNaN(c.location.x) || isNaN(c.location.y)) continue;

        var distance = getDistance(this.location,c.location);
        if(distance<minDistance){
          minDistance = distance;
          closestCreature = c;
        }
      }

      if(closestCreature == null) return new ns.Vector2D(0,0);

      //go towards it
      var desiredLocation = closestCreature.location.clone();
      var desiredDirection = desiredLocation.subtractVector(this.location);
      var willForce = desiredDirection;
      willForce.normalize();
      willForce = willForce.multiply(0.5);

      return willForce;
    };

    ns.Creature.call(this, settings, environment);
  };

  ns.WantsToPlay.prototype = ns.Creature.prototype;

})(natureOfCode);
