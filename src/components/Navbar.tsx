import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Sun, Moon, Briefcase, Trophy, Code, Wrench, Home } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Achievements', href: '#achievements', icon: Trophy },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Skills', href: '#skills', icon: Wrench },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Scroll spy
    const observers = navLinks.map(link => {
      const el = document.querySelector(link.href);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(link.href);
          }
        },
        { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" }
      );
      observer.observe(el);
      return observer;
    });

    // Add observer for hero section (home)
    const heroEl = document.querySelector('#hero');
    let heroObserver: IntersectionObserver | null = null;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection('#hero');
        },
        { threshold: 0.3 }
      );
      heroObserver.observe(heroEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(obs => obs?.disconnect());
      heroObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold text-zinc-900 dark:text-white font-mono tracking-tighter hover:text-cyan-500 transition-colors">SB.</a>
          
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors relative ${
                    isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hover:scale-110 active:scale-95"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
      >
        <a href="#hero" className={`p-2 rounded-full transition-colors ${activeSection === '#hero' || activeSection === '' ? 'text-cyan-500 bg-cyan-500/10' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
          <Home size={20} />
        </a>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.href;
          return (
            <a 
              key={link.name} 
              href={link.href} 
              className={`p-2 rounded-full transition-colors ${
                isActive ? 'text-cyan-500 bg-cyan-500/10' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
              aria-label={link.name}
            >
              <Icon size={20} />
            </a>
          );
        })}
        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </motion.nav>
    </>
  );
};
