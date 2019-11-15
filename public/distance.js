class Distance {

    constructor(canvasWidth, canvasHeight, posX, posY, sizeX, sizeY) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.posX = posX;
        this.posY = posY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    kilometersToGo = 500;
    text  = "Stade de Suisse: ";

    distanceTraveld(distance) {
        this.kilometersToGo -= distance;
    }

    display() {
        push();
        textSize(20);
        fill(232,128,15);
        text(this.text + this.kilometersToGo + " KM", this.posX, this.posY, this.canvasWidth - this.posX, this.canvasHeight - this.posY);
        pop();
    }

}