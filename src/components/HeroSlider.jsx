
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import slides from '@/data/heroSlides.json';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000); // Increased interval for better user experience
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

  return (
    <section className="relative bg-muted overflow-hidden" aria-label="Hero slider">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[450px] md:h-[550px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <div className="relative h-full flex items-center justify-center">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={slides[currentSlide].title}
                  src={slides[currentSlide].image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link to="/categories">
                      <Button size="lg" variant="secondary">
                        Explora el Marketplace
                      </Button>
                    </Link>
                    <Link to="/user?action=publish">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Publica tu producto
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 p-2 rounded-full shadow-lg transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 p-2 rounded-full shadow-lg transition-colors"
            aria-label="Siguiente slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'}`}
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
