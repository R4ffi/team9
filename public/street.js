class Street {
    constructor(canvasWidth, canvasHeight, laneWidth, background) {
        this.laneWidth = laneWidth;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.lanes = 5;
        this.spacing = 20;
        this.shift = 0;
        this.background = background;
        this.y = 0;

        this.scrollSpeed = speed;
        this.yOffset = Math.round(this.background.height * 0.5);
        this.xOffset = this.canvasWidth / 2;
        this.numberOfBackgroundImages = Math.round(this.canvasHeight / this.background.height) + 2;
    }

    display() {
        console.log(`X: ${this.xOffset}, Y: ${this.y}`)
        for (let i = 0; i < this.numberOfBackgroundImages; i++) {
            const yPos = this.y + ((i - 1) * this.background.height + this.yOffset);
            image(this.background, this.xOffset, yPos);
        }

        this.y += this.scrollSpeed;

        if (this.y > this.background.height) {
            this.y = 0;
        }

    }
}