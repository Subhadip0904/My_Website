import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playBootSound } from '../utils/sounds';

const SBLogo = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
  >
    {/* Outer Ring */}
    <motion.circle
      cx="60"
      cy="60"
      r="56"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeDasharray="15 15"
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      style={{ originX: "50%", originY: "50%" }}
    />
    {/* Inner Ring */}
    <motion.circle
      cx="60"
      cy="60"
      r="48"
      stroke="url(#gradient)"
      strokeWidth="1"
      strokeDasharray="5 25"
      animate={{ rotate: -360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ originX: "50%", originY: "50%" }}
    />
    
    {/* Letter S */}
    <motion.path
      d="M 52 45 C 52 45 42 45 42 52.5 C 42 60 52 60 52 60 C 52 60 62 60 62 67.5 C 62 75 52 75 52 75 C 52 75 42 75 42 75"
      stroke="url(#gradient)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Letter B */}
    <motion.path
      d="M 62 45 L 72 45 C 78 45 78 52.5 72 52.5 L 62 52.5 L 62 75 L 72 75 C 78 75 78 67.5 72 67.5 L 62 67.5"
      stroke="url(#gradient)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22d3ee" /> {/* cyan-400 */}
        <stop offset="1" stopColor="#a855f7" /> {/* purple-500 */}
      </linearGradient>
    </defs>
  </motion.svg>
);

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    playBootSound();

    const duration = 1500; // 1.5s for the loading
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Easing function for smoother progress
      const easeOutQuart = 1 - Math.pow(1 - currentStep / steps, 4);
      setProgress(easeOutQuart * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // 0.4s for exit animation
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: 'blur(20px)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated AI Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative"
        >
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150"></div>
          <SBLogo />
        </motion.div>

        <div className="h-16 flex items-center justify-center">
          <motion.div
            key="loading-bar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            {/* Loading Bar Container */}
            <div className="h-[2px] w-[200px] bg-zinc-200 dark:bg-zinc-800/50 rounded-full overflow-hidden relative">
              {/* Progress Indicator */}
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
