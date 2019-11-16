import React from 'react';

export const History = ({ history, emotions }) => {




  return (
    <React.Fragment>
      {
        history.map((item, index) => <div key={index}>{item.timestamp}</div>)
      }
    </React.Fragment >
  );
}
