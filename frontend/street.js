class Street{
  constructor(canvasWidth, canvasHeight, laneWidth) {
    this.laneWidth = laneWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lanes = 5;
    
  }

  display() {
    this.firstLane = (this.canvasWidth - (this.lanes * this.laneWidth)) /2
    let i = 0;
    for(i; i <= this.lanes; i ++){
      line(this.firstLane,this.canvasHeight,this.firstLane, 0) 
      this.firstLane += this.laneWidth;
    }
	}
}