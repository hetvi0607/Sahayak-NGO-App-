import api from './api.js';

export const miscService = {
  categories: () => api.get('/categories').then((res) => res.data),
  notifications: () => api.get('/notifications').then((res) => res.data),
  markRead: (id) => api.patch(`/notifications/${id}/read`).then((res) => res.data),
  survey: (data) => api.post('/surveys', data).then((res) => res.data),
  registerNgo: (data) => api.post('/ngos/register', data).then((res) => res.data),
  futureAi: () => api.get('/ai/future-modules').then((res) => res.data)
};
