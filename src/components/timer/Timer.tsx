import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.scss";

const Timer: React.FC<{
  effortTime: number;
  recoveryTime: number;
  totalTime: number;
  onCompleted?: () => void;
  onCycleCompleted?: (elapsedTime: number) => void;
}> = ({
  effortTime,
  recoveryTime,
  totalTime,
  onCompleted,
  onCycleCompleted,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(Math.random());
  const [duration, setDuration] = useState(effortTime);
  const [label, setLabel] = useState("Effort");

  useEffect(() => {
    setDuration(effortTime);
    if (totalTime <= 0) {
      setIsPlaying(false);
      onCompleted && onCompleted();
    }
  }, [totalTime]);

  const handleComplete = (totalElapsedTime: number) => {
    const elapsed = label === "Effort" ? effortTime : recoveryTime;
    onCycleCompleted && onCycleCompleted(elapsed);
    if (label === "Effort") {
      setLabel("Recovery");
      setDuration(recoveryTime);
    } else {
      setLabel("Effort");
      setDuration(effortTime);
    }
    // Forcer le rémontage du timer avec une nouvelle clé
    setKey(Math.random());
    return { shouldRepeat: totalTime - totalElapsedTime > 0 };
  };

  const orangeStartTime = duration - (0.50 * duration); // 75% de la durée totale écoulée
  const redStartTime = duration - (0.25 * duration + 0.0833 * duration); // 75% + 8.33% de la durée totale écoulée
  
  return (
    <div className="timer-section">
      <h2 className="timer-section__status">{label}</h2>

      <CountdownCircleTimer
        key={key}
        duration={duration}
        colors={["#E0FF01", "#FFA500", "#FF0000"]} // Ajoutez une troisième couleur pour éviter une possible erreur d'index
        colorsTime={[ redStartTime, orangeStartTime, duration]}
        isPlaying={isPlaying}
        onComplete={handleComplete}
      >
        {({ remainingTime }) => (
          <span className="timer__inner">
            <span className="timer__inner--count">{remainingTime}</span> seconds
          </span>
        )}
      </CountdownCircleTimer>

      <div className="timer-section__controls">
        <button
          className="timer-section__controls--button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="timer-section__controls--button"
          onClick={() => setIsPlaying(false)}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
