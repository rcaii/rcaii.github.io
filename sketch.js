// center position
var cx, cy;

var hoursRadius, minutesRadius, secondsRadius;
var clockSemiMinorAxis, clockSemiMajorAxis;

function setup() {
  createCanvas(700, 500);
  stroke(255);

  var radius = min(width, height) / 2;

  // define variables
  cx = width / 2;
  cy = height / 2;

  secondsRadius = radius * 0.70;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.50;
  clockSemiMinorAxis = radius * 1.5;
  clockSemiMajorAxis = radius * 1.8;
}

function draw() {
  // Background color
  background(0);

  // Clock background
  fill(90, 20, 30);
  noStroke();
  ellipse(cx, cy, clockSemiMinorAxis, clockSemiMajorAxis);

  var sec = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var min = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var hr = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Clock hands
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(sec) * secondsRadius, cy + sin(sec) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(min) * minutesRadius, cy + sin(min) * minutesRadius);
  strokeWeight(5);
  line(cx, cy, cx + cos(hr) * hoursRadius, cy + sin(hr) * hoursRadius);

  // Special hour ticks
  for (var a = 0; a < 360; a += 6) {
    if (a == 270 || a == 90) {
      noFill();
      beginShape();
      var angle = radians(a);
      var x = cx + cos(angle) * secondsRadius;
      var y = cy + sin(angle) * secondsRadius;
      vertex(x + 2, y - 2);
      vertex(x + 2, y + 2);
      vertex(x - 2, y - 2);
      vertex(x - 2, y + 2);
      endShape(CLOSE);
    }
    if (a == 0 || a == 180) {
      noFill();
      beginShape();
      var angle = radians(a);
      var x = cx + cos(angle) * secondsRadius;
      var y = cy + sin(angle) * secondsRadius;
      vertex(x + 2, y - 2);
      vertex(x - 2, y - 2);
      vertex(x + 2, y + 2);
      vertex(x - 2, y + 2);
      endShape(CLOSE);
    }
  }

  // minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (var a = 0; a < 360; a += 6) {
    if (a != 0 && a != 90 && a != 180 && a != 270) {
      var angle = radians(a);
      var x = cx + cos(angle) * secondsRadius;
      var y = cy + sin(angle) * secondsRadius;
      vertex(x, y);
    }
  }
  endShape();
}