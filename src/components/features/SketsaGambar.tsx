import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { SketchIcon, DownloadIcon, SparklesIcon } from '../icons';

export const SketsaGambar: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [colorStyle, setColorStyle] = useState('realistic');
  const [description, setDescription] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const colorStyles = [
    { id: 'realistic', name: '📷 Realistic', desc: 'Foto nyata' },
    { id: 'vibrant', name: '🎨 Vibrant', desc: 'Warna cerah' },
    { id: 'artistic', name: '🖌️ Artistic', desc: 'Seni lukisan' },
    { id: 'anime', name: '✨ Anime', desc: 'Gaya anime' },
  ];

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) {
      alert('Mohon upload sketsa gambar');
      return;
    }

    const stylePrompts: Record<string, string> = {
      realistic: 'Transform this black and white sketch into a realistic full-color photograph with natural lighting, photorealistic details, accurate colors, proper shading and highlights, lifelike textures, and professional photo quality.',
      vibrant: 'Transform this black and white sketch into a vibrant colorful image with bold bright colors, saturated hues, energetic color palette, dynamic contrast, eye-catching vibrancy, and artistic color enhancement.',
      artistic: 'Transform this black and white sketch into an artistic colored painting with painterly brushstrokes, artistic color harmony, expressive colors, fine art aesthetics, traditional painting style, and museum-quality artistry.',
      anime: 'Transform this black and white sketch into a colorful anime-style illustration with anime color palette, cel-shaded coloring, characteristic anime aesthetics, vibrant anime colors, and Japanese animation art style.',
    };

    const descInfo = description.trim() ? ` Additional context: ${description}` : '';
    const finalPrompt = stylePrompts[colorStyle] + descInfo + ' Maintain the original composition and structure while adding appropriate colors naturally.';

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `sketsa-colored-${colorStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <SketchIcon className="w-10 h-10 text-violet-500" />
            <h1 className="text-3xl font-bold text-gray-800">Sketsa Gambar</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ubah sketsa hitam putih menjadi gambar berwarna yang hidup
          </p>
        </div>

        {/* Color Style Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gaya Pewarnaan:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colorStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setColorStyle(style.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  colorStyle === style.id
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-gray-200 hover:border-violet-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{style.name}</div>
                <div className="text-xs text-gray-600">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Description Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Tambahan (Opsional):
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Misal: pemandangan gunung dengan langit biru, portrait wanita dengan rambut hitam..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Deskripsi membantu AI memahami warna yang tepat untuk sketsa Anda
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={1}
            accept="image/*"
            title="Upload sketsa hitam putih Anda"
          />
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Tips:</strong> Untuk hasil terbaik, upload sketsa dengan garis yang jelas dan tidak terlalu kabur.
            </p>
          </div>
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Mewarnai Sketsa...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Warnai Sketsa
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sketsa Berwarna:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Sketsa berwarna" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Gambar
                </button>
                <button
                  onClick={() => {
                    reset();
                    setUploadedFiles([]);
                    setDescription('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Warnai Sketsa Lain
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
