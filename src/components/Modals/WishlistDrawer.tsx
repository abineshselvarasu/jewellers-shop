import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((prod) => {
      addToCart(prod, 1);
    });
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsWishlistOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-surface-cream dark:bg-dark-surface text-surface-text dark:text-dark-text shadow-2xl p-6 flex flex-col justify-between z-50 border-l border-surface-border dark:border-dark-border-subtle"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-border dark:border-dark-border">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-primary dark:text-brand-primary-light fill-current" />
                <h3 className="font-serif text-lg font-bold">
                  My Curated Wishlist ({wishlist.length})
                </h3>
              </div>
              <button aria-label="Close wishlist"
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition cursor-pointer"
              >
                <X className="w-5 h-5 text-surface-muted" />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="my-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-surface-subtle dark:bg-dark-elevated flex items-center justify-center mx-auto mb-4 text-surface-muted">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <p className="font-serif text-lg font-bold mb-1">Your wishlist is empty</p>
                <p className="text-xs text-surface-muted mb-6">
                  Save your favorite gold & diamond pieces to review them anytime.
                </p>
                <button aria-label="Close wishlist"
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-8 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] uppercase tracking-wider"
                >
                  Discover Catalog
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-4">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-3 bg-surface-cream dark:bg-dark-surface p-3.5 rounded-2xl border border-surface-border dark:border-dark-border items-center shadow-xs"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, product.category === 'bridal' ? 'bridal' : product.category === 'men' ? 'men' : product.category === 'silver' ? 'silver' : 'gold')}
                        className="w-16 h-16 rounded-xl object-cover bg-surface-subtle dark:bg-dark-elevated border border-surface-border/60 shrink-0 cursor-pointer"
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h5
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setQuickViewProduct(product);
                          }}
                          className="font-serif text-xs font-bold truncate cursor-pointer hover:text-brand-primary dark:hover:text-brand-primary-light"
                        >
                          {product.name}
                        </h5>
                        <p className="text-xs text-surface-muted">
                          {product.purity} • {product.weight}
                        </p>
                        <p className="font-bold text-xs text-brand-primary dark:text-brand-primary-light mt-1">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary-hover transition text-xs cursor-pointer shadow-xs active:scale-95"
                          title="Add to Shopping Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-surface-muted hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer active:scale-95"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-surface-border dark:border-dark-border space-y-2">
                  <button
                    onClick={handleMoveAllToBag}
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-6 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md active:scale-[0.98] border border-brand-primary/20"
                  >
                    <span>Move All to Shopping Bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
