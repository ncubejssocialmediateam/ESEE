import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from '../../utils/gsap';
import ParticleBackground from '../shared/ParticleBackground';

const Hero = ({ isLoaded, setIsLoaded, isDark }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const loadingRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Loading sequence
    if (!isLoaded) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          // Start content animation after loading
          gsap.to(overlayRef.current, {
            y: '-100%',
            duration: 1,
            ease: 'power4.inOut',
          });
        }
      });

      tl.fromTo(loadingRef.current, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      })
      .to(loadingRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        delay: 0.5,
        ease: 'power2.in'
      });

      return () => {
        tl.kill();
      };
    }
  }, [isLoaded, setIsLoaded]);

  // Content animations
  useEffect(() => {
    if (isLoaded && isMounted) {
      const tl = gsap.timeline({ delay: 1 });

      // Title animation with staggered letters effect
      const titleText = titleRef.current.textContent;
      titleRef.current.textContent = '';
      titleRef.current.style.opacity = '1';
      
      const titleLetters = titleText.split('').map(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        titleRef.current.appendChild(span);
        return span;
      });

      tl.from(titleLetters, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out'
      });

      // Description animation
      tl.from(descRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      // Button animation
      tl.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.2');

      // Subtle float animation for the container
      gsap.to(containerRef.current, {
        y: 20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      return () => tl.kill();
    }
  }, [isLoaded, isMounted]);

  // Button hover animation
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className={`fixed inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-950 to-indigo-950' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        } z-50 flex items-center justify-center transition-colors duration-300`}>
          <div 
            ref={loadingRef}
            className={`text-9xl font-bold tracking-wider ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            ΕΣΕΕ
          </div>
        </div>
      )}

      {/* Page Transition Overlay */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 ${
          isDark ? 'bg-blue-950' : 'bg-white'
        } z-40 transform translate-y-0 transition-colors duration-300`}
      />

      {/* Main Content */}
      <div className={`relative min-h-[80vh] ${
        isDark 
          ? 'bg-gradient-to-r from-blue-950 to-indigo-950' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
        } flex items-center overflow-hidden transition-colors duration-300`}>
        {isDark && <ParticleBackground color="#ffffff" count={100} />}
        
        <div 
          ref={containerRef}
          className="w-full max-w-7xl mx-auto px-4 relative z-10"
        >
          <div className={`max-w-4xl mx-auto text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <h1 
              ref={titleRef}
              className={`text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400' 
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700'
              } bg-clip-text  drop-shadow-lg`}
              style={{ perspective: '1000px' }}
            >
              Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας
            </h1>
            <p 
              ref={descRef}
              className={`text-xl md:text-3xl mb-12 leading-relaxed ${
                isDark ? 'text-blue-100' : 'text-blue-900'
              }`}
            >
              Υποστηρίζουμε την ανάπτυξη του ελληνικού εμπορίου και της επιχειρηματικότητας
            </p>
            <button 
              ref={buttonRef}
              data-cursor="pointer"
              className={`px-12 py-4 rounded-full font-medium text-lg transform-gpu custom-transition hover:shadow-2xl hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-blue-950 hover:shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-600/25'
              }`}
            >
              Μάθετε περισσότερα
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired
};

export default Hero;
