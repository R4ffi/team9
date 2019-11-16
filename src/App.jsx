import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";
import { History } from './History';

function App() {
  const [isGameVisible, setGameVisible] = React.useState(true);
  const [history, setHistory] = React.useState([]);

  const onChange = () => {
  }

  const onClick = () => {
    const value = document.getElementById('transfer-input').value;
    var obj = JSON.parse(value);

    if (obj.length != history.length) {
      setHistory(obj);
      setGameVisible(false);
    }
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
          {isGameVisible && <div id="game"></div>}
          {!isGameVisible && <History history={history} />}
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
