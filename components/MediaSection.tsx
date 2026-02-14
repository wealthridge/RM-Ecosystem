import React from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, ExternalLink, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

const MediaSection: React.FC = () => {
  const { t } = useLanguage();

  // Mock data representing trending videos from @fernandogonzalezmentor
  const videos = [
    {
      id: 1,
      title: "Robert Kiyosaki & Fernando González: The Future of Money",
      views: "1.2M views",
      image: "https://picsum.photos/seed/richdad1/600/340",
      duration: "45:20"
    },
    {
      id: 2,
      title: "Como Levantar Capital Sin Dinero",
      views: "890K views",
      image: "https://picsum.photos/seed/capital/600/340",
      duration: "18:15"
    },
    {
      id: 3,
      title: "3 Activos Que Te Harán Libre",
      views: "540K views",
      image: "https://picsum.photos/seed/assets/600/340",
      duration: "22:10"
    }
  ];

  const podcasts = [
    {
      id: 1,
      title: "Ep 45: Fear is a Choice",
      desc: "Overcoming paralysis analysis in business.",
      image: "https://picsum.photos/seed/pod1/400/400"
    },
    {
      id: 2,
      title: "Ep 46: Market Trends 2025",
      desc: "What to expect in the next economic cycle.",
      image: "https://picsum.photos/seed/pod2/400/400"
    },
    {
      id: 3,
      title: "Ep 47: Interview with Robert Kiyosaki",
      desc: "Lessons from 28 years of partnership.",
      image: "https://picsum.photos/seed/pod3/400/400"
    }
  ];

  return (
    <section className="bg-brand-green py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* YOUTUBE SECTION */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-2 text-brand-gold">
                <Play size={24} fill="currentColor" />
                <span className="font-bold tracking-widest uppercase text-sm">Real Mentor TV</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {t('media.yt_title')}
              </h2>
              <p className="text-brand-cream/60 mt-2 text-lg">{t('media.yt_subtitle')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <a href="https://www.youtube.com/@fernandogonzalezmentor" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-sm">
                  {t('media.visit_channel')} <ExternalLink size={16} />
                </Button>
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <motion.a
                href="https://www.youtube.com/@fernandogonzalezmentor" // Directing to channel for demo, or individual video link if available
                target="_blank"
                rel="noopener noreferrer"
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/90 flex items-center justify-center text-white pl-1 shadow-xl">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-tight mb-2">
                  {video.title}
                </h3>
                <p className="text-brand-cream/50 text-sm">{video.views}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* PODCAST SECTION */}
        <div className="pt-10 border-t border-brand-gold/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-2 text-brand-gold">
                <Mic size={24} />
                <span className="font-bold tracking-widest uppercase text-sm">Audio Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {t('media.pod_title')}
              </h2>
              <p className="text-brand-cream/60 mt-2 text-lg">{t('media.pod_subtitle')}</p>
            </motion.div>

             <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
               <span className="text-brand-cream/40 text-sm flex items-center gap-2">
                 <Headphones size={16} /> {t('media.platforms')}
               </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {podcasts.map((pod, idx) => (
               <motion.div
                key={pod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group"
               >
                 <img 
                   src={pod.image} 
                   alt={pod.title} 
                   className="w-24 h-24 rounded-xl object-cover shadow-lg"
                 />
                 <div>
                   <h4 className="text-white font-bold text-lg mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">{pod.title}</h4>
                   <p className="text-brand-cream/60 text-sm mb-3 line-clamp-2">{pod.desc}</p>
                   <span className="text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      {t('media.listen')} <ArrowUpRight />
                   </span>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
)

export default MediaSection;