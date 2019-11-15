let car;
let carImage;
let street;
let canvasWidth = 800;
let laneWidth = 60;
let canvasHeight = 800;
let particleAnimator;

function preload() {
    this.cars = loadCars();
    particleTexture = loadImage("assets/particle_texture.png")
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    car = new Car(canvasWidth, canvasHeight, laneWidth, this.cars["audi"]);
    street = new Street(canvasWidth, canvasHeight, laneWidth);
    particleAnimator = new ParticleAnimator(particleTexture, car);
}

function draw() {
    imageMode(CENTER);
    clear();
    street.display();
    car.display();
    push();
    particleAnimator.display();
    pop();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && car.lane > 1) {
        car.moveLeft();
    }

    if (keyCode === RIGHT_ARROW && car.lane < street.lanes) {
        car.moveRight();
    }
}

function loadCars(){
    var cars = {};
    $.getJSON("assets/cars/cars.json", function(json) {
        console.log(json.cars);
        $.each(json.cars, function(i, item) {
            cars[item.name] = loadImage(item.png);
        });
        
    });
    return cars;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }