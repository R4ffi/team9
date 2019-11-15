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
    }

    display() {
        const numberOfBackgroundImages = Math.round(this.canvasHeight / this.background.height) + 2;

        for (let i = 0; i < numberOfBackgroundImages; i++) {
            const yPos = this.y + ((i - 1) * this.background.height + (this.background.height * 0.5));
            image(this.background, this.canvasWidth / 2, yPos);
        }

        if (this.y > this.background.height) {
            this.y = 0;
        }

        this.y += this.scrollSpeed;
    }
}