import React from 'react';
import { Download, FileText, Database, BarChart3 } from 'lucide-react';

interface DownloadCenterProps {
  onDownload: (type: string) => void;
}

const DownloadCenter: React.FC<DownloadCenterProps> = ({ onDownload }) => {
  const downloadOptions = [
    {
      id: 'dataset',
      title: 'Raw Dataset',
      description: 'Complete social media dataset in JSON format',
      icon: Database,
      format: 'JSON',
      color: 'blue',
    },
    {
      id: 'analysis',
      title: 'Analysis Results',
      description: 'Sentiment analysis results and insights',
      icon: BarChart3,
      format: 'JSON',
      color: 'green',
    },
    {
      id: 'report',
      title: 'Executive Report',
      description: 'Comprehensive report with visualizations',
      icon: FileText,
      format: 'JSON',
      color: 'purple',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Center</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {downloadOptions.map(option => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onDownload(option.id)}
              className={`p-4 border-2 border-gray-200 rounded-lg hover:border-${option.color}-300 hover:bg-${option.color}-50 transition-colors text-left`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <IconComponent className={`w-5 h-5 text-${option.color}-600`} />
                <span className={`text-xs font-medium px-2 py-1 rounded bg-${option.color}-100 text-${option.color}-800`}>
                  {option.format}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{option.title}</h4>
              <p className="text-xs text-gray-600">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadCenter;