import React from 'react';
import { ShieldCheck, Sparkles, Crown, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const WhyChooseSection: React.FC = () => {
  const { setIsCustomizerOpen, setIsHarvestOpen, setIsCalculatorOpen } = useCart();

  const pillars = [
    {
      num: '01',
      icon: <ShieldCheck className="w-4 h-4 text-amber-300" />,
      title: 'BIS 916 Hallmarked Gold',
      subtitle: '100% Govt HUID Traceable',
      image: './images/jewelry_39088cb4d238.jpg',
      actionText: 'Live Gold Rates',
      action: () => setIsCalculatorOpen(true)
    },
    {
      num: '02',
      icon: <Award className="w-4 h-4 text-amber-300" />,
      title: 'Certified IGI Solitaires',
      subtitle: 'Natural Conflict-Free Diamonds',
      image: './images/jewelry_9ae95ee78101.jpg',
      actionText: 'Browse Solitaires',
      action: () => {
        const el = document.getElementById('products-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      num: '03',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      title: 'Bespoke 3D Custom Studio',
      subtitle: 'CAD Renders & Nakshi Casting',
      image: './images/jewelry_69ee78684cb4.jpg',
      actionText: 'Open 3D Studio',
      action: () => setIsCustomizerOpen(true)
    },
    {
      num: '04',
      icon: <Crown className="w-4 h-4 text-amber-300" />,
      title: 'Golden Harvest Scheme',
      subtitle: 'Zero Wastage Gold Exchange',
      image: './images/jewelry_839e207699b7.jpg',
      actionText: 'Harvest Scheme',
      action: () => setIsHarvestOpen(true)
    }
  ];

  return (
    <section id="why-choose-section" className="py-12 sm:py-16 md:py-20 relative overflow-hidden transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Punchy & Visual */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-surface-border/60 dark:border-dark-border">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-primary dark:text-brand-primary-light font-semibold mb-2">
              <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
              <span>The Gradiolex Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-surface-text dark:text-dark-text font-medium tracking-tight">
              Artisan Purity & Certified Excellence
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-surface-body dark:text-dark-subtle max-w-sm font-light">
            Four decades of Coimbatore goldsmithing heritage.
          </p>
        </div>

        {/* Visual Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              onClick={pillar.action}
              className="group cursor-pointer relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-5 bg-black"
            >
              {/* Background Image */}
              <img
                src={pillar.image}
                alt={pillar.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-75 group-hover:opacity-85"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:from-black/80 transition-colors" />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-serif text-lg font-light text-amber-200/80">
                  {pillar.num}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  {pillar.icon}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-medium block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="text-lg font-serif font-medium leading-snug mb-3">
                  {pillar.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 group-hover:text-white transition-colors">
                  <span>{pillar.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Concise Trust Badges Strip */}
        <div className="mt-10 pt-6 border-t border-surface-border/60 dark:border-dark-border flex flex-wrap items-center justify-between gap-4 text-xs text-surface-body dark:text-dark-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Govt. Approved Assaying Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Insured Pan-India Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Lifetime Free Cleaning & Maintenance</span>
          </div>
        </div>

      </div>
    </section>
  );
};
