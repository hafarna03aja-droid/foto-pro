import React, { useState, useEffect } from 'react';
import { useApiProvider } from '../../contexts/ApiProviderContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const LOCAL_KEY = 'foto_pro_api_key';
const PROVIDER_KEY = 'foto_pro_api_provider';
const PROVIDERS = [
  { value: 'google', label: 'Google AI (Gemini)' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'openrouter', label: 'OpenRouter' },
  { value: 'maia', label: 'Maia Router' },
];


  const { apiKey, provider, setApiKey, setProvider } = useApiProvider();
  const [inputKey, setInputKey] = useState(apiKey);
  const [inputProvider, setInputProvider] = useState(provider);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey);
      setInputProvider(provider);
      setMessage(null);
      setMessageType(null);
    }
  }, [isOpen, apiKey, provider]);

  // Validasi dinamis sesuai provider
  const validateKey = (key: string, provider: string) => {
    if (!key || key.length < 20) return false;
    if (provider === 'google') return key.length >= 30 && key.startsWith('AIza');
    if (provider === 'openai') return key.startsWith('sk-');
    if (provider === 'openrouter') return key.length >= 20;
    if (provider === 'maia') return key.length >= 20;
    return true;
  };

  const handleSave = () => {
    if (!validateKey(inputKey, inputProvider)) {
      setMessage('API key tidak valid untuk provider ' + PROVIDERS.find(p => p.value === inputProvider)?.label);
      setMessageType('error');
      return;
    }
    setApiKey(inputKey);
    setProvider(inputProvider as any);
    setMessage('API key berhasil disimpan!');
    setMessageType('success');
    onClose();
  };

  const handleDelete = () => {
    setApiKey('');
    setProvider('google');
    setInputKey('');
    setInputProvider('google');
    setMessage('API key berhasil dihapus. Akan menggunakan default dari .env.');
    setMessageType('success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Pengaturan API Key</h2>
        <label className="block mb-2 text-sm font-semibold">Provider API</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={inputProvider}
          onChange={e => setInputProvider(e.target.value)}
        >
          {PROVIDERS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder={`Masukkan API Key ${PROVIDERS.find(p => p.value === inputProvider)?.label}`}
          value={inputKey}
          onChange={e => setInputKey(e.target.value)}
        />
        {provider === 'google' && (
          <p className="text-xs mb-2 text-gray-500">Google: <a href='https://makersuite.google.com/app/apikey' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>Cara mendapatkan API key</a></p>
        )}
        {provider === 'openai' && (
          <p className="text-xs mb-2 text-gray-500">OpenAI: <a href='https://platform.openai.com/api-keys' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>Buat API key di OpenAI</a></p>
        )}
        {provider === 'openrouter' && (
          <p className="text-xs mb-2 text-gray-500">OpenRouter: <a href='https://openrouter.ai/' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>Daftar di OpenRouter</a></p>
        )}
        {provider === 'maia' && (
          <p className="text-xs mb-2 text-gray-500">Maia: <a href='https://maia.router.ai/' target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>Daftar di Maia Router</a></p>
        )}
        {message && (
          <div className={`mb-2 text-sm ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message}</div>
        )}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Batal</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>Simpan</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Hapus</button>
        </div>
      </div>
    </div>
  );
};
