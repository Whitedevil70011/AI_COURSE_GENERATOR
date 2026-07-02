// routes/Askairoutes.js
// Just wires the URL path to the controller. No logic lives here.

const express = require("express");
const askAiController = require("../controllers/Askaicontroller");

const router = express.Router();

router.post("/ask-ai", askAiController.askAi);

module.exports = router;