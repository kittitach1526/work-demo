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
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <LayoutDashboard className="w-6 h-6 text-primary-400" />
          <span className="text-lg font-semibold">Control Panel</span>
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
                  `group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300">
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <ChevronDown className="w-4 h-4 text-white rotate-270" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 text-center">
          System Status: Online
        </div>
        <div className="text-xs text-gray-500 text-center mt-1">
          Last sync: Just now
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
