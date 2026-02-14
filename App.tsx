import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreeGuideSection from './components/FreeGuideSection';
import AuthoritySection from './components/AuthoritySection';
import EcosystemGrid from './components/EcosystemGrid';
import CashflowGameSection from './components/CashflowGameSection';
import PortalTeaser from './components/PortalTeaser';
import SocialHub from './components/SocialHub';
import Footer from './components/Footer';
import LoginScreen from './components/portal/LoginScreen';
import PortalDashboard from './components/portal/PortalDashboard';

const App: React.FC = () => {
  const { currentView } = useAuth();

  return (
    <div className="min-h-screen bg-brand-green text-white font-sans selection:bg-brand-gold selection:text-brand-green">
      <AnimatePresence mode="wait">
        
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              <Hero />
              <FreeGuideSection />
              <AuthoritySection />
              <EcosystemGrid />
              <CashflowGameSection />
              <PortalTeaser />
              <SocialHub />
            </main>
            <Footer />
          </motion.div>
        )}

        {currentView === 'login' && (
          <LoginScreen key="login" />
        )}

        {currentView === 'portal' && (
          <motion.div
             key="portal"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.5 }}
          >
            <PortalDashboard />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default App;