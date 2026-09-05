import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import menu9 from '../assets/menu9.jpg';
import menu10 from '../assets/menu10.jpg';
import menu11 from '../assets/menu11.jpg';
import menu12 from '../assets/menu12.jpg';
import menu13 from '../assets/menu13.jpg';
import menu14 from '../assets/menu14.jpg';
import menu15 from '../assets/menu15.jpg';
import menu17 from '../assets/menu17.jpg';
import menu18 from '../assets/menu18.jpg';
import menu19 from '../assets/menu19.jpg';
import menu20 from '../assets/menu20.jpg';
import menu21 from '../assets/menu21.jpg';

gsap.registerPlugin(ScrollTrigger);

const menuKeys = [
  { id: 9, keyName: "salade_croustillant", price: "850 DA", image: menu9, catKey: "salades" },
  { id: 10, keyName: "poulet_roti", price: "1100 DA", image: menu10, catKey: "plats" },
  { id: 11, keyName: "emince_poulet", price: "1200 DA", image: menu11, catKey: "plats" },
  { id: 12, keyName: "pizza_napo", price: "700 DA", image: menu12, catKey: "pizzas" },
  { id: 13, keyName: "escalope_grill", price: "1150 DA", image: menu13, catKey: "plats" },
  { id: 14, keyName: "menu_degust", price: "1400 DA", image: menu14, catKey: "plats" },
  { id: 15, keyName: "cheeseburger", price: "850 DA", image: menu15, catKey: "burgers" },
  { id: 17, keyName: "salade_fraicheur", price: "600 DA", image: menu17, catKey: "salades" },
  { id: 18, keyName: "menu_sandwich", price: "950 DA", image: menu18, catKey: "plats" },
  { id: 19, keyName: "medaillons_boeuf", price: "1600 DA", image: menu19, catKey: "plats" },
  { id: 20, keyName: "lasagnes", price: "850 DA", image: menu20, catKey: "pates" },
  { id: 21, keyName: "poulet_deux_riz", price: "1100 DA", image: menu21, catKey: "plats" },
];

const categoryKeys = ["all", "burgers", "plats", "pizzas", "pates", "salades"];

const Menu = () => {
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");
  const { t } = useLanguage();
  const container = useRef(null);
  const gridRef = useRef(null);

  const filteredMenu = activeCategoryKey === "all" 
    ? menuKeys 
    : menuKeys.filter(item => item.catKey === activeCategoryKey);

  useGSAP(() => {
    // Header animation
    gsap.from('.menu-header', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Cards staggered animation
    gsap.from('.menu-card', {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      clearProps: 'all'
    });
  }, { scope: container });

  return (
    <section id="menu" ref={container} className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="menu-header pill-badge bg-te-cream inline-block mb-6">{t('menu.badge')}</span>
          <h2 className="menu-header text-5xl md:text-6xl text-te-choc mb-6">{t('menu.title1')} <span className="text-te-terra">{t('menu.title2')}</span></h2>
          <p className="menu-header text-te-choc-light max-w-2xl mx-auto text-lg">{t('menu.subtitle')}</p>
        </div>

        {/* Categories (Pills) */}
        <div className="menu-header flex flex-wrap justify-center gap-3 mb-16">
          {categoryKeys.map(catKey => (
            <button
              key={catKey}
              onClick={() => setActiveCategoryKey(catKey)}
              className={`px-6 py-3 rounded-pill font-outfit font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategoryKey === catKey 
                  ? 'bg-te-mustard text-te-choc shadow-[0_4px_14px_0_rgba(245,183,49,0.5)]' 
                  : 'bg-te-sand/50 text-te-choc hover:bg-te-sand hover:-translate-y-1'
              }`}
            >
              {t(`menu.cat.${catKey}`)}
            </button>
          ))}
        </div>

        {/* Menu Grid - Modern Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredMenu.map(item => (
            <div key={item.id} className="menu-card bg-te-cream rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={t(`dish.${item.keyName}.name`)} 
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-white/90 backdrop-blur-sm text-te-choc px-4 py-1.5 rounded-pill font-bold text-sm tracking-wide shadow-sm">
                  {t(`menu.cat.${item.catKey}`)}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-outfit font-black text-te-choc mb-2 group-hover:text-te-terra transition-colors">{t(`dish.${item.keyName}.name`)}</h3>
                <p className="text-te-choc-light text-sm mb-6 flex-grow leading-relaxed">{t(`dish.${item.keyName}.desc`)}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-te-sand">
                  <span className="font-outfit font-black text-2xl text-te-mustard drop-shadow-sm">{item.price}</span>
                  <button className="w-10 h-10 rounded-full bg-te-choc text-te-cream flex items-center justify-center hover:bg-te-terra hover:scale-110 transition-all shadow-lg rtl:group-hover:-rotate-180 group-hover:rotate-180 duration-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="menu-header text-center mt-16">
           <a href="tel:+213542225895" className="btn-secondary">{t('hero.cta.order')}</a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
