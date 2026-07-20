"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 320, damping: 28, mass: 0.35 });
  const ringY = useSpring(pointerY, { stiffness: 320, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
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
  }, [pointerX, pointerY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] bg-[#E8000D] rounded-full pointer-events-none z-[9999]"
        style={{ x: pointerX, y: pointerY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isHovering ? 1.5 : 1, borderColor: isHovering ? "rgba(232,0,13,0.5)" : "rgba(255,255,255,0.3)" }}
        transition={{ duration: 0.16 }}
      />
    </>
  );
}
