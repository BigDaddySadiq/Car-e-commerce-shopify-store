"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PRODUCTS = [
 { id:"tesla", handle:"1-24-r-roadster-high-simulation-diecast-metal-alloy-model-car-sound-light-pull-back-collection-kids-toy-gifts", name:"RED TESLA ROADSTER CONVERTIBLE", specs:"1.9s 0-60 · 250+ MPH", quote:'"The most wanted desk on the way to the most wanted car."', video:"/assets/hero/hero-tesla.mp4" },
 { id:"sto", handle:"1-18-lamborghini-huracan-sterrato-supercar-alloy-diecast-model-car-home-ornaments-computer-desktop-decoration-simulation-vehicle", name:"HURACÁN STO", specs:"V10 · 640 HP · 3.0s", quote:'"Not a toy. A declaration."', video:"/assets/hero/hero-sto.mp4" },
 { id:"gt3", handle:"1-36-porsche-911-992-gt3-rs-alloy-track-racing-car-model-diecast-metal-sports-car-vehicles-model-simulation-collection-kids-gift", name:"PORSCHE 911 GT3 RS", specs:"FLAT-SIX · 525 HP · 9,000 RPM", quote:'"The obsessive\'s anchor."', video:"/assets/hero/hero-porsche.mp4" },
];

export default function Collection() {
 const [mounted, setMounted] = useState(false);
 useEffect(() => { setTimeout(() => setMounted(true), 0); }, []);

 return (
   <section id="the-cars" className="bg-[#080808] px-6 py-[80px] md:px-[8vw] md:py-[120px] flex flex-col items-center">
     <p className="font-inter text-[11px] tracking-[5px] text-[#E8000D] uppercase text-center mb-6">CHOOSE YOUR FIRST STEP</p>
     <h2 className="font-bebas text-[48px] md:text-[80px] leading-none mb-16 tracking-[-2px] uppercase bg-[linear-gradient(180deg,#FFFFFF_0%,#6A6A6A_100%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">YOUR COLLECTION</h2>
     <div className="w-full flex flex-col md:flex-row gap-8">
       {PRODUCTS.map((prod, i) => (
         <motion.div key={prod.id}
           initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-10%"}}
           transition={{duration:0.8, delay: i * 0.15, ease:[0.25,0.46,0.45,0.94]}}
           className="flex-1 overflow-hidden group flex flex-col relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-[20px] transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(232,0,13,0.2)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
         >
           {/* Hover effects */}
           <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,0,13,0.06)_0%,transparent_70%)]" />
           <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 bg-[linear-gradient(90deg,transparent,rgba(232,0,13,0.6)_50%,transparent)]" />
           {/* Video */}
           <div className="relative w-full h-[260px] bg-black overflow-hidden">
             <video src={prod.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
           </div>
           {/* Body */}
           <div className="relative z-10 flex flex-col flex-grow p-8">
             <div className="font-bebas text-[28px] tracking-[2px] text-white mb-2">{prod.name}</div>
             <div className="font-inter text-[12px] tracking-[2px] text-[#9A9A9A] uppercase mb-4">{prod.specs}</div>
             <div className="font-inter text-[14px] italic text-[#6A6A6A] leading-relaxed mb-6">{prod.quote}</div>
              <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.04)] w-full flex flex-col items-center">
                {mounted ? (
                  // @ts-ignore custom element
                  <shopify-context type="product" handle={prod.handle}>
                    <template dangerouslySetInnerHTML={{ __html: `
                      <div class="flex flex-col items-center w-full gap-3 mt-1">
                        <div class="font-bebas text-2xl text-white tracking-[2px]"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></div>
                        <button class="w-full bg-[#E8000D] hover:bg-white hover:text-black transition-colors duration-300 text-white font-bebas text-lg px-6 py-4 uppercase tracking-[3px] shadow-[0_0_20px_rgba(232,0,13,0.3)] mb-2" onclick="document.getElementById('cart').addLine(event); document.getElementById('cart').showModal();">Claim Yours</button>
                      </div>
                    ` }} />
                  </shopify-context>
                ) : (
                  <div className="flex flex-col items-center w-full gap-3 mt-1 opacity-0">
                    <div className="font-bebas text-2xl text-transparent tracking-[2px]">$0.00</div>
                    <button className="w-full bg-[#E8000D] text-transparent font-bebas text-lg px-6 py-4 uppercase tracking-[3px] pointer-events-none mb-2">Claim Yours</button>
                  </div>
                )}
              </div>
           </div>
         </motion.div>
       ))}
     </div>
   </section>
 );
}
