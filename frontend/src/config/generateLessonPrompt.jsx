const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Details with field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'programming', Topic: Python, Level: Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  \"course\": {\n    \"name\": \"Python Programming for Beginners\",\n    \"description\": \"A comprehensive introduction to Python programming...\"\n  }\n}\n```',
        },
      ],
    },
  ],
});