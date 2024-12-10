interface ElevenLabsConfig {
  apiKey?: string;
  agentId: string;
}

export const getElevenLabsConfig = (): ElevenLabsConfig => {
  return {
    apiKey: process.env.ELEVENLABS_API_KEY,
    agentId: 'DStrRoRZWMGUQlEADkrj',
  };
};

export const validateConfig = (config: ElevenLabsConfig): boolean => {
  if (!config.apiKey) {
    console.error('Missing ElevenLabs API key');
    return false;
  }

  if (!config.agentId) {
    console.error('Missing ElevenLabs Agent ID');
    return false;
  }

  return true;
};
