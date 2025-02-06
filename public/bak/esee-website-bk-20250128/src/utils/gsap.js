import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure default GSAP settings
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

// Configure ScrollTrigger defaults
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

// Configure ScrollTrigger defaults for smooth animations
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  markers: false
});

export { gsap, ScrollTrigger };
