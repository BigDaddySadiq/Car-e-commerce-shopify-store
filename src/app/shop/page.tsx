"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import LazyProductVideo from "@/components/LazyProductVideo";
import { useShopifyStatus } from "@/components/ShopifyProvider";

const PRODUCTS = [
 { id:"tesla", handle:"1-24-r-roadster-high-simulation-diecast-metal-alloy-model-car-sound-light-pull-back-collection-kids-toy-gifts", name:"RED TESLA ROADSTER CONVERTIBLE", specs:"1.9s 0-60 · 250+ MPH", quote:'"The most wanted desk on the way to the most wanted car."', video:"/assets/product/product-tesla.mp4", poster:"/assets/product/product-tesla.webp" },
 { id:"sto", handle:"1-18-lamborghini-huracan-sterrato-supercar-alloy-diecast-model-car-home-ornaments-computer-desktop-decoration-simulation-vehicle", name:"HURACÁN STO", specs:"V10 · 640 HP · 3.0s", quote:'"Not a toy. A declaration."', video:"/assets/product/product-sto.mp4", poster:"/assets/product/product-sto.webp" },
 { id:"gt3", handle:"1-36-porsche-911-992-gt3-rs-alloy-track-racing-car-model-diecast-metal-sports-car-vehicles-model-simulation-collection-kids-gift", name:"PORSCHE 911 GT3 RS", specs:"FLAT-SIX · 525 HP · 9,000 RPM", quote:'"The obsessive\'s anchor."', video:"/assets/product/product-gt3.mp4", poster:"/assets/product/product-gt3.webp" },
];

export default function Shop() {
  const shopifyStatus = useShopifyStatus();

  return (
    <main className="min-h-screen bg-[#080808] selection:bg-[#E8000D] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-start pt-[96px] md:pt-[120px] pb-20 px-4 sm:px-6 max-w-[1440px] mx-auto w-full">
        <h1 className="font-bebas text-[clamp(48px,8vw,96px)] tracking-[2px] text-white uppercase text-center mb-6">THE FULL COLLECTION</h1>
        <p className="font-inter text-sm md:text-base text-[#9A9A9A] text-center max-w-lg mb-10 md:mb-16">All pieces from Real Drive. Precision engineered 1:32 scale die-cast models.</p>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map((prod, i) => (
            <motion.div key={prod.id}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-10%"}}
              transition={{duration:0.8, delay: i * 0.15, ease:[0.25,0.46,0.45,0.94]}}
              className="flex-1 overflow-hidden group flex flex-col relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-[20px] transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(232,0,13,0.2)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,0,13,0.06)_0%,transparent_70%)]" />
              <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 bg-[linear-gradient(90deg,transparent,rgba(232,0,13,0.6)_50%,transparent)]" />
              
              <div className="relative w-full h-[220px] sm:h-[260px] bg-black overflow-hidden border-b border-white/[0.04]">
                <LazyProductVideo src={prod.video} poster={prod.poster} ariaLabel={`${prod.name} showcase`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
                <div className="font-bebas text-[28px] tracking-[2px] text-white mb-2 leading-none">{prod.name}</div>
                <div className="font-inter text-[12px] tracking-[2px] text-[#9A9A9A] uppercase mb-4">{prod.specs}</div>
                <div className="font-inter text-[14px] italic text-[#6A6A6A] leading-relaxed mb-6">{prod.quote}</div>
                
                <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.04)] w-full flex flex-col items-center">
                  {shopifyStatus === "ready" ? (
                    <shopify-context type="product" handle={prod.handle}>
                      <template dangerouslySetInnerHTML={{ __html: `
                        <div class="flex flex-col items-center w-full gap-3 mt-1">
                          <div class="font-bebas text-2xl text-white tracking-[2px]"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></div>
                          <button class="w-full bg-[#E8000D] hover:bg-white hover:text-black transition-colors duration-300 text-white font-bebas text-lg px-6 py-4 uppercase tracking-[3px] shadow-[0_0_20px_rgba(232,0,13,0.3)] mb-2" onclick="document.getElementById('cart').addLine(event); document.getElementById('cart').showModal();">Claim Yours</button>
                        </div>
                      ` }} />
                    </shopify-context>
                  ) : shopifyStatus === "checking" ? (
                    <div className="w-full space-y-3" aria-label="Checking store availability">
                      <div className="h-7 w-24 mx-auto bg-white/10 animate-pulse" />
                      <div className="h-14 w-full bg-white/10 animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full gap-3 mt-1">
                      <div className="font-inter text-[11px] text-[#9A9A9A] tracking-[2px] uppercase">Store temporarily unavailable</div>
                      <button disabled className="w-full bg-white/10 text-white/45 font-bebas text-lg px-6 py-4 uppercase tracking-[3px] cursor-not-allowed mb-2">Coming Back Soon</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
