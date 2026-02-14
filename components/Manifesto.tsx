import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Manifesto: React.FC = () => {
  const { t } = useLanguage();
  const text = t('manifesto.text');
  const words = text.split(" ");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"]
  });

  return (
    <section ref={containerRef} className="py-32 px-6 bg-brand-green text-brand-cream relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 text-brand-gold uppercase tracking-widest text-sm font-bold opacity-70">
            {t('manifesto.label')}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight flex flex-wrap gap-x-3 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="relative transition-opacity duration-300">
      {children}
    </motion.span>
  );
};

export default Manifesto;