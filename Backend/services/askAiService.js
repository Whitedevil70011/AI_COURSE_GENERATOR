
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function buildSystemPrompt(lessonTitle, lessonContent) {
  return {
    role: "system",
    content:
       `You are a helpful AI tutor for a student currently viewing a lesson titled "${lessonTitle || "Untitled lesson"}".\n\n` +
      `Lesson content (for context, in case the student's question relates to it):\n${(lessonContent || "").slice(0, 6000)}\n\n` +
      `Answer the student's question clearly and concisely, whether it's about this lesson, ` +
      `a related topic, or anything else they're curious about. Use the lesson content as helpful ` +
      `context when relevant, but don't refuse or redirect questions just because they go beyond it.\n\n` +
      `If the student pastes a multiple-choice question with options (A/B/C/D, 1/2/3/4, etc.), ` +
      `first clearly state which option is correct (e.g. "Correct answer: B) ..."), then give a short explanation why. ` +
      `If the options aren't included in their message, ask them to paste the full question with all options before answering.`,
  };
}

/**

 * @param {Object} params
 * @param {string} params.lessonTitle
 * @param {string} params.lessonContent
 * @param {Array<{role: string, content: string}>} params.history
 * @returns {Promise<string>} the assistant's reply text
 */
async function getAiReply({ lessonTitle, lessonContent, history }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in the environment.");
  }

  if (!Array.isArray(history) || history.length === 0) {
    throw new Error("history must be a non-empty array.");
  }

  const chatMessages = history
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.SITE_URL || "http://localhost:5173",
      "X-Title": process.env.SITE_NAME || "My Course App",
    },
    body: JSON.stringify({
      model,
      messages: [buildSystemPrompt(lessonTitle, lessonContent), ...chatMessages],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("OpenRouter error:", response.status, errText);
    throw new Error("AI provider request failed.");
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;

  if (typeof reply !== "string") {
    console.error("Unexpected OpenRouter response shape:", data);
    throw new Error("AI provider returned an unexpected response.");
  }

  return reply;
}

module.exports = { getAiReply };