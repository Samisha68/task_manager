// src/context/TaskContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  tasks: [],
  filter: 'All',
  searchTerm: '',
  sortBy: 'dueDate'
};

// Create the context
const TaskContext = createContext();

// Define action types for better maintainability
const TaskActionTypes = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT'
};

// Create the reducer to handle state updates
function taskReducer(state, action) {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }]
      };
      
    case TaskActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        )
      };
      
    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      
    case TaskActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
      
    case TaskActionTypes.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload
      };
      
    case TaskActionTypes.SET_SORT:
      return {
        ...state,
        sortBy: action.payload
      };
      
    default:
      return state;
  }
}

// Create the provider component
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Create an object with all our actions
  const actions = {
    addTask: (task) => dispatch({ type: TaskActionTypes.ADD_TASK, payload: task }),
    updateTask: (id, updates) => dispatch({ 
      type: TaskActionTypes.UPDATE_TASK, 
      payload: { id, updates } 
    }),
    deleteTask: (id) => dispatch({ type: TaskActionTypes.DELETE_TASK, payload: id }),
    setFilter: (filter) => dispatch({ type: TaskActionTypes.SET_FILTER, payload: filter }),
    setSearch: (term) => dispatch({ type: TaskActionTypes.SET_SEARCH, payload: term }),
    setSort: (sortBy) => dispatch({ type: TaskActionTypes.SET_SORT, payload: sortBy })
  };

  return (
    <TaskContext.Provider value={{ state, ...actions }}>
      {children}
    </TaskContext.Provider>
  );
}

// Create a custom hook for using the context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}