import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  AlertTriangle, 
  Clock, 
  Search,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Incidents = () => {
  const [sortField, setSortField] = useState('time');
  const [sortDirection, setSortDirection] = useState('desc');

  const incidents = [
    { id: 'TR-001', time: '18:42', zone: 'Darshan', type: 'Crowd Surge', severity: 'Critical', response: '4 min', status: 'Resolved' },
    { id: 'TR-002', time: '18:31', zone: 'Queue A', type: 'High Density', severity: 'High', response: '3 min', status: 'Resolved' },
    { id: 'TR-003', time: '17:54', zone: 'Gate 3', type: 'Barricade', severity: 'Medium', response: '6 min', status: 'Resolved' },
    { id: 'TR-004', time: '17:20', zone: 'VIP Corridor', type: 'Security', severity: 'Low', response: '2 min', status: 'Resolved' },
    { id: 'TR-005', time: '16:45', zone: 'Exit', type: 'Medical', severity: 'High', response: '5 min', status: 'Active' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'text-critical';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-warning';
      default: return 'text-info';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Resolved' ? 'text-success' : 'text-warning';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Incident Management</h1>
          <p className="text-gray-400">Track and manage all security incidents</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
          <Button size="sm" variant="secondary">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button size="sm" variant="secondary">
            Export
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search incidents..."
          className="w-full bg-dark-secondary text-white rounded-lg pl-10 pr-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
        />
      </div>

      {/* Table */}
      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)]">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Time</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Zone</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Severity</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Response</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-dark-elevated transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">{incident.id}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{incident.time}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{incident.zone}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{incident.type}</td>
                <td className="py-3 px-4 text-sm font-medium">
                  <span className={getSeverityColor(incident.severity)}>{incident.severity}</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-300">{incident.response}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={getStatusColor(incident.status)}>{incident.status}</span>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Incidents;