import React, { useState } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { Camera, AlertTriangle, Users, Activity, Maximize2 } from 'lucide-react';

const CameraCard = ({ camera }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-dark-panel rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] transition-all hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-dark-elevated flex items-center justify-center">
        {camera.status === 'online' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated to-dark-panel flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">{camera.name}</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-dark-secondary flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-critical mx-auto mb-2" />
              <p className="text-sm text-critical">Offline</p>
            </div>
          </div>
        )}

        {/* Live badge */}
        {camera.status === 'online' && (
          <div className="absolute top-2 left-2 flex items-center space-x-2 bg-critical/90 text-white text-xs px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>LIVE</span>
          </div>
        )}

        {/* Overlay info on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center justify-between text-white">
              <div className="space-y-1">
                <p className="text-xs text-gray-300">People: {camera.peopleCount}</p>
                <p className="text-xs text-gray-300">Density: {camera.density}%</p>
              </div>
              <div
                className={`text-xs font-bold px-2 py-1 rounded ${
                  camera.riskScore > 80
                    ? 'bg-critical/80 text-white'
                    : camera.riskScore > 60
                    ? 'bg-warning/80 text-white'
                    : 'bg-success/80 text-white'
                }`}
              >
                Risk: {camera.riskScore}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white">{camera.name}</h3>
            <p className="text-xs text-gray-400">{camera.zone}</p>
          </div>
          <button className="p-1 rounded-lg hover:bg-dark-elevated text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LiveMonitoring = () => {
  const { cameras, stats } = useRealtimeData();
  const onlineCameras = cameras.filter((c) => c.status === 'online');

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Monitoring</h1>
          <p className="text-gray-400">
            {onlineCameras.length} cameras connected • All systems operational
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-2 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="status-dot-success"></span>
            <span>{onlineCameras.length} Online</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="status-dot-warning"></span>
            <span>{cameras.length - onlineCameras.length} Offline</span>
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};