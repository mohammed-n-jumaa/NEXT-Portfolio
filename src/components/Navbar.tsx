'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', section: '#home' },
  { name: 'Projects', href: '/', section: '#projects' },
  { name: 'Skills', href: '/', section: '#skills' },
  { name: 'Services', href: '/', section: '#services' },
  { name: 'Experience', href: '/', section: '#experience' },
  { name: 'Testimonials', href: '/', section: '#testimonials' },
  { name: 'Contact', href: '/contact', section: null },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll events for navbar transparency
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section on home page
  useEffect(() => {
    if (pathname !== '/') return;

    const observerOptions = {
      threshold: 0.6,
      rootMargin: '-20% 0px -20% 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'projects', 'skills', 'services', 'experience', 'testimonials'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [pathname]);

  // Smooth scroll to section or navigate to page
  const handleNavigation = (item: typeof navItems[0]) => {
    setIsOpen(false);

    if (item.href === '/contact') {
      // Navigate to contact page
      window.location.href = '/contact';
    } else if (item.section) {
      // If we're not on home page, go to home first
      if (pathname !== '/') {
        window.location.href = `/${item.section}`;
      } else {
        // Scroll to section on current page
        const element = document.querySelector(item.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Navigate to home page
      window.location.href = '/';
    }
  };

  // Determine active item
  const getActiveItem = () => {
    if (pathname === '/contact') {
      return 'Contact';
    } else if (pathname === '/') {
      // Find the nav item that matches current active section
      const activeItem = navItems.find(item => 
        item.section === `#${activeSection}`
      );
      return activeItem?.name || 'Home';
    }
    return 'Home';
  };

  const currentActive = getActiveItem();

  if (!mounted) return null;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-glass border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={() => handleNavigation({ name: 'Home', href: '/', section: '#home' })}
              className="text-2xl font-bold text-gradient cursor-pointer"
            >
              MN
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => {
                const isActive = currentActive === item.name;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                        isActive 
                          ? 'text-primary-500' 
                          : 'text-foreground/80 hover:text-primary-500'
                      }`}
                    >
                      {item.name}
                      <span 
                        className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform transition-transform duration-200 ${
                          isActive 
                            ? 'scale-x-100' 
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      ></span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://linkedin.com/in/mohammed-nedal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/mohammed-nedal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="mailto:mohammed.n.jumaa@gmail.com"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} />
            </motion.a>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-card hover:bg-accent transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-card hover:bg-accent transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-card hover:bg-accent transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          height: isOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-glass border-t border-border/50">
          {navItems.map((item, index) => {
            const isActive = currentActive === item.name;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleNavigation(item)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary-500 bg-primary-500/10 rounded-lg' 
                      : 'text-foreground/80 hover:text-primary-500 hover:bg-accent rounded-lg'
                  }`}
                >
                  {item.name}
                </button>
              </motion.div>
            );
          })}
          
          {/* Mobile Social Links */}
          <div className="flex items-center space-x-6 px-3 py-4 border-t border-border/50 mt-4">
            <motion.a
              href="https://linkedin.com/in/mohammed-nedal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/mohammed-nedal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="mailto:mohammed.n.jumaa@gmail.com"
              className="text-foreground/60 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}