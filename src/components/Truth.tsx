"use client";
import { motion } from "framer-motion";

export default function Truth() {
 return (
   <section id="the-proof" className="bg-[#080808] px-6 py-[80px] md:px-[8vw] md:py-[120px] flex flex-col md:flex-row gap-10 md:gap-[8vw]">
     <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-20%"}} transition={{duration:0.8}} className="flex-1">
       <div className="font-inter text-[11px] tracking-[5px] text-[#E8000D] uppercase mb-8">WHY EVERY MAN DREAMS OF A CAR</div>
       <h2 className="font-bebas text-[44px] md:text-[72px] text-white leading-[0.92] mb-8">MOST MEN<br />DREAM.<br />SCROLL.<br />FORGET.</h2>
       <div className="w-[60px] h-[2px] bg-[#E8000D] mb-8" />
       <div className="font-inter text-[16px] text-[#9A9A9A] leading-relaxed max-w-[440px] space-y-6">
         <p>You know the car. The 0-100. The engine note. The color. You've known it for years.</p>
         <p>Most men leave it on a screen.</p>
         <p>The ones who don't — put something physical in their space. A reminder. Every morning. Until it's real.</p>
       </div>
     </motion.div>
     <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-20%"}} transition={{duration:0.8}} className="flex-1 flex flex-col justify-center">
       <div className="bg-[#0F0F0F] border border-white/[0.04] p-8 md:p-12 flex flex-col gap-8">
         <div>
           <div className="font-inter text-[14px] text-[#E8000D] uppercase mb-2">THE MAN WHO SCROLLS</div>
           <div className="font-inter font-semibold text-[18px] text-white">→ Screenshots it. Never moves toward it.</div>
         </div>
         <div>
           <div className="font-inter text-[14px] text-[#C9A84C] uppercase mb-2">THE MAN WHO ACTS</div>
           <div className="font-inter font-semibold text-[18px] text-white">→ Puts it on his desk. Knows where he's going.</div>
         </div>
       </div>
       <h3 className="font-bebas text-[22px] tracking-[3px] text-[#E8000D] text-center mt-8">WHICH ONE ARE YOU?</h3>
     </motion.div>
   </section>
 );
}
