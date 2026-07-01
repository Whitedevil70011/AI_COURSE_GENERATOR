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

  // Helper function: decides which Tailwind classes an option box should have
  function getOptionClasses(option) {
    // Base classes every option always has
    let classes = "px-4 py-3 mb-2 rounded-lg border cursor-pointer transition-colors ";

    if (isSubmitted) {
      if (option === block.correctAnswer) {
        // Correct answer always shown green after submit
        classes += "bg-green-50 border-green-500 text-green-800 cursor-default";
      } else if (option === selectedOption) {
        // The wrong option the user picked
        classes += "bg-red-50 border-red-500 text-red-800 cursor-default";
      } else {
        // Any other option after submit — greyed out, not clickable
        classes += "bg-white border-gray-200 text-gray-400 cursor-default";
      }
    } else if (option === selectedOption) {
      // Selected, before submitting
      classes += "bg-blue-50 border-blue-400";
    } else {
      // Default, not selected, not submitted
      classes += "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400";
    }

    return classes;
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5 mb-5 bg-white shadow-sm">
      
      <h3 className="text-lg text-gray-900 mb-4">{block.question}</h3>

      {block.options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleOptionClick(option)}
          className={getOptionClasses(option)}
        >
          {option}
        </div>
      ))}

      {/* Buttons before submitting */}
      {!isSubmitted && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-5 py-2 rounded-lg font-semibold text-white bg-blue-600
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            Submit
          </button>

          {selectedOption !== null && (
            <button
              onClick={() => setSelectedOption(null)}
              className="px-5 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100
                         hover:bg-gray-200 transition-colors"
            >
              Clear Selection
            </button>
          )}
        </div>
      )}

      {/* Result section after submitting */}
      {isSubmitted && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <strong className={isCorrect ? "text-green-700" : "text-red-700"}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </strong>
          <p className="mt-2 text-gray-600 leading-relaxed">{block.explanation}</p>

          {!isCorrect && (
            <button
              onClick={handleTryAgain}
              className="mt-3 px-5 py-2 rounded-lg font-semibold text-white bg-blue-600
                         hover:bg-blue-700 transition-colors"
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