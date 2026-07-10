import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { ABOUT_BG_IMAGE } from '../../constants/site';
import fresco from '../../assets/img/fresco.avif';
export default function FrescoBelloSection() {
  return (
    <section className="relative min-h-[35rem] border-b-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={fresco}
          alt="FrescoBello restaurant interior"
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
          About Us
        </h2>
        <p className="text-base text-center md:text-lg text-alabaster/80 leading-relaxed mb-8">
          Our journey began with Bello Restaurant, where founder Belay Shiberu dedicated
          himself to serving high-quality Italian meals made with care and passion.
        </p>
        
        <div className='flex items-center justify-center'>
          <Button to="/about" variant="light" size="lg" className='hover:text-gold hover:border-gold'>
          About Us
        </Button>
        </div>
      </motion.div>
    </section>
  );
}