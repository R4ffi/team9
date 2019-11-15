let car;
let carImage;
let street;
let canvasWidth = 800;
let laneWidth = 60;
let canvasHeight = 600;
let maxFuel = 20;
let fuel;
let inventory;
let particleAnimator;
let Obstacles;
let cars;
var speed = 10;
let consumption = 0;
let streetBackground;
let distance; 
let framerate = 30;
let count = 0;
let maxDistance = 100;

let Categories = [
    {
        "name": "beziehen",
        "type": ItemTypes.ENERGYPACK
    },
    {
        "name": "cars",
        "type": ItemTypes.CAR
    },
    {
        "name": "erzeugen",
        "type": ItemTypes.ENERGYGEN
    },
    {
        "name": "home",
        "type": ItemTypes.LIVING
    },
    {
        "name": "travel",
        "type": ItemTypes.HOLIDAY
    }
]

function preload() {
    cars = loadCars();
    Obstacles = new Array();
    particleTexture = loadImage("assets/particle_texture.png")
    streetBackground = loadImage("assets/street.png")
    ObstacleImages = loadObstacles();
    console.log(ObstacleImages)
    this.itemCount = 0;
}

function setup() {
    let rightSideOfStreet = canvasWidth / 2 + 5* laneWidth; 
    placeObstacle(1);
    car = new Car(canvasWidth, canvasHeight, laneWidth, cars["viper"]);
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('game');
    street = new Street(canvasWidth, canvasHeight, laneWidth, streetBackground);
    particleAnimator = new ParticleAnimator(particleTexture, car);
    fuel = new Fuel(canvasWidth, canvasHeight, maxFuel)
    inventory = new Inventory(canvasWidth, canvasHeight, 40, 60)
    distance = new Distance(canvasWidth, canvasHeight, rightSideOfStreet , canvasHeight - 100, canvasWidth - rightSideOfStreet, 100)

}

function draw() {
    clear();
    frameRate(framerate);
    imageMode(CENTER);
    rectMode(CENTER);
    street.display();
    car.display();
    push();
    particleAnimator.display();
    pop();
    displayObstacles();
    fuel.display();
    inventory.display();
    push()
    fill(100);
    textSize(15);
    text("Consumption: "+consumption, canvasWidth - canvasWidth/5, 20)
    pop();
    distance.display();
    if(count/framerate > 5){
        console.log("Consumption:"+consumption)
        fuel.use(consumption);
        distance.distanceTraveled(speed)
        count = 0;
    }
    count++;
}


function keyPressed() {
    if (keyCode === LEFT_ARROW && car.lane > 1) {
        car.moveLeft();
        particleAnimator.move();
    }
    if (keyCode === RIGHT_ARROW && car.lane < street.lanes) {
        car.moveRight();
        particleAnimator.move();
    }
}

function loadCars() {
    var cars = {};
    $.getJSON("assets/cars/cars.json", function(json) {
        console.log(json.cars);
        $.each(json.cars, function(i, item) {
            cars[item.name] = loadImage(item.png);
        });

    });
    return cars;
}

function loadObstacles() {
    var obstacles = {};
    $.getJSON("assets/obstaclePNGs/Obstacles.json", function(json) {
        $.each(json, function(index, data) {
            obstacles[index] = new Array();
            $.each(data, function(i, item){
                obstacles[index].push({
                    "png": loadImage(item.png),
                    "consumption": item.consumption
                });
            })
        });
    });
    return obstacles;
}
function displayObstacles(){
    let i = 0; 
    Obstacles[i].display();
    Obstacles[i].pos.y += speed;
    if(Obstacles[i].pos.y >= canvasHeight){
        Obstacles[i].pos.y = 0;
        getNewObstacle();
    } 

    if(car.pos.y - Obstacles[i].pos.y < Obstacles[i].size && Obstacles[i].lane == car.lane){
        this.itemCount++;
        if(itemCount == 5){
            itemCount = 0;
        }
        inventory.addItem(Obstacles[i].item)
        consumption = inventory.getConsumption();
        getNewObstacle();
    }
}
function placeObstacle(lane){
    let randomIndex = (Math.round(Math.random() * (ObstacleImages[Categories[itemCount].name].length-1)));
    let item = new Item(Categories[itemCount].type, ObstacleImages[Categories[itemCount].name][randomIndex].consumption, ObstacleImages[Categories[itemCount].name][randomIndex].png);
    Obstacles.push(new Obstacle(lane, canvasHeight, canvasWidth, laneWidth, item));
}

function getNewObstacle(){
    let randomIndex = (Math.round(Math.random() * (ObstacleImages[Categories[itemCount].name].length-1)))
    let item = new Item(Categories[itemCount].type,  ObstacleImages[Categories[itemCount].name][randomIndex].consumption, ObstacleImages[Categories[itemCount].name][randomIndex].png)
    Obstacles.pop()
    let lane = Math.round(Math.random() * (4))+1;
    console.log(lane);
    Obstacles.push(new Obstacle(lane, canvasHeight, canvasWidth, laneWidth, item));
}