import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { WeddingIcon, DownloadIcon, SparklesIcon } from '../icons';

export const PreWedding: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [style, setStyle] = useState('cinematic');
  const [customPrompt, setCustomPrompt] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const styles = [
    { id: 'cinematic', name: '🎬 Sinematik', desc: 'Dramatis & emosional' },
    { id: 'romantic', name: '💕 Romantis', desc: 'Lembut & dreamy' },
    { id: 'vintage', name: '📷 Vintage', desc: 'Klasik & timeless' },
    { id: 'modern', name: '✨ Modern', desc: 'Clean & elegant' },
  ];

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) return;

    const stylePrompts: Record<string, string> = {
      cinematic: 'Create a cinematic pre-wedding photo with dramatic lighting, professional composition, emotional depth, film-like quality, beautiful bokeh effect, and romantic atmosphere. Style: movie poster aesthetic.',
      romantic: 'Create a romantic pre-wedding photo with soft pastel colors, dreamy atmosphere, gentle lighting, tender moments, beautiful background blur, and fairytale-like ambiance.',
      vintage: 'Create a vintage pre-wedding photo with classic film grain, timeless composition, warm sepia tones, nostalgic feeling, elegant poses, and retro photography aesthetics.',
      modern: 'Create a modern minimalist pre-wedding photo with clean lines, elegant simplicity, contemporary styling, natural lighting, sophisticated composition, and high-end fashion photography feel.',
    };

    const finalPrompt = customPrompt.trim() 
      ? `${stylePrompts[style]} Additional requirements: ${customPrompt}`
      : stylePrompts[style];

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `prewedding-${style}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <WeddingIcon className="w-10 h-10 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-800">Pre-Wedding</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buat foto pre-wedding sinematik dengan berbagai gaya profesional
          </p>
        </div>

        {/* Style Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pilih Gaya Foto:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  style === s.id
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{s.name}</div>
                <div className="text-xs text-gray-600">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Tambahan (Opsional):
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Misal: dengan latar pantai saat sunset, pakai gaun putih..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={2}
            accept="image/*"
            title="Upload foto pasangan (1-2 foto)"
          />
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Foto Pre-Wedding...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Foto Pre-Wedding
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Pre-Wedding:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Pre-wedding" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Foto
                </button>
                <button
                  onClick={() => {
                    reset();
                    setUploadedFiles([]);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Buat Lagi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
