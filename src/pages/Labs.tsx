import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FlaskRound as Flask, Star, Search, Filter } from 'lucide-react';

const Labs = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  const labs = [
    {
      title: 'Web Application Penetration',
      difficulty: 'Easy',
      category: 'Web Security',
      points: 10,
      completed: false,
      description: 'Learn the basics of web security and common vulnerabilities.',
    },
    {
      title: 'Network Protocol Analysis',
      difficulty: 'Medium',
      category: 'Network Security',
      points: 20,
      completed: false,
      description: 'Deep dive into network protocols and packet analysis.',
    },
    {
      title: 'Reverse Engineering Basics',
      difficulty: 'Hard',
      category: 'Binary Analysis',
      points: 30,
      completed: true,
      description: 'Master the art of reverse engineering binary applications.',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-white">Labs</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-all duration-300 ${
                searchFocused ? 'text-green-500' : 'text-gray-400'
              }`}>
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search labs..."
                className="bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 border-2 border-gray-700 focus:border-green-500 focus:outline-none transition-all duration-300 w-64"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <button className="bg-gray-800 text-white rounded-lg px-4 py-2 border-2 border-gray-700 hover:border-green-500 transition-all duration-300 flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, index) => (
            <div 
              key={index} 
              className="hover-card group bg-gray-800 rounded-lg p-6 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-gray-700 group-hover:bg-green-600 transition-colors duration-300">
                  <Flask className="h-6 w-6 text-green-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  lab.difficulty === 'Easy' ? 'bg-green-600' :
                  lab.difficulty === 'Medium' ? 'bg-yellow-600' :
                  'bg-red-600'
                } text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  {lab.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-500 transition-colors duration-300">
                {lab.title}
              </h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {lab.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-white">{lab.points} pts</span>
                </div>
                <button className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  lab.completed
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-green-600 hover:bg-green-500 text-white hover:shadow-lg hover:shadow-green-500/20'
                }`}>
                  {lab.completed ? 'Completed' : 'Start Lab'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Labs;