import { useEffect, useRef } from 'react';

const useAudio = (url) => {
  const audioContext = useRef(null);
  const buffer = useRef(null);
  const gainNode = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.current.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        buffer.current = audioBuffer;
      });

    gainNode.current = audioContext.current.createGain();
  }, [url]);

  const playSound = (volume = 1) => {
    if (buffer.current) {
      const source = audioContext.current.createBufferSource();
      source.buffer = buffer.current;
      source.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = volume;
      source.start(0);
    }
  };

  return playSound;
};

export default useAudio;
