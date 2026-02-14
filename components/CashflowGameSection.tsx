import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

const CashflowGameSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0f2a1d] py-24 px-6 border-y border-brand-gold/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-radial opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 items-center gap-12 relative z-10">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end order-2 lg:order-1"
        >
          <img 
            src="https://i.ibb.co/DgYq5kpg/Cashflow-1.png" 
            alt="Cashflow Game Board"
            className="w-full max-w-sm object-contain drop-shadow-2xl transform lg:-rotate-6 hover:rotate-0 transition-transform duration-500 will-change-transform"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" }}
          />
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center order-1 lg:order-2 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {t('cashflow.title_start')} <br className="hidden md:block" />
            <span className="text-brand-gold text-glow text-5xl md:text-6xl block mt-2 font-extrabold tracking-wide">
                {t('cashflow.title_highlight')}
            </span>
          </h2>
          
          <Button variant="primary" className="px-12 py-5 text-lg font-bold shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:shadow-[0_0_60px_rgba(197,160,89,0.5)]">
            <PlayCircle size={28} fill="currentColor" className="text-white" />
            {t('cashflow.cta')}
          </Button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start order-3"
        >
           <img 
            src="https://i.ibb.co/jvxFTdsh/Cashflow-2.png" 
            alt="Cashflow Game Cards"
            className="w-full max-w-sm object-contain drop-shadow-2xl transform lg:rotate-6 hover:rotate-0 transition-transform duration-500 will-change-transform"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default CashflowGameSection;