class Obstacle {

  constructor(lane, canvasHeight, canvasWidth,laneWidth, item) {
    this.lane = lane
    this.pos = createVector(canvasWidth/2 + (-3 + lane)*laneWidth, 0);
    this.size = laneWidth;
    this.item = item;

  }

  display(){
    push();
    strokeWeight(5);
    stroke(this.item.type.r, this.item.type.g, this.item.type.b);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    image(this.item.image, this.pos.x, this.pos.y, this.size, this.size);
    image(this.item.image,canvasWidth/2+canvasWidth/5, this.pos.y, canvasHeight/3, canvasHeight/3);
    pop();
  }
}