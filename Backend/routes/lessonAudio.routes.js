// This file's job: create the API endpoint the frontend will call

const express = require("express");
const router = express.Router();

const { translateToHinglish } = require("../services/translationService");
const { generateHinglishAudio } = require("../services/ttsService");

// This creates: POST /api/lessons/audio
router.post("/audio", async (req, res) => {
  try {
    // Step 1: Get the English lesson text sent from frontend
    const lessonText = req.body.lessonText;

    // If no text was sent, show an error
    if (!lessonText) {
      return res.status(400).json({ error: "Please send lessonText" });
    }

    console.log("Step 1: Got English text ->", lessonText);

    // Step 2: Translate English text to Hinglish
    const hinglishText = await translateToHinglish(lessonText);
    console.log("Step 2: Translated to Hinglish ->", hinglishText);

    // Step 3: Convert Hinglish text into audio
    const audioFile = await generateHinglishAudio(hinglishText);
    console.log("Step 3: Audio generated successfully");

    // Step 4: Send the audio file back to frontend
    res.set("Content-Type", "audio/wav");
    res.send(audioFile);

  } catch (error) {
    console.log("Something went wrong:", error);
    res.status(500).json({ error: "Failed to generate lesson audio" });
  }
});

module.exports = router;