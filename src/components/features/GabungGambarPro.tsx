import React, { useState, useRef } from 'react';
import { CombineIcon, UploadIcon, XIcon } from '../icons';
import { useImageGeneration } from '../../hooks/useImageGeneration';

export const GabungGambarPro: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
        setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleGenerate = () => {
    if (uploadedFiles.length < 1) {
      reset();
      return;
    }
    // Gabung prompt default untuk fitur ini
    const prompt = 'Gabungkan gambar-gambar ini menjadi satu komposisi profesional dengan kualitas HD.';
    generateImage(uploadedFiles, prompt);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <CombineIcon className="w-8 h-8 text-teal-500" />
          <div>
            <h2 className="font-bold text-xl text-gray-800">Gabung Gambar Profesional</h2>
            <p className="text-sm text-gray-500">Kombinasikan gambar dengan Kualitas HD</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Upload Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition cursor-pointer p-8 text-center"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" accept="image/*" />
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <UploadIcon className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="font-semibold text-gray-800">Seret & Lepas gambar di sini</h3>
                <p className="text-gray-500 text-sm">atau klik untuk memilih file</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">Gambar Diunggah ({uploadedFiles.length})</h4>
                {uploadedFiles.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="relative aspect-square group">
                                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover rounded-lg shadow-sm" />
                                <button
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-8">
                        <p>Pratinjau gambar akan muncul di sini</p>
                    </div>
                )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <aside className="w-full md:w-80 bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pengaturan</h3>
            
            <button 
                onClick={handleGenerate}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-400" 
                disabled={uploadedFiles.length === 0 || isLoading}
            >
                {isLoading ? 'Memproses...' : 'Buat Gambar'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            {generatedImage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-semibold mb-2">Gambar berhasil digabung!</p>
                <img src={generatedImage} alt="Gabungan" className="w-full rounded-lg shadow" />
                <a href={generatedImage} download className="block mt-2 text-teal-600 underline">Download</a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
