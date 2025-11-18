import { useState } from 'react';
import { API_CONFIG } from '../utils/apiConfig';
import { useApiProvider } from '../contexts/ApiProviderContext';

interface UseImageGenerationProps {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export const useImageGeneration = ({ onSuccess, onError }: UseImageGenerationProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const { apiKey, provider } = useApiProvider();
  const generateImage = async (files: File[], prompt: string) => {
    if (!apiKey) {
      const errorMsg = 'API Key tidak ditemukan. Silakan tambahkan di Pengaturan.';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (provider === 'google') {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: API_CONFIG.googleAI.model });
        const imageParts = await Promise.all(
          files.map(async (file) => ({
            inlineData: {
              data: await fileToBase64(file),
              mimeType: file.type,
            },
          }))
        );
        const parts = [
          ...imageParts,
          { text: prompt }
        ];
        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();
        if (text) {
          setGeneratedImage(text);
          onSuccess?.(text);
        } else {
          const errorMsg = 'AI tidak menghasilkan gambar. Coba lagi.';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } else if (provider === 'maia') {
        // Request ke Maia Router chat/completions
        const response = await fetch(API_CONFIG.maia.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: API_CONFIG.maia.model || 'maia-1.5', // model bisa diubah lewat konfigurasi
            messages: [
              { role: 'system', content: 'You are an AI image generator.' },
              { role: 'user', content: prompt },
            ],
            // Tambahkan parameter lain jika diperlukan
          }),
        });
        if (!response.ok) {
          let errorDetail = '';
          let errorDataRaw = '';
          try {
            const errorData = await response.json();
            errorDetail = errorData?.error?.message || JSON.stringify(errorData);
            errorDataRaw = JSON.stringify(errorData, null, 2);
          } catch (e) {
            errorDetail = response.statusText;
            errorDataRaw = response.statusText;
          }
          const errorMsg = `Maia API error: ${response.status} - ${errorDetail}`;
          setError(errorMsg);
          onError?.(errorMsg);
          console.error(errorMsg);
          // Jika error 400, tampilkan seluruh response body di UI
          if (response.status === 400) {
            alert('Maia API error 400 detail:\n' + errorDataRaw);
          }
          return;
        }
        const data = await response.json();
        // Asumsikan response berisi image url di data.choices[0].message.content
        const imageUrl = data.choices?.[0]?.message?.content;
        if (imageUrl) {
          setGeneratedImage(imageUrl);
          onSuccess?.(imageUrl);
        } else {
          const errorMsg = 'Maia tidak menghasilkan gambar. Response: ' + JSON.stringify(data);
          setError(errorMsg);
          onError?.(errorMsg);
          console.error(errorMsg);
        }
      } else if (provider === 'openai') {
        // Contoh request ke OpenAI (image generation)
        const response = await fetch(API_CONFIG.openai.apiUrl + '/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            n: 1,
            size: '1024x1024',
          }),
        });
        if (!response.ok) throw new Error('OpenAI API error: ' + response.statusText);
        const data = await response.json();
        if (data.data && data.data[0]?.url) {
          setGeneratedImage(data.data[0].url);
          onSuccess?.(data.data[0].url);
        } else {
          const errorMsg = 'OpenAI tidak menghasilkan gambar.';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } else if (provider === 'openrouter') {
        // Contoh request ke OpenRouter (image generation)
        const response = await fetch(API_CONFIG.openrouter.apiUrl + '/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            n: 1,
            size: '1024x1024',
          }),
        });
        if (!response.ok) throw new Error('OpenRouter API error: ' + response.statusText);
        const data = await response.json();
        if (data.data && data.data[0]?.url) {
          setGeneratedImage(data.data[0].url);
          onSuccess?.(data.data[0].url);
        } else {
          const errorMsg = 'OpenRouter tidak menghasilkan gambar.';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } else {
        setError('Provider belum didukung untuk generate gambar.');
        onError?.('Provider belum didukung untuk generate gambar.');
      }
    } catch (e: any) {
      const errorMsg = `Terjadi kesalahan: ${e.message}`;
      console.error(e);
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setGeneratedImage(null);
    setError(null);
  };

  return {
    isLoading,
    error,
    generatedImage,
    generateImage,
    reset,
  };
};
