// This file's job: take English text and convert it to Hinglish using Gemini

const { GoogleGenAI } = require("@google/genai");

// Create a connection to Gemini using your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translateToHinglish(englishText) {
  // This is the instruction we give to Gemini
  const instructions = `
    Translate the following English lesson text into Hinglish 
    (Hindi + English mixed, written in English letters, not Hindi script).
    Make it sound natural, like a teacher explaining to a student.
    Keep technical words in English.

    Text to translate:
    "${englishText}"

    Only give me the Hinglish translation. Nothing else.
  `;

  // Send the instruction to Gemini and wait for the response
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: instructions,
  });

  // Get just the text part of the response
  const hinglishText = response.text.trim();

  return hinglishText;
}

module.exports = { translateToHinglish };