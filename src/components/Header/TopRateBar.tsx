import React, { useState } from 'react';
import { GOLD_RATES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { TrendingDown, TrendingUp, Calculator, ChevronDown } from 'lucide-react';

export const TopRateBar: React.FC = () => {
  const { setIsCalculatorOpen, setIsHarvestOpen } = useCart();
  const [selectedRateIndex, setSelectedRateIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRate = GOLD_RATES[selectedRateIndex];

  return (
    <div className="bg-surface-subtle dark:bg-dark-elevated py-1.5 sm:py-2 border-b border-surface-border dark:border-dark-border-subtle text-xs sm:text-sm text-surface-body dark:text-dark-subtle transition-colors duration-300 relative z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-3 sm:gap-x-4">
        {/* Rate Ticker with Interactive Karat Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative">
          <span className="font-medium text-surface-text dark:text-dark-text flex items-center gap-1.5 shrink-0 text-xs">
            <span className="hidden sm:inline-block w-4 h-px bg-brand-primary dark:bg-brand-primary-light" />
            Today&apos;s Rate:
          </span>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 font-bold text-brand-primary dark:text-brand-primary-light bg-surface-cream dark:bg-dark-surface px-2.5 py-1 rounded-full border border-surface-border dark:border-dark-border-subtle hover:border-brand-primary dark:hover:border-brand-primary-light transition cursor-pointer shadow-xs whitespace-nowrap text-xs"
              title="Click to view rates for other carats"
            >
              <span>{activeRate.karat}/1g ₹{activeRate.ratePerGram.toLocaleString('en-IN')}</span>
              {activeRate.isUp ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light shrink-0" />
              )}
              <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 bg-surface-cream dark:bg-dark-card rounded-2xl shadow-xl border border-surface-border dark:border-dark-border-subtle p-2.5 z-50 text-xs">
                  <div className="text-[11px] sm:text-xs font-semibold text-surface-muted dark:text-dark-muted uppercase tracking-wider px-2 py-1 border-b border-surface-border dark:border-dark-border mb-1.5">
                    Live Certified Bullion Rates (1g)
                  </div>
                  <div className="space-y-1">
                    {GOLD_RATES.map((rate, idx) => (
                      <button
                        key={rate.karat}
                        onClick={() => {
                          setSelectedRateIndex(idx);
                          setShowDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition ${
                          selectedRateIndex === idx
                            ? 'bg-brand-primary text-white font-medium shadow-xs'
                            : 'text-surface-text dark:text-dark-text hover:bg-surface-subtle dark:hover:bg-dark-elevated'
                        }`}
                      >
                        <span>{rate.karat}</span>
                        <span className="font-semibold">₹ {rate.ratePerGram.toLocaleString('en-IN')}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-surface-border dark:border-dark-border text-[10px] text-center text-surface-muted">
                    Updated: {activeRate.lastUpdated}
                  </div>
                </div>
              </>
            )}
          </div>

          <span className="hidden md:inline-block text-surface-muted text-xs">
            (8g Sovereign: ₹{activeRate.ratePerSovereign.toLocaleString('en-IN')})
          </span>
        </div>

        {/* Quick Tools: Rate Calculator & Golden Harvest */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="flex items-center gap-1 text-brand-primary dark:text-brand-primary-light hover:underline font-semibold text-xs cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span>Rate Calculator</span>
          </button>

          <span className="text-surface-border dark:text-dark-border-subtle select-none">|</span>

          <button
            onClick={() => setIsHarvestOpen(true)}
            className="flex items-center gap-1 text-brand-primary dark:text-brand-primary-light hover:underline font-semibold text-xs cursor-pointer whitespace-nowrap"
          >
            <span>Golden Harvest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
