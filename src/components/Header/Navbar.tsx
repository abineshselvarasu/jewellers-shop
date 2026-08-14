import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { BrandLogo } from '../Common/BrandLogo';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Phone,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen, setIsCustomizerOpen, setIsHarvestOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <header
        className={`bg-surface-cream dark:bg-dark-surface text-surface-text dark:text-dark-text py-3.5 sticky top-0 z-40 transition-all duration-300 border-b border-surface-border dark:border-dark-border-subtle ${
          isScrolled ? 'shadow-md backdrop-blur-md bg-opacity-95 dark:bg-opacity-95' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-surface-subtle dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all duration-200 cursor-pointer border border-brand-primary/25 dark:border-brand-primary-light/25 shadow-xs active:scale-95 shrink-0 flex items-center justify-center"
              aria-label="Toggle navigation menu"
              title="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'hero-section')}
              className="group cursor-pointer"
            >
              <BrandLogo size="md" hideTextOnMobile />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium tracking-wide">
            <a
              href="#products-section"
              onClick={(e) => handleNavClick(e, 'products-section')}
              className="text-brand-primary dark:text-brand-primary-light hover:opacity-80 transition relative py-1 font-semibold"
            >
              Gold
            </a>
            <a
              href="#collections-section"
              onClick={(e) => handleNavClick(e, 'collections-section')}
              className="text-brand-primary dark:text-brand-primary-light hover:opacity-80 transition relative py-1 font-semibold"
            >
              Silver
            </a>
            <a
              href="#for-him-section"
              onClick={(e) => handleNavClick(e, 'for-him-section')}
              className="text-brand-primary dark:text-brand-primary-light hover:opacity-80 transition relative py-1 font-semibold"
            >
              Gifts & Gold coins
            </a>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-brand-primary dark:text-brand-primary-light hover:opacity-80 transition flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Bespoke Atelier</span>
            </button>
            <button
              onClick={() => setIsHarvestOpen(true)}
              className="text-brand-primary dark:text-brand-primary-light hover:opacity-80 transition relative py-1 font-semibold cursor-pointer"
            >
              Golden Harvest Scheme
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 text-brand-primary dark:text-brand-primary-light">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition transform hover:scale-110 duration-200 cursor-pointer"
              aria-label="Search jewelry collections"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition transform hover:scale-110 duration-200 cursor-pointer text-brand-primary dark:text-amber-300"
              aria-label="Toggle dark mode"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition transform hover:scale-110 duration-200 relative cursor-pointer"
              aria-label="View Wishlist"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated transition transform hover:scale-110 duration-200 relative cursor-pointer"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-surface-cream dark:bg-dark-card text-surface-text dark:text-dark-text shadow-2xl p-6 flex flex-col justify-between z-50 overflow-y-auto border-r border-surface-border dark:border-dark-border">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border dark:border-dark-border">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-subtle dark:hover:bg-dark-elevated text-surface-muted hover:text-surface-text transition cursor-pointer"
                  aria-label="Close mobile navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-4">
                <a
                  href="#products-section"
                  onClick={(e) => handleNavClick(e, 'products-section')}
                  className="flex items-center justify-between text-base font-serif font-medium py-2 border-b border-surface-subtle dark:border-dark-elevated text-brand-primary dark:text-brand-primary-light"
                >
                  <span>Gold Collections</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
                <a
                  href="#collections-section"
                  onClick={(e) => handleNavClick(e, 'collections-section')}
                  className="flex items-center justify-between text-base font-serif font-medium py-2 border-b border-surface-subtle dark:border-dark-elevated text-brand-primary dark:text-brand-primary-light"
                >
                  <span>Silver & Bridal Vault</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
                <a
                  href="#for-him-section"
                  onClick={(e) => handleNavClick(e, 'for-him-section')}
                  className="flex items-center justify-between text-base font-serif font-medium py-2 border-b border-surface-subtle dark:border-dark-elevated text-brand-primary dark:text-brand-primary-light"
                >
                  <span>Gifts & Gold Coins</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCustomizerOpen(true);
                  }}
                  className="w-full flex items-center justify-between text-base font-serif font-medium py-2 border-b border-surface-subtle dark:border-dark-elevated text-amber-700 dark:text-amber-300"
                >
                  <span>Bespoke Atelier</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsHarvestOpen(true);
                  }}
                  className="w-full flex items-center justify-between text-base font-serif font-medium py-2 border-b border-surface-subtle dark:border-dark-elevated text-brand-primary dark:text-brand-primary-light"
                >
                  <span>Golden Harvest Scheme</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Info */}
            <div className="pt-6 border-t border-surface-border dark:border-dark-border text-xs text-surface-muted dark:text-dark-muted space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light" />
                <span>Customer Care: +44 20 7946 0912</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary-light" />
                <span>Flagship: Mayfair, London</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
