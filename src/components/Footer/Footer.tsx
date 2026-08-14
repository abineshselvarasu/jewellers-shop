import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BrandLogo } from '../Common/BrandLogo';
import {
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  ShieldCheck,
  Award,
  Gem,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsCalculatorOpen, setIsCustomizerOpen, setIsHarvestOpen, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addToast('Thank you for subscribing! Your 5% coupon code is WELCOMEGRADIOLEX', 'gold');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-subtle dark:bg-dark-surface text-surface-text dark:text-dark-text pt-10 pb-8 border-t border-surface-border dark:border-dark-border-subtle transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8 mb-8 border-b border-surface-border dark:border-dark-border text-center">
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-cream/80 dark:bg-dark-elevated/80 border border-surface-border/60 dark:border-dark-border-subtle">
            <ShieldCheck className="w-5 h-5 text-brand-primary dark:text-brand-primary-light shrink-0" />
            <span className="font-serif font-semibold text-xs text-surface-text dark:text-dark-text">100% BIS 916 Hallmark</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-cream/80 dark:bg-dark-elevated/80 border border-surface-border/60 dark:border-dark-border-subtle">
            <Award className="w-5 h-5 text-brand-primary dark:text-brand-primary-light shrink-0" />
            <span className="font-serif font-semibold text-xs text-surface-text dark:text-dark-text">IGI Certified Diamonds</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-cream/80 dark:bg-dark-elevated/80 border border-surface-border/60 dark:border-dark-border-subtle">
            <Gem className="w-5 h-5 text-brand-primary dark:text-brand-primary-light shrink-0" />
            <span className="font-serif font-semibold text-xs text-surface-text dark:text-dark-text">Lifetime Buyback</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-cream/80 dark:bg-dark-elevated/80 border border-surface-border/60 dark:border-dark-border-subtle">
            <Sparkles className="w-5 h-5 text-brand-primary dark:text-brand-primary-light shrink-0" />
            <span className="font-serif font-semibold text-xs text-surface-text dark:text-dark-text">Free Lifetime Care</span>
          </div>
        </div>

        {/* Streamlined Main Footer Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 mb-8 border-b border-surface-border dark:border-dark-border items-start">
          
          {/* Brand & Social (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <BrandLogo size="md" />

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-cream dark:bg-dark-elevated border border-surface-border dark:border-dark-border flex items-center justify-center text-surface-text dark:text-dark-text hover:text-brand-primary dark:hover:text-brand-primary-light hover:scale-105 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-cream dark:bg-dark-elevated border border-surface-border dark:border-dark-border flex items-center justify-center text-surface-text dark:text-dark-text hover:text-red-500 hover:scale-105 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-cream dark:bg-dark-elevated border border-surface-border dark:border-dark-border flex items-center justify-center text-surface-text dark:text-dark-text hover:text-blue-500 hover:scale-105 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-cream dark:bg-dark-elevated border border-surface-border dark:border-dark-border flex items-center justify-center text-surface-text dark:text-dark-text hover:text-green-500 hover:scale-105 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="font-serif font-bold text-sm text-surface-text dark:text-dark-text mb-3">
              Quick Access
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-surface-body dark:text-dark-subtle">
              <li>
                <button
                  onClick={() => scrollToSection('hero-section')}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products-section')}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left"
                >
                  Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('collections-section')}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left"
                >
                  Bridal Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsHarvestOpen(true)}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left font-medium text-amber-700 dark:text-amber-400"
                >
                  Golden Harvest Scheme
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left"
                >
                  3D Customizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer text-left"
                >
                  Live Gold Rate
                </button>
              </li>
            </ul>
          </div>

          {/* Compact Newsletter Input (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="font-serif font-bold text-sm text-surface-text dark:text-dark-text mb-2">
              Atelier Newsletter
            </h4>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter email for 5% off"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-full bg-surface-cream dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white p-2.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                Coupon: <strong>WELCOMEGRADIOLEX</strong>
              </div>
            )}
          </div>

        </div>

        {/* Minimal Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-muted dark:text-dark-muted">
          <p>© {new Date().getFullYear()} Gradiolex Jewellers. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-primary dark:text-brand-primary-light" />
              <span>Coimbatore • Chennai • London</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
