import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LogOut, BookOpen, TrendingUp, Users, Crown, Youtube } from 'lucide-react';
import ProductCard from './ProductCard';
import { useYouTubeFeed } from '../../hooks/useSocialFeeds';
import { YouTubeHeroSkeleton } from '../SocialCard';

const PortalDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: youtubeData, isLoading: isYoutubeLoading } = useYouTubeFeed();

  // Latest News Video (Using first item from hook)
  const latestVideo = youtubeData?.trending;

  return (
    <div className="min-h-screen bg-brand-green text-white pb-20">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-brand-green/80 backdrop-blur-xl border-b border-brand-gold/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="w-2 h-8 bg-brand-gold rounded-full" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white uppercase">Real Mentor Ecosystem</h1>
              <p className="text-xs text-brand-gold uppercase tracking-widest">Welcome, {user?.username}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-brand-cream/60 hover:text-white transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-6">
          
          {/* 1. Latest News (YouTube Feed) */}
          <div className="w-full rounded-3xl overflow-hidden relative group border border-white/10 shadow-2xl bg-black min-h-[400px]">
             <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
               <Youtube size={14} fill="currentColor" /> Latest News
             </div>
             {isYoutubeLoading ? (
               <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                 <YouTubeHeroSkeleton />
               </div>
             ) : latestVideo ? (
               <div className="relative w-full h-full min-h-[400px]">
                  <iframe 
                    className="w-full h-full absolute inset-0 object-cover"
                    src={`https://www.youtube.com/embed/${latestVideo.videoId}?modestbranding=1&rel=0&controls=1`}
                    title="Latest News"
                    allowFullScreen
                  />
               </div>
             ) : (
               <div className="flex items-center justify-center h-full min-h-[400px] bg-brand-green/50">
                 <p>News feed unavailable</p>
               </div>
             )}
          </div>

          {/* 2. Financial Freedom Guides */}
          <ProductCard 
            title="Financial Freedom Guides"
            description="Access the core financial freedom blueprints and your digital copy of 'Del Miedo a la Libertad'."
            requiredTier="free"
            icon={<BookOpen size={24} />}
            variant="default"
            delay={0.1}
            imageSrc="https://i.ibb.co/LzkQG0Gc/Guia-de-libertad.png"
          />

          {/* 3. Cashflow Game Simulator */}
          <ProductCard 
            title="Cashflow Game Simulator"
            description="Master the principles of assets, liabilities, and cash flow with our exclusive online simulator."
            requiredTier="free"
            icon={<TrendingUp size={24} />}
            variant="default"
            delay={0.2}
            imageSrc="https://i.ibb.co/DgYq5kpg/Cashflow-1.png"
          />

          {/* 4. Lider Financiero */}
          <ProductCard 
            title="Lider Financiero Academy"
            description="Full academy access. Module 1-12 covering asset protection, tax strategies, and infinite banking."
            requiredTier="student"
            icon={<BookOpen size={24} />}
            variant="gold"
            delay={0.3}
          />

          {/* 5. Mentorship & Toolkit */}
          <ProductCard 
            title="Mentorship & Toolkit"
            description="Direct access to weekly Q&A calls, the Financial Dashboard SaaS, and private community channels."
            requiredTier="mentee"
            icon={<Users size={24} />}
            variant="glass"
            delay={0.4}
          />

          {/* 6. Elite Mastermind */}
          <ProductCard 
            title="Elite Mastermind"
            description="The inner circle. Bi-annual retreats, 1-on-1 strategy with Fernando, and high-net-worth networking."
            requiredTier="master"
            icon={<Crown size={24} />}
            variant="dark"
            delay={0.5}
          />

        </div>
      </main>
    </div>
  );
};

export default PortalDashboard;