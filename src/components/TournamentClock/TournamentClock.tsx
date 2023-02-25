import React, { ReactElement, useEffect, useState } from "react";

import "./TournamentClock.css";
import { playSound } from "../../utils/playSound";
import Icon from "../Icon/Icon";

type BlindLevel = {
  small: number;
  big: number;
  ante: number;
  time: number;
};

type Props = {
  levels: BlindLevel[];
};

function TournamentClock({ levels }: Props): ReactElement {
  const [paused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currLevel, setCurrLevel] = useState(0);

  // Temporary state to test timer over functionality
  const [timerOver, setTimerOver] = useState(false);

  let now = new Date();
  const [countdownDate, setCountdownDate] = useState(
    new Date(now).setMinutes(now.getMinutes() + levels[0].time)
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
    const minutesRemaining = Math.floor(
      (countdown % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((countdown % (1000 * 60)) / 1000);

    // Play sound if in the last 5 seconds
    if (
      minutesRemaining === 0 &&
      secondsRemaining >= 1 &&
      secondsRemaining <= 5
    ) {
      const audioContext = new AudioContext();
      playSound(audioContext, 493.883, audioContext.currentTime, 0.15);
    } else if (minutesRemaining === 0 && secondsRemaining === 0) {
      // Advance current level index and play next level sound
      setCurrLevel((i) => i + 1);
      const audioContext = new AudioContext();
      playSound(audioContext, 659.255, audioContext.currentTime + 0.15, 0.25);
    }

    setMinutes(minutesRemaining);
    setSeconds(secondsRemaining);
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
        new Date(now).setMinutes(now.getMinutes() + levels[currLevel].time)
      );
    }
  }, [currLevel, levels]);
  return (
    <div className="grid">
      <section className="timer">
        <header className="timer__header">
          <span>Level {currLevel + 1}</span>
        </header>

        <div className="timer__display">
          <span>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>

        <div className="timer__buttons">
          <div onClick={toggleTimer}>
            {paused ? (
              <Icon iconType="circle-play" scale={4} />
            ) : (
              <Icon iconType="circle-pause" scale={4} />
            )}
          </div>
        </div>
      </section>

      <progress
        className="progress"
        max={1}
        value={currLevel !== levels.length ? (countdown / (levels[currLevel].time * 60 * 1000)) : 1}
      ></progress>

      <section className="blinds">
        <header className="blinds__header">Blinds</header>
        <span className="blinds__amount">
          {currLevel !== levels.length
            ? `${levels[currLevel].small} / ${levels[currLevel].big}`
            : `${levels[currLevel - 1].small} / ${levels[currLevel - 1].big}`}
        </span>
        {currLevel < levels.length && (
          <div className="blinds__next">
            <header className="blinds__next__header">Next Level</header>
            <span className="blinds__next__amount">
              {currLevel + 1 < levels.length
                ? `${levels[currLevel + 1].small} / ${
                    levels[currLevel + 1].big
                  }`
                : `${levels[currLevel].small} / ${levels[currLevel].big}`}
            </span>
          </div>
        )}
      </section>

      <section className="ante">
        <header className="ante__header">Ante</header>
        <span className="ante__amount">
          {currLevel !== levels.length
            ? `${levels[currLevel].ante}`
            : `${levels[currLevel - 1].ante}`}
        </span>
        {currLevel < levels.length && (
          <div className="ante__next">
            <header className="ante__next__header">Next Level</header>
            <span className="ante__next__amount">
              {currLevel + 1 < levels.length
                ? `${levels[currLevel + 1].ante}`
                : `${levels[currLevel].ante}`}
            </span>
          </div>
        )}
      </section>
    </div>
  );
}

export default TournamentClock;
