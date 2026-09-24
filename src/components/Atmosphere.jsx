import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import img1 from '../ataturk/1.jpg';
import img2 from '../ataturk/2.jpg';
import img3 from '../ataturk/631644074_18098805482497697_4068700066609320752_n.jpg';
import img4 from '../ataturk/631724104_18098805473497697_4960421071865122402_n.jpg';
import img5 from '../ataturk/ATATURK-13-scaled.jpg';

gsap.registerPlugin(ScrollTrigger);

const Atmosphere = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const container = useRef(null);

  const images = [img1, img2, img3, img4, img5];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    // Animate Text
    tl.from('.atm-text', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    })
    // Animate Accordion Panels
    .fromTo('.atm-panel', 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        clearProps: 'all'
      }, 
      "-=0.5"
    );

  }, { scope: container });

  return (
    <section id="ambiance" ref={container} className="py-24 bg-te-choc relative overflow-hidden text-te-cream">
      {/* Dark mode background for extra "wow" contrast */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-full bg-te-terra/10 transform -skew-x-12 translate-x-20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-te-mustard/20 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="atm-text pill-badge bg-te-mustard text-te-choc mb-6 border-none shadow-[0_0_15px_rgba(245,183,49,0.3)] inline-block">{t('atm.badge')}</span>
          <h2 className="atm-text text-5xl md:text-7xl font-outfit font-black text-white mb-6 uppercase leading-[0.9]">
            {t('atm.title1')} <span className="text-te-mustard">{t('atm.title2')}</span>
          </h2>
          <p className="atm-text text-xl text-te-cream/70 max-w-2xl mx-auto leading-relaxed">
            {t('atm.subtitle')}
          </p>
        </div>

        {/* Extraordinary Expanding Accordion Gallery */}
        <div className="w-full h-[600px] md:h-[700px] flex flex-col md:flex-row gap-2 md:gap-4 p-2 bg-te-choc-light/20 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border border-white/5">
          {images.map((img, index) => (
            <div 
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`atm-panel relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-grow
                ${activeIndex === index ? 'md:flex-[4] flex-[4]' : 'md:flex-[1] flex-[1] grayscale-[50%] hover:grayscale-0'}`}
            >
              <img 
                src={img} 
                alt={`Ambiance ${index + 1}`} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
                style={{
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1.2)',
                }}
              />
              {/* Overlays */}
              <div className={`absolute inset-0 bg-gradient-to-t from-te-choc via-te-choc/20 to-transparent transition-opacity duration-700 ${activeIndex === index ? 'opacity-80' : 'opacity-40'}`}></div>
              
              {/* Content that appears when active */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full transition-all duration-700 ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-12 h-12 rounded-full bg-te-mustard text-te-choc flex items-center justify-center font-outfit font-black text-xl mb-4 shadow-lg transform -rotate-12">
                  0{index + 1}
                </div>
                <h3 className="font-outfit font-black text-2xl md:text-3xl text-white uppercase tracking-wider">
                  {index % 2 === 0 ? t('atm.card1') : t('atm.card2')}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Atmosphere;
