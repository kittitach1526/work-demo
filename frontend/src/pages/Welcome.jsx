import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Gauge, BarChart3 } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen tech-gradient flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6 animate-pulse-slow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Air Compressor Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Advanced monitoring and control system for industrial air compressors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Activity className="w-12 h-12 text-primary-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-300 text-sm">Live system status and performance metrics</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Gauge className="w-12 h-12 text-primary-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Smart Controls</h3>
            <p className="text-gray-300 text-sm">Automated energy management and scheduling</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <BarChart3 className="w-12 h-12 text-primary-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Analytics</h3>
            <p className="text-gray-300 text-sm">Comprehensive data analysis and reporting</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Zap className="w-12 h-12 text-primary-500 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Energy Efficient</h3>
            <p className="text-gray-300 text-sm">Optimize power consumption and reduce costs</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Enter Dashboard
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Air Compressor Dashboard System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
