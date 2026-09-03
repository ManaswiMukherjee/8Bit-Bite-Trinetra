import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Settings as SettingsIcon,
  Map,
  Camera,
  Bell,
  Shield,
  Users,
  Sliders,
  Save,
  RefreshCw
} from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'zones', label: 'Zone Management', icon: Map },
    { id: 'cameras', label: 'Camera Configuration', icon: Camera },
    { id: 'alerts', label: 'Alert Thresholds', icon: Bell },
    { id: 'security', label: 'Security Teams', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure system preferences and parameters</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:bg-dark-elevated hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Temple Name</label>
                <input
                  type="text"
                  defaultValue="Demo Temple"
                  className="w-full bg-dark-secondary text-white rounded-lg px-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                <select className="w-full bg-dark-secondary text-white rounded-lg px-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                  <option>Asia/Kolkata (UTC +5:30)</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select className="w-full bg-dark-secondary text-white rounded-lg px-4 py-2 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-white mb-4">Alert Thresholds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Critical Density Threshold</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="80"
                    className="flex-1"
                  />
                  <span className="text-sm text-white font-medium">80%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">High Density Threshold</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="60"
                    className="flex-1"
                  />
                  <span className="text-sm text-white font-medium">60%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Moderate Density Threshold</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="30"
                    className="flex-1"
                  />
                  <span className="text-sm text-white font-medium">30%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;