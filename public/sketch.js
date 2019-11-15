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
let obstacleImages;
let cars;
var speed = 10;
let consumption = 0;
let streetBackground;
let distance;
let framerate = 30;
let count = 0;
let maxDistance = 100;
let History;

let Categories = [{
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
];

function preload() {
    this.lastIndex = -1;
    cars = loadCars();
    Obstacles = new Array();
    particleTexture = loadImage("assets/particle_texture.png")
    streetBackground = loadImage("assets/street.png")
    obstacleImages = loadObstacles();
    console.log(obstacleImages)
    this.itemCount = 0;
    History = new Array();
}

function setup() {
    let rightSideOfStreet = canvasWidth / 2 + 5 * laneWidth;
    placeObstacle(1);
    car = new Car(canvasWidth, canvasHeight, laneWidth, cars["viper"]);
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('game');
    street = new Street(canvasWidth, canvasHeight, laneWidth, streetBackground);
    particleAnimator = new ParticleAnimator(particleTexture, car);
    fuel = new Fuel(canvasWidth, canvasHeight, maxFuel)
    inventory = new Inventory(canvasWidth, canvasHeight, 40, 60)
    setStartObstacle();
    distance = new Distance(canvasWidth, canvasHeight, rightSideOfStreet, canvasHeight - 100, canvasWidth - rightSideOfStreet, 100);
}

function draw() {
    clear();
    if (fuel.currentFuel <= 0) {
        push();
        fuel.display();
        pop();
        push();
        textSize(50);
        textAlign(CENTER, CENTER);
        text("FAILED", canvasWidth / 2, canvasHeight / 2);
        pop();
        return;
    } else if (distance.kilometersToGo <= 0) {
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Juhuu, you are in bern!", canvasWidth / 2, canvasHeight / 2);
        return;
    }
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
    textSize(20);
    textFont('consolas');
    text("Consumption: "+consumption, canvasWidth - canvasWidth / 5, 20)
 
    pop();
    distance.display();
    if (count / framerate > 5) {
        console.log("Consumption:" + consumption)
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
    $.getJSON("assets/cars/cars.json", function (json) {
        console.log(json.cars);
        $.each(json.cars, function (i, item) {
            cars[item.name] = loadImage(item.png);
        });

    });
    return cars;
}

function loadObstacles() {
    var obstacles = {};
    $.getJSON("assets/obstaclePNGs/Obstacles.json", function (json) {
        $.each(json, function (index, data) {
            obstacles[index] = new Array();
            $.each(data, function (i, item) {
                obstacles[index].push({
                    "png": loadImage(item.png),
                    "consumption": item.consumption
                });
            })
        });
    });
    return obstacles;
}

function displayObstacles() {
    let i = 0;
    Obstacles[i].display();
    Obstacles[i].pos.y += speed;
    if (Obstacles[i].pos.y >= canvasHeight) {
        this.itemCount++;
        if (itemCount == 5) {
            itemCount = 0;
        }
        Obstacles[i].pos.y = 0;
        getNewObstacle();
    }

    if (car.pos.y - Obstacles[i].pos.y < Obstacles[i].size && Obstacles[i].lane == car.lane) {
        this.itemCount++;
        if (itemCount == 5) {
            itemCount = 0;
        }
        speed += 0.2
        let current = inventory.getCurrentItem(Obstacles[i].item.type)
        if(current.consumption > Obstacles[i].item.consumption){
            background(255,0,0,100);
        }else if(current.consumption < Obstacles[i].item.consumption){
            background(0,255,0,100);
        }else{
            background(0,0,255,100);
        }
        History.push({
            "timestamp": Date.now(),
            "object": Obstacles[i].item
    })
        inventory.addItem(Obstacles[i].item)
        consumption = inventory.getConsumption();
        getNewObstacle();
    }
}

function placeObstacle(lane) {
    let randomIndex = (Math.round(Math.random() * (obstacleImages[Categories[itemCount].name].length - 1)));
    this.lastIndex = randomIndex;
    let item = new Item(Categories[itemCount].type, obstacleImages[Categories[itemCount].name][randomIndex].consumption, obstacleImages[Categories[itemCount].name][randomIndex].png);
    Obstacles.push(new Obstacle(lane, canvasWidth, canvasHeight, laneWidth, item));
}

function getNewObstacle() {
    let randomIndex = (Math.round(Math.random() * (obstacleImages[Categories[itemCount].name].length - 1)))

    let item = new Item(Categories[itemCount].type, obstacleImages[Categories[itemCount].name][randomIndex].consumption, obstacleImages[Categories[itemCount].name][randomIndex].png)
    if (inventory.getCurrentItem(item.type).image == item.image) {
        return getNewObstacle();
    }
    Obstacles.pop()
    let lane = Math.round(Math.random() * (4)) + 1;
    Obstacles.push(new Obstacle(lane, canvasWidth, canvasHeight, laneWidth, item));
}

function setStartObstacle() {
    Categories.forEach(element => {
        inventory.addItem(getWorstObstacle(obstacleImages[element.name], element));
    });
    consumption = inventory.getConsumption();
}

function getWorstObstacle(obstacleArray, categorie) {
    let res = Math.min.apply(Math, obstacleArray.map(function(o) { return o.consumption; }))
    let worst = obstacleArray.find(function(o){ return o.consumption == res; })
    return new Item(categorie.type, worst.consumption, worst.png);
}