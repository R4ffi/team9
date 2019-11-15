import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="App">
      <div className="gameDiv">
        <div id="game"></div>
      </div>
      <div className="camDiv">
        <WebcamCapture />
      </div>
    </div >
  );
}

export default App;
