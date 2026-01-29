import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { ToastContainer } from '../ui/Toast';
import { useAuth } from '../../hooks/useAuth';

const Layout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        {isAuthenticated && (
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
        )}
        
        <main className={`flex-1 ${isAuthenticated ? 'md:ml-0' : ''}`}>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Layout;