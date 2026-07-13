import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RECIPES } from '../../constants/recipes';
import AnimatedSection from '../../components/animations/AnimatedSection';

export default function FeaturedRecipes() {
  return (
    <AnimatedSection className="py-16 bg-obsidian border-b-4 border-gold text-alabaster md:py-24">
      <div className="px-4 md:px-8 lg:px-12 mb-8">
        <h2 className="font-heading text-3xl text-center md:text-4xl font-medium">Featured Recipes</h2>
        <p className="text-sm text-center font-bold text-muted-foreground mt-2">Inspiration for your next meal</p>
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar px-4 md:px-8 lg:px-12 pb-4 snap-x">
        {RECIPES.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              to={recipe.redirectTo}
              className="block relative w-[280px] md:w-[440px] h-auto aspect-[4/3] overflow-hidden group"
              aria-label={`${recipe.name} - ${recipe.overlayText}`}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  <h3 className="font-heading text-lg md:text-xl text-alabaster mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-gold">
                    {recipe.overlayText}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-obsidian/80 to-transparent group-hover:opacity-0 transition-opacity">
                <h3 className="font-heading text-lg text-alabaster">{recipe.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}