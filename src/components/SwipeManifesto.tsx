"use client";
import { motion } from "framer-motion";

const MANIFESTO_LINES = [
  "You do not settle.",
  "You do not compromise.",
  "You know what it takes to own the real thing.",
  "Which is why you start by owning it in your hand."
];

export default function SwipeManifesto() {
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
      <div className="w-full md:w-1/2 bg-black h-[400px] md:h-auto min-h-[500px] relative overflow-hidden flex items-center justify-center border-l border-white/[0.04]">
        <motion.div 
          className="flex cursor-grab active:cursor-grabbing gap-4 px-12 items-center"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Images created by combining generated images to showcase the lifestyle nature of the brand */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-[#1A1A1A] overflow-hidden pointer-events-none border border-white/5 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Note: The Drag carousel will use our generated testimonial images as lifestyle shots */}
              <img src={`/us-t${i}.jpg`} alt="Lifestyle" className="w-full h-full object-cover opacity-80" draggable="false" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Swipe instruction overlay */}
        <div className="absolute bottom-8 right-8 pointer-events-none font-inter text-[11px] tracking-[4px] text-white/50 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex gap-2 items-center uppercase">
          <span>&larr;</span> Drag to view
        </div>
      </div>
    </section>
  );
}
