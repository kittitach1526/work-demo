import React, { useState } from 'react';
import { Clock, Zap, Play, Pause } from 'lucide-react';

const AircomTimeline = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day');

  const timelineData = [
    {
      time: '00:00',
      AirCom001: { status: 'running', duration: 120, color: '#10b981' },
      AirCom002: { status: 'stopped', duration: 0, color: '#ef4444' },
      AirCom003: { status: 'running', duration: 120, color: '#10b981' },
      AirCom004: { status: 'stopped', duration: 0, color: '#ef4444' }
    },
    {
      time: '04:00',
      AirCom001: { status: 'running', duration: 240, color: '#10b981' },
      AirCom002: { status: 'stopped', duration: 0, color: '#ef4444' },
      AirCom003: { status: 'running', duration: 240, color: '#10b981' },
      AirCom004: { status: 'stopped', duration: 0, color: '#ef4444' }
    },
    {
      time: '08:00',
      AirCom001: { status: 'running', duration: 180, color: '#10b981' },
      AirCom002: { status: 'running', duration: 60, color: '#10b981' },
      AirCom003: { status: 'running', duration: 240, color: '#10b981' },
      AirCom004: { status: 'stopped', duration: 0, color: '#ef4444' }
    },
    {
      time: '12:00',
      AirCom001: { status: 'running', duration: 240, color: '#10b981' },
      AirCom002: { status: 'running', duration: 120, color: '#10b981' },
      AirCom003: { status: 'running', duration: 240, color: '#10b981' },
      AirCom004: { status: 'running', duration: 60, color: '#10b981' }
    },
    {
      time: '16:00',
      AirCom001: { status: 'running', duration: 180, color: '#10b981' },
      AirCom002: { status: 'stopped', duration: 0, color: '#ef4444' },
      AirCom003: { status: 'running', duration: 240, color: '#10b981' },
      AirCom004: { status: 'running', duration: 120, color: '#10b981' }
    },
    {
      time: '20:00',
      AirCom001: { status: 'running', duration: 240, color: '#10b981' },
      AirCom002: { status: 'stopped', duration: 0, color: '#ef4444' },
      AirCom003: { status: 'running', duration: 240, color: '#10b981' },
      AirCom004: { status: 'stopped', duration: 0, color: '#ef4444' }
    },
    {
      time: '24:00',
      AirCom001: { status: 'running', duration: 0, color: '#10b981' },
      AirCom002: { status: 'stopped', duration: 0, color: '#ef4444' },
      AirCom003: { status: 'running', duration: 0, color: '#10b981' },
      AirCom004: { status: 'stopped', duration: 0, color: '#ef4444' }
    }
  ];

  const machines = ['AirCom001', 'AirCom002', 'AirCom003', 'AirCom004'];
  const hours = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ':00');

  const getTimelineBar = (machineData, timeSlot) => {
    const machineName = `AirCom${machineData}`;
    const timeData = timelineData.find(t => t.time === timeSlot);
    if (!timeData) return null;
    
    const machineStatus = timeData[machineName];
    if (!machineStatus) return null;

    const width = (machineStatus.duration / 60) * 100;
    
    return (
      <div
        key={`${machineName}-${timeSlot}`}
        className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
        style={{
          width: `${width}%`,
          backgroundColor: machineStatus.color,
          minWidth: width > 0 ? '20px' : '0'
        }}
      >
        {width > 30 && (
          <div className="flex items-center space-x-1">
            {machineStatus.status === 'running' ? (
              <Play className="w-3 h-3" />
            ) : (
              <Pause className="w-3 h-3" />
            )}
            <span>{machineStatus.duration}m</span>
          </div>
        )}
      </div>
    );
  };

  const getMachineStats = (machineName) => {
    let totalRunTime = 0;
    let totalStopTime = 0;
    
    timelineData.forEach(timeSlot => {
      const machineData = timeSlot[machineName];
      if (machineData) {
        if (machineData.status === 'running') {
          totalRunTime += machineData.duration;
        } else {
          totalStopTime += machineData.duration;
        }
      }
    });

    const totalTime = totalRunTime + totalStopTime;
    const efficiency = totalTime > 0 ? (totalRunTime / totalTime) * 100 : 0;

    return {
      totalRunTime,
      totalStopTime,
      efficiency: efficiency.toFixed(1)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">AirCom Timeline</h1>
        <div className="flex items-center space-x-4">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="day">Day View</option>
            <option value="week">Week View</option>
            <option value="month">Month View</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {machines.map(machine => {
          const stats = getMachineStats(machine);
          return (
            <div key={machine} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{machine}</h3>
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Run Time:</span>
                  <span className="font-medium">{stats.totalRunTime} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stop Time:</span>
                  <span className="font-medium">{stats.totalStopTime} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Efficiency:</span>
                  <span className="font-medium text-green-600">{stats.efficiency}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Operation Timeline</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="flex border-b border-gray-200 pb-2 mb-4">
                <div className="w-32 font-medium text-gray-700">Machine</div>
                <div className="flex-1 flex space-x-1">
                  {hours.map(hour => (
                    <div key={hour} className="text-xs text-gray-500 text-center" style={{ minWidth: '40px' }}>
                      {hour}
                    </div>
                  ))}
                </div>
              </div>

              {machines.map(machine => {
                const stats = getMachineStats(machine);
                return (
                  <div key={machine} className="flex items-center mb-4">
                    <div className="w-32 pr-4">
                      <div className="font-medium text-gray-900">{machine}</div>
                      <div className="text-xs text-gray-500">{stats.efficiency}% efficiency</div>
                    </div>
                    <div className="flex-1 flex space-x-1 h-8">
                      {timelineData.map((timeSlot, index) => {
                        const machineData = timeSlot[machine];
                        if (!machineData || machineData.duration === 0) {
                          return (
                            <div
                              key={index}
                              className="h-8 bg-gray-100 rounded"
                              style={{ minWidth: '40px' }}
                            />
                          );
                        }
                        
                        const width = (machineData.duration / 60) * 100;
                        return (
                          <div
                            key={index}
                            className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                            style={{
                              width: `${width}%`,
                              backgroundColor: machineData.color,
                              minWidth: width > 0 ? '20px' : '0'
                            }}
                          >
                            {width > 30 && (
                              <div className="flex items-center space-x-1">
                                {machineData.status === 'running' ? (
                                  <Play className="w-3 h-3" />
                                ) : (
                                  <Pause className="w-3 h-3" />
                                )}
                                <span>{machineData.duration}m</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Running</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Stopped</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">No Data</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Timeline shows operation status in 4-hour intervals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircomTimeline;
