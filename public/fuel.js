class Fuel{

    constructor(canvasWidth, canvasHeight, maxFuel) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxFuel = maxFuel; 
        this.currentFuel = maxFuel;
    }
  
    add(fuelToAdd) {
        this.currentFuel += fuelToAdd;
        if(this.currentFuel > this.maxFuel){
            this.additionalFule += this.currentFuel % this.maxFuel;
            this.currentFuel = this.maxFuel; 
        }
    }

    use(consumption) {
            this.currentFuel += consumption
    }

    getFuel() {
        return this.currentFuel();
    }

    display() {
        push();
        if(this.currentFuel <= 0){
            this.currentFuel = 0;
        }
        let offsetY = 45;
        let offsetX = 40;
        push();
        fill(0,0,0,0);
        rect(offsetX,this.canvasHeight - this.maxFuel - offsetY, 15, this.maxFuel*2);
        pop();
        push();
        fill(0,255,0);
     
        stroke(0, 0, 0);
        rect(offsetX,this.canvasHeight - (this.currentFuel) - offsetY, 15, this.currentFuel*2);
        
        pop();
        push();
        fill(100);
        textSize(20);
        textFont('consolas');
        text("Fuel:"+Math.round(this.currentFuel), 10, this.canvasHeight-10);    
        pop();
        pop();
    }
  }