import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Mock data
let tasks = [
  {
    _id: '1',
    title: 'Complete PWA setup',
    description: 'Finish the service worker configuration',
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Add offline support',
    description: 'Implement caching strategies for offline use',
    priority: 'medium',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Test on mobile devices',
    description: 'Ensure the app works well on various mobile devices',
    priority: 'low',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t._id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  const newTask = {
    _id: uuidv4(),
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.patch('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  
  const updatedTask = { ...tasks[index] };
  if (req.body.title !== undefined) updatedTask.title = req.body.title;
  if (req.body.description !== undefined) updatedTask.description = req.body.description;
  if (req.body.completed !== undefined) updatedTask.completed = req.body.completed;
  if (req.body.priority !== undefined) updatedTask.priority = req.body.priority;
  
  tasks[index] = updatedTask;
  res.json(updatedTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  
  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
