import React, { useRef, useState, useEffect } from 'react';
import { LazyMotion, domAnimation, motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Components
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CADModels from './components/CADModels';
import EngineeringCalculator from './components/EngineeringCalculator';
import LoadingScreen from './components/LoadingScreen';
import Achievements from './components/Achievements';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'cad-models' | 'achievements'>('portfolio');

  // ✅ Resize & scroll tracking
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setScrollY(window.scrollY);

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ Section intersection observers
  const sectionRefs = [0, 1, 2, 3, 4, 5].map(index => {
    const { ref, inView } = useInView({
      threshold: isMobile ? 0.2 : 0.4,
      rootMargin: '-20% 0px -20% 0px'
    });

    useEffect(() => {
      if (inView) setActiveSection(index);
    }, [inView]);

    return ref;
  });

  const scrollToSection = (index: number) => {
    sections.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setMenuOpen(false);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <LazyMotion features={domAnimation}>
            <motion.div
              key="main"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
              {/* Particle Background */}
              <ParticleBackground />

              {/* Navigation */}
              <Navigation
                activeSection={activeSection}
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
                scrollToSection={scrollToSection}
                scrollY={scrollY}
                currentPage={currentPage}
                navigateToPage={setCurrentPage}
              />

              {/* Main Content */}
              <main className="relative">
                {currentPage === 'portfolio' ? (
                  [Hero, About, Experience, Skills, Projects, Contact].map((Component, index) => (
                    <motion.section
                      key={index}
                      ref={el => {
                        sections.current[index] = el;
                        if (sectionRefs[index]) sectionRefs[index](el);
                      }}
                      className={`relative ${
                        index === 0
                          ? 'min-h-screen'
                          : 'min-h-screen py-12 sm:py-16 lg:py-20'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <Component
                        scrollToContact={index === 0 ? () => scrollToSection(5) : undefined}
                        navigateToPage={index === 0 ? setCurrentPage : undefined}
                      />
                    </motion.section>
                  ))
                ) : currentPage === 'cad-models' ? (
                  <motion.section
                    className="relative min-h-screen py-12 sm:py-16 lg:py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <CADModels />
                  </motion.section>
                ) : currentPage === 'achievements' ? (
                  <motion.section
                    className="relative min-h-screen py-12 sm:py-16 lg:py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Achievements />
                  </motion.section>
                ) : null}

                {/* Engineering Calculator */}
                <EngineeringCalculator />
              </main>

              {/* Scroll Progress */}
              <ScrollProgress activeSection={activeSection} scrollToSection={scrollToSection} />

              {/* Floating Action Button */}
              <motion.div
                className="fixed bottom-6 right-6 z-40"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
              >
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  );
}
