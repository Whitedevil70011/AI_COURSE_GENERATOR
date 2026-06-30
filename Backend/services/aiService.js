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

  // Switch provider via AI_PROVIDER env var: "groq" | "gemini" (default: groq)
  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();

  let responseText = '';

  if (provider === 'groq') {
    try {
      responseText = await generateWithGroq(prompt);
    } catch (error) {
      const message = error?.message || '';
      const isRateLimit = message.includes('rate_limit_exceeded') || message.includes('Groq API error 429');

      if (!isRateLimit) {
        throw error;
      }

      responseText = await generateWithGemini(prompt);
    }
  } else {
    responseText = await generateWithGemini(prompt);
  }

  const cleaned = responseText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const extractJson = (text) => {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return text.slice(firstBrace, lastBrace + 1).trim();
    }

    return text;
  };

  try {
    return JSON.parse(extractJson(cleaned));
  } catch (parseError) {
    console.error('Invalid JSON from AI response:', responseText);
    throw new Error('AI returned invalid JSON response');
  }
};

module.exports = { generateCourseLayout };