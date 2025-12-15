import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapItem, PortfolioAnalysisResult, Job } from "../types";
import { getFallbackRoadmap, MOCK_JOBS } from "../constants";
import { Language } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const generatePersonalizedRoadmap = async (
  answers: { q1: string; q2: string; q3: string },
  language: string
): Promise<RoadmapItem[]> => {
  
  // Use fallback based on language if no API key
  const langEnum = (language === 'EN' ? Language.EN : language === 'ES' ? Language.ES : Language.PT);

  if (!apiKey) {
    console.warn("API Key missing, returning mock roadmap");
    return getFallbackRoadmap(langEnum);
  }

  const prompt = `
    Create a personalized study roadmap for a beginner in Tech.
    User Profile: Experience: ${answers.q1}, Time: ${answers.q2}, Goal: ${answers.q3}.
    
    IMPORTANT: The response MUST be in ${language} language. Do not mix languages.
    
    STRICT RULES:
    1. Return exactly 6 modules.
    2. Each module MUST have a 'steps' array with 3-4 simple steps.
    3. Use simplified validation types: 'manual', 'link', or 'checkbox'.
    4. NO external links. All deliverables must be internal text or generic instructions.
    5. Instructions should be short and direct.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['locked', 'active', 'completed'] },
              type: { type: Type.STRING, enum: ['video', 'project', 'reading', 'soft-skill'] },
              category: { type: Type.STRING, enum: ['tech', 'soft'] },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    example: { type: Type.STRING },
                    deliverable: { type: Type.STRING },
                    validationType: { type: Type.STRING, enum: ['manual', 'link', 'checkbox'] },
                    isCompleted: { type: Type.BOOLEAN }
                  },
                  required: ['id', 'title', 'description', 'instructions', 'deliverable', 'validationType', 'isCompleted']
                }
              }
            },
            required: ['id', 'title', 'description', 'status', 'type', 'category', 'steps']
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");
    
    const items = JSON.parse(text) as RoadmapItem[];
    return items.map(item => ({
      ...item,
      steps: item.steps || []
    }));

  } catch (error) {
    console.error("Gemini Roadmap Error:", error);
    return getFallbackRoadmap(langEnum);
  }
};

export const getChatResponse = async (message: string, language: string): Promise<string> => {
  if (!apiKey) {
    // Fallback logic
    const lowerMsg = message.toLowerCase();
    const isEn = language === 'EN';
    
    if (lowerMsg.includes("vaga") || lowerMsg.includes("job")) {
        return isEn ? "Check the Jobs tab for opportunities." : "Para encontrar vagas, consulte a aba 'Vagas'.";
    }
    return isEn ? "I am your TechPath mentor. I can help with internal app questions." : "Como seu Mentor TechPath, posso ajudar com dúvidas sobre o app, trilhas ou carreira.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are TechBot, an internal AI Mentor for the TechPath app.
        
        CRITICAL: Respond ONLY in ${language}.
        
        CRITICAL BEHAVIOR RULES:
        1. NEVER provide external real-world links (no Google, no LinkedIn, no Blogs).
        2. If you need to recommend a job, use this EXACT format: "Confira a vaga de [Cargo] na [Empresa Fictícia] em https://app.exemplo.com/vaga/id".
        3. If you need to recommend news, use: "Li uma matéria no [Portal Fictício] em https://app.exemplo.com/noticia/id".
        4. Base your answers ONLY on the user's input. Do NOT infer things they haven't told you.
        5. If you lack data, say you don't know politely.
        6. Be short, encouraging, and safe.
        
        User message: ${message}
      `
    });
    return response.text || "Estou processando sua dúvida, tente novamente.";
  } catch (e) {
    return "Desculpe, estou com uma sobrecarga momentânea. Tente novamente em instantes.";
  }
};

export const analyzeProjectUrl = async (url: string): Promise<PortfolioAnalysisResult> => {
  if (!apiKey) {
    await new Promise(r => setTimeout(r, 2000));
    return {
      score: 75,
      complexityLevel: 'Iniciante',
      strengths: ['HTML Semântico', 'Código organizado'],
      weaknesses: ['Falta responsividade', 'Sem testes'],
      suggestions: ['Adicionar media queries', 'Criar README.md'],
      linkedinPost: "🚀 Finalizei meu projeto no TechPath! \n\nPratiquei HTML e CSS criando uma interface responsiva.\n\n#frontend #techpath #deviniciante"
    };
  }

  const prompt = `
    Analyze this project URL context: ${url}.
    Assume it is a beginner project.
    
    STRICT RULES:
    1. Do NOT browse the real internet. Simulate the analysis based on the context of a beginner project.
    2. Do NOT suggest real external courses or paid tools.
    3. Keep suggestions internal to code improvements.
    
    Return JSON format like PortfolioAnalysisResult.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                    complexityLevel: { type: Type.STRING, enum: ['Iniciante', 'Intermediário', 'Avançado'] },
                    score: { type: Type.NUMBER },
                    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    linkedinPost: { type: Type.STRING }
                },
                required: ['strengths', 'weaknesses', 'complexityLevel', 'score', 'suggestions', 'linkedinPost']
            }
        }
    });
    return JSON.parse(response.text!) as PortfolioAnalysisResult;
  } catch (e) {
    return {
        score: 0,
        complexityLevel: 'Iniciante',
        strengths: [],
        weaknesses: [],
        suggestions: ['Erro ao analisar.'],
        linkedinPost: ''
    };
  }
};

export const getAIJobRecommendations = async (): Promise<Job[]> => {
    if (!apiKey) {
        await new Promise(r => setTimeout(r, 2000));
        return MOCK_JOBS.slice(0,3).map(j => ({
            ...j,
            matchScore: Math.floor(Math.random() * (99 - 70) + 70),
            matchReason: "Perfil compatível com os requisitos de nível Estágio/Júnior.",
            missingSkills: ["Git Flow", "Scrum Básico"]
        }));
    }

    const prompt = `
      Generate 3 FICTIONAL job recommendations for a beginner developer.
      
      CRITICAL RULES:
      1. Company names MUST be fictional (e.g., 'InovaSoft', 'TechSim').
      2. URLs MUST be format: 'https://app.exemplo.com/vaga/{random_id}'.
      3. Platform MUST be 'Interna'.
      4. Do NOT use real companies (Google, Amazon, etc.).
      
      Return JSON array of Job objects.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                location: { type: Type.STRING },
                type: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                level: { type: Type.STRING, enum: ['Estágio', 'Júnior', 'Trainee', 'Pleno'] },
                platform: { type: Type.STRING, enum: ['Interna'] },
                url: { type: Type.STRING },
                description: { type: Type.STRING },
                requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                salary: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                matchReason: { type: Type.STRING },
                missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['id', 'title', 'company', 'url', 'platform', 'matchScore', 'matchReason']
            }
          }
        }
      });
      return JSON.parse(response.text!) as Job[];
    } catch (e) {
      return MOCK_JOBS;
    }
}
