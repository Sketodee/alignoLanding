import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/appScopeTypes';

type AuthContextType = {
  user: User | null;
  userTest: UserDataTest | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

type UserDataTest = {
  name: string;
  email: string;
  picture: string;
  id: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with immediate synchronous check
  const getInitialAuthState = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ UserInfo: User }>(token);
        return decoded.UserInfo;
      } catch (err) {
        localStorage.removeItem('token'); // Clean up invalid token
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(getInitialAuthState);
  const [userTest] = useState<UserDataTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();

  // Immediate route protection (synchronous)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const authPages = ['/login', '/register'];
    
    // If we already have a user from localStorage and they're on auth pages, redirect immediately
    if (user && authPages.includes(currentPath)) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<{ UserInfo: User }>(token);
    setUser(decoded.UserInfo);
    console.log('User logged in:', decoded.UserInfo);
    navigate('/');
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const attemptRefreshToken = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/generaterefreshtoken',
        {},
        { withCredentials: true }
      );
      
      const token = res.data.data.accessToken;
      const decoded = jwtDecode<{ UserInfo: User }>(token);
      localStorage.setItem('token', token);
      setUser(decoded.UserInfo);
      console.log('Token refreshed successfully:', decoded.UserInfo);
    } catch (err) {
      console.log('Refresh token failed, user not authenticated');
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const checkAuth = async () => {
    // If we already have a valid user from initial state, just verify and finish
    if (user) {
      setLoading(false);
      return;
    }

    // Only attempt refresh if no valid token was found initially
    console.log('No valid token found, attempting refresh');
    await attemptRefreshToken();
    setLoading(false);
  };

  // Additional route protection after async auth check
  useEffect(() => {
    if (loading) return;

    const currentPath = window.location.pathname;
    const authPages = ['/login', '/register'];
    
    if (user && authPages.includes(currentPath)) {
      console.log('Authenticated user on auth page after async check, redirecting');
      navigate('/');
    } else if (!user && !authPages.includes(currentPath) && currentPath !== '/') {
      console.log('Unauthenticated user trying to access protected page, redirecting to login');
      navigate('/login');
    }
  }, [user, navigate, loading]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userTest,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import type { User } from '../types/appScopeTypes';

// type AuthContextType = {
//   user: User | null;
//   userTest: UserDataTest | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
//   loading: boolean
//   error: string | null
// };

// type UserDataTest = {
//   name: string
//   email: string
//   picture: string
//   id: string
// }


// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [userTest] = useState<UserDataTest | null>(null);
//   const [loading] = useState(false)
//   const [error] = useState<string | null>(null)
//   const navigate = useNavigate();

//   const login = (token: string) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode<{ UserInfo: User }>(token);
//     setUser(decoded.UserInfo);
//     console.log('User logged in:', decoded.UserInfo);
//     navigate('/');
//   };


//   const logout = async () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     // await axios.post('/api/logout', {}, { withCredentials: true }); // optionally invalidate refresh token
//     navigate('/');
//   };

//   const checkAuth = async () => {
//     // const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (token) {
//       const decoded = jwtDecode<{ UserInfo: User }>(token);
//       setUser(decoded.UserInfo);
//     } else {
//       try {
//         const res = await axios.post(
//           'http://localhost:8080/api/auth/generaterefreshtoken',
//           {},
//           {
//             withCredentials: true,
//           }
//         );
//         // const { token, user: freshUser } = res.data;
//         const token = res.data.data.accessToken;
//         // const freshUser = res.data.data.user;
//         login(token);
//       } catch (err) {
//         logout();
//       }
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userTest,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         loading, error
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };
