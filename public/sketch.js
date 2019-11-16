var car;
let carImage;
let street;
let canvasWidth;
let laneWidth = 60;
let canvasHeight;
let maxFuel = 50;
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
let gameHistory;
let isDone = false;

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
    ybMeisterfeier = loadImage("assets/yb_meisterfeier.png")
    obstacleImages = loadObstacles();
    console.log(obstacleImages)
    this.itemCount = 0;
    soundFormats('mp3', 'ogg');
    sadSoundEffect = loadSound('assets/soundEffects/Punch.mp3');
    happySoundEffect = loadSound('assets/soundEffects/SuccessSoundEffect.mp3');
    sadTrombone = loadSound('assets/soundEffects/SadTrombone.mp3');
    finishingSound = loadSound('assets/soundEffects/finishingSound.mp3');
    gameHistory = new Array();
}

function setup() {
    canvasHeight = displayHeight * 0.5;
    canvasWidth = displayWidth * 0.8;
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

    sadSoundEffect.setVolume(0.1);
    happySoundEffect.setVolume(0.1);
    sadTrombone.setVolume(0.5);
    finishingSound.setVolume(0.5);
    var options = {
        preventDefault: true
    };
    var hammer = new Hammer(document.body, options);
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on("swipe", swiped);
}

function draw() {
    if (isDone) {
        return
    }
    clear();
    if (fuel.currentFuel <= 0) {
        sadTrombone.play()
        push();
        fuel.display();
        pop();
        push();
        textSize(50);
        textAlign(CENTER, CENTER);
        text("FAILED", canvasWidth / 2, canvasHeight / 2);
        sendDataToReactApp(gameHistory);
        pop();
        isDone = true
        return;
    } else if (distance.kilometersToGo <= 0) {
        finishingSound.play();
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Juhuu, you are in bern!", canvasWidth / 2, canvasHeight / 2);
        isDone = true
        imageMode(CENTER);
        rectMode(CENTER);
        image(this.ybMeisterfeier, canvasWidth / 2, canvasHeight / 2, canvasHeight * 1.4731, canvasHeight);
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
    text("Verbrauch: " + consumption, canvasWidth - canvasWidth / 5, 20)

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


function left() {
    if (car.lane > 1) {
        car.moveLeft();
        particleAnimator.move();
    }
}

function right() {
    if (car.lane < street.lanes) {
        car.moveRight();
        particleAnimator.move();
    }
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        right();
    }
    if (keyCode === LEFT_ARROW) {
        left();
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
            $.each(data, function(i, item) {
                obstacles[index].push({
                    "png": loadImage(item.png),
                    "consumption": item.consumption,
                    "path": item.png
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
        if (current.consumption > Obstacles[i].item.consumption) {
            background(255, 0, 0, 100);
            sadSoundEffect.play();
        } else if (inventory.getCurrentItem(Obstacles[i].item.type).consumption < Obstacles[i].item.consumption) {
            background(0, 255, 0, 100);
            happySoundEffect.play();
        } else {
            background(0, 0, 255, 100);
        }
        gameHistory.push({
            "timestamp": Date.now(),
            "imagePath": Obstacles[i].item.imagePath
        })
        inventory.addItem(Obstacles[i].item)
        consumption = inventory.getConsumption();
        getNewObstacle();
    }
}

function placeObstacle(lane) {
    let randomIndex = (Math.round(Math.random() * (obstacleImages[Categories[itemCount].name].length - 1)));
    this.lastIndex = randomIndex;
    let item = new Item(Categories[itemCount].type, obstacleImages[Categories[itemCount].name][randomIndex].consumption, obstacleImages[Categories[itemCount].name][randomIndex].png, obstacleImages[Categories[itemCount].name][randomIndex].path);
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
    let worst = obstacleArray.find(function(o) { return o.consumption == res; })
    return new Item(categorie.type, worst.consumption, worst.png);
}

function swiped(event) {
    console.log(event);
    if (event.direction == 4) {
        right();
    } else if (event.direction == 2) {
        left();
    }
}

function sendDataToReactApp(value) {
    var element = document.getElementById('transfer-input');
    element.value = JSON.stringify(value);
    element.click();
}