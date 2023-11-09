import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Exercise } from "../create-session/CreateSession";
import "./SessionPage.scss";

interface TimerState {
  exercises: Exercise[];
  effortTime: number;
  recoveryTime: number;
  totalTime: number;
}

const SessionSettings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerState = location.state as TimerState;

  // Initialiser les états en dehors des conditions
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isEffortPhase, setIsEffortPhase] = useState(true);
  const [key, setKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerState?.totalTime || 0);

  useEffect(() => {
    if (!timerState) {
      // Si aucun état n'est passé, redirigez l'utilisateur vers l'écran de sélection
      navigate('/create-session');
    }
  }, [navigate, timerState]);

  useEffect(() => {
    // Ce useEffect contrôle le décompte du temps total
    if (timeLeft <= 0) {
      navigate('/');
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, navigate]);

  const handleComplete = () => {
    if (isEffortPhase && currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setIsEffortPhase(!isEffortPhase);
    setKey((prevKey) => prevKey + 1);

    return { shouldRepeat: true, delay: 1 };
  };

  const getCurrentLabel = () => {
    return isEffortPhase
      ? exercises[currentExerciseIndex].name
      : `Next: ${exercises[currentExerciseIndex + 1]?.name || "End"}`;
  };

  const getTimerDuration = () => {
    return isEffortPhase ? effortTime : recoveryTime;
  };

  if (!timerState) {
    return <div>Redirecting to session creation...</div>;
  }

  // Déstructurez ici après avoir géré le cas de redirection
  const { exercises, effortTime, recoveryTime } = timerState;

  return (
    <div className="session-timer">
      <div className="session-timer__total-countdown">
        Total time left: {timeLeft} seconds
      </div>
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={getTimerDuration()}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        onComplete={handleComplete}
      >
        {({ remainingTime }) => (
          <div className="timer">
            <div className="timer__label">{getCurrentLabel()}</div>
            <div className="timer__time">{remainingTime}</div>
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default SessionSettings;
