import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, Home, FileText, Map, BarChart2, Bot, ClipboardList, ShieldCheck, MessageCircleMore } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isCitizen = user && user.role !== 'admin' && user.role !== 'officer';

  const citizenLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/report', label: 'Report Issue', icon: FileText },
    { to: '/my-reports', label: 'My Reports', icon: ClipboardList },
    { to: '/status-check', label: 'Check Status', icon: ShieldCheck },
    { to: '/chat', label: 'AI Assistant', icon: MessageCircleMore },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-shell">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center">
            {(onMenuClick || isCitizen) && (
              <button
                onClick={onMenuClick ? onMenuClick : toggleMobileMenu}
                className="mr-2 rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 lg:hidden"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
            <Link to={user ? (isCitizen ? '/dashboard' : '/admin') : '/'} className="flex min-w-0 flex-shrink-0 items-center gap-2" onClick={closeMobileMenu}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <span className="truncate text-lg font-bold tracking-tight text-gray-900">PRAGATI <span className="text-brand-600">AI</span></span>
            </Link>

            {isCitizen && (
              <div className="ml-6 hidden items-center gap-1 md:flex">
                {citizenLinks.slice(0, 4).map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink to="/chat" className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-brand-50 text-brand-700' : 'text-brand-600 hover:bg-brand-50 hover:text-brand-700'}`}>
                  AI Assistant
                </NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden text-right md:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs capitalize text-gray-500">{user.role}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                  {user.name.charAt(0)}
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
                </Link>
                <Link to="/register/citizen" onClick={closeMobileMenu}>
                  <Button variant="primary" className="px-4 py-2.5">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {isCitizen && mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white/95 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {citizenLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
