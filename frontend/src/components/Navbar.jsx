import React from 'react';
import { Zap, User, LogOut, Bell, Settings } from 'lucide-react';

const Navbar = ({ userName }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">
                AirCom Dashboard
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 text-white">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <User className="w-5 h-5 text-white" />
              <span className="text-white font-medium">{userName || 'Admin User'}</span>
            </div>
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
