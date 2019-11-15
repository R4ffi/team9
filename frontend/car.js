class Car {
  
	constructor(canvasWidth, canvasHeight, laneWidth, image) {
		this.pos = createVector(width>>1,50);
		this.vel = createVector();
    this.grav = 0.1;
    this.laneWidth = laneWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 80;
    this.height = 66;
    this.pos.y = canvasHeight - (100)
    this.lane = 3;
    this.image = image;  
	}

	update() {
		return this;
  }
  
  moveRight(){
    this.pos.x += this.laneWidth
    this.lane++;
  }

  moveLeft(){
    this.pos.x -= this.laneWidth
    this.lane--; 
  }

	display() {
    fill(217);
    image(this.image, this.pos.x, this.pos.y, this.width, this.height);
		return this;
	}

	drive() {
		return this.update().display();
	}
}