
import { GoogleGenAI } from "@google/genai";

export const getDesignAdvice = async (userPrompt: string) => {
  try {
    // Инициализируем клиент непосредственно перед вызовом для гарантии свежего API ключа
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "Ты — высококлассный AI-консьерж архитектурной студии VedArta. Твоя создательница — Ведана Ханчинская (23 года опыта). Твой тон: премиальный, глубокий, вдохновляющий. Ты используешь формулу 'от личности к пространству'. Давай экспертные советы по дизайну интерьера, архитектуре и материалам. Отвечай на русском языке."
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini Text Error:", error);
    throw error;
  }
};

export const generateDesignConceptImage = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Ultra-luxury photorealistic interior design in VedArta style: ${prompt}. Cinematic lighting, organic textures, emerald and gold details, warm beige tones, architectural digest quality, 8k.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};
