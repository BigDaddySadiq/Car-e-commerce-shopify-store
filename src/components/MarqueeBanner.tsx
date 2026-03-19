"use client";
const ITEMS = Array(3).fill(["✈️ FREE WORLDWIDE SHIPPING","♦ 6–12 DAY DELIVERY","⭐ PREMIUM PACKAGING","✔ 100% SATISFACTION GUARANTEED"]).flat();

export default function MarqueeBanner({ variant = "dark" }: { variant?: "dark" | "red" }) {
 const isDark = variant === "dark";
 return (
   <div className={`w-full overflow-hidden py-3 flex border-y ${isDark ? "bg-[#0A0A0A] border-white/[0.06]" : "bg-[#E8000D] border-[#E8000D]"}`}>
     <div className="flex w-max animate-marquee">
       {ITEMS.map((item, i) => (
         <span key={i} className={`inline-flex items-center gap-6 px-10 font-inter text-[12px] tracking-[3px] uppercase whitespace-nowrap ${isDark ? "text-[#9A9A9A]" : "text-white"}`}>
           {item}<span className={isDark ? "text-[#E8000D]" : "text-white/60"}>•</span>
         </span>
       ))}
     </div>
     <style dangerouslySetInnerHTML={{ __html: `
       @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
       .animate-marquee { animation: marquee 28s linear infinite; }
       .animate-marquee:hover { animation-play-state: paused; }
     ` }} />
   </div>
 );
}
