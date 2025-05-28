import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "../styles/index.css";

import SecondsCounter from "./components/SecondsCounter.jsx";

function App() {
  const [seconds, setSeconds] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [countdownFrom, setCountdownFrom] = useState(0);
  const [alertTime, setAlertTime] = useState(10); 
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          let next;

          if (countdownFrom > 0) {
            // countdown mode
            next = prev - 1;
            if (next < 0) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              return 0;
            }
          } else {
            // count up mode
            next = prev + 1;
          }

          if (next === alertTime) {
            alert(`Time reached: ${alertTime} seconds`);
          }

          return next;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, countdownFrom, alertTime]);

  // Handlers
  const handleStart = () => {
    if (countdownFrom > 0) {
      setSeconds(countdownFrom);
    } else {
      setSeconds(0);
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    if (seconds > 0 || countdownFrom === 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(countdownFrom > 0 ? countdownFrom : 0);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Seconds Counter</h1>

      <div>
        <label>
          Countdown from (seconds):{" "}
          <input
            type="number"
            value={countdownFrom}
            onChange={(e) => setCountdownFrom(Number(e.target.value))}
            min="0"
          />
        </label>
      </div>

      <div>
        <label>
          Alert at (seconds):{" "}
          <input
            type="number"
            value={alertTime}
            onChange={(e) => setAlertTime(Number(e.target.value))}
            min="0"
          />
        </label>
      </div>

      <SecondsCounter seconds={seconds} />

      <div className="mt-4">
        <button className="btn btn-success mx-1" onClick={handleStart}>
          Start
        </button>
        <button className="btn btn-danger mx-1" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-primary mx-1" onClick={handleResume}>
          Resume
        </button>
        <button className="btn btn-warning mx-1" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);