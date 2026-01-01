import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Extra";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebHealthChecker | Modern Uptime Monitoring",
  description:
    "Engineering peace of mind with real-time health monitoring and instant alerts.",
  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#020617] text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] contrast-150 brightness-100 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 ">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}