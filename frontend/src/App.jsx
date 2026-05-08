import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Aircom from './pages/Aircom';
import SensorSystem from './pages/SensorSystem';
import EnergySystem from './pages/EnergySystem';
import AutoEnergyMode from './pages/AutoEnergyMode';
import AircomTimeline from './pages/AircomTimeline';
import Alarm from './pages/Alarm';
import ExportData from './pages/ExportData';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="aircom" element={<Aircom />} />
          <Route path="sensor-system" element={<SensorSystem />} />
          <Route path="energy-system" element={<EnergySystem />} />
          <Route path="auto-energy-mode" element={<AutoEnergyMode />} />
          <Route path="aircom-timeline" element={<AircomTimeline />} />
          <Route path="alarm" element={<Alarm />} />
          <Route path="export-data" element={<ExportData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
