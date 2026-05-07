import React, { useState } from 'react';
import { Download, FileText, Database, Calendar, Filter, Search, CheckCircle } from 'lucide-react';

const ExportData = () => {
  const [selectedModule, setSelectedModule] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [format, setFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const modules = [
    { id: 'all', name: 'All Modules', description: 'Complete system data export' },
    { id: 'aircom', name: 'AirCom', description: 'Compressor performance and status data' },
    { id: 'sensor-system', name: 'Sensor System', description: 'Pressure, flow, and environmental sensor data' },
    { id: 'energy-system', name: 'Energy System', description: 'Power consumption and energy metrics' },
    { id: 'alarms', name: 'Alarms', description: 'System alerts and notifications history' },
    { id: 'timeline', name: 'Timeline', description: 'Operational timeline and scheduling data' }
  ];

  const exportFormats = [
    { id: 'csv', name: 'CSV', description: 'Comma-separated values for spreadsheet applications' },
    { id: 'json', name: 'JSON', description: 'Structured data format for developers' },
    { id: 'xlsx', name: 'Excel', description: 'Microsoft Excel workbook format' },
    { id: 'pdf', name: 'PDF', description: 'Formatted report document' }
  ];

  const dateRanges = [
    { id: '24h', name: 'Last 24 Hours' },
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' },
    { id: 'custom', name: 'Custom Range' }
  ];

  const recentExports = [
    {
      id: 1,
      module: 'All Modules',
      format: 'CSV',
      dateRange: 'Last 7 Days',
      timestamp: '2026-05-07 14:30:00',
      status: 'completed',
      fileSize: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: 2,
      module: 'Energy System',
      format: 'Excel',
      dateRange: 'Last 30 Days',
      timestamp: '2026-05-07 12:15:00',
      status: 'completed',
      fileSize: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: 3,
      module: 'AirCom',
      format: 'JSON',
      dateRange: 'Last 24 Hours',
      timestamp: '2026-05-07 10:45:00',
      status: 'completed',
      fileSize: '856 KB',
      downloadUrl: '#'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Export completed successfully!');
    }, 2000);
  };

  const getModuleIcon = (moduleId) => {
    switch (moduleId) {
      case 'all':
        return <Database className="w-5 h-5" />;
      case 'aircom':
        return <FileText className="w-5 h-5" />;
      case 'sensor-system':
        return <FileText className="w-5 h-5" />;
      case 'energy-system':
        return <FileText className="w-5 h-5" />;
      case 'alarms':
        return <FileText className="w-5 h-5" />;
      case 'timeline':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Data Export Center</h3>
            <p className="text-sm text-blue-700">
              Export system data in various formats for analysis and reporting.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Configuration</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Module
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modules.map(module => (
                    <div
                      key={module.id}
                      onClick={() => setSelectedModule(module.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedModule === module.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {getModuleIcon(module.id)}
                        <div>
                          <div className="font-medium text-gray-900">{module.name}</div>
                          <div className="text-sm text-gray-500">{module.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Date Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dateRanges.map(range => (
                    <button
                      key={range.id}
                      onClick={() => setDateRange(range.id)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        dateRange === range.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {exportFormats.map(formatOption => (
                    <div
                      key={formatOption.id}
                      onClick={() => setFormat(formatOption.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        format === formatOption.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{formatOption.name}</div>
                      <div className="text-sm text-gray-500">{formatOption.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isExporting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-3" />
                      Export Data
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Module:</span>
                <span className="font-medium">{modules.find(m => m.id === selectedModule)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date Range:</span>
                <span className="font-medium">{dateRanges.find(r => r.id === dateRange)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Format:</span>
                <span className="font-medium">{exportFormats.find(f => f.id === format)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Size:</span>
                <span className="font-medium">~2.1 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Records:</span>
                <span className="font-medium">~15,420</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Exports</h2>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search exports..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentExports.map(exportItem => (
                <tr key={exportItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {exportItem.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exportItem.format}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exportItem.dateRange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exportItem.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exportItem.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {exportItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
