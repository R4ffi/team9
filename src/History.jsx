import React from 'react';
import _ from 'lodash';

export const History = ({ history, emotions }) => {
  let items = [];

  for (let item of history) {
    var nextEmotion = _.find(emotions, (e => parseInt(e.timestamp) > parseInt(item.timestamp)));
    if (nextEmotion) {
      items = [...items, { timestamp: item.timestamp, imagePath: item.imagePath, emotion: nextEmotion.emotion }];
    }
  }

  return (
    <div style={{ textAlign: "center", display: "inline-block" }}>
      <h3>Wir haben diene Stimmung während er Fahrt aufgezeichnet.</h3>
      <h4>Erfahre welche Entscheidungen dich glücklich gemacht haben.</h4>
      <div style={{ textAlign: "center", display: "inline-block" }}>
        <table>
          <tbody>
            {
              items.map((item, index) =>
                <tr key={index}>
                  <td >
                    <img style={{ height: '80px' }} src={item.imagePath} alt={item.imagePath} />
                  </td>
                  <td style={{ width: '100px' }} >
                    <h1>=</h1>
                  </td>
                  <td >
                    <img style={{ height: '80px' }} src={`assets/emotions/${item.emotion}.png`} alt={item.emotion} />
                  </td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}
