import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const Analytics = () => {
  const [period, setPeriod] = useState('today');

  const visitorData = [
    { time: '12:00', visitors: 3200 },
    { time: '13:00', visitors: 4500 },
    { time: '14:00', visitors: 5800 },
    { time: '15:00', visitors: 7200 },
    { time: '16:00', visitors: 6800 },
    { time: '17:00', visitors: 8452 },
    { time: '18:00', visitors: 9200 },
  ];

  const incidentData = [
    { name: 'Crowd Surge', value: 45 },
    { name: 'High Density', value: 30 },
    { name: 'Barricade', value: 15 },
    { name: 'Security', value: 10 },
  ];

  const responseData = [
    { day: 'Mon', time: 4.2 },
    { day: 'Tue', time: 3.8 },
    { day: 'Wed', time: 4.5 },
    { day: 'Thu', time: 3.2 },
    { day: 'Fri', time: 2.8 },
    { day: 'Sat', time: 3.5 },
    { day: 'Sun', time: 4.0 },
  ];

  const COLORS = ['#E6A23C', '#35C48D', '#6EA8FF', '#EF6A6A'];

  const insights = [
    {
      title: 'PEAK PERIOD',
      description: '18:00 – 19:30',
      detail: 'Crowd is typically 32% higher than the daily average.',
      icon: TrendingUp,
      color: 'text-warning'
    },
    {
      title: 'QUEUE PERFORMANCE',
      description: 'Queue B is currently processing',
      detail: 'visitors 18% faster than Queue A.',
      icon: Users,
      color: 'text-success'
    },
    {
      title: 'SECURITY RESPONSE',
      description: 'Average response time improved',
      detail: 'by 14% this week.',
      icon: Clock,
      color: 'text-info'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Data insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 lg:mt-0">
          {['today', '7days', '30days', 'custom'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? 'bg-primary text-dark'
                  : 'bg-dark-elevated text-gray-400 hover:text-white'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} elevated>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${insight.color}/10`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">{insight.title}</p>
                <p className="text-sm font-medium text-white">{insight.description}</p>
                <p className="text-xs text-gray-400 mt-1">{insight.detail}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Visitor Footfall</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141821',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#E5E7EB' }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#E6A23C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Incidents by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141821',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#E5E7EB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Security Response Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141821',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#E5E7EB' }}
                />
                <Bar dataKey="time" fill="#E6A23C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;