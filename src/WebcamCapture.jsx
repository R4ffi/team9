import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]
  );

  return (<React.Fragment >
    <Webcam audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={200}
      videoConstraints={videoConstraints}
    />
  </React.Fragment >
  );
};

export default WebcamCapture;
