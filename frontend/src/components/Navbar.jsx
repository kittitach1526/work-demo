import React from 'react';
import { Zap, User, LogOut } from 'lucide-react';

const Navbar = ({ userName }) => {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Zap className="w-8 h-8 text-primary-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">
                AirCom Dashboard
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">{userName || 'Admin User'}</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
