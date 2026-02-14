import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.academy': { en: 'Academy', es: 'Academia' },
  'nav.masterminds': { en: 'Masterminds', es: 'Masterminds' },
  'nav.shop': { en: 'Shop', es: 'Tienda' },
  'nav.about': { en: 'About', es: 'Nosotros' },
  'nav.login': { en: 'Member Portal Login', es: 'Acceso Miembros' },
  
  // Navbar Dropdown
  'nav.sub_lider': { en: 'Financial Leader', es: 'Líder Financiero' },
  'nav.sub_mentor': { en: 'Mentorship Program', es: 'Mentoría' },
  'nav.sub_elite': { en: 'Elite Mastermind', es: 'Elite Mastermind' },
  
  // Hero
  'hero.tag': { en: 'The New Standard', es: 'El Nuevo Estándar' },
  'hero.title1': { en: 'Real Strategies.', es: 'Estrategias Reales.' },
  'hero.title2': { en: 'Real Assets.', es: 'Activos Reales.' },
  'hero.subtitle': { en: 'The ecosystem for entrepreneurs who want to build an empire, not just a job.', es: 'El ecosistema para emprendedores que quieren construir un imperio, no solo un empleo.' },
  'hero.cta_primary': { en: 'Start Your Transformation', es: 'Inicia Tu Transformación' },
  'hero.cta_secondary': { en: 'Watch the Manifesto', es: 'Ver Manifiesto' },
  'hero.scroll': { en: 'Scroll', es: 'Desplazar' },

  // Free Guide Section
  'guide.title_start': { en: 'Download the guide that has helped ', es: '¡Descarga la guía que ha ayudado a ' },
  'guide.title_highlight': { en: 'THOUSANDS', es: 'MILES' },
  'guide.title_end': { en: ' of entrepreneurs get out of financial stagnancy!', es: ' de emprendedores a salir del estancamiento financiero!' },
  'guide.free': { en: 'FREE', es: 'GRATIS' },
  'guide.cta': { en: 'Download Now', es: 'Descargar Ahora' },

  // Cashflow Game Section
  'cashflow.title_start': { en: 'Play the CashFlow game online for', es: 'Juega al juego CashFlow en línea' },
  'cashflow.title_highlight': { en: 'FREE', es: 'GRATIS' },
  'cashflow.cta': { en: 'PLAY NOW', es: 'JUGAR AHORA' },

  // Authority
  'auth.years': { en: 'Partnered with Robert Kiyosaki', es: 'Socio de Robert Kiyosaki' },
  'auth.suffix_years': { en: ' Years', es: ' Años' },
  'auth.conferences': { en: 'International Conferences', es: 'Conferencias Internacionales' },
  'auth.students': { en: 'Mentored Entrepreneurs', es: 'Emprendedores Mentoreados' },
  'auth.goal': { en: 'Goal: Your Financial Freedom', es: 'Meta: Tu Libertad Financiera' },
  'auth.stat_years': { en: '28 Years', es: '28 Años' },

  // Ecosystem
  'eco.title_pre': { en: 'Everything You Need', es: 'Todo Lo Que Necesitas' },
  'eco.title_span': { en: 'To Win.', es: 'Para Ganar.' },
  'eco.subtitle': { en: 'A comprehensive suite of tools, education, and community designed to accelerate your path to freedom.', es: 'Un conjunto integral de herramientas, educación y comunidad diseñado para acelerar tu camino a la libertad.' },
  
  'eco.card1.title': { en: 'The Toolkit', es: 'El Kit de Herramientas' },
  'eco.card1.desc': { en: 'Access your Business Income Statement and Financial Freedom Dashboard.', es: 'Accede a tu Estado de Resultados y Panel de Libertad Financiera.' },
  'eco.card1.cta': { en: 'Access Tools', es: 'Acceder Herramientas' },

  'eco.card2.title': { en: 'Real Mentor Academy', es: 'Academia Real Mentor' },
  'eco.card2.desc': { en: 'Comprehensive courses and elite certifications for the modern investor.', es: 'Cursos integrales y certificaciones de élite para el inversor moderno.' },
  'eco.card2.cta': { en: 'Start Learning', es: 'Comenzar a Aprender' },

  'eco.card3.title': { en: 'Del Miedo a la Libertad', es: 'Del Miedo a la Libertad' },
  'eco.card3.desc': { en: 'The Best-Selling Blueprint for overcoming fear.', es: 'El blueprint Best-Seller para superar el miedo.' },
  'eco.card3.cta': { en: 'Get Copy', es: 'Obtener Copia' },

  'eco.card4.title': { en: 'Masterminds', es: 'Masterminds' },
  'eco.card4.desc': { en: 'Exclusive retreats and inner-circle events for high-net-worth networking. Surround yourself with success.', es: 'Retiros exclusivos y eventos privados para networking de alto nivel. Rodéate de éxito.' },

  // Portal
  'portal.title': { en: 'Inside the Portal', es: 'Dentro del Portal' },
  'portal.exclusive_access': { 
    en: 'Members get exclusive access to content and tools that accelerate the path to financial freedom', 
    es: 'Los miembros tienen acceso exclusivo a contenido y herramientas que aceleran el camino a la libertad financiera.' 
  },
  'portal.cta': { en: 'Log In to Access Tools', es: 'Iniciar Sesión' },

  // Social Hub
  'social_hub.yt_tag': { en: 'Real Mentor TV', es: 'Real Mentor TV' },
  'social_hub.yt_title': { en: 'Latest Episodes', es: 'Últimos Episodios' },
  'social_hub.visit_channel': { en: 'Visit Channel', es: 'Visitar Canal' },
  'social_hub.watch_next': { en: 'Watch Next', es: 'A Continuación' },
  'social_hub.pod_tag': { en: 'The Podcast', es: 'El Podcast' },
  'social_hub.pod_title': { en: 'Listen On The Go', es: 'Escucha en Movimiento' },
  'social_hub.insta_title': { en: 'Learn how to be financially free,\nFOLLOW US!', es: 'Aprende a ser libre financieramente,\n¡SÍGUENOS!' },

  // Media Section (Legacy/Fallback)
  'media.yt_title': { en: 'Latest from YouTube', es: 'Lo Último en YouTube' },
  'media.yt_subtitle': { en: 'Strategies, mindset, and market analysis.', es: 'Estrategias, mentalidad y análisis de mercado.' },
  'media.watch_now': { en: 'Watch Now', es: 'Ver Ahora' },
  'media.visit_channel': { en: 'Visit Channel', es: 'Visitar Canal' },
  
  'media.pod_title': { en: 'The Real Mentor Podcast', es: 'Podcast Real Mentor' },
  'media.pod_subtitle': { en: 'Audio masterclasses for your commute.', es: 'Masterclases en audio para tu día a día.' },
  'media.listen': { en: 'Listen Episode', es: 'Escuchar Episodio' },
  'media.platforms': { en: 'Available on all platforms', es: 'Disponible en todas las plataformas' },

  // Social Section (Legacy/Fallback)
  'social.title': { en: 'Join the Movement', es: 'Únete al Movimiento' },
  'social.subtitle': { en: 'Daily insights and behind the scenes.', es: 'Insights diarios y detrás de cámaras.' },
  'social.follow_btn': { en: 'Follow on Instagram', es: 'Seguir en Instagram' },

  // Footer
  'footer.desc': { en: 'Building empires, creating assets, and securing freedom for the next generation of entrepreneurs.', es: 'Construyendo imperios, creando activos y asegurando la libertad para la próxima generación de emprendedores.' },
  'footer.eco': { en: 'Ecosystem', es: 'Ecosistema' },
  'footer.company': { en: 'Company', es: 'Compañía' },
  'footer.rights': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  'footer.design': { en: 'Designed for Leaders.', es: 'Diseñado para Líderes.' },
  
  // Footer Links
  'link.academy': { en: 'Academy', es: 'Academia' },
  'link.masterminds': { en: 'Masterminds', es: 'Masterminds' },
  'link.books': { en: 'Books', es: 'Libros' },
  'link.tools': { en: 'Tools', es: 'Herramientas' },
  'link.about_fernando': { en: 'About Fernando', es: 'Sobre Fernando' },
  'link.support': { en: 'Contact Support', es: 'Soporte' },
  'link.privacy': { en: 'Privacy Policy', es: 'Privacidad' },
  'link.terms': { en: 'Terms of Service', es: 'Términos' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};