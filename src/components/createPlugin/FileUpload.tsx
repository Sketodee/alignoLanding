import { useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  isUploading: boolean;
  error?: string;
  placeholder?: string;
  maxSize?: number; // in MB
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  isUploading,
  error,
  placeholder,
  maxSize = 300
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && onFileSelect) {
      // Basic client-side validation
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        console.error(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files[0] && onFileSelect) {
      const file = files[0];

      // Basic client-side validation
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        console.error(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      onFileSelect(file);
    }
  };

  const getAcceptText = () => {
    if (placeholder) return placeholder;

    if (accept === 'image/*') return 'Work with JPG, PNG, GIF or WebP file format';
    if (accept === '.exe,.msi,.zip,.zxp') return 'Work with EXE, MSI, ZXP, or ZIP file format';
    if (accept === '.dmg,.pkg,.zip,.zxp') return 'Work with DMG, PKG, ZXP, or ZIP file format';
    return 'Choose your file';
  };

  const getFileTypeIcon = () => {
    if (accept === 'image/*') {
      return (
        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }

    // Default file upload icon
    return (
      <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    );
  };

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          w-full border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${error ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-purple-500'}
          ${isUploading
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:bg-gray-900/30'
          }
          ${!isUploading ? 'hover:scale-[1.02]' : ''}
        `}
      >
        <div className="text-center">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <LoadingSpinner size="md" />
              <p className="mt-2 text-sm text-gray-400">Uploading...</p>
              <p className="text-xs text-gray-500">Please don't refresh the page</p>
            </div>
          ) : (
            <>
              <div className="mb-3">
                {getFileTypeIcon()}
              </div>
              <p className="text-white font-medium mb-1">Drop your file here to upload</p>
              <p className="text-gray-400 text-sm mb-3">{getAcceptText()}</p>
              <p className="text-xs text-gray-500 mb-4">Maximum file size: {maxSize}MB</p>
              <div className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block text-sm">
                Choose File
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  );
};