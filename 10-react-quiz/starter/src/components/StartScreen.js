function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Weclome to the React quiz!</h2>
      <h3>{numQuestions} questions to test your React</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
