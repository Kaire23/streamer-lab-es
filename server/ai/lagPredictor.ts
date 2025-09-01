import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable must be set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StreamConfig {
  resolution: string;
  fps: number;
  bitrate: number;
  encoder: string;
  cpuModel: string;
  gpuModel: string;
  ramGB: number;
  uploadSpeedMbps: number;
  currentCpuUsage: number;
  gameBeingStreamed?: string;
  obsVersion: string;
  operatingSystem: string;
}

export interface LagPrediction {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  predictedIssues: string[];
  recommendations: string[];
  optimizedSettings: Partial<StreamConfig>;
  reasoning: string;
}

export class LagPredictor {
  async analyzeLagRisk(config: StreamConfig): Promise<LagPrediction> {
    try {
      const prompt = `
        Eres un experto en streaming y optimización de OBS con más de 10 años de experiencia ayudando a streamers profesionales. Analiza esta configuración de streaming y predice posibles problemas de lag:

        CONFIGURACIÓN ACTUAL:
        - Resolución: ${config.resolution}
        - FPS: ${config.fps}
        - Bitrate: ${config.bitrate} kbps
        - Encoder: ${config.encoder}
        - CPU: ${config.cpuModel}
        - GPU: ${config.gpuModel}
        - RAM: ${config.ramGB} GB
        - Velocidad de subida: ${config.uploadSpeedMbps} Mbps
        - Uso actual de CPU: ${config.currentCpuUsage}%
        - Juego: ${config.gameBeingStreamed || 'No especificado'}
        - Versión OBS: ${config.obsVersion}
        - Sistema operativo: ${config.operatingSystem}

        Proporciona un análisis detallado y predice problemas potenciales basándote en:
        1. La relación entre hardware y configuración
        2. Patrones comunes que causan lag en streaming
        3. Limitaciones conocidas de hardware específico
        4. Configuraciones óptimas para el setup dado

        Responde en formato JSON con esta estructura exacta:
        {
          "riskLevel": "low|medium|high|critical",
          "riskScore": 0-100,
          "predictedIssues": ["problema1", "problema2"],
          "recommendations": ["recomendación1", "recomendación2"],
          "optimizedSettings": {
            "resolution": "nueva_resolución",
            "fps": nuevo_fps,
            "bitrate": nuevo_bitrate,
            "encoder": "nuevo_encoder"
          },
          "reasoning": "explicación detallada del análisis"
        }
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "Eres un experto técnico en streaming y OBS Studio. Siempre respondes en español y proporcionas análisis técnicos precisos basados en datos reales de hardware y configuraciones de streaming."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        riskLevel: result.riskLevel || 'medium',
        riskScore: result.riskScore || 50,
        predictedIssues: result.predictedIssues || [],
        recommendations: result.recommendations || [],
        optimizedSettings: result.optimizedSettings || {},
        reasoning: result.reasoning || 'Análisis no disponible'
      };

    } catch (error) {
      console.error("Error analyzing lag risk:", error);
      throw new Error("Error al analizar el riesgo de lag: " + (error as Error).message);
    }
  }

  async generatePersonalizedTips(config: StreamConfig, userGoals: string): Promise<string[]> {
    try {
      const prompt = `
        Como experto en streaming, proporciona 5-7 consejos específicos y personalizados para mejorar esta configuración de streaming:

        CONFIGURACIÓN: ${JSON.stringify(config)}
        OBJETIVOS DEL USUARIO: ${userGoals}

        Los consejos deben ser:
        - Específicos para este hardware y configuración
        - Accionables y fáciles de implementar
        - Ordenados por impacto (más importante primero)
        - En español y técnicamente precisos

        Responde como un array JSON de strings.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "Eres un experto en optimización de streaming. Respondes solo con arrays JSON de consejos técnicos específicos."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result.tips || result.consejos || [];

    } catch (error) {
      console.error("Error generating personalized tips:", error);
      return ["Error al generar consejos personalizados"];
    }
  }

  async predictOptimalSettings(config: StreamConfig): Promise<Partial<StreamConfig>> {
    try {
      // Calculate optimal settings based on hardware capabilities
      const cpuScore = this.calculateCpuScore(config.cpuModel);
      const gpuScore = this.calculateGpuScore(config.gpuModel);
      
      let optimalResolution = config.resolution;
      let optimalFps = config.fps;
      let optimalBitrate = config.bitrate;
      let optimalEncoder = config.encoder;

      // Adjust based on upload speed
      const maxBitrate = Math.floor(config.uploadSpeedMbps * 0.8 * 1000); // 80% of upload speed

      if (config.bitrate > maxBitrate) {
        optimalBitrate = maxBitrate;
        
        // If we need to reduce bitrate significantly, also reduce resolution/fps
        if (optimalBitrate < 3000) {
          optimalResolution = "1280x720";
          optimalFps = 30;
        }
      }

      // Adjust encoder based on hardware
      if (gpuScore > cpuScore && config.encoder === "x264") {
        if (config.gpuModel.toLowerCase().includes("nvidia")) {
          optimalEncoder = "NVIDIA NVENC H.264";
        } else if (config.gpuModel.toLowerCase().includes("amd")) {
          optimalEncoder = "AMD AMF H.264";
        }
      }

      // CPU overload protection
      if (config.currentCpuUsage > 80) {
        if (config.resolution.includes("1920")) {
          optimalResolution = "1280x720";
        }
        if (config.fps > 30) {
          optimalFps = 30;
        }
      }

      return {
        resolution: optimalResolution,
        fps: optimalFps,
        bitrate: optimalBitrate,
        encoder: optimalEncoder
      };

    } catch (error) {
      console.error("Error predicting optimal settings:", error);
      return {};
    }
  }

  private calculateCpuScore(cpuModel: string): number {
    const cpu = cpuModel.toLowerCase();
    
    // Intel scoring
    if (cpu.includes("i9")) return 90;
    if (cpu.includes("i7")) return 80;
    if (cpu.includes("i5")) return 65;
    if (cpu.includes("i3")) return 40;
    
    // AMD scoring
    if (cpu.includes("ryzen 9")) return 92;
    if (cpu.includes("ryzen 7")) return 82;
    if (cpu.includes("ryzen 5")) return 68;
    if (cpu.includes("ryzen 3")) return 45;
    
    return 50; // Default score
  }

  private calculateGpuScore(gpuModel: string): number {
    const gpu = gpuModel.toLowerCase();
    
    // NVIDIA RTX scoring
    if (gpu.includes("rtx 4090")) return 100;
    if (gpu.includes("rtx 4080")) return 95;
    if (gpu.includes("rtx 4070")) return 88;
    if (gpu.includes("rtx 4060")) return 75;
    if (gpu.includes("rtx 3080")) return 90;
    if (gpu.includes("rtx 3070")) return 82;
    if (gpu.includes("rtx 3060")) return 70;
    
    // NVIDIA GTX scoring
    if (gpu.includes("gtx 1660")) return 60;
    if (gpu.includes("gtx 1650")) return 50;
    if (gpu.includes("gtx 1050")) return 35;
    
    // AMD scoring
    if (gpu.includes("rx 7900")) return 92;
    if (gpu.includes("rx 6800")) return 85;
    if (gpu.includes("rx 6700")) return 75;
    if (gpu.includes("rx 580")) return 55;
    
    return 40; // Default score
  }
}

export const lagPredictor = new LagPredictor();