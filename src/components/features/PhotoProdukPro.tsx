import React, { useState } from 'react';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { ProductIcon, DownloadIcon, SparklesIcon, UploadIcon, UndoIcon, ImageIcon } from '../icons';

interface PhotoProdukProProps {
  onOpenSettings?: () => void;
}

export const PhotoProdukPro: React.FC<PhotoProdukProProps> = ({ onOpenSettings }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [style, setStyle] = useState('studio');
  const [background, setBackground] = useState('');
  const [description, setDescription] = useState('');

  const { generateImage, isLoading, error, generatedImage, reset } = useImageGeneration();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerate = () => {
    if (!selectedImage) return;

    const prompt = `Professional product photography of a product, style: ${style}, background: ${background}, additional details: ${description}. High quality, 4k, photorealistic.`;
    generateImage([selectedImage], prompt);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <ProductIcon className="w-8 h-8 text-teal-500 dark:text-cyan-400" />
          <div>
            <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">Photo Produk Pro</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Buat foto produk profesional dengan AI</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Upload Foto Produk</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-teal-500 dark:hover:border-cyan-400 transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <UploadIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Klik atau tarik file ke sini</p>
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">2. Pengaturan Foto</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gaya Foto</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="studio">Studio Minimalis</option>
                  <option value="lifestyle">Lifestyle / Alam</option>
                  <option value="luxury">Mewah / Elegan</option>
                  <option value="colorful">Warna-warni Pop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latar Belakang</label>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Contoh: Meja kayu, pantai pasir putih..."
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detail Tambahan</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi tambahan untuk hasil yang lebih akurat..."
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 h-24 resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!selectedImage || isLoading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold shadow-lg transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Generate Foto
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                  <p>{error}</p>
                  {(error.includes('API Key') || error.includes('401')) && onOpenSettings && (
                    <button
                      onClick={onOpenSettings}
                      className="mt-2 text-xs font-bold underline hover:text-red-800"
                    >
                      Buka Pengaturan API Key
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full min-h-[400px]">
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Hasil</h3>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden relative group">
              {generatedImage ? (
                <>
                  <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={generatedImage}
                      download="foto-produk-pro.png"
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Download"
                    >
                      <DownloadIcon className="w-6 h-6 text-gray-800" />
                    </a>
                    <button
                      onClick={reset}
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Reset"
                    >
                      <UndoIcon className="w-6 h-6 text-gray-800" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p>Hasil foto akan muncul di sini</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
