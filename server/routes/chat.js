const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const personas = require("../prompts/personas");

const router = express.Router();

/**
 * POST /chat
 * 
 * Body: { persona: string, message: string, history: Array<{role, parts}> }
 * Returns: { reply: string }
 */
router.post("/", async (req, res) => {
  try {
    const { persona, message, history } = req.body;

    // ── Validate input ──────────────────────────────────────────────
    if (!persona || !message) {
      return res.status(400).json({
        error: "Missing required fields: 'persona' and 'message' are required.",
      });
    }

    const systemPrompt = personas[persona];
    if (!systemPrompt) {
      return res.status(400).json({
        error: `Unknown persona: '${persona}'. Valid options: ${Object.keys(personas).join(", ")}`,
      });
    }

    // ── Validate API key ────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables.");
      return res.status(500).json({
        error: "Server configuration error. Please contact the administrator.",
      });
    }

    // ── Build Gemini request ────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    // Convert history into the format Gemini expects
    const chatHistory = Array.isArray(history)
      ? history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.parts || msg.text || "" }],
        }))
      : [];

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return res.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err.message || err);

    // Handle specific Gemini API errors
    if (err.message?.includes("API_KEY_INVALID") || err.status === 400) {
      return res.status(500).json({
        error: "There was an issue with the AI service configuration. Please try again later.",
      });
    }

    if (err.message?.includes("RESOURCE_EXHAUSTED") || err.status === 429) {
      return res.status(429).json({
        error: "The AI service is currently busy. Please wait a moment and try again.",
      });
    }

    return res.status(500).json({
      error: "Something went wrong while generating a response. Please try again.",
    });
  }
});

module.exports = router;
