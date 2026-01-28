"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, LogOut, Settings, User, Activity, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";
import { Menu, MenuItem as BaseMenuItem, HoveredLink } from "./ui/navbar-menu";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.11,
} as const;

const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);

  const { user, isLoggedIn, logout, loading } = useAuth();



  return (
    <div className={cn("fixed top-6 inset-x-0 max-w-5xl mx-auto z-[100] px-4", className)}>
      <Menu setActive={setActive}>
        <Link href="/" className="flex items-center gap-2 mr-6 group">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
            <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-sm font-black tracking-tighter text-white">
            WEBHEALTH
          </span>
        </Link>

        {/* --- Navigation Links --- */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <BaseMenuItem
              setActive={setActive}
              active={active}
              value="Dashboard"
              item="Dashboard"
            />
          </Link>

          {isLoggedIn && (
            <MenuItemWithDropdown
              setActive={setActive}
              active={active}
              value="Monitoring"
              item={
                <div className="flex items-center gap-1">
                  Monitoring <ChevronDown className="w-3 h-3 opacity-50" />
                </div>
              }
            >
              <div className="flex flex-col space-y-3 text-sm min-w-[150px]">
                <HoveredLink href="/site" className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-500" /> My Sites
                </HoveredLink>
                <HoveredLink href="/add-site">Add New Site</HoveredLink>
                <HoveredLink href="/uptime">Detailed Uptime</HoveredLink>
              </div>
            </MenuItemWithDropdown>
          )}
        </div>

        {/* --- Auth / User Profile Section --- */}
        <div className="ml-auto flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <button className="bg-white text-[#020617] px-5 py-2 rounded-full text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  Join Free
                </button>
              </Link>
            </div>
          ) : (
            <MenuItemWithDropdown
              setActive={setActive}
              active={active}
              value="Profile"
              item={
                <div className="flex items-center gap-2 cursor-pointer group pl-2 border-l border-white/10">
                  <div className="w-8 h-8 rounded-full border border-cyan-500/30 bg-slate-900 flex items-center justify-center group-hover:border-cyan-400 transition-all">
                     <span className="text-[10px] font-black text-cyan-400">
                        {user?.username?.substring(0, 2).toUpperCase() || "US"}
                     </span>
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {user?.username}
                  </span>
                </div>
              }
            >
              <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
                <div className="px-2 py-1.5 mb-2 border-b border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Personal Account</p>
                    <p className="text-xs text-white truncate">{user?.email}</p>
                </div>
                <HoveredLink href="/profile" className="flex items-center gap-2">
                   <User className="w-4 h-4 opacity-70" /> Account Settings
                </HoveredLink>
                <HoveredLink href="/settings" className="flex items-center gap-2">
                   <Settings className="w-4 h-4 opacity-70" /> Preferences
                </HoveredLink>

                <div className="pt-2 mt-2 border-t border-white/10">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-left text-red-400 hover:text-red-300 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-red-500/5"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </MenuItemWithDropdown>
          )}
        </div>
      </Menu>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dropdown Logic                                                             */
/* -------------------------------------------------------------------------- */

const MenuItemWithDropdown: React.FC<{
  active: string | null;
  setActive: (value: string) => void;
  value: string;
  item: React.ReactNode;
  children?: React.ReactNode;
}> = ({ active, setActive, value, item, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={ref} 
      className="relative"
      onMouseEnter={() => {
        setActive(value);
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={cn(
          "cursor-pointer px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
          active === value ? "text-cyan-400 bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
      >
        {item}
      </div>

      <AnimatePresence>
        {open && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={transition}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-[110]"
          >
            <div className="rounded-[1.5rem] bg-slate-900/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-5 min-w-[200px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;