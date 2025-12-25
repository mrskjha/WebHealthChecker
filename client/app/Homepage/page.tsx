'use client'
import HeroSection from "@/components/HeroSection";
import { useRef } from "react";
import {motion, useInView } from "framer-motion";


export default function Homepage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
    </main>
  );
}
