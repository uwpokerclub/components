import React, { ReactElement, useEffect, useState } from "react";

function ManualTimer(): ReactElement {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        console.log(minutes, seconds)
        // If seconds have reached 0, decrement minute and reset second to 59
        if (seconds === 0) {
          setMinutes((min) => min - 1);
          setSeconds(59)
        } else {
          setSeconds((sec) => sec - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [minutes, seconds, paused])

  const startTimer = () => {
    setPaused(!paused);
  }
  

  return (
    <div>
      <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>

      <label>Set timer</label>
      <input
        type="number"
        name="time"
        id="time"
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <button onClick={startTimer}>{ paused ? "Start timer" : "Pause timer" }</button>

    </div>
  );
}

export default ManualTimer;
