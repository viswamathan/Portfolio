import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Wrench, FolderOpen, Phone } from 'lucide-react';

interface NavigationProps {
  activeSection: number;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollToSection: (index: number) => void;
  scrollY: number;
  currentPage: 'portfolio' | 'cad-models' | 'achievements';
  navigateToPage: (page: 'portfolio' | 'cad-models' | 'achievements') => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  setMenuOpen,
  scrollToSection,
  currentPage,
  navigateToPage,
  scrollY
}) => {
  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Experience', icon: Briefcase },
    { name: 'Skills', icon: Wrench },
    { name: 'Projects', icon: FolderOpen },
    { name: 'Contact', icon: Phone },
  ];

  const pageItems = [
    { name: 'Portfolio', page: 'portfolio', icon: Home },
    { name: 'CAD Models', page: 'cad-models', icon: FolderOpen },
    { name: 'Achievements', page: 'achievements', icon: Briefcase },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: 300, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: 300, scale: 0.95, transition: { duration: 0.2 } }
  };

  const handleMenuToggle = () => setMenuOpen(!isMenuOpen);

  const handleSectionClick = (index: number) => {
    scrollToSection(index);
    setMenuOpen(false);
  };

  const handlePageClick = (page: string) => {
    navigateToPage(page);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar */}
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
            onClick={() => handleSectionClick(0)}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Viswa M
            </span>
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={handleMenuToggle}
            className="text-gray-300 hover:text-white focus:outline-none p-2 relative z-60"
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
      </motion.nav>

      {/* Mobile Side Menu */}
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
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/98 backdrop-blur-md border-l border-purple-500/20 z-50 overflow-y-auto shadow-2xl"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-purple-500/20 bg-gray-900/50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-purple-400">Navigation</h3>
                  <p className="text-xs text-gray-400 mt-1">Mechanical Engineering Portfolio</p>
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="py-6 space-y-2">
                {/* Pages */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 mb-2">Pages</h4>
                  {pageItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.button
                        key={item.page}
                        onClick={() => handlePageClick(item.page)}
                        className={`w-full py-4 px-6 flex items-center space-x-4 text-left transition-all duration-300 ${
                          currentPage === item.page
                            ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border-r-4 border-purple-500'
                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-purple-400'
                        }`}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <div className="flex-1">
                          <span className="font-medium text-lg">{item.name}</span>
                          {currentPage === item.page && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              className="h-0.5 bg-purple-500 mt-1"
                            />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Sections (only on portfolio page) */}
                {currentPage === 'portfolio' && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 mb-2">Sections</h4>
                    {navItems.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.name}
                          onClick={() => handleSectionClick(index)}
                          className={`w-full py-4 px-6 flex items-center space-x-4 text-left transition-all duration-300 ${
                            activeSection === index
                              ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border-r-4 border-purple-500'
                              : 'text-gray-300 hover:bg-gray-800/50 hover:text-purple-400'
                          }`}
                          whileHover={{ x: 10 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                        >
                          <IconComponent className="w-5 h-5" />
                          <div className="flex-1">
                            <span className="font-medium text-lg">{item.name}</span>
                            {activeSection === index && (
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                className="h-0.5 bg-purple-500 mt-1"
                              />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-500/20 bg-gray-900/50 text-center">
                <p className="text-gray-400 text-sm mb-1">Mechanical Design Engineer</p>
                <p className="text-purple-400 text-xs mt-1">Portfolio 2024</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Available for Projects</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
