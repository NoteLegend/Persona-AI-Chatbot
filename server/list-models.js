require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ No GEMINI_API_KEY found in .env file.");
    return;
  }
  
  console.log("Fetching available models from Google...");
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    // Node 18+ has built-in fetch
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error("❌ Google API Error:", data.error.message);
      return;
    }

    if (data.models) {
      console.log("\n✅ Available Models for your API Key (that support chat/generateContent):");
      console.log("--------------------------------------------------");
      data.models.forEach(model => {
        if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
            // Google returns names like "models/gemini-pro", so we split to just get the name
            const modelName = model.name.replace('models/', '');
            console.log(`- ${modelName}`);
        }
      });
      console.log("--------------------------------------------------");
    } else {
      console.log("Unexpected response:", data);
    }
  } catch (error) {
    console.error("Error fetching models:", error.message);
  }
}

listModels();
