import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, ChevronDown, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import { format } from 'date-fns';

export const Topbar = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();
  const { stats } = useRealtimeData();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalAlerts = stats?.activeAlerts || 0;

  return (
    <header className="bg-dark-panel border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg hover:bg-dark-elevated text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-white">TRINETRA</h2>
            <p className="text-xs text-gray-400">Control Center</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Live indicator */}
          <div className="flex items-center space-x-2">
            <span className="status-dot-success animate-pulse"></span>
            <span className="text-xs font-medium text-success">LIVE</span>
          </div>

          {/* Time */}
          <span className="text-sm text-gray-400 hidden md:block">
            {format(currentTime, 'HH:mm:ss')}
          </span>

          {/* Alerts indicator */}
          {criticalAlerts > 0 && (
            <div className="relative">
              <div className="flex items-center space-x-1 px-2 py-1 bg-critical/20 rounded-lg">
                <span className="status-dot-critical"></span>
                <span className="text-xs font-medium text-critical">{criticalAlerts}</span>
              </div>
            </div>
          )}

          {/* Notification bell */}
          <button className="p-1.5 rounded-lg hover:bg-dark-elevated text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            {criticalAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-critical rounded-full animate-pulse"></span>
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-dark-elevated transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-dark-elevated flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-panel border border-[rgba(255,255,255,0.08)] rounded-lg shadow-xl py-1 z-50">
                <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.08)]">
                  <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-400">{user?.email || 'admin@trinetra.com'}</p>
                </div>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-400 hover:bg-dark-elevated hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-400 hover:bg-dark-elevated hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-400 hover:bg-dark-elevated hover:text-white transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-critical hover:bg-dark-elevated transition-colors border-t border-[rgba(255,255,255,0.08)]">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};