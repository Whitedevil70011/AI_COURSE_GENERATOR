import React from "react";
import { UserInputContext } from "../../Context/userInputcontext";

function SelectOption() {
  const { userInput, setUserInput } = React.useContext(UserInputContext);
  const handleOptionChange = (field, value) => {
    setUserInput((prevInput) => ({
      ...(prevInput || {}),
      [field]: value,
    }));
  };

  return (
    <div className="cc-options-container">
      <div className="cc-option-group">
        <label className="cc-option-label">🎯 Difficulty Level</label>
        <div className="cc-select-wrapper">
          <select
            className="cc-select"
            value={userInput?.difficulty || "Beginner"}
            onChange={(e) => handleOptionChange("difficulty", e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="cc-option-group">
        <label className="cc-option-label">⏱️ Course Duration</label>
        <div className="cc-select-wrapper">
          <select
            className="cc-select"
            value={userInput?.duration || "1 Hour"}
            onChange={(e) => handleOptionChange("duration", e.target.value)}
          >
            <option value="1 Hour">1 Hour</option>
            <option value="2 Hours">2 Hours</option>
            <option value="5 Hours">5 Hours</option>
            <option value="10 Hours">10 Hours</option>
          </select>
        </div>
      </div>

      <div className="cc-option-group">
        <label className="cc-option-label">🎬 Add Video</label>
        <div className="cc-select-wrapper">
          <select
            className="cc-select"
            value={userInput?.video || "Yes"}
            onChange={(e) => handleOptionChange("video", e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div className="cc-option-group">
        <label className="cc-option-label">📚 No of Chapters</label>
        <div className="cc-select-wrapper">
          <select
            className="cc-select"
            value={userInput?.chapters || "2"}
            onChange={(e) => handleOptionChange("chapters", e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
