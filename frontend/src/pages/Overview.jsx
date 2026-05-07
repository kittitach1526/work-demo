import React, { useState } from 'react';
import { Eye, Activity, Zap, AlertCircle } from 'lucide-react';

const Overview = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const systemImages = [
    {
      id: 1,
      name: 'Main System Overview',
      path: '/images/system-overview.png',
      description: 'Complete air compressor system layout'
    },
    {
      id: 2,
      name: 'Control Panel',
      path: '/images/control-panel.png',
      description: 'Main control interface and monitoring station'
    },
    {
      id: 3,
      name: 'Compressor Room',
      path: '/images/compressor-room.png',
      description: 'Physical layout of compressor units'
    }
  ];

  const systemStats = [
    {
      title: 'Active Compressors',
      value: '3/5',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'System Pressure',
      value: '7.2 bar',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Flow Rate',
      value: '450 m³/h',
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Alerts',
      value: '2',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">System Diagrams</h2>
          <p className="text-gray-600 mt-1">Click on any image to view detailed information</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemImages.map((image) => (
              <div
                key={image.id}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => setSelectedImage(image)}
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Eye className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{image.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">{selectedImage.name}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-700">{selectedImage.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">File:</span>
                  <span className="text-gray-600 ml-2">{selectedImage.path}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Size:</span>
                  <span className="text-gray-600 ml-2">2.4 MB</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Last Modified:</span>
                  <span className="text-gray-600 ml-2">2026-05-07 08:30</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Resolution:</span>
                  <span className="text-gray-600 ml-2">1920x1080</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
