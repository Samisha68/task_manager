const API_URL = 'http://localhost:3000/api';

export const taskService = {
  getAllTasks: async () => {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
  },

  createTask: async (task) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  updateTask: async (id, task) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  deleteTask: async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};