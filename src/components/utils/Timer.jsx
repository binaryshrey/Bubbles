/************************************************************ IMPORTS ************************************************************/

import { useState, useEffect, memo } from 'react';
import SnackAlert from '../../common/SnackAlert';

/************************************************************ IMPORTS ************************************************************/

const Timer = ({ timeRemaining, albumName }) => {
  // global vars
  const COLOR_CODES = {
    info: { color: 'green-500' },
    alert: { color: 'rose-500', threshold: 60 },
  };
  const TIME_LIMIT = 300;

  //state
  const [timeLeft, setTimeLeft] = useState(timeRemaining);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timePassed, setTimePassed] = useState(TIME_LIMIT - timeRemaining);
  const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // side-effects
  useEffect(() => {
    if (!isTimerRunning || timeLeft == 0) return; // Exit early if the timer is not running

    const timerInterval = setInterval(() => {
      setTimePassed((prev) => {
        const newTimePassed = prev + 1;
        const newTimeLeft = TIME_LIMIT - newTimePassed;

        if (newTimeLeft <= 0) {
          clearInterval(timerInterval);
          setIsTimerRunning(false);
          setTimeLeft(0);
          handleSnackbarOpen();
        } else {
          setTimeLeft(newTimeLeft);
        }

        updatePathColor(newTimeLeft);
        return newTimePassed;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  // methods
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const updatePathColor = (timeLeft) => {
    if (timeLeft <= COLOR_CODES.alert.threshold) {
      setRemainingPathColor(COLOR_CODES.alert.color);
    } else {
      setRemainingPathColor(COLOR_CODES.info.color);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  const setCircleDasharray = () => {
    const circleDasharray = `${(calculateTimeFraction() * TIME_LIMIT).toFixed(0)} ${TIME_LIMIT}`;
    return circleDasharray;
  };

  return (
    <>
      <div className="relative w-12 h-12">
        <svg className="transform -scale-x-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g style={{ fill: 'none', stroke: 'none' }}>
            <circle className="stroke-2 stroke-zinc-600" cx="50" cy="50" r="45" />
            <path id="base-timer-path-remaining" strokeDasharray={setCircleDasharray()} className={`stroke-current stroke-[4px] stroke-round rotate-90 origin-center duration-1000 ease-linear text-${remainingPathColor}`} d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" />
          </g>
        </svg>
        <p className="absolute w-12 h-12 top-0 flex items-center justify-center text-xs text-white">{formatTime(timeLeft)}</p>
      </div>
      <SnackAlert open={snackbarOpen} message={`${albumName} album link will now expire!`} severity="warning" onClose={handleSnackbarClose} />
    </>
  );
};

export default memo(Timer);
