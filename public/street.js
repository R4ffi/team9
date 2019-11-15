class Street{
  constructor(canvasWidth, canvasHeight, laneWidth) {
    this.laneWidth = laneWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lanes = 5;
    this.spacing = 20;
    this.shift = 0;
  }

  display() {
    if(this.shift < -this.spacing*1.7){
      this.shift = 0;
    }
    this.shift -= speed;
    this.firstLane = (this.canvasWidth - (this.lanes * this.laneWidth)) /2
    let i = 0;
    var totalsplits = this.canvasHeight/this.spacing;
    for(i; i <= this.lanes; i++){
      if(i > 0 && i < this.lanes){
        for(var j = 0; j < totalsplits; j+=2){
          var pointa = this.canvasHeight-(this.shift+this.spacing*(j+1));
          var pointb = this.canvasHeight-(this.shift+this.spacing*(j));
          line(this.firstLane, pointa, this.firstLane, pointb) ;
        }
        this.firstLane += this.laneWidth;
      }
      else{
        line(this.firstLane,this.canvasHeight,this.firstLane, 0) 
        this.firstLane += this.laneWidth;
      }
    }
	}
}