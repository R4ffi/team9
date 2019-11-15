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
      <div class="navbar">
        <a href="#" class="active">Home</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#" class="right">Link</a>
      </div>
      <div class="row"> 
        <div className="gameDiv">
          <div id="game"></div>
          <center>
            <button id="left">LEFT--</button>
            <button id="right">--></button>
        </center>
        </div>
        
        <div className="camDiv">
          <WebcamCapture />
        </div>
      </div>
      <div class="footer">
        <h2></h2>
      </div>
    </div >
  );
}

export default App;
