import React from 'react';
import './App.css';
import WebcamCapture from "./WebcamCapture";
import { History } from './History';
import { PreviousMap } from 'postcss';

function App() {
  const [isGameVisible, setGameVisible] = React.useState(true);
  const [history, setHistory] = React.useState([]);
  const [emotions, setNewEmotion] = React.useState([]);

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

  const handleNewEmotion = (newEmotion) => {
    setNewEmotion(prev => [...prev, newEmotion]);
  }

  const divProps = isGameVisible ? {} : { style: { visibility: 'hidden' } };

  return (
    <div className="App">
      <div className="header">
        <h1>ewb - Grand Theft Energy</h1>
        {/* <p>This is a game.</p> */}
      </div>
      <div className="navbar">
        <a href="javascript:window.location.reload(true)" className="active">Home</a>
        <a href="javascript:window.location.reload(true)">Retry</a>
        <a href="https://github.com/R4ffi/team9" target="_blank" className="right">gitRepo</a>
      </div>
      <div className="row">
        <div className="gameDiv">
          {isGameVisible && <div id="game"></div>}
          {!isGameVisible && <History history={history} emotions={emotions} />}
        </div>
        <div className="camDiv" {...divProps} >
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
