"use client";

import HeroSection from "@/components/HeroSection";
import AddSitePage from "@/components/ui/add-site";
import HowItWorks from "./HowItWorks/page";
import { Features, FinalCTA, Footer, Stats } from "@/components/Extra";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#020617] text-white scroll-smooth">
      
      {/* Hero */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Add Site Section */}
      <motion.section
        id="add-site"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AddSitePage />
      </motion.section>

      {/* How It Works */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HowItWorks />
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Features />
      </motion.section>

      {/* Stats */}
      <motion.section
        id="stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Stats />
      </motion.section>

      {/* Call to Action */}
      <motion.section
        id="cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <FinalCTA />
      </motion.section>

    </main>
  );
}
