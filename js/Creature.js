var natureOfCode = natureOfCode || {};

//Creatures are Movers with the force of will
natureOfCode.Creature = function(settings,environment){
  "use strict";
  this.environment = environment;
  this.willFunction = settings.will;
  this.willForce = new natureOfCode.Vector2D(0,0);
  natureOfCode.Mover.call(this, settings);
}

natureOfCode.Creature.prototype = (function () {
  var moverProto = natureOfCode.Mover.prototype,
      update = function(width, height){

        if(this.willFunction){
          this.willForce = this.willFunction();
        }else{
          this.willForce = defaultWillFunction();
        }

        moverProto.applyForce.call(this,this.willForce);
        moverProto.update.call(this,width,height);
      },

      display = function(canvas){
        var context = canvas.getContext('2d');

        natureOfCode.arrows.drawWillForce(context,this);

        moverProto.display.call(this,canvas);
      },

      defaultWillFunction = function(){
        var randX = Math.random() - 0.5,
            randY = Math.random() - 0.5;

        return new natureOfCode.Vector2D(randX, randY);
      }

  return{
      update:update,
      display:display,
      applyForce:moverProto.applyForce
  };
})();
