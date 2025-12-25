"use client";
import Navbar from "@/components/Navbar";
import Homepage from "./Homepage/page";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-muted flex flex-col" 
    >
      <Navbar />
      <main className="flex-grow ">
        <Homepage />
      </main>
    </div>
  );
}
