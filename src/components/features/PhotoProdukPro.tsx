import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { ProductIcon, DownloadIcon, SparklesIcon } from '../icons';

export const PhotoProdukPro: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [productStyle, setProductStyle] = useState('minimalist');
  const [background, setBackground] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const styles = [
    { id: 'minimalist', name: '✨ Minimalist', desc: 'Clean & simple' },
    { id: 'luxury', name: '💎 Luxury', desc: 'Premium & elegant' },
    { id: 'lifestyle', name: '🌿 Lifestyle', desc: 'Natural & casual' },
    { id: 'studio', name: '📸 Studio', desc: 'Professional shot' },
  ];

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) {
      alert('Mohon upload foto produk');
      return;
    }

    const stylePrompts: Record<string, string> = {
      minimalist: 'Create a minimalist professional product photography with clean white background, perfect lighting, sharp focus, commercial quality, e-commerce ready, studio-quality details, and modern minimalist aesthetics.',
      luxury: 'Create a luxury premium product photography with elegant styling, sophisticated lighting, high-end presentation, rich textures, luxury brand quality, dramatic shadows, and premium commercial appeal.',
      lifestyle: 'Create a lifestyle product photography with natural setting, authentic context, real-world usage scenario, natural lighting, relatable environment, lifestyle brand aesthetics, and approachable commercial appeal.',
      studio: 'Create a professional studio product photography with controlled lighting setup, gradient background, commercial grade quality, catalog-ready presentation, perfect color accuracy, and advertising-standard excellence.',
    };

    const bgInfo = background.trim() ? ` Background: ${background}.` : '';
    const descInfo = productDesc.trim() ? ` Product details: ${productDesc}.` : '';
    const finalPrompt = stylePrompts[productStyle] + bgInfo + descInfo + ' Ensure the product is the main focus with perfect clarity and commercial presentation quality.';

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `product-${productStyle}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ProductIcon className="w-10 h-10 text-teal-500" />
            <h1 className="text-3xl font-bold text-gray-800">Photo Produk Pro</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buat foto produk profesional berkualitas komersial untuk toko online Anda
          </p>
        </div>

        {/* Style Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gaya Fotografi Produk:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setProductStyle(style.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  productStyle === style.id
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{style.name}</div>
                <div className="text-xs text-gray-600">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Background Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background/Setting (Opsional):
            </label>
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Misal: marble table, wooden desk, outdoor garden..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Produk (Opsional):
            </label>
            <input
              type="text"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              placeholder="Misal: skincare bottle, sneakers, coffee cup..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={1}
            accept="image/*"
            title="Upload foto produk Anda"
            description="Format: JPG, PNG, WEBP"
          />
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>💡 Tips:</strong> Upload foto produk dengan angle yang jelas untuk hasil terbaik. AI akan membuat background dan lighting profesional.
            </p>
          </div>
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Foto Produk...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Foto Produk Pro
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Result */}
        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Foto Produk Profesional:</h3>
            <div className="space-y-4">
              <img
                src={generatedImage}
                alt="Foto produk"
                className="w-full rounded-lg shadow-md"
              />
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
                    setBackground('');
                    setProductDesc('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Buat Foto Produk Lain
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
