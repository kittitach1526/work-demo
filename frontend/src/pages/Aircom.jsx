import React, { useState } from 'react';
import { Zap, Play, Pause, Plus, Settings, Check } from 'lucide-react';

const BRANDS = [
  {
    id: 'ac1',
    name: 'AirCom 1',
    desc: 'รุ่นมาตรฐาน ประหยัดพลังงาน',
    specs: '7.5 bar · 150 m³/h · 45 kW',
    emoji: '🔵',
    bg: '#E6F1FB',
    defaults: { pressure: 7.5, flowRate: 150, power: 45.0, temperature: 64, totalLoad: 85 }
  },
  {
    id: 'ac2',
    name: 'AirCom 2',
    desc: 'รุ่นกลาง ประสิทธิภาพสูง',
    specs: '8.0 bar · 180 m³/h · 55 kW',
    emoji: '🟢',
    bg: '#EAF3DE',
    defaults: { pressure: 8.0, flowRate: 180, power: 55.0, temperature: 68, totalLoad: 88 }
  },
  {
    id: 'ac3',
    name: 'AirCom 3',
    desc: 'รุ่น Heavy Duty แรงดันสูง',
    specs: '10.0 bar · 250 m³/h · 75 kW',
    emoji: '🔴',
    bg: '#FCEBEB',
    defaults: { pressure: 10.0, flowRate: 250, power: 75.0, temperature: 75, totalLoad: 92 }
  },
  {
    id: 'ac4',
    name: 'AirCom 4',
    desc: 'รุ่น Inverter ควบคุมอัตโนมัติ',
    specs: '8.5 bar · 200 m³/h · 60 kW',
    emoji: '🟡',
    bg: '#FAEEDA',
    defaults: { pressure: 8.5, flowRate: 200, power: 60.0, temperature: 70, totalLoad: 90 }
  },
  {
    id: 'ac5',
    name: 'AirCom 5',
    desc: 'รุ่น Oil-Free สะอาดสูง',
    specs: '6.5 bar · 120 m³/h · 38 kW',
    emoji: '🟣',
    bg: '#EEEDFE',
    defaults: { pressure: 6.5, flowRate: 120, power: 38.0, temperature: 58, totalLoad: 78 }
  }
];

const INITIAL_MACHINES = [
  {
    id: 1, brand: 'ac1', name: 'AirCom-001', model: 'AirCom 1',
    status: 'running', pressure: 7.2, flowRate: 150, power: 45.5,
    temperature: 65, totalLoad: 85, totalRun: 12450
  },
  {
    id: 2, brand: 'ac1', name: 'AirCom-002', model: 'AirCom 1',
    status: 'stopped', pressure: 0, flowRate: 0, power: 0,
    temperature: 25, totalLoad: 0, totalRun: 8320
  },
  {
    id: 3, brand: 'ac2', name: 'AirCom-003', model: 'AirCom 2',
    status: 'running', pressure: 8.0, flowRate: 178, power: 54.2,
    temperature: 67, totalLoad: 88, totalRun: 15680
  }
];

// ── Modal: เลือกรุ่นเครื่อง ──────────────────────────────────────────────────
const AddMachineModal = ({ onConfirm, onCancel }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">เลือกรุ่นเครื่อง</h2>
        <p className="text-sm text-gray-500 mb-4">เลือกยี่ห้อ/รุ่น แล้วข้อมูลจะขึ้นอัตโนมัติ</p>

        <div className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelected(brand.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                selected === brand.id
                  ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: brand.bg }}
              >
                {brand.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{brand.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{brand.desc}</p>
                <p className="text-xs text-gray-400 mt-0.5">{brand.specs}</p>
              </div>
              {selected === brand.id && (
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => selected && onConfirm(selected)}
            disabled={!selected}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            เพิ่มเครื่อง
          </button>
        </div>
      </div>
    </div>
  );
};

// ── การ์ดเครื่อง ──────────────────────────────────────────────────────────────
const MachineCard = ({ machine, onToggle }) => {
  const brand = BRANDS.find((b) => b.id === machine.brand);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{machine.name}</h3>
          <p className="text-xs text-gray-400 mb-1">{machine.model}</p>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              machine.status === 'running'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {machine.status === 'running' ? 'Running' : 'Stopped'}
          </span>
        </div>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: brand?.bg ?? '#F1EFE8' }}
        >
          {brand?.emoji ?? '⚙️'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Pressure', value: `${machine.pressure.toFixed(1)} bar` },
          { label: 'Temperature', value: `${machine.temperature}°C` },
          { label: 'Flow Rate', value: `${machine.flowRate} m³/h` },
          { label: 'Total Load', value: `${machine.totalLoad}%` },
          { label: 'Power', value: `${machine.power.toFixed(1)} kW` },
          { label: 'Total Run', value: `${machine.totalRun.toLocaleString()}h` }
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onToggle(machine.id)}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          machine.status === 'running'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {machine.status === 'running' ? (
          <><Pause className="w-4 h-4" /> Stop</>
        ) : (
          <><Play className="w-4 h-4" /> Start</>
        )}
      </button>
    </div>
  );
};

// ── การ์ดเพิ่มเครื่อง ─────────────────────────────────────────────────────────
const EmptyCard = ({ onAdd }) => (
  <div
    onClick={onAdd}
    className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center min-h-[260px] gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
      <Plus className="w-6 h-6 text-gray-500" />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-gray-700">เพิ่มเครื่องใหม่</p>
      <p className="text-xs text-gray-500 mt-1">เลือกรุ่นจากรายการ</p>
    </div>
    <button
      onClick={(e) => { e.stopPropagation(); onAdd(); }}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      Add Machine
    </button>
  </div>
);

// ── หน้าหลัก ──────────────────────────────────────────────────────────────────
const Aircom = () => {
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [nextId, setNextId] = useState(4);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (machineId) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== machineId) return m;
        const brand = BRANDS.find((b) => b.id === m.brand);
        const d = brand?.defaults ?? { pressure: 7.0, flowRate: 140, power: 43.0, temperature: 62, totalLoad: 80 };
        const running = m.status !== 'running';
        return {
          ...m,
          status: running ? 'running' : 'stopped',
          pressure: running ? d.pressure : 0,
          flowRate: running ? d.flowRate : 0,
          power: running ? d.power : 0,
          temperature: running ? d.temperature : 25,
          totalLoad: running ? d.totalLoad : 0
        };
      })
    );
  };

  const handleConfirmAdd = (brandId) => {
    const brand = BRANDS.find((b) => b.id === brandId);
    if (!brand) return;
    const num = String(nextId).padStart(3, '0');
    setMachines((prev) => [
      ...prev,
      {
        id: nextId,
        brand: brand.id,
        name: `AirCom-${num}`,
        model: brand.name,
        status: 'running',
        pressure: brand.defaults.pressure,
        flowRate: brand.defaults.flowRate,
        power: brand.defaults.power,
        temperature: brand.defaults.temperature,
        totalLoad: brand.defaults.totalLoad,
        totalRun: 0
      }
    ]);
    setNextId((n) => n + 1);
    setShowModal(false);
  };

  const runningCount = machines.filter((m) => m.status === 'running').length;

  return (
    <div className="space-y-6">
      {showModal && (
        <AddMachineModal
          onConfirm={handleConfirmAdd}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Air Compressor Control</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Active: <strong className="text-gray-900">{runningCount}/{machines.length}</strong></span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} onToggle={handleToggle} />
        ))}
        <EmptyCard onAdd={() => setShowModal(true)} />
      </div>
    </div>
  );
};

export default Aircom;