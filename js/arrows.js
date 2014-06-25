var natureOfCode = natureOfCode || {};
natureOfCode.arrows = natureOfCode.arrows || {};

//Drawing the willForce is completely optional, just for me to understand what is happening.
natureOfCode.arrows.drawWillForce = function(context,creature){
    //make a copy just for display purposes, so that we don't affect the real force
    var forceForDisplay = new natureOfCode.Vector2D(creature.willForce.x, creature.willForce.y);
    //scale it up so we can see it
    forceForDisplay = forceForDisplay.multiply(50);
    //translate it on top of the mover's body
    forceForDisplay = forceForDisplay.addVector(creature.location);
    //draw it
    natureOfCode.arrows.drawArrow(context,creature.location.x,creature.location.y,forceForDisplay.x,forceForDisplay.y,'green');
};


//Drawing the velocity and acceleration is completely optional, just for me to understand what is happening.
natureOfCode.arrows.drawVelocityAndAcceleration = function(context,mover){
    //draw velocity
    //make a copy just for display purposes, so that we don't affect the real velocity
    var velocityForDisplay = new natureOfCode.Vector2D(mover.velocity.x, mover.velocity.y);
    //scale it up so we can see it
    velocityForDisplay = velocityForDisplay.multiply(3);
    //translate it on top of the mover's body
    velocityForDisplay = velocityForDisplay.addVector(mover.location);
    //draw it
    natureOfCode.arrows.drawArrow(context,mover.location.x,mover.location.y,velocityForDisplay.x,velocityForDisplay.y,'blue');

    //draw acceleration
    //make a copy just for display purposes, so that we don't affect the real acceleration
    var accelerationForDisplay = new natureOfCode.Vector2D(mover.acceleration.x, mover.acceleration.y);
    //scale it up so we can see it. Acceleration is tiny so it needs to be scaled up a lot.
    accelerationForDisplay = accelerationForDisplay.multiply(50);
    //translate it on top of the mover's body
    accelerationForDisplay = accelerationForDisplay.addVector(mover.location);
    natureOfCode.arrows.drawArrow(context,mover.location.x,mover.location.y,accelerationForDisplay.x,accelerationForDisplay.y,'red');
};

natureOfCode.arrows.drawArrow = function(context, sourceX, sourceY, destinationX, destinationY, color){
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
