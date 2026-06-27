import React from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import Category from "./Category";
import Layout from "./layout";
import TopicDescription from "./TopicDescription";
import SelectOption from "./SelectOption";

function CreateCourse() {
  const Stepper = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleNext = () => {
    if (currentStep === 0 && !selectedCategory) {
      alert("Please select a category first!");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* ── Title ── */}
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            background: "linear-gradient(90deg,#7c3aed,#a855f7,#d946ef)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "36px",
            textAlign: "center",
          }}
        >
          Create Course
        </h2>

        {/* ── Stepper ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          {Stepper.map((item, index) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* Circle + label */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    transition: "all 0.3s",
                    background:
                      currentStep === index
                        ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                        : currentStep > index
                          ? "linear-gradient(135deg,#a855f7,#d946ef)"
                          : "#ede9fe",
                    color: currentStep >= index ? "#fff" : "#a78bfa",
                    boxShadow:
                      currentStep === index
                        ? "0 4px 16px rgba(124,58,237,0.35)"
                        : "none",
                    border:
                      currentStep === index
                        ? "2px solid #7c3aed"
                        : "2px solid #ddd6fe",
                  }}
                >
                  {item.icon}
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: currentStep === index ? "#7c3aed" : "#9ca3af",
                    margin: 0,
                  }}
                >
                  {item.name}
                </p>
              </div>

              {/* Connector line */}
              {index < Stepper.length - 1 && (
                <div
                  style={{
                    width: "90px",
                    height: "2px",
                    background:
                      currentStep > index
                        ? "linear-gradient(90deg,#7c3aed,#a855f7)"
                        : "linear-gradient(90deg,#ddd6fe,#e9d5ff)",
                    margin: "0 10px",
                    marginBottom: "28px",
                    borderRadius: "999px",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Step Content ── */}
        <div style={{ width: "100%" }}>
          {currentStep === 0 && <Category onSelect={setSelectedCategory} />}

          {/* 2nd step */}
          {currentStep === 1 && (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "64px 0",
                fontSize: "1.1rem",
              }}
            >
              <TopicDescription />
            </div>
          )}
          {currentStep === 2 && (
            <SelectOption />
          )}
        </div>

        {/* ── Navigation Buttons ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "36px",
            justifyContent: "center",
          }}
        >
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              style={{
                padding: "10px 28px",
                borderRadius: "10px",
                border: "2px solid #7c3aed",
                background: "transparent",
                color: "#7c3aed",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ede9fe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              ← Previous
            </button>
          )}

          {currentStep < Stepper.length - 1 && (
            <button
              onClick={handleNext}
              style={{
                padding: "10px 32px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(124,58,237,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(124,58,237,0.35)";
              }}
            >
              Next Step →
            </button>
          )}

          {currentStep === Stepper.length - 1 && (
            <button
              onClick={() => alert("Course Created!")}
              style={{
                padding: "10px 32px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg,#7c3aed,#d946ef)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                transition: "all 0.2s",
              }}
            >
              🚀 Generate Course
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CreateCourse;
