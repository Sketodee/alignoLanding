// hooks/useAPI.ts
import { useState, useCallback } from 'react';
import axiosInstance from '../utils/auth';

interface UseAPIState {
  loading: boolean;
  error: string | null;
  data: any;
}

interface UseAPIReturn extends UseAPIState {
  execute: (config: any) => Promise<any>;
  reset: () => void;
}

export const useAPI = (): UseAPIReturn => {
  const [state, setState] = useState<UseAPIState>({
    loading: false,
    error: null,
    data: null,
  });

  const execute = useCallback(async (config: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axiosInstance(config);
      const responseData = response.data;
      
      setState({
        loading: false,
        error: null,
        data: responseData,
      });

      return responseData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'An error occurred';
      
      setState({
        loading: false,
        error: errorMessage,
        data: null,
      });

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

// Convenience hooks for specific HTTP methods
export const useGet = () => {
  const { execute, ...rest } = useAPI();
  
  const get = useCallback((url: string, config = {}) => {
    return execute({ method: 'GET', url, ...config });
  }, [execute]);

  return { get, ...rest };
};

export const usePost = () => {
  const { execute, ...rest } = useAPI();
  
  const post = useCallback((url: string, data?: any, config = {}) => {
    return execute({ method: 'POST', url, data, ...config });
  }, [execute]);

  return { post, ...rest };
};

export const usePut = () => {
  const { execute, ...rest } = useAPI();
  
  const put = useCallback((url: string, data?: any, config = {}) => {
    return execute({ method: 'PUT', url, data, ...config });
  }, [execute]);

  return { put, ...rest };
};

export const useDelete = () => {
  const { execute, ...rest } = useAPI();
  
  const deleteRequest = useCallback((url: string, config = {}) => {
    return execute({ method: 'DELETE', url, ...config });
  }, [execute]);

  return { delete: deleteRequest, ...rest };
};