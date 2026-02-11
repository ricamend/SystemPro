import { GoogleGenAI, Type } from "@google/genai";

export const aiService = {
  /**
   * Analisa a descrição de uma OS e sugere um checklist técnico e prioridade.
   */
  async suggestDiagnosis(description: string) {
    if (!process.env.API_KEY) return null;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analise o seguinte problema técnico e sugira um diagnóstico inicial, uma prioridade (low, medium, high, urgent) e um checklist de 5 passos obrigatórios: "${description}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              initialDiagnosis: { type: Type.STRING },
              suggestedPriority: { type: Type.STRING },
              suggestedChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["initialDiagnosis", "suggestedPriority", "suggestedChecklist"]
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Erro na análise da IA:", error);
      return null;
    }
  },

  /**
   * Analisa uma imagem de campo para identificar componentes e problemas.
   */
  async analyzeEvidenceImage(base64Image: string, mimeType: string) {
    if (!process.env.API_KEY) return null;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image.split(',')[1] || base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: 'Analise esta foto de manutenção. Identifique os componentes principais, procure sinais de danos (corrosão, vazamento, desgaste) e sugira uma ação técnica imediata em português.',
            },
          ],
        },
      });

      return response.text;
    } catch (error) {
      console.error("Erro na análise visual:", error);
      return "Não foi possível analisar a imagem no momento.";
    }
  },

  /**
   * Gera um relatório profissional de encerramento da OS.
   */
  async generateFinalReport(osData: any) {
    if (!process.env.API_KEY) return "Relatório gerado automaticamente (modo offline).";
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Com base nos dados desta manutenção: ${JSON.stringify(osData)}, escreva um relatório de encerramento profissional e curto (máximo 1 parágrafo) para o cliente. Foque no que foi resolvido e na garantia do serviço.`,
      });

      return response.text || "Manutenção concluída conforme padrões técnicos.";
    } catch (error) {
      return "Manutenção finalizada com sucesso.";
    }
  },

  /**
   * Gera um resumo executivo baseado nos dados do dashboard.
   */
  async generateDashboardInsights(stats: any) {
    if (!process.env.API_KEY) return "Conecte sua API Key para ver insights em tempo real.";
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Como um consultor de operações sênior, analise estes dados de hoje: ${JSON.stringify(stats)}. 
        Gere um insight curto (máx 3 frases) sobre produtividade e uma recomendação acionável.`,
      });

      return response.text || "Sem insights disponíveis no momento.";
    } catch (error) {
      return "Erro ao processar insights inteligentes.";
    }
  },

  /**
   * Resume o histórico do chat da equipe.
   */
  async summarizeChatHistory(messages: any[]) {
    if (!process.env.API_KEY) return null;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const chatContent = messages.map(m => `${m.senderName}: ${m.text}`).join('\n');
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Resuma os pontos principais desta conversa de equipe técnica em tópicos (Decisões e Pendências): \n\n${chatContent}`,
      });

      return response.text;
    } catch (error) {
      console.error("Erro na sumerização do chat:", error);
      return "Erro ao gerar resumo do chat.";
    }
  },

  /**
   * Gera um vídeo instrutivo para o técnico.
   */
  async generateInstructionVideo(prompt: string) {
    if (!process.env.API_KEY) throw new Error("API Key não encontrada.");
    // Fix: Always instantiate GoogleGenAI right before the API call to pick up the latest key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Video instruction for maintenance: ${prompt}. Professional, technical style, close-up on tools and parts.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      // Fix: Create fresh instance for status check call to pick up latest API key if it changed
      const freshAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
      operation = await freshAi.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
};