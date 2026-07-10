import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_IMAGES } from '../../constants/site';
import AnimatedSection from '../../components/animations/AnimatedSection';

export default function InstagramGallery() {
  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Instagram size={20} className="text-gold" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            @frescobello
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-medium">From Our Kitchen</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 px-1 md:px-2">
        {INSTAGRAM_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="aspect-square overflow-hidden bg-platinum"
          >
            <img
              src={image}
              alt={`FrescoBello pasta dish ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}