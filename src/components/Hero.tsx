"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Updated from BMW to Tesla per user instructions
const CARS = [
 { id:"tesla", handle:"1-24-r-roadster-high-simulation-diecast-metal-alloy-model-car-sound-light-pull-back-collection-kids-toy-gifts", tab:"TESLA ROADSTER", headline:"THE FIRST STEP.", subline:"Every man who owns the real car started somewhere.", video:"/assets/hero/hero-tesla.mp4", videoPosition:"center center" },
 { id:"sto", handle:"1-18-lamborghini-huracan-sterrato-supercar-alloy-diecast-model-car-home-ornaments-computer-desktop-decoration-simulation-vehicle", tab:"HURACÁN STO", headline:"THE DREAM IS REAL.", subline:"Keep it where you can see it. Every morning.", video:"/assets/hero/hero-sto.mp4", videoPosition:"center center" },
 { id:"gt3", handle:"1-36-porsche-911-992-gt3-rs-alloy-track-racing-car-model-diecast-metal-sports-car-vehicles-model-simulation-collection-kids-gift", tab:"PORSCHE GT3 RS", headline:"BUILT FOR THOSE WHO KNOW.", subline:"The men who own these cars once held one like this.", video:"/assets/hero/hero-gt3.mp4", videoPosition:"65% center" },
];

export default function Hero() {
 const [activeIdx, setActiveIdx] = useState(0);
 const [mounted, setMounted] = useState(false);
 const { scrollY } = useScroll();
 const backgroundY = useTransform(scrollY, [0, 1000], [0, 400]);

 useEffect(() => {
   setTimeout(() => setMounted(true), 0);
   const interval = setInterval(() => setActiveIdx(p => (p + 1) % CARS.length), 6000);
   return () => clearInterval(interval);
 }, []);

 const car = CARS[activeIdx];

 return (
   <section id="own-yours" className="relative h-screen w-full overflow-hidden bg-[#080808] flex flex-col justify-center">
     <motion.div style={{ y: backgroundY }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
       {mounted && CARS.map((c, idx) => (
         <video key={c.id} src={c.video} autoPlay loop muted playsInline
           style={{ objectPosition: c.videoPosition }}
           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activeIdx ? "opacity-80" : "opacity-0"}`}
         />
       ))}
     </motion.div>
     <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(8,8,8,0.75)_0%,rgba(8,8,8,0.3)_35%,transparent_60%)]" />
     <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between px-4 md:px-8 pointer-events-none">
       <button onClick={() => setActiveIdx(p => (p - 1 + CARS.length) % CARS.length)} className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white/50 hover:text-white backdrop-blur-md hidden md:block"><ChevronLeft size={32} strokeWidth={1.5} /></button>
       <button onClick={() => setActiveIdx(p => (p + 1) % CARS.length)} className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-black/50 border border-white/10 text-white/50 hover:text-white backdrop-blur-md hidden md:block"><ChevronRight size={32} strokeWidth={1.5} /></button>
     </div>
     <div className="relative z-10 w-full px-6 md:pl-[4vw] xl:pl-[8vw] max-w-[600px] mt-12 md:mt-0">
       <AnimatePresence mode="wait">
         <motion.div key={car.id} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }} transition={{ duration:0.5, ease:[0.25,0.46,0.45,0.94] }}>
           <h1 className="font-bebas text-[clamp(64px,10vw,120px)] text-white leading-[0.87] mb-6 uppercase">{car.headline}</h1>
           <p className="font-inter text-[16px] text-[#9A9A9A] max-w-[360px] leading-relaxed mb-10">{car.subline}</p>
             {mounted ? (
               // @ts-ignore custom element
               <shopify-context type="product" handle={car.handle}>
                 <template dangerouslySetInnerHTML={{ __html: `
                   <button class="inline-flex items-center justify-center font-bebas text-[16px] tracking-[4px] px-10 py-4 uppercase text-white bg-[#E8000D] transition-all hover:bg-white hover:text-black" onclick="document.getElementById('cart').addLine(event); document.getElementById('cart').showModal();">
                     <span>CLAIM YOURS</span>
                   </button>
                 ` }} />
               </shopify-context>
             ) : (
               <button className="inline-flex items-center justify-center font-bebas text-[16px] tracking-[4px] px-10 py-4 uppercase text-transparent bg-[#E8000D] pointer-events-none">CLAIM YOURS</button>
             )}
         </motion.div>
       </AnimatePresence>
     </div>
   </section>
 );
}
