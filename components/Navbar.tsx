import React, { useState, useEffect } from 'react';
import { Menu, X, User, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();
  const { showLogin } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: t('nav.academy'), 
      href: '#academy',
      children: [
        { name: t('nav.sub_lider'), href: '#lider-financiero', desc: 'Financial Leadership' },
        { name: t('nav.sub_mentor'), href: '#mentorship', desc: 'Direct Guidance' },
        { name: t('nav.sub_elite'), href: '#elite-mastermind', desc: 'Top Tier Network' },
      ]
    },
    { name: t('nav.shop'), href: '#shop' },
    { name: t('nav.about'), href: '#about' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    showLogin();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'py-4 bg-[#173F26]/95 backdrop-blur-md border-[#C5A059]/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tighter text-brand-gold uppercase relative z-10">
            Real Mentor
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 relative z-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.children ? setActiveDropdown(link.name) : setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="group flex items-center gap-1 text-sm font-medium text-brand-cream hover:text-brand-gold transition-colors tracking-wide py-2"
                >
                  {link.name}
                  {link.children && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </a>

                {/* Apple-style Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#173F26]/95 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1"
                        onMouseEnter={() => setActiveDropdown(link.name)}
                      >
                         {link.children.map((child) => (
                           <a 
                             key={child.name}
                             href={child.href}
                             className="block px-4 py-3 rounded-xl hover:bg-brand-gold/10 transition-colors group"
                           >
                             <span className="block text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">
                               {child.name}
                             </span>
                           </a>
                         ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-brand-gold border border-brand-gold/30 rounded-full px-3 py-1 hover:bg-brand-gold hover:text-brand-green transition-all"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </button>

            <Button variant="primary" className="text-sm px-5 py-2" onClick={handleLoginClick}>
              <User size={16} />
              {t('nav.login')}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4 relative z-10">
             <button 
              onClick={toggleLanguage}
              className="text-brand-gold font-bold text-sm border border-brand-gold/30 rounded-full px-2 py-1"
            >
              {language.toUpperCase()}
            </button>
            <button
              className="text-brand-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-brand-green/95 backdrop-blur-xl pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 items-center h-full pb-24">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col items-center gap-4 w-full">
                  <a
                    href={link.href}
                    onClick={() => !link.children && setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-brand-cream hover:text-brand-gold"
                  >
                    {link.name}
                  </a>
                  
                  {link.children && (
                    <div className="flex flex-col gap-3 items-center bg-white/5 w-full py-4 rounded-xl border border-white/10">
                      {link.children.map(child => (
                        <a 
                          key={child.name} 
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg text-brand-cream/80 hover:text-brand-gold font-medium"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex items-center gap-4 mt-8">
                 <span className="text-brand-cream text-sm uppercase tracking-widest">Language:</span>
                 <button 
                    onClick={toggleLanguage}
                    className="text-brand-gold font-bold text-lg border border-brand-gold px-4 py-1 rounded-full"
                  >
                    {language === 'en' ? 'Español' : 'English'}
                  </button>
              </div>
              <Button variant="primary" className="mt-4 w-full justify-center" onClick={handleLoginClick}>
                 {t('nav.login')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;