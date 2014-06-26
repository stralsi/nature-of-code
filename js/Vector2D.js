var natureOfCode = natureOfCode || {};


(function(ns){
  //using Revealing prototype pattern because there will probably be many instances of Vector2D at the same time,
  //and this pattern saves some memory by keeping only one instance of the functions, in the prototype.

  Vector2D = function (xPos, yPos) {
      "use strict";
      this.x = xPos;
      this.y = yPos;
  };
  ns.Vector2D = Vector2D;

  Vector2D.prototype = (function () {
      "use strict";
      var addVector = function (otherVector) {
              return new Vector2D(this.x + otherVector.x, this.y + otherVector.y);
          },
          addScalar = function (scalar) {
              return new Vector2D(this.x + scalar, this.y + scalar);
          },
          subtractVector = function (otherVector) {
              var result = new Vector2D(this.x - otherVector.x, this.y - otherVector.y);
              return result;
          },
          subtractScalar = function (scalar) {
              return new Vector2D(this.x - scalar, this.y - scalar);
          },
          multiply = function (scalar) {
              return new Vector2D(this.x * scalar, this.y * scalar);
          },
          divide = function (scalar) {
              return new Vector2D(this.x / scalar, this.y / scalar);
          },
          magnitude = function(){
              return Math.sqrt( this.x * this.x + this.y * this.y);
          },
          normalize = function(){
              var unit = this.divide(this.magnitude());
              this.x = unit.x;
              this.y = unit.y;
          },
          clone = function(){
            return new Vector2D(this.x, this.y);
          };
      return {
          addVector: addVector,
          addScalar: addScalar,
          subtractVector:subtractVector,
          subtractScalar:subtractScalar,
          multiply:multiply,
          divide:divide,
          magnitude:magnitude,
          normalize:normalize,
          clone:clone
      };
  }());

})(natureOfCode)
