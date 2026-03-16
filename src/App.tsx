/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { CursorRipple } from './components/CursorRipple';
import { HologramOverlay } from './components/HologramOverlay';
import { resumeData } from './data/resume';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 font-sans transition-colors duration-300">
      <AnimatedBackground isDarkMode={isDarkMode} />
      <HologramOverlay />
      <CursorRipple />
      
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <Experience />
            <Achievements />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 relative z-10 transition-colors duration-300">
            <p>© {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}
