import { cloudinaryUpload } from '../../utils/cloudinaryService';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { FileUpload } from './FileUpload';
import { FormValidation } from './FormValidation';
import { ImagePreview } from './ImagePreview';
import PluginTypeDropdown from './PluginTypeDropdown';
import { useNavigate } from 'react-router-dom';

interface Version {
    platform: 'windows' | 'mac';
    url: string;
    size: number;
    version: string;
    releaseDate: string;
}

interface SubDescription {
    title: string;
    description: string;
}

interface FormData {
    name: string;
    description: string;
    iconUrl: string;
    imageUrl: string;
    pluginType: string;
    subDescriptions: SubDescription[];
    currentWindowsVersion: string;
    currentMacOsVersion: string;
    versions: Version[];
}

interface CreatePluginFormProps {
    onSubmit: (formData: FormData) => void;
}

interface UploadingStates {
    iconUrl: boolean;
    imageUrl: boolean;
    [key: string]: boolean; // For dynamic version keys like "version_0", "version_1", etc.
}

interface ValidationErrors {
    [key: string]: string;
}

export const CreatePluginForm: React.FC<CreatePluginFormProps> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        iconUrl: '',
        imageUrl: '',
        pluginType: '',
        subDescriptions: [{ title: '', description: '' }],
        currentWindowsVersion: '',
        currentMacOsVersion: '',
        versions: [
            {
                platform: 'windows' as const,
                url: '',
                size: 0,
                version: '',
                releaseDate: new Date().toISOString()
            },
            {
                platform: 'mac' as const,
                url: '',
                size: 0,
                version: '',
                releaseDate: new Date().toISOString()
            }
        ] as Version[]
    });

    const [uploadingStates, setUploadingStates] = useState<UploadingStates>({
        iconUrl: false,
        imageUrl: false,
        ...formData.versions.reduce((acc, _, index) => {
            acc[`version_${index}`] = false;
            return acc;
        }, {} as Record<string, boolean>)
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    // Helper function to get error safely
    const getError = (fieldName: string): string => {
        return errors[fieldName] || '';
    };

    // Helper function to check if error exists
    const hasError = (fieldName: string): boolean => {
        return Boolean(errors[fieldName]);
    };

    // Helper function to clear error
    const clearError = (fieldName: string): void => {
        if (hasError(fieldName)) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleInputChange = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        clearError(field);
    };

    const handleSubDescriptionChange = (index: number, field: keyof SubDescription, value: string): void => {
        const newSubDescriptions = [...formData.subDescriptions];
        newSubDescriptions[index] = {
            ...newSubDescriptions[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            subDescriptions: newSubDescriptions
        }));

        // Clear error for this specific sub description field
        const errorKey = `subDescriptions.${index}.${field}`;
        clearError(errorKey);
    };

    const handleVersionChange = (index: number, field: keyof Version, value: string | number): void => {
        const newVersions = [...formData.versions];
        newVersions[index] = {
            ...newVersions[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            versions: newVersions
        }));

        // Clear error for this specific version field
        const errorKey = `versions.${index}.${field}`;
        clearError(errorKey);
    };

    const addSubDescription = (): void => {
        setFormData(prev => ({
            ...prev,
            subDescriptions: [...prev.subDescriptions, { title: '', description: '' }]
        }));
    };

    const removeSubDescription = (index: number): void => {
        if (formData.subDescriptions.length > 1) {
            const newSubDescriptions = formData.subDescriptions.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                subDescriptions: newSubDescriptions
            }));
        }
    };

    const addVersion = (): void => {
        const newVersion: Version = {
            platform: 'windows',
            url: '',
            size: 0,
            version: '',
            releaseDate: new Date().toISOString()
        };

        setFormData(prev => ({
            ...prev,
            versions: [...prev.versions, newVersion]
        }));

        // Add uploading state for new version
        const newIndex = formData.versions.length;
        setUploadingStates(prev => ({
            ...prev,
            [`version_${newIndex}`]: false
        }));
    };

    const removeVersion = (index: number): void => {
        if (formData.versions.length > 2) {
            const newVersions = formData.versions.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                versions: newVersions
            }));

            // Remove uploading state
            setUploadingStates(prev => {
                const newStates = { ...prev };
                delete newStates[`version_${index}`];
                return newStates;
            });
        }
    };

    const handleFileUpload = async (field: string, file: File): Promise<void> => {
        setUploadingStates(prev => ({
            ...prev,
            [field]: true
        }));

        try {
            const uploadedUrl = await cloudinaryUpload(file);

            if (field.startsWith('version_')) {
                // Handle version file upload
                const versionIndex = parseInt(field.split('_')[1]);
                const newVersions = [...formData.versions];
                newVersions[versionIndex] = {
                    ...newVersions[versionIndex],
                    url: uploadedUrl,
                    size: file.size
                };
                setFormData(prev => ({
                    ...prev,
                    versions: newVersions
                }));
            } else {
                // Handle regular file upload
                setFormData(prev => ({
                    ...prev,
                    [field]: uploadedUrl
                }));
            }

            // Clear any existing error for this field
            clearError(field);
        } catch (error: any) {
            console.error(`Error uploading ${field}:`, error);
            setErrors(prev => ({
                ...prev,
                [field]: error.message || 'Upload failed. Please try again.'
            }));
        } finally {
            setUploadingStates(prev => ({
                ...prev,
                [field]: false
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const validationErrors = FormValidation.validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Check if any files are still uploading
        const isUploading = Object.values(uploadingStates).some(state => state);
        if (isUploading) {
            setErrors({ general: 'Please wait for all files to finish uploading.' });
            return;
        }

        // Clear general error
        clearError('general');

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const isAnyFileUploading = Object.values(uploadingStates).some(state => state);

    return (
        <div className="bg-black text-white pt-20 pb-10">     
            <div className="w-[95%] lg:w-[90%] mx-auto ">
                {/* Header */}
                       <button
                    onClick={() => navigate(-1)}
                    className="text-purple-400 hover:text-purple-300 mb-4  transition-colors"
                >
                    ← Back
                </button>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Create Plugin</h1>
                    <p className="text-gray-400">Fill out the form below to create your new plugin. All fields marked with * are required.</p>
                </div>

                {hasError('general') && (
                    <div className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
                        {getError('general')}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Plugin Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${hasError('name') ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                    }`}
                                placeholder="Enter plugin name"
                            />
                            {hasError('name') && <p className="text-red-500 text-sm mt-1">{getError('name')}</p>}
                        </div>

                        <PluginTypeDropdown
                            value={formData.pluginType}
                            onChange={(val: string) => handleInputChange('pluginType', val)}
                            error={hasError('pluginType') ? getError('pluginType') : ''}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${hasError('description') ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                }`}
                            placeholder="Enter plugin description"
                        />
                        {hasError('description') && <p className="text-red-500 text-sm mt-1">{getError('description')}</p>}
                    </div>

                    {/* Image Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Icon Image *
                            </label>
                            <FileUpload
                                onFileSelect={(file: File) => handleFileUpload('iconUrl', file)}
                                accept="image/*"
                                isUploading={uploadingStates.iconUrl}
                                error={getError('iconUrl')}
                            />
                            {formData.iconUrl && (
                                <ImagePreview src={formData.iconUrl} alt="Icon preview" className="mt-2" />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Banner Image *
                            </label>
                            <FileUpload
                                onFileSelect={(file: File) => handleFileUpload('imageUrl', file)}
                                accept="image/*"
                                isUploading={uploadingStates.imageUrl}
                                error={getError('imageUrl')}
                            />
                            {formData.imageUrl && (
                                <ImagePreview src={formData.imageUrl} alt="Banner preview" className="mt-2" />
                            )}
                        </div>
                    </div>

                    {/* Sub Descriptions */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium">
                                Features *
                            </label>
                            <button
                                type="button"
                                onClick={addSubDescription}
                                className="bg-[#761cf2] hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors"
                            >
                                Add Feature
                            </button>
                        </div>

                        {formData.subDescriptions.map((sub, index) => {
                            const titleError = `subDescriptions.${index}.title`;
                            const descError = `subDescriptions.${index}.description`;

                            return (
                                <div key={index} className="border border-gray-600 rounded-lg p-4 mb-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-sm font-medium text-white">Feature {index + 1}</h4>
                                        {formData.subDescriptions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSubDescription(index)}
                                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={sub.title}
                                                onChange={(e) => handleSubDescriptionChange(index, 'title', e.target.value)}
                                                className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${hasError(titleError) ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                                    }`}
                                                placeholder="Feature title"
                                            />
                                            {hasError(titleError) && (
                                                <p className="text-red-500 text-sm mt-1">{getError(titleError)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <textarea
                                                value={sub.description}
                                                onChange={(e) => handleSubDescriptionChange(index, 'description', e.target.value)}
                                                rows={2}
                                                className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${hasError(descError) ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                                    }`}
                                                placeholder="Feature description"
                                            />
                                            {hasError(descError) && (
                                                <p className="text-red-500 text-sm mt-1">{getError(descError)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Current Versions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current Windows Version *
                            </label>
                            <input
                                type="text"
                                value={formData.currentWindowsVersion}
                                onChange={(e) => handleInputChange('currentWindowsVersion', e.target.value)}
                                className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${hasError('currentWindowsVersion') ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                    }`}
                                placeholder="e.g., 2.1.0"
                            />
                            {hasError('currentWindowsVersion') && <p className="text-red-500 text-sm mt-1">{getError('currentWindowsVersion')}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current macOS Version *
                            </label>
                            <input
                                type="text"
                                value={formData.currentMacOsVersion}
                                onChange={(e) => handleInputChange('currentMacOsVersion', e.target.value)}
                                className={`w-full bg-transparent border-[0.5px] py-3 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${hasError('currentMacOsVersion') ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                    }`}
                                placeholder="e.g., 2.1.0"
                            />
                            {hasError('currentMacOsVersion') && <p className="text-red-500 text-sm mt-1">{getError('currentMacOsVersion')}</p>}
                        </div>
                    </div>

                    {/* Versions */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium">
                                Plugin Versions *
                            </label>
                            <button
                                type="button"
                                onClick={addVersion}
                                className="bg-[#761cf2] hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors"
                            >
                                Add Version
                            </button>
                        </div>

                        {formData.versions.map((version, index) => (
                            <div key={index} className="border border-gray-600 rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-medium text-white">Version {index + 1}</h4>
                                    {formData.versions.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVersion(index)}
                                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Platform</label>
                                        <select
                                            value={version.platform}
                                            onChange={(e) => handleVersionChange(index, 'platform', e.target.value as 'windows' | 'mac')}
                                            className="w-full bg-transparent border-[0.5px] border-gray-600 py-2 px-3 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                        >
                                            <option value="windows" className="bg-gray-800">Windows</option>
                                            <option value="mac" className="bg-gray-800">macOS</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Version Number</label>
                                        <input
                                            type="text"
                                            value={version.version}
                                            onChange={(e) => handleVersionChange(index, 'version', e.target.value)}
                                            className={`w-full bg-transparent border-[0.5px] py-2 px-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${hasError(`versions.${index}.version`) ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                                                }`}
                                            placeholder="e.g., 2.1.0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Release Date</label>
                                        <input
                                            type="datetime-local"
                                            value={version.releaseDate.slice(0, 16)}
                                            onChange={(e) => handleVersionChange(index, 'releaseDate', new Date(e.target.value).toISOString())}
                                            className="w-full bg-transparent border-[0.5px] border-gray-600 py-2 px-3 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-2">Download File *</label>
                                    <FileUpload
                                        onFileSelect={(file: File) => handleFileUpload(`version_${index}`, file)}
                                        accept={version.platform === 'windows' ? '.exe,.msi,.zip,.zxp' : '.dmg,.pkg,.zip,.zxp'}
                                        isUploading={uploadingStates[`version_${index}`]}
                                        error={getError(`version_${index}`)}
                                    />
                                    {version.url && (
                                        <p className="mt-2 text-sm text-green-400">
                                            ✓ File uploaded successfully ({(version.size / 1024 / 1024).toFixed(1)} MB)
                                        </p>
                                    )}
                                    {hasError(`version_${index}`) && (
                                        <p className="text-red-500 text-xs mt-1">{getError(`version_${index}`)}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isAnyFileUploading}
                            className={`px-8 py-3 rounded-lg font-medium transition-colors ${isAnyFileUploading
                                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                                : 'bg-[#761cf2] hover:bg-purple-700 text-white'
                                }`}
                        >
                            {isAnyFileUploading ? (
                                <div className="flex items-center">
                                    <LoadingSpinner size="sm" />
                                    <span className="ml-2">Creating Plugin...</span>
                                </div>
                            ) : (
                                'Create Plugin'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};