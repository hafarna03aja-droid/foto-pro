import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { PhotographerIcon, DownloadIcon, SparklesIcon } from '../icons';

export const SewaFotografer: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [photoStyle, setPhotoStyle] = useState('professional');
  const [scene, setScene] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const styles = [
    { id: 'professional', name: '💼 Professional', desc: 'Corporate & formal' },
    { id: 'casual', name: '👕 Casual', desc: 'Santai & natural' },
    { id: 'glamour', name: '✨ Glamour', desc: 'Mewah & elegant' },
    { id: 'outdoor', name: '🌳 Outdoor', desc: 'Alam & adventure' },
  ];

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) return;

    const stylePrompts: Record<string, string> = {
      professional: 'Create a professional portrait photo with studio quality lighting, formal business attire, clean corporate background, confident expression, sharp focus, professional headshot composition, and executive photography standards.',
      casual: 'Create a casual lifestyle photo with natural relaxed pose, everyday comfortable clothing, candid authentic moments, soft natural lighting, approachable friendly expression, and lifestyle photography warmth.',
      glamour: 'Create a glamour photo with dramatic lighting, elegant sophisticated styling, luxurious setting, magazine-quality composition, perfect retouching, stunning visual appeal, and high-end glamour photography aesthetics.',
      outdoor: 'Create an outdoor portrait with natural environment background, golden hour lighting, adventure or nature setting, authentic outdoor moments, environmental storytelling, and outdoor photography excellence.',
    };

    const finalPrompt = scene.trim()
      ? `${stylePrompts[photoStyle]} Setting/scene: ${scene}`
      : stylePrompts[photoStyle];

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `fotografer-${photoStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <PhotographerIcon className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Sewa Fotografer AI</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dapatkan foto profesional dengan AI photographer dalam berbagai gaya
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
                onClick={() => setPhotoStyle(s.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  photoStyle === s.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{s.name}</div>
                <div className="text-xs text-gray-600">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scene Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Setting atau Lokasi (Opsional):
          </label>
          <input
            type="text"
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            placeholder="Misal: di kantor modern, di pantai, di taman..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={1}
            accept="image/*"
            title="Upload foto Anda"
          />
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Fotografer AI Bekerja...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Foto Profesional
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Foto:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Foto profesional" className="w-full rounded-lg shadow-md" />
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
