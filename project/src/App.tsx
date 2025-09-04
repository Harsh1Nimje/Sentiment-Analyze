import React, { useState } from 'react';
import { BarChart3, Database, TrendingUp, Home } from 'lucide-react';
import ProblemStatement from './components/ProblemStatement';
import Dataset from './components/Dataset';
import Analysis from './components/Analysis';
import Results from './components/Results';

function App() {
  const [activeTab, setActiveTab] = useState('problem');

  const navigation = [
    { id: 'problem', label: 'Problem Statement', icon: Home },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'results', label: 'Results', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Social Media Sentiment Analyzer
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Cognitive Computing Platform
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'problem' && <ProblemStatement />}
        {activeTab === 'dataset' && <Dataset />}
        {activeTab === 'analysis' && <Analysis />}
        {activeTab === 'results' && <Results />}
      </main>
    </div>
  );
}

export default App;