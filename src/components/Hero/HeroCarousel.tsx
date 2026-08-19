import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Crown,
  Award,
  TrendingUp,
  Gem
} from 'lucide-react';

interface HeroSlide {
  id: string;
  tag: string;
  cardBadge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  highlights: string[];
  primaryCtaText: string;
  primaryAction: () => void;
  secondaryCtaText: string;
  secondaryAction: () => void;
  bgImage: string;
  fallbackType: 'gold' | 'bridal' | 'men' | 'silver' | 'bullion' | 'earrings' | 'necklace';
  floatingBadge: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  };
  accentColor: string;
  themeClass: string;
}

export const HeroCarousel: React.FC = () => {
  const { setIsCustomizerOpen, setIsHarvestOpen, setIsCalculatorOpen } = useCart();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const scrollToProducts = (category?: string) => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides: HeroSlide[] = [
    {
      id: 'slide-everyday-sparkle',
      tag: 'New Season 2026 • 18KT & 22KT',
      cardBadge: 'BIS 916 Hallmark',
      headingPrefix: 'Lightweight Radiance,',
      headingHighlight: 'Handcrafted Everyday Grace',
      description:
        'Contemporary yellow & rose gold paired with certified solitaire diamonds.',
      highlights: ['BIS 916 & IGI Certified', 'Starting ₹12,499', 'Insured Express Delivery'],
      primaryCtaText: 'Explore Fine Jewelry',
      primaryAction: () => scrollToProducts('gold'),
      secondaryCtaText: 'Bespoke Atelier',
      secondaryAction: () => setIsCustomizerOpen(true),
      bgImage:
        './images/Hero Banner 2 - Everyday Sparkle.jpeg',
      fallbackType: 'gold',
      floatingBadge: {
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        title: '100% BIS 916 HUID',
        subtitle: 'Government Hallmarked'
      },
      accentColor: '#ffb2bc',
      themeClass: 'text-brand-primary-light'
    },
    {
      id: 'slide-bridal-heritage',
      tag: 'Tamil Nadu Heritage Vault',
      cardBadge: 'Heritage Nakshi',
      headingPrefix: 'Regal Temple Heirlooms,',
      headingHighlight: 'Crafted For Milestone Beginnings',
      description:
        'Antique Chettinad nakshi haars, uncut Burmese rubies, and handcrafted bridal chokers.',
      highlights: ['Master Nakshi Carving', 'Zero Exchange Deduction', 'Bridal Suite Service'],
      primaryCtaText: 'Explore Bridal Vault',
      primaryAction: () => scrollToProducts('bridal'),
      secondaryCtaText: 'Golden Harvest Plan',
      secondaryAction: () => setIsHarvestOpen(true),
      bgImage:
        './images/Hero Banner 1 - Royal Heritage.jpeg',
      fallbackType: 'bridal',
      floatingBadge: {
        icon: <Crown className="w-4 h-4 text-amber-400" />,
        title: 'Master Nakshi Art',
        subtitle: 'Authentic South Indian Gold'
      },
      accentColor: '#ffa0ac',
      themeClass: 'text-brand-primary-light'
    },
    {
      id: 'slide-diamond-solitaires',
      tag: 'Natural Solitaires • IGI Certified',
      cardBadge: 'Triple Ex Cut',
      headingPrefix: 'Celestial Brilliance,',
      headingHighlight: 'Timeless Natural Solitaires',
      description:
        'Conflict-free natural diamonds hand-picked for exceptional fire and symmetry.',
      highlights: ['Triple Excellent Cut', 'Laser Inscribed ID', 'Lifetime Upgrade'],
      primaryCtaText: 'Explore Diamonds',
      primaryAction: () => scrollToProducts('gold'),
      secondaryCtaText: 'Book Private Viewing',
      secondaryAction: () => setIsCustomizerOpen(true),
      bgImage:
        './images/Hero Banner 3 - Modern Solitaires .jpeg',
      fallbackType: 'silver',
      floatingBadge: {
        icon: <Award className="w-4 h-4 text-amber-300" />,
        title: 'IGI Certified Solitaires',
        subtitle: 'Conflict-Free Diamonds'
      },
      accentColor: '#e4b5ec',
      themeClass: 'text-brand-primary-light'
    },
    {
      id: 'slide-golden-harvest',
      tag: 'Monthly Savings • Zero Wastage',
      cardBadge: '100% VA Waiver',
      headingPrefix: 'Save In Pure Gold,',
      headingHighlight: '100% Making Charge Bonus',
      description:
        'Accumulate gold monthly at live rates with full protection against price fluctuations.',
      highlights: ['Installments from ₹2,000', '100% Making Bonus', 'Instant Activation'],
      primaryCtaText: 'Join Golden Harvest',
      primaryAction: () => setIsHarvestOpen(true),
      secondaryCtaText: 'Rate Calculator',
      secondaryAction: () => setIsCalculatorOpen(true),
      bgImage:
        './images/Gold Bullion Coin & Coins.jpeg',
      fallbackType: 'bullion',
      floatingBadge: {
        icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
        title: 'Max Returns Bonus',
        subtitle: '11-Month Gold Scheme'
      },
      accentColor: '#fad285',
      themeClass: 'text-amber-300'
    },
    {
      id: 'slide-mens-silver',
      tag: 'Men & 925 Italian Silver',
      cardBadge: '925 Italian Cut',
      headingPrefix: 'Bold Signatures,',
      headingHighlight: 'Refined Strength & Sophistication',
      description:
        'Signet rings, solid 22KT gold chains, and anti-tarnish 925 Sterling Silver solitaires.',
      highlights: ['Brushed Satin Finish', 'Anti-Tarnish 925', 'Digital Karat Test'],
      primaryCtaText: 'Shop Men & Silver',
      primaryAction: () => scrollToProducts('men'),
      secondaryCtaText: 'Live Bullion Rates',
      secondaryAction: () => setIsCalculatorOpen(true),
      bgImage:
        "./images/Hero Banner 4 - Men's Luxury.jpeg",
      fallbackType: 'men',
      floatingBadge: {
        icon: <Gem className="w-4 h-4 text-slate-200" />,
        title: '925 Sterling Silver',
        subtitle: 'Precision Hand-Finished'
      },
      accentColor: '#d3b4e4',
      themeClass: 'text-brand-primary-light'
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  // Drag / swipe handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStartX.current;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }

    isDragging.current = false;
    dragStartX.current = null;
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div
      id="hero-section"
      className="relative overflow-hidden transition-colors duration-700 select-none border-b border-surface-border/40 dark:border-dark-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Bleed Background Image Carousel Stage */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden">
        
        {/* Background Slide Image with Crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.headingPrefix}
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, currentSlide.fallbackType)}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light & Clean Gradient Overlays for Maximum Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Main Hero Content - Safe Gutters to Prevent Control Overlaps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-14 md:px-20 lg:px-24 w-full relative z-20 py-10 sm:py-16 md:py-20">
          <div className="max-w-2xl text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tag / Kicker with Gold Accent */}
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-200 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-4">
                  <span className="w-4 sm:w-5 h-px bg-amber-300" />
                  <span>{currentSlide.tag}</span>
                </div>

                {/* Main Heading - Responsive Device Typography */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2 sm:mb-4 leading-[1.12] font-medium tracking-tight drop-shadow-lg">
                  {currentSlide.headingPrefix} <br />
                  <span className={`italic font-normal ${currentSlide.themeClass}`}>
                    {currentSlide.headingHighlight}
                  </span>
                </h1>

                {/* Short Subtitle */}
                <p className="text-white/90 mb-4 sm:mb-6 max-w-lg font-light text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-md">
                  {currentSlide.description}
                </p>

                {/* Minimal CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={currentSlide.primaryAction}
                    className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-2.5 px-5 sm:py-3.5 sm:px-8 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-2xl flex items-center gap-2 cursor-pointer text-xs sm:text-sm tracking-wider uppercase shadow-xl border border-brand-primary/30"
                  >
                    <span>{currentSlide.primaryCtaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={currentSlide.secondaryAction}
                    className="bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-dark-bg font-semibold py-2.5 px-5 sm:py-3.5 sm:px-7 rounded-full border border-white/50 hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer text-xs sm:text-sm tracking-wider uppercase shadow-lg"
                  >
                    <span>{currentSlide.secondaryCtaText}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Previous Navigation Arrow (Visible on Tablet & Desktop outside text gutter) */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-13 lg:h-13 bg-black/40 hover:bg-brand-primary text-white rounded-full items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Navigation Arrow (Visible on Tablet & Desktop outside text gutter) */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-13 lg:h-13 bg-black/40 hover:bg-brand-primary text-white rounded-full items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Control Bar with Previous/Next controls on Mobile & Slide Progress Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center items-center gap-3 px-4">
          {/* Mobile Previous Button */}
          <button
            onClick={prevSlide}
            className="md:hidden w-9 h-9 bg-black/50 hover:bg-brand-primary text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-3 bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10">
            {slides.map((slide, index) => {
              const isActive = currentSlideIndex === index;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="group relative flex flex-col items-center py-1 px-1 cursor-pointer"
                >
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'w-8 sm:w-16 bg-white/30'
                        : 'w-3 sm:w-5 bg-white/20 group-hover:w-6 group-hover:bg-white/40'
                    }`}
                  >
                    {isActive && (
                      <div
                        className="h-full bg-amber-400 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={nextSlide}
            className="md:hidden w-9 h-9 bg-black/50 hover:bg-brand-primary text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
