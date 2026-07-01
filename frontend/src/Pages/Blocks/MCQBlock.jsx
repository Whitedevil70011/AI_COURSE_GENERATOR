// MCQBlock.jsx
import { useState } from "react";

function MCQBlock({ block }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleOptionClick(option) {
    if (isSubmitted) return;
    setSelectedOption(selectedOption === option ? null : option);
  }

  function handleSubmit() {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  }

  function handleTryAgain() {
    setSelectedOption(null);
    setIsSubmitted(false);
  }

  const isCorrect = selectedOption === block.correctAnswer;

  function getOptionClasses(option) {
    let classes = "lr-mcq-option ";

    if (isSubmitted) {
      if (option === block.correctAnswer) {
        classes += "correct";
      } else if (option === selectedOption) {
        classes += "incorrect";
      } else {
        classes += "disabled";
      }
    } else if (option === selectedOption) {
      classes += "selected";
    }

    return classes;
  }

  return (
    <div className="lr-mcq-card">
      <h3 className="lr-mcq-question">{block.question}</h3>

      {block.options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleOptionClick(option)}
          className={getOptionClasses(option)}
        >
          {option}
        </div>
      ))}

      {/* Action Buttons */}
      {!isSubmitted && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="lr-mcq-btn-submit"
          >
            Submit Answer
          </button>

          {selectedOption !== null && (
            <button
              onClick={() => setSelectedOption(null)}
              className="lr-mcq-btn-clear"
            >
              Clear Selection
            </button>
          )}
        </div>
      )}

      {/* Submitted Feedback */}
      {isSubmitted && (
        <div className="lr-mcq-result">
          <span className={`lr-mcq-result-title ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </span>
          <p className="lr-mcq-explanation">{block.explanation}</p>

          {!isCorrect && (
            <button
              onClick={handleTryAgain}
              className="lr-mcq-btn-submit mt-4"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MCQBlock;