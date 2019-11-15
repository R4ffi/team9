let car;
let carImage;
let street;
let canvasWidth = 800;
let laneWidth = 60;
let canvasHeight = 400;
let maxFuel = 100
let fuel;
let inventory;

function preload(){
	carImage = loadImage("./Audi.png");
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);
  car = new Car(canvasWidth, canvasHeight, laneWidth, carImage);
  street = new Street(canvasWidth, canvasHeight, laneWidth)
  fuel = new Fuel(canvasWidth, canvasHeight, maxFuel)
  inventory = new Inventory(canvasWidth, canvasHeight, 20, 60)
}

function draw() {
  imageMode(CENTER);
  clear();
  car.drive();	
	push();
	fill(217);
  pop();
  fuel.display();
  street.display();
  inventory.display();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && car.lane > 1) {
    car.moveLeft();
  } 

  if (keyCode === RIGHT_ARROW && car.lane < street.lanes) {
    car.moveRight();
  }
}
