import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import Category from "./Category";
import Layout from "./layout";
import TopicDescription from "./TopicDescription";
import SelectOption from "./SelectOption";
import { UserInputContext } from "../../Context/userInputcontext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth0();

  const Stepper = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  const [currentStep, setCurrentStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  
  const [userInput, setUserInput] = React.useState({
    difficulty: "Beginner",
    duration: "1 Hour",
    video: "Yes",
    chapters: "5",
  });
  const {
    category,
    topic,
    description,
    difficulty,
    duration,
    video,
    chapters,
  } = userInput;

  const selectedCategory = category;
  const isCategoryStepComplete = Boolean(selectedCategory);
  const isTopicStepComplete = Boolean(topic?.trim() && description?.trim());
  const isOptionsStepComplete = Boolean(
    difficulty && duration && video && chapters,
  );
  const isNextDisabled =
    (currentStep === 0 && !isCategoryStepComplete) ||
    (currentStep === 1 && !isTopicStepComplete) ||
    (currentStep === 2 && !isOptionsStepComplete);

  const handleNext = () => {
    if (isNextDisabled) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const createBasicCourseLayout = async () => {
    if (!isAuthenticated || !user?.sub) {
      alert("Please sign in before creating a course.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/courses/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userInput,
          userId: user?.sub,
          userEmail: user?.email,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const serverMessage = errorBody?.message || errorBody?.error || response.statusText;
        throw new Error(`Course generation failed: ${response.status} ${serverMessage}`);
      }

      const result = await response.json();

      if (!result.courseId) {
        throw new Error("No courseId in response");
      }

      const courseUrl = `/course/${result.courseId}`;
      navigate(courseUrl);
      
      return result;
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course: " + error.message);
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading account...
      </div>
    );
  }

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
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
            {currentStep === 0 && <Category onSelect={() => {}} />}

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
            {currentStep === 2 && <SelectOption />}
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
                disabled={isNextDisabled}
                style={{
                  padding: "10px 32px",
                  borderRadius: "10px",
                  border: "none",
                  background: isNextDisabled
                    ? "linear-gradient(135deg,#c4b5fd,#ddd6fe)"
                    : "linear-gradient(135deg,#7c3aed,#a855f7)",
                  color: isNextDisabled ? "#f5f3ff" : "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: isNextDisabled ? "not-allowed" : "pointer",
                  boxShadow: isNextDisabled
                    ? "none"
                    : "0 4px 14px rgba(124,58,237,0.35)",
                  transition: "all 0.2s",
                  letterSpacing: "0.02em",
                  opacity: isNextDisabled ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (isNextDisabled) return;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(124,58,237,0.45)";
                }}
                onMouseLeave={(e) => {
                  if (isNextDisabled) return;
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
                onClick={() => {
                  createBasicCourseLayout().catch(err => {
                    console.error("Navigation error:", err);
                  });
                }}
                disabled={!isOptionsStepComplete || isLoading}
                style={{
                  padding: "10px 32px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    isOptionsStepComplete && !isLoading
                      ? "linear-gradient(135deg,#7c3aed,#d946ef)"
                      : "linear-gradient(135deg,#c4b5fd,#ddd6fe)",
                  color:
                    isOptionsStepComplete && !isLoading ? "#fff" : "#f5f3ff",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor:
                    isOptionsStepComplete && !isLoading
                      ? "pointer"
                      : "not-allowed",
                  boxShadow:
                    isOptionsStepComplete && !isLoading
                      ? "0 4px 14px rgba(124,58,237,0.35)"
                      : "none",
                  transition: "all 0.2s",
                  opacity: isOptionsStepComplete && !isLoading ? 1 : 0.7,
                }}
              >
                {isLoading ? "⏳ Generating..." : "🚀 Generate Course"}
              </button>
            )}
          </div>
        </div>
      </Layout>
    </UserInputContext.Provider>
  );
}

export default CreateCourse;
