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
      responseModalities: ["AUDIO"], // we want audio back, not text
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Kore", // you can change this voice later
          },
        },
      },
    },
  });

  // Find the audio data inside the response
  const parts = response.candidates[0].content.parts;
  const audioPart = parts.find((part) => part.inlineData);

  if (!audioPart) {
    throw new Error("Gemini did not return any audio");
  }

  // The audio comes as base64 text, we need to convert it into real audio data
  const rawAudioData = Buffer.from(audioPart.inlineData.data, "base64");

  // Convert raw audio data into a proper playable .wav file
  const wavFile = pcmToWav(rawAudioData);

  return wavFile;
}

module.exports = { generateHinglishAudio };