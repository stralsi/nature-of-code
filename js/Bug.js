var natureOfCode = natureOfCode || {};

//the bug moves randomly across the screen
natureOfCode.Bug = function(settings,environment){
  "use strict";

  settings.draw = function(context,x,y){
    context.beginPath();

    context.arc(x, y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = settings.color;
    context.fill();
  }

  natureOfCode.Creature.call(this, settings, environment);
};

natureOfCode.Bug.prototype = natureOfCode.Creature.prototype;
