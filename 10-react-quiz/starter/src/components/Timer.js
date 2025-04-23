import { useEffect, useState } from "react";

function Timer({ dispatch, totalTime }) {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  useEffect(() => {
    if (timeRemaining === 0) {
      dispatch({ type: "finished" });
    }
  }, [dispatch, timeRemaining]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
