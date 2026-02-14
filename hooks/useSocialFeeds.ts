import { useQuery } from '@tanstack/react-query';

// --- Configuration ---
const YOUTUBE_API_KEY = "AIzaSyAdfb1OZw4EMl3kvXlHA_JipRZMbGZGZ1c";
const YOUTUBE_CHANNEL_ID = "UCh-GUC2g_15bS57INyxXrFQ";

// --- Types ---
export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: string;
  url: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  likes: number; 
  comments: number; 
}

// --- Helpers ---
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
};

const formatViewCount = (viewCount: string) => {
  const num = parseInt(viewCount, 10);
  if (isNaN(num)) return "0 views";
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M views";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K views";
  }
  return num + " views";
};

const parseDuration = (duration: string): number => {
  if (!duration) return 0;
  // ISO 8601 duration pattern: PT#H#M#S
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return (hours * 3600) + (minutes * 60) + seconds;
};

const decodeHtmlEntities = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

// --- Mocks (Fallback) ---
const MOCK_YOUTUBE_TRENDING: YouTubeVideo = {
  id: 'trend-1',
  videoId: 'bJzb-RuUcMU',
  title: "Robert Kiyosaki & Fernando González: The Future of Money",
  thumbnail: "https://img.youtube.com/vi/bJzb-RuUcMU/maxresdefault.jpg",
  publishedAt: "2 days ago",
  views: "1.2M views",
  url: "https://www.youtube.com/watch?v=bJzb-RuUcMU"
};

const MOCK_YOUTUBE_RECENT: YouTubeVideo[] = [
  { id: 'recent-1', videoId: 'W6h8wF6-1cM', title: "Como Levantar Capital Sin Dinero", thumbnail: "https://img.youtube.com/vi/W6h8wF6-1cM/maxresdefault.jpg", publishedAt: "2 days ago", views: "45K views", url: "https://www.youtube.com/watch?v=W6h8wF6-1cM" },
  { id: 'recent-2', videoId: 'OsV_M5jV6zQ', title: "3 Activos Que Te Harán Libre en 2024", thumbnail: "https://img.youtube.com/vi/OsV_M5jV6zQ/maxresdefault.jpg", publishedAt: "5 days ago", views: "120K views", url: "https://www.youtube.com/watch?v=OsV_M5jV6zQ" },
  { id: 'recent-3', videoId: 'KjT2p9X_g5Q', title: "Mastermind Recap: Dubai Experience", thumbnail: "https://img.youtube.com/vi/KjT2p9X_g5Q/maxresdefault.jpg", publishedAt: "1 week ago", views: "8.5K views", url: "https://www.youtube.com/watch?v=KjT2p9X_g5Q" },
];

const MOCK_INSTAGRAM: InstagramPost[] = [
  { id: '1', caption: 'Building empires.', media_url: 'https://picsum.photos/seed/insta1/600/600', permalink: '#', likes: 2400, comments: 120 },
  { id: '2', caption: 'Legacy.', media_url: 'https://picsum.photos/seed/insta2/600/800', permalink: '#', likes: 1800, comments: 85 },
  { id: '3', caption: 'Focus.', media_url: 'https://picsum.photos/seed/insta3/600/600', permalink: '#', likes: 3200, comments: 210 },
  { id: '4', caption: 'Freedom.', media_url: 'https://picsum.photos/seed/insta4/600/600', permalink: '#', likes: 1500, comments: 90 },
  { id: '5', caption: 'Growth.', media_url: 'https://picsum.photos/seed/insta5/600/800', permalink: '#', likes: 4100, comments: 340 },
  { id: '6', caption: 'Mindset.', media_url: 'https://picsum.photos/seed/insta6/600/600', permalink: '#', likes: 2200, comments: 150 },
];

// --- API Helpers ---

const fetchYouTubeData = async (): Promise<{ trending: YouTubeVideo; recent: YouTubeVideo[] }> => {
  try {
    // 1. Search for latest videos using the Search endpoint
    // We use type=video to ensure we only get videos.
    // We fetch 30 items to allow a buffer for filtering out Shorts and short clips.
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.append('key', YOUTUBE_API_KEY);
    searchUrl.searchParams.append('channelId', YOUTUBE_CHANNEL_ID);
    searchUrl.searchParams.append('part', 'snippet,id');
    searchUrl.searchParams.append('order', 'date');
    searchUrl.searchParams.append('maxResults', '30');
    searchUrl.searchParams.append('type', 'video');
    
    const searchResponse = await fetch(searchUrl.toString());

    if (!searchResponse.ok) {
       const err = await searchResponse.json();
       console.warn("YouTube Search Error:", err);
       throw new Error('Failed to fetch YouTube search results');
    }

    const searchData = await searchResponse.json();
    if (!searchData.items || searchData.items.length === 0) {
        return { trending: MOCK_YOUTUBE_TRENDING, recent: MOCK_YOUTUBE_RECENT };
    }

    // 2. Extract Video IDs to fetch full details
    // We filter to ensure we only have valid videoIds before joining
    const videoIds = searchData.items
      .filter((item: any) => item.id && item.id.videoId)
      .map((item: any) => item.id.videoId)
      .join(',');

    if (!videoIds) {
      throw new Error('No valid video IDs found in search results');
    }

    // 3. Fetch video details (duration, view count)
    // We MUST do this to get contentDetails.duration to filter shorts
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videosUrl.searchParams.append('key', YOUTUBE_API_KEY);
    videosUrl.searchParams.append('id', videoIds);
    videosUrl.searchParams.append('part', 'snippet,contentDetails,statistics');

    const videosResponse = await fetch(videosUrl.toString());

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch YouTube details');
    }

    const videosData = await videosResponse.json();
    
    // 4. Process and Filter (exclude videos shorter than 2 minutes)
    // Requirement: Exclude videos shorter than 2 minute. Only fetch 'medium' and 'long' durations.
    const validVideos: YouTubeVideo[] = [];
    
    for (const item of videosData.items) {
        // Safe access to duration
        const durationStr = item.contentDetails?.duration || '';
        const durationSec = parseDuration(durationStr);
        
        // Exclude videos shorter than 120 seconds (2 minutes)
        if (durationSec >= 120) {
            validVideos.push({
                id: item.id,
                videoId: item.id,
                title: decodeHtmlEntities(item.snippet.title),
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
                publishedAt: formatTimeAgo(item.snippet.publishedAt),
                views: formatViewCount(item.statistics.viewCount),
                url: `https://www.youtube.com/watch?v=${item.id}`
            });
        }
    }

    // Return the top 4 found
    if (validVideos.length === 0) return { trending: MOCK_YOUTUBE_TRENDING, recent: MOCK_YOUTUBE_RECENT };
    
    return {
      trending: validVideos[0],
      recent: validVideos.slice(1, 4) // Take next 3
    };

  } catch (error) {
    console.error("YouTube Fetch Error (using fallback):", error);
    return { trending: MOCK_YOUTUBE_TRENDING, recent: MOCK_YOUTUBE_RECENT };
  }
};

const fetchInstagramData = async (): Promise<InstagramPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_INSTAGRAM;
};

// --- Hooks ---

export const useYouTubeFeed = () => {
  return useQuery({
    queryKey: ['youtube-feed'],
    queryFn: fetchYouTubeData,
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
};

export const useInstagramFeed = () => {
  return useQuery({
    queryKey: ['instagram-feed'],
    queryFn: fetchInstagramData,
    retry: false,
  });
};