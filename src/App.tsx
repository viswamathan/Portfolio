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

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const root = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for each section
  const createSectionObserver = (index: number) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
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
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
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
                <div className="text-primary-500 dark:text-purple-500 font-bold text-lg sm:text-xl">
                  Portfolio
                </div>
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white focus:outline-none"
                >
                  <svg
                    className="w-8 h-8"
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
              </div>
              {/* Horizontal Menu with Symbols and Animation */}
              {isMenuOpen && (
                <motion.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  className="absolute top-16 left-0 right-0 bg-gray-800/90 backdrop-blur-sm flex justify-center py-4 space-x-8"
                >
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-lg font-semibold flex items-center space-x-2 transition-colors ${
                        activeSection === index
                          ? 'text-primary-500 dark:text-purple-500'
                          : 'text-gray-300 hover:text-primary-500 dark:hover:text-purple-500'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </nav>

            {/* Main Content */}
            <main className="relative">
              <section 
                ref={el => {
                  sections.current[0] = el;
                  sectionRefs[0](el);
                }}
                className="min-h-screen px-4 sm:px-6 lg:px-8"
              >
                <Hero scrollToContact={() => scrollToSection(5)} />
              </section>

              <section 
                ref={el => {
                  sections.current[1] = el;
                  sectionRefs[1](el);
                }}
                className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
              >
                <About />
              </section>

              <section 
                ref={el => {
                  sections.current[2] = el;
                  sectionRefs[2](el);
                }}
                className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
              >
                <Experience />
              </section>

              <section 
                ref={el => {
                  sections.current[3] = el;
                  sectionRefs[3](el);
                }}
                className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
              >
                <Skills />
              </section>

              <section 
                ref={el => {
                  sections.current[4] = el;
                  sectionRefs[4](el);
                }}
                className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
              >
                <Projects />
              </section>

              <section 
                ref={el => {
                  sections.current[5] = el;
                  sectionRefs[5](el);
                }}
                className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
              >
                <Contact />
              </section>

              {/* Engineering Calculator Modal */}
              <EngineeringCalculator />
            </main>

            {/* Scroll Progress Indicator */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2 z-50">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSection === index
                      ? 'bg-primary-500 dark:bg-purple-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-500 hover:bg-primary-400 dark:hover:bg-purple-400'
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