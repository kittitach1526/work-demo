import React, { useState } from 'react';
import { Zap, Play, Pause, Plus, Settings } from 'lucide-react';

const Aircom = () => {
  const [machines, setMachines] = useState([
    {
      id: 1,
      name: 'AirCom-001',
      status: 'running',
      pressure: 7.2,
      flowRate: 150,
      power: 45.5,
      temperature: 65,
      totalLoad: 85,
      totalRun: 12450
    },
    {
      id: 2,
      name: 'AirCom-002',
      status: 'stopped',
      pressure: 0,
      flowRate: 0,
      power: 0,
      temperature: 25,
      totalLoad: 0,
      totalRun: 8320
    },
    {
      id: 3,
      name: 'AirCom-003',
      status: 'running',
      pressure: 7.1,
      flowRate: 145,
      power: 44.2,
      temperature: 63,
      totalLoad: 82,
      totalRun: 15680
    }
  ]);

  const handleToggleMachine = (machineId) => {
    setMachines(machines.map(machine => {
      if (machine.id === machineId) {
        const newStatus = machine.status === 'running' ? 'stopped' : 'running';
        return {
          ...machine,
          status: newStatus,
          pressure: newStatus === 'running' ? 7.1 : 0,
          flowRate: newStatus === 'running' ? 140 : 0,
          power: newStatus === 'running' ? 43.8 : 0,
          temperature: newStatus === 'running' ? 62 : 25,
          totalLoad: newStatus === 'running' ? 80 : 0
        };
      }
      return machine;
    }));
  };

  const handleRunMachine = (machineId) => {
    setMachines(machines.map(machine => {
      if (machine.id === machineId && machine.status === 'stopped') {
        return {
          ...machine,
          status: 'running',
          pressure: 7.0,
          flowRate: 135,
          power: 42.5,
          temperature: 60,
          totalLoad: 78
        };
      }
      return machine;
    }));
  };

  const MachineCard = ({ machine }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            machine.status === 'running' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {machine.status === 'running' ? 'Running' : 'Stopped'}
          </span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-lg font-semibold text-gray-900">{machine.pressure} bar</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Flow Rate</p>
            <p className="text-lg font-semibold text-gray-900">{machine.flowRate} m³/h</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Power</p>
            <p className="text-lg font-semibold text-gray-900">{machine.power} kW</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-lg font-semibold text-gray-900">{machine.temperature}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Load</p>
            <p className="text-lg font-semibold text-gray-900">{machine.totalLoad}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Run</p>
            <p className="text-lg font-semibold text-gray-900">{machine.totalRun}h</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleToggleMachine(machine.id)}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
            machine.status === 'running'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {machine.status === 'running' ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </button>
        
        {machine.status === 'stopped' && (
          <button
            onClick={() => handleRunMachine(machine.id)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </button>
        )}
      </div>
    </div>
  );

  const EmptyMachineCard = () => (
    <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center min-h-[320px]">
      <Plus className="w-12 h-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">Add New Machine</h3>
      <p className="text-sm text-gray-500 text-center mb-4">
        Configure and add a new air compressor to the system
      </p>
      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
        Add Machine
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Air Compressor Control</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Active: {machines.filter(m => m.status === 'running').length}/{machines.length}
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {machines.map(machine => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
        <EmptyMachineCard />
      </div>
    </div>
  );
};

export default Aircom;
