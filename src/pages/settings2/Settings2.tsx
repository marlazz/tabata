import React, { useState } from "react";
import "./Settings.scss";
import Timer from "../../components/timer/Timer";
const BG = require("../../assets/images/bg-mobile.png").default;

const Settings2: React.FC = () => {
  const [effortTime, setEffortTime] = useState<number>(10);
  const [recoveryTime, setRecoveryTime] = useState<number>(5);
  const [totalTime, setTotalTime] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTotalTime, setRemainingTotalTime] =
    useState<number>(totalTime);

  const handleStartTimer = () => {
    setIsRunning(true);
    setRemainingTotalTime(totalTime);
  };

  const handleCycleCompleted = (elapsedTime: number) => {
    setRemainingTotalTime((prevTime) => prevTime - elapsedTime);
  };

  return (
    <div className="settings" style={{ backgroundImage: `url(${BG})` }}>
      {!isRunning && (
        <>
          <h1 className="settings__title">Timer settings</h1>
          <form className="settings__form">
            <div className="settings__form-line">
              <label>
                Effort (sec):
                <input
                  type="number"
                  value={effortTime}
                  onChange={(e) => setEffortTime(Number(e.target.value))}
                />
              </label>
              <label>
                Recovery (sec):
                <input
                  type="number"
                  value={recoveryTime}
                  onChange={(e) => setRecoveryTime(Number(e.target.value))}
                />
              </label>
            </div>
            <label>
              Total duration (sec):
              <input
                type="number"
                value={totalTime}
                onChange={(e) => setTotalTime(Number(e.target.value))}
              />
            </label>
          </form>
        </>
      )}

      {isRunning ? (
        <Timer
          effortTime={effortTime}
          recoveryTime={recoveryTime}
          totalTime={remainingTotalTime}
          onCycleCompleted={handleCycleCompleted}
          onCompleted={() => setIsRunning(false)}
        />
      ) : (
        <button onClick={handleStartTimer} className="go-button">
          Go !
        </button>
      )}
    </div>
  );
};

export default Settings2;
