import { motion } from 'framer-motion';
import { Cog, Factory, Wheat, BadgeCheck, UtensilsCrossed, Home } from 'lucide-react';
import { WHY_CHOOSE_US } from '../../constants/site';
import AnimatedSection from '../../components/animations/AnimatedSection';

const ICONS = { Cog, Factory, Wheat, BadgeCheck, UtensilsCrossed, Home };

export default function WhyChooseUs() {
  return (
    <AnimatedSection className="py-16 border-b-4 bg-obsidian text-alabaster md:py-14">
      <div className="px-4 md:px-8 lg:px-12">
        <h2 className="font-heading text-3xl md:text-4xl font-medium mb-12 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-4 p-6 md:p-8"
              >
                {Icon && (
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center text-gold">
                    <Icon size={28} />
                  </div>
                )}
                <p className="text-sm font-heading font-medium">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
   
    </AnimatedSection>
    
  );
}