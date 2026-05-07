import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar userName="Admin User" />
      </div>
      <div className="flex pt-16">
        <div className="fixed left-0 top-16 bottom-0 z-40">
          <Sidebar />
        </div>
        <main className="flex-1 ml-64 p-6 pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
