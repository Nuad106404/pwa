import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, PlusCircle, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import InstallPrompt from '../components/ui/InstallPrompt';
import OfflineIndicator from '../components/ui/OfflineIndicator';

const HomePage: React.FC = () => {
  const { deferredPrompt, installApp } = useAppContext();

  return (
    <>
      <OfflineIndicator />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <CheckSquare className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MERN PWA App</h1>
          <p className="text-xl text-gray-600 mb-8">
            A Progressive Web App built with MongoDB, Express, React, and Node.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
              <CheckSquare className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Manage Tasks</h2>
            <p className="text-gray-600 mb-4">
              Create, update, and track your tasks with our intuitive interface. Work offline and sync
              when you're back online.
            </p>
            <Link
              to="/tasks"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Tasks
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white mb-4">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create New Task</h2>
            <p className="text-gray-600 mb-4">
              Quickly add new tasks with title, description, and priority level. Stay organized and
              productive.
            </p>
            <Link
              to="/add-task"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Add Task
            </Link>
          </div>
        </div>

        {deferredPrompt && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Install as an App</h2>
                <p className="text-gray-600">
                  Add this app to your home screen for a better experience and offline access.
                </p>
              </div>
              <button
                onClick={installApp}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Install App
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">PWA Features</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">✓</span>
              <span>Works offline with cached data</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">✓</span>
              <span>Can be installed on your home screen</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">✓</span>
              <span>Fast loading with optimized assets</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">✓</span>
              <span>Native app-like experience</span>
            </li>
            <li className="flex items-start">
              <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">✓</span>
              <span>Automatic updates when online</span>
            </li>
          </ul>
        </div>
      </div>
      <InstallPrompt />
    </>
  );
};

export default HomePage;