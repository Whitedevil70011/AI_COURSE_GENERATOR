const { GoogleGenAI } = require('@google/genai');

// ── Gemini (your original implementation) ────────────────────────────────────
const generateWithGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

  const ai = new GoogleGenAI({ apiKey });
  const result = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    contents: prompt,
  });

  return result.text || '';
};

module.exports = { generateWithGemini };
