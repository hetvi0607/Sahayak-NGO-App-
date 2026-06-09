import api from './api.js';

export const adminService = {
  stats: () => api.get('/users/stats').then((res) => res.data),
  users: () => api.get('/users').then((res) => res.data),
  banUser: (id) => api.patch(`/users/${id}/ban`).then((res) => res.data),
  deleteUser: (id) => api.delete(`/users/${id}`).then((res) => res.data),
  deleteTask: (id) => api.delete(`/tasks/${id}`).then((res) => res.data),
  surveyAnalytics: () => api.get('/surveys/analytics').then((res) => res.data)
};
