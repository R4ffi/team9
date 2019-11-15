import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";
import Game from './game/Game';

function App() {
  return (
    <div className="App">
      <Game />
      <WebcamCapture />
    </div >
  );
}

export default App;
