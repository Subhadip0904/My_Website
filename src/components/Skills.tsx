import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative z-10 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-12"
        >
          Technical Arsenal
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resumeData.skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 border-b border-zinc-200 dark:border-white/10 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-md text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/20 transition-colors cursor-default shadow-sm dark:shadow-none">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
