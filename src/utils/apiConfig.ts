export const API_CONFIG = {
  googleAI: {
    apiKey: import.meta.env.VITE_API_KEY || '',
    model: 'gemini-1.5-flash',
    textModel: 'gemini-1.5-pro',
    apiVersion: 'v1', // Menggunakan API v1 (stabil)
  },
};

export const validateApiKey = (): boolean => {
  if (!API_CONFIG.googleAI.apiKey) {
    console.error('API Key tidak ditemukan. Pastikan VITE_API_KEY sudah diset di file .env');
    return false;
  }
  return true;
};
