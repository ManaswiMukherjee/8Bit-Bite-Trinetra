import React, { useState } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  AlertTriangle, 
  Eye, 
  Users, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  Clock
} from 'lucide-react';

export const Alerts = () => {
  const { alerts } = useRealtimeData();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-critical border-critical';
      case 'high': return 'text-orange-500 border-orange-500';
      case 'medium': return 'text-warning border-warning';
      default: return 'text-info border-info';
    }
  };

  const getSeverityBg = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-critical/10';
      case 'high': return 'bg-orange-500/10';
      case 'medium': return 'bg-warning/10';
      default: return 'bg-info/10';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (searchTerm && !alert.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !alert.zone.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alert Center</h1>
          <p className="text-gray-400">Monitor and manage all security alerts</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
          <span className="text-sm text-gray-400">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === severity
                  ? 'bg-primary text-dark'
                  : 'bg-dark-elevated text-gray-400 hover:text-white'
              }`}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-secondary text-white rounded-lg pl-10 pr-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
          />
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white">No Alerts</h3>
            <p className="text-gray-400">All systems are operating normally</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} hover className="hover:border-primary/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getSeverityBg(alert.severity)}`}>
                    <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity)}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-white">{alert.title}</h3>
                      <StatusBadge status={alert.severity} />
                      {alert.status === 'active' && (
                        <span className="text-xs text-critical animate-pulse">● LIVE</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Zone: {alert.zone}</span>
                      {alert.riskScore && (
                        <span>Risk Score: {alert.riskScore}</span>
                      )}
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(alert.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {alert.status === 'active' && (
                    <>
                      <Button size="sm" variant="primary">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="success">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="danger">
                        <Users className="w-4 h-4 mr-1" />
                        Dispatch
                      </Button>
                    </>
                  )}
                  {alert.status === 'resolved' && (
                    <span className="text-xs text-success flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolved
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;