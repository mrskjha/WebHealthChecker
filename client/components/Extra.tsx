"use client";

import { Activity, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ---------------- FEATURES ---------------- */
export function Features() {
  const features = [
    {
      icon: Activity,
      title: "Real-Time Uptime Monitoring",
      subtitle: "Never miss downtime again",
      description:
        "We continuously monitor your website every minute from multiple locations to ensure maximum accuracy and zero blind spots.",
      points: [
        "1-minute check intervals",
        "Multi-region monitoring",
        "Latency & response tracking",
      ],
    },
    {
      icon: Shield,
      title: "Instant & Reliable Alerts",
      subtitle: "Act before users complain",
      description:
        "Get notified the moment something goes wrong so you can take action before it impacts your customers or revenue.",
      points: [
        "Email notifications",
        "Downtime & recovery alerts",
        "Noise-free smart alerts",
      ],
    },
    {
      icon: Zap,
      title: "Fast, Lightweight & Accurate",
      subtitle: "Built for performance",
      description:
        "Our monitoring system is optimized to be fast, lightweight, and extremely accurate without slowing your website.",
      points: [
        "Low overhead checks",
        "Accurate status detection",
        "Scales with your growth",
      ],
    },
  ];

  return (
    <section className="py-28 px-4 bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Everything You Need to Monitor Your Website
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Designed for developers, startups, and businesses that care about
            reliability, performance, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-cyan-400/40 transition"
              >
                <CardHeader className="space-y-4">
                  <div className="w-11 h-11 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <div>
                    <CardTitle className="mb-1 text-white">{feature.title}</CardTitle>
                    <p className="text-sm text-cyan-400">{feature.subtitle}</p>
                  </div>
                </CardHeader>

                <CardContent className="text-slate-400 space-y-4">
                  <p>{feature.description}</p>

                  <ul className="space-y-2 text-sm">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */


import { motion } from "framer-motion";

export function Stats() {
  const stats = [
    {
      value: "10k+",
      label: "Websites Monitored",
      description: "Across startups & personal projects",
      gradient: "from-cyan-400 via-cyan-200 to-cyan-400",
    },
    {
      value: "99.9%",
      label: "Uptime Accuracy",
      description: "Reliable monitoring you can trust",
      gradient: "from-white via-cyan-100 to-cyan-400",
    },
    {
      value: "1M+",
      label: "Checks Per Day",
      description: "Ensuring constant visibility",
      gradient: "from-cyan-500 to-cyan-300",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#020617]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl transition-all hover:border-cyan-500/30 shadow-2xl shadow-black"
            >
              <div className="absolute inset-x-12 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col h-full space-y-4">
                <div className={`text-6xl font-black tracking-tighter bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-100 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-cyan-500/10 blur-[30px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ---------------- FINAL CTA ---------------- */


import { ArrowRight, ShieldCheck, Bell } from "lucide-react";


export function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3 fill-cyan-400" />
            Ready to deploy
          </div>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Stop losing users to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-white">
            unexpected downtime
          </span>
          .
        </h2>

        <p className="text-slate-400 mb-12 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Trusted by thousands of developers for precision monitoring, real-time alerts, and enterprise-grade uptime.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            size="lg"
            className="group relative h-16 px-12 rounded-full bg-white text-[#020617] font-bold text-xl hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]"
          >
            <span className="flex items-center gap-3">
              Get Started for Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="text-cyan-400 border-cyan-400 hover:bg-cyan-500/10 hover:text-white transition"
          >
            Learn More
          </Button>
        </div>

        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 opacity-70">
          <div className="flex items-center gap-2 text-slate-300">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">Global Nodes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Bell className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">Zero-Latency Alerts</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium">Enterprise Security</span>
          </div>
        </div>
      </div>

      {/* Footer Overlay Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617]/0 to-[#020617]/100 pointer-events-none" />
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

import {  Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter">
                WebHealthChecker
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Precision monitoring for the modern web. Engineering uptime and peace of mind since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a></li>
              <li><a href="#stats" className="hover:text-cyan-400 transition-colors">Global Network</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Support</h4>
            <div className="flex flex-col gap-4">
               <a href="mailto:support@webhealth.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-all group">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                   <Mail className="w-4 h-4" />
                 </div>
                 Contact Support
               </a>
               <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                 <p className="text-[10px] text-cyan-400 font-bold uppercase mb-1">Status</p>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-xs text-white">All Systems Operational</span>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">
            © {currentYear} WebHealthChecker. All rights reserved. 
            <span className="hidden md:inline mx-2 text-slate-800">|</span> 
            Built for the modern web.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-[10px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            v2.4.0 Stable
          </div>
        </div>
      </div>
    </footer>
  );
}
