import { motion } from 'framer-motion';
import Breadcrumb from '../components/common/Breadcrumb';
import { ABOUT_BG_IMAGE, SITE_CONFIG } from '../constants/site';
import storyBackground from '../assets/img/our-story.avif';

export default function About() {
  return (
    <div className="inset-0 w-full h-full px-auto pt-12 pb-12  bg-cover bg-center" style={{backgroundImage: `url(${storyBackground})`}}>
    
  
      <section className="relative h-[40vh] md:h-[50vh]" 
      >
       
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-6xl font-medium text-alabaster"
          >
            About FrescoBello
          </motion.h1>
        </div>
      </section>
       
      <div className="md:px-4 md:px-8 lg:px-12 py-12 " >
        <div className="max-w-4xl mx-auto">

      
          <Breadcrumb 
            items={[
              { label: 'Home', path: '/' },
              { label: 'About Us' },
            ]}
          />
        

          {/* Story */}
          
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }} 
            className="m-auto w-[17rem] md:w-1/2 bg-[#F5CE5A]/70 md:p-10 lg:p-14 "
          >
            <div className='w-[16rem] p-4 lg:w-[20rem] '>
            <h2 className="font-heading text-3xl text-white whitespace-nowrap md:text-4xl font-medium mb-6" >
              How It All Started
            </h2>
            <p className="text-base text-white leading-relaxed mb-4">
              FrescoBello was born from a passion for authentic Italian cuisine and a
              commitment to exceptional quality.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              Our journey began with Bello Restaurant, where founder Belay Shiberu dedicated
              himself to serving high-quality Italian meals made with care and passion. As the
              restaurant grew, he recognized a challenge that many restaurants and food businesses
              face: producing fresh, high-quality pasta consistently and in large quantities
              without compromising quality.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              Driven by this vision, he invested in advanced Italian pasta-making technology, a
              professional Domino pasta machine capable of producing a wide variety of fresh pasta
              efficiently and at commercial scale.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              Today, FrescoBello produces premium fresh pasta in many different shapes and styles,
              including Alfredo pasta, Pappardelle, Tagliatelle, Linguine, Lasagna Sheets, and many
              more. Every product is crafted with precision, using professional equipment while
              maintaining the authentic taste and texture that Italian cuisine is known for.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              At FrescoBello, we make food with love and passion. Our commitment to quality is
              reflected in every product we create, and our customers recognize the difference in
              both taste and consistency.
            </p>
            <p className="text-base text-white leading-relaxed">
              We believe our journey has been guided by God's grace. Rather than simply claiming
              excellence, we let the quality of our products and the trust of our customers speak
              for themselves.
            </p>
            </div>
          </motion.section>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-12 p-4 mt-4 m-auto w-[17rem]  md:w-1/2 bg-[#F5CE5A]/70"
          >
            <h2 className="font-heading text-3xl text-white md:text-4xl font-medium mb-6">Our Mission</h2>
            <p className="text-base text-white leading-relaxed mb-4">
              Our vision extends far beyond serving our own restaurant.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              FrescoBello exists to provide premium fresh pasta for homes, restaurants, hotels,
              supermarkets, catering businesses, airlines, and commercial kitchens. Our goal is to
              become Ethiopia's trusted producer of fresh Italian pasta while expanding to serve
              customers across the region and eventually around the world.
            </p>
            <p className="text-base text-white leading-relaxed mb-4">
              By combining authentic Italian craftsmanship with modern production technology, we
              aim to make fresh, high-quality pasta accessible to everyone.
            </p>
            <p className="text-base text-white leading-relaxed">
              Wherever great food is served, we want FrescoBello to be part of the experience.
            </p>
          </motion.section>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <p className="font-heading text-2xl md:text-3xl font-medium text-white">
              {SITE_CONFIG.tagline}
            </p>
          </motion.div>
        </div>
      </div>
      </div>
   
  );
}