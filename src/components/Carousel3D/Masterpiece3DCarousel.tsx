import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { handleImageError } from '../../utils/imageFallback';
import { useCart } from '../../context/CartContext';
import {
  Sparkles,
  Crown,
  ArrowUpRight,
  Clock
} from 'lucide-react';

interface AtelierDetailedSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  specs: {
    purity: string;
    craftHours: string;
    technique: string;
    origin: string;
    gemstones: string;
  };
  quote: string;
  artisan: string;
  highlights: string[];
}

const ATELIER_EXPANDED_DATA: AtelierDetailedSlide[] = [
  {
    id: 'slide-1',
    title: 'The Royal Nizam Emerald Choker',
    subtitle: 'Heirloom Masterpiece in 22KT Gold',
    category: 'Bridal Heirloom',
    image: './images/jewelry_cd49356ba6a0.jpg',
    specs: {
      purity: '22KT Pure Hallmark (BIS 916)',
      craftHours: '160+ Goldsmith Hours',
      technique: 'Chettinad Nakshi & Closed Setting',
      origin: 'Coimbatore Heritage Workshop',
      gemstones: 'Zambian Uncut Emeralds & South Sea Pearls'
    },
    quote: 'Every leaf motif is sculpted under micro-magnification to ensure royal weight distribution and supple neckline comfort.',
    artisan: 'Master Sadasivam — 38 Years of Goldsmithing',
    highlights: [
      'Antique 22KT matte gold patina',
      'Non-collapsing interlocking hinge clasp',
      'Certified authentic natural gemstones'
    ]
  },
  {
    id: 'slide-2',
    title: 'Peacock Blossom Nakshi Haar',
    subtitle: 'Intricate Nakshi Carving & Uncut Polki',
    category: 'Temple Vault',
    image: './images/jewelry_39088cb4d238.jpg',
    specs: {
      purity: '22KT Solid Yellow Gold',
      craftHours: '210+ Goldsmith Hours',
      technique: 'Repoussé & Chasing Technique',
      origin: 'Ram Nagar Atelier, Coimbatore',
      gemstones: 'Natural Uncut Burmese Rubies'
    },
    quote: 'The Peacock Haar represents the pinnacle of Tamil Nadu temple ornamentation, balancing deep red rubies with intricate floral arabesques.',
    artisan: 'Master Shanmugam — Master Nakshi Sculptor',
    highlights: [
      'Traditional hand-beaten gold repoussé',
      'Zero synthetic fillers or lead core',
      'Includes custom velvet heirloom vault case'
    ]
  },
  {
    id: 'slide-3',
    title: 'Solitaire Eternal Bloom Ring',
    subtitle: 'Certified VVS1 Triple Excellent Diamond',
    category: 'Natural Diamond Atelier',
    image: './images/jewelry_2f1376c3de70.jpg',
    specs: {
      purity: '18KT Platinum & Rose Gold Duo',
      craftHours: '75+ Setting Hours',
      technique: 'Laser Micro-Prong Pave',
      origin: 'Diamond Precision Studio',
      gemstones: '1.50ct VVS1 Colorless Solitaire (IGI)'
    },
    quote: 'Positioned to maximize 360-degree light refraction. The lotus gallery elevates the solitaire into floating radiance.',
    artisan: 'Elena Fernandez — Diamond Master Setter',
    highlights: [
      'IGI & GIA dual-inscribed girdle',
      'Laser-welded comfort curve shank',
      '100% Lifetime Diamond Buyback'
    ]
  },
  {
    id: 'slide-4',
    title: 'Gajalakshmi Temple Kada Suite',
    subtitle: 'Antique Red Patina Solid Gold Bangle',
    category: 'Heirloom Bangle',
    image: './images/jewelry_39088cb4d238.jpg',
    specs: {
      purity: '22KT High-Density Gold (BIS 916)',
      craftHours: '120+ Goldsmith Hours',
      technique: 'Deep Die-Cast & Hand Engraving',
      origin: 'Cross Cut Road Flagship Boutique',
      gemstones: 'Cabochon Cut Pink Tourmaline'
    },
    quote: 'Carrying the divine blessings of Sri Gajalakshmi, this solid kada is cast with substantial heft that can be passed down generations.',
    artisan: 'Master Muruganathan — Coimbatore Atelier',
    highlights: [
      'Reinforced double-safety hinge lock',
      'Solid non-hollow gold architecture',
      'Hand-applied auspicious temple patina'
    ]
  },
  {
    id: 'slide-5',
    title: 'Aurelian Lotus Royal Pendant',
    subtitle: 'Bespoke Rose & Yellow Gold Duo',
    category: 'Bespoke Creation',
    image: './images/jewelry_6faa4af059aa.jpg',
    specs: {
      purity: '18KT Two-Tone Gold',
      craftHours: '90+ Goldsmith Hours',
      technique: 'Multi-Tiered Floral CAD & Hand Polish',
      origin: 'Customizer Design Lab',
      gemstones: 'Round Brilliant Micro-Diamonds'
    },
    quote: 'A kinetic three-layer pendant where outer lotus petals gently cradle an inner diamond solitaire that sways with every step.',
    artisan: 'Anand Ramasamy — Lead CAD Sculptor',
    highlights: [
      'Modular pendant ring conversion',
      'High-gloss mirror finish inner core',
      'Custom engraved personal inscription'
    ]
  }
];

export const Masterpiece3DCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { setIsCustomizerOpen, setIsCalculatorOpen } = useCart();
  const current = ATELIER_EXPANDED_DATA[activeTab];

  return (
    <section id="atelier-spotlight" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-surface-cream dark:bg-dark-bg transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-primary/5 dark:bg-brand-primary-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-brand-primary dark:text-brand-primary-light font-semibold mb-2">
              <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
              <span>Coimbatore Goldsmith Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-surface-text dark:text-dark-text font-medium tracking-tight">
              Atelier Masterpiece Showcase
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-surface-muted dark:text-dark-muted">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{activeTab + 1} of {ATELIER_EXPANDED_DATA.length} Archival Creations</span>
          </div>
        </div>

        {/* Visual Hero Stage & Thumbnail Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large Visual Stage (Image First) */}
          <div className="lg:col-span-8 relative min-h-[420px] sm:min-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-surface-border/70 dark:border-dark-border-subtle shadow-xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'bridal')}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-medium">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>{current.category}</span>
                  </div>
                  <div className="bg-amber-400/90 text-surface-text font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
                    {current.specs.purity}
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                      {current.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-md">
                      {current.title}
                    </h3>
                  </div>

                  {/* Minimal Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 font-medium pt-1">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-lg border border-white/20 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      {current.specs.craftHours}
                    </span>
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-lg border border-white/20">
                      {current.specs.technique}
                    </span>
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-lg border border-white/20 hidden sm:inline-block">
                      {current.specs.origin}
                    </span>
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setIsCustomizerOpen(true)}
                      className="bg-brand-primary hover:bg-brand-primary-hover text-white py-3 px-6 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer active:scale-[0.98] border border-amber-300/30"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Commission Bespoke 3D Studio</span>
                    </button>
                    <button
                      onClick={() => setIsCalculatorOpen(true)}
                      className="px-5 py-3 border border-white/30 bg-black/40 hover:bg-white hover:text-surface-text text-white rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                    >
                      <span>Rate Estimate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Thumbnail Cards Grid */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div className="text-xs uppercase font-semibold tracking-wider text-surface-muted dark:text-dark-muted mb-1">
              Select Archival Masterpiece
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {ATELIER_EXPANDED_DATA.map((item, index) => {
                const isSelected = activeTab === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative rounded-xl overflow-hidden text-left transition-all duration-300 cursor-pointer group border flex items-center p-2.5 gap-3 ${
                      isSelected
                        ? 'ring-2 ring-brand-primary dark:ring-brand-primary-light bg-surface-cream dark:bg-dark-card border-brand-primary/40 dark:border-brand-primary-light/40 shadow-md'
                        : 'bg-surface-subtle/70 dark:bg-dark-card/60 hover:bg-surface-subtle dark:hover:bg-dark-elevated border-surface-border/60 dark:border-dark-border'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 relative bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-primary/20 border-2 border-amber-400" />
                      )}
                    </div>

                    {/* Minimal Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-primary dark:text-brand-primary-light block truncate">
                        {item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-semibold text-surface-text dark:text-dark-text truncate mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-surface-muted dark:text-dark-muted truncate mt-0.5 font-light">
                        {item.specs.craftHours}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
