function Question({ questionData, answer, dispatch }) {
  return (
    <div>
      <h4>{questionData.question}</h4>
      <div className="options">
        {questionData.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${answer !== null && index === questionData.correctOption ? "correct" : "wrong"}`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={answer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
