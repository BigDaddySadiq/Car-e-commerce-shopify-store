"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const MANIFESTO_LINES = [
  "You do not settle.",
  "You do not compromise.",
  "You know what it takes to own the real thing.",
  "Which is why you start by owning it in your hand."
];

export default function SwipeManifesto() {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#0F0F0F] flex flex-col md:flex-row overflow-hidden border-b border-white/[0.04]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-10 md:p-[8vw] flex flex-col justify-center">
        <div className="font-inter text-[11px] tracking-[5px] text-[#E8000D] uppercase mb-10">THE MANIFESTO</div>
        <div className="font-bebas text-[32px] md:text-[48px] leading-[1.1] text-white tracking-[1px] mb-12">
          {MANIFESTO_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <motion.div
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="pb-2 text-[#9A9A9A] hover:text-white transition-colors duration-300"
              >
                {line}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
          className="w-[80px] h-[3px] bg-[#E8000D] origin-left mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-inter font-bold text-[13px] tracking-[3px] text-[#E8000D] uppercase"
        >
          NEVER OUT OF SIGHT. NEVER OUT OF REACH.
        </motion.p>
      </div>

      {/* Right Content - Drag Carousel */}
      <div ref={carouselRef} className="w-full md:w-1/2 bg-black h-[400px] md:h-auto min-h-[500px] relative overflow-hidden flex items-center justify-start border-l border-white/[0.04] py-8 pl-8 md:pl-12 pr-0">
        <motion.div 
          className="flex cursor-grab active:cursor-grabbing gap-6 items-center"
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 35 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Images representing the 3 cars */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[280px] md:w-[380px] aspect-[4/5] flex-shrink-0 bg-[#0A0A0A] overflow-hidden pointer-events-none border border-white/5 shadow-2xl relative group"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={`/us-t${i}.jpg`} alt="Lifestyle" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" draggable="false" />
            </motion.div>
          ))}
          {/* Invisible spacer right pad to maintain visual margin against the border when dragged all the way */}
          <div className="w-[8px] md:w-[12px] flex-shrink-0" />
        </motion.div>
        
        {/* Swipe instruction overlay */}
        <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-20 pointer-events-none font-inter text-[11px] tracking-[4px] text-white/50 bg-black/60 backdrop-blur-lg px-5 py-3 border border-white/10 rounded-full flex gap-3 items-center uppercase shadow-2xl">
          <span className="animate-pulse">&larr;&rarr;</span> Drag to view
        </div>
      </div>
    </section>
  );
}
