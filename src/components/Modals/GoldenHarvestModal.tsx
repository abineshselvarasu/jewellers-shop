import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const GoldenHarvestModal: React.FC = () => {
  const { isHarvestOpen, setIsHarvestOpen, addToast } = useCart();
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const totalPaidByCustomer = monthlyAmount * 11;
  const storeBonusContribution = monthlyAmount;
  const maturityValue = totalPaidByCustomer + storeBonusContribution;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast('Please enter your name and phone number.', 'info');
      return;
    }
    setIsSubmitted(true);
    addToast('Golden Harvest Enrollment request registered!', 'gold');
  };

  return (
    <AnimatePresence>
      {isHarvestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsHarvestOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-surface-border dark:border-dark-border-subtle z-10 text-surface-text dark:text-dark-text max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setIsHarvestOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated text-surface-muted transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary dark:text-brand-primary-light">
                      Golden Harvest Scheme
                    </h3>
                    <p className="text-xs text-surface-muted dark:text-dark-muted">
                      Pay for 11 months — Get 12th month 100% FREE
                    </p>
                  </div>
                </div>

                {/* Amount Picker */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-medium text-surface-body dark:text-dark-subtle">
                      Monthly Installment
                    </span>
                    <span className="font-serif font-bold text-brand-primary dark:text-brand-primary-light text-sm">
                      ₹ {monthlyAmount.toLocaleString('en-IN')} / mo
                    </span>
                  </div>

                  <input
                    type="range"
                    min={2000}
                    max={30000}
                    step={1000}
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-border dark:bg-dark-border rounded-lg cursor-pointer accent-brand-primary"
                  />
                </div>

                {/* Compact Plan Summary */}
                <div className="grid grid-cols-3 gap-1.5 bg-surface-subtle dark:bg-dark-elevated p-2.5 rounded-xl border border-surface-border dark:border-dark-border-subtle text-center mb-4 text-xs">
                  <div>
                    <span className="text-[10px] text-surface-muted block">You Pay (11m)</span>
                    <span className="font-bold">₹ {totalPaidByCustomer.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-x border-surface-border dark:border-dark-border">
                    <span className="text-[10px] text-emerald-600 font-bold block">12th Month Free</span>
                    <span className="font-bold text-emerald-600">+ ₹ {storeBonusContribution.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-primary dark:text-brand-primary-light font-bold block">Total Maturity</span>
                    <span className="font-bold text-brand-primary dark:text-brand-primary-light">₹ {maturityValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Quick Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-full bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-full bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 px-4 rounded-full font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-wider uppercase shadow-xs active:scale-[0.98]"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-brand-primary dark:text-brand-primary-light mb-1">
                  Request Registered!
                </h3>
                <p className="text-xs text-surface-body dark:text-dark-subtle mb-4">
                  Thank you, <strong>{name}</strong>. Our advisor will reach out to you on <strong>{phone}</strong> to activate your plan for <strong>₹{monthlyAmount.toLocaleString('en-IN')}/mo</strong>.
                </p>
                <button
                  onClick={() => {
                    setIsHarvestOpen(false);
                    setIsSubmitted(false);
                  }}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
