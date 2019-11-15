class Fuel{

    maxSize = 100; 
    constructor(canvasWidth, canvasHeight, maxFuel) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxFuel = maxFuel; 
        this.currentFuel = maxFuel;
        this.additionalFule = 0; 
    }
  
    add(fuelToAdd) {
        this.currentFuel += fuelToAdd;
        if(this.currentFuel > this.maxFuel){
            this.additionalFule += this.currentFuel % this.maxFuel;
            this.currentFuel = this.maxFuel; 
        }
    }

    //Schedule all 5 sec. 
    use(consumption) {
        this.additionalFule += consumption;
        if(this.additionalFule < 0) {
            this.currentFuel += this.additionalFule;
            this.additionalFule = 0;
        }
        console.log(this.currentFuel)
    }

    getFuel() {
        return this.currentFuel();
    }

    display() {
        if(this.currentFuel <= 0)
            return;
      
        var bla = 10;
        var blu = this.canvasHeight - (this.maxSize / this.maxFuel * this.currentFuel);
        
        push();
        fill(0,0,0,0);
        rect(10,this.canvasHeight - this.maxSize, 15, this.maxSize);
        pop();
        push();
        fill(0,255,0);
        stroke(0, 0, 0);
        rect(bla, blu, 15, this.maxSize / this.maxFuel * this.currentFuel);
        
        pop();
        push();
        fill(100);
        textSize(25);
        text("Fuel:"+Math.round(this.currentFuel), 10, this.canvasHeight-10);    
        pop();
        if(this.additionalFule > 0)
        {
            push();
            fill(0,0,0);
            stroke(0, 0, 0);

            rect(10, this.canvasHeight - this.maxSize - (this.maxSize / this.maxFuel * this.additionalFule), 15 , this.maxSize / this.maxFuel * this.additionalFule);
            pop();
        }
    }
  }