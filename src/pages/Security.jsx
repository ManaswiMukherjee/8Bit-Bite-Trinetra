import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  CheckCircle,
  Send,
  User
} from 'lucide-react';

export const Security = () => {
  const securityTeams = [
    { id: 'team-01', name: 'Security Team 01', zone: 'Entrance', officers: 6, status: 'available' },
    { id: 'team-02', name: 'Security Team 02', zone: 'Queue A', officers: 5, status: 'on-duty' },
    { id: 'team-03', name: 'Security Team 03', zone: 'Darshan', officers: 8, status: 'responding' },
    { id: 'team-04', name: 'Security Team 04', zone: 'Emergency Response', officers: 6, status: 'available' },
    { id: 'team-05', name: 'Security Team 05', zone: 'VIP Area', officers: 4, status: 'available' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Teams</h1>
          <p className="text-gray-400">Manage security personnel and deployments</p>
        </div>
        <Button className="mt-2 lg:mt-0">
          <Users className="w-4 h-4 mr-2" />
          Deploy Team
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {securityTeams.map((team) => (
          <Card key={team.id} elevated hover>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  team.status === 'available' ? 'bg-success/10' :
                  team.status === 'responding' ? 'bg-warning/10' :
                  'bg-info/10'
                }`}>
                  <Shield className={`w-6 h-6 ${
                    team.status === 'available' ? 'text-success' :
                    team.status === 'responding' ? 'text-warning' :
                    'text-info'
                  }`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{team.name}</h3>
                  <p className="text-xs text-gray-400">{team.zone}</p>
                </div>
              </div>
              <StatusBadge status={team.status} />
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{team.officers} officers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{team.zone}</span>
                </div>
              </div>
              {team.status === 'available' && (
                <Button size="sm" variant="primary">
                  <Send className="w-4 h-4 mr-1" />
                  Dispatch
                </Button>
              )}
              {team.status === 'responding' && (
                <span className="text-xs text-warning flex items-center">
                  <Clock className="w-4 h-4 mr-1 animate-pulse" />
                  Responding
                </span>
              )}
              {team.status === 'on-duty' && (
                <span className="text-xs text-info flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  On Duty
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Security;