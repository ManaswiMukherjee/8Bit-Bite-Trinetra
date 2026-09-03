// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Lock, Mail, Shield, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Pre-fill with demo credentials
  const fillDemoCredentials = () => {
    setEmail('admin@trinetra.com');
    setPassword('admin123');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Eye className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TRINETRA</h1>
              <p className="text-gray-400">Temple Intelligence & Safety Network</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-medium text-white leading-tight">
              The third eye of<br />temple safety
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Real-time crowd monitoring, emergency detection, and intelligent response coordination for temple security.
            </p>
          </div>

          <div className="mt-12 flex items-center space-x-4 text-sm text-gray-400">
            <Shield className="w-5 h-5 text-primary" />
            <span>Security access protected • 24/7 Monitoring</span>
          </div>

          <div className="mt-8 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="status-dot-success"></span>
              <span className="text-xs text-gray-400">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="status-dot-info"></span>
              <span className="text-xs text-gray-400">12 Cameras</span>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-dark-panel rounded-lg border border-[rgba(255,255,255,0.08)]">
            <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Email:</span>
                <span className="text-primary font-mono">admin@trinetra.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Password:</span>
                <span className="text-primary font-mono">admin123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="bg-dark-panel rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400 mt-1">TRINETRA Control Center</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-secondary text-white rounded-lg pl-10 pr-4 py-3 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-secondary text-white rounded-lg pl-10 pr-4 py-3 border border-[rgba(255,255,255,0.08)] focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-critical/10 border border-critical/20 text-critical text-sm p-3 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
            </div>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-dark-elevated text-gray-300 rounded-lg hover:bg-[#1E2632] transition-colors border border-[rgba(255,255,255,0.08)]"
            >
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm">Use Demo Credentials</span>
            </button>

            <div className="text-center text-xs text-gray-500">
              Security access protected • All communications are encrypted
            </div>
          </form>

          {/* Demo Credentials on Mobile */}
          <div className="mt-6 p-3 bg-dark-elevated rounded-lg border border-[rgba(255,255,255,0.08)] lg:hidden">
            <p className="text-xs text-gray-400 text-center mb-1">Demo Credentials:</p>
            <div className="flex flex-col items-center space-y-0.5 text-xs">
              <span className="text-gray-500">Email: <span className="text-primary font-mono">admin@trinetra.com</span></span>
              <span className="text-gray-500">Password: <span className="text-primary font-mono">admin123</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;