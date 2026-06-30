const { generateWithGroq } = require('./providers/groqService');
const { generateWithGemini } = require('./providers/geminiService');

// Small helper: pause for a given number of milliseconds
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Main exported function ────────────────────────────────────────────────────
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

  // Switch provider via AI_PROVIDER env var: "groq" | "gemini" (default: groq)
  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();

  let responseText = '';

  if (provider === 'groq') {
    try {
      responseText = await generateWithGroq(prompt);
    } catch (error) {
      const message = error?.message || '';
      const isRateLimit =
        message.includes('rate_limit_exceeded') || message.includes('Groq API error 429');

      if (!isRateLimit) {
        throw error;
      }

      // Groq is rate limited — wait and retry Groq itself,
      // instead of falling back to Gemini (which has a very
      // small daily quota and runs out fast).
      console.log('Groq rate limited. Waiting 10s before retrying...');
      await wait(10000);

      try {
        responseText = await generateWithGroq(prompt);
      } catch (retryError) {
        console.error('Groq retry also failed:', retryError.message);
        throw retryError;
      }
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

  let lessonData;
  try {
    lessonData = JSON.parse(extractJson(cleaned));
  } catch (parseError) {
    console.error('Invalid JSON from AI response:', responseText);
    throw new Error('AI returned invalid JSON response');
  }

  // Validate MCQs: correctAnswer must exactly match one of the options
  if (Array.isArray(lessonData.content)) {
    lessonData.content.forEach((block, index) => {
      if (block.type === 'mcq') {
        if (!Array.isArray(block.options) || !block.options.includes(block.correctAnswer)) {
          console.warn(`MCQ at content[${index}] has a correctAnswer that doesn't match its options:`, block);
        }
      }
    });
  }

  return lessonData;
};

module.exports = { generateLessonLayout };