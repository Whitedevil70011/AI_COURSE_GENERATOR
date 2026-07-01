const { generateWithGroq } = require('./providers/groqService');
const { generateWithGemini } = require('./providers/geminiService');

// Pause for a given number of milliseconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateLessonLayout = async (courseTitle, moduleTitle, lessonTitle) => {
  const prompt = `
Generate a detailed lesson layout based on the context below.
Return ONLY a valid JSON object — no markdown, no explanation, no backticks.

Context:
Course Title: ${courseTitle}
Module Title: ${moduleTitle}
Lesson Title: ${lessonTitle}

JSON format (strict):
{
  "title": "",
  "objectives": ["Objective 1", "Objective 2", "Objective 3"],
  "videoSearchQuery": "",
  "content": [
    { "type": "heading", "text": "" },
    { "type": "paragraph", "text": "" },
    { "type": "code", "language": "", "code": "" },
    { "type": "video", "query": "" },
    {
      "type": "mcq",
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

Rules:
- "objectives" must contain 3-5 clear, measurable learning objectives (e.g., "Understand...", "Identify...", "Apply...").
- "videoSearchQuery" must be a short, relevant search phrase (NOT a URL or link) someone could paste into YouTube to find a relevant video for this lesson.
- "content" is an ordered array of blocks. Allowed block types: "heading", "paragraph", "code", "video", "mcq".
- Always start "content" with at least one "heading" block followed by 2-4 explanatory "paragraph" blocks that teach the lesson concept clearly.
- DECIDE whether a "code" block is needed:
  - If the lesson topic is programming, algorithms, syntax, or any technical/hands-on skill, INCLUDE exactly one "code" block with a realistic, correct, working code snippet. Set "language" to the correct language name (e.g., "python", "javascript", "sql").
  - If the lesson topic is conceptual/non-technical (e.g., history, theory, soft skills, business), DO NOT include a "code" block at all — omit the object entirely, don't include it with empty values.
- Include exactly ONE "video" block with a "query" field matching the videoSearchQuery topic, placed naturally after the introductory paragraphs.
- At the END of the content array, include 4-5 "mcq" blocks. Each MCQ must have:
  - "question": the question text
  - "options": an array of exactly 4 answer choices
  - "correctAnswer": must exactly match one of the strings in "options" (verbatim)
  - "explanation": a brief explanation of why the correct answer is correct
- Do not include empty/placeholder blocks. Every block included must have real, complete content.
- Do not include any keys other than those specified above.
- Return JSON only, no extra text.
`;

  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();

  let responseText = '';

  if (provider === 'groq') {
    try {
      responseText = await generateWithGroq(prompt);
    } catch (error) {
      const isRateLimit =
        error?.message?.includes('rate_limit_exceeded') ||
        error?.message?.includes('Groq API error 429');

      if (!isRateLimit) {
        throw error;
      }

      // Retry up to 3 times with increasing wait time
      let success = false;

      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`Groq rate limited. Waiting ${attempt * 10}s before retry ${attempt}...`);
        await wait(attempt * 10000); // 10s, 20s, 30s

        try {
          responseText = await generateWithGroq(prompt);
          success = true;
          break;
        } catch (retryError) {
          console.error(`Retry ${attempt} failed:`, retryError.message);
        }
      }

      if (!success) {
        // Groq failed even after retries — fall back to Gemini
        console.log('Groq failed after retries, falling back to Gemini...');
        responseText = await generateWithGemini(prompt);
      }
    }
  } else {
    responseText = await generateWithGemini(prompt);
  }

  // Strip markdown code fences if present
  let cleaned = responseText
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

  // Attempt to repair common AI JSON mistakes:
  // - trailing commas before } or ]
  // - smart/curly quotes instead of straight quotes
  const repairJson = (text) => {
    return text
      .replace(/,\s*([}\]])/g, '$1') // remove trailing commas
      .replace(/[\u201C\u201D]/g, '"') // smart double quotes -> straight
      .replace(/[\u2018\u2019]/g, "'"); // smart single quotes -> straight
  };

  const candidate = extractJson(cleaned);

  let lessonData;
  try {
    lessonData = JSON.parse(candidate);
  } catch (firstError) {
    // First parse failed — try repairing common issues and parse again
    try {
      lessonData = JSON.parse(repairJson(candidate));
      console.warn('JSON required repair before parsing successfully.');
    } catch (secondError) {
      // Still failed — log the FULL raw response so we can see exactly
      // what the model returned and adjust the prompt / max_tokens.
      console.error('--- RAW AI RESPONSE (failed to parse) ---');
      console.error(responseText);
      console.error('--- END RAW AI RESPONSE ---');
      console.error('Parse error:', secondError.message);
      throw new Error('AI returned invalid JSON response');
    }
  }

  return lessonData;
};

module.exports = { generateLessonLayout };