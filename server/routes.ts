import type { Express } from "express";
import { getElevenLabsConfig, validateConfig } from "../client/src/lib/elevenlabs";

export function registerRoutes(app: Express) {
  app.get('/api/config/elevenlabs', (req, res) => {
    const config = getElevenLabsConfig();
    
    if (!validateConfig(config)) {
      return res.status(500).json({
        error: 'Missing ElevenLabs configuration'
      });
    }

    res.json({
      agentId: config.agentId
    });
  });
}
