import { MAX_FILE_SIZE, SUPPORTED_IMAGE_TYPES } from './constants';

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Format file tidak didukung. Gunakan: ${SUPPORTED_IMAGE_TYPES.join(', ')}`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
};

export const validateImageFiles = (files: File[]): { valid: boolean; error?: string } => {
  for (const file of files) {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return validation;
    }
  }
  return { valid: true };
};

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to resize image'));
        }
      }, file.type);
    };

    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const downloadImage = (imageUrl: string, filename: string = 'fotopro-result.png') => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
