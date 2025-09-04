import React, { useState } from 'react';
import { Play, Download, Loader2, Brain, MessageSquare, Send } from 'lucide-react';
import { mockSocialMediaData } from '../data/twitterData';
import { performSentimentAnalysis } from '../utils/sentimentAnalysis';

const Analysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [analysisType, setAnalysisType] = useState('sentiment');
  const [userInput, setUserInput] = useState('');
  const [userAnalysisResult, setUserAnalysisResult] = useState<any>(null);
  const [isAnalyzingUserInput, setIsAnalyzingUserInput] = useState(false);

  const platforms = ['twitter', 'facebook', 'instagram', 'linkedin', 'reddit'];

  const runAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const filteredData = selectedPlatforms.includes('all')
      ? mockSocialMediaData
      : mockSocialMediaData.filter(post => selectedPlatforms.includes(post.platform));

    const results = performSentimentAnalysis(filteredData, analysisType);
    setAnalysisResults(results);
    setIsAnalyzing(false);
  };

  const downloadResults = () => {
    if (!analysisResults) return;

    const jsonData = JSON.stringify(analysisResults, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment_analysis_results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const togglePlatform = (platform: string) => {
    if (platform === 'all') {
      setSelectedPlatforms(['all']);
    } else {
      const newPlatforms = selectedPlatforms.includes('all')
        ? [platform]
        : selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter(p => p !== platform)
        : [...selectedPlatforms.filter(p => p !== 'all'), platform];

      setSelectedPlatforms(newPlatforms.length === 0 ? ['all'] : newPlatforms);
    }
  };

  const analyzeUserInput = async () => {
    if (!userInput.trim()) return;

    setIsAnalyzingUserInput(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create a mock post from user input
    const mockPost = {
      id: 'user-input',
      timestamp: new Date().toISOString(),
      platform: 'user-input',
      author: 'User',
      content: userInput,
      likes: 0,
      shares: 0,
      comments: 0,
    };

    const result = performSentimentAnalysis([mockPost], analysisType);
    setUserAnalysisResult(result.posts[0]);
    setIsAnalyzingUserInput(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Input Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Real-time Text Analysis</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Enter any text to analyze its sentiment using our cognitive computing models
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text for analysis
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type or paste any social media post, review, comment, or text you want to analyze..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {userInput.length}/500 characters
              </span>
              <button
                onClick={analyzeUserInput}
                disabled={!userInput.trim() || isAnalyzingUserInput}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzingUserInput ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isAnalyzingUserInput ? 'Analyzing...' : 'Analyze Text'}</span>
              </button>
            </div>
          </div>

          {/* User Analysis Results */}
          {userAnalysisResult && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div
                  className={`p-4 rounded-lg ${getSentimentColor(
                    userAnalysisResult.sentiment
                  )}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {getSentimentEmoji(userAnalysisResult.sentiment)}
                    </span>
                    <span className="font-semibold capitalize">
                      {userAnalysisResult.sentiment}
                    </span>
                  </div>
                  <div className="text-sm opacity-75">Primary Sentiment</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {Math.round(userAnalysisResult.confidence * 100)}%
                  </div>
                  <div className="text-sm text-blue-700">Confidence Score</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-indigo-800 mb-2">
                    Detected Emotions
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {userAnalysisResult.emotions.map(
                      (emotion: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full"
                        >
                          {emotion}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Analyzed Text</h4>
                <p className="text-gray-700 text-sm italic">
                  "{userAnalysisResult.content}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Configuration */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Configure Cognitive Analysis
        </h2>
        <p className="text-gray-600 mb-8">
          Choose the type of analysis and social media platforms to include.
        </p>

        <div className="space-y-6">
          {/* Analysis Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Analysis Type
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setAnalysisType('sentiment')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  analysisType === 'sentiment'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Brain className="w-6 h-6 mb-2 mx-auto" />
                <div className="font-medium">Sentiment Analysis</div>
                <div className="text-xs text-gray-600 mt-1">
                  Positive, Negative, Neutral
                </div>
              </button>
              <button
                onClick={() => setAnalysisType('emotion')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  analysisType === 'emotion'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Brain className="w-6 h-6 mb-2 mx-auto" />
                <div className="font-medium">Emotion Detection</div>
                <div className="text-xs text-gray-600 mt-1">
                  Joy, Anger, Fear, Surprise
                </div>
              </button>
              <button
                onClick={() => setAnalysisType('topic')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  analysisType === 'topic'
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Brain className="w-6 h-6 mb-2 mx-auto" />
                <div className="font-medium">Topic Modeling</div>
                <div className="text-xs text-gray-600 mt-1">
                  Trending topics and themes
                </div>
              </button>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => togglePlatform('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedPlatforms.includes('all')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Platforms
              </button>
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedPlatforms.includes(platform)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <div className="flex justify-center">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Cognitive Analysis'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Analysis Progress
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-gray-700">
                Preprocessing social media data...
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-gray-700">
                Applying NLP models for sentiment detection...
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-gray-700">
                Analyzing context and sarcasm patterns...
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-gray-700">Generating insights and trends...</span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results Preview */}
      {analysisResults && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
            <button
              onClick={downloadResults}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Results</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {analysisResults.summary.positive}%
              </div>
              <div className="text-sm text-green-700">Positive Sentiment</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">
                {analysisResults.summary.negative}%
              </div>
              <div className="text-sm text-red-700">Negative Sentiment</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-600">
                {analysisResults.summary.neutral}%
              </div>
              <div className="text-sm text-gray-700">Neutral Sentiment</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Analysis completed on {analysisResults.analysisDate} with{' '}
              {analysisResults.postsAnalyzed} posts
            </p>
            <p className="text-sm text-blue-600 mt-2">
              View detailed results and visualizations in the Results tab
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
