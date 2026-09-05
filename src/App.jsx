import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Atmosphere from './components/Atmosphere';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Menu />
          <Atmosphere />
          <Reviews />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
