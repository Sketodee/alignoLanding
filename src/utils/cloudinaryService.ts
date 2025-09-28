// Cloudinary configuration - Replace with your actual Cloudinary credentials
const CLOUDINARY_CONFIG = {
  cloudName: 'drrbebmby', // Replace with your cloud name
  uploadPreset: 'wifofnph', // Replace with your upload preset
  get apiUrl() {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`
    // return `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`
  }
}

// Validate configuration
const validateConfig = () => {
  if (!CLOUDINARY_CONFIG.cloudName || CLOUDINARY_CONFIG.cloudName === 'your-cloud-name') {
    throw new Error('Cloudinary cloud name is not configured')
  }
  if (!CLOUDINARY_CONFIG.uploadPreset || CLOUDINARY_CONFIG.uploadPreset === 'your-upload-preset') {
    throw new Error('Cloudinary upload preset is not configured')
  }
}

export const cloudinaryUpload = async (file:any) => {
  // Validate configuration
  try {
    validateConfig()
  } catch (error: any) {
    throw new Error(`Configuration error: ${error.message}`)
  }

  // Validate file before upload
  if (!file) {
    throw new Error('No file provided')
  }

  if (!file.name || !file.size) {
    throw new Error('Invalid file object')
  }

  // Extract filename without extension for public_id
  const fileName = file.name
  const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName

  // Create FormData for file upload
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)

  // Use original filename as public_id
  formData.append('public_id', fileNameWithoutExt)

  // Optional: Add folder organization
  const fileType = file.type && file.type.startsWith('image/') ? 'images' : 'files'
  formData.append('folder', `plugins/${fileType}`)

  // Optional: Add resource type for non-image files
  if (!file.type || !file.type.startsWith('image/')) {
    formData.append('resource_type', 'raw')
  }

  try {
    const response = await fetch(CLOUDINARY_CONFIG.apiUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error?.message || errorMessage
      } catch (parseError) {
        // If we can't parse the error response, use the default message
      }
      throw new Error(`Upload failed: ${errorMessage}`)
    }

    const data = await response.json()

    // Validate response data
    if (!data || !data.secure_url) {
      throw new Error('Invalid response from Cloudinary')
    }

    // Return the secure URL
    return data.secure_url
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)

    // Provide user-friendly error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.')
    }

    throw new Error(`Failed to upload file: ${error.message}`)
  }
}

