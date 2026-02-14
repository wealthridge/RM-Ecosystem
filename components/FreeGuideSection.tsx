import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

const FreeGuideSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0f2a1d] border-b border-brand-gold/10 py-20 px-6 overflow-hidden relative">
       {/* Ambient Lighting */}
       <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

       {/* Content */}
       <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Text Side */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col items-start"
          >
             <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-bold text-lg tracking-[0.25em] uppercase mb-8 shadow-[0_0_25px_rgba(197,160,89,0.3)]">
                <Sparkles size={20} fill="currentColor" className="animate-pulse" />
                {t('guide.free')}
             </div>
             
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
               {t('guide.title_start')} 
               <span className="text-brand-gold text-glow">{t('guide.title_highlight')}</span>
               {t('guide.title_end')}
             </h2>
             
             <Button variant="primary" className="w-full md:w-auto text-lg px-8 py-4 shadow-[0_0_30px_rgba(197,160,89,0.25)] hover:shadow-[0_0_45px_rgba(197,160,89,0.4)]">
               <Download size={20} />
               {t('guide.cta')}
             </Button>
          </motion.div>

          {/* Image Side */}
          <motion.div 
             initial={{ opacity: 0, x: 30, scale: 0.9 }}
             whileInView={{ opacity: 1, x: 0, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="flex justify-center lg:justify-end relative"
          >
             {/* Glow behind image */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/10 blur-3xl rounded-full" />
             
             <div className="relative w-full max-w-md">
                <img
                  src="https://i.ibb.co/LzkQG0Gc/Guia-de-libertad.png"
                  alt="Financial Freedom Guide"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 will-change-transform"
                  style={{ 
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" 
                  }}
                />
             </div>
          </motion.div>
       </div>
    </section>
  );
};

export default FreeGuideSection;