import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Exercise from "../create-session/CreateSession.tsx";
import "./SessionPage.scss";
import ExerciseCard from "../../components/exercises/exercise-card/ExerciseCard.tsx";

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

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isEffortPhase, setIsEffortPhase] = useState(true);
  const [key, setKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerState?.totalTime || 0);

  const { exercises, effortTime, recoveryTime } = timerState;

  useEffect(() => {
    if (!timerState) {
      navigate("/create-session");
    }
  }, [navigate, timerState]);

  useEffect(() => {
    // Ce useEffect contrôle le décompte du temps total
    if (timeLeft <= 0) {
      return;
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const handleComplete = () => {
    // Passer à l'exercice suivant uniquement à la fin de la phase de récupération
    if (!isEffortPhase) {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      } else if (currentExerciseIndex === exercises.length - 1) {
        // Si c'est le dernier exercice, finir la session
        return { shouldRepeat: false };
      }
    }

    setIsEffortPhase(!isEffortPhase);
    setKey((prevKey) => prevKey + 1);

    return { shouldRepeat: true };
  };

  const getTimerDuration = () => {
    return isEffortPhase ? effortTime : recoveryTime;
  };

  if (!timerState) {
    return <div>Redirecting to session creation...</div>;
  }

  const restartSession = () => {
    setCurrentExerciseIndex(0);
    setIsEffortPhase(true);
    setKey((prevKey) => prevKey + 1);
    setTimeLeft(timerState?.totalTime || 0);
  };

  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  return (
    <div className="session-timer">
      <div className="session-timer__total-countdown">{timeLeft} seconds</div>
      {isLastExercise && !isEffortPhase ? (
        <>
          <div className="timer__encouragement">Bravo! Fin de la série.</div>
          <div className="session-end-buttons">
            <button onClick={() => navigate("/")}>Quitter</button>
            <button onClick={restartSession}>Nouvelle répétition</button>
            <button onClick={() => {}}>Rapport</button>
          </div>
        </>
      ) : (
          <>
            <CountdownCircleTimer
              key={key}
              isPlaying
              duration={getTimerDuration()}
              colors={"#004777"}
              onComplete={handleComplete}
            >
              {({ remainingTime }) => (
                <div className="timer">
                  <div className="timer__time">{remainingTime}</div>
                </div>
              )}
            </CountdownCircleTimer>

            {isEffortPhase ? (
              <>
                <span>Exercice en cours:</span>
                <ExerciseCard
                  exercise={exercises[currentExerciseIndex]}
                  isSelected={undefined}
                  onToggleSelect={undefined}
                />
                <p className="timer__encouragement">Go!</p>
              </>
            ) : (
              <>
                <span>Prochain exercice:</span>
                <ExerciseCard
                  exercise={exercises[currentExerciseIndex + 1]}
                  isSelected={undefined}
                  onToggleSelect={undefined}
                />
                <p className="timer__encouragement">Récupération</p>
              </>
            )}
          </>
      )}
    </div>
  );
};

export default SessionSettings;
