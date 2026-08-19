import React from 'react';
import { ArrowRight } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

interface CollectionCardsProps {
  onSelectCategory: (category: string) => void;
}

export const CollectionCards: React.FC<CollectionCardsProps> = ({ onSelectCategory }) => {
  const collections = [
    {
      id: 'gold',
      title: 'Gold Sanctuary',
      subtitle: '22KT Pure Hallmark',
      tagline: 'Featherlight modern hoops & cast bangles.',
      image: './images/jewelry_39088cb4d238.jpg',
      itemCount: '720+ Designs',
      badge: 'BIS 916 HUID',
      fallbackType: 'gold' as const
    },
    {
      id: 'bridal',
      title: 'Bridal & Temple Vault',
      subtitle: 'Regal South Indian Heirlooms',
      tagline: 'Chettinad nakshi haars & ruby chokers.',
      image: './images/jewelry_236b9320d4de.jpg',
      itemCount: '180+ Suites',
      badge: 'Heritage Nakshi',
      fallbackType: 'bridal' as const
    },
    {
      id: 'silver',
      title: 'Celestial Silver & Gems',
      subtitle: '925 Italian-Cut Brilliance',
      tagline: 'Anti-tarnish 925 sterling solitaires.',
      image: './images/jewelry_9ae95ee78101.jpg',
      itemCount: '450+ Solitaires',
      badge: '925 Sterling',
      fallbackType: 'silver' as const
    }
  ];

  return (
    <section id="collections-section" className="py-12 sm:py-16 md:py-20 relative transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.25em] text-brand-primary dark:text-brand-primary-light font-semibold mb-2">
            <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
            <span>Signature Departments</span>
            <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-surface-text dark:text-dark-text font-medium tracking-tight">
            Curated Jewelry Collections
          </h2>
        </div>

        {/* Seamless 3-Column Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory(col.id)}
              className="group cursor-pointer flex flex-col justify-between transition-all duration-500"
            >
              {/* Full-Bleed Image Frame with Ambient Glow on Hover */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-subtle dark:bg-dark-card shadow-md group-hover:shadow-2xl transition-all duration-700">
                <img loading="lazy"
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, col.fallbackType)}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-1000 ease-out"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Floating Top Hallmark Pill */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-primary dark:text-brand-primary-light shadow-xs">
                  {col.badge}
                </div>

                {/* Inset Bottom Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-amber-200/90 font-medium mb-1">
                    {col.subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium leading-tight">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Editorial Description & Link */}
              <div className="px-1">
                <p className="text-xs sm:text-sm text-surface-body dark:text-dark-subtle font-light leading-relaxed mb-4">
                  {col.tagline}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-brand-primary dark:text-brand-primary-light pt-3 border-t border-surface-border/40 dark:border-dark-border">
                  <span className="text-surface-muted dark:text-dark-muted font-normal flex items-center gap-1.5">
                    {col.itemCount}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                    <span>Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
