function randomizePoint(range) {
  return range * (Math.random() - 0.5);
}

function checkCondition(circleRadius, pointX, pointY) {
  var pointRadius = Math.sqrt(pointX * pointX + pointY * pointY);

  if (pointRadius <= circleRadius) {
    return true;
  }

  return false;
}

window.Drawer = function (canvas) {
  var context = canvas.getContext("2d");

  var xCenter = canvas.width / 2;
  var yCenter = canvas.height / 2;

  this.clearCanvas = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.drawPoint = function (x, y, color) {
    var tmpX = Math.round(xCenter + x - 1);
    var tmpY = Math.round(yCenter + y - 1);

    context.strokeStyle = "#fff";
    context.fillStyle = color || "#000";

    context.fillRect(tmpX, tmpY, 2, 2);
  };

  this.drawCircle = function (x, y, radius) {
    var tmpX = Math.round(xCenter + x - 1);
    var tmpY = Math.round(yCenter + y - 1);

    context.lineWidth = 0.5;
    context.strokeStyle = "#ff0000";
    context.fillStyle = "#fff";

    context.beginPath();
    context.arc(tmpX, tmpY, radius, 0, 2 * Math.PI);
    context.stroke();
  };
};

var canvas = document.querySelector("#my-canvas");
var stats = document.querySelectorAll("ul > li");
console.log(stats[0].innerText);
var drawer = new Drawer(canvas);

var squareArea = canvas.width * canvas.height;
var circleRadius = 150;

var squarePointsCount = 0;
var circlePointsCount = 0;

drawer.clearCanvas();
drawer.drawCircle(0, 0, circleRadius);

function makeIteration() {
  for (var i = 0; i < 100; ++i) {
    // coord range 150 -150
    var pointX = randomizePoint(canvas.width);
    var pointY = randomizePoint(canvas.height);

    if (checkCondition(circleRadius, pointX, pointY)) {
      drawer.drawPoint(pointX, pointY, "green");

      circlePointsCount += 1;
    } else {
      drawer.drawPoint(pointX, pointY, "blue");
    }

    squarePointsCount += 1;
  }

  var randomPointsProportion = circlePointsCount / squarePointsCount;

  var computatedCircleArea = randomPointsProportion * squareArea;
  var computatedPI = computatedCircleArea / (circleRadius * circleRadius);

  var computationError = Math.abs(Math.PI - computatedPI);

  stats[0].innerText = "Pi number";
  stats[1].innerText = "expectations: " + Math.PI;
  stats[2].innerText = "actual: " + computatedPI;
  stats[3].innerText = "error: " + computationError;
}

setInterval(makeIteration, 400);
