
import { GoogleGenAI } from "@google/genai";

export interface MapResource {
  text: string;
  places: { uri: string; title: string }[];
}

export const geoService = {
  /**
   * Encontra fornecedores ou recursos próximos utilizando Google Maps Grounding.
   */
  async findNearbyResources(query: string, lat?: number, lng?: number): Promise<MapResource | null> {
    if (!process.env.API_KEY) return null;
    // Fix: Always instantiate GoogleGenAI with named parameter right before use
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const config: any = {
        tools: [{ googleMaps: {} }],
      };

      if (lat && lng) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        };
      }

      const response = await ai.models.generateContent({
        // Fix: Use gemini-2.5 series model for maps grounding as required by guidelines
        model: "gemini-2.5-flash",
        contents: query,
        config: config,
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const places = groundingChunks
        ?.filter((chunk: any) => chunk.maps)
        .map((chunk: any) => ({
          uri: chunk.maps.uri,
          title: chunk.maps.title,
        })) || [];

      return {
        // Fix: accessing .text property directly
        text: response.text || "Nenhum local encontrado.",
        places: places,
      };
    } catch (error) {
      console.error("Erro no Maps Grounding:", error);
      return null;
    }
  },

  /**
   * Otimiza a rota de um técnico baseado em múltiplas OS pendentes.
   */
  async optimizeRoute(techLocation: { lat: number, lng: number }, orders: any[]) {
    if (!process.env.API_KEY) return null;
    // Fix: Always instantiate GoogleGenAI with named parameter right before use
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Baseado na localização atual do técnico ${JSON.stringify(techLocation)} e nestas ordens de serviço pendentes ${JSON.stringify(orders)}, sugira a ordem de visita mais eficiente para economizar combustível e tempo. Justifique brevemente cada passo.`,
      });

      // Fix: accessing .text property directly
      return response.text;
    } catch (error) {
      console.error("Erro na otimização de rota:", error);
      return null;
    }
  }
};
