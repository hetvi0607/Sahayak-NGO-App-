import api from './api.js';

export const taskService = {
  list: (params = {}) => api.get('/tasks', { params }).then((res) => res.data),
  nearby: (params = {}) => api.get('/tasks/nearby', { params }).then((res) => res.data),
  get: (id) => api.get(`/tasks/${id}`).then((res) => res.data),
  create: (data) => api.post('/tasks', data).then((res) => res.data),
  update: (id, data) => api.put(`/tasks/${id}`, data).then((res) => res.data),
  accept: (id) => api.post(`/tasks/${id}/accept`).then((res) => res.data),
  complete: (id, formData) => api.post(`/tasks/${id}/complete`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data),
  analytics: () => api.get('/tasks/analytics').then((res) => res.data)
};
