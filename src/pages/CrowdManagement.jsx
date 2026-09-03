import React from 'react';
import { Card } from '../components/ui/Card';
import { Users, Clock, Activity, AlertTriangle } from 'lucide-react';
import { useRealtimeData } from '../hooks/useRealtimeData';

export const CrowdManagement = () => {
  const { zones, stats } = useRealtimeData();
  const queues = zones.filter((z) => z.type === 'queue');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Crowd Management</h1>
        <p className="text-gray-400">Monitor and manage crowd flow across all zones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase">Current Visitors</p>
              <p className="text-2xl font-bold text-white">{stats.visitorsInside.toLocaleString()}</p>
            </div>
            <Users className="w-6 h-6 text-primary" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase">Avg Queue Time</p>
              <p className="text-2xl font-bold text-white">{stats.avgQueueTime} min</p>
            </div>
            <Clock className="w-6 h-6 text-info" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase">Fastest Queue</p>
              <p className="text-2xl font-bold text-white">Queue B</p>
              <p className="text-xs text-success">21 min</p>
            </div>
            <Activity className="w-6 h-6 text-success" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase">Most Congested</p>
              <p className="text-2xl font-bold text-white">Darshan</p>
              <p className="text-xs text-critical">93% capacity</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-critical" />
          </div>
        </Card>
      </div>

      {/* Queue Monitoring */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Queue Monitoring</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {queues.map((queue) => (
            <Card key={queue.id} elevated>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">{queue.name}</h3>
                  <span className="text-xs text-gray-400">{queue.currentOccupancy} people</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Capacity</span>
                    <span className={queue.density > 80 ? 'text-critical' : 'text-gray-300'}>
                      {queue.density}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        queue.density > 80
                          ? 'bg-critical'
                          : queue.density > 60
                          ? 'bg-warning'
                          : 'bg-success'
                      }`}
                      style={{ width: `${queue.density}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Est. wait</span>
                  <span className="text-white font-medium">{queue.queueTime} min</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};