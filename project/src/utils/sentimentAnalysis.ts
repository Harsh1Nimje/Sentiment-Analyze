import { SocialMediaPost } from '../data/twitterData';

export interface SentimentResult {
  summary: {
    positive: number;
    negative: number;
    neutral: number;
  };
  platformBreakdown: Array<{
    platform: string;
    positive: number;
    negative: number;
    neutral: number;
    avgConfidence: number;
  }>;
  posts: Array<{
    id: string;
    content: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    emotions: string[];
    platform: string;
  }>;
  analysisDate: string;
  postsAnalyzed: number;
}

// Mock sentiment analysis with realistic results
export const performSentimentAnalysis = (
  posts: SocialMediaPost[], 
  analysisType: string
): SentimentResult => {
  const analyzedPosts = posts.map(post => {
    // Simple sentiment analysis simulation based on keywords
    const content = post.content.toLowerCase();
    let sentiment: 'positive' | 'negative' | 'neutral';
    let confidence: number;
    let emotions: string[];

    // Detect sentiment patterns
    const positiveWords = ['amazing', 'love', 'great', 'excellent', 'fantastic', 'impressed', 'wonderful', 'perfect'];
    const negativeWords = ['disappointed', 'hate', 'terrible', 'awful', 'bad', 'worse', 'concerns', 'problem'];
    const sarcasmIndicators = ['yeah right', 'totally convinced', '🙄', 'sure thing'];

    const positiveCount = positiveWords.filter(word => content.includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.includes(word)).length;
    const hasSarcasm = sarcasmIndicators.some(indicator => content.includes(indicator));

    if (hasSarcasm) {
      sentiment = 'negative';
      confidence = 0.85;
      emotions = ['sarcasm', 'skepticism'];
    } else if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = Math.min(0.9, 0.6 + (positiveCount * 0.1));
      emotions = ['joy', 'satisfaction'];
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = Math.min(0.9, 0.6 + (negativeCount * 0.1));
      emotions = ['disappointment', 'frustration'];
    } else {
      sentiment = 'neutral';
      confidence = 0.7;
      emotions = ['neutral'];
    }

    return {
      id: post.id,
      content: post.content,
      sentiment,
      confidence,
      emotions,
      platform: post.platform,
    };
  });

  // Calculate summary statistics
  const totalPosts = analyzedPosts.length;
  const positiveCount = analyzedPosts.filter(p => p.sentiment === 'positive').length;
  const negativeCount = analyzedPosts.filter(p => p.sentiment === 'negative').length;
  const neutralCount = totalPosts - positiveCount - negativeCount;

  const summary = {
    positive: Math.round((positiveCount / totalPosts) * 100),
    negative: Math.round((negativeCount / totalPosts) * 100),
    neutral: Math.round((neutralCount / totalPosts) * 100),
  };

  // Platform breakdown
  const platforms = Array.from(new Set(posts.map(p => p.platform)));
  const platformBreakdown = platforms.map(platform => {
    const platformPosts = analyzedPosts.filter(p => p.platform === platform);
    const platformTotal = platformPosts.length;
    const platformPositive = platformPosts.filter(p => p.sentiment === 'positive').length;
    const platformNegative = platformPosts.filter(p => p.sentiment === 'negative').length;
    const platformNeutral = platformTotal - platformPositive - platformNegative;
    const avgConfidence = platformPosts.reduce((sum, p) => sum + p.confidence, 0) / platformTotal;

    return {
      platform,
      positive: Math.round((platformPositive / platformTotal) * 100),
      negative: Math.round((platformNegative / platformTotal) * 100),
      neutral: Math.round((platformNeutral / platformTotal) * 100),
      avgConfidence: Math.round(avgConfidence * 100) / 100,
    };
  });

  return {
    summary,
    platformBreakdown,
    posts: analyzedPosts,
    analysisDate: new Date().toISOString(),
    postsAnalyzed: totalPosts,
  };
};