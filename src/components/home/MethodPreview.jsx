import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import k from '../../assets/img/machine.avif'
export default function MethodPreview() {
  return (
    <section className="relative min-h-[35rem] border-t-8 border-b-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={k}
          alt="FrescoBello pasta production method"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-obsidian/30" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 md:px-8 lg:px-12 max-w-2xl"
      >
        <h2 className="font-heading text-3xl text-center md:text-4xl font-medium text-alabaster mb-6">
          Our Method
        </h2>
        <p className="text-base text-center md:text-lg text-alabaster/80 leading-relaxed mb-8">
          Every product is crafted with precision, using professional equipment while
          maintaining the authentic taste and texture of Italian cuisine.
        </p>
      <div className='flex items-center justify-center'>
          <Button to="/our-method" variant="light" size="lg" className='hover:text-gold hover:border-gold'>
          Our Method
        </Button>
      </div>
      </motion.div>
        
    </section>
    
  );
}