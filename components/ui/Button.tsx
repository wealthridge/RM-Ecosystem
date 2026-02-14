import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-gold text-white hover:bg-white hover:text-brand-green shadow-lg shadow-brand-gold/20",
    secondary: "bg-white text-brand-green border border-brand-gold hover:bg-brand-gold hover:text-white",
    outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white",
    ghost: "text-brand-cream hover:text-brand-gold bg-transparent",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;