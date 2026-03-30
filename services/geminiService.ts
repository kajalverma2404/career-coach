
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, CareerAnalysis, GroundingSource } from "../types";

export const performCareerAnalysis = async (profileText: string): Promise<AnalysisResult> => {
  // Use recommended initialization with direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a high-level Holistic Career Strategist. 
    The user has provided a professional and personal summary.
    
    TASK:
    1. Extract their Education/Degrees, Professional Skills, and Personal Hobbies/Interests from the text.
    2. Analyze 2026-2027 market trends using Google Search.
    3. Find career paths that leverage their professional expertise while aligning with their personal passions.
    4. Focus on "Niche Synergies" (e.g., a dev who loves hiking might fit well in outdoor-tech/sustainability).
    
    RESPONSE FORMAT:
    You MUST respond with a JSON object ONLY. Do not include markdown formatting.
    
    Structure:
    {
      "strategistOutlook": "A summary of how their holistic profile (skills + passions) creates a unique competitive advantage in the 2026-2027 landscape.",
      "recommendations": [
        {
          "role": "Role Name",
          "explanation": "Why this fits their professional background.",
          "personalSynergy": "Specifically explain how their mentioned hobbies/interests align with this role or industry culture.",
          "matchScore": 92,
          "nextSkills": ["Skill X", "Skill Y"]
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `User Holistic Profile: ${profileText}`,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    // Directly access .text property as per guidelines
    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis: CareerAnalysis = jsonMatch 
      ? JSON.parse(jsonMatch[0]) 
      : { 
          strategistOutlook: "Analysis completed. Here is the overview based on your profile for the 2026-2027 market...", 
          recommendations: [] 
        };

    const sources: GroundingSource[] = [];
    // Extract grounding URLs from groundingChunks as required by guidelines
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            title: chunk.web.title || "Market Intelligence",
            uri: chunk.web.uri
          });
        }
      });
    }

    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return {
      analysis,
      sources: uniqueSources
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze career data. Please check your network.");
  }
};
