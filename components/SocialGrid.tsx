import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

const SocialGrid: React.FC = () => {
  const { t } = useLanguage();

  const posts = [
    { id: 1, image: "https://picsum.photos/seed/insta1/400/400", likes: "2.4k", comments: "120" },
    { id: 2, image: "https://picsum.photos/seed/insta2/400/500", likes: "1.8k", comments: "85" }, // Tall
    { id: 3, image: "https://picsum.photos/seed/insta3/400/400", likes: "3.2k", comments: "210" },
    { id: 4, image: "https://picsum.photos/seed/insta4/400/400", likes: "1.5k", comments: "90" },
    { id: 5, image: "https://picsum.photos/seed/insta5/400/500", likes: "4.1k", comments: "340" } // Tall
  ];

  return (
    <section className="bg-brand-white py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/5 text-brand-green mb-6">
            <Instagram size={24} />
          </div>
          <h2 className="text-4xl font-bold text-brand-green mb-2">{t('social.title')}</h2>
          <a href="#" className="text-xl text-brand-gold font-medium hover:underline">@fernandogonzalezmentor</a>
          <p className="text-brand-green/60 mt-4 max-w-lg mx-auto">{t('social.subtitle')}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {posts.map((post, index) => (
          <motion.a
            href="#"
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative block overflow-hidden rounded-xl bg-gray-100 ${
              index === 1 || index === 4 ? 'row-span-2' : 'aspect-square'
            } `}
          >
            <img 
              src={post.image} 
              alt="Instagram Post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-2 font-bold">
                <Heart size={20} fill="currentColor" /> {post.likes}
              </div>
              <div className="flex items-center gap-2 font-bold">
                <MessageCircle size={20} fill="currentColor" /> {post.comments}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Button variant="outline" className="px-8 border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
          <Instagram size={18} />
          {t('social.follow_btn')}
        </Button>
      </div>
    </section>
  );
};

export default SocialGrid;