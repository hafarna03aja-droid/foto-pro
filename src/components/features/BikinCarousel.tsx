import React, { useState } from 'react';
import { ImageUploader } from '../shared/ImageUploader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useImageGeneration } from '../../hooks/useImageGeneration';
import { CarouselIcon, DownloadIcon, SparklesIcon } from '../icons';

export const BikinCarousel: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('modern');
  const { isLoading, error, generatedImage, generateImage, reset } = useImageGeneration();

  const styles = [
    { id: 'modern', name: '✨ Modern', desc: 'Clean & minimalis' },
    { id: 'colorful', name: '🎨 Colorful', desc: 'Vibrant & bold' },
    { id: 'elegant', name: '💎 Elegant', desc: 'Luxury & premium' },
    { id: 'fun', name: '🎉 Fun', desc: 'Playful & casual' },
  ];

  const handleGenerate = () => {
    if (!topic.trim() && uploadedFiles.length === 0) {
      alert('Mohon isi topik atau upload gambar');
      return;
    }

    const stylePrompts: Record<string, string> = {
      modern: 'Create a modern minimalist Instagram carousel design with clean lines, professional typography, white space balance, contemporary color palette, and sleek visual hierarchy suitable for 5 slides.',
      colorful: 'Create a vibrant colorful Instagram carousel design with bold bright colors, eye-catching gradients, dynamic layouts, energetic composition, and engaging visual appeal for 5 slides.',
      elegant: 'Create an elegant luxury Instagram carousel design with sophisticated styling, premium color scheme, refined typography, high-end aesthetics, and polished visual presentation for 5 slides.',
      fun: 'Create a fun playful Instagram carousel design with casual friendly tone, approachable styling, creative layouts, entertaining visuals, and engaging casual aesthetics for 5 slides.',
    };

    const topicInfo = topic.trim() ? ` Topic/content: ${topic}.` : '';
    const finalPrompt = stylePrompts[style] + topicInfo + ' Each slide should be cohesive, Instagram-optimized (1080x1350), and designed for maximum engagement and swipeability.';

    generateImage(uploadedFiles, finalPrompt);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `carousel-${style}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <CarouselIcon className="w-10 h-10 text-cyan-500" />
            <h1 className="text-3xl font-bold text-gray-800">Bikin Carousel</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Buat konten carousel Instagram 5 slide yang menarik dan engaging
          </p>
        </div>

        {/* Style Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gaya Design:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  style === s.id
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                    : 'border-gray-200 hover:border-cyan-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{s.name}</div>
                <div className="text-xs text-gray-600">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topik/Konten Carousel:
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Misal: 5 Tips Fotografi untuk Pemula, Tutorial Makeup Natural, dll"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Bisa juga upload gambar untuk dijadikan carousel
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ImageUploader
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={5}
            accept="image/*"
            title="Upload gambar untuk carousel (opsional, maks 5)"
          />
        </div>

        {/* Generate Button */}
        {!generatedImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading || (!topic.trim() && uploadedFiles.length === 0)}
              className="px-8 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-spin" />
                  Membuat Carousel...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Buat Carousel
                </>
              )}
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {generatedImage && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Carousel Instagram:</h3>
            <div className="space-y-4">
              <img src={generatedImage} alt="Carousel" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Carousel
                </button>
                <button
                  onClick={() => {
                    reset();
                    setUploadedFiles([]);
                    setTopic('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Buat Carousel Baru
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
