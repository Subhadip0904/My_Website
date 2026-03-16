import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { GraduationCap, Award } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-24 px-6 relative z-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3"
            >
              <GraduationCap /> Education
            </motion.h2>
            
            <div className="space-y-8 border-l border-zinc-200 dark:border-white/10 pl-6 ml-3">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-zinc-200 dark:bg-zinc-900 border-2 border-emerald-500 rounded-full" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">{edu.institution}</p>
                  <p className="text-sm text-zinc-500 mt-1">{edu.dates}</p>
                  {edu.details && <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">{edu.details}</p>}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3"
            >
              <Award /> Certifications & Awards
            </motion.h2>
            
            <div className="space-y-6">
              {resumeData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-5 rounded-2xl shadow-sm dark:shadow-none"
                >
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{cert}</p>
                </motion.div>
              ))}
              {resumeData.awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-zinc-900/30 border border-emerald-500/20 p-5 rounded-2xl shadow-sm dark:shadow-none"
                >
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{award}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
