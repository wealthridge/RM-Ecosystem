import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginScreen: React.FC = () => {
  const { login, showLanding } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-brand-green flex items-center justify-center p-6"
    >
      <div className="absolute top-8 left-8">
        <button 
          onClick={showLanding}
          className="text-brand-gold flex items-center gap-2 hover:opacity-80 transition-opacity uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} /> Return to Site
        </button>
      </div>

      <div className="w-full max-w-md relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mb-8 border border-brand-gold/20">
              <Lock size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2">THE ECOSYSTEM</h1>
            <p className="text-brand-cream/50 uppercase tracking-[0.3em] text-xs mb-12">Member Access Vault</p>
          </motion.div>

          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <div className="space-y-6">
              <div className="group">
                <input
                  type="text"
                  placeholder="USERNAME"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-b border-brand-gold/30 py-3 text-center text-white placeholder-brand-cream/30 focus:outline-none focus:border-brand-gold transition-colors text-lg"
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-brand-gold/30 py-3 text-center text-white placeholder-brand-cream/30 focus:outline-none focus:border-brand-gold transition-colors text-lg"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-400 text-sm font-medium"
              >
                Access Denied. Invalid Credentials.
              </motion.p>
            )}

            <Button 
              variant="primary" 
              className="w-full py-4 mt-4 font-bold tracking-widest bg-brand-gold text-brand-green hover:bg-white"
            >
              AUTHENTICATE ACCESS
            </Button>
            
            <div className="text-xs text-brand-cream/30 mt-8">
              <p>SECURE CONNECTION // 256-BIT ENCRYPTION</p>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;