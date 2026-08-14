import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import { Search, X } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  const results = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.purity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  const trendingTags = ['Gold Rings', 'Drop Earrings', 'Bridal Haar', 'Gold Chains', '925 Silver', 'Solitaire'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsSearchOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-border dark:border-dark-border-subtle z-10 text-surface-text dark:text-dark-text max-h-[85vh] flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center mb-4">
              <Search className="w-5 h-5 absolute left-4 text-brand-primary dark:text-brand-primary-light" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search gold jewelry, rings, bridal sets, solitaires..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-full bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary text-surface-text dark:text-dark-text shadow-xs"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 w-7 h-7 rounded-full flex items-center justify-center text-surface-muted hover:text-surface-text hover:bg-surface-subtle dark:hover:bg-dark-surface transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 w-7 h-7 rounded-full flex items-center justify-center text-surface-muted hover:text-surface-text hover:bg-surface-subtle dark:hover:bg-dark-surface transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Trending Tags if no search term */}
            {!searchTerm && (
              <div className="py-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-surface-muted mb-3">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-4 py-2 rounded-full bg-surface-subtle dark:bg-dark-elevated hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary-light dark:hover:text-dark-surface text-xs font-medium text-surface-body dark:text-dark-subtle transition-all duration-200 cursor-pointer border border-surface-border dark:border-dark-border-subtle hover:border-brand-primary shadow-xs active:scale-95"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {searchTerm && (
              <div className="overflow-y-auto space-y-2 max-h-[60vh] pr-1 py-2">
                <p className="text-xs text-surface-muted mb-2 px-1">
                  Found {results.length} item{results.length === 1 ? '' : 's'}
                </p>
                {results.length > 0 ? (
                  results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-subtle dark:bg-dark-card hover:bg-surface-border/40 dark:hover:bg-dark-elevated border border-surface-border dark:border-dark-border cursor-pointer transition-all duration-200 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, product.category === 'bridal' ? 'bridal' : product.category === 'men' ? 'men' : product.category === 'silver' ? 'silver' : 'gold')}
                          className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                        />
                        <div>
                          <h5 className="font-serif font-bold text-xs sm:text-sm text-surface-text dark:text-dark-text">
                            {product.name}
                          </h5>
                          <p className="text-xs text-surface-muted">
                            {product.purity} • {product.weight}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xs sm:text-sm text-brand-primary dark:text-brand-primary-light">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-emerald-600 font-semibold">BIS 916</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-surface-muted text-xs">
                    No matching creations found for &ldquo;{searchTerm}&rdquo;. Try another term.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};