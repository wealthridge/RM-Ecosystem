import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, MessageCircle, Eye } from 'lucide-react';
import { YouTubeVideo, InstagramPost } from '../hooks/useSocialFeeds';

// --- Skeletons ---

export const YouTubeHeroSkeleton = () => (
  <div className="w-full aspect-video bg-white/5 rounded-2xl animate-pulse" />
);

export const YouTubeListSkeleton = () => (
  <div className="flex gap-4 items-center">
    <div className="w-40 h-24 bg-white/5 rounded-lg animate-pulse shrink-0" />
    <div className="flex flex-col gap-2 w-full">
      <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
    </div>
  </div>
);

export const InstagramSkeleton = () => (
  <div className="w-full aspect-square bg-brand-green/10 rounded-xl animate-pulse" />
);

// --- Components ---

export const YouTubeHero: React.FC<{ video: YouTubeVideo }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset playing state when video changes
  useEffect(() => {
    setIsPlaying(false);
  }, [video.id]);

  return (
    <div className="flex flex-col gap-4">
      <motion.div 
        layoutId={`video-container-${video.id}`}
        className="relative w-full aspect-video rounded-2xl overflow-hidden group shadow-2xl border border-white/10 bg-black"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.iframe
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <motion.div
              key="thumbnail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 bg-brand-gold/90 rounded-full flex items-center justify-center text-white pl-2 shadow-[0_0_30px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play Video"
                >
                  <Play fill="currentColor" size={40} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`meta-${video.id}`}
        className="flex flex-col gap-2"
      >
         <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {video.title}
        </h3>
        <div className="flex items-center gap-4 text-brand-cream/50 text-sm uppercase tracking-wider">
           <span>{video.publishedAt}</span>
           <span className="w-1 h-1 rounded-full bg-brand-gold/50" />
           <span className="flex items-center gap-1"><Eye size={14} /> {video.views}</span>
        </div>
      </motion.div>
    </div>
  );
};

interface YouTubeListItemProps {
  video: YouTubeVideo;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const YouTubeListItem: React.FC<YouTubeListItemProps> = ({ video, index, isActive, onClick }) => {
  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-4 group cursor-pointer p-3 rounded-xl transition-all ${
        isActive ? 'bg-white/10 border border-brand-gold/30' : 'hover:bg-white/5 border border-transparent'
      }`}
    >
      <div className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-black/50">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'opacity-50' : 'group-hover:scale-110'}`}
        />
        <div className={`absolute inset-0 flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
           <Play size={20} fill="currentColor" className={isActive ? 'text-brand-gold' : 'text-white'} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <h4 className={`font-semibold text-sm md:text-base line-clamp-2 leading-snug transition-colors ${isActive ? 'text-brand-gold' : 'text-white group-hover:text-brand-gold'}`}>
          {video.title}
        </h4>
        <div className="flex items-center gap-2 text-brand-cream/50 text-xs">
           <span>{video.publishedAt}</span>
           <span className="w-1 h-1 rounded-full bg-gray-500" />
           <span>{video.views}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const InstagramCard: React.FC<{ post: InstagramPost; index: number }> = ({ post, index }) => {
  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative group overflow-hidden rounded-xl bg-gray-100 cursor-pointer block h-full w-full aspect-square`}
    >
      <img 
        src={post.media_url} 
        alt={post.caption} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-gold/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-white backdrop-blur-sm">
        <div className="flex items-center gap-2 font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <Heart size={24} fill="currentColor" /> {post.likes}
        </div>
        <div className="flex items-center gap-2 font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          <MessageCircle size={24} fill="currentColor" /> {post.comments}
        </div>
        <div className="absolute bottom-4 text-xs uppercase tracking-widest font-semibold text-brand-green/80">
          View on Instagram
        </div>
      </div>
    </motion.a>
  );
};