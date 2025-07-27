import axios from 'axios'

// ✅ Extend AxiosRequestConfig to allow custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
    _retry?: boolean
  }
}


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // needed for sending cookies (refresh token)
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor: Attach token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: Handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // ✅ Skip if explicitly marked
    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error)
    }

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Call refresh endpoint (must send cookie with refresh token)
        const response = await axios.post(
          // 'https://editlabs-05071851b597.herokuapp.com/api/auth/generaterefreshtoken',
          `${import.meta.env.VITE_BACKEND_URL}/auth/generaterefreshtoken`,
          {},
          {
            withCredentials: true
          }
        )

        const newAccessToken = response.data.data.accessToken
        localStorage.setItem('token', newAccessToken)

        // Update token and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError)
        // Optional: logout user or redirect
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
