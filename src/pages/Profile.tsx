import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, Trophy, Target, Star, Activity } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
                <p className="text-gray-400">Joined January 1970</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Rank</h3>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-white">#42</p>
              <p className="text-gray-400">Global Ranking</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Points</h3>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-white">1,337</p>
              <p className="text-gray-400">Total Points Earned</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Completed</h3>
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-gray-400">Challenges Solved</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-green-600 rounded-full p-2">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Completed Challenge: Advanced XSS</p>
                    <p className="text-gray-400 text-sm">2 hours ago • +25 points</p>
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

export default Profile;