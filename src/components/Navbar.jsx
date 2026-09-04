// src/components/Navbar.jsx - Dark theme version
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isHomePage = location.pathname === '/';

  const getNavbarStyle = () => {
    if (isHomePage) {
      return scrolled 
        ? 'bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#D4A72C]/20' 
        : 'bg-transparent';
    }
    return 'bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#D4A72C]/20';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border border-[#D4A72C]/30 flex items-center justify-center group-hover:border-[#D4A72C] transition-colors">
                <Eye className="w-5 h-5 text-[#D4A72C]" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-[#F5F1E8]">TRINETRA</h1>
              <p className="text-[9px] text-[#D4A72C] tracking-[0.15em] uppercase font-medium">Temple Intelligence & Safety</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase">Platform</a>
            <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase">Intelligence</a>
            <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase">Security</a>
            <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase">Command Center</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/signin" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase hidden md:block">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="border-2 border-[#D4A72C] text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#080A0D] transition-all duration-300 px-5 py-2 rounded text-xs tracking-wider uppercase flex items-center space-x-2"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#D4A72C]/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#F5F1E8]" />
              ) : (
                <Menu className="w-6 h-6 text-[#F5F1E8]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#D4A72C]/10">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase px-4 py-2 hover:bg-[#D4A72C]/5 rounded-lg">Platform</a>
              <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase px-4 py-2 hover:bg-[#D4A72C]/5 rounded-lg">Intelligence</a>
              <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase px-4 py-2 hover:bg-[#D4A72C]/5 rounded-lg">Security</a>
              <a href="#" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase px-4 py-2 hover:bg-[#D4A72C]/5 rounded-lg">Command Center</a>
              <Link to="/signin" className="text-xs text-[#8B929D] hover:text-[#F5F1E8] transition-colors tracking-wider uppercase px-4 py-2 hover:bg-[#D4A72C]/5 rounded-lg">Sign In</Link>
              <Link to="/signup" className="border-2 border-[#D4A72C] text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#080A0D] transition-all duration-300 px-4 py-2 rounded text-center text-xs tracking-wider uppercase">Launch Command Center</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;