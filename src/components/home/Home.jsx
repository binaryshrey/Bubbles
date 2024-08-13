import React from 'react';
import HeroSection from './HeroSection';
import Features from './Features';
import FeaturesAnalytics from './FeaturesAnalytics';
import CTA from './CTA';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="bg-black">
      <HeroSection />
      <Features />
      <FeaturesAnalytics />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
