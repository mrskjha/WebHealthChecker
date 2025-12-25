"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";
import { HoveredLink, Menu, MenuItem as BaseMenuItem } from "./ui/navbar-menu";

/* -------------------------------------------------------------------------- */
/*                                Anim config                                 */
/* -------------------------------------------------------------------------- */

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.11,
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */

const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const { user, isLoggedIn, logout, loading } = useAuth();

  // ⛔ Prevent UI flicker / stale username
  if (loading) return null;

  return (
    <div className={cn("fixed top-6 inset-x-0 max-w-5xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        {/* ---------------- Dashboard ---------------- */}
        <Link href="/">
          <BaseMenuItem
            setActive={setActive}
            active={active}
            value="Dashboard"
            item="Dashboard"
          />
        </Link>

        {/* ---------------- Monitoring ---------------- */}
        {isLoggedIn && (
          <MenuItemWithDropdown
            setActive={setActive}
            active={active}
            value="Monitoring"
            item="Monitoring"
          >
            <div className="flex flex-col space-y-3 text-sm min-w-[120px]">
              <HoveredLink href="/site">My Sites</HoveredLink>
              <HoveredLink href="/add-site">Add Site</HoveredLink>
              <HoveredLink href="/uptime">Uptime</HoveredLink>
            </div>
          </MenuItemWithDropdown>
        )}

        {/* ---------------- Reports ---------------- */}
        {isLoggedIn && (
          <MenuItemWithDropdown
            setActive={setActive}
            active={active}
            value="Reports"
            item="Reports"
          >
            <div className="flex flex-col space-y-3 text-sm min-w-[140px]">
              <HoveredLink href="/response-time">Response Time</HoveredLink>
              <HoveredLink href="/history">Incident History</HoveredLink>
            </div>
          </MenuItemWithDropdown>
        )}

        {/* ---------------- Auth / Profile ---------------- */}
        {!isLoggedIn ? (
          <MenuItemWithDropdown
            setActive={setActive}
            active={active}
            value="Account"
            item="Account"
          >
            <div className="flex flex-col space-y-3 text-sm min-w-[120px]">
              <HoveredLink href="/login">Login</HoveredLink>
              <HoveredLink href="/signup">Create Account</HoveredLink>
            </div>
          </MenuItemWithDropdown>
        ) : (
          <MenuItemWithDropdown
            setActive={setActive}
            active={active}
            value="Profile"
            item={
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium">
                  {user?.username}
                </span>
              </div>
            }
          >
            <div className="flex flex-col space-y-3 text-sm min-w-[140px]">
              <HoveredLink href="/profile">My Profile</HoveredLink>
              <HoveredLink href="/settings">Settings</HoveredLink>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={logout}
                  className="text-left text-red-500 hover:text-red-600 transition-colors w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </MenuItemWithDropdown>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;

/* -------------------------------------------------------------------------- */
/*                        Menu Item With Dropdown                              */
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
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          setActive(value);
          setOpen((prev) => !prev);
        }}
        className={cn(
          "cursor-pointer px-4 py-2",
          active === value && "font-semibold"
        )}
      >
        {item}
      </div>

      {open && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={transition}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
        >
          <div className="rounded-2xl bg-white dark:bg-black shadow-xl border border-black/10 dark:border-white/10 p-4">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};
