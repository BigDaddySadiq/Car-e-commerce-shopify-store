"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#E8000D] rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x - 3, y: mousePosition.y - 3, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998]"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 1.5 : 1, borderColor: isHovering ? "rgba(232,0,13,0.5)" : "rgba(255,255,255,0.3)" }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  );
}
