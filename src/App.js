import { useEffect, useState } from 'react';

// const initialTimeInSeconds = 25 * 60;	// equals 1500 seconds or 25 minutes
// const initialTimeInSeconds = 25 * 60 - 4;	// test: 4 seconds passed
const initialTimeInSeconds = 15;	// test: 15 seconds only

function App() {
  const [totalSeconds, setTotalSeconds] = useState(initialTimeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [timerReset, setTimerReset] = useState(false);

  // v2: problem! timer starts to decrease faster and faster not respecting the 1 second interval
  // useEffect(() => {
  //   if (isTimerActive) {
  //     const interval = setInterval(() => {
  //       if (totalSeconds > 0) {
  //         setTotalSeconds(totalSeconds - 1);
  //       } else {
  //         alert("TIME'S UP");
  //         clearInterval(interval);
  //       }
  //     }, 1000);
  //   } else return;
  // }, [totalSeconds, isTimerActive]);

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
    setTotalSeconds(initialTimeInSeconds);
  }, [timerReset]);

  // v1: working!
  const handleClickStartPause = () => {
    // console.log("INSIDE FUNCTION: handleClick()");
    // console.log(`isTimerActive: ${isTimerActive}`);
    // console.log(`buttonStatus: ${buttonStatus}`);
    setIsTimerActive(!isTimerActive);
  }

  // v1: working!
  const handleClickOnReset = () => {
    // console.log("INSIDE FUNCTION: handleClickOnReset()");
    setTimerReset(!timerReset);
    setIsTimerActive(false);
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
    <div>
      <span>{String(minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span>{String(seconds).padStart(2, '0')}</span>
      <button onClick={handleClickStartPause}>{buttonText}</button>
      <button onClick={handleClickOnReset}>RESET</button>
    </div>
  )
}

export default App;