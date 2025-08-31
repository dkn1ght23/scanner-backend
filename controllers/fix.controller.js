const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const fixContoller = async (req, res) => {
  console.log("asdasd");
  try {
    // Validate request body
    if (!req.body || !req.body.alert) {
      return res.status(400).json({
        error: "Invalid request format. Expected { alert: 'error message' }",
        receivedBody: req.body,
      });
    }

    const { alert } = req.body;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create a chat session
    const chat = model.startChat({
      history: [], // No chat history needed
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // Send the prompt to Gemini to get the response formatted as requested
    const prompt = `You are an assistant that explains coding errors. Given the following error message, provide:
  A clear solution on how to fix it (solution should be in between 1400 char).
      
  Error: ${alert}`;

    const result = await chat.sendMessage(prompt);
    const fixSuggestion = result.response.text();

    res.json({
      fix: fixSuggestion,
    });
  } catch (error) {
    console.error("Error in fix-error API:", error);
    res.status(500).json({
      error: "Failed to get fix suggestion",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}