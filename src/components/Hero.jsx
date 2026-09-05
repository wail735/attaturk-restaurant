import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero_man.jpg'; 
import floating1 from '../assets/menu15.jpg'; // Burger
import floating2 from '../assets/menu12.jpg'; // Pizza

const Hero = () => {
  const { t, language } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate Title lines
    tl.from('.hero-title-line', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      skewY: 5
    })
    // Animate Central Image
    .from('.hero-image', {
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }, "-=0.8")
    // Animate floating food items
    .from('.hero-floating', {
      scale: 0,
      rotation: -45,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    }, "-=0.8")
    // Animate badges
    .from('.hero-badge', {
      scale: 0,
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.5)'
    }, "-=0.6")
    // Animate subtitle & buttons
    .from('.hero-bottom', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.6");

  }, { scope: container });

  return (
    <section ref={container} className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-te-cream">
      
      <div className="container mx-auto px-6 relative flex flex-col items-center text-center">
        
        {/* Massive Background-Style Title */}
        <div className="relative z-0 w-full flex justify-center perspective-[1000px]">
          <h1 className="font-outfit font-black text-6xl md:text-[8rem] lg:text-[11rem] text-te-choc leading-[0.8] tracking-tighter uppercase relative z-0 flex flex-col overflow-hidden">
            <span className="hero-title-line block">{t('hero.title1')}</span>
            <span className="hero-title-line text-te-terra block">{t('hero.title2')}</span>
          </h1>

          {/* Floating decorative food elements (mimicking the burger/tomato) */}
          <motion.img 
            src={floating1} 
            alt="Burger" 
            className="hero-floating absolute top-[-2rem] left-[5%] md:left-[15%] w-16 h-16 md:w-24 md:h-24 object-cover rounded-full shadow-2xl border-4 border-white z-10" 
            animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img 
            src={floating2} 
            alt="Pizza" 
            className="hero-floating absolute top-10 right-[5%] md:right-[15%] w-16 h-16 md:w-24 md:h-24 object-cover rounded-full shadow-2xl border-4 border-white z-10" 
            animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Foreground Overlapping Image (Cutout style) */}
        <div className="relative z-10 mt-[-2rem] md:mt-[-5rem] lg:mt-[-10rem] w-full max-w-3xl mx-auto px-4 md:px-0 pointer-events-none">
           <img 
             src={heroImage} 
             alt="Client heureux" 
             className="hero-image w-full object-contain transform hover:scale-[1.02] transition-transform duration-700 pointer-events-auto mix-blend-multiply" 
             style={{ filter: 'contrast(1.1) brightness(1.05)' }}
           />
           
           {/* Floating Badges pinned to the image */}
           <div className={`hero-badge absolute bottom-20 ${language === 'ar' ? 'right-4 md:right-10' : 'left-4 md:left-10'} bg-white text-te-choc px-6 py-3 rounded-pill font-black text-sm md:text-lg shadow-xl uppercase transform -rotate-6 hover:rotate-0 transition-transform pointer-events-auto`}>
              {t('hero.badge.fresh')}
           </div>
           
           <div className={`hero-badge absolute top-1/3 ${language === 'ar' ? 'left-4 md:left-10' : 'right-4 md:right-10'} bg-te-mustard text-te-choc px-6 py-3 rounded-pill font-black text-sm md:text-lg shadow-xl uppercase transform rotate-12 hover:rotate-0 transition-transform pointer-events-auto`}>
              {t('hero.badge.fast')}
           </div>
        </div>

        {/* Subtitle and CTAs below */}
        <p className="hero-bottom mt-12 text-xl md:text-2xl text-te-choc-light font-medium max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="hero-bottom mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="btn-primary text-lg px-10">
            {t('hero.cta.menu')}
          </a>
          <a href="tel:+213542225895" className="btn-secondary text-lg px-10">
            {t('hero.cta.order')}
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
