import React, { useState } from 'react';
import { Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Results: React.FC = () => {
  const [viewMode, setViewMode] = useState('overview');

  // Mock analysis results
  const sentimentData = [
    { platform: 'Twitter', positive: 45, negative: 25, neutral: 30 },
    { platform: 'Facebook', positive: 52, negative: 18, neutral: 30 },
    { platform: 'Instagram', positive: 68, negative: 12, neutral: 20 },
    { platform: 'LinkedIn', positive: 72, negative: 8, neutral: 20 },
    { platform: 'Reddit', positive: 38, negative: 35, neutral: 27 },
  ];

  const emotionData = [
    { emotion: 'Joy', value: 35, color: '#10b981' },
    { emotion: 'Trust', value: 28, color: '#3b82f6' },
    { emotion: 'Fear', value: 15, color: '#ef4444' },
    { emotion: 'Anger', value: 12, color: '#dc2626' },
    { emotion: 'Surprise', value: 8, color: '#f59e0b' },
    { emotion: 'Sadness', value: 2, color: '#6b7280' },
  ];

  const trendData = [
    { date: 'Mon', positive: 45, negative: 25, neutral: 30 },
    { date: 'Tue', positive: 48, negative: 22, neutral: 30 },
    { date: 'Wed', positive: 52, negative: 20, neutral: 28 },
    { date: 'Thu', positive: 49, negative: 24, neutral: 27 },
    { date: 'Fri', positive: 55, negative: 18, neutral: 27 },
    { date: 'Sat', positive: 58, negative: 16, neutral: 26 },
    { date: 'Sun', positive: 60, negative: 15, neutral: 25 },
  ];

  const keyInsights = [
    {
      type: 'positive',
      title: 'Strong Positive Sentiment on LinkedIn',
      description: 'Professional networks show 72% positive sentiment, indicating strong brand perception in B2B space.',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      type: 'warning',
      title: 'Reddit Concerns Detected',
      description: 'Higher negative sentiment (35%) on Reddit suggests community concerns that require attention.',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      type: 'trend',
      title: 'Positive Trend Growth',
      description: 'Overall sentiment improved by 15% over the past week across all platforms.',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  const downloadFullReport = () => {
    const report = {
      analysis_date: new Date().toISOString(),
      summary: {
        total_posts_analyzed: 1247,
        overall_sentiment: 'Positive',
        confidence_score: 0.87,
        platforms_analyzed: sentimentData.map(p => p.platform),
      },
      sentiment_by_platform: sentimentData,
      emotion_distribution: emotionData,
      trend_analysis: trendData,
      key_insights: keyInsights,
      methodology: {
        nlp_models: ['VADER', 'TextBlob', 'Custom Transformer'],
        preprocessing_steps: ['Tokenization', 'Noise Removal', 'Normalization'],
        confidence_threshold: 0.8,
      }
    };

    const jsonData = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social_media_sentiment_report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Analysis Results & Insights
            </h1>
            <p className="text-gray-600">
              Comprehensive sentiment analysis results with cognitive computing insights
            </p>
          </div>
          <button
            onClick={downloadFullReport}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Full Report</span>
          </button>
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-4 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'sentiment', label: 'Sentiment Analysis' },
            { id: 'emotions', label: 'Emotion Detection' },
            { id: 'trends', label: 'Trend Analysis' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === mode.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
                <div className="text-green-800 font-medium">Posts Analyzed</div>
                <div className="text-sm text-green-600 mt-1">Across 5 platforms</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                <div className="text-blue-800 font-medium">Confidence Score</div>
                <div className="text-sm text-blue-600 mt-1">High accuracy analysis</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-purple-800 font-medium">Real-time Monitoring</div>
                <div className="text-sm text-purple-600 mt-1">Continuous updates</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-4">
                {keyInsights.map((insight, index) => {
                  const IconComponent = insight.icon;
                  return (
                    <div key={index} className={`${insight.bg} rounded-lg p-4`}>
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`w-6 h-6 ${insight.color} mt-1`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <p className="text-gray-700 mt-1">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Sentiment Analysis */}
        {viewMode === 'sentiment' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Sentiment by Platform</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="positive" stackId="a" fill="#10b981" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                <Bar dataKey="neutral" stackId="a" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Emotion Detection */}
        {viewMode === 'emotions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Emotion Distribution</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ emotion, value }) => `${emotion}: ${value}%`}
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {emotionData.map((emotion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: emotion.color }}
                      />
                      <span className="font-medium text-gray-900">{emotion.emotion}</span>
                    </div>
                    <span className="text-gray-600">{emotion.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trend Analysis */}
        {viewMode === 'trends' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">7-Day Sentiment Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} />
                <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Trend Analysis Summary</h4>
              <p className="text-blue-800 text-sm">
                Positive sentiment has increased by 15% over the past week, with the strongest 
                growth occurring on weekends. This suggests improved public perception and 
                successful engagement strategies.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Methodology */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cognitive Computing Methodology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">NLP Models Used</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• VADER Sentiment Analysis for social media text</li>
              <li>• Custom transformer models for sarcasm detection</li>
              <li>• Multilingual BERT for cross-language analysis</li>
              <li>• Emotion classification using fine-tuned models</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Processing Pipeline</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Text preprocessing and normalization</li>
              <li>• Context-aware tokenization</li>
              <li>• Feature extraction and embedding</li>
              <li>• Multi-model ensemble prediction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;