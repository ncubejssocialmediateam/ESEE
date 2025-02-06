import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const followerPosition = useRef({ x: 0, y: 0 });
  // Track the last applied cursor type ("default" or "pointer")
  const lastCursorType = useRef('default');

  const onMouseMove = (event) => {
    // Update the mouse position ref on every move
    mousePosition.current = { x: event.clientX, y: event.clientY };

    // Determine if the cursor is over an element that requires a custom style
    const hoveredElement = event.target.closest('[data-cursor]');
    const newCursorType = hoveredElement ? hoveredElement.dataset.cursor : 'default';

    // Only trigger GSAP animations if the cursor type has changed
    if (newCursorType !== lastCursorType.current) {
      lastCursorType.current = newCursorType;
      if (newCursorType === 'pointer') {
        gsap.to(cursorRef.current, {
          scale: 0.5,
          duration: 0.3,
          backgroundColor: 'transparent',
          border: '2px solid white'
        });
        gsap.to(followerRef.current, {
          scale: 2,
          duration: 0.3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        });
      } else {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'white',
          border: 'none'
        });
        gsap.to(followerRef.current, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        });
      }
    }
  };

  const animateCursor = (time) => {
    // Update the positions using a simple easing (lerp)
    cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.2;
    cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.2;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
    }

    followerPosition.current.x += (mousePosition.current.x - followerPosition.current.x) * 0.1;
    followerPosition.current.y += (mousePosition.current.y - followerPosition.current.y) * 0.1;
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${followerPosition.current.x}px, ${followerPosition.current.y}px, 0)`;
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    // Set initial positions to the center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    cursorPosition.current = { x: centerX, y: centerY };
    followerPosition.current = { x: centerX, y: centerY };

    document.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animateCursor);

    // Hide the default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
      <>
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
            style={{ willChange: 'transform' }}
        />
        <div
            ref={followerRef}
            className="fixed top-0 left-0 w-8 h-8 bg-white bg-opacity-20 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
            style={{ willChange: 'transform' }}
        />
      </>
  );
};

export default CustomCursor;
