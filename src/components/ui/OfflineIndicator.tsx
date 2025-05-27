import React from 'react';
import { WifiOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const OfflineIndicator: React.FC = () => {
  const { online } = useAppContext();

  if (online) {
    return null;
  }

  return (
    <div className="fixed top-16 inset-x-0 bg-amber-500 text-white py-2 z-10 animate-slideDown">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <WifiOff className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">You are currently offline. Some features may be limited.</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;