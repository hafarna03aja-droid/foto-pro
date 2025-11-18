import React, { createContext, useContext, useState, useEffect } from 'react';

const LOCAL_KEY = 'foto_pro_api_key';
const PROVIDER_KEY = 'foto_pro_api_provider';

export type ApiProviderType = 'google' | 'openai' | 'openrouter' | 'maia';

interface ApiProviderContextProps {
  apiKey: string;
  provider: ApiProviderType;
  setApiKey: (key: string) => void;
  setProvider: (provider: ApiProviderType) => void;
}

const ApiProviderContext = createContext<ApiProviderContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('');
  const [provider, setProviderState] = useState<ApiProviderType>('google');

  useEffect(() => {
    const storedKey = localStorage.getItem(LOCAL_KEY) || '';
    const storedProvider = (localStorage.getItem(PROVIDER_KEY) as ApiProviderType) || 'google';
    setApiKeyState(storedKey);
    setProviderState(storedProvider);
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem(LOCAL_KEY, key);
  };

  const setProvider = (prov: ApiProviderType) => {
    setProviderState(prov);
    localStorage.setItem(PROVIDER_KEY, prov);
  };

  return (
    <ApiProviderContext.Provider value={{ apiKey, provider, setApiKey, setProvider }}>
      {children}
    </ApiProviderContext.Provider>
  );
};

export const useApiProvider = () => {
  const ctx = useContext(ApiProviderContext);
  if (!ctx) throw new Error('useApiProvider must be used within ApiProvider');
  return ctx;
};
