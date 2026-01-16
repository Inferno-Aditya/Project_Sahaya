import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generatePetAdvice = async (prompt: string): Promise<string> => {
  if (!ai) return "AI Service Unavailable";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert AI Pet Care Copilot for 'Sahaya'. Provide helpful, safe advice. NOT a vet substitute.",
      }
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble thinking right now.";
  }
};

export const findNearbyPlaces = async (lat: number, lng: number, category: string = "parks"): Promise<{text: string, chunks: any[]}> => {
  if (!ai) return { text: "API Key missing.", chunks: [] };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 5 top-rated pet-friendly ${category} near me.`,
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
      },
    });

    return { 
      text: response.text || "No recommendations found.", 
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] 
    };
  } catch (error) {
    return { text: "Could not fetch location data.", chunks: [] };
  }
};

export const getChatReply = async (history: Message[], personality: string, lastUserMessage: string): Promise<{text: string, sender?: string}> => {
    if (!ai) return { text: "Service unavailable" };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `The user just said: "${lastUserMessage}". Reply to them based on your persona.`,
            config: {
                systemInstruction: `${personality} Important: Keep your reply under 30 words. If you are a group chat, prefix your response with "[Member Name]: " so I know who is talking.`
            }
        });

        let text = response.text || "Interesting!";
        let sender = undefined;

        // Parse group chat sender if present
        const match = text.match(/^\[(.*?)]: (.*)/);
        if (match) {
            sender = match[1];
            text = match[2];
        }

        return { text, sender };
    } catch (e) {
        console.error(e);
        return { text: "I can't reply right now." };
    }
}