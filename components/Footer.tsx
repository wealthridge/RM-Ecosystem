import React from 'react';
import { Youtube, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-green text-white pt-20 pb-10 px-6 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-brand-gold uppercase tracking-tighter mb-6">Real Mentor</h3>
            <p className="text-brand-cream/70 max-w-sm mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              {[Youtube, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-green flex items-center justify-center transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.eco')}</h4>
            <ul className="space-y-4 text-brand-cream/70">
              {[
                { label: t('link.academy'), href: '#' },
                { label: t('link.masterminds'), href: '#' },
                { label: t('link.books'), href: '#' },
                { label: t('link.tools'), href: '#' }
              ].map((item, idx) => (
                <li key={idx}><a href={item.href} className="hover:text-brand-gold transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.company')}</h4>
            <ul className="space-y-4 text-brand-cream/70">
              {[
                { label: t('link.about_fernando'), href: '#' },
                { label: t('link.support'), href: '#' },
                { label: t('link.privacy'), href: '#' },
                { label: t('link.terms'), href: '#' }
              ].map((item, idx) => (
                <li key={idx}><a href={item.href} className="hover:text-brand-gold transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-cream/50">
          <p>© {new Date().getFullYear()} Real Mentor Inc. {t('footer.rights')}</p>
          <p className="mt-2 md:mt-0">{t('footer.design')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;