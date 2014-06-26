var natureOfCode = natureOfCode || {};

(function(ns){
  //the bug moves randomly across the screen
  ns.Bug = function(settings,environment){
    "use strict";

    settings.draw = function(context,x,y){
      context.beginPath();

      context.arc(x, y, 5, 0, 2 * Math.PI, false);
      context.fillStyle = settings.color;
      context.fill();
    }

    ns.Creature.call(this, settings, environment);
  };

  ns.Bug.prototype = ns.Creature.prototype;

})(natureOfCode);
