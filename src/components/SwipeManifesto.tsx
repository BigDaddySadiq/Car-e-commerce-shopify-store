"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function SwipeManifesto() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <section className="bg-[#0F0F0F] flex flex-col md:flex-row overflow-hidden border-b border-white/[0.04]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-10 md:p-[8vw] flex flex-col justify-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="font-inter text-[11px] tracking-[5px] text-[#E8000D] uppercase mb-10">
          WHY THIS EXISTS
        </motion.div>
        
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}} className="font-bebas text-[36px] md:text-[56px] leading-[1.0] text-white tracking-[1px] mb-8">
          IT ALL STARTED WITH A GUY <br className="hidden md:block"/>SEARCHING UP HIS DREAM CAR.
        </motion.div>
        
        <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:0.8, delay:0.3, ease:"circOut"}} className="w-[80px] h-[3px] bg-[#E8000D] origin-left mb-12" />

        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.8, delay:0.5}} className="font-inter text-[16px] md:text-[18px] leading-relaxed text-[#9A9A9A] mb-12">
          <p className="mb-2">He found it. Saved it. Forgot it.</p>
          <p className="mb-8">The dream faded because nothing kept it alive.</p>
          
          <p className="text-white font-bold text-[20px] md:text-[24px] mb-8">That can't happen to yours.</p>
          
          <p className="mb-2">Keep it on your desk.</p>
          <p className="mb-2">Keep it in your line of sight.</p>
          <p>Every single morning.</p>
        </motion.div>

        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1, delay:0.8}} className="font-inter font-bold text-[13px] tracking-[3px] text-[#E8000D] uppercase">
          NEVER OUT OF SIGHT. NEVER OUT OF REACH.
        </motion.p>
      </div>

      {/* Right Content - Before/After Slider */}
      <div 
        ref={containerRef}
        className="w-full md:w-1/2 bg-[#0A0A0A] h-[450px] md:h-auto md:min-h-[700px] relative overflow-hidden select-none cursor-ew-resize border-l border-white/[0.04]"
        onPointerMove={handleMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Base Layer: TOMORROW IN YOUR DRIVEWAY (Right side) */}
        <div className="absolute inset-0 z-10">
          <img src="https://manifestdrives.shop/assets/swipe/car-driveway.png" alt="Tomorrow in your driveway" className="w-full h-full object-cover pointer-events-none" draggable="false" />
          <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-right">
            <div className="font-inter text-[10px] tracking-[4px] text-[#E8000D] uppercase mb-1">TOMORROW</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-xl">IN YOUR DRIVEWAY</div>
          </div>
        </div>

        {/* Top Layer: TODAY ON YOUR DESK (Left side) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src="https://manifestdrives.shop/assets/swipe/car-desk.png" alt="Today on your desk" className="w-full h-full object-cover pointer-events-none" draggable="false" />
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12">
            <div className="font-inter text-[10px] tracking-[4px] text-[#E8000D] uppercase mb-1 drop-shadow-xl">TODAY</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-xl">ON YOUR DESK</div>
          </div>
        </div>

        {/* Draggable Handle Line */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-[2px] bg-[#E8000D] pointer-events-none flex items-center justify-center shadow-[0_0_20px_rgba(232,0,13,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-[42px] h-[42px] rounded-full bg-black/90 backdrop-blur-md border border-[#E8000D] flex items-center justify-center text-[#E8000D] shadow-[0_0_20px_rgba(232,0,13,0.8)] absolute -translate-x-[20px]">
            <span className="text-[10px] tracking-[1px] transform scale-150">&larr;&rarr;</span>
          </div>
        </div>

        {/* Floating DRAG hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-inter text-[10px] tracking-[4px] text-white/50 uppercase flex items-center gap-2">
          &larr; DRAG &rarr;
        </div>
      </div>
    </section>
  );
}
