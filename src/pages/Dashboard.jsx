import React from 'react';
import { Users, User, AlertTriangle, Activity, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ZoneStatusGrid } from '../components/dashboard/ZoneStatusGrid';
import { LiveAlerts } from '../components/dashboard/LiveAlerts';
import { CrowdTrendChart } from '../components/dashboard/CrowdTrendChart';

export const Dashboard = () => {
  const { zones, alerts, stats, loading } = useRealtimeData();

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' || a.severity === 'high');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Good evening, Control Room</h1>
          <p className="text-gray-400">Temple security overview • Live operational status across all zones</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 lg:mt-0">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-lg">
            <span className="status-dot-success animate-pulse"></span>
            <span className="text-sm text-success font-medium">SYSTEM LIVE</span>
          </div>
          {criticalAlerts.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-critical/10 rounded-lg">
              <span className="status-dot-critical"></span>
              <span className="text-sm text-critical font-medium">{criticalAlerts.length} Critical</span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Visitors Inside"
          value={stats.visitorsInside.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend={8.4}
          subtitle="from previous hour"
        />
        <MetricCard
          title="Today's Footfall"
          value={stats.todayFootfall.toLocaleString()}
          icon={<User className="w-5 h-5" />}
          trend={12.3}
          subtitle="vs yesterday"
        />
        <MetricCard
          title="Active Alerts"
          value={stats.activeAlerts.toString().padStart(2, '0')}
          icon={<AlertTriangle className="w-5 h-5 text-warning" />}
        />
        <MetricCard
          title="Critical Zones"
          value={stats.criticalZones.toString().padStart(2, '0')}
          icon={<Activity className="w-5 h-5 text-critical" />}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CrowdTrendChart />
          <ZoneStatusGrid />
        </div>
        <div className="lg:col-span-1">
          <LiveAlerts />
        </div>
      </div>
    </div>
  );
};