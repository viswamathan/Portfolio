import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: number;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollToSection: (index: number) => void;
  scrollY: number;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setMenuOpen,
  scrollToSection,
  scrollY
}) => {
  const navItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: 'ℹ️' },
    { name: 'Experience', icon: '💼' },
    { name: 'Skills', icon: '🛠️' },
    { name: 'Projects', icon: '📂' },
    { name: 'Contact', icon: '📞' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      x: 300,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 300,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="text-purple-500 font-bold text-lg sm:text-xl md:text-2xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(0)}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Viswa M
            </span>
          </motion.div>

          {/* Hamburger Menu Button - Now for all screen sizes */}
          <motion.button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none p-2 z-60"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Side Menu - Now for all screen sizes */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setMenuOpen(false)}
              />
              
              {/* Side Menu */}
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-80 bg-gray-900/98 backdrop-blur-md border-l border-purple-500/20 z-50 overflow-y-auto"
              >
                {/* Menu Header */}
                <div className="p-6 border-b border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-purple-400">Navigation</h3>
                    <motion.button
                      onClick={() => setMenuOpen(false)}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(index)}
                      className={`w-full py-4 px-6 flex items-center space-x-4 text-left transition-all duration-300 ${
                        activeSection === index
                          ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border-r-4 border-purple-500'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-purple-400'
                      }`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-lg">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Menu Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-500/20">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Mechanical Design Engineer</p>
                    <p className="text-purple-400 text-xs mt-1">Portfolio 2024</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;