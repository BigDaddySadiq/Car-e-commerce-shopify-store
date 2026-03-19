"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);

 useEffect(() => {
   const fn = () => setScrolled(window.scrollY > 50);
   window.addEventListener("scroll", fn);
   return () => window.removeEventListener("scroll", fn);
 }, []);

 const links = [
   { label: "THE CARS", href: "/#the-cars" },
   { label: "THE PROOF", href: "/#the-proof" },
   { label: "SHOP FULL CATALOG", href: "/shop" },
   { label: "OWN YOURS", href: "/#own-yours" },
 ];

 return (
   <>
     <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
       transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
       className={`fixed top-0 left-0 w-full h-[64px] z-[1000] flex items-center justify-between px-6 md:px-[4vw] transition-all duration-300 ${scrolled ? "bg-[#080808]/80 backdrop-blur-[40px] saturate-[180%] border-b border-white/5" : "bg-transparent"}`}
     >
       <Link href="/" className="group inline-flex flex-col items-start pt-[6px]">
         <span className="font-bebas text-[18px] tracking-[8px] text-white leading-none uppercase">MANIFEST</span>
         <div className="w-full h-[1px] bg-[#E8000D] my-[2px] transition-transform duration-300 group-hover:scale-x-110 origin-left" />
         <span className="font-bebas text-[18px] tracking-[8px] text-[#E8000D] leading-none uppercase">DRIVES</span>
       </Link>
       <div className="hidden md:flex gap-8 items-center">
         {links.map((item, i) => (
           <Link key={i} href={item.href} className={`font-inter font-medium text-[13px] tracking-[2px] uppercase transition-colors duration-300 ${item.label === "SHOP FULL CATALOG" ? "text-white bg-[#E8000D] px-4 py-2 hover:bg-[#FF1A1A]" : "text-[#9A9A9A] hover:text-white"}`}>
             {item.label}
           </Link>
         ))}
       </div>
       <button className="md:hidden text-white p-2" onClick={() => setOpen(true)}><Menu className="w-6 h-6" /></button>
     </motion.nav>
     <AnimatePresence>
       {open && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           className="fixed inset-0 z-[1001] bg-[#080808] flex flex-col items-center justify-center gap-10">
           <button className="absolute top-6 right-6 text-white" onClick={() => setOpen(false)}><X className="w-8 h-8" /></button>
           {links.map((item, i) => (
             <Link key={i} href={item.href} onClick={() => setOpen(false)}
               className={`font-bebas text-[40px] tracking-[4px] ${item.label.includes("SHOP") ? "text-[#E8000D]" : "text-white"}`}>
               {item.label}
             </Link>
           ))}
         </motion.div>
       )}
     </AnimatePresence>
   </>
 );
}
