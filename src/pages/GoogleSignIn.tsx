import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axiosInstance from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleSignInButton = () => {
  const {login} = useAuth();
  const [, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tempUser, setTempUser] = useState<any>(null);
  const navigate = useNavigate();
  const [, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (tempUser) {
      handleTempUserLogin();
    }
  }, [tempUser]);

  const handleTempUserLogin = async () => {
    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    const dataToSend = {
      email: tempUser.email,
    };

    try {
      const res = await axiosInstance.post('/auth/loginwithgoogle', dataToSend, {
        skipAuthRefresh: true
      });
      console.log('Response:', res.status);

      if (res.status !== 200) {
        console.warn('Unexpected response status:', res.status);
        console.warn('Message:', res.data?.message || 'No message available');
        setErrors({ email: res.data?.message });
        return;
      }
      
      const token = res.data.data.accessToken;
      console.log('Token:', token);
      
      // Store the token
      login(token);
      
      // Add a small delay to ensure token is stored before navigation
      setTimeout(() => {
        console.log('Attempting to navigate to /');
        navigate('/', { replace: true });
      }, 100);
      
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        setErrors({ email: error.response.data?.message || 'Login failed' });
      } else if (error.request) {
        setErrors({ email: 'No response received from server.' });
      } else {
        setErrors({ email: 'Error setting up request: ' + error.message });
      }
    } finally {
      setIsLoading(false);
      setTempUser(null); // Clear tempUser after processing
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        const userInfo = await userInfoResponse.json();
        console.log('Google user info received:', userInfo);
        
        setUser({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
        
        setTempUser({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setIsLoading(false); // Make sure to stop loading on error
      }
      // Note: Don't set isLoading to false here, let handleTempUserLogin handle it
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      setIsLoading(false);
    },
  });

  const handleAuthWithGoogle = () => {
    console.log('Starting Google authentication...');
    setIsLoading(true);
    googleLogin();
  };

  return (
    <div className="bg-black shadow-lg rounded-2xl w-full text-center">
      <div className="space-y-3">
        {/* Custom Google Sign-In Button */}
        <button
          onClick={handleAuthWithGoogle}
          disabled={isLoading}
          className="w-full h-[44px] rounded-lg border border-[#323133] flex items-center justify-center gap-2.5 px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'radial-gradient(53.53% 66.97% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: '0px 0px 12px 1px #FFFFFF1A inset'
          }}
        >
          <FcGoogle className="w-5 h-5" />
          {isLoading ? 'Processing...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
};

const GoogleSignIn = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''; 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleSignInButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;

// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from 'react-icons/fc';
// import axiosInstance from '../utils/auth';
// import { useNavigate } from 'react-router-dom';

// interface GoogleUser {
//   name: string;
//   email: string;
//   picture: string;
// }

// const GoogleSignInButton = () => {
//   const [, setUser] = useState<GoogleUser | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//    const [tempUser, setTempUser] = useState<any>(null);
//      const navigate = useNavigate();
//      const [,setErrors] = useState<{ email?: string; password?: string }>({});

//      useEffect(() => {
//        if (tempUser) {
//          handleTempUserLogin();
//        }
//      }, [tempUser]);

//       const handleTempUserLogin = async () => {
//     setIsLoading(true);
//     setErrors({}); // Clear any previous errors

//     const dataToSend = {
//       email: tempUser.email,
//     };

//     try {
//       const res = await axiosInstance.post('/auth/loginwithgoogle', dataToSend, {
//         skipAuthRefresh: true
//       });
//       console.log('Response:', res.status);

//       if (res.status !== 200) {
//         console.warn('Unexpected response status:', res.status);
//         console.warn('Message:', res.data?.message || 'No message available');
//         setErrors({ email: res.data?.message });
//         return;
//       }
//       const token = res.data.data.accessToken;
//       console.log('Token:', token);
//       login(token);
//       // Login successful, navigate to home
//       navigate('/');
//     } catch (error: any) {
//       console.error('Login error:', error);
//       if (error.response) {
//         setErrors({ email: error.response.data?.message || 'Login failed' });
//       } else if (error.request) {
//         setErrors({ email: 'No response received from server.' });
//       } else {
//         setErrors({ email: 'Error setting up request: ' + error.message });
//       }
//     } finally {
//       setIsLoading(false);
//       setTempUser(null); // Clear tempUser after processing
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       setIsLoading(true);
//       try {
//         // Fetch user info using the access token
//         const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
//           headers: {
//             Authorization: `Bearer ${tokenResponse.access_token}`,
//           },
//         });
        
//         const userInfo = await userInfoResponse.json();
//         setUser({
//           name: userInfo.name,
//           email: userInfo.email,
//           picture: userInfo.picture,
//         });
//         setTempUser({
//           name: userInfo.name,
//           email: userInfo.email,
//           picture: userInfo.picture,
//         });
//       } catch (error) {
//         console.error('Failed to fetch user info:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     onError: (error) => {
//       console.error('Login Failed:', error);
//       setIsLoading(false);
//     },
//   });

//   const handleAuthWithGoogle = () => {
//     setIsLoading(true);
//     login();
//   };

//   return (
    
//       <div className="bg-black shadow-lg rounded-2xl w-full max-w-md text-center">
//                    <div className="space-y-3 mb-6">
//               {/* Custom Google Sign-In Button */}
//               <button
//                 onClick={handleAuthWithGoogle}
//                 disabled={isLoading}
//                 className="w-full h-[44px] rounded-lg border border-[#323133] flex items-center justify-center gap-2.5 px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   background: 'radial-gradient(53.53% 66.97% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
//                   boxShadow: '0px 0px 12px 1px #FFFFFF1A inset'
//                 }}
//               >
//                 <FcGoogle className="w-5 h-5" />
//                 {isLoading ? 'Processing...' : 'Continue with Google'}
//               </button>
//             </div>

//       </div>

//   );
// };

// const Test = () => {
//   return (
//     <GoogleOAuthProvider clientId="480711750925-6g37lap16m58v20rk2u0mrdlurj2unc2.apps.googleusercontent.com">
//       <GoogleSignInButton />
//     </GoogleOAuthProvider>
//   );
// };

// export default Test;

