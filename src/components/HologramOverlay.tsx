import React from 'react';
import { motion } from 'motion/react';

export const HologramOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 1) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      
      {/* Moving Holographic Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
           style={{
             perspective: '1000px',
             transformStyle: 'preserve-3d',
           }}>
        <motion.div 
          className="absolute inset-0 origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.4) 1px, transparent 1px),
              linear-gradient(to top, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'rotateX(70deg) translateY(100px) scale(2)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 40px']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Fade out top of grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white dark:from-transparent dark:to-zinc-950" />
      </div>

      {/* Occasional Holographic Flicker */}
      <motion.div 
        className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay"
        animate={{ opacity: [0, 0.05, 0, 0.1, 0, 0, 0.02, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
      />
    </div>
  );
};
