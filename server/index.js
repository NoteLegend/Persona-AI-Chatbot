require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────
app.use("/chat", chatRouter);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Persona Chatbot API is running." });
});

// ── Start server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
