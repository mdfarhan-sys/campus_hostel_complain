import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { User, Menu, X, PlusCircle, Search } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll detection for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Issues', path: '/issues' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#F7F6EE]/90 backdrop-blur-md border-b border-[#E2EBE0] shadow-xs py-3' 
        : 'bg-[#F7F6EE] py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Brand: Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {/* Minimal square icon with check/wrench mark */}
            <div className="w-10 h-10 rounded-xl bg-[#173D2B] text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-[#173D2B] tracking-tight">
                  CampusFix
                </span>
                <span className="text-[10px] font-bold bg-[#E8F0DF] text-[#173D2B] px-1.5 py-0.5 rounded-md">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#68756C] font-medium leading-none hidden sm:block">
                Hostel & Campus Complaint Management System
              </p>
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/70 backdrop-blur-sm p-1.5 rounded-full border border-[#DFE7D8] shadow-xs">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#173D2B] text-white shadow-xs'
                      : 'text-[#173D2B] hover:text-[#173D2B] hover:bg-[#E8F0DF]/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/track"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#173D2B] hover:bg-[#E8F0DF] transition-colors border border-transparent hover:border-[#DFE7D8]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </Link>

            <Link
              to="/report"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#E8F0DF] text-[#173D2B] hover:bg-[#DCE9C9] border border-[#D0DEC4] transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#4F7F55]" />
              <span>Report Issue</span>
            </Link>

            {/* Login Button with user icon as in reference image */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-[#173D2B] bg-white border border-[#C8D6C0] hover:border-[#173D2B] hover:bg-[#F3F6ED] shadow-xs transition-all duration-200 active:scale-95"
            >
              <User className="w-4 h-4 text-[#173D2B]" />
              <span>Login</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#173D2B] hover:bg-[#E8F0DF] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-[#E2EBE0] bg-[#F7F6EE] animate-fade-in">
            <div className="flex flex-col gap-1.5 mb-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#173D2B] text-white'
                        : 'text-[#173D2B] hover:bg-[#E8F0DF]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2EBE0]">
              <Link
                to="/track"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#173D2B] bg-white rounded-2xl border border-[#DFE7D8]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Issue</span>
              </Link>
              <Link
                to="/report"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#173D2B] rounded-2xl"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Issue</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
