import React, { useState } from 'react';
import { Download, Search, Filter, Calendar } from 'lucide-react';
import { mockSocialMediaData } from '../data/twitterData';

const Dataset: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredData = mockSocialMediaData.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && new Date(post.timestamp).toDateString() === new Date().toDateString()) ||
      (dateFilter === 'week' && new Date(post.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesPlatform && matchesDate;
  });

  const downloadDataset = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social_media_dataset.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = ['timestamp', 'platform', 'author', 'content', 'likes', 'shares', 'comments'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        headers.map(header => 
          typeof row[header as keyof typeof row] === 'string' 
            ? `"${(row[header as keyof typeof row] as string).replace(/"/g, '""')}"` 
            : row[header as keyof typeof row]
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social_media_dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Social Media Dataset
            </h1>
            <p className="text-gray-600">
              Explore and analyze our curated collection of social media posts from various platforms
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadCSV}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={downloadDataset}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Platforms</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="reddit">Reddit</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
            </select>
          </div>
        </div>

        {/* Dataset Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
            <div className="text-sm text-blue-700">Total Posts</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {new Set(filteredData.map(p => p.platform)).size}
            </div>
            <div className="text-sm text-green-700">Platforms</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredData.map(p => p.author)).size}
            </div>
            <div className="text-sm text-purple-700">Authors</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredData.reduce((sum, p) => sum + p.likes + p.shares, 0)}
            </div>
            <div className="text-sm text-orange-700">Total Engagement</div>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Platform</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Content</th>
                <th className="px-6 py-3">Engagement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.slice(0, 20).map((post, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.platform === 'twitter' ? 'bg-blue-100 text-blue-800' :
                      post.platform === 'facebook' ? 'bg-indigo-100 text-indigo-800' :
                      post.platform === 'instagram' ? 'bg-pink-100 text-pink-800' :
                      post.platform === 'linkedin' ? 'bg-cyan-100 text-cyan-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {post.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{post.author}</td>
                  <td className="px-6 py-4 max-w-md">
                    <div className="text-gray-900 truncate">{post.content}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    <div className="text-xs text-gray-500">
                      {post.likes}👍 {post.shares}🔄 {post.comments}💬
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length > 20 && (
          <div className="text-center mt-4 text-gray-500">
            Showing first 20 of {filteredData.length} posts. Use filters to refine your view.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dataset;