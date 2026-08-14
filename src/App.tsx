import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { TopRateBar } from './components/Header/TopRateBar';
import { Navbar } from './components/Header/Navbar';
import { HeroCarousel } from './components/Hero/HeroCarousel';
import { WhyChooseSection } from './components/WhyUs/WhyChooseSection';
import { CollectionCards } from './components/Collections/CollectionCards';
import { ProductShowcase } from './components/Products/ProductShowcase';
import { EditorialSplit } from './components/Editorial/EditorialSplit';
import { Masterpiece3DCarousel } from './components/Carousel3D/Masterpiece3DCarousel';
import { InstagramFeed } from './components/Instagram/InstagramFeed';
import { Footer } from './components/Footer/Footer';

// Modals and Drawers
import { RateCalculatorModal } from './components/Modals/RateCalculatorModal';
import { GoldenHarvestModal } from './components/Modals/GoldenHarvestModal';
import { BespokeModal } from './components/Customizer/BespokeModal';
import { ProductQuickView } from './components/Modals/ProductQuickView';
import { CartDrawer } from './components/Modals/CartDrawer';
import { WishlistDrawer } from './components/Modals/WishlistDrawer';
import { SearchModal } from './components/Modals/SearchModal';
import { ToastContainer } from './components/Common/ToastContainer';

export function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-surface-cream dark:bg-dark-surface text-surface-text dark:text-dark-text font-sans antialiased selection:bg-brand-primary selection:text-white transition-colors duration-500 flex flex-col">
          {/* Top Live Rates Header */}
          <TopRateBar />

          {/* Sticky Navigation Bar */}
          <Navbar />

          {/* Main Website Content */}
          <main className="flex-grow">
            <HeroCarousel />
            <WhyChooseSection />
            <CollectionCards />
            <ProductShowcase />
            <EditorialSplit />
            <Masterpiece3DCarousel />
            <InstagramFeed />
          </main>

          {/* Rich Footer */}
          <Footer />

          {/* Interactive Modals and Flyouts */}
          <RateCalculatorModal />
          <GoldenHarvestModal />
          <BespokeModal />
          <ProductQuickView />
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <ToastContainer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
