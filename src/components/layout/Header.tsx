import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, CheckSquare, PlusCircle, Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { deferredPrompt, installApp } = useAppContext();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClass = scrolled
    ? 'bg-white shadow-md transition-all duration-300'
    : 'bg-white/80 backdrop-blur-sm transition-all duration-300';

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-600 font-medium'
      : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <header className={`sticky top-0 z-10 ${headerClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MERN PWA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} flex items-center space-x-1`}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/tasks" className={`${isActive('/tasks')} flex items-center space-x-1`}>
              <CheckSquare className="h-5 w-5" />
              <span>Tasks</span>
            </Link>
            <Link
              to="/add-task"
              className={`${isActive('/add-task')} flex items-center space-x-1`}
            >
              <PlusCircle className="h-5 w-5" />
              <span>New Task</span>
            </Link>
            {deferredPrompt && (
              <button
                onClick={installApp}
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Install App</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-white border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-4 px-2">
              <Link to="/" className={`${isActive('/')} flex items-center space-x-2 p-2`}>
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link to="/tasks" className={`${isActive('/tasks')} flex items-center space-x-2 p-2`}>
                <CheckSquare className="h-5 w-5" />
                <span>Tasks</span>
              </Link>
              <Link
                to="/add-task"
                className={`${isActive('/add-task')} flex items-center space-x-2 p-2`}
              >
                <PlusCircle className="h-5 w-5" />
                <span>New Task</span>
              </Link>
              {deferredPrompt && (
                <button
                  onClick={installApp}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Install App</span>
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;