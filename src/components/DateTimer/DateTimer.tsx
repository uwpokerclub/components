import React, { ReactElement, useEffect, useState } from "react";

type Props = {
  mins: number;
};

function DateTimer({ mins }: Props): ReactElement {
  const [paused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Temporary state to test timer over functionality
  const [timerOver, setTimerOver] = useState(false);

  let now = new Date();
  const [countdownDate, setCountdownDate] = useState(
    new Date(now).setMinutes(now.getMinutes() + mins)
  );
  const [countdown, setCountdown] = useState(
    countdownDate - new Date().getTime()
  );

  const toggleTimer = () => {
    // If starting the timer, add time remaining to date
    if (paused) {
      now = new Date();

      setCountdownDate(
        new Date(now).setMinutes(
          now.getMinutes() + minutes,
          now.getSeconds() + seconds
        )
      );
    }

    setPaused((p) => !p);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !timerOver) {
        setCountdown(countdownDate - new Date().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, paused, timerOver]);

  useEffect(() => {
    if (countdown <= 0) {
      setTimerOver(true);
    } else {
      setMinutes(Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((countdown % (1000 * 60)) / 1000));
    }
  }, [countdown]);

  return (
    <div>
      <h1>
        {timerOver
          ? "Timer Finished!"
          : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </h1>

      <label>Set timer</label>
      <input
        type="number"
        name="time"
        id="time"
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <button onClick={toggleTimer}>
        {paused ? "Start timer" : "Pause timer"}
      </button>
    </div>
  );
}

export default DateTimer;
