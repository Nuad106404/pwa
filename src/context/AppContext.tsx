import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Task, AppContextType } from '../types';

// Use the proxy configured in vite.config.ts
const API_URL = '/api';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (task: Omit<Task, '_id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again later.');
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${API_URL}/tasks/${id}`, task);
      setTasks(tasks.map(t => (t._id === id ? response.data : t)));
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again later.');
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again later.');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Install app
  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('Installation prompt not available');
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the installation`);
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error during installation:', err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    loading,
    error,
    online,
    deferredPrompt,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    installApp
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};