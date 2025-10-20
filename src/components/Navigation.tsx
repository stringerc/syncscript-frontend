/**
 * Comprehensive Navigation Component
 * Provides consistent navigation across all pages with proper Next.js routing
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

interface NavigationProps {
  showUserMenu?: boolean;
  user?: any;
  onLogout?: () => void;
  connectedAppsCount?: number;
}

export default function Navigation({ 
  showUserMenu = false, 
  user, 
  onLogout, 
  connectedAppsCount = 0 
}: NavigationProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Team', href: '/team' },
    { name: 'Projects', href: '/projects' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
    { name: 'Help', href: '/help' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      if (typeof window !== 'undefined') {
        localStorage.removeItem('syncscript_user');
        localStorage.removeItem('rube_api_key');
      }
      router.push('/');
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                SyncScript
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - User menu or CTA */}
          <div className="flex items-center space-x-4">
            {showUserMenu && user ? (
              <>
                {/* Connected Apps Counter */}
                {connectedAppsCount > 0 && (
                  <div className="text-right hidden sm:block">
                    <div className="text-sm text-gray-500">Connected Apps</div>
                    <div className="text-lg font-bold text-green-600">{connectedAppsCount}</div>
                  </div>
                )}
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              /* Login/Register CTA */
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!showUserMenu && (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link
                      href="/login"
                      className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors mt-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              )}
              
              {showUserMenu && user && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
