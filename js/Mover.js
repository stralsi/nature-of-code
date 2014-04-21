var natureOfCode = natureOfCode || {};

natureOfCode.Mover = function (xPos, yPos) {
    "use strict";
    this.location  = new natureOfCode.Vector2D(xPos, yPos);
    this.velocity = new natureOfCode.Vector2D(0, 0);
    this.acceleration = new natureOfCode.Vector2D(-0.001,0.01);
};

natureOfCode.Mover.prototype = (function () {
    "use strict";
    var ballColor = '#00cccc',
        radius = 10,
        topSpeed = 10,

        update = function (width, height) {
            this.velocity = this.velocity.addVector(this.acceleration);
            this.velocity = limit(this.velocity,topSpeed);

            this.location = this.location.addVector(this.velocity);
        },

        display = function (canvas) {
            var context = canvas.getContext('2d');

            //draw body
            context.beginPath();
            context.arc(this.location.x, this.location.y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = ballColor;
            context.fill();

            //draw velocity
            //make a copy just for display purposes, so that we don't affect the real velocity
            var velocityForDisplay = new natureOfCode.Vector2D(this.velocity.x, this.velocity.y);
            //scale it up so we can see it
            velocityForDisplay = velocityForDisplay.multiply(3);
            //translate it on top of the mover's body
            velocityForDisplay = velocityForDisplay.addVector(this.location);
            //draw it
            drawArrow(context,this.location.x,this.location.y,velocityForDisplay.x,velocityForDisplay.y,'blue');

            //draw acceleration
            //make a copy just for display purposes, so that we don't affect the real acceleration
            var accelerationForDisplay = new natureOfCode.Vector2D(this.acceleration.x, this.acceleration.y);
            //scale it up so we can see it. Acceleration is tiny so it needs to be scaled up a lot.
            accelerationForDisplay = accelerationForDisplay.multiply(50);
            //translate it on top of the mover's body
            accelerationForDisplay = accelerationForDisplay.addVector(this.location);
            drawArrow(context,this.location.x,this.location.y,accelerationForDisplay.x,accelerationForDisplay.y,'red');
        },

        moveTowards = function (x,y){
            var pointOfInterest = new natureOfCode.Vector2D(x,y);
            var directionOfMovement = pointOfInterest.subtractVector(this.location);
            directionOfMovement.normalize();
            directionOfMovement = directionOfMovement.multiply(0.5);

            this.acceleration = directionOfMovement;
        },

        limit = function(vector,max){
            var result = vector,
                magnitude = vector.magnitude();

            if(magnitude > max){
                result = vector.divide(magnitude/max);
            }

            return result;
        },

        drawArrow = function(context, sourceX, sourceY, destinationX, destinationY, color){
            context.beginPath();
            context.moveTo(sourceX, sourceY);
            context.lineTo(destinationX, destinationY);

            var size = 5;
            var angle = Math.atan2(destinationY - sourceY, destinationX - sourceX);

            context.lineTo(destinationX - size * Math.cos(angle-Math.PI/6), destinationY - size * Math.sin(angle-Math.PI/6));
            context.moveTo(destinationX, destinationY);
            context.lineTo(destinationX - size * Math.cos(angle+Math.PI/6), destinationY - size * Math.sin(angle+Math.PI/6));
            context.strokeStyle = color;
            context.stroke();
        };

    return{
        update:update,
        display:display,
        moveTowards:moveTowards
    }
})();