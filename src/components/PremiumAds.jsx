import React from 'react';
import { motion } from 'framer-motion';

const adsData = [
  { id: 1, title: 'Anuncio Premium 1', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070' },
  { id: 2, title: 'Anuncio Premium 2', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070' },
  { id: 3, title: 'Anuncio Premium 3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070' },
  { id: 4, title: 'Anuncio Premium 4', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070' },
  { id: 5, title: 'Anuncio Premium 5', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=2070' },
  { id: 6, title: 'Anuncio Premium 6', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964' },
  { id: 7, title: 'Anuncio Premium 7', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1965' },
  { id: 8, title: 'Anuncio Premium 8', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964' },
  { id: 9, title: 'Anuncio Premium 9', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964' },
  { id: 10, title: 'Anuncio Premium 10', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070' },
];

const duplicatedAds = [...adsData, ...adsData];

const PremiumAds = () => {
  const carouselVariants = {
    animate: {
      x: ['-100%', '0%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: adsData.length * 5, 
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-12 bg-white" aria-label="Anuncios premium">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Anuncios Premium</h2>
        <div className="w-48 h-1 mx-auto mb-6 brand-divider"></div>
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex"
            variants={carouselVariants}
            animate="animate"
            style={{ scale: 1.1 }} 
          >
            {duplicatedAds.map((ad, index) => (
              <div key={index} className="flex-shrink-0 w-1/5 px-2">
                <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden group">
                  <div className="aspect-video relative">
                    <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={ad.title} src={ad.image} />
                    <div className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded">
                      Anuncio
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumAds;