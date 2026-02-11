
import { GoogleGenAI } from "@google/genai";

export interface SearchResult {
  text: string;
  links: { uri: string; title: string }[];
}

export const searchService = {
  /**
   * Realiza uma busca técnica fundamentada no Google Search.
   */
  async technicalSearch(query: string): Promise<SearchResult | null> {
    if (!process.env.API_KEY) return null;
    // Fix: Always instantiate GoogleGenAI with named parameter right before use
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Como um especialista técnico, responda detalhadamente: ${query}. Forneça passos técnicos, especificações ou links para manuais se disponíveis.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const links = groundingChunks
        ?.filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          uri: chunk.web.uri,
          title: chunk.web.title,
        })) || [];

      return {
        // Fix: accessing .text property directly
        text: response.text || "Não foi possível obter uma resposta.",
        links: links,
      };
    } catch (error) {
      console.error("Erro no Search Grounding:", error);
      return null;
    }
  }
};
