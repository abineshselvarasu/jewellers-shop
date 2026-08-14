import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star
} from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard (Size 14)');
  const [selectedImageAngle, setSelectedImageAngle] = useState<'primary' | 'secondary'>('primary');

  const isWish = quickViewProduct ? isInWishlist(quickViewProduct.id) : false;
  const displayImage =
    quickViewProduct
      ? selectedImageAngle === 'secondary' && quickViewProduct.secondaryImage
        ? quickViewProduct.secondaryImage
        : quickViewProduct.image
      : '';

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, quantity, selectedSize);
    }
  };

  const handleBuyNow = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, quantity, selectedSize);
      setQuickViewProduct(null);
      setIsCartOpen(true);
    }
  };

  const sizes = ['Size 12', 'Size 14', 'Size 16', 'Size 18', 'Custom Size'];

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setQuickViewProduct(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-surface-border dark:border-dark-border-subtle z-10 text-surface-text dark:text-dark-text max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated text-surface-muted transition z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Left: Product Images */}
              <div className="flex flex-col gap-3">
                <div className="bg-surface-subtle dark:bg-dark-elevated rounded-xl h-64 sm:h-80 w-full overflow-hidden flex items-center justify-center relative border border-surface-border dark:border-dark-border-subtle shadow-inner">
                  <img
                    src={displayImage}
                    alt={quickViewProduct.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, quickViewProduct.category === 'bridal' ? 'bridal' : quickViewProduct.category === 'men' ? 'men' : quickViewProduct.category === 'silver' ? 'silver' : 'gold')}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  {quickViewProduct.badge && (
                    <div className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {quickViewProduct.badge}
                    </div>
                  )}
                </div>

                {/* Thumbnail switcher if secondary available */}
                {quickViewProduct.secondaryImage && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedImageAngle('primary')}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                        selectedImageAngle === 'primary'
                          ? 'border-brand-primary dark:border-brand-primary-light'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={quickViewProduct.image}
                        alt="Angle 1"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'gold')}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button
                      onClick={() => setSelectedImageAngle('secondary')}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                        selectedImageAngle === 'secondary'
                          ? 'border-brand-primary dark:border-brand-primary-light'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={quickViewProduct.secondaryImage}
                        alt="Angle 2"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'gold')}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Specifications & Buying */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold ml-1 text-surface-text dark:text-dark-text">
                        {quickViewProduct.rating}
                      </span>
                    </div>
                    <span className="text-xs text-surface-muted dark:text-dark-muted">
                      ({quickViewProduct.reviewsCount} verified owner reviews)
                    </span>
                  </div>

                  {/* Category & Accent */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-primary dark:text-brand-primary-light font-semibold mb-1.5">
                    <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                    <span>{quickViewProduct.category.toUpperCase()} • {quickViewProduct.subCategory}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-surface-text dark:text-dark-text mb-2 leading-snug">
                    {quickViewProduct.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-brand-primary dark:text-brand-primary-light font-serif">
                      ₹ {quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-sm text-surface-muted line-through">
                        ₹ {quickViewProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      Inclusive of all Taxes & BIS Hallmarking
                    </span>
                  </div>

                  {/* Specs Table */}
                  <div className="bg-surface-subtle dark:bg-dark-elevated p-3 rounded-lg border border-surface-border dark:border-dark-border-subtle grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <span className="text-surface-muted block">Metal & Purity:</span>
                      <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                        {quickViewProduct.purity}
                      </span>
                    </div>
                    <div>
                      <span className="text-surface-muted block">Net Weight:</span>
                      <span className="font-bold">{quickViewProduct.weight}</span>
                    </div>
                    <div>
                      <span className="text-surface-muted block">Hallmark ID:</span>
                      <span className="font-bold">6-Digit HUID Stamped</span>
                    </div>
                    <div>
                      <span className="text-surface-muted block">Buyback Guarantee:</span>
                      <span className="font-bold text-emerald-600">100% Lifetime</span>
                    </div>
                  </div>

                  <p className="text-xs text-surface-body dark:text-dark-subtle leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>

                  {/* Size Selector for Rings & Necklaces */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span>Select Size:</span>
                      <span className="text-brand-primary dark:text-brand-primary-light">{selectedSize}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                            selectedSize === s
                              ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                              : 'bg-surface-cream dark:bg-dark-surface text-surface-text dark:text-dark-text border-surface-border dark:border-dark-border-subtle hover:border-brand-primary/40'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold">Quantity:</span>
                    <div className="flex items-center border border-surface-border dark:border-dark-border-subtle rounded-full bg-surface-cream dark:bg-dark-surface px-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition cursor-pointer font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition cursor-pointer font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-surface-subtle/80 dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light py-3 px-5 rounded-full font-bold border border-brand-primary/30 dark:border-brand-primary-light/30 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-[0.98] shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white py-3 px-5 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md active:scale-[0.98] border border-brand-primary/20"
                    >
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(quickViewProduct)}
                      className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                        isWish
                          ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-xs'
                          : 'border-surface-border dark:border-dark-border-subtle bg-surface-subtle/50 text-surface-muted hover:text-brand-primary hover:border-brand-primary/30'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Assurances */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-surface-muted text-center pt-3 border-t border-surface-border/60 dark:border-dark-border-subtle">
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light" />
                      <span>Insured Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light" />
                      <span>15-Day Exchange</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light" />
                      <span>Certified 916 BIS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
