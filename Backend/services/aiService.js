const { generateWithGroq } = require('./providers/groqService');
const { generateWithGemini } = require('./providers/geminiService');

// ── Main exported function ────────────────────────────────────────────────────
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
      "description": "A brief 1-2 sentence summary of what this module covers.",
      "duration": "20 minutes",
      "lessons": [
        {
          "title": "Lesson Title",
          "description": "Brief description of this lesson.",
          "duration": "10 minutes"
        }
      ]
    }
  ]
}

Rules:
- Use "modules" not "chapters"
- Each module MUST have: title, description, duration, and lessons array
- Each lesson MUST have: title, description, duration
- Number of modules = Number of Chapters requested
- Each module should have 3-5 lessons
- Duration should be realistic (e.g., "15 minutes", "30 minutes")
- Return JSON only

Category: ${category}
Topic: ${topic}
Description: ${description}
Difficulty: ${difficulty}
Duration: ${duration}
Include Videos: ${video}
Number of Chapters: ${chapters}
`;

  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();
  console.log(`Using AI provider: ${provider}`);

  let responseText = '';

  if (provider === 'groq') {
    responseText = await generateWithGroq(prompt);
  } else {
    responseText = await generateWithGemini(prompt);
  }

  const cleaned = responseText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseError) {
    console.error('Invalid JSON from AI response:', responseText);
    throw new Error('AI returned invalid JSON response');
  }
};

module.exports = { generateCourseLayout };