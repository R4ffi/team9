class Inventory{
    Living; 
    Car; 
    Holiday; 
    EnergyPackage; 
    EnergyGenerator;

    constructor(canvasWidth, canvasHeight, itemSpace, itemSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.itemSpace = itemSpace;
        this.itemSize = itemSize;
    }

    display() {
        this.displayLiving();
        this.displayCar();
        this.displayHoliday();
        this.displayEnergyPackage();
        this.displayEnergyGenerator();
    }

    displayLiving() {
        push();
        stroke(130, 68, 147);
        strokeWeight(3);
        rect(this.itemSpace , this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayCar() {
        push();
        stroke(240, 133, 135);
        strokeWeight(3);
        rect(this.itemSize + 2* this.itemSpace , this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayHoliday() {
        push();
        stroke(41, 109, 181);
        strokeWeight(3);
        rect(2* this.itemSize + 3* this.itemSpace , this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyPackage() {
        push();
        stroke(93, 167, 221);
        strokeWeight(3);
        rect(this.itemSpace, this.itemSize + 2* this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyGenerator() {
        push();
        stroke(95, 187, 158);
        strokeWeight(3);
        rect(this.itemSize + 2* this.itemSpace , this.itemSize + 2* this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }
}