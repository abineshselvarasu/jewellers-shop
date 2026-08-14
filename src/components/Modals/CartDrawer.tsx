import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    addToast
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'WELCOMEGRADIOLEX' || clean === 'WELCOMEKANDAVEL') {
      const disc = Math.round(cartTotal * 0.05);
      setDiscountAmount(disc);
      setAppliedCoupon(clean);
      addToast('Promo code WELCOMEGRADIOLEX applied! 5% luxury savings.', 'gold');
    } else if (clean === 'GOLD1000') {
      setDiscountAmount(1000);
      setAppliedCoupon(clean);
      addToast('Promo code GOLD1000 applied! ₹1,000 flat discount.', 'gold');
    } else {
      addToast('Invalid voucher code. Try "WELCOMEGRADIOLEX"', 'info');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
      addToast('Order confirmed! An invoice and tracking link have been dispatched.', 'gold');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => {
              setIsCartOpen(false);
              setOrderComplete(false);
            }}
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
                <ShoppingBag className="w-5 h-5 text-brand-primary dark:text-brand-primary-light" />
                <h3 className="font-serif text-lg font-bold">
                  Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setOrderComplete(false);
                }}
                className="p-1 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition cursor-pointer"
              >
                <X className="w-5 h-5 text-surface-muted" />
              </button>
            </div>

            {orderComplete ? (
              <div className="my-auto text-center py-8 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-brand-primary dark:text-brand-primary-light mb-2">
                  Order Placed Successfully!
                </h4>
                <p className="text-xs text-surface-body dark:text-dark-subtle max-w-xs mx-auto mb-6">
                  Order <strong>#SKJ-{(Math.random() * 100000).toFixed(0)}</strong> is being packed in our tamper-proof insured velvet vault packaging. Our concierge will contact you for dispatch confirmation.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setOrderComplete(false);
                  }}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="my-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-surface-subtle dark:bg-dark-elevated flex items-center justify-center mx-auto mb-4 text-surface-muted">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <p className="font-serif text-lg font-bold mb-1">Your bag is currently empty</p>
                <p className="text-xs text-surface-muted mb-6">
                  Explore our handcrafted gold & diamond collections to find your perfect piece.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-8 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] uppercase tracking-wider"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <>
                {/* Free Insured Shipping Progress Bar */}
                <div className="bg-surface-subtle dark:bg-dark-elevated p-3.5 rounded-2xl my-3 text-xs border border-surface-border dark:border-dark-border-subtle shadow-xs">
                  <div className="flex items-center justify-between mb-1.5 font-semibold text-brand-primary dark:text-brand-primary-light">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Free 100% Insured Delivery
                    </span>
                    <span>Unlocked ✓</span>
                  </div>
                  <div className="w-full bg-surface-border dark:bg-dark-border h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full w-full"></div>
                  </div>
                </div>

                {/* Cart Items Scroll Area */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-surface-cream dark:bg-dark-surface p-3.5 rounded-2xl border border-surface-border dark:border-dark-border items-center shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, item.product.category === 'bridal' ? 'bridal' : item.product.category === 'men' ? 'men' : item.product.category === 'silver' ? 'silver' : 'gold')}
                        className="w-16 h-16 rounded-xl object-cover bg-surface-subtle dark:bg-dark-elevated border border-surface-border/60 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-xs font-bold truncate text-surface-text dark:text-dark-text">
                          {item.product.name}
                        </h5>
                        <p className="text-xs text-surface-muted dark:text-dark-muted">
                          {item.selectedSize} • {item.product.purity}
                        </p>
                        <p className="font-bold text-xs text-brand-primary dark:text-brand-primary-light mt-1">
                          ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-surface-border dark:border-dark-border-subtle rounded-full bg-surface-subtle dark:bg-dark-elevated text-xs px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-border transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-border transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-surface-muted hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-3 border-t border-surface-border dark:border-dark-border">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-muted" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. WELCOMEGRADIOLEX)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle uppercase focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-primary hover:bg-brand-primary-hover text-white px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedCoupon && (
                    <div className="text-xs text-emerald-600 flex items-center justify-between mb-2 px-1">
                      <span>Coupon &ldquo;{appliedCoupon}&rdquo; active</span>
                      <span className="font-semibold">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Bill Details */}
                  <div className="space-y-1 text-xs py-2">
                    <div className="flex justify-between text-surface-muted">
                      <span>Subtotal:</span>
                      <span>₹ {cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount:</span>
                        <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-surface-muted">
                      <span>Insured Delivery:</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm pt-2 border-t border-surface-border dark:border-dark-border">
                      <span>Total Amount:</span>
                      <span className="text-brand-primary dark:text-brand-primary-light">
                        ₹ {finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleSimulateCheckout}
                    disabled={isCheckingOut}
                    className="w-full mt-2 bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-6 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md active:scale-[0.98] border border-brand-primary/20"
                  >
                    {isCheckingOut ? (
                      <span>Processing Secure Payment...</span>
                    ) : (
                      <>
                        <span>Proceed to Secure Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
