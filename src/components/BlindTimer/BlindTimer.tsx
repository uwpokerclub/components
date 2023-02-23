import React, { ReactElement, useEffect, useState } from "react";
import Icon from "../Icon/Icon";

type Props = {
  levels: number[];
};

function BlindTimer({ levels }: Props): ReactElement {
  const [paused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currLevel, setCurrLevel] = useState(0);

  // Temporary state to test timer over functionality
  const [timerOver, setTimerOver] = useState(false);

  let now = new Date();
  const [countdownDate, setCountdownDate] = useState(
    new Date(now).setMinutes(now.getMinutes() + levels[0])
  );
  const [countdown, setCountdown] = useState(
    countdownDate - new Date().getTime()
  );

  // toggleTimer toggles the state of the timer from paused to unpaused and
  // vice versa. If the timer is being started, it will update the
  // countdownDate state with the time remaining on the countdown.
  const toggleTimer = () => {
    // If starting the timer, update countdownDate with the time remaining
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

  // Create an interval for every 1 second that will calculate the time
  // remaining in the countdown. If the timer is paused or over do nothing.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !timerOver) {
        setCountdown(countdownDate - new Date().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, paused, timerOver]);

  // Update the minutes and seconds everytime the countdown timer
  // updates. If the timer has completed it will stop updating.
  useEffect(() => {
    // If this timer has finished, advance to the next level
    if (countdown <= 0) {
      // Advance current level index
      setCurrLevel((i) => i + 1);
    } else {
      setMinutes(Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((countdown % (1000 * 60)) / 1000));
    }
  }, [countdown]);

  // Updates the timer based on the current blind level. If there are no
  // more levels set the timer to finished.
  useEffect(() => {
    // No more levels left.
    if (currLevel === levels.length) {
      setTimerOver(true);
    } else {
      // Reset timer to new level time
      now = new Date();
      setCountdownDate(
        new Date(now).setMinutes(now.getMinutes() + levels[currLevel])
      );
    }
  }, [currLevel, levels]);

  return (
    <div>
      <h1>
        {timerOver
          ? "Timer Finished!"
          : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </h1>

      <h3>Current Level: {currLevel + 1}</h3>

      <div onClick={toggleTimer}>
        {paused ? (
          <Icon iconType="circle-play" scale={4} />
        ) : (
          <Icon iconType="circle-pause" scale={4} />
        )}
      </div>
    </div>
  );
}

export default BlindTimer;
