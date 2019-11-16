import React from "react";
import Webcam from "react-webcam";
import { useInterval } from './hooks/useInterval';

const subscriptionKey = "f710ec83007c46a0a1ffc4f7d1b5ca36";
const uriBase = "https://ewb-face.cognitiveservices.azure.com/face/v1.0/detect?returnFaceAttributes=emotion";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = ({ onAddEmotion }) => {
  const [emotion, setEmotion] = React.useState('');

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const webcamCanvas = webcamRef.current.getCanvas();
      if (!webcamCanvas) {
        return;
      }

      new Promise(resolve => {
        webcamCanvas.toBlob(resolve, "image/jpeg", 0.5);
      }).then(image => {

        const data = new FormData();
        data.append("image", image);

        const request = {
          method: "POST",
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/octet-stream'
          },
          body: image
        }

        fetch(uriBase, request)
          .then(response => {
            response.json().then(json => {
              if (json.length > 0) {
                const face = json[0];
                const latestEmotions = face.faceAttributes.emotion;

                let maxValue = 0;
                let emo = '';
                Object.keys(latestEmotions).map(key => {
                  if (latestEmotions[key] > maxValue) {
                    maxValue = latestEmotions[key];
                    emo = key;
                  }
                })
                setEmotion(emo);
                onAddEmotion({ emotion: emo, timestamp: Date.now() })
              }
            })
          })
      });

    }, [webcamRef]
  );

  useInterval(capture, 2000);

  return (<React.Fragment >
    <div style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ width: '300px', float: 'left', textAlign: 'right' }}>  <Webcam audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height={145}
          videoConstraints={videoConstraints}
        /> </div>
        <div style={{ textAlign: 'left' }} >
          {emotion !== '' && <React.Fragment><div>{emotion}</div> <img src={`assets/emotions/${emotion}.png`} alt={emotion} /></React.Fragment>}
        </div>
      </div>
    </div>



  </React.Fragment >
  );
};

export default WebcamCapture;
