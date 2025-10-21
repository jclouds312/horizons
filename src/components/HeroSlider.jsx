
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import slides from '@/data/heroSlides.json';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleFeatureClick = () => {
    toast({
      title: "Próximamente",
      description: "🚧 Esta funcionalidad estará disponible pronto. ¡Mantente atento! 🚀"
    });
  };

  return (
    <section className="relative bg-gray-50 overflow-hidden" aria-label="Hero slider">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[400px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <div className="relative h-full flex items-center justify-center">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={slides[currentSlide].title}
                 src="https://images.unsplash.com/photo-1691527385266-62295bbcabb1" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center px-4 max-w-3xl">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200" onClick={handleFeatureClick}>
                      Explora el Marketplace
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleFeatureClick}>
                      Publica tu producto
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            aria-label="Siguiente slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-gray-400'}`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
