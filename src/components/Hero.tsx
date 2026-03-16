import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { resumeData } from '../data/resume';
import { ArrowRight, Download, Mail, Phone, Github, Linkedin, X } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [showContact, setShowContact] = useState(false);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto text-center z-10 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <button 
            onClick={() => setShowContact(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 backdrop-blur-md hover:bg-blue-500/20 hover:scale-105 transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
            Available for new opportunities
          </button>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight">
            {resumeData.basics.name}
          </h1>
          
          {/* Title with Gradient */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
            {resumeData.basics.title.split('|')[0].trim()}
          </h2>

          {/* Summary */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {resumeData.basics.summary}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <a 
              href="#experience"
              className="group flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto justify-center"
            >
              View Experience 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => window.print()}
              className="group flex items-center gap-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 backdrop-blur-md w-full sm:w-auto justify-center shadow-sm dark:shadow-none"
            >
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="p-8">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Get in touch</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  I'm currently available for new opportunities. Feel free to reach out through any of the channels below.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${resumeData.basics.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-zinc-200 dark:border-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Mail size={18} className="text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">Email</div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{resumeData.basics.email}</div>
                    </div>
                  </a>
                  
                  <a 
                    href={`tel:${resumeData.basics.phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-green-50 dark:hover:bg-green-500/10 border border-zinc-200 dark:border-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Phone size={18} className="text-zinc-700 dark:text-zinc-300 group-hover:text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">Phone</div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{resumeData.basics.phone}</div>
                    </div>
                  </a>
                  
                  <div className="flex gap-4 pt-2">
                    {resumeData.basics.links.map(link => {
                      const Icon = link.name === 'GitHub' ? Github : Linkedin;
                      return (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <Icon size={18} /> {link.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
