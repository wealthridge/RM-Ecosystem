import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth, UserTier } from '../../context/AuthContext';
import Button from '../ui/Button';

interface ProductCardProps {
  title: string;
  description: string;
  requiredTier: UserTier;
  icon: React.ReactNode;
  variant?: 'default' | 'gold' | 'glass' | 'dark';
  delay?: number;
  imageSrc?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  description, 
  requiredTier, 
  icon,
  variant = 'default',
  delay = 0,
  imageSrc
}) => {
  const { user, getTierLevel } = useAuth();
  
  const userLevel = user ? getTierLevel(user.tier) : -1;
  const requiredLevel = getTierLevel(requiredTier);
  const isLocked = userLevel < requiredLevel;

  // Visual Styles based on variant
  const styles = {
    default: "bg-brand-white text-brand-green",
    gold: "bg-brand-green border border-brand-gold text-white",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white",
    dark: "bg-black border border-brand-gold/20 text-white bg-gradient-to-br from-gray-900 to-black",
  };

  const activeStyle = styles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden h-full min-h-[240px] shadow-2xl group ${activeStyle} ${isLocked ? 'grayscale-[0.8] opacity-90' : ''}`}
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center mb-4 shadow-xl">
            <Lock className="text-brand-green" size={32} />
          </div>
          <h3 className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2">Restricted Access</h3>
          <p className="text-white/80 text-sm max-w-[200px]">Upgrade your membership to unlock the {title}.</p>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${variant === 'gold' ? 'bg-brand-gold text-brand-green' : 'bg-brand-gold/10 text-brand-gold'}`}>
            {icon}
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${variant === 'default' ? 'text-brand-green' : 'text-white'}`}>{title}</h3>
          <p className={`text-base leading-relaxed max-w-2xl ${variant === 'default' ? 'text-brand-green/70' : 'text-brand-cream/70'}`}>
            {description}
          </p>
        </div>
        
        {imageSrc && (
          <div className="w-full md:w-64 shrink-0 flex justify-center md:justify-end">
            <img 
              src={imageSrc} 
              alt={title} 
              className="h-48 w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <Button 
          variant={isLocked ? 'outline' : 'primary'}
          className={`w-full md:w-auto justify-between group-hover:shadow-lg ${isLocked ? 'border-brand-cream/50 text-brand-cream' : ''}`}
          disabled={isLocked}
        >
          {isLocked ? (
            <span className="text-sm">UPGRADE TO ACCESS</span>
          ) : (
            <>
              <span className="text-sm">ENTER CLASSROOM</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;