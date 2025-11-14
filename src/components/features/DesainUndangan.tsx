import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { EnvelopeIcon, DownloadIcon, SparklesIcon } from '../icons';

export const DesainUndangan: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [theme, setTheme] = useState('elegant');
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const themes = [
    { id: 'elegant', name: '💎 Elegant', desc: 'Klasik & mewah' },
    { id: 'modern', name: '✨ Modern', desc: 'Minimalis & clean' },
    { id: 'romantic', name: '💕 Romantic', desc: 'Soft & dreamy' },
    { id: 'traditional', name: '🏛️ Traditional', desc: 'Budaya & adat' },
  ];

  const handleGenerate = () => {
    if (!brideName.trim() || !groomName.trim()) {
      alert('Mohon isi nama pengantin');
      return;
    }

    const themePrompts: Record<string, string> = {
      elegant: 'Create an elegant luxury wedding invitation design with sophisticated gold accents, classic ornamental patterns, premium typography, refined color palette, formal composition, and timeless wedding elegance.',
      modern: 'Create a modern minimalist wedding invitation design with clean contemporary layout, simple elegant typography, subtle color scheme, geometric elements, uncluttered composition, and modern sophistication.',
      romantic: 'Create a romantic dreamy wedding invitation design with soft pastel colors, floral decorative elements, delicate typography, watercolor effects, gentle romantic atmosphere, and fairytale wedding aesthetics.',
      traditional: 'Create a traditional cultural wedding invitation design with authentic ethnic patterns, cultural motifs, heritage-inspired ornaments, traditional color schemes, and respectful cultural representation.',
    };

    const namesInfo = ` Names: ${brideName} & ${groomName}.`;
    const dateInfo = eventDate.trim() ? ` Date: ${eventDate}.` : '';
    const photoInfo = uploadedFiles.length > 0 ? ' Include the uploaded photo(s) in the design.' : '';

    const finalPrompt = themePrompts[theme] + namesInfo + dateInfo + photoInfo + ' Design should be beautiful, professional, print-ready, and perfect for digital sharing.';

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `undangan-${theme}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <EnvelopeIcon className="w-10 h-10 text-rose-500" />
            <h1 className="text-3xl font-bold text-gray-800">Desain Undangan</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buat undangan pernikahan digital yang indah dan profesional
          </p>
        </div>

        {/* Theme Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tema Undangan:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  theme === t.id
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{t.name}</div>
                <div className="text-xs text-gray-600">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Mempelai Wanita: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Mempelai Pria: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Acara (Opsional):
            </label>
            <input
              type="text"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Misal: Sabtu, 25 Desember 2025"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={2}
            accept="image/*"
            title="Upload foto pasangan (opsional)"
          />
        </div>

        {/* Generate Button */}
        {!generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !brideName.trim() || !groomName.trim()}
              className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Undangan...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Undangan
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Undangan Pernikahan:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Undangan" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Undangan
                </button>
                <button
                  onClick={() => {
                    reset();
                    setUploadedFiles([]);
                    setBrideName('');
                    setGroomName('');
                    setEventDate('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Buat Undangan Baru
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
