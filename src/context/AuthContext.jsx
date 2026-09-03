// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded users for testing
  const USERS = [
    {
      id: '1',
      username: 'Admin',
      email: 'admin@trinetra.com',
      password: 'admin123',
      role: 'admin',
      department: 'Control Room'
    },
    {
      id: '2',
      username: 'Operator',
      email: 'operator@trinetra.com',
      password: 'operator123',
      role: 'operator',
      department: 'Control Room'
    },
    {
      id: '3',
      username: 'Security1',
      email: 'security@trinetra.com',
      password: 'security123',
      role: 'security',
      department: 'Security'
    }
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Try hardcoded users first
    const foundUser = USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setToken(mockToken);
      setUser(userWithoutPassword);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      return Promise.resolve({ token: mockToken, user: userWithoutPassword });
    }

    // If no hardcoded user, try the actual backend
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials. Try: admin@trinetra.com / admin123');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};