import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Filter, Search, Archive } from 'lucide-react';

const Alarm = () => {
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High Pressure Alert',
      message: 'AirCom-001 pressure exceeds maximum threshold (8.2 bar)',
      machine: 'AirCom-001',
      timestamp: '2026-05-07 14:35:22',
      status: 'active',
      acknowledged: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Temperature Warning',
      message: 'AirCom-003 temperature running high (78°C)',
      machine: 'AirCom-003',
      timestamp: '2026-05-07 14:28:15',
      status: 'active',
      acknowledged: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'AirCom-002 requires routine maintenance within 50 hours',
      machine: 'AirCom-002',
      timestamp: '2026-05-07 13:45:00',
      status: 'active',
      acknowledged: true
    },
    {
      id: 4,
      type: 'critical',
      title: 'Power Failure',
      message: 'Power meter communication lost',
      machine: 'System',
      timestamp: '2026-05-07 12:15:33',
      status: 'resolved',
      acknowledged: true
    },
    {
      id: 5,
      type: 'warning',
      title: 'Low Flow Rate',
      message: 'Flow sensor reading below expected range',
      machine: 'System',
      timestamp: '2026-05-07 11:52:18',
      status: 'resolved',
      acknowledged: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlarms = alarms.filter(alarm => {
    const matchesFilter = filter === 'all' || alarm.type === filter || (filter === 'active' && alarm.status === 'active');
    const matchesSearch = alarm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.machine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAcknowledge = (alarmId) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
    ));
  };

  const handleResolve = (alarmId) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, status: 'resolved' } : alarm
    ));
  };

  const handleArchive = (alarmId) => {
    setAlarms(alarms.filter(alarm => alarm.id !== alarmId));
  };

  const getAlarmIcon = (type) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlarmColor = (type) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadge = (status, acknowledged) => {
    if (status === 'resolved') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Resolved</span>;
    }
    if (acknowledged) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Acknowledged</span>;
    }
    return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">New</span>;
  };

  const alarmStats = {
    total: alarms.length,
    active: alarms.filter(a => a.status === 'active').length,
    critical: alarms.filter(a => a.type === 'critical' && a.status === 'active').length,
    warning: alarms.filter(a => a.type === 'warning' && a.status === 'active').length,
    info: alarms.filter(a => a.type === 'info' && a.status === 'active').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Alarms</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alarms</p>
              <p className="text-2xl font-bold text-gray-900">{alarmStats.total}</p>
            </div>
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-orange-600">{alarmStats.active}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{alarmStats.critical}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-600">{alarmStats.warning}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Info</p>
              <p className="text-2xl font-bold text-blue-600">{alarmStats.info}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search alarms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Alarms</option>
              <option value="active">Active</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlarms.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alarms found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredAlarms.map(alarm => (
              <div key={alarm.id} className={`border rounded-lg p-4 ${getAlarmColor(alarm.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlarmIcon(alarm.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{alarm.title}</h3>
                        {getStatusBadge(alarm.status, alarm.acknowledged)}
                      </div>
                      <p className="text-gray-700 mb-2">{alarm.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Machine: {alarm.machine}</span>
                        <span>•</span>
                        <span>{alarm.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {alarm.status === 'active' && !alarm.acknowledged && (
                      <button
                        onClick={() => handleAcknowledge(alarm.id)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                    {alarm.status === 'active' && (
                      <button
                        onClick={() => handleResolve(alarm.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleArchive(alarm.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alarm;
