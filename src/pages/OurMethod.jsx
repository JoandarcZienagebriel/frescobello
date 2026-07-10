import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { METHOD_PHASES } from '../constants/site';
import Breadcrumb from '../components/common/Breadcrumb';

export default function MethodPhase({ phase, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const textY = useTransform(scrollYProgress,  [0, 0.5],[40, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1],
  [1, 1, 1, 1]);

  return (
    <div >
      {/* Breadcrumb */}
      <div className="px-4 mt-[8rem] md:px-8 lg:px-12">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Our Method" },
          ]}
        />
      </div>

              {METHOD_PHASES.map((phase, index)=>(
                
<div key={index}>
   <motion.div
        className="absolute sticky inset-0 top-0"
       
      >
        <img
          src={phase.image}
          alt={phase.title}
          className="w-full h-[50rem] object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-obsidian/40" />
      </motion.div>
<motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 px-2 md:px-8 lg:px-12 max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="font-heading text-5xl md:text-7xl font-bold text-gold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-gold" />
        </div>
         <div className="h-full flex flex-col items-center justify-center m-auto p-4">
            <h2 className="font-heading text-3xl  md:text-5xl text-alabaster mb-3">
            {phase.title}
          </h2>

          <p className="text-sm md:text-base uppercase tracking-wider text-gold mb-6">
            {phase.subtitle}
          </p>

          <p className="text-alabaster pb-[5rem] max-w-2xl leading-relaxed">
            {phase.description}
          </p>
          </div>
          </motion.div>
           <div className="sticky bottom-20 z-20 left-0 right-0 flex justify-end pr-2">
        <span className="text-sm uppercase p-1 tracking-wider text-alabaster/50">
          {index + 1} / 8
        </span>
      </div>

       
          </div>
         
     
       
          ))}
 
         
       

    
    </div>
  )
}