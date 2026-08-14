import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTAGRAM_POSTS } from '../../data/mockData';
import { InstagramPost } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import { Heart, MessageCircle, Instagram, X, ExternalLink } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 text-center relative overflow-hidden transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2.5 text-brand-primary dark:text-brand-primary-light mb-3">
          <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
          <Instagram className="w-4 h-4" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold">
            Social Journal
          </span>
          <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-surface-text dark:text-dark-text mb-8 font-medium tracking-tight">
          Moments in Hallmark Gold
        </h2>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="aspect-square bg-surface-subtle dark:bg-dark-card rounded-xl overflow-hidden relative group cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={post.image}
                alt="Instagram jewelry post"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'gold')}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-surface-body dark:text-dark-subtle text-sm sm:text-base font-light">
          Shop your favorite styles and client testimonials on instagram{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-brand-primary dark:text-brand-primary-light font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>@gradiolex_jewellers</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>

      {/* Instagram Post Detail Modal with Motion */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-surface-border dark:border-dark-border-subtle flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="md:w-1/2 aspect-square md:aspect-auto bg-surface-subtle dark:bg-dark-card">
                <img
                  src={selectedPost.image}
                  alt="Instagram post"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'gold')}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 pb-4 border-b border-surface-border dark:border-dark-border mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                      GX
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-surface-text dark:text-dark-text">
                        gradiolex_jewellers
                      </h4>
                      <p className="text-[10px] text-surface-muted">Coimbatore • Verified Jeweller</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-surface-body dark:text-dark-subtle leading-relaxed mb-4">
                    {selectedPost.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-surface-subtle dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light px-2 py-0.5 rounded font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border dark:border-dark-border flex items-center justify-between text-xs text-surface-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-bold text-brand-primary dark:text-brand-primary-light">
                      <Heart className="w-4 h-4 fill-current" /> {selectedPost.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {selectedPost.comments}
                    </span>
                  </div>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-brand-primary dark:text-brand-primary-light hover:underline"
                  >
                    View on Instagram →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};