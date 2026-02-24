import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import IngredientsSection from './components/IngredientsSection';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FounderStory from './components/FounderStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import ShopPage from './components/ShopPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return <ProductPage />;
      case 'shop':
        return <ShopPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero />
            <FeaturedCollection onProductClick={() => setCurrentPage('product')} />
            <IngredientsSection />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
            <FounderStory />
            <Newsletter />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;