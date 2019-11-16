import React from 'react';
import _ from 'lodash';

export const History = ({ history, emotions }) => {
  let items = [];

  for (let item of history) {
    console.log(item);

    var nextEmotion = _.find(emotions, (e => parseInt(e.timestamp) > parseInt(item.timestamp)));
    if (nextEmotion) {
      items = [...items, { timestamp: item.timestamp, imagePath: item.imagePath, emotion: nextEmotion.emotion }];
      console.log("imagePath: " + item.imagePath);
    } else {
      console.log('no emotion found: ' + item.timestamp)
    }
  }

  return (
    <React.Fragment>
      <table>
        <tbody>
          <tr>
            {items.map((item, index) => <td key={index}>{item.imagePath}<img style={{ width: '120px' }} src={item.imagePath} alt={item.imagePath} /></td>)}
          </tr>
          <tr>
            {items.map((item, index) => <td key={index}><img src={`assets/emotions/${item.emotion}.png`} alt={item.emotion} /></td>)}
          </tr>
        </tbody>
      </table>
    </React.Fragment >
  );
}
