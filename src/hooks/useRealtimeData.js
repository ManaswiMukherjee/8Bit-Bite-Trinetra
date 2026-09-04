// src/hooks/useRealtimeData.js
import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

// Mock data generator
const generateMockData = () => {
  const zones = [
    { id: 'zone-1', name: 'Main Entrance', type: 'entrance', capacity: 1500, currentOccupancy: 320, density: 21, status: 'normal', riskScore: 12, queueTime: 5, updatedAt: new Date() },
    { id: 'zone-2', name: 'Security Check', type: 'entrance', capacity: 500, currentOccupancy: 280, density: 56, status: 'moderate', riskScore: 34, queueTime: 15, updatedAt: new Date() },
    { id: 'zone-3', name: 'Queue A', type: 'queue', capacity: 1200, currentOccupancy: 850, density: 71, status: 'high', riskScore: 68, queueTime: 42, updatedAt: new Date() },
    { id: 'zone-4', name: 'Queue B', type: 'queue', capacity: 1200, currentOccupancy: 420, density: 35, status: 'normal', riskScore: 28, queueTime: 21, updatedAt: new Date() },
    { id: 'zone-5', name: 'Queue C', type: 'queue', capacity: 1200, currentOccupancy: 620, density: 52, status: 'moderate', riskScore: 45, queueTime: 31, updatedAt: new Date() },
    { id: 'zone-6', name: 'Darshan Area', type: 'darshan', capacity: 3000, currentOccupancy: 2840, density: 95, status: 'critical', riskScore: 91, queueTime: 0, updatedAt: new Date() },
    { id: 'zone-7', name: 'VIP Route', type: 'vip', capacity: 200, currentOccupancy: 80, density: 40, status: 'normal', riskScore: 15, queueTime: 0, updatedAt: new Date() },
    { id: 'zone-8', name: 'Exit', type: 'exit', capacity: 1000, currentOccupancy: 180, density: 18, status: 'normal', riskScore: 8, queueTime: 0, updatedAt: new Date() }
  ];

  const cameras = [
    { id: 'cam-01', name: 'CAM-01', zone: 'Main Entrance', status: 'online', peopleCount: 320, density: 21, riskScore: 12, isLive: true },
    { id: 'cam-02', name: 'CAM-02', zone: 'Security Check', status: 'online', peopleCount: 280, density: 56, riskScore: 34, isLive: true },
    { id: 'cam-03', name: 'CAM-03', zone: 'Queue A', status: 'online', peopleCount: 850, density: 71, riskScore: 68, isLive: true },
    { id: 'cam-04', name: 'CAM-04', zone: 'Queue B', status: 'online', peopleCount: 420, density: 35, riskScore: 28, isLive: true },
    { id: 'cam-05', name: 'CAM-05', zone: 'Queue C', status: 'online', peopleCount: 620, density: 52, riskScore: 45, isLive: true },
    { id: 'cam-06', name: 'CAM-06', zone: 'Darshan Area', status: 'online', peopleCount: 2840, density: 95, riskScore: 91, isLive: true },
    { id: 'cam-07', name: 'CAM-07', zone: 'VIP Route', status: 'online', peopleCount: 80, density: 40, riskScore: 15, isLive: true },
    { id: 'cam-08', name: 'CAM-08', zone: 'Exit', status: 'offline', peopleCount: 0, density: 0, riskScore: 0, isLive: false }
  ];

  const alerts = [
    { id: 'alert-1', title: 'Crowd Surge Detected', description: 'Main Darshan Area crowd density reached 95%', severity: 'critical', zone: 'Darshan Area', riskScore: 91, status: 'active', createdAt: new Date(Date.now() - 120000) },
    { id: 'alert-2', title: 'High Density', description: 'Queue A showing abnormal movement patterns', severity: 'high', zone: 'Queue A', riskScore: 68, status: 'active', createdAt: new Date(Date.now() - 420000) },
    { id: 'alert-3', title: 'Barricade Warning', description: 'Gate 3 barricade sensor showing pressure', severity: 'medium', zone: 'Gate 3', riskScore: 45, status: 'active', createdAt: new Date(Date.now() - 660000) }
  ];

  return {
    zones,
    cameras,
    alerts,
    stats: {
      visitorsInside: 8452,
      todayFootfall: 31284,
      activeAlerts: 3,
      criticalZones: 1,
      avgQueueTime: 34,
      systemStatus: 'online'
    }
  };
};

export const useRealtimeData = () => {
  const { socket, isConnected, lastMessage } = useSocket();
  const [data, setData] = useState({
    zones: [],
    cameras: [],
    alerts: [],
    stats: {
      visitorsInside: 0,
      todayFootfall: 0,
      activeAlerts: 0,
      criticalZones: 0,
      avgQueueTime: 0,
      systemStatus: 'online'
    },
    loading: true,
    error: null
  });

  useEffect(() => {
    // Use mock data immediately
    const mockData = generateMockData();
    setData({
      ...mockData,
      loading: false,
      error: null
    });
  }, []);

  // Update data periodically for simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const mockData = generateMockData();
      // Randomly update some values for realism
      mockData.stats.visitorsInside = Math.floor(Math.random() * 1000) + 8000;
      mockData.stats.todayFootfall = Math.floor(Math.random() * 5000) + 28000;
      mockData.stats.activeAlerts = Math.floor(Math.random() * 3) + 1;
      
      // Update some zone values
      mockData.zones.forEach(zone => {
        zone.currentOccupancy = Math.floor(Math.random() * zone.capacity);
        zone.density = Math.round((zone.currentOccupancy / zone.capacity) * 100);
        if (zone.density > 80) zone.status = 'critical';
        else if (zone.density > 60) zone.status = 'high';
        else if (zone.density > 30) zone.status = 'moderate';
        else zone.status = 'normal';
        zone.riskScore = Math.floor(Math.random() * 100);
        zone.updatedAt = new Date();
      });

      // Update camera data
      mockData.cameras.forEach(cam => {
        cam.peopleCount = Math.floor(Math.random() * 500);
        cam.density = Math.floor(Math.random() * 100);
        cam.riskScore = Math.floor(Math.random() * 100);
        cam.status = Math.random() > 0.9 ? 'offline' : 'online';
        cam.isLive = cam.status === 'online';
      });

      // Update alerts
      mockData.alerts = [
        { id: 'alert-1', title: 'Crowd Surge Detected', description: 'Main Darshan Area crowd density reached ' + mockData.zones.find(z => z.name === 'Darshan Area')?.density + '%', severity: 'critical', zone: 'Darshan Area', riskScore: mockData.zones.find(z => z.name === 'Darshan Area')?.riskScore || 91, status: 'active', createdAt: new Date(Date.now() - 120000) },
        { id: 'alert-2', title: 'High Density', description: 'Queue A showing abnormal movement patterns', severity: 'high', zone: 'Queue A', riskScore: mockData.zones.find(z => z.name === 'Queue A')?.riskScore || 68, status: 'active', createdAt: new Date(Date.now() - 420000) },
        { id: 'alert-3', title: 'Barricade Warning', description: 'Gate 3 barricade sensor showing pressure', severity: 'medium', zone: 'Gate 3', riskScore: 45, status: Math.random() > 0.7 ? 'resolved' : 'active', createdAt: new Date(Date.now() - 660000) }
      ];

      mockData.stats.criticalZones = mockData.zones.filter(z => z.status === 'critical').length;
      mockData.stats.activeAlerts = mockData.alerts.filter(a => a.status === 'active').length;
      mockData.stats.avgQueueTime = Math.floor(Math.random() * 30) + 15;

      setData(prev => ({
        ...prev,
        ...mockData,
        loading: false
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};