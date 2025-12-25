"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getSites } from "@/lib/api";
import { useAuth } from "@/lib/context/AuthContext";
import { Site } from "@/types/site";
import { Globe, Zap, Clock, ExternalLink, Activity } from "lucide-react"; 
import { useRouter } from "next/navigation";


const SitesPage = () => {
  const [siteData, setSiteData] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const fetchSites = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true);
    try {
      const data = await getSites();
      setSiteData(data.sites.map((site: any) => ({ ...site, userId: user?._id || "" })));
      setError(null);
    } catch (err) {
      setError("Failed to load sites. Please check your connection.");
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  }, [user?._id]);


  useEffect(() => {
    if (!isLoggedIn) return;
    fetchSites(true);
    const interval = setInterval(() => fetchSites(false), 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn, fetchSites]);

  if (!isLoggedIn) return <AuthPrompt />;
  if (loading) return <LoadingSkeleton />;

  

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-16">
      <div className="max-w-7xl mx-auto pt-20">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-blue-500 w-8 h-8" />
              <h1 className="text-4xl font-extrabold tracking-tight text-white">System Pulse</h1>
            </div>
            <p className="text-gray-400 text-lg">
              Welcome back, <span className="text-blue-400 font-medium">{user?.username}</span>. Your services are being monitored.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-400">Live Monitoring</span>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
            <Zap className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.map((site) => (
            <SiteCard key={site._id} site={site} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Site Card Component
const SiteCard = ({ site }: { site: Site }) => {
  const router = useRouter();
  const isUp = site.status === "up";


  const handleCardSiteHistory = async (siteId: string) => {
    
    router.push(`/site/${siteId}/history`);
  };

  return (
    <div className="group relative bg-[#161616] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]" onClick={() => handleCardSiteHistory(site._id)}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/10 transition-colors">
          <Globe className={`w-6 h-6 ${isUp ? "text-blue-400" : "text-red-400"}`} />
        </div>
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
          isUp ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {site.status}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1 truncate">{site.name}</h2>
      
      <div className="flex items-center text-gray-500 text-sm mb-6 group-hover:text-gray-300 transition-colors">
        <span className="truncate">{site.url}</span>
        <a href={site.url} target="_blank" rel="noreferrer" className="ml-2 hover:text-blue-400">
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Zap size={10} /> Latency
          </span>
          <span className={`text-lg font-mono font-bold ${site.responseTime > 500 ? 'text-yellow-400' : 'text-blue-400'}`}>
            {site.responseTime}<span className="text-xs ml-1">ms</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Clock size={10} /> Node ID
          </span>
          <span className="text-sm font-mono text-gray-400 uppercase">
            #{site._id.slice(-6)}
          </span>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-[#0a0a0a] p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-500 font-mono text-sm tracking-widest animate-pulse">SYNCHRONIZING...</p>
        </div>
    </div>
);

const AuthPrompt = () => (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-[#161616] rounded-3xl border border-white/5">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Restricted Access</h2>
            <p className="text-gray-500 mb-6">Please sign in to your account to access the global monitoring network.</p>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">Sign In</button>
        </div>
    </div>
);

export default SitesPage;