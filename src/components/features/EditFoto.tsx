import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { SparklesIcon, DownloadIcon } from '../icons';

type EditMode = 'restorasi' | 'resmi';

export const EditFoto: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [editMode, setEditMode] = useState<EditMode>('restorasi');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const handleGenerate = () => {
    if (uploadedFiles.length === 0) return;

    const prompts = {
      restorasi: `Restore this old or damaged photo to its best quality. Remove scratches, fix colors, enhance details, improve clarity and sharpness. Make it look professionally restored while maintaining the original character and authenticity of the photo.`,
      resmi: `Transform this photo into a professional formal portrait suitable for official documents (ID card, passport, resume). Ensure: proper formal composition, clean white/blue background, good lighting, professional appearance, sharp focus, appropriate facial expression, and meet standard photo requirements.`
    };

    generateImage(uploadedFiles, prompts[editMode]);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `foto-${editMode}-${Date.now()}.png`;
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
            <SparklesIcon className="w-10 h-10 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-800">Edit Foto</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Restorasi foto lama yang rusak atau ubah foto menjadi foto resmi profesional
          </p>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pilih Mode Edit:
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setEditMode('restorasi')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                editMode === 'restorasi'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold mb-1">🔧 Restorasi Foto</div>
              <div className="text-sm text-gray-600">Perbaiki foto lama/rusak</div>
            </button>
            <button
              onClick={() => setEditMode('resmi')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                editMode === 'resmi'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold mb-1">📸 Foto Resmi</div>
              <div className="text-sm text-gray-600">Ubah jadi foto formal</div>
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={1}
            accept="image/*"
            title="Upload foto yang ingin diedit"
          />
        </div>

        {/* Generate Button */}
        {uploadedFiles.length > 0 && !generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Sedang Memproses...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  {editMode === 'restorasi' ? 'Restorasi Foto' : 'Buat Foto Resmi'}
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Edit:</h3>
            <div className="space-y-4">
              <img
                src={generatedImage}
                alt="Hasil edit"
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
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Edit Foto Lain
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
