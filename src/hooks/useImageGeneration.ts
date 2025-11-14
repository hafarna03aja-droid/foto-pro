import { useState } from 'react';
import { API_CONFIG, validateApiKey } from '../utils/apiConfig';

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

  const generateImage = async (files: File[], prompt: string) => {
    if (!validateApiKey()) {
      const errorMsg = 'API Key tidak ditemukan. Silakan tambahkan VITE_API_KEY di file .env';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Import dinamis untuk menghindari error jika package belum terinstall
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      
      const genAI = new GoogleGenerativeAI(API_CONFIG.googleAI.apiKey);
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
