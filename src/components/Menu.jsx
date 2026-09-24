import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import ALL images from ataturk folder
const images = import.meta.glob('../ataturk/*.{jpg,jpeg,png,jfif}', { eager: true });

// Filter and map images
const allMenuImages = Object.keys(images).map((path, index) => {
  const url = images[path].default;
  const filename = path.split('/').pop().toLowerCase();
  
  // Exclude the 5 restaurant interior photos from the menu
  const ambianceFiles = [
    '1.jpg', 
    '2.jpg', 
    '631644074_18098805482497697_4068700066609320752_n.jpg', 
    '631724104_18098805473497697_4960421071865122402_n.jpg', 
    'ataturk-13-scaled.jpg'
  ];
  if (ambianceFiles.includes(filename)) return null;

  let catKey = "autres";
  
  if (filename.includes("grillard")) catKey = "grillades";
  else if (filename.includes("entré") || filename.includes("entree")) catKey = "entrees";
  else if (filename.includes("boisson") || filename.includes("boissin")) catKey = "boissons";
  else if (filename.includes("desert") || filename.includes("dessert")) catKey = "desserts";

  return {
    id: index,
    image: url,
    catKey,
  };
}).filter(Boolean);

const categoryKeys = ["all", "grillades", "entrees", "boissons", "desserts", "autres"];

const Menu = () => {
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");
  const { t } = useLanguage();
  const container = useRef(null);
  const gridRef = useRef(null);
  
  // Modal state for zooming
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredMenu = activeCategoryKey === "all" 
    ? allMenuImages 
    : allMenuImages.filter(item => item.catKey === activeCategoryKey);

  useGSAP(() => {
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
  }, { scope: container });

  useGSAP(() => {
    if (!gridRef.current) return;
    gsap.killTweensOf('.menu-card');
    gsap.fromTo('.menu-card', 
      { y: 30, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  }, { dependencies: [activeCategoryKey], scope: container });

  return (
    <section id="menu" ref={container} className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="text-center mb-16">
          <span className="menu-header pill-badge bg-te-cream inline-block mb-6 shadow-sm border border-te-sand/30">{t('menu.badge')}</span>
          <h2 className="menu-header text-5xl md:text-6xl text-te-choc mb-6">{t('menu.title1')} <span className="text-te-terra">{t('menu.title2')}</span></h2>
          <p className="menu-header text-te-choc-light max-w-2xl mx-auto text-lg">{t('menu.subtitle')}</p>
        </div>

        {/* Categories (Pills) */}
        <div className="menu-header flex flex-wrap justify-center gap-3 mb-16">
          {categoryKeys.map(catKey => (
            <button
              key={catKey}
              onClick={() => setActiveCategoryKey(catKey)}
              className={`px-8 py-3 rounded-pill font-outfit font-bold uppercase tracking-widest transition-all duration-300 text-sm border ${
                activeCategoryKey === catKey 
                  ? 'bg-te-mustard border-te-mustard text-white shadow-[0_6px_20px_0_rgba(245,183,49,0.4)] scale-105' 
                  : 'bg-white border-te-sand/50 text-te-choc hover:border-te-mustard/50 hover:text-te-mustard hover:-translate-y-1'
              }`}
            >
              {t(`menu.cat.${catKey}`)}
            </button>
          ))}
        </div>

        {/* Mixed Aspect Ratio Gallery (Masonry Layout) */}
        <div ref={gridRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filteredMenu.map(item => (
            <div 
              key={item.id} 
              className="menu-card relative rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_30px_rgb(212,175,55,0.25)] transition-all duration-500 group cursor-pointer bg-transparent break-inside-avoid w-full border border-te-sand/30 inline-block"
              onClick={() => setSelectedImage(item.image)}
            >
              {/* Image filling the container naturally */}
              <img 
                src={item.image} 
                alt="Menu Item" 
                loading="lazy"
                className="w-full h-auto block object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Interactive Hover Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                 <div className="bg-te-mustard text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                 </div>
              </div>

              {/* Category Badge Floating Top Right */}
              <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-white/95 backdrop-blur-md text-te-choc px-4 py-1.5 rounded-full font-outfit font-bold text-xs tracking-widest uppercase shadow-lg border border-white/20">
                {t(`menu.cat.${item.catKey}`)}
              </div>
            </div>
          ))}
        </div>
        
        {filteredMenu.length === 0 && (
          <div className="text-center text-te-choc-light py-20 font-medium">
            Aucun élément dans cette catégorie.
          </div>
        )}

        <div className="menu-header text-center mt-20">
           <a href="tel:+213555854463" className="btn-secondary px-12 py-4 text-lg">{t('hero.cta.order')}</a>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 md:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-te-mustard transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Menu Fullscreen" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-[zoomIn_0.3s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()} 
          />
          <style>{`
            @keyframes zoomIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default Menu;
