var particles = [];
for (var i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() > 0.5 ? 0 : window.innerWidth,
    y: window.innerHeight / 2,
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
    history: [],
    size: 4 + Math.random() * 6,
    color:
    Math.random() > 0.5 ?
    "#10b285" :
    Math.random() > 0.5 ? "#980082" : "#c1f8ff" });

}

var mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 };


var canvas = document.getElementById("background");

if (canvas && canvas.getContext) {
  var context = canvas.getContext("2d");

  Initialize();
}

function Initialize() {
  canvas.addEventListener("mousemove", MouseMove, false);
  window.addEventListener("resize", ResizeCanvas, false);
  TimeUpdate();

  context.beginPath();

  ResizeCanvas();
}

function TimeUpdate(e) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (var _i = 0; _i < particles.length; _i++) {
    particles[_i].x += particles[_i].vx;
    particles[_i].y += particles[_i].vy;

    if (particles[_i].x > window.innerWidth) {
      particles[_i].vx = -1 - Math.random();
    } else if (particles[_i].x < 0) {
      particles[_i].vx = 1 + Math.random();
    } else {
      particles[_i].vx *= 1 + Math.random() * 0.005;
    }

    if (particles[_i].y > window.innerHeight) {
      particles[_i].vy = -1 - Math.random();
    } else if (particles[_i].y < 0) {
      particles[_i].vy = 1 + Math.random();
    } else {
      particles[_i].vy *= 1 + Math.random() * 0.005;
    }

    context.strokeStyle = particles[_i].color;
    context.beginPath();
    for (var j = 0; j < particles[_i].history.length; j++) {
      context.lineTo(particles[_i].history[j].x, particles[_i].history[j].y);
    }
    context.stroke();

    particles[_i].history.push({
      x: particles[_i].x,
      y: particles[_i].y });

    if (particles[_i].history.length > 45) {
      particles[_i].history.shift();
    }

    for (var j = 0; j < particles[_i].history.length; j++) {
      particles[_i].history[j].x +=
      0.01 * (mouse.x - particles[_i].history[j].x) / (45 / j);
      particles[_i].history[j].y +=
      0.01 * (mouse.y - particles[_i].history[j].y) / (45 / j);
    }

    var distanceFactor = DistanceBetween(mouse, particles[_i]);
    distanceFactor = Math.pow(
    Math.max(Math.min(10 - distanceFactor / 10, 10), 2),
    0.5);


    context.fillStyle = particles[_i].color;
    context.beginPath();
    context.arc(
    particles[_i].x,
    particles[_i].y,
    particles[_i].size * distanceFactor,
    0,
    Math.PI * 2,
    true);

    context.closePath();
    context.fill();
  }

  requestAnimationFrame(TimeUpdate);
}

function MouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;

  //context.fillRect(e.layerX, e.layerY, 5, 5);
  //Draw( e.layerX, e.layerY );
}

function Draw(x, y) {
  context.strokeStyle = "#ff0000";
  context.lineWidth = 4;
  context.lineTo(x, y);
  context.stroke();
}

function ResizeCanvas(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function DistanceBetween(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}