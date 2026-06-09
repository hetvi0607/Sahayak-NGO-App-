import api from './api.js';

export const authService = {
  register: (data) => api.post('/auth/register', data).then((res) => res.data),
  login: (data) => api.post('/auth/login', data).then((res) => res.data),
  me: () => api.get('/auth/me').then((res) => res.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then((res) => res.data),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then((res) => res.data)
};
