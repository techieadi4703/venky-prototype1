import { gsap } from "gsap";

// Shared config for GSAP animations
export const MO_CONFIG = {
  duration: {
    micro: 0.3,
    step: 0.8,
  },
  ease: {
    primary: "power2.out",
    heavy: "power3.out",
    loop: "power2.inOut",
  }
};

// Hook to check for prefers-reduced-motion
export const isReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};
