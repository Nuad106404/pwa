import React from 'react';
import { Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const InstallPrompt: React.FC = () => {
  const { deferredPrompt, installApp } = useAppContext();

  if (!deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 animate-slideUp">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-900">Install MERN PWA App</h3>
          <p className="text-sm text-gray-600">Add to your home screen for a better experience</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => document.body.classList.remove('has-install-prompt')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Not now
          </button>
          <button
            onClick={installApp}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Download className="h-5 w-5 mr-1" />
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;