import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';
import {
  Heart,
  Eye,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  LayoutGrid,
  List
} from 'lucide-react';

interface ProductShowcaseProps {
  selectedCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

type CategoryTab =
  | 'all'
  | 'gold'
  | 'bridal'
  | 'silver'
  | 'men'
  | 'best-sellers'
  | 'offers';

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  selectedCategoryFilter,
  onClearCategoryFilter
}) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setIsCartOpen } = useCart();
  
  // View Mode & Tab Systems
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Tab Scrolling & Affordance State
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Check scroll state for left/right arrow visibility
  const updateScrollButtons = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = tabsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons, { passive: true });
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  // Sync external category filter if passed from hero or banner
  useEffect(() => {
    if (selectedCategoryFilter) {
      let targetTab: CategoryTab = 'all';
      if (selectedCategoryFilter === 'gold') targetTab = 'gold';
      else if (selectedCategoryFilter === 'bridal') targetTab = 'bridal';
      else if (selectedCategoryFilter === 'silver') targetTab = 'silver';
      else if (selectedCategoryFilter === 'men') targetTab = 'men';
      
      setActiveTab(targetTab);
      setCurrentPage(1);

      // Auto-scroll selected tab into center view
      setTimeout(() => {
        if (tabsContainerRef.current) {
          const activeBtn = tabsContainerRef.current.querySelector(`[data-tab-id="${targetTab}"]`);
          if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      }, 50);
    }
  }, [selectedCategoryFilter]);

  // Tab Definitions
  const tabs = [
    { id: 'all' as CategoryTab, label: 'All Jewels' },
    { id: 'gold' as CategoryTab, label: 'Gold & Solitaires' },
    { id: 'bridal' as CategoryTab, label: 'Bridal Heritage' },
    { id: 'silver' as CategoryTab, label: '925 Silver' },
    { id: 'men' as CategoryTab, label: 'Men’s Collection' },
    { id: 'best-sellers' as CategoryTab, label: 'Best Sellers' },
    { id: 'offers' as CategoryTab, label: 'Festive Deals' }
  ];

  // Filter products by active tab
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === 'gold') return product.category === 'gold';
    if (activeTab === 'bridal') return product.category === 'bridal';
    if (activeTab === 'silver') return product.category === 'silver';
    if (activeTab === 'men') return product.category === 'men';
    if (activeTab === 'best-sellers') return product.badge === 'Best Seller' || product.rating >= 4.9;
    if (activeTab === 'offers') return product.originalPrice > product.price || product.badge === '10% OFF';
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default featured
  });

  // Pagination Calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (tabId: CategoryTab) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    if (onClearCategoryFilter && selectedCategoryFilter) {
      onClearCategoryFilter();
    }
    // Auto-scroll tab into center view
    setTimeout(() => {
      if (tabsContainerRef.current) {
        const activeBtn = tabsContainerRef.current.querySelector(`[data-tab-id="${tabId}"]`);
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }, 50);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollDistance = direction === 'left' ? -220 : 220;
      tabsContainerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('products-grid-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <section id="products-section" className="py-12 sm:py-16 md:py-20 relative transition-colors duration-500 border-b border-surface-border/40 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.25em] text-brand-primary dark:text-brand-primary-light font-semibold mb-2">
            <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
            <span>Atelier Showcase</span>
            <span className="w-6 h-px bg-brand-primary dark:bg-brand-primary-light" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-surface-text dark:text-dark-text font-medium tracking-tight">
            Curated Jewelry Vault
          </h2>
        </div>

        {/* Clean, Best-Practice Category Tabbing Bar with Scroll Controls & Fade Overlays */}
        <div className="relative mb-8 max-w-5xl mx-auto px-8 sm:px-12 group">
          
          {/* Left Scroll Control Button */}
          <button
            onClick={() => scrollTabs('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll tabs left"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-cream/95 dark:bg-dark-card/95 border border-surface-border/80 dark:border-dark-border text-surface-text dark:text-dark-text shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
              canScrollLeft
                ? 'opacity-100 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary hover:scale-105'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left Edge Gradient Fade Overlay */}
          <div
            className={`absolute left-8 sm:left-12 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none bg-gradient-to-r from-surface-background dark:from-dark-surface to-transparent transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Scrollable Tabs Container */}
          <div
            ref={tabsContainerRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2 scroll-smooth no-scrollbar justify-start sm:justify-center"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-brand-primary text-white shadow-md transform -translate-y-0.5'
                      : 'bg-surface-subtle dark:bg-dark-card text-surface-body dark:text-dark-subtle hover:bg-brand-primary/15 dark:hover:bg-brand-primary-light/15 border border-surface-border/60 dark:border-dark-border'
                  }`}
                >
                  <span className={`text-[9px] ${isSelected ? 'text-amber-300' : 'text-brand-primary dark:text-brand-primary-light'}`}>◈</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Edge Gradient Fade Overlay */}
          <div
            className={`absolute right-8 sm:right-12 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none bg-gradient-to-l from-surface-background dark:from-dark-surface to-transparent transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right Scroll Control Button */}
          <button
            onClick={() => scrollTabs('right')}
            disabled={!canScrollRight}
            aria-label="Scroll tabs right"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-cream/95 dark:bg-dark-card/95 border border-surface-border/80 dark:border-dark-border text-surface-text dark:text-dark-text shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
              canScrollRight
                ? 'opacity-100 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary hover:scale-105'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Action Header: Results Count, View Toggle & Sort Dropdown */}
        <div id="products-grid-top" className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-2 text-xs border-b border-surface-border/40 dark:border-dark-border/60 pb-4">
          <div className="text-surface-muted dark:text-dark-muted font-medium">
            Showing <span className="font-semibold text-surface-text dark:text-dark-text">{sortedProducts.length > 0 ? startIndex + 1 : 0}</span>–<span className="font-semibold text-surface-text dark:text-dark-text">{Math.min(startIndex + itemsPerPage, sortedProducts.length)}</span> of <span className="font-semibold text-brand-primary dark:text-brand-primary-light">{sortedProducts.length}</span> creations
          </div>

          <div className="flex items-center gap-3">
            {/* Grid vs List View Mode Toggle */}
            <div className="flex items-center gap-1 bg-surface-subtle/80 dark:bg-dark-card p-1 rounded-full border border-surface-border/60 dark:border-dark-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'grid'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-surface-muted hover:text-surface-text dark:hover:text-dark-text'
                }`}
                title="Grid View (2 per row on mobile)"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold uppercase px-1 hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-surface-muted hover:text-surface-text dark:hover:text-dark-text'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold uppercase px-1 hidden sm:inline">List</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-surface-muted dark:text-dark-muted font-medium hidden sm:flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-subtle/80 dark:bg-dark-card text-surface-text dark:text-dark-text px-3 sm:px-3.5 py-1.5 rounded-full border border-surface-border/60 dark:border-dark-border cursor-pointer focus:outline-none text-xs font-medium"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Display Stage: Grid Mode (2 products per row on mobile) vs List Mode */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-8 sm:gap-y-12">
            {paginatedProducts.map((product) => {
              const isWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between transition-all duration-300"
                >
                  {/* Product Image Stage */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5 sm:mb-4 bg-surface-subtle dark:bg-dark-card shadow-xs group-hover:shadow-xl transition-all duration-500">
                    {/* Badge Tag */}
                    {product.badge && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-brand-primary text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </div>
                    )}

                    {/* Wishlist Floating Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition backdrop-blur-md cursor-pointer ${
                        isWish
                          ? 'bg-white text-rose-600 shadow-md'
                          : 'bg-white/70 dark:bg-black/60 text-surface-muted hover:text-brand-primary hover:bg-white dark:hover:bg-black'
                      }`}
                      title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-rose-600' : ''}`} />
                    </button>

                    {/* Image */}
                    <div
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full h-full cursor-pointer flex items-center justify-center p-2 sm:p-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, product.category === 'bridal' ? 'bridal' : product.category === 'men' ? 'men' : product.category === 'silver' ? 'silver' : 'gold')}
                        className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Quick View Trigger on Hover (Hidden on touch devices, hover on desktop) */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex absolute inset-x-3 bottom-3 bg-surface-cream/95 dark:bg-dark-surface/95 backdrop-blur-md text-brand-primary dark:text-brand-primary-light text-xs font-semibold py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 items-center justify-center gap-1.5 shadow-md cursor-pointer border border-brand-primary/20"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-surface-muted dark:text-dark-muted mb-1">
                      <span className="font-semibold text-brand-primary dark:text-brand-primary-light truncate">{product.purity}</span>
                      <span className="shrink-0">{product.weight}</span>
                    </div>

                    <h4
                      onClick={() => setQuickViewProduct(product)}
                      className="text-xs sm:text-sm font-serif font-medium text-surface-text dark:text-dark-text mb-1 sm:mb-1.5 line-clamp-1 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                      <span className="text-xs sm:text-base font-semibold text-surface-text dark:text-dark-text">
                        ₹ {product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-surface-muted dark:text-dark-muted text-[10px] sm:text-xs line-through">
                          ₹ {product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-brand-primary dark:bg-brand-primary text-white text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full hover:bg-brand-primary-hover transition-all duration-200 cursor-pointer text-center shadow-xs active:scale-[0.98]"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-1.5 sm:p-2.5 rounded-full bg-surface-subtle/90 dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all duration-200 cursor-pointer border border-brand-primary/20 dark:border-brand-primary-light/20 active:scale-[0.98] shrink-0"
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Mode Layout */
          <div className="flex flex-col gap-4 sm:gap-6">
            {paginatedProducts.map((product) => {
              const isWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-surface-cream/70 dark:bg-dark-card/70 hover:bg-surface-cream dark:hover:bg-dark-card rounded-2xl p-3 sm:p-5 border border-surface-border/60 dark:border-dark-border transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch"
                >
                  {/* Left Product Image Stage */}
                  <div className="relative w-full sm:w-44 md:w-52 aspect-square shrink-0 rounded-xl overflow-hidden bg-surface-subtle dark:bg-dark-elevated">
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5 z-10 bg-brand-primary text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </div>
                    )}

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition backdrop-blur-md cursor-pointer ${
                        isWish
                          ? 'bg-white text-rose-600 shadow-md'
                          : 'bg-white/70 dark:bg-black/60 text-surface-muted hover:text-brand-primary hover:bg-white dark:hover:bg-black'
                      }`}
                      title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-rose-600' : ''}`} />
                    </button>

                    <div
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full h-full cursor-pointer flex items-center justify-center p-2.5"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, product.category === 'bridal' ? 'bridal' : product.category === 'men' ? 'men' : product.category === 'silver' ? 'silver' : 'gold')}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Right Details & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 text-xs text-surface-muted dark:text-dark-muted mb-1">
                        <span className="font-semibold text-brand-primary dark:text-brand-primary-light uppercase tracking-wider">{product.purity}</span>
                        <span>•</span>
                        <span>{product.weight}</span>
                        {product.rating && (
                          <>
                            <span>•</span>
                            <span className="text-amber-500 font-semibold flex items-center gap-0.5">
                              ★ {product.rating}
                            </span>
                          </>
                        )}
                      </div>

                      <h4
                        onClick={() => setQuickViewProduct(product)}
                        className="text-base sm:text-lg font-serif font-medium text-surface-text dark:text-dark-text mb-2 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h4>

                      <p className="text-xs text-surface-body dark:text-dark-subtle mb-3 leading-relaxed hidden sm:block">
                        Certified fine jewelry with hallmark purity certificate, insured express delivery, and lifetime buyback guarantee.
                      </p>

                      <div className="flex items-baseline gap-2.5 mb-3">
                        <span className="text-lg sm:text-xl font-semibold text-surface-text dark:text-dark-text">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-surface-muted dark:text-dark-muted text-xs sm:text-sm line-through">
                            ₹ {product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-brand-primary text-white text-xs font-semibold py-2.5 px-6 rounded-full hover:bg-brand-primary-hover transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex items-center gap-1.5 bg-surface-subtle dark:bg-dark-elevated text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary hover:text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer border border-brand-primary/20 active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="text-xs font-medium text-surface-muted hover:text-surface-text dark:hover:text-dark-text py-2.5 px-3 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base font-serif text-surface-muted mb-3">No creations found in this collection.</p>
            <button
              onClick={() => handleTabChange('all')}
              className="text-xs font-semibold text-brand-primary dark:text-brand-primary-light underline cursor-pointer"
            >
              View All Jewels
            </button>
          </div>
        )}

        {/* Pagination Navigation Controls */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-surface-border/40 dark:border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-surface-muted dark:text-dark-muted">
              Page <span className="font-semibold text-surface-text dark:text-dark-text">{currentPage}</span> of <span className="font-semibold text-surface-text dark:text-dark-text">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3.5 py-2 rounded-full border text-xs font-medium flex items-center gap-1 transition ${
                  currentPage === 1
                    ? 'opacity-40 border-transparent text-surface-muted cursor-not-allowed'
                    : 'border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white cursor-pointer active:scale-95'
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-semibold transition cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-surface-subtle dark:bg-dark-card text-surface-body dark:text-dark-subtle hover:bg-brand-primary/20 dark:hover:bg-brand-primary-light/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3.5 py-2 rounded-full border text-xs font-medium flex items-center gap-1 transition ${
                  currentPage === totalPages
                    ? 'opacity-40 border-transparent text-surface-muted cursor-not-allowed'
                    : 'border-surface-border dark:border-dark-border text-surface-text dark:text-dark-text hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white cursor-pointer active:scale-95'
                }`}
                aria-label="Next Page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
