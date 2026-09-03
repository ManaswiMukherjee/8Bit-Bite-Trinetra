import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

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
      systemStatus: 'online',
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (lastMessage) {
      setData((prev) => ({
        ...prev,
        ...lastMessage,
        loading: false,
      }));
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!isConnected) {
      // Fallback to mock data via API
      const fetchData = async () => {
        try {
          const response = await fetch('/api/dashboard');
          const result = await response.json();
          setData((prev) => ({
            ...prev,
            ...result,
            loading: false,
          }));
        } catch (error) {
          setData((prev) => ({
            ...prev,
            error: 'Failed to fetch data',
            loading: false,
          }));
        }
      };
      fetchData();
    }
  }, [isConnected]);

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