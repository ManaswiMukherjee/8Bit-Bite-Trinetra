// src/pages/LiveMonitoring.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { 
  Camera, 
  AlertTriangle, 
  Users, 
  Activity, 
  Maximize2,
  Grid,
  LayoutGrid,
  List,
  Search,
  Filter,
  ChevronDown,
  Wifi,
  Radio,
  Eye,
  Shield,
  Zap,
  Clock,
  RefreshCw,
  MapPin,
  Target,
  Gauge,
  CheckCircle,
  XCircle,
  Minus,
  Plus,
  Play,
  Pause,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveMonitoring = () => {
  const { cameras, stats, loading } = useRealtimeData();
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCamera, setHoveredCamera] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState('all');

  const onlineCameras = cameras.filter(c => c.status === 'online');
  const offlineCameras = cameras.filter(c => c.status === 'offline');

  const filteredCameras = cameras.filter(camera => {
    if (filter === 'online' && camera.status !== 'online') return false;
    if (filter === 'offline' && camera.status !== 'offline') return false;
    if (filter === 'high-risk' && (camera.riskScore < 70)) return false;
    if (searchTerm && !camera.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !camera.zone.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedRisk !== 'all') {
      if (selectedRisk === 'high' && camera.riskScore < 70) return false;
      if (selectedRisk === 'medium' && (camera.riskScore < 40 || camera.riskScore >= 70)) return false;
      if (selectedRisk === 'low' && camera.riskScore >= 40) return false;
    }
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getRiskColor = (risk) => {
    if (risk >= 70) return { text: 'text-[#EF4444]', bg: 'bg-[#EF4444]/20', border: 'border-[#EF4444]/30' };
    if (risk >= 40) return { text: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/20', border: 'border-[#F59E0B]/30' };
    return { text: 'text-[#22C55E]', bg: 'bg-[#22C55E]/20', border: 'border-[#22C55E]/30' };
  };

  const getRiskLabel = (risk) => {
    if (risk >= 70) return 'HIGH RISK';
    if (risk >= 40) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  const CameraCard = ({ camera, index }) => {
    const riskColors = getRiskColor(camera.riskScore);
    const isOnline = camera.status === 'online';
    const isHovered = hoveredCamera === camera.id;
    const isHighRisk = camera.riskScore >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`bg-[#0D1118] rounded-xl border overflow-hidden transition-all duration-300 group ${
          isHovered ? 'border-[#E6A23C] shadow-lg shadow-[#E6A23C]/10 -translate-y-1' : 'border-[rgba(255,255,255,0.08)]'
        } ${isHighRisk && isOnline ? 'border-l-4 border-l-[#EF4444]' : ''}`}
        onMouseEnter={() => setHoveredCamera(camera.id)}
        onMouseLeave={() => setHoveredCamera(null)}
      >
        {/* Camera Feed */}
        <div className="relative aspect-video bg-[#080A0F] overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.02] to-transparent animate-scan"></div>
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[rgba(255,255,255,0.15)]"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[rgba(255,255,255,0.15)]"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[rgba(255,255,255,0.15)]"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[rgba(255,255,255,0.15)]"></div>

          {isOnline ? (
            <>
              {/* Camera feed placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-[#E6A23C]/30 mx-auto" />
                  <p className="text-xs text-[#9CA3AF] mt-2">{camera.name}</p>
                  {isHovered && (
                    <p className="text-[10px] text-[#E6A23C] mt-1">AI VISION ACTIVE</p>
                  )}
                </div>
              </div>

              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-[#EF4444]/90 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="text-[8px] text-white font-bold tracking-wider uppercase">Live</span>
              </div>

              {/* Camera ID */}
              <div className="absolute top-3 right-3">
                <span className="text-[8px] text-[rgba(255,255,255,0.6)] font-mono">{camera.name}</span>
              </div>

              {/* AI detection overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-[8px] text-[rgba(255,255,255,0.6)] font-mono">AI VISION</span>
                  <span className="w-1 h-1 rounded-full bg-[#22C55E]"></span>
                  <span className="text-[8px] text-[rgba(255,255,255,0.4)] font-mono">ACTIVE</span>
                </div>
                <div className="text-[8px] text-[rgba(255,255,255,0.4)] font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Risk overlay */}
              {isHighRisk && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EF4444]/20 border border-[#EF4444]/30 rounded-lg px-3 py-1 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-[#EF4444] flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 animate-pulse" />
                    <span>HIGH RISK</span>
                  </span>
                </div>
              )}
            </>
          ) : (
            // Offline state
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080A0F]/80">
              <AlertTriangle className="w-10 h-10 text-[#EF4444]/40 mb-2" />
              <p className="text-xs text-[#9CA3AF] font-medium">CAMERA OFFLINE</p>
              <p className="text-[8px] text-[#6B7280] mt-1">Last signal: 18:31:42</p>
            </div>
          )}
        </div>

        {/* Camera Info */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[#F5F5F0]">{camera.name}</h3>
              <p className="text-xs text-[#9CA3AF]">{camera.zone}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-[8px] font-medium uppercase px-2 py-1 rounded ${
                isOnline ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#EF4444]/20 text-[#EF4444]'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {isOnline && (
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <div className="text-center">
                <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">People</p>
                <p className="text-sm font-bold text-[#F5F5F0]">{camera.peopleCount || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Density</p>
                <p className={`text-sm font-bold ${getRiskColor(camera.density).text}`}>
                  {camera.density || 0}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-[#9CA3AF] uppercase tracking-wider">Risk</p>
                <p className={`text-sm font-bold ${getRiskColor(camera.riskScore).text}`}>
                  {camera.riskScore || 0}
                </p>
              </div>
            </div>
          )}

          {/* Hover actions */}
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between"
            >
              <button className="flex items-center space-x-1 text-[10px] text-[#E6A23C] hover:text-[#F2C66D] transition-colors">
                <Maximize2 className="w-3 h-3" />
                <span>Fullscreen</span>
              </button>
              <button className="flex items-center space-x-1 text-[10px] text-[#9CA3AF] hover:text-[#F5F5F0] transition-colors">
                <Eye className="w-3 h-3" />
                <span>View Camera</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080A0F] p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E6A23C]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#E6A23C]/2 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #E6A23C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#E6A23C]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6"
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#E6A23C] tracking-[0.15em] uppercase font-medium">TRINETRA / SURVEILLANCE</span>
              <div className="w-px h-3 bg-[#E6A23C]/30"></div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[8px] text-[#22C55E] tracking-wider uppercase">System Operational</span>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">Live Monitoring</h1>
            <p className="text-[#9CA3AF] text-sm">
              Temple Surveillance Command Center • {onlineCameras.length} cameras connected • AI vision active
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0D1118]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
              <span className="text-[8px] text-[#EF4444] tracking-wider uppercase">Live</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0D1118]">
              <span className="text-[8px] text-[#9CA3AF]">{onlineCameras.length} Online</span>
              <span className="text-[8px] text-[#6B7280]">/</span>
              <span className="text-[8px] text-[#6B7280]">{offlineCameras.length} Offline</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-[#0D1118] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <RefreshCw className={`w-4 h-4 text-[#9CA3AF] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Camera Summary Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: 'Total Cameras', value: cameras.length, icon: Camera, color: 'border-[#E6A23C]/20 text-[#E6A23C]' },
            { label: 'Online', value: onlineCameras.length, icon: CheckCircle, color: 'border-[#22C55E]/20 text-[#22C55E]' },
            { label: 'Offline', value: offlineCameras.length, icon: XCircle, color: 'border-[#EF4444]/20 text-[#EF4444]' },
            { label: 'People Detected', value: onlineCameras.reduce((sum, c) => sum + (c.peopleCount || 0), 0).toLocaleString(), icon: Users, color: 'border-[#38BDF8]/20 text-[#38BDF8]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-[#0D1118] rounded-xl border ${stat.color} p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-4 h-4 opacity-60" />
                <span className="text-[8px] uppercase tracking-wider text-[#9CA3AF]">{stat.label}</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#F5F5F0] mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Camera Control Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-3 mb-6"
        >
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            {['all', 'online', 'offline', 'high-risk'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-[#0D1118] border border-[#E6A23C] text-[#E6A23C] shadow-lg shadow-[#E6A23C]/10'
                    : 'bg-[#0D1118] border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-[#F5F5F0]'
                }`}
              >
                {f === 'all' ? 'All Cameras' : f === 'high-risk' ? '⚠ High Risk' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search cameras by name or zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0D1118] text-[#F5F5F0] rounded-xl pl-10 pr-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all placeholder:text-[#9CA3AF] outline-none text-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-[#0D1118] text-[#F5F5F0] rounded-xl px-3 py-2 border border-[rgba(255,255,255,0.08)] focus:border-[#E6A23C] focus:ring-1 focus:ring-[#E6A23C]/30 transition-all outline-none text-xs"
            >
              <option value="all">All Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            <div className="flex items-center space-x-1 bg-[#0D1118] rounded-lg border border-[rgba(255,255,255,0.08)] p-1">
              {['grid', 'large', 'compact'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === mode
                      ? 'bg-[#E6A23C]/20 text-[#E6A23C]'
                      : 'text-[#9CA3AF] hover:text-[#F5F5F0]'
                  }`}
                >
                  {mode === 'grid' && <Grid className="w-4 h-4" />}
                  {mode === 'large' && <LayoutGrid className="w-4 h-4" />}
                  {mode === 'compact' && <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Camera Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : viewMode === 'large'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'
          }`}
        >
          {filteredCameras.length === 0 ? (
            <div className="col-span-full bg-[#0D1118] rounded-xl border border-[rgba(255,255,255,0.08)] p-12 text-center">
              <Camera className="w-12 h-12 text-[#9CA3AF]/30 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-[#F5F5F0]">No Cameras Found</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredCameras.map((camera, index) => (
              <CameraCard key={camera.id} camera={camera} index={index} />
            ))
          )}
        </motion.div>

        {/* Bottom Status Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between text-[10px] text-[#9CA3AF] gap-2"
        >
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Wifi className="w-3 h-3 text-[#E6A23C]" />
              <span>AI Vision: Active</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Camera className="w-3 h-3 text-[#38BDF8]" />
              <span>Camera Network: {onlineCameras.length}/{cameras.length}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <Radio className="w-3 h-3 text-[#22C55E]" />
              <span>Data Stream: Live</span>
            </span>
            <span>Last Sync: {new Date().toLocaleTimeString()}</span>
          </div>
        </motion.div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveMonitoring;