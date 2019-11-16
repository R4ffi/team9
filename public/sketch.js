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
let isDone = true;
let isPreStart = true;
let button;
let isBetter = true;

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

    
    let diff = canvasWidth / laneWidth / 3;
    console.log(diff);
    let rightSideOfStreet = canvasWidth / 2 + diff * laneWidth;
    placeObstacle(1);
    car = new Car(canvasWidth, canvasHeight, laneWidth, cars["truck"]);
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
    button = createButton("Start");
    button.style('background-color', '#E8800F');
    button.style('border', 'none');
    button.style('color', 'white');
    button.style('padding', '15px 32px');
    button.style('text-align', 'center');
    button.style('text-decoration', 'none');
    button.style('display', 'inline-block');
    button.style('font-size', '16px');
    button.position(displayWidth/2-80, displayHeight/2);
    button.mousePressed(start); 
   
}

function start(){
    isDone = false;
}
function draw() {
    if (isPreStart) {
        drawStartScreen();
        return
    }
    if(isDone){
        displayInventory();
        return
    }
    button.hide();
    clear();
    if (fuel.currentFuel <= 0) {
        sadTrombone.play()
        push();
        fuel.display();
        pop();
        push();
        textSize(50);
        textFont('consolas');
        textAlign(CENTER, CENTER);
        text("FAILED", canvasWidth / 2, canvasHeight / 2);
        sendDataToReactApp(gameHistory);
        pop();
        document.getElementById("overlay").outerHTML = ('<center><div onclick="OverlayOff()" id="overlay"><div id="text"><p>Ui, das het ned glängt! Kontaktier D\'EWB für hiuf!<br><a href="https://www.ewb.ch" target="_blank">Klick Hie!<a></p></div></div></center>');
        document.getElementById("overlay").style.display = "block";
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


function OverlayOff() {
    isPreStart = false;
    document.getElementById("overlay").style.display = "none";
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
function setNewCar(item){
    if(item.type == ItemTypes.CAR){
        if(item.imagePath.includes("tesla")){
            car.image = cars["audi"]
        }else if (item.imagePath.includes("porsche")){
            car.image = cars["viper"]
        }else if(item.imagePath.includes("Dodge")){
            car.image = cars["truck"]
        }else{
            car.image = item.image;
        }
    }

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
        setNewCar(Obstacles[i].item);
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

    let item = new Item(Categories[itemCount].type, obstacleImages[Categories[itemCount].name][randomIndex].consumption, obstacleImages[Categories[itemCount].name][randomIndex].png, obstacleImages[Categories[itemCount].name][randomIndex].path)
    if (inventory.getCurrentItem(item.type).image == item.image) {
        return getNewObstacle();
    }
    Obstacles.pop()
    let lane = Math.round(Math.random() * (4)) + 1;
    let newObstacle = new Obstacle(lane, canvasWidth, canvasHeight, laneWidth, item);
    isBetter = item.consumption > inventory.getCurrentItem(item.type).consumption
    console.log(isBetter);
    Obstacles.push(newObstacle);
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
    return new Item(categorie.type, worst.consumption, worst.png, worst.path);
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

function drawStartScreen(){
    createDiv('<center><div onclick="OverlayOff()" id="overlay"><div id="text"><p>Willkommen bei der EWB Challenge!</p><p>Reduziere dein Energieverbruch, bis es dir ins Stadion reicht!</p></div></div></center>');
    document.getElementById("overlay").style.display = "block";
}

function displayInventory(){
    push();
    textAlign(CENTER,CENTER);
    imageMode(CENTER);
    let itemsize = 100;
    let index = 0;
    let spacing = 10;
    textSize(25);
    textFont('consolas');
    text("Dein Startinventar:", canvasWidth/2, canvasHeight/3)
    pop();
    push();
    textAlign(CENTER,CENTER);
    imageMode(CENTER);
    textFont('consolas');
    Categories.forEach(element => {
        index++;
        let item = inventory.getCurrentItem(element.type);
        let currentX = (canvasWidth/2-(3*itemsize + 3*spacing)) + (index*itemsize);
        let pictureY = canvasHeight/3+ itemsize;
        let imageName = item.imagePath.split("/")[item.imagePath.split("/").length-1].split('.')[0];
        text(item.type.name+":", currentX, pictureY - itemsize/1.4);
        text(imageName, currentX, pictureY - itemsize/1.8);
        image(item.image, currentX, pictureY, itemsize-spacing, itemsize-spacing);
        if(item.consumption < 0){
            text("Verbraucht:"+item.consumption * -1, currentX, pictureY+itemsize/1.8)
        }else{
            text("Generiert:"+item.consumption, currentX, pictureY+itemsize/1.8)
        }
        
    });
    pop();
}