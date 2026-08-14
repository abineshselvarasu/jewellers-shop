import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { GOLD_RATES } from '../../data/mockData';
import { X, Calculator, ShieldCheck } from 'lucide-react';

export const RateCalculatorModal: React.FC = () => {
  const { isCalculatorOpen, setIsCalculatorOpen } = useCart();
  const [selectedKarat, setSelectedKarat] = useState<string>('22 KT');
  const [weightInGrams, setWeightInGrams] = useState<number>(8);
  const [wastagePercent, setWastagePercent] = useState<number>(8);
  const gstPercent = 3;

  const currentRateObj = GOLD_RATES.find((r) => r.karat.includes(selectedKarat)) || GOLD_RATES[0];
  const goldBaseValue = weightInGrams * currentRateObj.ratePerGram;
  const makingCharges = (goldBaseValue * wastagePercent) / 100;
  const subtotal = goldBaseValue + makingCharges;
  const gstAmount = (subtotal * gstPercent) / 100;
  const estimatedTotal = Math.round(subtotal + gstAmount);

  return (
    <AnimatePresence>
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsCalculatorOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-surface-border dark:border-dark-border-subtle z-10 text-surface-text dark:text-dark-text max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated text-surface-muted transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-primary dark:text-brand-primary-light">
                  Live Rate Estimator
                </h3>
                <p className="text-xs text-surface-muted dark:text-dark-muted">
                  Estimate total gold cost based on today&apos;s rates
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3.5 mb-4 text-xs">
              {/* Karat */}
              <div>
                <label className="block font-medium mb-1 text-surface-body dark:text-dark-subtle text-xs">
                  Purity
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['22 KT', '24 KT', '18 KT'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSelectedKarat(k)}
                      className={`py-1.5 px-2 rounded-full border text-center font-bold text-xs transition cursor-pointer ${
                        selectedKarat === k
                          ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                          : 'bg-surface-subtle dark:bg-dark-elevated text-surface-text dark:text-dark-text border-surface-border dark:border-dark-border-subtle'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-medium text-surface-body dark:text-dark-subtle">
                    Weight
                  </span>
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {weightInGrams} g ({ (weightInGrams / 8).toFixed(1) } Sov)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={weightInGrams}
                    onChange={(e) => setWeightInGrams(parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer h-1.5"
                  />
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={weightInGrams}
                    onChange={(e) => setWeightInGrams(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 p-1 border border-surface-border dark:border-dark-border-subtle rounded-lg bg-surface-subtle dark:bg-dark-elevated text-center font-bold text-xs"
                  />
                </div>
              </div>

              {/* Making Charges */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-medium text-surface-body dark:text-dark-subtle">
                    Making / Wastage
                  </span>
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">{wastagePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="18"
                  value={wastagePercent}
                  onChange={(e) => setWastagePercent(parseInt(e.target.value))}
                  className="w-full accent-brand-primary cursor-pointer h-1.5"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface-subtle dark:bg-dark-elevated rounded-xl p-3.5 border border-surface-border dark:border-dark-border-subtle space-y-1.5 text-xs mb-4">
              <div className="flex justify-between text-surface-muted dark:text-dark-muted text-xs">
                <span>Rate ({selectedKarat})</span>
                <span>₹ {currentRateObj.ratePerGram.toLocaleString('en-IN')} / g</span>
              </div>
              <div className="flex justify-between text-surface-body dark:text-dark-subtle">
                <span>Gold Value</span>
                <span>₹ {Math.round(goldBaseValue).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-surface-body dark:text-dark-subtle">
                <span>Making ({wastagePercent}%) + GST (3%)</span>
                <span>₹ {Math.round(makingCharges + gstAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-surface-border dark:border-dark-border flex justify-between items-center font-bold">
                <span className="text-xs">Estimated Total</span>
                <span className="text-base text-brand-primary dark:text-brand-primary-light">
                  ₹ {estimatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-surface-muted dark:text-dark-muted mb-4 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Transparent billing with 100% hallmarked gold guarantee.</span>
            </div>

            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 px-4 rounded-full font-semibold transition cursor-pointer shadow-sm text-xs uppercase tracking-wider"
            >
              Close Estimator
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
