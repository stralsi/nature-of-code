var natureOfCode = natureOfCode || {};


natureOfCode.Vectors = function (canvas) {
    "use strict";
    var numberOfMovers = 20,
        movers = [],
        refreshRate = 40,
        mouseX = 0, mouseY = 0,
        backgroundColor = 'antiqueWhite',

        draw = function () {
            var context = canvas.getContext("2d");
            context.clearRect ( 0 , 0 , canvas.width , canvas.height );
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            for(var i = 0;i<numberOfMovers;i++){
                var mover = movers[i];

                mover.moveTowards(mouseX,mouseY);

                mover.update(canvas.width,canvas.height);

                mover.display(canvas);
            }

            setTimeout(draw, refreshRate);
        },

        setup = function () {
            canvas.onmousemove = function(ev){
                var boundingRect = canvas.getBoundingClientRect();
                setMousePosition(ev.clientX - boundingRect.left, ev.clientY - boundingRect.top);
            };

            for(var i = 0;i<numberOfMovers;i++){
                var randX = Math.random()*canvas.width;
                var randY = Math.random()*canvas.height;
                movers.push(new natureOfCode.Mover(randX,randY));
            }


            canvas.getContext("2d").clearRect ( 0 , 0 , canvas.width , canvas.height );
        },

        setMousePosition = function(x, y){
            mouseX = x;
            mouseY = y;
        };

        setup();
        draw();
};
