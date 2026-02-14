import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Counter: React.FC<{ value: number, prefix?: string, suffix?: string, decimals?: number }> = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 50 });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    // Immediate update to handle prop changes (e.g. language switch) even if animation is idle
    if (ref.current) {
      ref.current.textContent = `${prefix}${springValue.get().toFixed(decimals)}${suffix}`;
    }

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
    
    return unsubscribe;
  }, [springValue, prefix, suffix, decimals]);

  return <span ref={ref} />;
};

const AuthoritySection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 28, prefix: "", suffix: t('auth.suffix_years'), label: t('auth.years'), decimals: 0 },
    { value: 1.1, prefix: "+", suffix: "K", label: t('auth.students'), decimals: 1 },
    { value: 55, prefix: "+", suffix: "", label: t('auth.conferences'), decimals: 0 },
    { value: 1, prefix: "", suffix: "", label: t('auth.goal'), decimals: 0 },
  ];

  return (
    <section className="bg-brand-white py-24 px-6 text-brand-green">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4"
            >
              <h3 className="text-5xl md:text-6xl font-bold text-brand-gold mb-2 tracking-tight">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>
              <p className="text-sm font-semibold text-brand-green uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AuthoritySection;