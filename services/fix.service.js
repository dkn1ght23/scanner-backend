const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const fixService = async (alert) => {
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

  return {
    message: "Fixed fetched",
    statusCode: 200,
    fix: fixSuggestion,
  };
};
