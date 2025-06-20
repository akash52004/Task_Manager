import axios from 'axios';

const API_URL = https://task-manager-1-92pe.onrender.com

axios.defaults.baseURL = API_URL;

export const taskAPI = {
  getTasks: () => axios.get('/api/tasks'),
  createTask: (task) => axios.post('/api/tasks', task),
  updateTask: (id, task) => axios.put(`/api/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`/api/tasks/${id}`),
};

export default axios;
