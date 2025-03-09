import axios from 'axios';

const API_URL = 'http://localhost:5002/api';  // Change from 5001 to 5002

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Agent APIs
export const createAgent = async (agentData) => {
  const response = await api.post('/agents', agentData);
  return response.data;
};

export const getAgents = async () => {
  const response = await api.get('/agents');
  return response.data;
};

// List APIs
export const uploadList = async (formData) => {
  try {
    // Remove Content-Type from default headers for file upload
    delete api.defaults.headers['Content-Type'];
    
    const response = await api.post('/lists/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add timeout and response type
      timeout: 30000,
      responseType: 'json',
      // Add upload progress handling if needed
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted);
      },
    });
    
    // Restore default Content-Type
    api.defaults.headers['Content-Type'] = 'application/json';
    return response.data;
  } catch (error) {
    console.error('Upload Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const getAgentLists = async (agentId) => {
  const response = await api.get(`/lists/${agentId}`);
  return response.data;
};

export default api;