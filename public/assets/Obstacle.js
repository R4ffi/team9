class Obstacle {

  constructor(lane, canvasHeight, canvasWidth,laneWidth, item) {
    this.lane = lane
    this.pos = createVector(canvasWidth/2 + (-3 + lane)*laneWidth, 0);
    this.canvasHeight = canvasHeight;
    this.size = laneWidth;
    this.item = item;

  }

  display(){
    push();
    strokeWeight(5);
    stroke(this.item.type.r, this.item.type.g, this.item.type.b);
    if(this.pos.y >= canvasHeight){
      this.pos.y = 0;
    } 
    this.pos.y += speed;
    rect(this.pos.x, this.pos.y, this.size, this.size, 20);
    image(this.item.image,this.pos.x,  this.pos.y, this.size, this.size);
    pop();
  }
}