let car;
let carImage;
let street;
let canvasWidth = 800;
let laneWidth = 60;
let canvasHeight = 800;
let maxFuel = 100
let fuel;
let inventory;
let particleAnimator;
let Obstacles;
let cars;
var speed = 5;
let streetBackground;

function preload() {
    cars = loadCars();
    Obstacles = new Array();
    particleTexture = loadImage("assets/particle_texture.png")
    streetBackground = loadImage("assets/street.png")
}

function setup() {
    placeObstacle(1);
    car = new Car(canvasWidth, canvasHeight, laneWidth, cars["viper"]);
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('game');
    street = new Street(canvasWidth, canvasHeight, laneWidth, streetBackground);
    particleAnimator = new ParticleAnimator(particleTexture, car);
    fuel = new Fuel(canvasWidth, canvasHeight, maxFuel)
    inventory = new Inventory(canvasWidth, canvasHeight, 40, 60)
}

function draw() {
    frameRate(30);
    imageMode(CENTER);
    rectMode(CENTER);
    clear();
    street.display();
    car.display();
    push();
    particleAnimator.display();
    pop();
    displayObstacles();
    fuel.display();
    inventory.display();
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

function displayObstacles(){
    let i = 0; 
    Obstacles[i].display();
    if(car.pos.y - Obstacles[i].pos.y < Obstacles[i].size && Obstacles[i].lane == car.lane){
        inventory.addItem(Obstacles[i].item)
        let item = new Item(ItemTypes.LIVING, -15, cars["truck"])
        Obstacles.pop()
        Obstacles.push(new Obstacle(2, canvasHeight, canvasWidth, laneWidth, item));
    }
}
function placeObstacle(lane){
    let item = new Item(ItemTypes.CAR, -10, cars["taxi"])
    Obstacles.push(new Obstacle(lane, canvasHeight, canvasWidth, laneWidth, item));
}