import React from 'react';

export const History = ({ history }) => {




  return (
    <React.Fragment>
      {
        history.map((item, index) => <div key={index}>{item.timestamp}</div>)
      }
    </React.Fragment >
  );
}
