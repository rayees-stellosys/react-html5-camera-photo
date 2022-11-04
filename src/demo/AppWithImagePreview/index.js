import React, { useState } from 'react';
import { Camera } from '../../lib';
import ImagePreview from './ImagePreview';
import '../reset.css';

function App (props) {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone (dataUri) {


    if ("geolocation" in navigator) {
      alert("Yes");
    } else {
      alert("No");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      alert(position.coords.latitude);
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    });

    alert(100);
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
}

export default App;
