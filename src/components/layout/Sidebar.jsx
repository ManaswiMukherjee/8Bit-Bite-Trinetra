import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  Users,
  Map,
  Bell,
  AlertTriangle,
  Shield,
  FileText,
  BarChart3,
  Settings,
  Eye,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Live Monitoring', path: '/monitoring', icon: Video },
  { name: 'Crowd Management', path: '/crowd', icon: Users },
  { name: 'Temple Map', path: '/temple-map', icon: Map },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Emergency', path: '/emergency', icon: AlertTriangle },
  { name: 'Security Teams', path: '/security', icon: Shield },
  { name: 'Incidents', path: '/incidents', icon: FileText },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-dark-panel border-r border-[rgba(255,255,255,0.08)] flex flex-col fixed inset-y-0 left-0 z-40">
      {/* Logo */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Eye className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">TRINETRA</h1>
            <p className="text-xs text-gray-400">Temple Intelligence & Safety</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:bg-dark-elevated hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] space-y-3">
        <div className="flex items-center space-x-2">
          <span className="status-dot-success"></span>
          <span className="text-xs text-gray-400">All systems operational</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-dark-elevated flex items-center justify-center">
              <span className="text-sm font-medium text-gray-300">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
              <p className="text-xs text-gray-400">{user?.role || 'Administrator'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-dark-elevated text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};