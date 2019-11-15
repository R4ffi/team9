import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";

function App() {
  const [isGameVisible, setGameVisible] = React.useState(true);

  const onChange = () => {
  }

  const onClick = () => {
    const value = document.getElementById('transfer-input').value;
  }

  return (
    <div className="App">
      <div className="header">
        <h1>ewb - energy with b...</h1>
        <p>This is a game.</p>
      </div>
      <div className="navbar">
        <a href="#" className="active">Home</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#" className="right">Link</a>
      </div>
      <div className="row">
        <div className="gameDiv">
<<<<<<< HEAD
          <div id="game"></div>
          <center>
            <button id="left">LEFT--</button>
            <button id="right">--></button>
        </center>
=======
          {isGameVisible && <div id="game"></div>}
>>>>>>> ecb474c751a9fde48888795c15161676d8d7fd63
        </div>
        
        <div className="camDiv">
          <WebcamCapture />
          <input id="transfer-input" type="hidden" name="action" value="" onChange={onChange} onClick={onClick} />
        </div>
      </div>
      <div className="footer">
        <h2></h2>
      </div>
    </div >
  );
}

export default App;
