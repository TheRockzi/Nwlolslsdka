import React from 'react';
import Sidebar from '../components/Sidebar';
import { Shield, Bell, Monitor, Key } from 'lucide-react';

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        
        <div className="max-w-3xl">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-2"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                />
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Challenge Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Monitor className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Theme
                </label>
                <select className="w-full bg-gray-700 text-white rounded-lg px-4 py-2">
                  <option>Dark Theme</option>
                  <option>Light Theme</option>
                  <option>System Default</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;