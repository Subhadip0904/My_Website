import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { FolderGit2 } from 'lucide-react';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-12"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors shadow-sm dark:shadow-none flex flex-col"
            >
              <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent z-10"></div>
                <img 
                  src={project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g, '')}Tech/600/400?blur=2`} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                    <FolderGit2 className="text-emerald-400" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-full text-xs text-zinc-600 dark:text-zinc-300 font-mono border border-zinc-200/50 dark:border-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-3 flex-1">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-cyan-500 dark:text-cyan-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
