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
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    width: "100%",
    maxWidth: "760px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid #e9d5ff",
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 18px 50px rgba(124,58,237,0.08)",
    textAlign: "left",
  };

  const optionGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#1f2937",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#374151",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundPosition: "right 12px center",
    backgroundSize: "20px",
    backgroundRepeat: "no-repeat",
    paddingRight: "40px",
  };

  return (
    <div style={containerStyle}>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>Difficulty Level</label>
        <select
          style={selectStyle}
          value={userInput?.difficulty || "Beginner"}
          onChange={(e) => handleOptionChange("difficulty", e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#7c3aed";
            e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
          }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>Course Duration</label>
        <select
          style={selectStyle}
          value={userInput?.duration || "1 Hour"}
          onChange={(e) => handleOptionChange("duration", e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#7c3aed";
            e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
          }}
        >
          <option value="1 Hour">1 Hour</option>
          <option value="2 Hours">2 Hours</option>
          <option value="5 Hours">5 Hours</option>
          <option value="10 Hours">10 Hours</option>
        </select>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>Add Video</label>
        <select
          style={selectStyle}
          value={userInput?.video || "Yes"}
          onChange={(e) => handleOptionChange("video", e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#7c3aed";
            e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
          }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>No of Chapters</label>
        <select
          style={selectStyle}
          value={userInput?.chapters || "5"}
          onChange={(e) => handleOptionChange("chapters", e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#7c3aed";
            e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
          }}
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
  );
}

export default SelectOption;
