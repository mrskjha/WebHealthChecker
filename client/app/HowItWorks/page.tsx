"use client";

import { Globe, Activity, Bell } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Globe,
    title: "Register & Add Website",
    description: "Create an account and add your website URL. No complex setup—start monitoring in seconds.",
  },
  {
    icon: Activity,
    title: "Continuous Health Monitoring",
    description: "WebHealthChecker monitors uptime, response time, and availability 24/7 from multiple checkpoints.",
  },
  {
    icon: Bell,
    title: "Instant Alerts & Reports",
    description: "Get notified instantly via email when your website goes down or performance drops.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full py-32 px-6 bg-[#020617] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Three steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">peace of mind</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Monitor your website’s health, uptime, and performance automatically,
            without any manual effort.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="hidden md:block absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative z-10 h-full flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/30 hover:bg-slate-900/60">
                  
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#020617] border border-cyan-500/50 text-cyan-400 text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    0{index + 1}
                  </div>

                  {/* Icon Container */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500">
                      <Icon className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-50 group-transition">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  <div className="absolute bottom-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}