import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

const OfflinePage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
      <WifiOff className="h-20 w-20 text-gray-400 mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-3">You're Offline</h1>
      <p className="text-gray-600 mb-8">
        It looks like you've lost your internet connection. Don't worry, you can still use some features of the app in offline mode.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        When you're back online, your changes will sync automatically.
      </p>
      <button
        onClick={handleRefresh}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <RefreshCw className="h-5 w-5 mr-1" />
        Try Again
      </button>
    </div>
  );
};

export default OfflinePage;