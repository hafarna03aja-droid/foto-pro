

const LOCAL_KEY = 'foto_pro_api_key';
const PROVIDER_KEY = 'foto_pro_api_provider';

function getProvider() {
  if (typeof window !== 'undefined') {
    const localProvider = localStorage.getItem(PROVIDER_KEY);
    if (localProvider && localProvider.trim()) return localProvider;
  }
  return 'google'; // default
}

function getApiKey() {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem(LOCAL_KEY);
    if (localKey && localKey.trim()) return localKey;
  }
  return import.meta.env.VITE_API_KEY || '';
}

export const API_CONFIG = {
  provider: getProvider(),
  apiKey: getApiKey(),
  googleAI: {
    model: 'gemini-1.5-flash',
    textModel: 'gemini-1.5-pro',
    apiVersion: 'v1',
  },
  openai: {
    model: 'gpt-4',
    apiUrl: 'https://api.openai.com/v1',
  },
  openrouter: {
    apiUrl: 'https://openrouter.ai/api',
  },
  maia: {
    apiUrl: 'https://api.maiarouter.ai/v1/chat/completions',
  },
};

export const validateApiKey = (): boolean => {
  const key = getApiKey();
  if (!key) {
    console.error('API Key tidak ditemukan. Pastikan sudah diatur di Pengaturan atau VITE_API_KEY di file .env');
    return false;
  }
  return true;
};
