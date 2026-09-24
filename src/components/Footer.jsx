import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import imgLeft from '../ataturk/menu-1-grillards-f.jpg'; // Burger
import imgRight from '../ataturk/menu-12-entrés.jpg'; // Pizza

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t, language } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    // Animate CTA section
    const tlCTA = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      }
    });

    tlCTA.from('.cta-img-left', {
      x: -100,
      opacity: 0,
      rotation: -45,
      duration: 1,
      ease: 'back.out(1.2)',
      clearProps: 'all'
    })
    .from('.cta-img-right', {
      x: 100,
      opacity: 0,
      rotation: 45,
      duration: 1,
      ease: 'back.out(1.2)',
      clearProps: 'all'
    }, "-=0.8")
    .from('.cta-text', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    }, "-=0.6");

    // Animate Footer Content
    gsap.from('.footer-col', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // Animate Map
    gsap.from('.footer-map', {
      scrollTrigger: {
        trigger: '.footer-map',
        start: 'top 90%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    });

  }, { scope: container });
  
  return (
    <div ref={container} className="flex flex-col">
      {/* CTA Section */}
      <section className="cta-section bg-te-mustard relative py-20 md:py-32 overflow-hidden z-10">
        
        {/* Background decorative blobs simulating the reference design */}
        <motion.div 
          className="absolute top-10 left-1/4 w-32 h-32 bg-te-mustard-hover rounded-full opacity-50 mix-blend-multiply blur-sm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-1/4 w-64 h-64 bg-te-mustard-hover rounded-full opacity-50 mix-blend-multiply blur-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-10 w-48 h-48 bg-te-mustard-hover rounded-tl-full opacity-50 mix-blend-multiply blur-sm transform rotate-45"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>

        {/* Abstract white squiggles */}
        <motion.svg 
          className="absolute top-1/4 left-[15%] w-16 h-16 text-white opacity-90 transform -rotate-12" 
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          animate={{ y: [-10, 10, -10], rotate: [-12, -2, -12] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M10,50 Q30,10 50,50 T90,50" />
        </motion.svg>
        <motion.svg 
          className="absolute bottom-1/4 right-[15%] w-20 h-20 text-white opacity-90 transform rotate-45" 
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          animate={{ y: [10, -10, 10], rotate: [45, 55, 45] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M10,80 Q40,10 60,80 T90,20" />
        </motion.svg>

        {/* Floating Images */}
        <motion.div 
          className="cta-img-left absolute -top-4 -left-8 md:-top-10 md:left-5 lg:left-20 w-28 h-28 md:w-64 lg:w-80 md:h-64 lg:h-80 rounded-full border-4 md:border-8 border-white overflow-hidden shadow-2xl z-10 md:z-20"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
           <img src={imgLeft} alt="Burger" loading="lazy" className="w-full h-full object-cover transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500" />
        </motion.div>
        
        <motion.div 
          className="cta-img-right absolute bottom-10 -right-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-5 lg:right-20 w-36 h-36 md:w-72 lg:w-96 md:h-72 lg:h-96 rounded-[1.5rem] md:rounded-[3rem] border-4 md:border-8 border-white overflow-hidden shadow-2xl z-10 md:z-20"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
           <img src={imgRight} alt="Pizza" loading="lazy" className="w-full h-full object-cover transform rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500" />
        </motion.div>

        {/* Center Content */}
        <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center max-w-2xl py-12 md:py-0">
          <h2 className="cta-text text-5xl md:text-6xl lg:text-7xl font-outfit font-black text-te-choc mb-6 uppercase tracking-tight leading-[0.9] drop-shadow-sm">
            {t('cta.title1')}<br/>{t('cta.title2')}
          </h2>
          <p className="cta-text text-te-choc text-lg md:text-xl mb-10 font-medium">
            {t('cta.subtitle')}
          </p>
          <a href="tel:+213555854463" className="cta-text bg-white text-te-choc font-outfit font-black uppercase tracking-wider px-10 py-4 rounded-pill hover:scale-105 transition-transform shadow-[0_10px_25px_-5px_rgba(61,22,9,0.3)]">
            {t('cta.btn')}
          </a>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="w-full overflow-hidden leading-none bg-te-choc -mt-[2px] relative z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[120px] block" fill="#F5B731">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Footer Section */}
      <footer id="contact" className="bg-te-choc text-te-cream pt-10 pb-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
            
            <div className="footer-col lg:col-span-2">
              <h3 className="font-outfit font-black text-4xl mb-8 text-te-mustard">Ataturk</h3>
              <div className="flex items-start gap-4">
                <div className="text-te-mustard mt-1 bg-te-mustard/10 p-2 rounded-xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-2xl mb-2 text-white">{t('footer.address.title')}</h4>
                  <p className="text-te-sand/80 text-lg leading-relaxed">
                    {t('footer.address.text1')}<br/>
                    {t('footer.address.text2')}
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="font-outfit font-bold text-lg mb-6 text-white">{t('footer.rest.title')}</h4>
              <ul className="space-y-4 font-medium text-te-sand/80">
                <li><a href="#menu" className="hover:text-white hover:underline transition-colors">{t('footer.rest.menu')}</a></li>
                <li><a href="#ambiance" className="hover:text-white hover:underline transition-colors">{t('footer.rest.atm')}</a></li>
                <li><a href="#avis" className="hover:text-white hover:underline transition-colors">{t('footer.rest.rev')}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="font-outfit font-bold text-lg mb-6 text-white">{t('footer.contact.title')}</h4>
              <ul className="space-y-4 font-medium text-te-sand/80">
                <li dir="ltr" className={language === 'ar' ? 'text-right' : 'text-left'}><a href="tel:+213555854463" className="hover:text-white hover:underline transition-colors">0555 85 44 63</a></li>
                <li>{t('footer.contact.days')}</li>
                <li dir="ltr" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('footer.contact.hours')}</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="font-outfit font-bold text-lg mb-6 text-white">{t('footer.legal.title')}</h4>
              <ul className="space-y-4 font-medium text-te-sand/80">
                <li><a href="#" className="hover:text-white hover:underline transition-colors">{t('footer.legal.mentions')}</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors">{t('footer.legal.privacy')}</a></li>
              </ul>
            </div>

          </div>
          
          {/* Large Map */}
          <div className="footer-map mt-16 w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-te-mustard/20 relative group">
            <div className="absolute inset-0 bg-te-choc/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <iframe 
              src="https://maps.google.com/maps?q=Ataturk,+Blida&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte d'Ataturk"
              className="relative z-0"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
