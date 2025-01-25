import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, Trophy, Target, Star, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getRankFromChallenges } from '../lib/supabase';

const Profile = () => {
  const { profile } = useAuth();
  const ranks = profile ? getRankFromChallenges(
    profile.web_challenges_completed,
    profile.programming_challenges_completed,
    profile.crypto_challenges_completed
  ) : { web: '', programming: '', crypto: '' };

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
                {profile?.is_staff && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 break-words">{profile?.username || 'Loading...'}</h1>
                <p className="text-gray-400">Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</p>
                {profile?.is_staff && (
                  <p className="text-yellow-500 font-semibold mt-2">{profile.staff_role || 'Staff Member'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Web Rank</h3>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-white break-words">{ranks.web || 'Unranked'}</p>
              <p className="text-gray-400">{profile?.web_challenges_completed || 0} challenges completed</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Programming Rank</h3>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-white break-words">{ranks.programming || 'Unranked'}</p>
              <p className="text-gray-400">{profile?.programming_challenges_completed || 0} challenges completed</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Crypto Rank</h3>
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-white break-words">{ranks.crypto || 'Unranked'}</p>
              <p className="text-gray-400">{profile?.crypto_challenges_completed || 0} challenges completed</p>
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
                    <p className="text-white font-medium break-words">Completed Challenge: Advanced XSS</p>
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