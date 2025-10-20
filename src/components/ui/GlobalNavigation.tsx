"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Users, 
  Settings,
  LogOut,
  User,
  Bell,
  Search
} from 'lucide-react';

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic here
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                SyncScript
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - Search, Notifications, User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </button>

              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  User Name
                </div>
                <div className="text-sm font-medium text-gray-500">
                  user@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
