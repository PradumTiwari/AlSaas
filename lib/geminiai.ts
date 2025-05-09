import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "../utils/prompts";

const genAI=new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY||"",
)

export const generateSummaryFromGemini = async(pdfText: string) => {
  try {
    if (typeof pdfText !== "string") {
      throw new Error("Invalid pdfText input: must be a string");
    }

    if (typeof SUMMARY_SYSTEM_PROMPT !== "string") {
      throw new Error("SUMMARY_SYSTEM_PROMPT must be a string");
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' ,
      generationConfig:{
        temperature:0.7,
        maxOutputTokens: 2000,
      }
    });

   const prompt = {
  contents: [
    {
      role: 'user',
      parts: [
        { text: SUMMARY_SYSTEM_PROMPT },
        {
          text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
    },
  ],
};

    const result = await model.generateContent(prompt);
    const response = await result.response;
    if(!response.text()){
      throw new Error("No response from Gemini API");
    }
    // console.log("Gemini API Response:", response.text());
    
    return response.text();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
