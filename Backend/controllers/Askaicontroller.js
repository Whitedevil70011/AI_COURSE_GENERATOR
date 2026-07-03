
const askAiService = require("../services/askAiService");

async function askAi(req, res) {
  try {
    const { lessonTitle, lessonContent, history } = req.body;

    const reply = await askAiService.getAiReply({ lessonTitle, lessonContent, history });

    return res.json({ reply });
  } catch (error) {
    console.error("askAi controller error:", error.message);

    if (error.message.includes("history must be")) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(502).json({ error: "Something went wrong talking to the AI provider." });
  }
}

module.exports = { askAi };