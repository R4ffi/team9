import React from 'react';
import Sketch from 'react-p5';

function Game() {
  let x = 50
  const y = 50

  const setup = (p5, parent) => {
    p5.createCanvas(500, 500).parent(parent)
  }

  const draw = p5 => {
    p5.background(0)
    p5.ellipse(x, y, 70, 70)
    x++
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Game;
