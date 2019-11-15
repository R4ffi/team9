function setup() {
    var cnv = createCanvas(1000, 1000);
    cnv.parent('game');
    cnv.style('display', 'block');
    background(255, 0, 200);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }

    ellipse(mouseX, mouseY, 80, 80);
}