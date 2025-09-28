// Types for form data
interface SubDescription {
    title: string;
    description: string;
}

interface Version {
    platform: 'windows' | 'mac';
    url: string;
    size: number;
    version: string;
    releaseDate: string;
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

type FileType = 'image' | 'windows' | 'macos';

export class FormValidation {
    // Validate the main plugin form
    static validateForm(formData: FormData): Record<string, string> {
        const errors: Record<string, string> = {};

        const isEmpty = (value: any): boolean =>
            !value || (typeof value === 'string' && value.trim().length === 0);

        // Plugin name validation
        if (isEmpty(formData.name)) {
            errors['name'] = 'Plugin name is required';
        } else if (formData.name.length > 255) {
            errors['name'] = 'Plugin name must be less than 255 characters';
        }

        // Description validation
        if (isEmpty(formData.description)) {
            errors['description'] = 'Description is required';
        } else if (formData.description.length > 5000) {
            errors['description'] = 'Description must be less than 5000 characters';
        }

        // Icon URL validation
        if (isEmpty(formData.iconUrl)) {
            errors['iconUrl'] = 'Icon image is required';
        } else if (!this.isValidUrl(formData.iconUrl)) {
            errors['iconUrl'] = 'Invalid icon URL format';
        }

        // Image URL validation
        if (isEmpty(formData.imageUrl)) {
            errors['imageUrl'] = 'Banner image is required';
        } else if (!this.isValidUrl(formData.imageUrl)) {
            errors['imageUrl'] = 'Invalid image URL format';
        }

        // Plugin type validation
        if (isEmpty(formData.pluginType)) {
            errors['pluginType'] = 'Plugin type is required';
        }

        // Current versions validation
        if (isEmpty(formData.currentWindowsVersion)) {
            errors['currentWindowsVersion'] = 'Current Windows version is required';
        } else if (!this.isValidVersionFormat(formData.currentWindowsVersion)) {
            errors['currentWindowsVersion'] = 'Invalid Windows version format. Use semantic versioning (e.g., 1.0.0)';
        }

        if (isEmpty(formData.currentMacOsVersion)) {
            errors['currentMacOsVersion'] = 'Current macOS version is required';
        } else if (!this.isValidVersionFormat(formData.currentMacOsVersion)) {
            errors['currentMacOsVersion'] = 'Invalid macOS version format. Use semantic versioning (e.g., 1.0.0)';
        }

        // Sub descriptions validation
        if (!formData.subDescriptions || !Array.isArray(formData.subDescriptions) || formData.subDescriptions.length === 0) {
            errors['subDescriptions'] = 'At least one feature is required';
        } else {
            formData.subDescriptions.forEach((sub: SubDescription, index: number) => {
                if (!sub || typeof sub !== 'object') {
                    errors[`subDescriptions.${index}.title`] = 'Invalid feature data';
                    errors[`subDescriptions.${index}.description`] = 'Invalid feature data';
                } else {
                    if (isEmpty(sub.title)) {
                        errors[`subDescriptions.${index}.title`] = 'Feature title is required';
                    } else if (sub.title.length > 100) {
                        errors[`subDescriptions.${index}.title`] = 'Feature title must be less than 100 characters';
                    }

                    if (isEmpty(sub.description)) {
                        errors[`subDescriptions.${index}.description`] = 'Feature description is required';
                    } else if (sub.description.length > 500) {
                        errors[`subDescriptions.${index}.description`] = 'Feature description must be less than 500 characters';
                    }
                }
            });
        }

        // Versions validation
        if (!formData.versions || !Array.isArray(formData.versions) || formData.versions.length === 0) {
            errors['versions'] = 'At least one version is required';
        } else {
            if (formData.versions.length > 50) {
                errors['versions'] = 'Maximum 50 versions allowed per plugin';
            }

            // Check for required platforms
            const platforms = formData.versions.map(v => v.platform).filter(Boolean);
            if (!platforms.includes('windows')) {
                errors['versions.platforms'] = 'At least one Windows version is required';
            }
            if (!platforms.includes('mac')) {
                errors['versions.platforms'] = 'At least one Mac version is required';
            }

            // Validate each version
            const platformVersionCombos = new Set<string>();
            formData.versions.forEach((version: Version, index: number) => {
                const versionPrefix = `versions.${index}`;

                // Platform validation
                if (!version.platform) {
                    errors[`${versionPrefix}.platform`] = 'Platform is required';
                } else if (!['windows', 'mac'].includes(version.platform)) {
                    errors[`${versionPrefix}.platform`] = 'Invalid platform. Must be either windows or mac';
                }

                // URL validation (file upload)
                if (isEmpty(version.url)) {
                    errors[`version_${index}`] = 'Please upload a file for this version';
                } else if (!this.isValidUrl(version.url)) {
                    errors[`${versionPrefix}.url`] = 'Invalid URL format';
                } else if (version.url.length > 2048) {
                    errors[`${versionPrefix}.url`] = 'URL must be less than 2048 characters';
                }

                // Size validation (should be set when file is uploaded)
                if (version.size === undefined || version.size === null || version.size === 0) {
                    if (isEmpty(version.url)) {
                        // Already handled in URL validation above
                    } else {
                        errors[`${versionPrefix}.size`] = 'File size information is missing';
                    }
                } else if (!Number.isInteger(version.size) || version.size <= 0) {
                    errors[`${versionPrefix}.size`] = 'File size must be a positive integer';
                } else if (version.size > 10 * 1024 * 1024 * 1024) { // 10GB limit
                    errors[`${versionPrefix}.size`] = 'File size cannot exceed 10GB';
                }

                // Version format validation
                if (isEmpty(version.version)) {
                    errors[`${versionPrefix}.version`] = 'Version number is required';
                } else if (!this.isValidVersionFormat(version.version)) {
                    errors[`${versionPrefix}.version`] = 'Invalid version format. Use semantic versioning (e.g., 1.0.0)';
                }

                // Release date validation
                if (isEmpty(version.releaseDate)) {
                    errors[`${versionPrefix}.releaseDate`] = 'Release date is required';
                } else {
                    const releaseDate = new Date(version.releaseDate);
                    if (isNaN(releaseDate.getTime())) {
                        errors[`${versionPrefix}.releaseDate`] = 'Invalid release date format';
                    } else {
                        const now = new Date();
                        const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

                        if (releaseDate > oneYearFromNow) {
                            errors[`${versionPrefix}.releaseDate`] = 'Release date cannot be more than one year in the future';
                        }
                    }
                }

                // Check for duplicate platform-version combinations
                if (version.platform && version.version) {
                    const combo = `${version.platform}-${version.version}`;
                    if (platformVersionCombos.has(combo)) {
                        errors[`${versionPrefix}.duplicate`] = `Duplicate version ${version.version} for platform ${version.platform}`;
                    }
                    platformVersionCombos.add(combo);
                }
            });
        }

        return errors;
    }

    // Validate a file upload
    static validateFile(file: File, type: FileType): string[] {
        const errors: string[] = [];

        if (!file || typeof file !== 'object') {
            errors.push('Invalid file');
            return errors;
        }

        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            errors.push('File size must be less than 50MB');
        }

        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

        switch (type) {
            case 'image':
                if (!imageTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
                    errors.push('File must be an image (JPEG, PNG, GIF, WebP)');
                }
                break;
            case 'windows':
                if (!file.name.match(/\.(exe|msi|zip)$/i)) {
                    errors.push('File must be a Windows file (.exe, .msi, .zip)');
                }
                break;
            case 'macos':
                if (!file.name.match(/\.(dmg|pkg|zip)$/i)) {
                    errors.push('File must be a macOS file (.dmg, .pkg, .zip)');
                }
                break;
            default:
                errors.push('Unknown file type');
        }

        return errors;
    }

    // Validate a single version object
    static validateVersion(version: Version, index: number): Record<string, string> {
        const errors: Record<string, string> = {};
        const versionPrefix = `versions.${index}`;

        if (!version || typeof version !== 'object') {
            errors[`${versionPrefix}.invalid`] = 'Invalid version data';
            return errors;
        }

        // Platform validation
        if (!version.platform) {
            errors[`${versionPrefix}.platform`] = 'Platform is required';
        } else if (!['windows', 'mac'].includes(version.platform)) {
            errors[`${versionPrefix}.platform`] = 'Invalid platform. Must be either windows or mac';
        }

        // URL validation
        if (!version.url || version.url.trim() === '') {
            errors[`${versionPrefix}.url`] = 'Download URL is required';
        } else if (!this.isValidUrl(version.url)) {
            errors[`${versionPrefix}.url`] = 'Invalid URL format';
        }

        // Size validation
        if (version.size === undefined || version.size === null) {
            errors[`${versionPrefix}.size`] = 'File size is required';
        } else if (!Number.isInteger(version.size) || version.size <= 0) {
            errors[`${versionPrefix}.size`] = 'File size must be a positive integer';
        }

        // Version format validation
        if (!version.version || version.version.trim() === '') {
            errors[`${versionPrefix}.version`] = 'Version number is required';
        } else if (!this.isValidVersionFormat(version.version)) {
            errors[`${versionPrefix}.version`] = 'Invalid version format. Use semantic versioning (e.g., 1.0.0)';
        }

        // Release date validation
        if (!version.releaseDate || version.releaseDate.trim() === '') {
            errors[`${versionPrefix}.releaseDate`] = 'Release date is required';
        } else {
            const releaseDate = new Date(version.releaseDate);
            if (isNaN(releaseDate.getTime())) {
                errors[`${versionPrefix}.releaseDate`] = 'Invalid release date format';
            }
        }

        return errors;
    }

    // Validate a single sub-description
    static validateSubDescription(subDescription: SubDescription): Record<string, string> {
        const errors: Record<string, string> = {};

        if (!subDescription || typeof subDescription !== 'object') {
            errors['title'] = 'Invalid sub description';
            errors['description'] = 'Invalid sub description';
            return errors;
        }

        if (!subDescription.title || subDescription.title.trim().length === 0) {
            errors['title'] = 'Feature title is required';
        } else if (subDescription.title.length > 100) {
            errors['title'] = 'Feature title must be less than 100 characters';
        }

        if (!subDescription.description || subDescription.description.trim().length === 0) {
            errors['description'] = 'Feature description is required';
        } else if (subDescription.description.length > 500) {
            errors['description'] = 'Feature description must be less than 500 characters';
        }

        return errors;
    }

    // Check if a string is a valid URL
    static isValidUrl(value: string): boolean {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    // Validate version format (semantic versioning)
    static isValidVersionFormat(version: string): boolean {
        const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
        return semverRegex.test(version);
    }

    // Helper methods
    static createErrorsObject(): Record<string, string> {
        return {};
    }

    static addError(errors: Record<string, string>, key: string, message: string): Record<string, string> {
        errors[key] = message;
        return errors;
    }

    static hasErrors(errors: Record<string, string>): boolean {
        return Object.keys(errors).length > 0;
    }

    // Format file size for display
    static formatFileSize(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }
}