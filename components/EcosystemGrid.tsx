import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BarChart3, GraduationCap, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EcosystemGrid: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <section id="ecosystem" className="py-24 px-6 bg-brand-green relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t('eco.title_pre')} <span className="text-brand-gold">{t('eco.title_span')}</span>
          </h2>
          <p className="text-brand-cream text-lg max-w-2xl">
            {t('eco.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid with Staggered Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          
          {/* Card 1: Command Center - Top Left */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-1 bg-brand-cream rounded-3xl p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden will-change-transform"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-green mb-3">{t('eco.card1.title')}</h3>
              <p className="text-brand-green/70 text-base">
                {t('eco.card1.desc')}
              </p>
            </div>
            <div className="mt-8 flex items-center text-brand-green font-semibold gap-2 group-hover:gap-4 transition-all">
               {t('eco.card1.cta')} <ArrowUpRight size={18} />
            </div>
          </motion.div>

          {/* Card 2: Academy - Top Center */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-1 bg-brand-cream rounded-3xl p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden will-change-transform"
          >
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-green mb-3">{t('eco.card2.title')}</h3>
              <p className="text-brand-green/70 text-base">
                {t('eco.card2.desc')}
              </p>
            </div>
            <div className="mt-8 flex items-center text-brand-green font-semibold gap-2 group-hover:gap-4 transition-all">
               {t('eco.card2.cta')} <ArrowUpRight size={18} />
            </div>
          </motion.div>

          {/* Card 3: The Book - Top Right */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-1 bg-brand-cream rounded-3xl p-8 flex flex-col justify-between group cursor-pointer will-change-transform"
          >
             <div>
               <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-green mb-3">{t('eco.card3.title')}</h3>
              <p className="text-brand-green/70 text-base">{t('eco.card3.desc')}</p>
             </div>
             <div className="mt-8 flex items-center text-brand-green font-semibold gap-2 group-hover:gap-4 transition-all">
                 {t('eco.card3.cta')} <ArrowUpRight size={18} />
             </div>
          </motion.div>

          {/* Card 4: Masterminds - Bottom Full Width */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="md:col-span-3 bg-brand-green border border-brand-gold/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between group cursor-pointer relative overflow-hidden will-change-transform"
          >
             {/* Simple solid dark overlay on hover instead of texture */}
             <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-brand-gold flex items-center justify-center backdrop-blur-sm">
                    <Users size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{t('eco.card4.title')}</h3>
                </div>
               <p className="text-brand-cream/80 text-lg">
                 {t('eco.card4.desc')}
               </p>
             </div>
             <div className="relative z-10 mt-8 md:mt-0">
               <div className="w-14 h-14 rounded-full border border-brand-gold text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-green transition-all shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                  <ArrowUpRight size={24} />
               </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemGrid;