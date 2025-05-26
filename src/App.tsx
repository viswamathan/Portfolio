import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import { Calculator, Github, Linkedin, Mail, Phone } from 'lucide-react';

// Components
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import EngineeringCalculator from './components/EngineeringCalculator';

export default function App() {
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = React.useState(0);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const root = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const createSectionObserver = (index: number) => {
    const { ref, inView } = useInView({
      threshold: isMobile ? 0.3 : 0.5,
    });

    React.useEffect(() => {
      if (inView) {
        setActiveSection(index);
      }
    }, [inView]);

    return ref;
  };

  const sectionRefs = [0, 1, 2, 3, 4, 5].map(index => createSectionObserver(index));

  const scrollToSection = (index: number) => {
    sections.current[index]?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="text-primary-500 dark:text-purple-500 font-bold text-base sm:text-lg md:text-xl">
                  Portfolio
                </div>
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white focus:outline-none md:hidden"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                  {[
                    { name: 'Home', icon: '🏠' },
                    { name: 'About', icon: 'ℹ️' },
                    { name: 'Experience', icon: '💼' },
                    { name: 'Skills', icon: '🛠️' },
                    { name: 'Projects', icon: '📂' },
                    { name: 'Contact', icon: '📞' },
                  ].map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(index)}
                      className={`text-sm lg:text-base font-semibold transition-colors ${
                        activeSection === index
                          ? 'text-purple-500'
                          : 'text-gray-300 hover:text-purple-500'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Mobile Menu */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 left-0 right-0 bg-gray-800/90 backdrop-blur-sm md:hidden"
                >
                  <div className="py-2">
                    {[
                      { name: 'Home', icon: '🏠' },
                      { name: 'About', icon: 'ℹ️' },
                      { name: 'Experience', icon: '💼' },
                      { name: 'Skills', icon: '🛠️' },
                      { name: 'Projects', icon: '📂' },
                      { name: 'Contact', icon: '📞' },
                    ].map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(index)}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-4 flex items-center space-x-3 ${
                          activeSection === index
                            ? 'bg-purple-500/20 text-purple-500'
                            : 'text-gray-300'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </nav>

            {/* Main Content */}
            <main className="relative pt-16 md:pt-20">
              {[Hero, About, Experience, Skills, Projects, Contact].map((Component, index) => (
                <section
                  key={index}
                  ref={el => {
                    sections.current[index] = el;
                    sectionRefs[index](el);
                  }}
                  className={`min-h-screen px-4 sm:px-6 lg:px-8 ${
                    index === 0 ? '' : 'py-16 sm:py-20 lg:py-24'
                  }`}
                >
                  <Component
                    scrollToContact={index === 0 ? () => scrollToSection(5) : undefined}
                  />
                </section>
              ))}

              {/* Engineering Calculator Modal */}
              <EngineeringCalculator />
            </main>

            {/* Scroll Progress Indicator */}
            <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 space-y-1 sm:space-y-2 z-50">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    activeSection === index
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-500 hover:bg-purple-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}