import React from 'react';
import { AlertCircle, Target, Lightbulb, TrendingUp } from 'lucide-react';

const ProblemStatement: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Social Media & Public Sentiment Analysis
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming unstructured social media data into actionable insights through
          cognitive computing and advanced natural language processing.
        </p>
      </div>

      {/* Problem Definition */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-semibold text-gray-900">The Challenge</h2>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Enterprises and governments struggle to understand public opinion from the vast 
            amount of unstructured data on social media platforms. Traditional analytics 
            fails to capture the nuances of human communication including:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Sarcasm and irony detection</li>
            <li>Slang and evolving language patterns</li>
            <li>Multilingual content analysis</li>
            <li>Context-dependent sentiment shifts</li>
            <li>Emerging trends in real-time</li>
          </ul>
          <p className="mt-4">
            This results in organizations remaining reactive instead of proactive, 
            missing critical opportunities to shape public perception and respond 
            to emerging issues.
          </p>
        </div>
      </div>

      {/* Solution Approach */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Our Solution</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Cognitive Computing Approach</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Advanced NLP for context understanding</li>
              <li>• Multi-language sentiment detection</li>
              <li>• Sarcasm and irony recognition</li>
              <li>• Real-time trend identification</li>
              <li>• Emotion classification beyond sentiment</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Business Impact</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Proactive crisis management</li>
              <li>• Brand reputation monitoring</li>
              <li>• Product feedback analysis</li>
              <li>• Political sentiment tracking</li>
              <li>• Competitive intelligence</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Proactive Insights</h3>
          </div>
          <p className="text-gray-700">
            Identify emerging trends and issues before they become widespread, 
            enabling proactive response strategies.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Real-time Monitoring</h3>
          </div>
          <p className="text-gray-700">
            Continuous analysis of social media streams provides up-to-the-minute 
            sentiment tracking and trend detection.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Advanced NLP</h3>
          </div>
          <p className="text-gray-700">
            Sophisticated language processing handles complex human communication 
            patterns that traditional analytics miss.
          </p>
        </div>
      </div>

      {/* Technical Methodology */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Cognitive Computing Methodology
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Data Collection</h3>
            <p className="text-sm text-gray-600">
              Gather social media posts from multiple platforms
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Preprocessing</h3>
            <p className="text-sm text-gray-600">
              Clean, normalize, and prepare text data
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Analysis</h3>
            <p className="text-sm text-gray-600">
              Apply cognitive NLP models for sentiment
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Insights</h3>
            <p className="text-sm text-gray-600">
              Generate actionable business intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;