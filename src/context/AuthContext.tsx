

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
  loading: boolean
  error: string | null
};

type UserDataTest = {
  name: string
  email: string
  picture: string
  id: string
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userTest] = useState<UserDataTest | null>(null);
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<{ UserInfo: User }>(token);
    setUser(decoded.UserInfo);
    console.log('User logged in:', decoded.UserInfo);
    navigate('/home');
  };

  // const loginWithGoogle = async (credential: string) => {
  //   setIsLoading(true);
  //   try {
  //     // Send credential to backend via Electron IPC
  //     const response = await (window as any).context.sendToBackend({ credential });

  //     if (response.success) {
  //       const userData = response.data.data.user
  //       const token = response.data.data.accessToken;

  //       setUser(userData);
  //       localStorage.setItem('user', JSON.stringify(userData));
  //       localStorage.setItem('token', token);
  //     } else {
  //       throw new Error(response.message || 'Authentication failed');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    // await axios.post('/api/logout', {}, { withCredentials: true }); // optionally invalidate refresh token
    navigate('/');
  };

  const checkAuth = async () => {
    // const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<{ UserInfo: User }>(token);
      setUser(decoded.UserInfo);
    } else {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/auth/generaterefreshtoken',
          {},
          {
            withCredentials: true,
          }
        );
        // const { token, user: freshUser } = res.data;
        const token = res.data.data.accessToken;
        // const freshUser = res.data.data.user;
        login(token);
      } catch (err) {
        logout();
      }
    }
  };

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
        loading, error
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
