import api from './api';

export const getResumes = async () => {
  const res = await api.get('/resumes');
  return res.data;
};

export const getResume = async (id) => {
  const res = await api.get(`/resumes/${id}`);
  return res.data;
};

export const createResume = async (data) => {
  const res = await api.post('/resumes', data);
  return res.data;
};

export const updateResume = async (id, data) => {
  const res = await api.put(`/resumes/${id}`, data);
  return res.data;
};

export const deleteResume = async (id) => {
  const res = await api.delete(`/resumes/${id}`);
  return res.data;
};

export const forwardResume = async (id, email) => {
  const res = await api.post(`/resumes/forward/${id}`, { email });
  return res.data;
};

