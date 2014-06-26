var natureOfCode = natureOfCode || {};

(function(ns){
  "use strict";

  //Creatures are Movers with the force of will
  ns.Creature = function(settings,environment){
    this.environment = environment;
    this.willFunction = settings.will;
    this.willForce = new ns.Vector2D(0,0);
    ns.Mover.call(this, settings);
  }

  ns.Creature.prototype = (function () {
    var moverProto = ns.Mover.prototype,
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

          ns.arrows.drawForceOnMover(context,this,this.willForce,'green');

          moverProto.display.call(this,canvas);
        },

        defaultWillFunction = function(){
          var randX = Math.random() - 0.5,
              randY = Math.random() - 0.5;

          return new ns.Vector2D(randX, randY);
        }

    return{
        update:update,
        display:display,
        applyForce:moverProto.applyForce
    };
  })();

})(natureOfCode);
