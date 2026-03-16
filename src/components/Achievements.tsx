import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { resumeData } from '../data/resume';
import { Trophy, Award, TrendingUp, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix/prefix
  const numMatch = value.match(/(\d+(?:\.\d+)?)/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const prefix = value.split(numMatch?.[0] || '')[0] || '';
  const suffix = value.split(numMatch?.[0] || '')[1] || '';

  useEffect(() => {
    if (isInView && num > 0) {
      let start = 0;
      const end = num;
      const totalFrames = Math.round(duration * 60);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Easing out function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = start + (end - start) * easeOutQuart;
        
        setCount(currentCount);

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }
  }, [isInView, num, duration]);

  if (!numMatch) return <span>{value}</span>;

  // Format with same decimal places as original
  const decimals = numMatch[0].includes('.') ? numMatch[0].split('.')[1].length : 0;
  
  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Custom Tooltip for the Chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xl max-w-xs">
        <p className="font-bold text-zinc-900 dark:text-white mb-2">{data.name}</p>
        <p className="text-2xl font-extrabold" style={{ color: data.fill }}>{data.value}%</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{data.context}</p>
      </div>
    );
  }
  return null;
};

export const Achievements = () => {
  // Top 3 impact metrics
  const topImpact = resumeData.achievements.slice(0, 3);
  
  // Group remaining achievements and awards
  const awards = resumeData.awards;

  // Chart Data for Performance Metrics
  const chartData = [
    { name: 'COVID-19 CNN', value: 94, fill: '#8b5cf6', context: 'Achieved peak diagnostic accuracy in COVID-19 detection models by leveraging advanced CNNs and transfer learning on 2,500+ CT scans.' },
    { name: 'Image Class.', value: 87, fill: '#06b6d4', context: 'Delivered high-precision classification on a massive 10,500+ image dataset using optimized EfficientNetV2B0 architectures.' },
    { name: 'Mars U-Net', value: 69.6, fill: '#10b981', context: 'Outperformed baseline models by 20% in Mars Terrain Segmentation using custom U-Net with gated skip connections.' },
    { name: 'Reporting Eff.', value: 40, fill: '#f59e0b', context: 'Boosted reporting efficiency and system throughput for an AI-Powered Internship Platform designed for 20,000+ concurrent users.' },
    { name: 'CI/CD Speedup', value: 15, fill: '#ec4899', context: 'Accelerated release cycle times by architecting automated CI/CD pipelines and streamlining cross-team agile delivery.' },
  ];

  return (
    <section id="achievements" className="py-24 px-6 relative z-10 bg-zinc-50 dark:bg-zinc-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Impact & Achievements
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Measurable results and recognition from driving innovation and efficiency.
          </p>
        </motion.div>

        {/* Top 3 Impact Strip */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:pb-0 md:overflow-visible">
          {topImpact.map((ach, index) => (
            <motion.div
              key={`top-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center relative group rounded-3xl p-[1px] bg-gradient-to-b from-zinc-200 to-transparent dark:from-white/10 dark:to-transparent overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {/* Spotlight Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full ease-in-out"></div>
              
              <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl h-full rounded-[23px] p-8 flex flex-col items-center text-center relative z-10 transition-colors duration-300">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-500/10 rounded-full mb-6 text-cyan-600 dark:text-cyan-400">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                  <AnimatedCounter value={ach.metric} />
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  {ach.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grouped Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* Performance Metrics Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="text-purple-500" size={24} />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Performance Metrics</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 136, 136, 0.1)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="text-amber-500" size={24} />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Awards & Recognition</h3>
            </div>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <motion.div
                  key={`award-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-white dark:from-zinc-900 dark:to-zinc-900/40 border border-amber-100 dark:border-amber-500/20 overflow-hidden shadow-sm dark:shadow-none"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity text-amber-500">
                    <Award size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6">
                      <Trophy size={20} />
                    </div>
                    <p className="text-lg text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
                      {award}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Additional Text Metrics that didn't fit the chart */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-900/40 border border-blue-100 dark:border-blue-500/20 overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Technical Specifications</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Authored 30+ comprehensive technical specifications, driving QA efficiency and ensuring full enterprise audit compliance.</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-900/40 border border-emerald-100 dark:border-emerald-500/20 overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">BIP CyberSec Talent Week 2025</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Secured a final weighted score of 27.9/30 (Top 5%) in the highly competitive cybersecurity challenge.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
