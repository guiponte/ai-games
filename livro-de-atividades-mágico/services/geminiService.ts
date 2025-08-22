import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Source, ActivityType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const IDEA_PROMPTS: Record<ActivityType, string> = {
    [ActivityType.Coloring]: "uma ideia simples e divertida para o desenho de uma criança, como 'um gato usando chapéu' ou 'um foguete no espaço'.",
    [ActivityType.Story]: "uma ideia simples para uma história infantil curta, sobre um personagem e um objetivo, como 'um coelho que queria encontrar o maior morango'.",
    [ActivityType.FunFact]: "um tópico simples e interessante para uma criança ter curiosidade, como 'dinossauros', 'o oceano' ou 'planetas'."
};

export async function generateIdea(activity: ActivityType): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Me dê apenas uma ideia para o prompt de uma criança. A ideia é sobre ${IDEA_PROMPTS[activity]}. Responda com a ideia e nada mais. Não use aspas.`,
        config: {
           temperature: 1,
        },
    });
    return response.text.trim();
}

export async function generateImage(prompt: string): Promise<string> {
  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: `Uma página de colorir para crianças, estilo de desenho de linha simples, contornos grossos, sem sombreamento, de: ${prompt}`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("Nenhuma imagem foi gerada.");
  }
  return response.generatedImages[0].image.imageBytes;
}

export async function generateStory(prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Escreva uma história infantil muito curta (cerca de 100 palavras) sobre ${prompt}.`,
        config: {
            systemInstruction: "Você é um contador de histórias criativo para crianças de 3 a 7 anos. Mantenha as histórias curtas, simples, positivas, com linguagem fácil e finais felizes.",
        },
    });
    return response.text;
}

export async function findFunFact(topic: string): Promise<{ fact: string, sources: Source[] }> {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Me diga um fato divertido e surpreendente para uma criança sobre ${topic}. Mantenha a resposta curta e fácil de entender.`,
        config: {
          tools: [{googleSearch: {}}],
        },
    });

    const fact = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    
    const sources: Source[] = groundingChunks
        .map((chunk: any) => chunk?.web)
        .filter((web: any) => web?.uri && web?.title)
        .map((web: any) => ({ uri: web.uri, title: web.title }));

    return { fact, sources };
}