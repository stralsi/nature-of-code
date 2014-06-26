var natureOfCode = natureOfCode || {};

(function(ns){
"use strict";

  ns.Mover = function (settings) {
      this.location  = new ns.Vector2D(settings.x, settings.y);
      this.mass = settings.mass;
      this.drawingFunction = settings.draw;
      this.afterUpdateCallback = settings.afterUpdate;
      this.velocity = new ns.Vector2D(0, 0);
      this.acceleration = new ns.Vector2D(0,0);
      this.topSpeed = settings.topSpeed;
  };

  ns.Mover.prototype = (function () {
      var defaultTopSpeed = 10,
          forcesArray = [],

          //public. This is the function where movement happens. It should be called at each frame.
          update = function (width, height) {
              this.acceleration = calculateAcceleration(forcesArray, this.mass);
              forcesArray = [];//the forces have to be reapplied at each cicle, they don't accumulate;

              this.velocity = this.velocity.addVector(this.acceleration);
              this.velocity = limit(this.velocity, this.topSpeed || defaultTopSpeed);

              this.location = this.location.addVector(this.velocity);

              checkEdges.call(this,width, height);

              if(this.afterUpdateCallback) this.afterUpdateCallback.call(this);
          },

          //public. This is the function where the object is drawn. It should be called at each frame.
          display =  function (canvas) {
              var context = canvas.getContext('2d');

              if(this.drawingFunction){
                this.drawingFunction(context,this.location.x,this.location.y);
              }else{
                drawCircle(context,this.location.x,this.location.y);
              }

              ns.arrows.drawVelocityAndAcceleration(context,this);
          },

          //public. You can use forces to tell the Mover how to move.
          applyForce = function(force){
              //Forces are only stored in an array for now.
              //They will be really applied in the update function.
              forcesArray.push(force);
          },

          //private. calculating acceleration using newton's second law: a = F/m
          calculateAcceleration = function(forces, mass){
              var newAcceleration,
                  resultingForce = new ns.Vector2D(0,0),
                  i;

              //first add all the forces
              for(i = 0;i<forces.length;i++){
                resultingForce = resultingForce.addVector(forces[i]);
              }

              //divide by mass
              if(mass){
                newAcceleration = resultingForce.divide(mass);
              }else{
                newAcceleration = resultingForce;
              }

              return newAcceleration;
          },

          //private. Keeps the mover from going out of screen.
          checkEdges = function (width, height) {
              if(this.location.x > width || this.location.x < 0 ){
                this.velocity = new ns.Vector2D(-this.velocity.x,this.velocity.y);
              }
              if(this.location.y > height || this.location.y < 0 ){
                this.velocity = new ns.Vector2D(this.velocity.x,-this.velocity.y);
              }
          },

          //private. Keeps the mover from going too fast.
          limit = function(vector,max){
              var result = vector,
                  magnitude = vector.magnitude();

              if(magnitude > max){
                  result = vector.divide(magnitude/max);
              }

              return result;
          },

          //private.
          drawCircle = function(context,x,y){
            //draw body
            context.beginPath();
            context.arc(x, y, 10, 0, 2 * Math.PI, false);
            context.fillStyle = '#00ffff';
            context.fill();
          };

      return{
          update:update,
          display:display,
          applyForce:applyForce
      };
  })();

})(natureOfCode);
