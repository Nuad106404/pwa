import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Task } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask } = useAppContext();

  const handleToggleComplete = async () => {
    await updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex border-t border-gray-100">
        <button
          onClick={handleToggleComplete}
          className={`flex-1 p-2 flex items-center justify-center ${
            task.completed
              ? 'bg-green-50 text-green-600 hover:bg-green-100'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Check className="h-4 w-4 mr-1" />
          <span className="text-sm">{task.completed ? 'Completed' : 'Complete'}</span>
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="flex-1 p-2 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <Edit2 className="h-4 w-4 mr-1" />
          <span className="text-sm">Edit</span>
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 p-2 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;