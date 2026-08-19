import React, { useRef } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const EditorialSplit: React.FC = () => {
  const { addToCart, setIsCartOpen, setQuickViewProduct } = useCart();
  const forHerRef = useRef<HTMLDivElement>(null);
  const forHimRef = useRef<HTMLDivElement>(null);

  const forHerProducts = PRODUCTS.filter(
    (p) => p.category === 'gold' || p.category === 'bridal' || p.subCategory === 'Earrings' || p.subCategory === 'Hoops'
  );

  const forHimProducts = PRODUCTS.filter(
    (p) => p.category === 'men' || p.name.includes('Men') || p.subCategory === 'Chains'
  );

  const scrollHer = (direction: 'left' | 'right') => {
    if (forHerRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      forHerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollHim = (direction: 'left' | 'right') => {
    if (forHimRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      forHimRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBuy = (product: any) => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ================= FOR HER SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Large Visual Feature */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[4/5] bg-surface-subtle dark:bg-dark-card overflow-hidden rounded-2xl relative shadow-xl">
              <img
                src="./images/jewelry_69ee78684cb4.jpg"
                alt="For Her Curated Fine Jewelry"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'earrings')}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-medium mb-1">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Women's Atelier</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3">
                  Grace & Radiance
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  Delicate 18KT & 22KT diamond-studded drop earrings, chokers, and everyday luxury cuffs.
                </p>
                <a
                  href="#products-section"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 border-b border-amber-300 pb-1 hover:text-white hover:border-white transition-colors"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Product Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-primary dark:text-brand-primary-light font-semibold mb-1">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Handcrafted For Her</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-medium text-surface-text dark:text-dark-text">
                  Curated Highlights
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollHer('left')}
                  className="w-9 h-9 rounded-full border border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary-light dark:hover:text-dark-surface transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollHer('right')}
                  className="w-9 h-9 rounded-full border border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary-light dark:hover:text-dark-surface transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={forHerRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x hide-scrollbar scroll-smooth"
            >
              {forHerProducts.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[200px] sm:min-w-[220px] max-w-[220px] flex-shrink-0 snap-start flex flex-col justify-between group/card"
                >
                  <div
                    onClick={() => setQuickViewProduct(item)}
                    className="aspect-square bg-surface-subtle dark:bg-dark-card rounded-2xl overflow-hidden mb-3 relative cursor-pointer shadow-xs group-hover/card:shadow-md transition-all duration-300 flex items-center justify-center p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'gold')}
                      className="w-full h-full object-cover transform group-hover/card:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div>
                    <h5
                      onClick={() => setQuickViewProduct(item)}
                      className="font-serif text-xs sm:text-sm font-medium text-surface-text dark:text-dark-text truncate cursor-pointer hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors mb-1"
                    >
                      {item.name}
                    </h5>
                    <p className="text-xs font-semibold text-brand-primary dark:text-brand-primary-light mb-2.5">
                      ₹ {item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full bg-surface-subtle/90 dark:bg-dark-elevated hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white text-surface-text dark:text-dark-text text-xs font-semibold py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer border border-brand-primary/20 dark:border-brand-primary-light/20 active:scale-[0.98] shadow-xs text-center"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FOR HIM SECTION ================= */}
        <div id="for-him-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Horizontal Product Showcase (Left on Large screens) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-primary dark:text-brand-primary-light font-semibold mb-1">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Handcrafted For Him</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-medium text-surface-text dark:text-dark-text">
                  Men's Fine Signatures
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollHim('left')}
                  className="w-9 h-9 rounded-full border border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary-light dark:hover:text-dark-surface transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollHim('right')}
                  className="w-9 h-9 rounded-full border border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary-light dark:hover:text-dark-surface transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={forHimRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x hide-scrollbar scroll-smooth"
            >
              {forHimProducts.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[200px] sm:min-w-[220px] max-w-[220px] flex-shrink-0 snap-start flex flex-col justify-between group/card"
                >
                  <div
                    onClick={() => setQuickViewProduct(item)}
                    className="aspect-square bg-surface-subtle dark:bg-dark-card rounded-2xl overflow-hidden mb-3 relative cursor-pointer shadow-xs group-hover/card:shadow-md transition-all duration-300 flex items-center justify-center p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'men')}
                      className="w-full h-full object-cover transform group-hover/card:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div>
                    <h5
                      onClick={() => setQuickViewProduct(item)}
                      className="font-serif text-xs sm:text-sm font-medium text-surface-text dark:text-dark-text truncate cursor-pointer hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors mb-1"
                    >
                      {item.name}
                    </h5>
                    <p className="text-xs font-semibold text-brand-primary dark:text-brand-primary-light mb-2.5">
                      ₹ {item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full bg-surface-subtle/90 dark:bg-dark-elevated hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white text-surface-text dark:text-dark-text text-xs font-semibold py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer border border-brand-primary/20 dark:border-brand-primary-light/20 active:scale-[0.98] shadow-xs text-center"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Large Visual Feature (Right on Large screens) */}
          <div className="lg:col-span-5 relative group order-1 lg:order-2">
            <div className="aspect-[4/5] bg-surface-subtle dark:bg-dark-card overflow-hidden rounded-2xl relative shadow-xl">
              <img
                src="./images/jewelry_9403aab1f250.jpg"
                alt="For Him Luxury Chains & Signet Rings"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'men')}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-medium mb-1">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Men's Atelier</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium mb-3">
                  Bold & Refined
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  Substantial 22KT rope chains, diamond signet rings, and textured 925 sterling bracelets.
                </p>
                <a
                  href="#for-him-section"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 border-b border-amber-300 pb-1 hover:text-white hover:border-white transition-colors"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
