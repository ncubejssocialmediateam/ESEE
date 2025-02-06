import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize smooth scroll and ScrollTrigger
export const initSmoothScroll = () => {
  const scroller = document.querySelector('[data-scroll-container]');
  if (!scroller) return null;

  // Set default ScrollTrigger scroller
  ScrollTrigger.defaults({
    scroller: scroller
  });

  const locoScroll = new LocomotiveScroll({
    el: scroller,
    smooth: true,
    multiplier: 0.8,
    lerp: 0.1,
    tablet: {
      smooth: true,
      breakpoint: 1024
    },
    smartphone: {
      smooth: true
    }
  });

  // Each time Locomotive Scroll updates, tell ScrollTrigger to update too
  locoScroll.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Tell ScrollTrigger to use these proxy methods
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: scroller.style.transform ? 'transform' : 'fixed'
  });

  // Refresh ScrollTrigger and update LocomotiveScroll
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
};

// Text reveal animation
export const textReveal = (element, delay = 0) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay,
  });
};

// Stagger text animation for headings
export const staggerText = (elements, stagger = 0.1) => {
  return gsap.from(elements, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger,
    ease: 'power4.out',
  });
};

// Enhanced parallax effect
export const parallaxElement = (element, speed = 0.5) => {
  if (!element) return;

  gsap.to(element, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });
};

// Image reveal animation
export const imageReveal = (element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from(element, {
    clipPath: `inset(0 100% 0 0)`,
    duration: 1.5,
    ease: 'power4.inOut',
  });

  return tl;
};

// Magnetic effect for buttons and interactive elements
export const createMagneticEffect = (element) => {
  const bounds = element.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const handleMouseMove = (e) => {
    const deltaX = Math.floor((e.clientX - centerX) * 0.2);
    const deltaY = Math.floor((e.clientY - centerY) * 0.2);

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Split text animation
export const splitTextAnimation = (element) => {
  const text = element.textContent;
  element.textContent = '';
  
  const characters = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });

  gsap.from(characters, {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
};

// Page transition
export const pageTransition = () => {
  const tl = gsap.timeline();

  tl.to('body', { duration: 0.1, css: { overflow: 'hidden' } })
    .to('.page-transition', {
      duration: 0.8,
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power4.inOut',
    })
    .to('.page-transition', {
      duration: 0.8,
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'power4.inOut',
      delay: 0.1,
    })
    .set('body', { css: { overflow: 'auto' } });

  return tl;
};
