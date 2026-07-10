import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../constants/categories';
import AnimatedSection from '../../components/animations/AnimatedSection';

export default function BrowseByCategory() {
  return (
    <AnimatedSection className="py-16 md:py-18">
      <div className="px-4 md:px-8 lg:px-12 pt-8 mb-12">
        <h2 className="font-heading text-3xl text-center md:text-4xl font-medium">Browse by Category</h2>
        <p className="text-sm text-center font-bold text-muted-foreground mt-2">Find your favorite pasta shape</p>
      </div>
      <div className="grid grid-flow-col auto-cols-[20rem] md:hide-scrollbar gap-12 ml-4 overflow-x-auto px-4 md:px-8 lg:px-12 pb-4 snap-x">
        {CATEGORIES.map((cat, index) => (
           <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
          <Link
            key={cat.id}
            to={`/shop?category=${cat.slug}`}
            className="flex flex-col items-center min-w-[120px] md:min-w-[160px] snap-start group"
          >
            <div className="aspect-square h-[20rem] w-full bg-platinum mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <span className="text-md font-heading group-hover:text-gold transition-colors">
              {cat.name}
            </span>
          </Link>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}