import { useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const usePreviousPath = () => {
  const location = useLocation();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    prev.current = location.pathname;
  }, [location]);

  return prev.current;
};
export default usePreviousPath;