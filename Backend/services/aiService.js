const { GoogleGenAI } = require("@google/genai");

const generateCourseLayout = async (userInput) => {
  const { category, topic, description, difficulty, duration, video, chapters } = userInput;

  const prompt = `
Generate a course outline based on the user input below.
Return ONLY a valid JSON object — no markdown, no explanation, no backticks.

JSON format (strict):
{
  "title": "",
  "description": "",
  "category": "",
  "topic": "",
  "difficulty": "",
  "duration": "",
  "modules": [
    {
      "title": "",
      "lessons": ["Lesson Title 1", "Lesson Title 2"]
    }
  ]
}

Rules:
- Use "modules" not "chapters"
- Each module must have a "lessons" array
- Number of modules = Number of Chapters requested
- Each module should have 3-5 lesson titles
- Return JSON only

Category: ${category}
Topic: ${topic}
Description: ${description}
Difficulty: ${difficulty}
Duration: ${duration}
Include Videos: ${video}
Number of Chapters: ${chapters}
`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const ai = new GoogleGenAI({ apiKey });
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const responseText = result.text || "";
  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = { generateCourseLayout };