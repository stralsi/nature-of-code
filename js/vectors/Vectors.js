var natureOfCode = natureOfCode || {};


natureOfCode.Vectors = (function (canvas) {
    "use strict";

    var width = 600, height = 400,
        numberOfMovers = 20,
        movers = [],
        refreshRate = 40,
        mouseX = 0, mouseY = 0,
        backgroundColor = 'antiqueWhite',

        draw = function () {
            var context = canvas.getContext("2d");
            context.clearRect ( 0 , 0 , width , height );
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, width, height);

            for(var i = 0;i<numberOfMovers;i++){
                var mover = movers[i];

                mover.moveTowards(mouseX,mouseY);

                mover.update(width,height);

                mover.display(canvas);
            }

            setTimeout(draw, refreshRate);
        },

        setup = function () {
            canvas.width = width;
            canvas.height = height;

            canvas.onmousemove = function(ev){
                var boundingRect = canvas.getBoundingClientRect();
                setMousePosition(ev.clientX - boundingRect.left, ev.clientY - boundingRect.top);
            };

            for(var i = 0;i<numberOfMovers;i++){
                var randX = Math.random()*width;
                var randY = Math.random()*height;
                movers.push(new natureOfCode.Mover(randX,randY));
            }


            canvas.getContext("2d").clearRect ( 0 , 0 , width , height );
        },

        setMousePosition = function(x, y){
            mouseX = x;
            mouseY = y;
        };


        setup();
        draw();

})(document.getElementById('canvas'));
