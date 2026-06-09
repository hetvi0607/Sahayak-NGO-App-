import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('sahayak_user') || 'null'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sahayak_token');
    if (!token) return;
    authService.me().then(setUser).catch(() => logout());
  }, []);

  const saveSession = (data) => {
    localStorage.setItem('sahayak_token', data.token);
    localStorage.setItem('sahayak_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (values) => {
    setLoading(true);
    try {
      const data = await authService.login(values);
      saveSession(data);
      toast.success('Welcome back');
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    setLoading(true);
    try {
      const data = await authService.register(values);
      saveSession(data);
      toast.success('Account created');
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sahayak_token');
    localStorage.removeItem('sahayak_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, login, register, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
