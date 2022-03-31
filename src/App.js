import { useEffect, useState } from 'react';

const initialTimeInSeconds = 25 * 60;	// equals 1500 seconds or 25 minutes
// const initialTimeInSeconds = 25 * 60 - 4;	// test: 4 seconds passed
// const initialTimeInSeconds = 15;	// test: 15 seconds only
const initialBreakTimeInSeconds = 5 * 60; // equals 300 seconds or 5 minutes

function App() {
  const [totalSeconds, setTotalSeconds] = useState(initialTimeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // const [isBreakActive, setIsBreakActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [isPomodoroSectionSelected, setIsPomodoroSectionSelected] = useState(true);
  const [isIntervalSectionSelected, setIsIntervalSectionSelected] = useState(false);

  // v3: working! Starts the timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setTimeout(() => {
        if (totalSeconds > 0) {
          setTotalSeconds(totalSeconds - 1);
        } else {
          alert("TIME'S UP");
          clearTimeout(interval);
        }
      }, 1000);
    } else
      if (!isTimerActive && totalSeconds !== 0) {
        clearTimeout(interval);
      }
    return () => clearTimeout(interval);
  }, [totalSeconds, isTimerActive]);


  // v1: working! changes button text
  useEffect(() => {
    if (isTimerActive) {
      setButtonText('STOP');
    } else {
      setButtonText('START');
    }
  }, [isTimerActive]);

  // v1: working! resets the timer
  useEffect(() => {
    if(isPomodoroSectionSelected) {
      setTotalSeconds(initialTimeInSeconds);
    } else 
    if (isIntervalSectionSelected) {
      setTotalSeconds(initialBreakTimeInSeconds);
    }
  }, [isPomodoroSectionSelected, isIntervalSectionSelected, timerReset]);

  // v1: in progress! changes timer according to section selected
  useEffect(() => {
    if (isPomodoroSectionSelected) {
      setTotalSeconds(initialTimeInSeconds);
    } else 
    if(isIntervalSectionSelected) {
      setTotalSeconds(initialBreakTimeInSeconds);
    }
  }, [isPomodoroSectionSelected, isIntervalSectionSelected]);

  // v1: working!
  const handleClickStartPause = () => {
    // console.log("INSIDE FUNCTION: handleClick()");
    // console.log(`isTimerActive: ${isTimerActive}`);
    // console.log(`buttonStatus: ${buttonStatus}`);
    setIsTimerActive(!isTimerActive);
  }

  // v1: working!
  const handleClickReset = () => {
    // console.log("INSIDE FUNCTION: handleClickOnReset()");
    setTimerReset(!timerReset);
    setIsTimerActive(false);
  }

  const handleClickPomodoroSection = () => {
    console.log("INSIDE FUNCTION: handleClickPomodoroSection()");
    setIsPomodoroSectionSelected(true);
    setIsIntervalSectionSelected(false);    
    // setIsBreakActive(false);
    if (isIntervalSectionSelected) {
      setIsTimerActive(false);
    }
  }
  
  // v1: in progress!
  const handleClickIntervalSection = () => {
    console.log("INSIDE FUNCTION: handleClickIntervalSection()");
    setIsIntervalSectionSelected(true);
    setIsPomodoroSectionSelected(false);
    // setIsBreakActive(true);
    if (isPomodoroSectionSelected) {
      setIsTimerActive(false);
    }
  }

  // v3: in progress! button as a component
  // function Button3(props) {
  //   const [buttonStatus, setButtonStatus] = useState(props.buttonStatus)
  //   useEffect( () => {
  //     if(buttonStatus === true) {
  //     }
  //   }, [buttonStatus] )
  //   return (buttonStatus ? 'Start' : 'Stop');
  // }

  return (
    <div className='app-container'>

      <span className='pomodoro-title'>
        React Pomodoro Timer
      </span>

      <div className='buttons-panel-top'>

        <button type="button" className={`btn button-top${isPomodoroSectionSelected ? '-selected' : ''}`} onClick={handleClickPomodoroSection}>
          Pomodoro
        </button>

        <button type="button" className={`btn button-top${isIntervalSectionSelected ? '-selected' : ''}`} onClick={handleClickIntervalSection}>
          Interval
        </button>

      </div>
 
      <div className='time-string'>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>

      <div className='buttons-panel-bottom'>
        <button type="button" className="btn btn-danger" onClick={handleClickStartPause}>
          {buttonText}
        </button>

        <button type="button" className="btn btn-danger" onClick={handleClickReset}>
          RESET
        </button>
      </div>

    </div>
  )
}

export default App;