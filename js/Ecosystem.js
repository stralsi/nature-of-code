var natureOfCode = natureOfCode || {};

(function(ns){
  "use strict";

  ns.Ecosystem = function (canvas) {
      var numberOfMovers = 20,
          environment = {
            movers : [],
            mouseX : 0, mouseY : 0
          },
          refreshRate = 40,
          backgroundColor = '#E6E6E6',
          currentColor = '#A9F5E1',
          current = new ns.Vector2D(0.3,0),
          mudColor = '#F3E2A9',

          draw = function () {
              var context = canvas.getContext("2d");
              context.clearRect ( 0 , 0 , canvas.width , canvas.height );
              context.fillStyle = backgroundColor;
              context.fillRect(0, 0, canvas.width, canvas.height);

              //drawing current
              context.fillStyle = currentColor;
              context.fillRect(0, 0, canvas.width, canvas.height/4);

              //drawing mud
              context.fillStyle = mudColor;
              context.fillRect(0, 3*canvas.height/4, canvas.width, canvas.height);


              //draw movers
              for(var i = 0;i<environment.movers.length;i++){
                  var mover = environment.movers[i];

                  //in part of the screen, there is a strong current
                  applyCurrent(mover);

                  //in another part of the screen there is some hard-to-swim-through mud
                  applyMud(mover);

                  mover.update(canvas.width,canvas.height);

                  mover.display(canvas);
              }

              setTimeout(draw, refreshRate);
          },

          setup = function () {
              var i,randX, randY, randColor;
              canvas.onmousemove = function(ev){
                  var boundingRect = canvas.getBoundingClientRect();
                  setMousePosition(ev.clientX - boundingRect.left, ev.clientY - boundingRect.top);
              };

              //create the bugs
              for(i = 0;i<numberOfMovers/2;i++){
                  randX = Math.random()*canvas.width;
                  randY = Math.random()*canvas.height;
                  randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                  environment.movers.push(new ns.Bug({x:randX,y:randY,color:randColor},environment));
              }

              //create the fish
              for(i = Math.floor(numberOfMovers/2);i<numberOfMovers;i++){
                  randX = Math.random()*canvas.width;
                  randY = Math.random()*canvas.height;
                  randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                  environment.movers.push(new ns.Fish({x:randX,y:randY,color:randColor},environment));
              }

              canvas.getContext("2d").clearRect ( 0 , 0 , canvas.width , canvas.height );
          },

          setMousePosition = function(x, y){
              environment.mouseX = x;
              environment.mouseY = y;
          },
          applyCurrent = function(mover){
            if(mover.location.y < canvas.height/4 && mover.location.x < canvas.width){
              mover.applyForce(current);
            }
          },
          applyMud = function(mover){
            if(mover.location.y > 3*canvas.height/4 && mover.location.x < canvas.width){
              mover.applyForce(getDragForce(mover));
            }
          },
          getDragForce = function(mover){
              var density = 0.2,
                  speed, dragMagnitude, dragForce;

              speed = mover.velocity.magnitude();
              dragMagnitude = density * speed * speed; //in nature, the formula is more complex. I have ignored some parameters.
              dragForce = mover.velocity.clone();
              dragForce = dragForce.multiply(-1);
              dragForce.normalize();
              dragForce = dragForce.multiply(dragMagnitude);
              return dragForce;
          };

          setup();
          draw();
  };


})(natureOfCode);
