import clickSound from './data/click-sound.base64.json';

export function getShowHideStyle (isDisplay) {
  const displayStyle = isDisplay
    ? { display: 'inline-block' }
    : { display: 'none' };

  return displayStyle;
}

export function _getMirrorCameraStyle (isImageMirror) {
  const mirrorDisplayStyle = isImageMirror
    ? { transform: 'rotateY(180deg)' }
    : { transform: 'none' };

  return mirrorDisplayStyle;
}

export function getVideoStyles (isDisplay, isImageMirror) {
  return {
    ..._getMirrorCameraStyle(isImageMirror),
    ...getShowHideStyle(isDisplay)
  };
}

export function playClickAudio () {
  let audio = new Audio('data:audio/mp3;base64,' + clickSound.base64);
  audio.play();
}

export function printCameraInfo (info) {
  // console.info('react-html5-camera-photo info:', info);
}
