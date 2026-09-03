import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-critical/10 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-critical" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">404</h1>
        <h2 className="text-xl text-gray-300">Page Not Found</h2>
        <p className="text-gray-400 max-w-md">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/dashboard">
          <Button>
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};