import React, { useRef } from 'react';
import { UploadIcon, XIcon } from '../icons';

interface ImageUploaderProps {
  uploadedFiles: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  title?: string;
  description?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedFiles,
  onFilesChange,
  maxFiles = 10,
  accept = 'image/*',
  title = 'Seret & Lepas gambar di sini',
  description = 'atau klik untuk memilih file',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = [...uploadedFiles, ...Array.from(e.target.files)].slice(0, maxFiles);
      onFilesChange(newFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const newFiles = [...uploadedFiles, ...Array.from(e.dataTransfer.files)].slice(0, maxFiles);
      onFilesChange(newFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onFilesChange(uploadedFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition cursor-pointer p-8 text-center"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          className="hidden"
          accept={accept}
        />
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
          <UploadIcon className="w-8 h-8 text-teal-500" />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-xs text-gray-400 mt-2">
          PNG, JPG, WEBP (Max {maxFiles} file{maxFiles > 1 ? 's' : ''})
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {uploadedFiles.length} file terpilih
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative aspect-square group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-80"
                  aria-label="Hapus gambar"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
