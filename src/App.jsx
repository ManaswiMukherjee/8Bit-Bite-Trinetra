import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { useAuth } from './context/AuthContext';

// Layout
import { AppShell } from './components/layout/AppShell';

// Pages
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/Dashboard';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { CrowdManagement } from './pages/CrowdManagement';
import { TempleMapPage } from './pages/TempleMapPage';
import { Alerts } from './pages/Alerts';
import { Emergency } from './pages/Emergency';
import { Security } from './pages/Security';
import { Incidents } from './pages/Incidents';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="monitoring" element={<LiveMonitoring />} />
        <Route path="crowd" element={<CrowdManagement />} />
        <Route path="temple-map" element={<TempleMapPage />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="security" element={<Security />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;