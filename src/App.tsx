import React, { useRef } from 'react';
import { motion } from 'framer-motion';
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

  React.useEffect(() => {
    const root = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
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
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary-500 dark:text-purple-500 font-bold text-xl"
            >
              Portfolio
            </motion.div>
            <div className="flex space-x-6">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index)}
                  className={`transition-colors ${
                    activeSection === index
                      ? 'text-primary-500 dark:text-purple-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-purple-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <section 
          ref={el => {
            sections.current[0] = el;
            sectionRefs[0](el);
          }}
          className="min-h-screen"
        >
          <Hero scrollToContact={() => scrollToSection(5)} />
        </section>

        <section 
          ref={el => {
            sections.current[1] = el;
            sectionRefs[1](el);
          }}
          className="min-h-screen py-20"
        >
          <About />
        </section>

        <section 
          ref={el => {
            sections.current[2] = el;
            sectionRefs[2](el);
          }}
          className="min-h-screen py-20"
        >
          <Experience />
        </section>

        <section 
          ref={el => {
            sections.current[3] = el;
            sectionRefs[3](el);
          }}
          className="min-h-screen py-20"
        >
          <Skills />
        </section>

        <section 
          ref={el => {
            sections.current[4] = el;
            sectionRefs[4](el);
          }}
          className="min-h-screen py-20"
        >
          <Projects />
        </section>

        <section 
          ref={el => {
            sections.current[5] = el;
            sectionRefs[5](el);
          }}
          className="min-h-screen py-20"
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
    </div>
  );
}