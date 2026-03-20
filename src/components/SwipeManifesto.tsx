"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function SwipeManifesto() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
    const rect = rectRef.current;
    
    // Optional pointer capture allows dragging even if mouse exits the bounding box
    e.currentTarget.setPointerCapture(e.pointerId);

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !rectRef.current) return;
    const rect = rectRef.current;
    
    // Utilize rAF to ensure style transitions don't block the JS main thread on extreme mouse movement
    window.requestAnimationFrame(() => {
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img src="https://manifestdrives.shop/assets/swipe/car-driveway.png" alt="Tomorrow in your driveway" className="w-full h-full object-cover" draggable="false" />
          {/* Subtle gradient overlay to dramatically boost the text contrast against the bright driveway */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-right z-10">
            <div className="font-inter font-semibold text-[11px] tracking-[4px] text-[#E8000D] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TOMORROW</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">IN YOUR DRIVEWAY</div>
          </div>
        </div>

        {/* Top Layer: TODAY ON YOUR DESK (Left side) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src="https://manifestdrives.shop/assets/swipe/car-desk.png" alt="Today on your desk" className="w-full h-full object-cover" draggable="false" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-10">
            <div className="font-inter font-semibold text-[11px] tracking-[4px] text-[#E8000D] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TODAY</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">ON YOUR DESK</div>
          </div>
        </div>

        {/* Draggable Handle Line */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-[2px] bg-[#E8000D] pointer-events-none flex items-center justify-center shadow-[0_0_20px_rgba(232,0,13,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Recreated circular icon with specific separated arrows */}
          <div className="w-[48px] h-[48px] rounded-full bg-[#0A0A0A] border-[1.5px] border-[#E8000D] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] absolute -translate-x-[24px]">
            <div className="flex items-center gap-[6px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8000D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8000D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating DRAG hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-inter font-bold text-[10px] tracking-[4px] text-white/50 uppercase flex items-center gap-2 drop-shadow-md">
          &larr; DRAG &rarr;
        </div>
      </div>
    </section>
  );
}
