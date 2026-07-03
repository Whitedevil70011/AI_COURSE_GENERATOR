// This file's job: take Hinglish text and turn it into audio (voice)

const { GoogleGenAI } = require("@google/genai");
const { pcmToWav } = require("./wavHelper"); // import our wav converter

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateHinglishAudio(hinglishText) {
  // Ask Gemini's voice model to turn text into speech
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [
      {
        parts: [{ text: hinglishText }],
      },
    ],
    config: {
      responseModalities: ["AUDIO"], 
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Kore",
          },
        },
      },
    },
  });


  const parts = response.candidates[0].content.parts;
  const audioPart = parts.find((part) => part.inlineData);

  if (!audioPart) {
    throw new Error("Gemini did not return any audio");
  }

  const rawAudioData = Buffer.from(audioPart.inlineData.data, "base64");


  const wavFile = pcmToWav(rawAudioData);

  return wavFile;
}

module.exports = { generateHinglishAudio };