import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  MapPin, 
  Camera, 
  Shield, 
  AlertTriangle,
  Navigation,
  Maximize2,
  Minimize2,
  Layers
} from 'lucide-react';

export const TempleMapPage = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = [
    { id: 'gate-1', name: 'Gate 1', status: 'normal', people: 320, risk: 12, x: 10, y: 20 },
    { id: 'gate-2', name: 'Gate 2', status: 'normal', people: 280, risk: 15, x: 80, y: 20 },
    { id: 'security', name: 'Security Check', status: 'moderate', people: 450, risk: 45, x: 20, y: 40 },
    { id: 'queue-a', name: 'Queue A', status: 'high', people: 850, risk: 72, x: 30, y: 55 },
    { id: 'queue-b', name: 'Queue B', status: 'normal', people: 420, risk: 35, x: 60, y: 55 },
    { id: 'queue-c', name: 'Queue C', status: 'moderate', people: 620, risk: 58, x: 45, y: 70 },
    { id: 'darshan', name: 'Darshan Area', status: 'critical', people: 1240, risk: 91, x: 45, y: 50 },
    { id: 'vip', name: 'VIP Route', status: 'normal', people: 80, risk: 8, x: 70, y: 35 },
    { id: 'exit-1', name: 'Emergency Exit 1', status: 'normal', people: 0, risk: 0, x: 10, y: 85 },
    { id: 'exit-2', name: 'Emergency Exit 2', status: 'normal', people: 0, risk: 0, x: 85, y: 85 },
    { id: 'medical', name: 'Medical Station', status: 'normal', people: 5, risk: 0, x: 15, y: 75 },
    { id: 'control', name: 'Control Room', status: 'normal', people: 8, risk: 0, x: 75, y: 75 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'bg-success';
      case 'moderate': return 'bg-warning';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-critical animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk) => {
    if (risk > 80) return 'text-critical';
    if (risk > 60) return 'text-orange-500';
    if (risk > 30) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Temple Digital Map</h1>
          <p className="text-gray-400">Interactive map showing zone status and real-time data</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
          <Button size="sm" variant="secondary">
            <Layers className="w-4 h-4 mr-1" />
            Layers
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setZoom(zoom + 0.1)}>
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="relative overflow-hidden" style={{ height: '600px' }}>
            <div 
              className="w-full h-full bg-dark-elevated relative"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            >
              {/* Temple layout - simplified grid */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 p-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`relative rounded-lg border-2 transition-all cursor-pointer ${
                      selectedZone?.id === zone.id ? 'border-primary' : 'border-[rgba(255,255,255,0.08)]'
                    }`}
                    style={{
                      gridColumn: `${Math.floor(zone.x / 25) + 1}`,
                      gridRow: `${Math.floor(zone.y / 25) + 1}`,
                      background: `rgba(255,255,255,0.03)`,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`} />
                      <span className="text-[8px] text-gray-300 mt-1 text-center leading-tight">
                        {zone.name}
                      </span>
                      {zone.people > 0 && (
                        <span className="text-[8px] text-gray-400">{zone.people}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-dark-panel rounded-lg p-3 border border-[rgba(255,255,255,0.08)]">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    <span className="text-xs text-gray-400">Normal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-warning"></span>
                    <span className="text-xs text-gray-400">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="text-xs text-gray-400">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-critical animate-pulse"></span>
                    <span className="text-xs text-gray-400">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Zone Details Panel */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4">Zone Details</h3>
            {selectedZone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">{selectedZone.name}</h4>
                  <StatusBadge status={selectedZone.status} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">People Count</span>
                    <span className="text-white font-medium">{selectedZone.people}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk Score</span>
                    <span className={`font-medium ${getRiskColor(selectedZone.risk)}`}>
                      {selectedZone.risk} / 100
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white">{selectedZone.status.toUpperCase()}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-2">
                  <Button size="sm" variant="secondary" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    View Cameras
                  </Button>
                  <Button size="sm" variant="secondary" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Details
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a zone on the map</p>
                <p className="text-xs">Click any zone to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TempleMapPage;