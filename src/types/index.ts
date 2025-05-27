export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AppContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  online: boolean;
  deferredPrompt: any;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, '_id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  installApp: () => Promise<void>;
}