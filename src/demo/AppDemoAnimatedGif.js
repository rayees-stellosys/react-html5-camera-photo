import React from 'react';
import Camera, { FACING_MODES } from '../lib';
import './reset.css';
import axios from 'axios';

function App (props) {
  function handleTakePhoto (dataUri) {
    navigator.geolocation.getCurrentPosition(function (position) {
      savePhotoDetails(position.coords, dataUri);
    });
  };
  function savePhotoDetails (coords, dataUri) {
    let inputData = {
      'Latitude': coords.latitude,
      'Longitude': coords.longitude,
      'ImageUri': dataUri
    };

    let apiURL = `https://hk0euugzdg.execute-api.ap-southeast-1.amazonaws.com/production/takePhoto/createPhoto`;
    return new Promise((resolve, reject) => {
      axios.post(apiURL, inputData).then((response) => {
        console.log('response', response);
        resolve(response);
      }).catch((err) => {
        console.log('err', err);
        reject(err);
      });
    });
  };

  return (
    <div>
      {
        // <div style={{ backgroundColor: 'white' }}>v3</div>
      }
      <Camera
        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
    </div>
  );
}

export default App;
