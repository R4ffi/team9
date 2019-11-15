import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="App">
      <div class="header">
        <h1>ewb - energy with b...</h1>
        <p>This is a game.</p>
      </div>
      <div className="gameDiv">
        <div id="game"></div>
      </div>
      <div className="camDiv">
        <WebcamCapture />
      </div>
      <div class="footer">
        <h2>Footer</h2>
      </div>
    </div >
  );
}

export default App;
