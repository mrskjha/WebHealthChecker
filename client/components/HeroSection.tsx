"use client";
import Link from "next/link";
import { Spotlight } from "../components/ui/spotlight";


function HeroSection() {
  
  return (
    <div className="h-auto md:h-[60rem] w-full rounded-sm flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 bg-[#020617]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="cyan" 
      />
      
      <div className="p-4 relative z-10 w-full text-center">
    
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400">
          Precision Uptime <br /> & Latency Insights
        </h1>
        
      
        <p className="mt-6 font-normal text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
          Monitor your digital infrastructure in real-time. Gain deep visibility into 
          response times, status trends, and system health with our high-performance 
          analytics dashboard.
        </p>

        <div className="mt-10 pt-4 flex flex-col md:flex-row gap-4 justify-center">
          {/* Main CTA: View Dashboard */}
          <Link href="/site">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                <span className="z-10 relative" >View Dashboard</span>
              </div>
            </button>
          </Link>

          <Link href="/docs">
            <button className="px-8 py-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition-all">
              API Documentation
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
    </div>
  );
}

export default HeroSection;