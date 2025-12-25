"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.11,
} as const;

// ---------- MenuItem ----------
interface MenuItemProps {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string | React.ReactNode;
  value?: string;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ setActive, active, item, value, children }) => {
  const key = value ?? (typeof item === "string" ? item : null);
  const isActive = key != null && active === key;

  return (
    <div
      onMouseEnter={() => setActive(key)}
      onMouseLeave={() => setActive(null)}
      className="flex relative px-4 py-2 cursor-pointer select-none text-neutral-700 dark:text-neutral-200 hover:text-black transition-colors"
    >
      {item}

      {children && isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-red-800 dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 shadow-xl p-4">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ---------- Menu ----------
interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/20 bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

// ---------- ProductItem ----------
interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ title, description, href, src }) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

// ---------- HoveredLink ----------
export const HoveredLink: React.FC<React.ComponentProps<typeof Link>> = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="text-neutral-700  dark:text-neutral-200 hover:text-black transition-colors">
      {children}
    </Link>
  );
};
