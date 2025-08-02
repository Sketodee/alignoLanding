import axiosInstance from '../utils/auth';
import { AllowedProviders, UserType } from '../types/appScopeTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../context/AuthContext';
// import editLab from '../assets/images/editLab.png'

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return null; // Don't render anything, redirect will happen via AuthProvider
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

 
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create user with provider info
  const createUser = async (userData:any) => {
    try {
      const response = await axiosInstance.post('/user/create', userData, { skipAuthRefresh: true });
      console.log('User creation response:', response.data);

      if (response.status === 200) {
        console.log('User created successfully');
      }
      navigate('/login');
      return response.data;
    } catch (error: any) {
      // navigate('/login');
      if (error.response) {
        setErrors({ email: error.response.data?.message || 'Registration failed' });
      } else if (error.request) {
        setErrors({ email: 'No response received from server.' });
      } else {
        setErrors({ email: 'Error setting up request: ' + error.message });
      }
      throw error;
    }
  };

  // Handle regular email submission (custom provider)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);

      const dataToSend = {
        email,
        userType: UserType.USER,
        provider: AllowedProviders.CUSTOM,
        providerId: null,
      };

      try {
        await createUser(dataToSend);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='h-screen flex bg-black'>

      <div className="w-full md:w-[70%] mx-auto bg-transparent p-4 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <div className='flex items-center justify-center mb-4'>
              <img src={editLab} alt="" className='h-16 w-16' />
            </div> */}
            <h1 className="text-white text-3xl font-bold">
              Welcome to Editlabs <span className="text-2xl">👋</span>
            </h1>
          </div>

          {/* Social Login Buttons */}
         <GoogleSignIn />

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-[#323133]"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-[#323133]"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full h-[44px] bg-transparent border-[1px] border-[#282729] text-white placeholder-gray-400 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-white text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Sign up'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-white hover:text-purple-400 transition-colors">
                Log in
              </button>
            </p>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">
              By continuing, you agree to Editlabs{' '}
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;




