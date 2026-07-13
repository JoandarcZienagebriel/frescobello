import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '../../constants/site';
import Button from '../../components/common/Button';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative h-screen min-h-[600px] w-full overflow-hidden" 
      aria-label="Hero"
      aria-roledescription="carousel"
    >
        
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.tagline}
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
         <div className="absolute inset-0 bg-obsidian/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-start px-8 md:px-16">
      
        <div className="max-w-3xl text-alabaster">
          <AnimatePresence>
            <motion.h1
              key={`title-${current}`}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
             
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading font-bold text-alabaster leading-[1.1] pt-[3rem] md:pt-[5rem]"
              style={{ fontSize: 'clamp(2.5rem, 14vw, 7rem)' }}
            >{slide.name}
             
            </motion.h1>
          </AnimatePresence>
           <AnimatePresence>
            <motion.h4
              key={`desc-${current}`}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#E59500] md:text-lg leading-relaxed"
            >
           {slide.tagline}
            </motion.h4>
          </AnimatePresence>
           <AnimatePresence>
            <motion.h3
              key={`title-${current}`}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
             
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-md font-heading font-bold text-obsidian leading-[1.1] mb-8 pt-4"
              style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}
            >
                 {slide.description}
              
            </motion.h3>
          </AnimatePresence>

         

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Button to="/shop" variant="light" size="lg" className='border border-obsidian active:text-alabaster hover:bg-gold hover:text-alabaster hover:border-alabaster'>
              Shop Now
            </Button>
            <Button to="/about" variant="outline" size="lg" className="border-alabaster text-alabaster btn-fill-gold">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-300 ${
              index === current ? 'w-8 bg-gold' : 'w-4 bg-alabaster/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current}
          />
        ))}
      </div>
    </section>
  );
}