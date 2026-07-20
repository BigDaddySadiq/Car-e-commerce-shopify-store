"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function SwipeManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const positionRef = useRef(50);
  const pendingClientXRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const applyPosition = (position: number, width?: number) => {
    const container = containerRef.current;
    if (!container) return;

    const safePosition = Math.max(0, Math.min(position, 100));
    const containerWidth = width ?? container.getBoundingClientRect().width;
    positionRef.current = safePosition;
    container.style.setProperty(
      "--slider-x",
      `${(safePosition / 100) * containerWidth}px`,
    );
    container.setAttribute("aria-valuenow", String(Math.round(safePosition)));
  };

  const schedulePointerUpdate = (clientX: number) => {
    pendingClientXRef.current = clientX;
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      const rect = rectRef.current;
      const pendingClientX = pendingClientXRef.current;
      if (!rect || pendingClientX === null || rect.width === 0) return;

      const x = Math.max(0, Math.min(pendingClientX - rect.left, rect.width));
      applyPosition((x / rect.width) * 100, rect.width);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      rectRef.current = rect;
      applyPosition(positionRef.current, rect.width);
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    pointerIdRef.current = e.pointerId;
    rectRef.current = e.currentTarget.getBoundingClientRect();
    e.currentTarget.dataset.dragging = "true";
    e.currentTarget.setPointerCapture(e.pointerId);
    schedulePointerUpdate(e.clientX);
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const coalescedEvents = e.nativeEvent.getCoalescedEvents?.();
    const latestEvent = coalescedEvents?.[coalescedEvents.length - 1];
    schedulePointerUpdate(latestEvent?.clientX ?? e.clientX);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    pointerIdRef.current = null;
    e.currentTarget.dataset.dragging = "false";
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleLostPointerCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current === e.pointerId) pointerIdRef.current = null;
    e.currentTarget.dataset.dragging = "false";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const largeStep = e.shiftKey ? 10 : 2;
    let nextPosition = positionRef.current;

    if (e.key === "ArrowLeft") nextPosition -= largeStep;
    else if (e.key === "ArrowRight") nextPosition += largeStep;
    else if (e.key === "Home") nextPosition = 0;
    else if (e.key === "End") nextPosition = 100;
    else return;

    e.preventDefault();
    applyPosition(nextPosition);
  };

  return (
    <section className="bg-[#0F0F0F] flex flex-col md:flex-row overflow-hidden border-b border-white/[0.04]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 px-6 py-16 sm:p-10 md:p-[8vw] flex flex-col justify-center">
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
          
          <p className="text-white font-bold text-[20px] md:text-[24px] mb-8">That can&apos;t happen to yours.</p>
          
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
        role="slider"
        tabIndex={0}
        aria-label="Compare the model car on a desk with the real car in a driveway"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        data-dragging="false"
        className="swipe-slider w-full md:w-1/2 bg-[#0A0A0A] h-[clamp(450px,122vw,540px)] md:h-auto md:min-h-[700px] relative overflow-hidden select-none cursor-ew-resize border-y md:border-y-0 md:border-l border-white/[0.06] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8000D]"
        onPointerMove={handleMove}
        onPointerDown={handlePointerDown}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={handleLostPointerCapture}
        onKeyDown={handleKeyDown}
      >
        {/* Base Layer: TOMORROW IN YOUR DRIVEWAY (Right side) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image src="/assets/swipe/car-driveway.webp" alt="Tomorrow in your driveway" fill sizes="(max-width: 767px) 100vw, 50vw" quality={85} className="object-cover" draggable={false} />
          {/* Subtle gradient overlay to dramatically boost the text contrast against the bright driveway */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 text-right z-10">
            <div className="font-inter font-semibold text-[11px] tracking-[4px] text-[#E8000D] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TOMORROW</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">IN YOUR DRIVEWAY</div>
          </div>
        </div>

        {/* Top Layer: TODAY ON YOUR DESK (Left side) */}
        <div 
          className="swipe-reveal absolute inset-0 z-20 pointer-events-none"
        >
          <Image src="/assets/swipe/car-desk.webp" alt="Today on your desk" fill sizes="(max-width: 767px) 100vw, 50vw" quality={85} className="object-cover" draggable={false} />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-10">
            <div className="font-inter font-semibold text-[11px] tracking-[4px] text-[#E8000D] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TODAY</div>
            <div className="font-bebas text-[24px] md:text-[36px] text-white tracking-[2px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">ON YOUR DESK</div>
          </div>
        </div>

        {/* Draggable Handle Line */}
        <div 
          className="swipe-divider absolute top-0 bottom-0 z-30 w-[2px] bg-[#E8000D] pointer-events-none flex items-center justify-center shadow-[0_0_20px_rgba(232,0,13,0.5)]"
        >
          {/* Recreated circular icon with specific separated arrows */}
          <div className="swipe-handle w-[52px] h-[52px] rounded-full bg-[#0A0A0A]/95 border-[1.5px] border-[#E8000D] flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.85)] absolute left-1/2 backdrop-blur-sm">
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
        <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none font-inter font-bold text-[10px] tracking-[4px] text-white/60 uppercase flex items-center gap-2 drop-shadow-md whitespace-nowrap">
          &larr; DRAG &rarr;
        </div>
      </div>
    </section>
  );
}
