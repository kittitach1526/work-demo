import React, { useState } from 'react';
import { Activity, Droplets, Thermometer, Zap, Gauge } from 'lucide-react';

const SensorSystem = () => {
  const [sensorData, setSensorData] = useState({
    pressureWet: {
      current: 7.2,
      unit: 'bar',
      status: 'normal'
    },
    flowSensor: {
      current: 450,
      unit: 'm³/h',
      status: 'normal'
    },
    dewPoint: {
      current: 3.5,
      unit: '°C',
      status: 'normal'
    },
    flowRateSummation: {
      current: 15420,
      unit: 'm³',
      status: 'normal'
    },
    powerMeter: {
      voltage: {
        Ua: 230.5,
        Ub: 231.2,
        Uc: 229.8,
        Uab: 400.2,
        Ubc: 401.1,
        Uca: 399.8
      },
      current: {
        Ia: 65.3,
        Ib: 66.1,
        Ic: 64.8
      },
      power: {
        kW: 45.2,
        kWh: 1247.8
      }
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const SensorCard = ({ title, value, unit, icon: Icon, status }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="ml-2 text-gray-500">{unit}</span>
      </div>
    </div>
  );

  const PowerDetailsCard = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Zap className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Power Meter Details</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Voltage (V)</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ua</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Ua}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ub</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Ub}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Uc</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Uc}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Uab</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Uab}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ubc</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Ubc}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Uca</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.voltage.Uca}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Current (A)</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ia</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.current.Ia}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ib</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.current.Ib}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Ic</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.current.Ic}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Power</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Power (kW)</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.power.kW}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-500">Energy (kWh)</p>
              <p className="text-lg font-semibold">{sensorData.powerMeter.power.kWh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sensor System</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SensorCard
          title="Pressure WET"
          value={sensorData.pressureWet.current}
          unit={sensorData.pressureWet.unit}
          icon={Gauge}
          status={sensorData.pressureWet.status}
        />
        <SensorCard
          title="Flow Sensor"
          value={sensorData.flowSensor.current}
          unit={sensorData.flowSensor.unit}
          icon={Activity}
          status={sensorData.flowSensor.status}
        />
        <SensorCard
          title="Dew Point"
          value={sensorData.dewPoint.current}
          unit={sensorData.dewPoint.unit}
          icon={Thermometer}
          status={sensorData.dewPoint.status}
        />
        <SensorCard
          title="Flow Rate Sum"
          value={sensorData.flowRateSummation.current}
          unit={sensorData.flowRateSummation.unit}
          icon={Droplets}
          status={sensorData.flowRateSummation.status}
        />
      </div>

      <PowerDetailsCard />
    </div>
  );
};

export default SensorSystem;
