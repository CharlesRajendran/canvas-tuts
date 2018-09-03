var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var mouselocation = {
  xpos: undefined,
  ypos:undefined
};

var circleArray = [];

window.addEventListener('mousemove', function(event) {
  mouselocation.xpos = event.x;
  mouselocation.ypos = event.y;
});

window.addEventListener('resize', function(event) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

var colorPallet = [
  "#9BFF0D",
  "#E89B0C",
  "#FF0000",
  "#480CE8",
  "#37F7FF"
];

function Circle(x, y, r, dx, dy, color) {
  this.r = r;
  this.x = x;
  this.y = y;
  this.dx = Math.random() * dx + 1;
  this.dy = Math.random() * dy + 1;
  this.color = color;

  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  };

  this.update = () => {
    if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (Math.abs(mouselocation.xpos - this.x) < 50 && Math.abs(mouselocation.ypos - this.y) < 50 && this.r < 30) {
      this.r += 2;
    } else if (this.r > 5) {
      this.r -= 1;
    }

    this.draw();
  };
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for(let i=0; i< circleArray.length; i++)
    circleArray[i].update();
}

function init() {
  for(let i = 0; i < 7000; i++) {
    let r = 10;
    let dx = 3;
    let dy = 3;
    let x = Math.random() * (innerWidth - 2 *r) + r;
    let y = Math.random() * (innerHeight - 2 *r) + r;
    let color = colorPallet[Math.floor(Math.random() * colorPallet.length)];
    circleArray.push(new Circle(x, y, r, dx, dy, color));
  }
  animate();
}

init();
