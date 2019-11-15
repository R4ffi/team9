class Inventory {
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
        let img = this.loadInitImg();
        this.Living = new Item(ItemTypes.LIVING, 0, img)
        this.Car = new Item(ItemTypes.CAR, 0, img)
        this.Holiday = new Item(ItemTypes.HOLIDAY, 0, img)
        this.EnergyPackage = new Item(ItemTypes.ENERGYPACK, 0, img)
        this.EnergyGenerator = new Item(ItemTypes.ENERGYGEN, 0, img)
    }
    getCurrentItem(itemType) {
        switch (itemType) {
            case ItemTypes.LIVING:
                return this.Living;
            case ItemTypes.CAR:
                return this.Car;
            case ItemTypes.HOLIDAY:
                return this.Holiday;
            case ItemTypes.ENERGYGEN:
                return this.EnergyGenerator;
            case ItemTypes.ENERGYPACK:
                return this.EnergyPackage;
        }
    }

    addItem(item) {
        switch (item.type) {
            case ItemTypes.LIVING:
                this.Living = item;
                break;
            case ItemTypes.CAR:
                this.Car = item;
                break;
            case ItemTypes.HOLIDAY:
                this.Holiday = item;
                break;
            case ItemTypes.ENERGYGEN:
                this.EnergyGenerator = item;
                break;
            case ItemTypes.ENERGYPACK:
                this.EnergyPackage = item;
                break;
        }
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
        strokeWeight(10);
        rect(this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        image(this.Living.image, this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyPackage() {
        push();
        stroke(93, 167, 221);
        strokeWeight(10);
        rect(this.itemSpace, this.itemSize + 1.5 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.EnergyPackage.image, this.itemSpace, this.itemSize + 1.5 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayCar() {
        push();
        stroke(240, 133, 135);
        strokeWeight(10);
        rect(this.itemSpace, 2 * this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.Car.image, this.itemSpace, 2 * this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayHoliday() {
        push();
        stroke(41, 109, 181);
        strokeWeight(10);
        rect(this.itemSpace, 3 * this.itemSize + 2.5 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.Holiday.image, this.itemSpace, 3 * this.itemSize + 2.5 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyGenerator() {
        push();
        stroke(95, 187, 158);
        strokeWeight(10);
        rect(this.itemSpace, 4 * this.itemSize + 3 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.EnergyGenerator.image, this.itemSpace, 4 * this.itemSize + 3 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    getConsumption() {
        let consumption = 0;
        consumption += this.Living.consumption;
        consumption += this.Car.consumption;
        consumption += this.Holiday.consumption;
        consumption += this.EnergyPackage.consumption;
        consumption += this.EnergyGenerator.consumption;
        return consumption;
    }

    loadInitImg() {
        let img = createImage(66, 66);
        img.loadPixels();
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                img.set(i, j, color(255, 255, 255));
            }
        }
        img.updatePixels();

        return img;
    }
}