import React from 'react';
import Sidebar from '../components/Sidebar';
import { Target, Award, Clock } from 'lucide-react';

const Challenges = () => {
  const challenges = [
    {
      title: 'SQL Injection Master',
      category: 'Web',
      difficulty: 'Medium',
      points: 25,
      timeEstimate: '2 hours',
      solved: 234,
    },
    {
      title: 'Buffer Overflow Basic',
      category: 'Binary',
      difficulty: 'Hard',
      points: 40,
      timeEstimate: '3 hours',
      solved: 122,
    },
    {
      title: 'Cryptography 101',
      category: 'Crypto',
      difficulty: 'Easy',
      points: 15,
      timeEstimate: '1 hour',
      solved: 456,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Challenges</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search challenges..."
              className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-600' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-600' :
                      'bg-red-600'
                    } text-white`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center space-x-6 text-gray-400">
                    <span className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>{challenge.points} points</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.timeEstimate}</span>
                    </span>
                    <span>{challenge.solved} solves</span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Start Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Challenges;