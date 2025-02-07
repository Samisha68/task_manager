// src/hooks/useTaskManager.js
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      // Transform the data to match frontend structure
      const transformedTasks = data.map(task => ({
        id: task.id,
        name: task.taskName,
        description: task.description || '',
        dueDate: task.dueDate.split('T')[0], // Format date for frontend
        status: task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase()
      }));
      setTasks(transformedTasks);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    }
  };

  // Add new task
  const addTask = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName: newTask.name,
          description: newTask.description,
          dueDate: new Date(newTask.dueDate).toISOString(),
          status: newTask.status.toLowerCase().replace(' ', '_')
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add task');
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.message);
      console.error('Error adding task:', err);
    }
  };

  // Update task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName: updatedTask.name,
          description: updatedTask.description,
          dueDate: new Date(updatedTask.dueDate).toISOString(),
          status: updatedTask.status.toLowerCase().replace(' ', '_')
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');
      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    error
  };
};