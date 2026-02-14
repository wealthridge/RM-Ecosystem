import React from 'react';
import { motion } from 'framer-motion';
import { Lock, LayoutDashboard } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const PortalTeaser: React.FC = () => {
  const { t } = useLanguage();
  const { showLogin } = useAuth();

  return (
    <section className="relative py-32 px-6 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-10 group"
        >
          <div className="absolute -inset-8 bg-brand-gold/20 rounded-full blur-2xl group-hover:bg-brand-gold/30 transition-all duration-700" />
          <div className="bg-brand-green p-6 rounded-3xl relative shadow-2xl">
            <Lock className="text-brand-gold w-16 h-16" />
          </div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
          {t('portal.title')}
        </h2>
        
        <p className="text-xl text-brand-green/70 max-w-2xl mb-10 leading-relaxed">
          {t('portal.exclusive_access')}
        </p>

        <Button 
          variant="primary" 
          className="text-lg px-10 py-4 shadow-xl shadow-brand-gold/20"
          onClick={showLogin}
        >
          {t('portal.cta')}
        </Button>
      </div>

      {/* Blurred Background Mockup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full opacity-5 pointer-events-none select-none overflow-hidden flex items-center justify-center">
         <div className="w-full h-full grid grid-cols-3 gap-4 rotate-12 scale-150">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-brand-green/20 rounded-xl border border-brand-green/10 flex items-center justify-center">
                    <LayoutDashboard className="text-brand-green/20 w-24 h-24" />
                </div>
            ))}
         </div>
      </div>
      
      {/* Top and Bottom Fade to blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-white to-transparent" />
    </section>
  );
};

export default PortalTeaser;