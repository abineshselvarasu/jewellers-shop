import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const BespokeModal: React.FC = () => {
  const { isCustomizerOpen, setIsCustomizerOpen, addToast } = useCart();

  const [jewelryType, setJewelryType] = useState('Engagement Ring');
  const [metal, setMetal] = useState('22KT Yellow Gold');
  const [gemstone, setGemstone] = useState('Solitaire Diamond (VVS1)');
  const [caratWeight, setCaratWeight] = useState(1.0);
  const [engraving, setEngraving] = useState('');
  const [notes, setNotes] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCustomizerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      addToast('Please enter your contact details.', 'info');
      return;
    }
    setIsSubmitted(true);
    addToast('Bespoke Atelier inquiry submitted! An artisan will contact you.', 'gold');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        onClick={() => setIsCustomizerOpen(false)}
      />
      <div className="relative bg-surface-cream dark:bg-dark-surface rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-surface-border dark:border-dark-border-subtle z-10 text-surface-text dark:text-dark-text max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            setIsCustomizerOpen(false);
            setIsSubmitted(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-elevated text-surface-muted transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-primary dark:text-brand-primary-light font-semibold mb-0.5">
                  <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
                  <span>Custom Studio</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-primary dark:text-brand-primary-light">
                  Bespoke Jewellery Atelier
                </h3>
                <p className="text-xs text-surface-muted dark:text-dark-muted">
                  Collaborate with Gradiolex master jewelers to craft custom heirlooms
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              {/* Step 1: Jewelry Type */}
              <div>
                <label className="block font-semibold mb-2 text-surface-body dark:text-dark-subtle">
                  1. Select Jewelry Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Engagement Ring', 'Bridal Haar / Set', 'Diamond Pendant', "Men's Signet Kada"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJewelryType(type)}
                      className={`p-2.5 rounded-full border text-xs font-semibold text-center transition-all duration-200 cursor-pointer ${
                        jewelryType === type
                          ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                          : 'bg-surface-subtle/80 dark:bg-dark-elevated text-surface-text dark:text-dark-text border-surface-border dark:border-dark-border-subtle hover:border-brand-primary/40'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Metal & Karat */}
              <div>
                <label className="block font-semibold mb-2 text-surface-body dark:text-dark-subtle">
                  2. Precious Metal Purity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    '22KT Yellow Gold',
                    '18KT Rose Gold',
                    '18KT White Gold',
                    'Platinum 950'
                  ].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMetal(m)}
                      className={`p-2.5 rounded-full border text-xs font-semibold text-center transition-all duration-200 cursor-pointer ${
                        metal === m
                          ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                          : 'bg-surface-subtle/80 dark:bg-dark-elevated text-surface-text dark:text-dark-text border-surface-border dark:border-dark-border-subtle hover:border-brand-primary/40'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Gemstone Selection */}
              <div>
                <label className="block font-semibold mb-2 text-surface-body dark:text-dark-subtle">
                  3. Centerpiece Gemstone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Solitaire Diamond (VVS1)',
                    'Burmese Pigeon Ruby',
                    'Zambian Emerald',
                    'Ceylon Blue Sapphire'
                  ].map((gem) => (
                    <button
                      key={gem}
                      type="button"
                      onClick={() => setGemstone(gem)}
                      className={`p-2.5 rounded-full border text-xs font-semibold text-center transition-all duration-200 cursor-pointer ${
                        gemstone === gem
                          ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                          : 'bg-surface-subtle/80 dark:bg-dark-elevated text-surface-text dark:text-dark-text border-surface-border dark:border-dark-border-subtle hover:border-brand-primary/40'
                      }`}
                    >
                      {gem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat & Engraving */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-semibold text-surface-body dark:text-dark-subtle">
                      Gemstone Weight:
                    </label>
                    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                      {caratWeight.toFixed(2)} Carats
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="5.0"
                    step="0.05"
                    value={caratWeight}
                    onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-surface-body dark:text-dark-subtle">
                    Custom Laser Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Forever & Always • 2026"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    maxLength={30}
                    className="w-full p-2.5 rounded-xl bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-xs"
                  />
                </div>
              </div>

              {/* Additional Design Ideas or Reference */}
              <div>
                <label className="block font-semibold mb-1 text-surface-body dark:text-dark-subtle">
                  Design Notes & Desired Budget
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your design inspiration, ring size, or target budget (e.g. ₹50,000 - ₹1,50,000)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-subtle dark:bg-dark-elevated border border-surface-border dark:border-dark-border-subtle text-xs"
                />
              </div>

              {/* Contact Details */}
              <div className="bg-surface-subtle dark:bg-dark-elevated p-4 rounded-2xl border border-surface-border dark:border-dark-border-subtle space-y-3">
                <h4 className="font-serif font-bold text-sm text-brand-primary dark:text-brand-primary-light">
                  Your Details for Atelier Consultation
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-cream dark:bg-dark-surface border border-surface-border dark:border-dark-border-subtle text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone Number"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-cream dark:bg-dark-surface border border-surface-border dark:border-dark-border-subtle text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3.5 px-6 rounded-full font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm tracking-wider uppercase active:scale-[0.98] border border-brand-primary/20"
              >
                <span>Submit Atelier Design Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-primary dark:text-brand-primary-light mb-2">
              Bespoke Request Confirmed!
            </h3>
            <p className="text-sm text-surface-body dark:text-dark-subtle max-w-md mx-auto mb-6">
              Thank you, <strong>{contactName}</strong>. Our senior jewelry artist will review your <strong>{metal} {jewelryType}</strong> ({gemstone}) configuration and reach out to <strong>{contactPhone}</strong> with a complimentary 3D CAD render and quote within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsCustomizerOpen(false);
                setIsSubmitted(false);
              }}
              className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] text-xs uppercase tracking-wider"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
