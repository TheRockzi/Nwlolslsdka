import React from 'react';
import Sidebar from '../components/Sidebar';
import { Activity, Users, Trophy, Brain, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { profile } = useAuth();
  
  const stats = [
    { icon: Activity, label: 'Active Labs', value: '12', color: 'from-green-400 to-green-600' },
    { icon: Users, label: 'Users Online', value: '245', color: 'from-blue-400 to-blue-600' },
    { icon: Trophy, label: 'Completed', value: profile ? 
      (profile.web_challenges_completed + profile.programming_challenges_completed + profile.crypto_challenges_completed).toString() 
      : '0', 
      color: 'from-yellow-400 to-yellow-600' 
    },
    { icon: Brain, label: 'Skills Learned', value: '15', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold text-white mb-2 break-words">Welcome back, {profile?.username || 'Hacker'}</h1>
          <p className="text-gray-400 mb-8">Ready to take on new challenges?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="hover-card bg-gray-800 rounded-lg p-6 text-white cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1 break-words">{stat.label}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text break-words`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} transform transition-transform hover:scale-110`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hover-card bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              Recent Activity
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    Completed Challenge: Buffer Overflow Basic
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hover-card bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Available Labs</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    Web Exploitation Lab {i + 1}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full group-hover:bg-green-500 transition-colors">
                      Easy
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;