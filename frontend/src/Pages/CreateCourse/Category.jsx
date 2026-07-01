import React, { useContext } from "react";
import programmingImg from "../../assets/prgrammin.png";
import studyImg from "../../assets/study.png";
import designImg from "../../assets/design.png";
import healthImg from "../../assets/health.png";
import { UserInputContext } from "../../Context/userInputcontext";

function Category({ onSelect }) {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const selected = userInput?.category;

  const cate = [
    { id: 1, name: "Programming", image: programmingImg, tint: "#eef2ff", ring: "#6366f1" },
    { id: 2, name: "Study", image: studyImg, tint: "#fef3c7", ring: "#d97706" },
    { id: 3, name: "Design", image: designImg, tint: "#fce7f3", ring: "#db2777" },
    { id: 4, name: "Health", image: healthImg, tint: "#dcfce7", ring: "#16a34a" },
  ];

  const handleCategory = (category) => {
    setUserInput((prevInput) => ({
      ...(prevInput || {}),
      category: category,
    }));
    if (onSelect) onSelect(category);
  };

  return (
    <div className="cc-category-grid">
      {cate.map((item) => {
        const isSelected = selected === item.name;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleCategory(item.name)}
            className={`cc-category-card ${isSelected ? "selected" : ""}`}
            style={{
              "--card-ring": item.ring,
              "--card-tint": item.tint,
            }}
          >
            <div
              className="cc-category-icon-tile"
              style={{ backgroundColor: item.tint }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="cc-category-icon-img"
              />
            </div>

            <span
              className="cc-category-name"
              style={{ color: isSelected ? item.ring : undefined }}
            >
              {item.name}
            </span>

            {isSelected && (
              <span className="cc-category-check" style={{ background: item.ring }}>
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Category;