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
import "./CreateCourse.css";

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
    chapters: "2",
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
        <div className="create-course-wrapper">
          {/* ── Page Header ── */}
          <div className="create-course-header">
            <div className="create-course-header-badge">
              <span className="create-course-header-badge-dot"></span>
              Step {currentStep + 1} of {Stepper.length}
            </div>
            <h2 className="create-course-title">Create Your Course</h2>
            <p className="create-course-subtitle">
              Design a personalized AI-powered learning experience in just a few steps
            </p>
          </div>

          {/* ── Stepper ── */}
          <div className="create-course-stepper">
            {Stepper.map((item, index) => (
              <div
                key={item.id}
                className="create-course-stepper-item"
              >
                {/* Circle + label */}
                <div className="create-course-stepper-node">
                  <div
                    className={[
                      "create-course-stepper-circle",
                      currentStep === index ? "active" : "",
                      currentStep > index ? "completed" : "",
                    ].join(" ")}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={[
                      "create-course-stepper-label",
                      currentStep === index ? "active" : "",
                      currentStep > index ? "completed" : "",
                    ].join(" ")}
                  >
                    {item.name}
                  </p>
                </div>

                {/* Connector line */}
                {index < Stepper.length - 1 && (
                  <div
                    className={[
                      "create-course-stepper-connector",
                      currentStep > index ? "completed" : "",
                    ].join(" ")}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Step Content Card ── */}
          <div className="create-course-content-card">
            <div className="create-course-content-inner">
              {currentStep === 0 && <Category onSelect={() => {}} />}
              {currentStep === 1 && <TopicDescription />}
              {currentStep === 2 && <SelectOption />}
            </div>
          </div>

          {/* ── Navigation Buttons ── */}
          <div className="create-course-nav">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="create-course-btn-prev"
              >
                ← Previous
              </button>
            )}

            {currentStep < Stepper.length - 1 && (
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={[
                  "create-course-btn-next",
                  isNextDisabled ? "disabled" : "",
                ].join(" ")}
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
                className={[
                  "create-course-btn-generate",
                  (!isOptionsStepComplete || isLoading) ? "disabled" : "",
                ].join(" ")}
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
