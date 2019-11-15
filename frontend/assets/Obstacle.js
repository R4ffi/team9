class Obstacle {

  constructor(lane, canvasHeight, canvasWidth,laneWidth) {
    this.lane = lane
    this.pos = createVector(canvasWidth/2 + (-3 + lane)*laneWidth, 0);
    this.canvasHeight = canvasHeight;
    this.size = laneWidth;

  }

  display(){
    if(this.pos.y >= canvasHeight){
      this.pos.y = 0;
    } 
    this.pos.y += 2;
    rect(this.pos.x, this.pos.y, this.size, this.size, 20);
  }
}