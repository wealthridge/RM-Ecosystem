import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';

// Defining images with specific URLs provided
const heroImages = [
  {
    id: 'book',
    src: "https://i.ibb.co/7NSXnkdt/Del-Miedo-a-la-Libertad.jpg",
    alt: "Del Miedo a la Libertad Book",
  },
  {
    id: 'guide',
    src: "https://i.ibb.co/LzkQG0Gc/Guia-de-libertad.png",
    alt: "Financial Freedom Guide",
  },
  {
    id: 'mentorship',
    src: "https://i.ibb.co/1YT2L9pN/Mentoria-1.png",
    alt: "Mentorship Program",
  },
  {
    id: 'event',
    src: "https://i.ibb.co/nNbw5n4J/Event-Miami.png",
    alt: "Event with Robert Kiyosaki",
  },
  {
    id: 'toolkit',
    src: "https://i.ibb.co/8nvXqtcJ/RM-Toolkit.png", 
    alt: "Real Mentor Toolkit",
  },
  {
    id: 'cashflow',
    src: "https://i.ibb.co/DgYq5kpg/Cashflow-1.png",
    alt: "Cashflow Game",
  }
];

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const activeImage = heroImages[currentImageIndex];

  // Parallax: Text moves slower than scroll
  const textY = useTransform(scrollY, [0, 800], [0, 300]);
  // Fade Out: Text fades as user scrolls
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  // Scale Up: Background scales slightly
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={targetRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-green pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Preload images to prevent flicker */}
      <div className="hidden">
        {heroImages.map((img) => (
          <img key={img.id} src={img.src} alt="preload" />
        ))}
      </div>

      {/* Background Gradient with Scale Effect */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 bg-hero-radial pointer-events-none will-change-transform" 
      />

      <div className="max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content with Parallax */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-left will-change-transform relative z-20 flex flex-col justify-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-semibold tracking-wider uppercase mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            {t('hero.tag')}
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {t('hero.title1')} <br />
            {t('hero.title2')} <br />
            <span className="text-brand-gold text-glow">Real Mentor.</span>
          </h1>

          <p className="text-lg md:text-xl text-brand-cream font-light max-w-xl leading-relaxed mb-8 md:mb-10">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary">
              {t('hero.cta_primary')}
              <ArrowRight size={18} />
            </Button>
            <Button variant="ghost">
              <PlayCircle size={20} />
              {t('hero.cta_secondary')}
            </Button>
          </div>
        </motion.div>

        {/* Right Visual - Adjusted for better fit on smaller desktops */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ y: useTransform(scrollY, [0, 800], [0, 100]) }}
          className="hidden lg:flex justify-center items-center relative w-full h-[500px] xl:h-[600px]"
        >
           {/* Abstract Gold Rings */}
           <div className="relative w-[450px] h-[450px] xl:w-[600px] xl:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 border border-brand-gold/20 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-12 border border-brand-gold/30 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-24 border border-brand-gold/40 rounded-full animate-[spin_20s_linear_infinite]" />
              
              {/* Central Glow */}
              <div className="absolute w-[350px] h-[350px] bg-brand-gold/10 rounded-full blur-[80px]" />
              
              {/* Dynamic Image Container - Floating Images (No Box) */}
              <div className="relative flex items-center justify-center z-10 w-[300px] h-[400px] xl:w-[400px] xl:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeImage.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                     {/* Main Image - Floating with Shadow */}
                     <img 
                        src={activeImage.src}
                        alt={activeImage.alt}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                        style={{ 
                          filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))" 
                        }}
                        loading="eager"
                     />
                  </motion.div>
                </AnimatePresence>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on smaller screens */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: textOpacity }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden xl:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-brand-cream/50"
      >
        <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;