import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 relative z-10 bg-zinc-50/80 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6"
        >
          Let's Connect
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto"
        >
          {resumeData.extra[0]}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href={`mailto:${resumeData.basics.email}`} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white dark:bg-white/5 border border-zinc-200 dark:border-transparent px-6 py-3 rounded-full shadow-sm dark:shadow-none">
            <Mail size={18} /> Email
          </a>
          <a href={`tel:${resumeData.basics.phone}`} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white dark:bg-white/5 border border-zinc-200 dark:border-transparent px-6 py-3 rounded-full shadow-sm dark:shadow-none">
            <Phone size={18} /> Phone
          </a>
          {resumeData.basics.links.map(link => {
            const Icon = link.name === 'GitHub' ? Github : Linkedin;
            return (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white dark:bg-white/5 border border-zinc-200 dark:border-transparent px-6 py-3 rounded-full shadow-sm dark:shadow-none">
                <Icon size={18} /> {link.name}
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
