import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { ModelIcon, DownloadIcon, SparklesIcon } from '../icons';

export const FotoModel: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [modelType, setModelType] = useState('fashion');
  const [pose, setPose] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const modelTypes = [
    { id: 'fashion', name: '👗 Fashion', desc: 'High-end fashion' },
    { id: 'commercial', name: '📸 Commercial', desc: 'Iklan produk' },
    { id: 'editorial', name: '📰 Editorial', desc: 'Majalah style' },
    { id: 'lifestyle', name: '🌟 Lifestyle', desc: 'Natural & casual' },
  ];

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) return;

    const typePrompts: Record<string, string> = {
      fashion: 'Create a high-end fashion model photo with professional lighting, runway-worthy styling, elegant pose, sophisticated composition, magazine-quality appearance, perfect styling, and luxury fashion photography aesthetics.',
      commercial: 'Create a commercial model photo suitable for advertising with professional appearance, engaging expression, clean composition, product-friendly background, marketable look, and commercial photography standards.',
      editorial: 'Create an editorial model photo for magazine publication with artistic composition, strong visual storytelling, fashion-forward styling, creative lighting, unique perspective, and editorial photography excellence.',
      lifestyle: 'Create a lifestyle model photo with natural candid feel, relaxed authentic moments, casual elegant style, outdoor/indoor natural settings, approachable beauty, and lifestyle photography warmth.',
    };

    const finalPrompt = pose.trim()
      ? `${typePrompts[modelType]} Pose/scene: ${pose}`
      : typePrompts[modelType];

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `model-${modelType}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ModelIcon className="w-10 h-10 text-indigo-500" />
            <h1 className="text-3xl font-bold text-gray-800">Foto Model</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ciptakan foto model berkualitas tinggi untuk berbagai keperluan
          </p>
        </div>

        {/* Model Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipe Model Photography:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modelTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setModelType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  modelType === type.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{type.name}</div>
                <div className="text-xs text-gray-600">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pose Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pose atau Scene (Opsional):
          </label>
          <input
            type="text"
            value={pose}
            onChange={(e) => setPose(e.target.value)}
            placeholder="Misal: standing confident pose, sitting elegant, walking..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={1}
            accept="image/*"
            title="Upload foto yang ingin dijadikan foto model"
          />
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Foto Model...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Foto Model
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Foto Model:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Foto model" className="w-full rounded-lg shadow-md" />
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
