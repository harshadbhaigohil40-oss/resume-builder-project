import api from './api';

export const analyzeResume = async (resumeData) => {
  const response = await api.post('/ai/analyze', { resumeData });
  return response.data;
};
