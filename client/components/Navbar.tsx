"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, LogOut, Settings, User, Activity, ChevronDown, Menu as MenuIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";
// Ensure these imports match your updated navbar-menu file
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";

const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("fixed top-4 md:top-6 inset-x-0 max-w-5xl mx-auto z-[100] px-4", className)}>
      <Menu setActive={setActive}>
        <div className="flex items-center justify-between w-full">
          {/* --- Logo --- */}
          <Link href="/" className="flex items-center gap-2 mr-6 group">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
              <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-sm font-black tracking-tighter text-white">
              WEBHEALTH
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white px-4 py-2 transition-colors text-sm font-medium">
              Dashboard
            </Link>

            {isLoggedIn && (
              <MenuItem 
                setActive={setActive} 
                active={active} 
                item="Monitoring"
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-white/10 pb-2 mb-1">
                    Monitoring Setup
                  </div>
                  <HoveredLink href="/site" className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-500" /> My Sites
                  </HoveredLink>
                  <HoveredLink href="/add-site">Add New Site</HoveredLink>
                  <HoveredLink href="/uptime">Detailed Uptime</HoveredLink>
                </div>
              </MenuItem>
            )}
          </div>

          {/* --- Auth / Profile --- */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign In</Link>
                <Link href="/sign-up">
                  <button className="bg-white text-[#020617] px-5 py-2 rounded-full text-xs font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-white/5">
                    Join Free
                  </button>
                </Link>
              </>
            ) : (
              
              <MenuItem
                setActive={setActive}
                active={active}
                item={user?.username.toUpperCase() || "Profile"}
                
              >
                <div className="flex flex-col space-y-3 min-w-[200px]">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                       <span className="text-xs font-bold text-cyan-400">
                         {user?.username?.substring(0, 2).toUpperCase()}
                       </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{user?.username}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{user?.email}</p>
                    </div>
                  </div>
                  <HoveredLink href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4 opacity-70" /> Account Settings
                  </HoveredLink>
                  <HoveredLink href="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4 opacity-70" /> Preferences
                  </HoveredLink>
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors pt-2 mt-2 border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </MenuItem>
            )}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </Menu>

      {/* --- Mobile Drawer (Optimized) --- */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full inset-x-4 mt-3 p-6 bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white border-b border-white/5 pb-2">Dashboard</Link>
              {isLoggedIn && (
                <>
                  <p className="text-[10px] font-black uppercase text-cyan-500 tracking-widest mt-2">Monitoring</p>
                  <Link href="/site" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors">My Sites</Link>
                  <Link href="/add-site" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors">Add New Site</Link>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 text-center py-2">Sign In</Link>
                  <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-cyan-500/20">Join Free</button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300">Profile Settings</Link>
                  <button onClick={logout} className="text-red-400 text-left font-bold flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;