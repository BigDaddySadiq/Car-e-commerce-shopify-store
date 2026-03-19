"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Shop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main className="min-h-screen bg-[#080808] selection:bg-[#E8000D] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-start pt-[120px] pb-20 px-6 max-w-[1440px] mx-auto w-full">
        <h1 className="font-bebas text-[clamp(48px,8vw,96px)] tracking-[2px] text-white uppercase text-center mb-6">THE FULL COLLECTION</h1>
        <p className="font-inter text-[#9A9A9A] text-center max-w-lg mb-16">All pieces from Real Drive. Precision engineered 1:32 scale die-cast models.</p>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {mounted && (
            // @ts-ignore custom element
            <shopify-list-context type="product" query="products" first="24">
              <template dangerouslySetInnerHTML={{ __html: `
                <div class="flex flex-col group relative h-full">
                  <div class="relative w-full aspect-square bg-[#0F0F0F] flex items-center justify-center overflow-hidden mb-4 border border-white/[0.04]">
                    <shopify-media class="w-full h-full object-cover mix-blend-lighten transition-transform duration-700 group-hover:scale-105" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                  </div>
                  <div class="flex flex-col gap-1 flex-1">
                    <h3 class="font-bebas text-2xl text-white uppercase tracking-[1px] leading-none"><shopify-data query="product.title"></shopify-data></h3>
                    <p class="font-inter text-[#9A9A9A] text-sm"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></p>
                  </div>
                  <div class="mt-4 pt-4 border-t border-white/[0.04] w-full">
                    <button class="w-full bg-white/[0.03] hover:bg-[#E8000D] text-white transition-colors duration-300 font-bebas text-lg px-6 py-3 uppercase tracking-[2px]" onclick="document.getElementById('cart').addLine(event); document.getElementById('cart').showModal();">Quick Add</button>
                  </div>
                </div>
              `}} />
            </shopify-list-context>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
