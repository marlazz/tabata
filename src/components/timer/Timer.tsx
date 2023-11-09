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

  const handleComplete = (totalElapsedTime: number) => {
    // Calcule le temps total écoulé en ajoutant le temps de l'effort ou de la récupération actuel
    const nextElapsedTime =
      totalElapsedTime + (label === "Effort" ? effortTime : recoveryTime);

    // Appelle onCycleCompleted pour indiquer qu'un cycle est terminé
    onCycleCompleted && onCycleCompleted(nextElapsedTime);

    // Vérifie si le temps total est écoulé
    if (nextElapsedTime >= totalTime) {
      // Si oui, on arrête le timer et appelle onCompleted si fourni
      setIsPlaying(false);
      onCompleted && onCompleted();
      return { shouldRepeat: false };
    }

    // Si non, on continue avec l'autre phase (effort ou récupération)
    setLabel((currentLabel) =>
      currentLabel === "Effort" ? "Recovery" : "Effort"
    );

    // Forcer le remontage du timer avec une nouvelle clé
    // setKey(Math.random());

    // Indique que le timer doit se répéter pour le prochain cycle
    return { shouldRepeat: true, delay: 0 }; // pas de délai supplémentaire avant de recommencer
  };

  useEffect(() => {
    if (label === "Effort") {
      setDuration(effortTime);
    } else {
      setDuration(recoveryTime);
    }
    // Remontage du timer avec une nouvelle clé pour réinitialiser le timer
    setKey(Math.random());
  }, [label]);

  useEffect(() => {
    if (totalTime <= 0) {
      setIsPlaying(false);
      onCompleted && onCompleted();
    }
  }, [totalTime, onCompleted]);

const effortOrangeStartTime = effortTime - (effortTime * 0.25); // Dernier quart
const effortRedStartTime = effortOrangeStartTime - (effortOrangeStartTime * (1/3)); // Dernier tiers du dernier quart

// Pour la récupération
const recoveryYellowStartTime = recoveryTime - (recoveryTime * 0.25); // Dernier quart
const recoveryOrangeStartTime = recoveryYellowStartTime - (recoveryYellowStartTime * (1/3)); // Dernier tiers du dernier quart

const effortColors: [ `#${string}`, `#${string}`, `#${string}` ] = ["#FFEA00", "#FF8C00", "#FF0000"];
const recoveryColors: [ `#${string}`, `#${string}`, `#${string}` ] = ["#FFC0CB", "#FFEA00", "#FF8C00"];

const effortColorsTime: [number, number, number] = [
  effortRedStartTime,
  effortOrangeStartTime,
  effortTime
];

const recoveryColorsTime: [number, number, number] = [
  recoveryOrangeStartTime,
  recoveryYellowStartTime,
  recoveryTime
];

const colors = label === "Effort" ? effortColors : recoveryColors;

return (
    <div className="timer-section">
      <h2 className="timer-section__status">{label}</h2>

      <CountdownCircleTimer
        key={key}
        duration={duration}
        trailColor="#000"
        colors={colors}
        colorsTime={label === "Effort" ? effortColorsTime : recoveryColorsTime}        
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
