"use client";

import { useEffect, useRef, useState } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

type LazyProductVideoProps = {
  src: string;
  poster: string;
  className?: string;
  ariaLabel: string;
};

export default function LazyProductVideo({
  src,
  poster,
  className,
  ariaLabel,
}: LazyProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preferStillImage = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
    preferStillImage.current = Boolean(reducedMotion || saveData);

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !preferStillImage.current) setShouldLoad(true);
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || preferStillImage.current) return;

    if (isVisible) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload="none"
      loop
      muted
      playsInline
      aria-label={ariaLabel}
      className={className}
    >
      Your browser does not support background video.
    </video>
  );
}
