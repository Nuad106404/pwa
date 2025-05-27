import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, AlertCircle, Loader } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/ui/TaskCard';
import OfflineIndicator from '../components/ui/OfflineIndicator';

const TasksPage: React.FC = () => {
  const { tasks, loading, error, fetchTasks } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <>
      <OfflineIndicator />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Tasks</h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>
            <Link
              to="/add-task"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Task
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-60">
            <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading tasks...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You don't have any tasks yet. Create your first task to get started."
                : filter === 'active'
                ? "You don't have any active tasks. All your tasks are completed!"
                : "You don't have any completed tasks yet."}
            </p>
            <Link
              to="/add-task"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add New Task
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map(task => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TasksPage;