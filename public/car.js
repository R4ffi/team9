class Car {

  constructor(canvasWidth, canvasHeight, laneWidth, image) {
    this.pos = createVector(canvasWidth >> 1, 50);
    this.laneWidth = laneWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 80;
    this.height = 66;
    this.pos.y = canvasHeight - (160)
    this.lane = 3;
    this.image = image;
    this.ruckelSpeed = 3;
    this.frame = 0;
  }

  update() {
    return this;
  }

  moveRight() {
    this.pos.x += this.laneWidth
    this.lane++;
  }

  moveLeft() {
    this.pos.x -= this.laneWidth
    this.lane--;
  }

  display() {
    this.frame++;
    if(this.frame >= this.ruckelSpeed){
      this.frame = 0;
      this.pos.y += map(Math.random()*6, 0, 6, -2.5, +2.5)
    }
    image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    return this;
  }

  displayParticles() {
    let wind = createVector(0,0.3);
    this.ps.applyForce(wind);
    this.ps.run();
    for (let i = 0; i < 2; i++) {
      this.ps.addParticle();
    }
  }
}