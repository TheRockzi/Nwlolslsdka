import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FlaskRound as Flask, Target, User, Settings, Terminal, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: Flask, text: 'Labs', path: '/labs' },
    { icon: Target, text: 'Challenges', path: '/challenges' },
    { icon: User, text: 'Profile', path: '/profile' },
    { icon: Settings, text: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 shadow-lg">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8 p-2 bg-gray-700 rounded-lg animate-float">
          <Terminal className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
            KaliumLabs
          </span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                return `nav-item flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-green-600 text-white animate-pulse-glow'
                    : 'text-gray-300 hover:bg-gray-700'
                }`;
              }}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
                    isActive ? 'rotate-90' : ''
                  }`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;