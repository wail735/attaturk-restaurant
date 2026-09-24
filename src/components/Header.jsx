import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-te-cream/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-te-mustard rounded-full flex items-center justify-center">
            <span className="font-outfit font-black text-te-choc text-xl">AT</span>
          </div>
          <span className="font-outfit font-black text-2xl text-te-choc tracking-tight">ATATURK</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-outfit font-bold text-te-choc">
          <a href="#menu" className="hover:text-te-mustard transition-colors">{t('nav.menu')}</a>
          <a href="#ambiance" className="hover:text-te-mustard transition-colors">{t('nav.ambiance')}</a>
          <a href="#avis" className="hover:text-te-mustard transition-colors">{t('nav.avis')}</a>
          <a href="#contact" className="hover:text-te-mustard transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLanguage} 
            className="font-outfit font-bold text-te-choc hover:text-te-mustard transition-colors text-lg px-2"
            aria-label="Changer de langue"
          >
            {language === 'fr' ? 'عربي' : 'FR'}
          </button>
          <a href="#connexion" className="btn-primary py-2 px-6 text-sm">
            {t('nav.connexion')}
          </a>
        </div>

        <button 
          className="md:hidden text-te-choc p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-te-cream border-t border-te-sand shadow-lg">
          <nav className="flex flex-col p-6 gap-4 font-outfit font-bold text-te-choc text-xl">
            <button 
              onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }} 
              className="text-start text-te-mustard hover:text-te-terra transition-colors"
            >
              {language === 'fr' ? 'عربي (Arabe)' : 'Français (French)'}
            </button>
            <hr className="border-te-sand" />
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.menu')}</a>
            <a href="#ambiance" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.ambiance')}</a>
            <a href="#avis" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.avis')}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</a>
            <a href="#connexion" onClick={() => setIsMobileMenuOpen(false)} className="bg-te-mustard text-center py-3 rounded-pill mt-4 uppercase">
              {t('nav.connexion')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
