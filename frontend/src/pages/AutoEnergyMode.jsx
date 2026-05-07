import React, { useState } from 'react';
import { Clock, Calendar, Settings, Play, Pause, Plus, Trash2, Edit, Save, X } from 'lucide-react';

const AutoEnergyMode = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: 'Morning Shift',
      machine: 'AirCom-001',
      priority: 1,
      startTime: '06:00',
      endTime: '14:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      minPressure: 6.5,
      maxPressure: 7.5,
      targetPressure: 7.0,
      enabled: true
    },
    {
      id: 2,
      name: 'Afternoon Shift',
      machine: 'AirCom-003',
      priority: 2,
      startTime: '14:00',
      endTime: '22:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      minPressure: 6.8,
      maxPressure: 7.8,
      targetPressure: 7.2,
      enabled: true
    },
    {
      id: 3,
      name: 'Night Operation',
      machine: 'AirCom-001',
      priority: 3,
      startTime: '22:00',
      endTime: '06:00',
      days: ['Sat', 'Sun'],
      minPressure: 6.0,
      maxPressure: 7.0,
      targetPressure: 6.5,
      enabled: false
    }
  ]);

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const machines = ['AirCom-001', 'AirCom-002', 'AirCom-003', 'AirCom-004'];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleToggleSchedule = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule
    ));
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule({ ...schedule });
  };

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id ? editingSchedule : schedule
      ));
      setEditingSchedule(null);
    }
  };

  const handleAddSchedule = () => {
    const newSchedule = {
      id: schedules.length + 1,
      name: 'New Schedule',
      machine: machines[0],
      priority: schedules.length + 1,
      startTime: '08:00',
      endTime: '16:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      minPressure: 6.0,
      maxPressure: 8.0,
      targetPressure: 7.0,
      enabled: true
    };
    setSchedules([...schedules, newSchedule]);
    setShowAddForm(false);
  };

  const ScheduleCard = ({ schedule }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{schedule.name}</h3>
          <p className="text-sm text-gray-600">{schedule.machine}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Priority: {schedule.priority}
          </span>
          <button
            onClick={() => handleToggleSchedule(schedule.id)}
            className={`p-2 rounded-lg transition-colors ${
              schedule.enabled 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {schedule.enabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleEditSchedule(schedule)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteSchedule(schedule.id)}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Time Range</p>
          <p className="font-medium text-gray-900">{schedule.startTime} - {schedule.endTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Days</p>
          <p className="font-medium text-gray-900">{schedule.days.join(', ')}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-xs text-gray-500 mb-1">Min Pressure</p>
          <p className="text-lg font-semibold text-gray-900">{schedule.minPressure} bar</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded">
          <p className="text-xs text-gray-500 mb-1">Target</p>
          <p className="text-lg font-semibold text-blue-600">{schedule.targetPressure} bar</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <p className="text-xs text-gray-500 mb-1">Max Pressure</p>
          <p className="text-lg font-semibold text-gray-900">{schedule.maxPressure} bar</p>
        </div>
      </div>
    </div>
  );

  const EditForm = ({ schedule, onSave, onCancel }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Edit Schedule</h3>
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={onCancel}
            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={schedule.name}
            onChange={(e) => setEditingSchedule({...schedule, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Machine</label>
          <select
            value={schedule.machine}
            onChange={(e) => setEditingSchedule({...schedule, machine: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {machines.map(machine => (
              <option key={machine} value={machine}>{machine}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <input
            type="number"
            value={schedule.priority}
            onChange={(e) => setEditingSchedule({...schedule, priority: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="time"
            value={schedule.startTime}
            onChange={(e) => setEditingSchedule({...schedule, startTime: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            type="time"
            value={schedule.endTime}
            onChange={(e) => setEditingSchedule({...schedule, endTime: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
        <div className="flex space-x-2">
          {daysOfWeek.map(day => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={schedule.days.includes(day)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEditingSchedule({...schedule, days: [...schedule.days, day]});
                  } else {
                    setEditingSchedule({...schedule, days: schedule.days.filter(d => d !== day)});
                  }
                }}
                className="mr-1"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Pressure (bar)</label>
          <input
            type="number"
            step="0.1"
            value={schedule.minPressure}
            onChange={(e) => setEditingSchedule({...schedule, minPressure: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Pressure (bar)</label>
          <input
            type="number"
            step="0.1"
            value={schedule.targetPressure}
            onChange={(e) => setEditingSchedule({...schedule, targetPressure: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Pressure (bar)</label>
          <input
            type="number"
            step="0.1"
            value={schedule.maxPressure}
            onChange={(e) => setEditingSchedule({...schedule, maxPressure: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Auto Energy Mode</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Automatic Energy Management</h3>
            <p className="text-sm text-blue-700">
              Configure schedules and priorities to optimize energy consumption based on demand patterns.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schedules.map(schedule => (
          editingSchedule?.id === schedule.id ? (
            <EditForm
              key={schedule.id}
              schedule={editingSchedule}
              onSave={handleSaveSchedule}
              onCancel={() => setEditingSchedule(null)}
            />
          ) : (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          )
        ))}
        
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Schedule</h3>
              <p className="text-gray-600 mb-4">Create a new automatic energy schedule</p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={handleAddSchedule}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create Schedule
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoEnergyMode;
