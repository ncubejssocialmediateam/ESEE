import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gsap } from '../../utils/gsap';
import ParticleBackground from '../shared/ParticleBackground';
import ESEE_LOGO from '../../assets/ESEE-LOGO_white.png';
import ESEE_LOGO_LOADING from '../../assets/ESEE-LOGO7.png';

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

      // Logo animation with scale and fade effect
      tl.from(titleRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 50,
        duration: 1,
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
            className="flex items-center justify-center"
          >
            <img 
              src={ESEE_LOGO_LOADING} 
              alt="ΕΣΕΕ - Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
              className="h-32 md:h-40 lg:h-48 w-auto"
            />
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
        {isDark && <ParticleBackground color="#00d4ff" count={100} />}
        
        <div 
          ref={containerRef}
          className="w-full max-w-7xl mx-auto px-4 relative z-10"
        >
          <div className={`max-w-4xl mx-auto text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <div 
              ref={titleRef}
              className="mb-8 flex justify-center"
            >
              <img 
                src={ESEE_LOGO} 
                alt="Ελληνική Συνομοσπονδία Εμπορίου & Επιχειρηματικότητας"
                className="max-w-full h-auto max-h-32 md:max-h-40 lg:max-h-48 drop-shadow-lg"
              />
            </div>
            <p 
              ref={descRef}
              className={`text-xl md:text-3xl mb-12 leading-relaxed ${
                isDark ? 'text-blue-100' : 'text-blue-900'
              }`}
            >
              Υποστηρίζουμε την ανάπτυξη του ελληνικού εμπορίου και της επιχειρηματικότητας
            </p>
            <Link to="/about">
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
            </Link>
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
