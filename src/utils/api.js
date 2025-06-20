import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.defaults.baseURL = https://task-manager-d4k0.onrender.com;

export const taskAPI = {
  getTasks: () => axios.get('/api/tasks'),
  createTask: (task) => axios.post('/api/tasks', task),
  updateTask: (id, task) => axios.put(`/api/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`/api/tasks/${id}`),
};

export default axios;
