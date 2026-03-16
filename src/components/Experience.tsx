import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { resumeData } from '../data/resume';
import { ChevronDown, MapPin, Calendar, Zap, ArrowRight } from 'lucide-react';

// Helper to highlight metrics in text
const highlightMetrics = (text: string) => {
  const parts = text.split(/(\b\d+(?:\.\d+)?%|\b\d+\+)/g);
  return parts.map((part, i) => {
    if (part.match(/(\b\d+(?:\.\d+)?%|\b\d+\+)/)) {
      return <span key={i} className="text-cyan-500 dark:text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded-md">{part}</span>;
    }
    return part;
  });
};

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Extract measurable bullets for the impact panel
  const measurableBullets = resumeData.experience
    .flatMap(exp => exp.bullets)
    .filter(bullet => bullet.match(/(\b\d+(?:\.\d+)?%|\b\d+\+)/))
    .slice(0, 4);

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Experience
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline / Story Cards */}
          <div className="lg:col-span-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent hidden md:block"></div>

            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative md:pl-20"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] hidden md:block z-10"></div>

                  <motion.div 
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-lg dark:shadow-none transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group"
                  >
                    <button 
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="w-full text-left p-6 sm:p-8 flex items-start sm:items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                    >
                      <div className="pr-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                          {index === 0 && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-4">{exp.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500 font-mono">
                          <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg"><Calendar size={14} className="text-cyan-500" /> {exp.dates}</span>
                          <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg"><MapPin size={14} className="text-purple-500" /> {exp.location}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full mt-2 sm:mt-0 shrink-0"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedIndex === index && exp.bullets.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="p-6 sm:p-8 pt-0 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-transparent">
                            <ul className="space-y-4 mt-6">
                              {exp.bullets.map((bullet, i) => (
                                <li key={i} className="text-zinc-700 dark:text-zinc-300 flex items-start gap-4 text-base leading-relaxed">
                                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                  <span>{highlightMetrics(bullet)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Impact Highlights Panel */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300"
            >
              {/* Decorative background elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-zinc-100 dark:bg-white/10 rounded-xl backdrop-blur-md">
                    <Zap className="text-cyan-500 dark:text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Impact Highlights</h3>
                </div>

                <div className="space-y-6">
                  {measurableBullets.map((bullet, i) => {
                    // Extract the metric for the badge
                    const metricMatch = bullet.match(/(\b\d+(?:\.\d+)?%|\b\d+\+)/);
                    const metric = metricMatch ? metricMatch[0] : '';
                    const textWithoutMetric = bullet.replace(metric, '').trim().replace(/^[-,:]\s*/, '');

                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="group flex flex-col gap-2 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300"
                      >
                        {metric && (
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/20 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-300 font-bold rounded-lg text-sm w-fit shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                            {metric}
                          </span>
                        )}
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors line-clamp-3">
                          {textWithoutMetric}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <a href="#achievements" className="mt-8 flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors group">
                  <span>View All Achievements</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
