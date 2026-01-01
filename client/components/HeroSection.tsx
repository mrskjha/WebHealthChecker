"use client";

import Link from "next/link";
import { Spotlight } from "../components/ui/spotlight";
import { Activity, Shield, Zap } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative w-full bg-[#020617] overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="cyan"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 md:py-40 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm mb-8">
          <Activity className="w-4 h-4" />
          Real-Time Website Monitoring
        </div>

        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 leading-tight">
          Precision Uptime <br /> & Latency Insights
        </h1>


        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
          Monitor your digital infrastructure in real time. Detect downtime,
          analyze response times, and gain deep visibility into system health —
          all from a single, powerful dashboard.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/site">
            <button className="relative p-[3px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
              <div className="relative px-8 py-2 bg-black rounded-[6px] text-white transition group-hover:bg-transparent">
                View Dashboard
              </div>
            </button>
          </Link>

          <Link href="/docs">
            <button className="px-8 py-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition">
              API Documentation
            </button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            99.9% Monitoring Accuracy
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            1-Minute Check Intervals
          </div>
          <div className="flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Trusted by 10,000+ Sites
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020617] via-cyan-500/10 to-transparent pointer-events-none" />
    </section>
  );
}

export default HeroSection;
