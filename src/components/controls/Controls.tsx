import React from 'react';

interface ControlsProps {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onPause, onStop }) => {
  return (
    <div className="controls">
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );
};

export default Controls;
