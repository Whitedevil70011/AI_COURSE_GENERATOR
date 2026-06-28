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
    { id: 1, name: "Programming", image: programmingImg },
    { id: 2, name: "Study", image: studyImg },
    { id: 3, name: "Design", image: designImg },
    { id: 4, name: "Health", image: healthImg },
  ];

  // const handleSelect = (id) => {
  //   setSelected(id);
  //   if (onSelect) onSelect(id);
  // };
  const handleCategory = (category) => {
    setUserInput((prevInput) => ({
      ...(prevInput || {}),
      category: category,
    }));
    if (onSelect) onSelect(category);


  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        width: "100%",
        marginTop: "8px",
      }}
    >
      {cate.map((item) => {
        const isSelected = selected === item.name;
        return (
          <div
            key={item.id}
            onClick={() => handleCategory(item.name)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "20px 12px 16px",
              borderRadius: "16px",
              border: isSelected ? "2px solid #7c3aed" : "2px solid #e5e7eb",
              background: isSelected
                ? "linear-gradient(135deg,#ede9fe 0%,#f5f3ff 100%)"
                : "#ffffff",
              boxShadow: isSelected
                ? "0 0 0 3px rgba(124,58,237,0.15), 0 4px 20px rgba(124,58,237,0.14)"
                : "0 2px 10px rgba(0,0,0,0.07)",
              cursor: "pointer",
              transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
              transform: isSelected ? "scale(1.04)" : "scale(1)",
              minHeight: "140px",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.13)";
                e.currentTarget.style.borderColor = "#c4b5fd";
                e.currentTarget.style.transform = "scale(1.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)";
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {/* Fixed image container so images don't overflow */}
            <div
              style={{
                width: "72px",
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: isSelected ? "#6d28d9" : "#374151",
                letterSpacing: "0.01em",
                textAlign: "center",
                wordBreak: "break-word",
                width: "100%",
              }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Category;
