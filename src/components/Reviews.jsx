import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    id: 1,
    text: "Franchement, j'ai adoré ce restaurant, prix très abordable et qualité top du top. Je recommande fortement.",
    author: "Sirine Sirine",
    rating: 5
  },
  {
    id: 2,
    text: "Très bon restaurant, les serveurs sont souriants et aux petits soins. Les plats étaient très bons et les assiettes très bien remplies.",
    author: "Hadjer Boutarouk",
    rating: 5
  },
  {
    id: 3,
    text: "On est venus de Tizi jusqu'à Blida pour tester ce restaurant et ça valait vraiment le coup ! C'était trop bon, le service était rapide et les serveurs super gentils.",
    author: "Nayis Nës",
    rating: 5
  }
];

const Reviews = () => {
  const { t, language } = useLanguage();
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });

    // Animate Header
    tl.from('.rev-header', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    })
    // Animate Review Cards
    .from('.rev-card', {
      x: language === 'ar' ? 50 : -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    }, "-=0.5");
  }, { dependencies: [language], scope: container });

  return (
    <section id="avis" ref={container} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="rev-header pill-badge bg-te-cream inline-block mb-6">{t('rev.badge')}</span>
          <h2 className="rev-header text-5xl md:text-6xl font-outfit font-black text-te-choc mb-6 uppercase">
            {t('rev.title1')} <span className="text-te-terra">{t('rev.title2')}</span>
          </h2>
          <p className="rev-header text-te-choc-light max-w-2xl mx-auto text-lg">
            {t('rev.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <div key={review.id} className="rev-card bg-te-sand/20 p-8 rounded-[2rem] hover:bg-te-mustard/10 transition-colors duration-300 shadow-sm hover:shadow-xl">
              <div className="flex gap-1 mb-6 text-te-mustard">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className={`text-te-choc-light text-lg mb-8 leading-relaxed italic ${language === 'ar' ? 'font-sans' : 'font-serif'}`}>
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-te-choc rounded-full flex items-center justify-center text-te-cream font-outfit font-bold shadow-md">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-te-choc">{review.author}</h4>
                  <span className="text-sm text-te-choc-light">{t('rev.rating')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
