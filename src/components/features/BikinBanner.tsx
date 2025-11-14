import React, { useState } from 'react';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { BannerIcon, DownloadIcon, SparklesIcon } from '../icons';

export const BikinBanner: React.FC = () => {
  const [bannerType, setBannerType] = useState('promo');
  const [productName, setProductName] = useState('');
  const [tagline, setTagline] = useState('');
  const [colors, setColors] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const bannerTypes = [
    { id: 'promo', name: '🎉 Promo', desc: 'Diskon & penawaran' },
    { id: 'product', name: '📦 Product', desc: 'Launch produk' },
    { id: 'event', name: '🎪 Event', desc: 'Acara & kegiatan' },
    { id: 'social', name: '📱 Social Media', desc: 'Konten sosmed' },
  ];

  const handleGenerate = () => {
    if (!productName.trim()) {
      alert('Mohon isi nama produk/judul');
      return;
    }

    const typePrompts: Record<string, string> = {
      promo: `Create an eye-catching promotional banner with bold discount offers, vibrant attractive colors, clear call-to-action, modern design layout, and marketing effectiveness. Product/offer: ${productName}`,
      product: `Create a professional product launch banner with premium product showcase, elegant minimalist design, brand-focused composition, high-quality visuals, and commercial appeal. Product: ${productName}`,
      event: `Create an exciting event banner with event information hierarchy, engaging visual elements, date/time prominence, dynamic composition, and event marketing effectiveness. Event: ${productName}`,
      social: `Create a social media banner optimized for engagement with trendy modern design, social-friendly dimensions, shareable visual appeal, platform-appropriate styling. Content: ${productName}`,
    };

    const colorInfo = colors.trim() ? ` Use color scheme: ${colors}.` : '';
    const taglineInfo = tagline.trim() ? ` Include tagline: "${tagline}".` : '';

    const finalPrompt = typePrompts[bannerType] + colorInfo + taglineInfo + ' Design should be professional, modern, and attention-grabbing with clear typography and balanced composition.';

    // Generate with empty file array since this is text-to-image
    generateImage([], finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `banner-${bannerType}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BannerIcon className="w-10 h-10 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Bikin Banner</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Desain banner promosi profesional dengan AI dalam hitungan detik
          </p>
        </div>

        {/* Banner Type */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipe Banner:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bannerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBannerType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  bannerType === type.id
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{type.name}</div>
                <div className="text-xs text-gray-600">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Produk/Judul Banner: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Misal: Flash Sale 50%, Grand Opening, dll"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline/Slogan (Opsional):
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Misal: Hanya Hari Ini!, Buruan Sebelum Kehabisan"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warna/Tema (Opsional):
            </label>
            <input
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              placeholder="Misal: merah & kuning, elegant hitam gold, fresh hijau"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Generate Button */}
        {!generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !productName.trim()}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Banner...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Banner
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Banner Anda:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Banner" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Banner
                </button>
                <button
                  onClick={() => {
                    reset();
                    setProductName('');
                    setTagline('');
                    setColors('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Buat Banner Baru
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
