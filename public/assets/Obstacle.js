class Obstacle {

  constructor(lane, canvasWidth,canvasHeight, laneWidth, item) {
    this.lane = lane
    this.pos = createVector(canvasWidth/2 + (-3 + lane)*laneWidth, 0);
    this.size = laneWidth;
    this.item = item;
    this.laneWidth = laneWidth;
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

  }

  display(){
    push();
    strokeWeight(10);
    stroke(this.item.type.r, this.item.type.g, this.item.type.b);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    image(this.item.image, this.pos.x, this.pos.y, this.size, this.size);
    rectMode(CENTER);
    let imagesize = this.canvasHeight/4;
    rect((this.canvasWidth / 2 + 5 * this.laneWidth)+20,this.canvasHeight-imagesize*2.4, imagesize, imagesize);
    image(this.item.image,(this.canvasWidth / 2 + 5 * this.laneWidth)+20, this.canvasHeight-imagesize*2.4, imagesize, imagesize);
    pop();

    push();
    fill(this.item.type.r, this.item.type.g, this.item.type.b);
    textSize(20);
    textFont('consolas');
    let imageName = this.item.imagePath.split("/")[this.item.imagePath.split("/").length-1].split('.')[0];
    text(this.item.type.name +": "+imageName, (this.canvasWidth / 2 + 4.1 * this.laneWidth), (this.canvasHeight-imagesize*2.4) + imagesize/1.4);
    pop();

  }
}