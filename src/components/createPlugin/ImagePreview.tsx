import { useState } from 'react';

interface ImagePreviewProps {
    src: string;
    alt: string;
    className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className = '' }) => {
    const [imageError, setImageError] = useState<boolean>(false);

    const handleImageError = (): void => {
        setImageError(true);
    };

    const handleImageLoad = (): void => {
        setImageError(false);
    };

    if (!src) {
        return null;
    }

    return (
        <div className={`relative inline-block ${className}`}>
            {imageError ? (
                <div className="w-32 h-32 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <svg className="mx-auto h-8 w-8 mb-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">Image Error</span>
                    </div>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full h-auto max-h-32 rounded-lg border border-gray-200 shadow-sm"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            )}

            {!imageError && (
                <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};