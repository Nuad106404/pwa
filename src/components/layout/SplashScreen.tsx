import React from 'react';
import { CheckSquare } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-600 z-50">
      <div className="text-center animate-pulse">
        <CheckSquare className="h-24 w-24 text-white mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white">MERN PWA</h1>
      </div>
    </div>
  );
};

export default SplashScreen;