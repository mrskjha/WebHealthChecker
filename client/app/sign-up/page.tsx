"use client";

import { useState } from "react";
import { ZodError } from "zod";
import { Eye, EyeOff, Globe, ArrowRight, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { signupUser } from "@/lib/api";
import { signupSchema } from "@/types/user";
import { useAuth } from "@/lib/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const validatedData = signupSchema.parse({
        username,
        email,
        password,
        role: "user",
      });

      const response = await signupUser(validatedData);

      if (!response.success) {
        setError(response.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      await login();
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition">
            <Globe className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-tighter">
            WebHealthChecker
          </span>
        </a>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="relative p-8 rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-slate-400 text-sm">
              Start monitoring your infrastructure in minutes
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-slate-300 ml-1">
                Username
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sumit"
                className="h-12 bg-white/[0.03] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-slate-300 ml-1">
                Email Address
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sumit@gmail.com"
                className="h-12 bg-white/[0.03] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-slate-300 ml-1">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 bg-white/[0.03] border-white/10 text-white rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20 flex gap-2"
                >
                  <ShieldCheck size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-cyan-500 text-[#020617] font-bold"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-bold text-white hover:text-cyan-400"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <p className="mt-8 text-[11px] text-slate-600 uppercase tracking-widest">
        Secure AES-256 Encrypted
      </p>
    </div>
  );
}
