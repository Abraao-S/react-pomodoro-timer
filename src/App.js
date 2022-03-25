import { useEffect, useState } from 'react';

const initialTimeInSeconds = 25 * 60;	// equals 1500 seconds or 25 minutes
// const initialTimeInSeconds = 25 * 60 - 4;	// test: 4 seconds passed
// const initialTimeInSeconds = 5;	// test: 5 seconds only

function App() {
  const [totalSeconds, setTotalSeconds] = useState(initialTimeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // why do you never attribute useEffect() to a variable?
  useEffect(() => {
    if (totalSeconds > 0) {
      setTimeout(() => {
        setTotalSeconds(state => state - 1);
      }, 1000)
    } else {
      alert("TIME'S UP");
    }
  }, [totalSeconds]);

  return (
    <div>
      <span>{String(minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span>{String(seconds).padStart(2, '0')}</span>
      <button>Begin</button>
      <button>Pause</button>
    </div>
  )
}

export default App;