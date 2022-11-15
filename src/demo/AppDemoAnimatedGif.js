// import React from 'react';
import React, { useState,  } from "react";
import Camera, { FACING_MODES } from '../lib';
import { createWorker } from 'tesseract.js';
import './reset.css';
function App (props) {
  const [isLoading, setIsLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const handleTakePhoto = async (dataUri) => {
    setIsLoading(true);
    const worker = createWorker({
      logger: (m) => {
        // console.log(m)
        if (m.status === "recognizing text") {
          setProgressBar(m.progress);
          setPercentage(parseInt(m.progress * 100));
        }
      },
    });
    
    if ('geolocation' in navigator) {
      alert('Yes');
    } else {
      alert('No');
    }
    alert(dataUri);
    navigator.geolocation.getCurrentPosition(function (position) {
      alert(position.coords.latitude);
    });
    let imageBuffer = Buffer.from(dataUri, 'base64');
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageBuffer);
      alert(text);
      await worker.terminate();
    })();
    setIsLoading(false);
  };

  return (
    <div>
      {
        // <div style={{ backgroundColor: 'white' }}>v3</div>
      }
      {isLoading && (
        <div>
          <p className="text-center mt-5">
            Converting :- <progress value={progressBar} max={1} />{" "}
            {percentage}%
          </p>
          </div>
      )}
      <Camera
        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
    </div>
  );
}

export default App;
