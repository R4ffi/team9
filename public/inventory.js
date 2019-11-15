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
        this.Living = new Item(ItemTypes.LIVING, 10, cars["viper"])
        this.Car = new Item(ItemTypes.CAR, 10, cars["viper"])
        this.Holiday = new Item(ItemTypes.HOLIDAY, 10, cars["viper"])
        this.EnergyPackage = new Item(ItemTypes.ENERGYPACK, 10, cars["viper"])
        this.EnergyGenerator = new Item(ItemTypes.ENERGYGEN, 10, cars["viper"])
    }

    addItem(item) {
        console.log("added item" + item.type)
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
        strokeWeight(3);
        rect(this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        image(this.Living.image, this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayCar() {
        push();
        stroke(240, 133, 135);
        strokeWeight(3);
        rect(this.itemSize + 2 * this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        image(this.Car.image, this.itemSize + 2 * this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayHoliday() {
        push();
        stroke(41, 109, 181);
        strokeWeight(3);
        rect(2 * this.itemSize + 3 * this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        image(this.Holiday.image, 2 * this.itemSize + 3 * this.itemSpace, this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyPackage() {
        push();
        stroke(93, 167, 221);
        strokeWeight(3);
        rect(this.itemSpace, this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.EnergyPackage.image, this.itemSpace, this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    displayEnergyGenerator() {
        push();
        stroke(95, 187, 158);
        strokeWeight(3);
        rect(this.itemSize + 2 * this.itemSpace, this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        image(this.EnergyGenerator.image, this.itemSize + 2 * this.itemSpace, this.itemSize + 2 * this.itemSpace, this.itemSize, this.itemSize);
        pop();
    }

    getConsumption(){
        let consumption = 0;
        consumption += this.Living.consumption;
        this.Car;
        this.Holiday;
        this.EnergyPackage;
        this.EnergyGenerator;
    
    }
}