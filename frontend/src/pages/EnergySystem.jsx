import React, { useState } from 'react';
import { Battery, Zap, TrendingUp, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergySystem = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const powerData = [
    { time: '00:00', power: 45.2, flow: 420 },
    { time: '04:00', power: 42.8, flow: 395 },
    { time: '08:00', power: 48.5, flow: 452 },
    { time: '12:00', power: 52.3, flow: 485 },
    { time: '16:00', power: 49.7, flow: 463 },
    { time: '20:00', power: 46.1, flow: 428 },
    { time: '24:00', power: 44.9, flow: 415 }
  ];

  const energyDistribution = [
    { name: 'AirCom-001', value: 35, color: '#3b82f6' },
    { name: 'AirCom-002', value: 0, color: '#ef4444' },
    { name: 'AirCom-003', value: 40, color: '#10b981' },
    { name: 'AirCom-004', value: 25, color: '#f59e0b' }
  ];

  const efficiencyData = [
    { day: 'Mon', efficiency: 82 },
    { day: 'Tue', efficiency: 85 },
    { day: 'Wed', efficiency: 78 },
    { day: 'Thu', efficiency: 88 },
    { day: 'Fri', efficiency: 91 },
    { day: 'Sat', efficiency: 73 },
    { day: 'Sun', efficiency: 69 }
  ];

  const energyStats = [
    {
      title: 'Current Power',
      value: '47.3 kW',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+2.3%',
      changeType: 'positive'
    },
    {
      title: 'Total Energy Today',
      value: '1,135 kWh',
      icon: Battery,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Flow Rate',
      value: '442 m³/h',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '-1.2%',
      changeType: 'negative'
    },
    {
      title: 'Efficiency',
      value: '84.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+3.1%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Energy System</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {energyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Power & Flow Consumption</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={powerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="power" stroke="#3b82f6" name="Power (kW)" />
              <Line yAxisId="right" type="monotone" dataKey="flow" stroke="#10b981" name="Flow (m³/h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <PieChartIcon className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Energy Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={energyDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {energyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Weekly Efficiency</h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={efficiencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Power Meter Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Current Demand</span>
              <span className="font-semibold">47.3 kW</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Peak Today</span>
              <span className="font-semibold">52.3 kW</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Average Load</span>
              <span className="font-semibold">85.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flow Sensor Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Current Flow</span>
              <span className="font-semibold">442 m³/h</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Today's Total</span>
              <span className="font-semibold">10,608 m³</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Pressure</span>
              <span className="font-semibold">7.2 bar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergySystem;
