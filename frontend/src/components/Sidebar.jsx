import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  Zap,
  Activity,
  Battery,
  Clock,
    Bell,
  Download,
  ChevronDown
} from 'lucide-react';

const menuItems = [
  {
    name: 'Overview',
    path: '/dashboard/overview',
    icon: Eye,
    description: 'System overview'
  },
  {
    name: 'Aircom',
    path: '/dashboard/aircom',
    icon: Zap,
    description: 'Compressor control'
  },
  {
    name: 'Sensor System',
    path: '/dashboard/sensor-system',
    icon: Activity,
    description: 'Sensor monitoring'
  },
  {
    name: 'Energy System',
    path: '/dashboard/energy-system',
    icon: Battery,
    description: 'Power usage'
  },
  {
    name: 'Auto Energy Mode',
    path: '/dashboard/auto-energy-mode',
    icon: Clock,
    description: 'Scheduling'
  },
  {
    name: 'Aircom Timeline',
    path: '/dashboard/aircom-timeline',
    icon: Clock,
    description: 'Operation history'
  },
  {
    name: 'Alarm',
    path: '/dashboard/alarm',
    icon: Bell,
    description: 'Alerts & notifications'
  },
  {
    name: 'Export Data',
    path: '/dashboard/export-data',
    icon: Download,
    description: 'Data export'
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex-shrink-0 shadow-2xl flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-8">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Control Panel
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white hover:shadow-lg'
                  }`
                }
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20 shadow-inner' 
                    : 'bg-gray-700/50 group-hover:bg-white/10'
                }`}>
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-all duration-300">
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-gradient-to-t from-gray-900/90 to-transparent">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 backdrop-blur-sm border border-green-500/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">System Status: Online</span>
          </div>
          <div className="text-xs text-gray-500 text-center">
            Last sync: Just now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
