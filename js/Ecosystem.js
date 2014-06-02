var natureOfCode = natureOfCode || {};


natureOfCode.Ecosystem = function (canvas) {
    "use strict";
    var numberOfMovers = 20,
        environment = {
          movers : [],
          mouseX : 0, mouseY : 0
        },
        refreshRate = 40,
        backgroundColor = 'antiqueWhite',

        draw = function () {
            var context = canvas.getContext("2d");
            context.clearRect ( 0 , 0 , canvas.width , canvas.height );
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            for(var i = 0;i<environment.movers.length;i++){
                var mover = environment.movers[i];

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

            // create the bugs
            for(i = 0;i<numberOfMovers/2;i++){
                randX = Math.random()*canvas.width;
                randY = Math.random()*canvas.height;
                randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                environment.movers.push(natureOfCode.createBug({x:randX,y:randY,color:randColor}));
            }

            //create the fish
            for(i = Math.floor(numberOfMovers/2);i<numberOfMovers;i++){
                randX = Math.random()*canvas.width;
                randY = Math.random()*canvas.height;
                randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                environment.movers.push(natureOfCode.createFish({x:randX,y:randY,color:randColor},environment));
            }

            canvas.getContext("2d").clearRect ( 0 , 0 , canvas.width , canvas.height );
        },

        setMousePosition = function(x, y){
            environment.mouseX = x;
            environment.mouseY = y;
        };

        setup();
        draw();
};
