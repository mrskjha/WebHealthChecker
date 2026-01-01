"use client";

import { useState } from "react";
import { ZodError } from "zod";
import { Eye, EyeOff, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { loginUser } from "@/lib/api";
import { loginSchema } from "@/types/user";
import { useAuth } from "@/lib/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const validatedData = loginSchema.parse({ email, password });
      const response = await loginUser(validatedData);

      if (!response.success) {
        setError(response.error || "Invalid credentials");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden px-4 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative z-10"
      >
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
            <Globe className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-tighter">WebHealthChecker</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="relative p-8 rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl">
         
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-xs font-bold uppercase tracking-widest ml-1">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/[0.03] border-white/10 text-white rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                  Password
                </Label>
                <a href="#" className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/[0.03] border-white/10 text-white rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all placeholder:text-slate-600 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                >
                  <ShieldCheck size={14} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-cyan-500 text-[#020617] font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In to Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              Don’t have an account yet?{" "}
              <a href="/signup" className="font-bold text-white hover:text-cyan-400 transition-colors">
                Create free account
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <p className="mt-8 text-[11px] text-slate-600 uppercase tracking-widest font-medium">
        Secure AES-256 Encrypted Connection
      </p>
    </div>
  );
}